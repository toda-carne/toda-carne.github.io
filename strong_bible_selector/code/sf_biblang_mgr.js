

import { isArgumentsArray, ExpressionParser } from './sf_expression_parser.js'
import { get_scode_verses, } from './sf_strong_mgr.js';
import { gvar, } from './sf_search_mgr.js';
import { bib_ranges, } from './sf_bib_ranges.js';
import { get_bible_verse, } from './sf_bible_mgr.js';

const GREEK_PREFIX = "G";

const biblang_def = {
	INFIX_OPS: {
		'&': (a, b) => calc_and(a, b),
		'|': (a, b) => calc_or(a, b),
		'!': (a, b) => calc_not(a, b),
		';': (a, b) => calc_or(a, b),
		'=': (a, b) => calc_or(a, b),
		'<->': (a, b) => calc_range(a, b),
	},
	PREFIX_OPS: {
		// '.': (bib) => set_bib(bib),
	},
	PRECEDENCE: [['<->'], ['!'], ['|'], ['&'], ['='], [';']],
	LITERAL_OPEN: '/',
	LITERAL_CLOSE: '/',
	GROUP_OPEN: '(',
	GROUP_CLOSE: ')',
	SEPARATORS: [';', '!', '|', '&', '='],
	WHITESPACE_CHARS: [' '],
	SYMBOLS: ['(', ')', '/'],
	AMBIGUOUS: {},
	 
	termDelegate: function(term, prev) {
		return calc_base_term(term, prev);
	},
	descriptions: [
		/*{
			op: '.',
			fix: 'prefix',
			sig: ["base: Number", "exponent: Number", "Number"],
			text: "Returns the result of raising the base to the exponent: POW(base, exponent).",
		},*/
	],
};

const OT_nams = {
	"WLC":1,
	"ALE":1,
	"TKH":1,
	"LXX":1,		// CAREFUL. if you change this, then also file "LXX" occurences.
};

const NT_nams = {
	"BYZ":1,
	"TR":1,
	"WH":1,
	"NES":1,
};

const LOC_nams = {
	"RVA":1,
	"SBLM":1,
	"KJV":1,
	"WEB":1,
};

const out_nams = {
	"loc":1,
	"txt":1,
	"asc":1,
	"min":1,
	"may":1,
	"sco":1,
};

const size_nams = {
	"loc":1,
	"txt":1,
	"asc":1,
	"min":1,
	"may":1,
	"rx":1,			// CAREFUL. if you change this, then also file "size_output.rx" occurences.
	"wd":1,			// CAREFUL. if you change this, then also file "size_output.wd" occurences.
};

const rx_in_nams = {
	"rx:loc":1,
	"rx:ot":1,		// CAREFUL. if you change this, then also file "rx:ot" occurences.
	"rx:nt":1,		// CAREFUL. if you change this, then also file "rx:nt" occurences.
};

const wd_in_nams = {
	"wd:loc":1,
	"wd:ot":1,		// CAREFUL. if you change this, then also file "wd:ot" occurences.
	"wd:nt":1,		// CAREFUL. if you change this, then also file "wd:nt" occurences.
};

const rx_insen = "rx:i";
const rx_notisen = "rx:ni";
const dbg_lang = "dbg";

export function init_biblang(lng){
	gvar.biblang = {};
	
	gvar.biblang.curr_OT = "WLC";
	gvar.biblang.curr_NT = "BYZ";
	gvar.biblang.curr_LOC = "WEB";
	if(lng == 'es'){
		gvar.biblang.curr_LOC = "SBLM";
	}
	
	gvar.biblang.output = "loc";
	gvar.biblang.regex_input = "rx:loc";
	gvar.biblang.word_input = "wd:loc";
	
	if(gvar.biblang.size_output == null){ gvar.biblang.size_output = {}; }
	
	gvar.biblang.size_output.loc = "all";
	gvar.biblang.size_output.txt = 1;
	gvar.biblang.size_output.asc = "all";
	gvar.biblang.size_output.min = "all";
	gvar.biblang.size_output.may = "all";
	gvar.biblang.size_output.rx = 5;
	gvar.biblang.size_output.wd = 5;

	gvar.biblang.regex_insensitive = true;
	
	gvar.biblang.parser = new ExpressionParser(biblang_def);
	
}

function cmp_verses(vv1, vv2){
	const v1 = vv1.split(":");
	const v2 = vv2.split(":");
	let cv = (v1[0] - v2[0]);
	if(cv != 0){
		return cv;
	}
	cv = (v1[1] - v2[1]);
	if(cv != 0){
		return cv;
	}
	cv = (v1[2] - v2[2]);
	return cv;
}

async function calc_and(aa, bb){
	const vaa = await aa();
	const vbb = await bb(vaa);
	const vtmp = vaa.filter(ee => vbb.includes(ee));
	//const vand = vtmp.sort(cmp_verses);
	const vand = vtmp;
	if(gvar.dbg_biblang){
		console.log("calc_and");
		console.log(vaa);
		console.log(vbb);
		console.log(vand);
		console.log("_____________________________");
	}
	return vand;
}
 
async function calc_or(aa, bb){
	const vaa = await aa();
	const vbb = await bb();
	const vtmp = [...new Set([...vaa, ...vbb])];
	//const vor = vtmp.sort(cmp_verses);
	const vor = vtmp;
	if(gvar.dbg_biblang){
		console.log("calc_or");
		console.log(vaa);
		console.log(vbb);
		console.log(vor);
		console.log("_____________________________");
	}
	return vor;
}

async function calc_not(aa, bb){
	const vaa = await aa();
	const vbb = await bb();
	const vtmp = vaa.filter(ee => ! vbb.includes(ee));
	//const vnot = vtmp.sort(cmp_verses);
	const vnot = vtmp;
	if(gvar.dbg_biblang){
		console.log("calc_not");
		console.log(vaa);
		console.log(vbb);
		console.log(vnot);
		console.log("_____________________________");
	}
	return vnot;
}

function inc_verse(vr){
	let book = Number(vr[0]);
	let chapter = Number(vr[1]);
	let verse = Number(vr[2]);
	if(bib_ranges[book] == null){
		return null;
	}
	const rng_chap = bib_ranges[book][chapter];
	if(rng_chap == null){
		return null;
	}
	if(verse < rng_chap){
		return [book, chapter, verse + 1];
	} else {
		const all_chap = Object.keys(bib_ranges[book]);
		const rng_book = all_chap[all_chap.length - 1];
		if(chapter < rng_book){
			return [book, chapter + 1, 1];
		} else {
			if(book < 66){
				return [book + 1, 1, 1];
			} else {
				return null;
			}
		}
	}
	return null;
}

function fill_range(vr1, vr2){
	const fill = [];
	const v1 = vr1.split(':').map(ii => Number(ii));
	const v2 = vr2.split(':').map(ii => Number(ii));
	let vii = vr1.split(':').map(ii => Number(ii));
	while(true){
		if(vii[0] > v2[0]){
			break;
		}
		if((vii[0] == v2[0]) && (vii[1] > v2[1])){
			break;
		}
		if((vii[0] == v2[0]) && (vii[1] == v2[1]) && (vii[2] > v2[2])){
			break;
		}
		
		const vrf = vii.join(':');
		fill.push(vrf);

		vii = inc_verse(vii);
		if(vii == null){
			break;
		}
	}
	return fill;
}

async function calc_range(aa, bb){
	const vaa = await aa();
	const vbb = await bb();
	const r1 = vaa.sort(cmp_verses);
	const r2 = vbb.sort(cmp_verses);
	
	let first = null;
	let last = null;
	if(vaa.length > 0){
		first = r1[r1.length - 1];
	}
	if(vbb.length > 0){
		if(first == null){
			return r2;
		}
		last = r2[r1.length - 1];
	}
	let fill = [];
	if((first != null) && (last != null)){
		fill = fill_range(first, last);
	}
	const rng = [...new Set([...r1, ...fill, ...r2])];
	return rng;
}

function set_bib(inbib){
	const bib = inbib.toUpperCase();
	if(OT_nams[bib] != null){
		gvar.biblang.curr_OT = bib;
		if(gvar.dbg_biblang){
			console.log("set_bib OT");
			console.log(bib);
		}
		return true;
	}
	if(NT_nams[bib] != null){
		gvar.biblang.curr_NT = bib;
		if(gvar.dbg_biblang){
			console.log("set_bib NT");
			console.log(bib);
		}
		return true;
	}
	if(LOC_nams[bib] != null){
		gvar.biblang.curr_LOC = bib;
		if(gvar.dbg_biblang){
			console.log("set_bib LOC");
			console.log(bib);
		}
		return true;
	}
	
	return false;
}

const regex_verse = /^\d+:\d+:\d+$/;

function is_verse(tm){
	const matches = tm.match(regex_verse);	
	if(matches){
		return true;
	}
	return false;
}
 
const regex_scode = /^[HGhg]\d+$/;

function is_scode(tm){
	const cod = tm.toUpperCase();
	const matches = cod.match(regex_scode);	
	if(matches){
		return true;
	}
	return false;
}

const regex_bibrx = /^\/([^/]*)\/$/;

function is_bib_regex(tm){
	const matches = tm.match(regex_bibrx);
	if(matches){
		const val = matches[1];
		return val;
	}
	return false;
}

function is_book_name(nam){
	const nm = nam.toLowerCase();
	let num = gvar.abbr2num[nm];
	if(num != null){ return num; }
	num = gvar.book2num_es[nm];
	if(num != null){ return num; }
	num = gvar.book2num_en[nm];
	if(num != null){ return num; }
	num = gvar.inbook2num_es[nm];
	if(num != null){ return num; }
	return false;
}

const regex_cit_end = /^-(\d+)$/;

function is_number(val){
	if((typeof val === 'number') && ! isNaN(val)){
		return true;
	}
	return false;
}

function is_bib_end_cit(tm, citobj){
	const matches = tm.match(regex_cit_end);
	if(matches){
		citobj.verse_end = Number(matches[1]);
		if(bib_ranges[citobj.book][citobj.chapter] == null){
			return false;
		}
		if(citobj.verse_end > bib_ranges[citobj.book][citobj.chapter]){
			return false;
		}
		return citobj;
	}
	return false;
}

const regex_cit_vers = /^:(\d+)(.*)/;

function is_bib_verse_cit(tm, citobj){
	const matches = tm.match(regex_cit_vers);
	if(matches){
		citobj.verse = Number(matches[1]);
		if(bib_ranges[citobj.book][citobj.chapter] == null){
			return false;
		}
		if(citobj.verse > bib_ranges[citobj.book][citobj.chapter]){
			return false;
		}
		let rest = matches[2];
		if(rest.length > 0){
			return is_bib_end_cit(rest, citobj);
		} else {
			citobj.verse_end = citobj.verse;
		}
		return citobj;
	}		
	return false;	
}

const regex_citation = /^([^_.-]+)[_.-](\d+)(.*)/;

function is_bib_citation(tm){
	const citobj = {};
	const matches = tm.match(regex_citation);
	if(matches){
		let nam = matches[1].toLowerCase();
		const book = is_book_name(nam);
		if(! book){ return false; }
		citobj.book = Number(book);
		citobj.chapter = Number(matches[2]);
		if(bib_ranges[citobj.book] == null){
			return false;
		}
		if(bib_ranges[citobj.book][citobj.chapter] == null){
			return false;
		}
		let rest = matches[3];
		if(rest.length > 0){
			return is_bib_verse_cit(rest, citobj);
		} else {
			citobj.verse = 1;
			citobj.verse_end = Number(bib_ranges[citobj.book][citobj.chapter]);;
		}
		return citobj;
	}		
	return false;
}

const regex_bibvar = /^([.#])([\w\d:_.]+)$/;

function is_bib_var(tm){
	const matches = tm.match(regex_bibvar);	
	if(matches){
		const kk = matches[1];
		const nam = matches[2];
		return {kind: kk, name:nam};
	}
	return false;
}

async function calc_scode(scode){
	const scod = scode.toUpperCase();
	let bib = gvar.biblang.curr_OT;
	const is_gre = scod.startsWith(GREEK_PREFIX);
	if(is_gre){
		bib = gvar.biblang.curr_NT;
	}
	let arr_vrs = [];
	const vss = await get_scode_verses(bib, scod);
	//console.log(vss);
	if(vss.length > 0){
		arr_vrs = vss.split(' ');
	}
	if(gvar.dbg_biblang){
		console.log("calc_scode");
		console.log("get_scode_verses(" + bib + "," + scod + ")");
		console.log(arr_vrs);
	}
	
	const is_lxx = (gvar.biblang.curr_OT == "LXX");
	if(is_gre && is_lxx){
		bib = gvar.biblang.curr_OT;
		let arr_vrs2 = [];
		const vss2 = await get_scode_verses(bib, scod);
		if(vss2.length > 0){
			arr_vrs2 = vss2.split(' ');
		}
		if(arr_vrs2.length > 0){
			const all_vrs = [...new Set([...arr_vrs, ...arr_vrs2])];
			arr_vrs = all_vrs;
		}
		if(gvar.dbg_biblang){
			console.log("calc_scode LXX");
			console.log("get_scode_verses(" + bib + "," + scod + ")");
			console.log(arr_vrs2);
			console.log(arr_vrs);
		}
	}
	if(gvar.dbg_biblang){
		console.log("_____________________________");
	}
	return arr_vrs;
}

async function calc_citation(cit){
	if(gvar.dbg_biblang){
		console.log("calc_citation");
		console.log(cit);
	}
	const v1 = "" + cit.book + ":" + cit.chapter + ":" + cit.verse;
	const v2 = "" + cit.book + ":" + cit.chapter + ":" + cit.verse_end;
	
	return fill_range(v1, v2);
}

async function calc_verse(wrd){
	if(gvar.dbg_biblang){
		console.log("calc_verse");
		console.log(wrd);
		/*
		const vr = wrd.split(':');
		const vr2 = inc_verse(vr);
		console.log("INC=");
		console.log(vr2);		
		*/
	}
	return [wrd];
}

const regex_numvar = /^([\w]+):*(.*)$/;

async function calc_bibvar(bvar){
	const kk = bvar.kind;
	const nam = bvar.name;
	if(gvar.dbg_biblang){
		console.log("calc_bibvar");
		console.log(bvar);
	}
	if(nam == 'all'){
		const sizes = Object.keys(gvar.biblang.size_output);
		let ii = 0;
		for(ii = 0; ii < sizes.length; ii++){
			const kk = sizes[ii];
			gvar.biblang.size_output[kk] = "all";
		}
		return [];
	}
	if(kk == '.'){
		const set_ok = set_bib(nam);
		if(set_ok){
			return [];
		}
		const vr = nam.toLowerCase();
		if(out_nams[vr] != null){
			gvar.biblang.output = vr;
			if(gvar.dbg_biblang){ console.log("output=" + vr); }
		}
		if(rx_in_nams[vr] != null){
			gvar.biblang.regex_input = vr;
			if(gvar.dbg_biblang){ console.log("regex_input=" + vr); }
		}
		if(wd_in_nams[vr] != null){
			gvar.biblang.word_input = vr;
			if(gvar.dbg_biblang){ console.log("word_input=" + vr); }
		}
		if(vr == rx_insen){
			gvar.biblang.regex_insensitive = true;
			if(gvar.dbg_biblang){ console.log("regex_insensitive=" + vr); }
		}
		if(vr == rx_notisen){
			gvar.biblang.regex_insensitive = false;
			if(gvar.dbg_biblang){ console.log("regex_insensitive=" + vr); }
		}
		if(vr == dbg_lang){
			gvar.dbg_biblang = true;
			if(gvar.dbg_biblang){ console.log("dbg_biblang ON"); }
		}
	}
	if(kk == '#'){
		const fvr = nam.toLowerCase();
		const matches = fvr.match(regex_numvar);	
		if(matches){
			const vr = matches[1];
			const val = Number(matches[2]);
			let num = "all";
			if(is_number(val)){
				num = val;
			}
			if(size_nams[vr] != null){
				if(gvar.biblang.size_output == null){ gvar.biblang.size_output = {}; }
				gvar.biblang.size_output[vr] = num;
				if(gvar.dbg_biblang){ console.log("size_output[" + vr + "]=" + num); }
			}
		}
	}
	if(gvar.dbg_biblang){ console.log(gvar.biblang); }
	
	return [];
}

function no_tildes_word(wrd){
	const ntil = wrd.replace(/Á/g, 'A').replace(/á/g, 'a')
		.replace(/É/g, 'E').replace(/é/g, 'e')
		.replace(/Í/g, 'I').replace(/í/g, 'i')
		.replace(/Ó/g, 'O').replace(/ó/g, 'o')
		.replace(/Ú/g, 'U').replace(/ú/g, 'u');
	return ntil;
}

async function calc_word(word, prev){
	const wrd = no_tildes_word(word);
	if(gvar.dbg_biblang){
		console.log("calc_word");
		console.log(wrd);
	}
	let bib = gvar.biblang.curr_LOC;
	if(gvar.biblang.word_input == "wd:ot"){
		bib = gvar.biblang.curr_OT;
	}
	if(gvar.biblang.word_input == "wd:nt"){
		bib = gvar.biblang.curr_NT;
	}
	let num = gvar.biblang.size_output.wd;
	const found = find_regex(bib, num, wrd, prev);
	return found;
}

async function calc_bibregex(rx, prev){
	if(gvar.dbg_biblang){
		console.log("calc_bibregex");
		console.log(rx);
	}
	let bib = gvar.biblang.curr_LOC;
	if(gvar.biblang.regex_input == "rx:ot"){
		bib = gvar.biblang.curr_OT;
	}
	if(gvar.biblang.regex_input == "rx:nt"){
		bib = gvar.biblang.curr_NT;
	}
	let num = gvar.biblang.size_output.rx;
	const found = find_regex(bib, num, rx, prev);
	return found;
}

async function verse_match(bib, vii, rxo){
	const n2b = gvar.num2book_en;
	const book = Number(vii[0]);
	const chapter = Number(vii[1]);
	const verse = Number(vii[2]);

	const vtxt = await get_bible_verse(bib, n2b[book], chapter, verse);
	if(vtxt == null){
		return null;
	}

	const mm = vtxt.match(rxo);
	if(mm){
		const vss = "" + book + ":" + chapter + ":" + verse;
		/*if(gvar.dbg_biblang){
			console.log("MATCHED_VERSE");
			console.log(vtxt);
		}*/
		return vss;
	}
	return null;
}

function to_insenitive_bib(bib){
	if(bib == "RVA"){
		return "RVAi";
	}
	if(bib == "SBLM"){
		return "SBLMi";
	}
}

async function find_regex(bib, num, rx, prev){	
	let rxbib = bib;
	let rxo = null;
	if(gvar.biblang.regex_insensitive){
		rxo = new RegExp(rx, "i");
		rxbib = to_insenitive_bib(bib);;
	} else {
		rxo = new RegExp(rx);
	}
	if(prev != null){
		if(gvar.dbg_biblang){
			console.log("find_regex PREV");
			console.log(prev);
		}
		let ii = 0;
		const all_mm = [];
		for(ii = 0; ii < prev.length; ii++){
			const vr = prev[ii];
			const vii = vr.split(":");
			const vss = await verse_match(rxbib, vii, rxo);
			if(vss != null){
				all_mm.push(vss);
			}
		}
		return all_mm;
	}
	
	let max = num;
	const found = [];

	if(gvar.dbg_biblang){
		console.log("find_regex");
		console.log(rx);
		console.log(rxo);
	}
	
	let vii = [1, 1, 1];
	while(true){
		if(vii == null){ break; }		
		const vss = await verse_match(rxbib, vii, rxo);
		if(vss != null){
			found.push(vss);
		}
		if((max != "all") && (found.length >= max)){
			break;
		}
		
		vii = inc_verse(vii);		
	}
	if(gvar.dbg_biblang){
		console.log(found);
		console.log("_____________________________");
	}
	return found;
}

async function calc_base_term(term, prev){
	if(is_verse(term)){
		return calc_verse(term);
	}
	if(is_scode(term)){
		return calc_scode(term);
	}
	const rx = is_bib_regex(term)
	if(rx){
		return calc_bibregex(rx, prev);
	}
	const bvar = is_bib_var(term)
	if(bvar){
		return calc_bibvar(bvar);
	}
	const cit = is_bib_citation(term);
	if(cit){
		return calc_citation(cit);
	}
	return calc_word(term, prev);
}

export async function eval_biblang_command(command){
	const par = gvar.biblang.parser;
	if(par == null){
		console.error(eval_biblang_term);
	}
	if(gvar.dbg_biblang){
		const toks = par.tokenize(command);
		console.log("TOKENS");
		console.log(toks);
	}

	const all_vss = await par.expressionToValue(command);
	const sorvers = all_vss.sort(cmp_verses);
	if(gvar.dbg_biblang){
		console.log("FINAL_RESULT");
		console.log(sorvers);
	}
	return sorvers;
}

