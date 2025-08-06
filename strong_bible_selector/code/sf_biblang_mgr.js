

import { isArgumentsArray, ExpressionParser } from './sf_expression_parser.js'
import { gvar, } from './sf_search_mgr.js';
import { bib_chapter_sizes, } from './sf_bib_chapter_sizes.js';
import { get_bible_verse, get_scode_verses, dbg_log_all_loaded_files, } from './sf_bible_mgr.js';

const DEBUG_MATCHES = false;
const DEBUG_GET_RANGE = true;

const GREEK_PREFIX = "G";
const GET_TOK = "GET_TOK";

const SCOD_VERSES_SUFIX = "_sv";

const MIN_VERSE = [1, 1, 1];
const MAX_VERSE = [66, 22, 21];


const biblang_def = {
	INFIX_OPS: {
		'&': (a, b) => calc_and(a, b),
		'|': (a, b) => calc_or(a, b, '|'),
		'!': (a, b) => calc_not(a, b),
		';': (a, b) => calc_or(a, b, ';'),
		'=': (a, b) => calc_asig(a, b, '='),
		'::': (a, b) => calc_range(a, b),
	},
	PREFIX_OPS: {
		// '.': (bib) => set_bib(bib),
	},
	PRECEDENCE: [['!'], ['|'], ['&'], ['='], [';']],
	LITERAL_OPEN: '/',
	LITERAL_CLOSE: '/',
	GROUP_OPEN: '(',
	GROUP_CLOSE: ')',
	SEPARATORS: [';', '!', '|', '&'],
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

const conf2mini = {
	curr_OT: 'O',
	curr_NT: 'N',
	curr_LOC: 'L',
	output: 'o',
	regex_input: 'i',
	size_output: 's',
	regex_insensitive: 'r',
	intervals: 'I',
};

const mini2conf = {};

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
	"asc":1,
	"min":1,
	"may":1,
};

const size_nams = {
	"sco":1,
	"rx":1,			// CAREFUL. if you change this, then also file "size_output.rx" occurences.
	"wd":1,			// CAREFUL. if you change this, then also file "size_output.wd" occurences.
	"his":1,			// CAREFUL. if you change this, then also file "size_output.his" occurences.
};

const loc_input = "loc";
const ot_input = "ot";
const nt_input = "nt";
const sco_input = "sco";

const rx_in_nams = {
	"loc":1,	// use loc_input to locate and compare
	"ot":1,		// use ot_input to locate and compare
	"nt":1,		// use nt_input to locate and compare
	"sco":1,	// use sco_input to locate and compare
};

const rx_insen = "rx:i";
const rx_noisen = "rx:ni";
const dbg_lang = "dbg";
const nodbg_lang = "nodbg";
const reset_history = "rhis";

const range_nams = {
	"all":[],
	"ot":[],
	"nt":[],
	"pa":[45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],	// paul or pablo
	"ev":[40, 41, 42, 43],	// evangelios or evangelio (gospel)
};

function init_ranges(){
	range_nams.all = [];
	const rng_all = range_nams.all;
	let ii = 1;
	for(; ii <= 66; ii++){
		rng_all.push(ii);
	}

	range_nams.ot = [];
	const rng_ot = range_nams.ot;
	ii = 1;
	for(; ii <= 39; ii++){
		rng_ot.push(ii);
	}

	range_nams.nt = [];
	const rng_nt = range_nams.nt;
	ii = 40;
	for(; ii <= 66; ii++){
		rng_nt.push(ii);
	}
}

function size_outputs_to_all(){
	const sizes = Object.keys(size_nams);
	
	if(gvar.biblang.size_output == null){ gvar.biblang.size_output = {}; }
	let ii = 0;
	for(ii = 0; ii < sizes.length; ii++){
		const kk = sizes[ii];
		gvar.biblang.size_output[kk] = "all";
	}
}

function update_size_outputs_from(out_sizes){
	if(out_sizes == null){
		return;
	}
	const sizes = Object.keys(size_nams);
	
	if(gvar.biblang.size_output == null){ gvar.biblang.size_output = {}; }
	let ii = 0;
	for(ii = 0; ii < sizes.length; ii++){
		const kk = sizes[ii];
		if(out_sizes[kk] != null){
			gvar.biblang.size_output[kk] = out_sizes[kk];
		}
	}
}

export function reset_curr_range(){
	gvar.biblang.curr_range = JSON.parse(JSON.stringify(range_nams.all));
}

function init_history(){
	if(gvar.biblang == null){ gvar.biblang = {}; }
	gvar.biblang.history = [];
	gvar.biblang.size_output.his = 1000;
}

function init_dbg_conf(){
	gvar.biblang.dbg_log = [];
	gvar.biblang.size_output.dbg = 1000;
}

function init_biblang_conf(){
	gvar.biblang.curr_OT = "WLC";
	gvar.biblang.curr_NT = "BYZ";
	gvar.biblang.curr_LOC = gvar.biblang.default_LOC;
	
	gvar.biblang.output = "loc";
	gvar.biblang.regex_input = "loc";
	
	size_outputs_to_all();
	
	gvar.biblang.regex_insensitive = true;

	reset_curr_range();
}

function get_biblang_conf(){
	const conf = {};
	conf.curr_OT = gvar.biblang.curr_OT;
	conf.curr_NT = gvar.biblang.curr_NT;
	conf.curr_LOC = gvar.biblang.curr_LOC;

	conf.output = gvar.biblang.output;
	conf.regex_input = gvar.biblang.regex_input;
	conf.size_output = JSON.parse(JSON.stringify(gvar.biblang.size_output));
	
	conf.regex_insensitive = gvar.biblang.regex_insensitive;
	conf.curr_range = JSON.parse(JSON.stringify(gvar.biblang.curr_range));	
	conf.intervals = range_to_intervals(conf.curr_range);
	
	return conf;
}

export function set_biblang_conf(conf){
	if(conf == null){ return; }
	if(conf.curr_OT != null){ gvar.biblang.curr_OT = conf.curr_OT; }
	if(conf.curr_NT != null){ gvar.biblang.curr_NT = conf.curr_NT; }
	if(conf.curr_LOC != null){ gvar.biblang.curr_LOC = conf.curr_LOC; }

	if(conf.output != null){ gvar.biblang.output = conf.output; }
	if(conf.regex_input != null){ gvar.biblang.regex_input = conf.regex_input; }
	update_size_outputs_from(conf.size_output);
	
	if(conf.regex_insensitive != null){ gvar.biblang.regex_insensitive = conf.regex_insensitive; }
	if(conf.curr_range != null){
		gvar.biblang.curr_range = JSON.parse(JSON.stringify(conf.curr_range));
	}
}

function fill_reversed_object(orig, reverse){
	for (const [key, value] of Object.entries(orig)) {
		reverse[value] = key;
	}  
}

export function init_biblang(lng){
	if(gvar.biblang == null){ gvar.biblang = {}; }

	gvar.biblang.default_LOC = "WEB";
	if(lng == 'es'){
		gvar.biblang.default_LOC = "SBLM";
	}
	
	fill_reversed_object(conf2mini, mini2conf);
	
	gvar.biblang.parser = new ExpressionParser(biblang_def);
	
	init_ranges();
	init_biblang_conf();
	init_history();
	init_dbg_conf();
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

function arr_intersec(aa, bb){
	return aa.filter(ee => bb.includes(ee));
}

function arr_union(aa, bb){
	return [...new Set([...aa, ...bb])];
}

function arr_diff(aa, bb){
	return aa.filter(ee => ! bb.includes(ee));
}

async function calc_and(aa, bb){
	const oaa = await aa();
	//const obb = await bb();
	const obb = await bb(oaa);

	const rop = "(" + oaa.op + " & " + obb.op + ")";
	
	const vaa = oaa.lverses;
	const vbb = obb.lverses;
	//const vtmp1 = vaa.filter(ee => vbb.includes(ee));
	const vtmp1 = arr_intersec(vaa, vbb);
	const vand = vtmp1;
	
	const saa = oaa.lscods;
	const sbb = obb.lscods;
	//const stmp2 = saa.filter(ee => sbb.includes(ee));
	const stmp2 = arr_intersec(saa, sbb);
	const sand = stmp2;
	
	if(gvar.dbg_biblang){
		add_dbg_log("calc_and");
		add_dbg_log(rop);
		console.log(vaa);
		console.log(vbb);
		console.log(vand);
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: vand, lscods: sand };
}
 
async function calc_or(aa, bb, symb){
	const oaa = await aa();
	const obb = await bb();
	
	const rop = "(" + oaa.op + ` ${symb} ` + obb.op + ")";
	
	const vaa = oaa.lverses;
	const vbb = obb.lverses;
	//const vtmp = [...new Set([...vaa, ...vbb])];
	const vtmp = arr_union(vaa, vbb);
	const vor = vtmp;
	
	const saa = oaa.lscods;
	const sbb = obb.lscods;
	//const stmp2 = [...new Set([...saa, ...sbb])];
	const stmp2 = arr_union(saa, sbb);
	const sor = stmp2;
	
	if(gvar.dbg_biblang){
		add_dbg_log("calc_or");
		add_dbg_log(rop);
		console.log(vaa);
		console.log(vbb);
		console.log(vor);
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: vor, lscods: sor };
}

async function calc_asig(aa, bb, symb){
	const oaa = await aa(GET_TOK);
	const obb = await bb();
	
	const is_tok = (typeof oaa === "string");
	
	if(! is_tok){
		if(gvar.dbg_biblang){
			add_dbg_log("calc_asig");
			add_dbg_log("BAD_ASIG");
			add_dbg_log("_____________________________");
		}
		return { op: "BAD_ASIG", lverses: [], lscods: [] };
	}
	
	const rop = `( ${oaa} = ${obb.op} )`;
	
	if(gvar.biblang.all_user_vars == null){ gvar.biblang.all_user_vars = {}; }
	
	obb.op = oaa;
	gvar.biblang.all_user_vars[oaa] = obb;
	
	const vbb = obb.lverses;
	
	if(gvar.dbg_biblang){
		add_dbg_log("calc_asig");
		add_dbg_log(rop);
		console.log(oaa);
		console.log(vbb);
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: [], lscods: [] };
}

async function calc_not(aa, bb){
	const oaa = await aa();
	const obb = await bb();

	const rop = "(" + oaa.op + " ! " + obb.op + ")";
	
	const vaa = oaa.lverses;
	const vbb = obb.lverses;
	//const vtmp = vaa.filter(ee => ! vbb.includes(ee));
	const vtmp = arr_diff(vaa, vbb);
	const vnot = vtmp;
	
	const saa = oaa.lscods;
	const sbb = obb.lscods;
	//const stmp2 = saa.filter(ee => ! sbb.includes(ee));
	const stmp2 = arr_diff(saa, sbb);
	const snot = stmp2;
	
	if(gvar.dbg_biblang){
		add_dbg_log("calc_not");
		add_dbg_log(rop);
		console.log(vaa);
		console.log(vbb);
		console.log(vnot);
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: vnot, lscods: snot };
}

function next_book_in_range(book){
	let nx_book = book + 1;
	const rng = gvar.biblang.curr_range;
	if(rng != null){
		while((nx_book <= 66) && ! rng.includes(nx_book)){
			nx_book++;
		}
	}
	return nx_book;
}

function prev_book_in_range(book){
	let nx_book = book - 1;
	const rng = gvar.biblang.curr_range;
	if(rng != null){
		while((nx_book >= 1) && ! rng.includes(nx_book)){
			nx_book--;
		}
	}
	return nx_book;
}

function first_book_in_range(){
	const rng = gvar.biblang.curr_range;
	if(rng != null){
		gvar.biblang.curr_range = rng.sort((n1, n2) => (n1 - n2));
	}
	return next_book_in_range(0);
}

function last_book_in_range(){
	const rng = gvar.biblang.curr_range;
	if(rng != null){
		gvar.biblang.curr_range = rng.sort((n1, n2) => (n1 - n2));
	}
	return prev_book_in_range(67);
}

export function verse_disp(vr, disp){
	let out = vr;
	const dd = disp;
	while(disp > 0){
		out = inc_verse(out);
		disp--;
	}
	while(disp < 0){
		out = dec_verse(out);
		disp++;
	}
	if(out == null){
		if(dd > 0){
			return MAX_VERSE;
		}
		if(dd < 0){
			return MIN_VERSE;
		}
	}
	return out;
}

function inc_verse(vr){
	if(vr == null){
		return null;
	}
	const cha_sz = bib_chapter_sizes;
	let book = Number(vr[0]);
	let chapter = Number(vr[1]);
	let verse = Number(vr[2]);
	if(cha_sz[book] == null){
		return null;
	}
	const rng_chap = cha_sz[book][chapter];
	if(rng_chap == null){
		return null;
	}
	if(verse < rng_chap){
		return [book, chapter, verse + 1];
	} else {
		const all_chap = Object.keys(cha_sz[book]);
		const rng_book = all_chap[all_chap.length - 1];
		if(chapter < rng_book){
			return [book, chapter + 1, 1];
		} else {
			const nxt_book = next_book_in_range(book);
			//if(book < 66){
			//	return [book + 1, 1, 1];
			if(nxt_book <= 66){
				return [nxt_book, 1, 1];
			} else {
				return null;
			}
		}
	}
	return null;
}

function dec_verse(vr){
	if(vr == null){
		return null;
	}
	const cha_sz = bib_chapter_sizes;
	let book = Number(vr[0]);
	let chapter = Number(vr[1]);
	let verse = Number(vr[2]);
	if(cha_sz[book] == null){
		return null;
	}
	const chap_sz = cha_sz[book][chapter];
	if(chap_sz == null){
		return null;
	}
	if(verse > 1){
		return [book, chapter, verse - 1];
	} else {
		if(chapter > 1){
			const pchap = chapter - 1;
			const lvers = cha_sz[book][pchap];
			return [book, pchap, Number(lvers)];
		} else {
			const pbook = prev_book_in_range(book);
			if(pbook >= 1){
				const all_chap = Object.keys(cha_sz[pbook]);
				const lchap = all_chap[all_chap.length - 1];
				const lvers = cha_sz[pbook][lchap];
				return [pbook, Number(lchap), Number(lvers)];
			} else {
				return null;
			}
		}
	}
	return null;
}

function fill_range(vr1, vr2){
	if(gvar.dbg_biblang){
		add_dbg_log("fill_range");
		add_dbg_log(vr1);
		add_dbg_log(vr2);
	}
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
	if(gvar.dbg_biblang){
		add_dbg_log("_____________________________");
	}
	return fill;
}

async function calc_range(aa, bb){
	const oaa = await aa();
	const obb = await bb();

	const rop = "(" + oaa.op + " :: " + obb.op + ")";
	
	const vaa = oaa.lverses;
	const vbb = obb.lverses;
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
		last = r2[r2.length - 1];
	}
	let fill = [];
	if((first != null) && (last != null)){
		fill = fill_range(first, last);
	}
	let rng = [...new Set([...r1, ...fill, ...r2])];
	
	const saa = oaa.lscods;
	const sbb = obb.lscods;
	const stmp2 = [...new Set([...saa, ...sbb])];
	const sor = stmp2;	
	
	if(gvar.dbg_biblang){
		add_dbg_log("calc_range");
		add_dbg_log(rop);
		console.log(first);
		console.log(last);
		console.log(r1);
		console.log(r2);
		console.log(rng);
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: rng, lscods: sor };
}

function set_bib(inbib){
	const bib = inbib.toUpperCase();
	if(OT_nams[bib] != null){
		gvar.biblang.curr_OT = bib;
		if(gvar.dbg_biblang){
			add_dbg_log("set_bib OT");
			add_dbg_log(bib);
		}
		return true;
	}
	if(NT_nams[bib] != null){
		gvar.biblang.curr_NT = bib;
		if(gvar.dbg_biblang){
			add_dbg_log("set_bib NT");
			add_dbg_log(bib);
		}
		return true;
	}
	if(LOC_nams[bib] != null){
		gvar.biblang.curr_LOC = bib;
		if(gvar.dbg_biblang){
			add_dbg_log("set_bib LOC");
			add_dbg_log(bib);
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
	const cha_sz = bib_chapter_sizes;
	const matches = tm.match(regex_cit_end);
	if(matches){
		citobj.verse_end = Number(matches[1]);
		if(cha_sz[citobj.book][citobj.chapter] == null){
			return false;
		}
		if(citobj.verse_end > cha_sz[citobj.book][citobj.chapter]){
			return false;
		}
		return citobj;
	}
	return false;
}

const regex_cit_vers = /^:(\d+)(.*)/;

function is_bib_verse_cit(tm, citobj){
	const cha_sz = bib_chapter_sizes;
	const matches = tm.match(regex_cit_vers);
	if(matches){
		citobj.verse = Number(matches[1]);
		if(cha_sz[citobj.book][citobj.chapter] == null){
			return false;
		}
		if(citobj.verse > cha_sz[citobj.book][citobj.chapter]){
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
	const cha_sz = bib_chapter_sizes;
	const citobj = {};
	citobj.txt = tm;
	const matches = tm.match(regex_citation);
	if(matches){
		let nam = matches[1].toLowerCase();
		const book = is_book_name(nam);
		if(! book){ return false; }
		citobj.book = Number(book);
		citobj.chapter = Number(matches[2]);
		if(cha_sz[citobj.book] == null){
			return false;
		}
		if(cha_sz[citobj.book][citobj.chapter] == null){
			return false;
		}
		let rest = matches[3];
		if(rest.length > 0){
			return is_bib_verse_cit(rest, citobj);
		} else {
			citobj.verse = 1;
			citobj.verse_end = Number(cha_sz[citobj.book][citobj.chapter]);;
		}
		return citobj;
	}		
	return false;
}

async function calc_scode(scode){
	const scod = scode.toUpperCase();
	if(gvar.biblang.all_scods == null){ gvar.biblang.all_scods = []; }
	gvar.biblang.all_scods.push(scod);
	
	let bib = gvar.biblang.curr_OT + SCOD_VERSES_SUFIX;
	const is_gre = scod.startsWith(GREEK_PREFIX);
	if(is_gre){
		bib = gvar.biblang.curr_NT + SCOD_VERSES_SUFIX;
	}
	let arr_vrs = [];
	const vss = await get_scode_verses(bib, scod);
	//console.log(vss);
	if(vss.length > 0){
		arr_vrs = vss.split(' ');
	}
	
	const rop = scode;
	
	if(gvar.dbg_biblang){
		add_dbg_log("calc_scode");
		add_dbg_log(rop);
		console.log("get_scode_verses(" + bib + "," + scod + ")");
		console.log(arr_vrs);
	}
	
	const is_lxx = (gvar.biblang.curr_OT == "LXX");
	if(is_gre && is_lxx){
		bib = gvar.biblang.curr_OT + SCOD_VERSES_SUFIX;
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
			add_dbg_log("calc_scode LXX");
			add_dbg_log(rop);
			console.log("get_scode_verses(" + bib + "," + scod + ")");
			console.log(arr_vrs2);
			console.log(arr_vrs);
		}
	}
	if(gvar.dbg_biblang){
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: arr_vrs, lscods: [] };
}

async function calc_citation(cit){
	const rop = cit.txt;
	if(gvar.dbg_biblang){
		add_dbg_log("calc_citation");
		add_dbg_log(rop);
	}
	const v1 = "" + cit.book + ":" + cit.chapter + ":" + cit.verse;
	const v2 = "" + cit.book + ":" + cit.chapter + ":" + cit.verse_end;
	
	const rng = fill_range(v1, v2);
	return { op: rop, lverses: rng, lscods: [] };
}

function calc_verse(wrd){
	const rop = wrd;
	if(gvar.dbg_biblang){
		add_dbg_log("calc_verse");
		add_dbg_log(rop);
		add_dbg_log("_____________________________");
	}
	return { op: rop, lverses: [wrd], lscods: [] };
}

const regex_numvar = /^([\w]+):*(.*)$/;

const regex_bibvar = /^([.#+=><:\-]+)([\w\d:_.]+)$/;

function is_bib_var(tm){
	const matches = tm.match(regex_bibvar);	
	if(matches){
		const kk = matches[1];
		const nam = matches[2];
		if(gvar.dbg_biblang){
			console.log("is_bib_var");
			console.log(matches);
			console.log("_____________________________");
		}
		return { txt:tm, kind: kk, name:nam};
	}
	return false;
}

async function calc_bibvar(bvar){
	const kk = bvar.kind;
	const nam = bvar.name;
	const rop = bvar.txt;
	if(gvar.dbg_biblang){
		add_dbg_log("calc_bibvar");
		add_dbg_log(kk);
		add_dbg_log(nam);
		add_dbg_log(rop);
	}
	const robj = { op: rop, lverses: [], lscods: [] };
	if(nam == 'all'){
		reset_curr_range();
		size_outputs_to_all();
		return robj;
	}
	if(kk == ':'){
		const vr = nam.toLowerCase();
		if(rx_in_nams[vr] != null){
			gvar.biblang.regex_input = vr;
			if(gvar.dbg_biblang){ add_dbg_log("regex_input=" + vr); }
		}
	}
	if(kk == '.'){
		const set_ok = set_bib(nam);
		if(set_ok){
			return robj;
		}
		const vr = nam.toLowerCase();
		if(out_nams[vr] != null){
			gvar.biblang.output = vr;
			if(gvar.dbg_biblang){ add_dbg_log("output=" + vr); }
		}
		if(vr == rx_insen){
			gvar.biblang.regex_insensitive = true;
			if(gvar.dbg_biblang){ add_dbg_log("regex_insensitive=" + vr); }
		}
		if(vr == rx_noisen){
			gvar.biblang.regex_insensitive = false;
			if(gvar.dbg_biblang){ add_dbg_log("regex_insensitive=" + vr); }
		}
		if(vr == dbg_lang){
			gvar.dbg_biblang = true;
			add_dbg_log("dbg_biblang ON");
		}
		if(vr == nodbg_lang){
			add_dbg_log("dbg_biblang OFF");
			gvar.dbg_biblang = false;
		}
		if(vr == reset_history){
			add_dbg_log("reseting history");
			gvar.biblang.history = [];
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
				if(gvar.dbg_biblang){ add_dbg_log("size_output[" + vr + "]=" + num); }
			}
		}
	}
	const rng_var = get_name_range(nam);
	if(rng_var.length > 0){
		set_new_range(kk, rng_var);
	}
	if(gvar.dbg_biblang){
		add_dbg_log("_____________________________");
	}
	
	return robj;
}

function set_new_range(kk, rng_var){
	if(rng_var.length <= 0){
		return;
	}
	const rng1 = gvar.biblang.curr_range;
	if(kk == '<'){
		const rng2 = get_range(1, rng_var[0] - 1);
		gvar.biblang.curr_range = arr_intersec(rng1, rng2);
	}
	if(kk == '<='){
		const rng2 = get_range(1, rng_var[rng_var.length - 1]);
		gvar.biblang.curr_range = arr_intersec(rng1, rng2);
	}
	if(kk == '>'){
		const rng2 = get_range(rng_var[rng_var.length - 1] + 1, 66);
		gvar.biblang.curr_range = arr_intersec(rng1, rng2);
	}
	if(kk == '>='){
		const rng2 = get_range(rng_var[0], 66);
		gvar.biblang.curr_range = arr_intersec(rng1, rng2);
	}
	if(kk == '='){
		gvar.biblang.curr_range = rng_var;
	}
	if(kk == '+'){
		gvar.biblang.curr_range = arr_union(rng1, rng_var);
	}
	if(kk == '-'){
		gvar.biblang.curr_range = arr_diff(rng1, rng_var);
	}
	if(gvar.dbg_biblang){
		add_dbg_log("new_range");
		const str_rng2 = JSON.stringify(rng_var, null, null);
		add_dbg_log(str_rng2);			
		const str_rng = JSON.stringify(gvar.biblang.curr_range, null, null);
		add_dbg_log(str_rng);
	}
}

function get_range(min, max){
	let ii = min;
	if(min < 1){ return []; }
	if(max > 66){ return []; }
	const rng = [];
	for(ii = min; ii <= max; ii++){
		rng.push(ii);
	}
	return rng;
}

function get_name_range(nam){
	const is_big_rng = (range_nams[nam] != null);
	if(is_big_rng){
		return range_nams[nam];
	}
	const is_book_abbr = (gvar.abbr2num[nam] != null);
	if(is_book_abbr){
		if(gvar.dbg_biblang){
			add_dbg_log("book abbr " + nam);
		}
		const num = Number(gvar.abbr2num[nam]);
		return [num];
	}
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

function get_rx_input_bib(){
	let bib = gvar.biblang.curr_LOC;
	if(gvar.biblang.regex_input == ot_input){
		bib = gvar.biblang.curr_OT;
		set_new_range("<=", get_name_range("ot"));
	}
	if(gvar.biblang.regex_input == nt_input){
		bib = gvar.biblang.curr_NT;
		set_new_range(">=", get_name_range("nt"));
	}
	return bib;
}

async function calc_word(word, prev){
	if(prev == GET_TOK){
		return word;
	}
	if(gvar.biblang.all_user_vars == null){ gvar.biblang.all_user_vars = {}; }
	if(gvar.biblang.all_user_vars[word] != null){
		return gvar.biblang.all_user_vars[word];
	}
	
	const wrd = no_tildes_word(word);
	const rop = word;
	let bib = get_rx_input_bib();
	
	let num = gvar.biblang.size_output.rx;
	if(gvar.dbg_biblang){
		add_dbg_log("calc_word");
		add_dbg_log(rop);
		console.log(bib + " " + num  + " " + wrd + " " + prev);
		add_dbg_log("_____________________________");
	}
	const found = await find_regex(bib, num, wrd, prev);
	
	return { op: rop, lverses: found, lscods: [] };
}

async function calc_bibregex(rx, prev){
	const rop = "/" + rx + "/";
	if(gvar.dbg_biblang){
		add_dbg_log("calc_bibregex");
		add_dbg_log(rop);
	}
	let bib = get_rx_input_bib();
	
	let num = gvar.biblang.size_output.rx;
	const found = await find_regex(bib, num, rx, prev);
	
	return { op: rop, lverses: found, lscods: [] };
}

export function get_txt_matches(vtxt, rxo){
	let all_ocu = [];
	let prv = null;
	let rr = null;
	while((rr = rxo.exec(vtxt)) !== null){
		let ocu = {
			idx: rr.index,
			lng: rr[0].length,
		};
		
		if(prv != null){
			const prv_end = prv.idx + prv.lng;
			if(prv_end >= ocu.idx){
				const ocu_end = ocu.idx + ocu.lng;
				if(ocu_end > prv_end){
					prv.lng += (ocu_end - prv_end);
				}
				ocu = null;
			}
		}
		if(ocu != null){
			all_ocu.push(ocu);
			prv = ocu;
		}
		
		//all_ocu.push(ocu);
	}
	
	if(DEBUG_MATCHES){
		console.log("get_txt_matches");
		console.log(all_ocu);
	}

	return all_ocu;
}

async function verse_matches(bib, vii, rxo){
	const n2b = gvar.num2book_en;
	const book = Number(vii[0]);
	const chapter = Number(vii[1]);
	const verse = Number(vii[2]);

	//console.log("TRYING get_bible_verse(" + bib + ", " + n2b[book] + ", " + chapter + ", " + verse + ")");
	const vtxt = await get_bible_verse(bib, n2b[book], chapter, verse);
	if(vtxt == null){
		console.log("null verse for get_bible_verse(" + bib + ", " + n2b[book] + ", " + chapter + ", " + verse + ")");
		return [];
	}
	//console.log(vtxt);
	
	const all_ocu = get_txt_matches(vtxt, rxo);
	return all_ocu;
}

function to_insenitive_bib(bib){
	if(bib == "RVA"){
		return "RVAi";
	}
	if(bib == "SBLM"){
		return "SBLMi";
	}
	return bib;
}

async function find_regex(bib, num, rx, prev){	
	let rxbib = bib;
	let rxo = null;
	if(gvar.biblang.all_ocu == null){ gvar.biblang.all_ocu = {}; }
	const comm_ocu = gvar.biblang.all_ocu;
	
	if(gvar.biblang.regex_insensitive){
		rxo = new RegExp(rx, "ig");
		rxbib = to_insenitive_bib(bib);;
	} else {
		rxo = new RegExp(rx, "g");
	}
	if(prev != null){
		if(prev.lverses == null){
			if(gvar.dbg_biblang){
				add_dbg_log("find_regex");
				add_dbg_log("BAD_OPER");
				add_dbg_log("_____________________________");
			}
			return [];
		}
		
		const prv_verses = prev.lverses;
		if(gvar.dbg_biblang){
			add_dbg_log("find_regex PREV");
			add_dbg_log(prev.op);
		}
		let ii = 0;
		const all_mm = [];
		for(ii = 0; ii < prv_verses.length; ii++){
			const vr = prv_verses[ii];
			const vii = vr.split(":");
			const all_ocu = await verse_matches(rxbib, vii, rxo);
			if(all_ocu.length > 0){
				all_mm.push(vr);
				if(comm_ocu[rxbib] == null){ comm_ocu[rxbib] = {}; }
				if(comm_ocu[rxbib][vr] == null){ comm_ocu[rxbib][vr] = []; }
				comm_ocu[rxbib][vr].push(...all_ocu);
			}
		}
		return all_mm;
	}
	
	let max = num;
	const found = [];
	const fst_book = first_book_in_range();

	if(gvar.dbg_biblang){
		add_dbg_log("find_regex");
		add_dbg_log(rx);
		add_dbg_log(rxo);
		add_dbg_log(fst_book);
	}
	
	if(fst_book <= 66){
		let vii = [fst_book, 1, 1];
		while(true){
			if(vii == null){ break; }		
			const all_ocu = await verse_matches(rxbib, vii, rxo);
			if(all_ocu.length > 0){
				const vr = vii.join(":");
				found.push(vr);
				if(comm_ocu[rxbib] == null){ comm_ocu[rxbib] = {}; }
				if(comm_ocu[rxbib][vr] == null){ comm_ocu[rxbib][vr] = []; }
				comm_ocu[rxbib][vr].push(...all_ocu);
			}
			if((max != "all") && (found.length >= max)){
				break;
			}
			
			vii = inc_verse(vii);		
		}
	}
	if(gvar.dbg_biblang){
		console.log(found);
		add_dbg_log("_____________________________");
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

export async function eval_biblang_command(command, config){
	const par = gvar.biblang.parser;
	if(par == null){
		console.error(eval_biblang_term);
	}
	reset_curr_range();

	if(config != null){
		set_biblang_conf(config);
	}
	gvar.biblang.dbg_log = [];
	
	gvar.biblang.all_scods = [];
	gvar.biblang.all_ocu = {};
	
	dbg_log_all_loaded_files();
	
	if(gvar.biblang.size_output.his != null){
		const hsz = Number(gvar.biblang.size_output.his);
		if(gvar.biblang.history == null){ gvar.biblang.history = []; }
		const his = gvar.biblang.history;
		while((his.length > 0) && (his.length >= hsz)){ his.shift(); }
		let sv_conf = config;
		if(sv_conf == null){
			sv_conf = get_biblang_conf();
		}
		his.push({conf: sv_conf, expr: command});
	}
	
	if(gvar.dbg_biblang){
		add_dbg_log("INITIAL_CONF");
		add_dbg_log(get_biblang_conf());
		const toks = par.tokenize(command);
		add_dbg_log("TOKENS");
		add_dbg_log(toks);
	}

	const robj = await par.expressionToValue(command);
	const all_vss = robj.lverses;
	robj.lverses = all_vss.sort(cmp_verses);;
	
	robj.all_scods = gvar.biblang.all_scods;
	robj.all_ocu = gvar.biblang.all_ocu;

	if(gvar.biblang.all_user_vars == null){ gvar.biblang.all_user_vars = {}; }
	gvar.biblang.all_user_vars["$last"] = robj;
	
	gvar.biblang.all_scods = [];
	gvar.biblang.all_ocu = {};

	robj.intervals = range_to_intervals(gvar.biblang.curr_range);
	
	if(gvar.dbg_biblang){
		add_dbg_log("FINAL_RESULT");
		add_dbg_log(robj.op);
		add_dbg_log("FINAL_NUM_VERSES=" + robj.lverses.length);
		add_dbg_log("_____________________________");
		console.log(robj.lverses);
		add_dbg_log("FINAL_CONF");
		add_dbg_log(get_biblang_conf());
	}
	return robj;
}

export function add_dbg_log(obj){
	if(! gvar.dbg_biblang){
		return;
	}
	if(gvar.biblang.dbg_log == null){
		gvar.biblang.dbg_log = [];
	}
	
	const log = gvar.biblang.dbg_log;
	const dbgsz = Number(gvar.biblang.size_output.dbg);
	while((log.length > 0) && (log.length >= dbgsz)){ log.shift(); }
	const msg = JSON.stringify(obj, null, " ");
	
	log.push(msg);
	console.log(obj);
}

export function range_to_intervals(range){
	let rng = range;
	if(rng == null){
		return [];
	}
	rng = rng.sort((n1, n2) => (n1 - n2));
	
	const all_rng = [];
	const n2a = gvar.num2abbr;
	let prv = -1;
	let b0 = null;
	let b1 = null;
	let ii = 0;
	for(; ii < rng.length; ii++){
		const book = rng[ii];
		
		if(book == (prv + 1)){
			b1 = book; 
		} else {
			if(b0 != null){
				all_rng.push([n2a[b0], n2a[b1]]);
			}
			b0 = book;
			b1 = book;
		}
		prv = book;
	}
	if(b0 != null){
		all_rng.push([n2a[b0], n2a[b1]]);
	}
	if(gvar.dbg_biblang){
		add_dbg_log("UI_RANGE");
		add_dbg_log(all_rng);
		add_dbg_log("_____________________________");
	}
	return all_rng;
}

function intervals_to_range(intervals){
	if(intervals == null){
		return [];
	}
	const a2n = gvar.abbr2num;
	
	let range = [];
	let ii = 0;
	for(; ii < intervals.length; ii++){
		const itv = intervals[ii];
		const jj_beg = Number(a2n[itv[0]]);
		const jj_end = Number(a2n[itv[1]]);
		let jj = jj_beg;
		for(; jj <= jj_end; jj++){
			range.push(jj);
		}
	}
	return range;
}

export function conf_to_mini(conf){
	if(conf.intervals == null){
		conf.intervals = range_to_intervals(conf.curr_range);
	}
	const mini = {};
	const kks = Object.keys(mini2conf);
	let ii = 0;
	for(; ii < kks.length; ii++){
		const kk = kks[ii];
		const kk2 = mini2conf[kk];
		mini[kk] = conf[kk2];
	}
	return mini;
}

export function mini_to_conf(mini){
	const conf = {};
	const kks = Object.keys(conf2mini);
	let ii = 0;
	for(; ii < kks.length; ii++){
		const kk = kks[ii];
		const kk2 = conf2mini[kk];
		conf[kk] = mini[kk2];
	}
	conf.curr_range = intervals_to_range(conf.intervals);
	//conf.size_output
	return conf;
}

function fix_bool(cad){
	if(cad == "true"){ return true; }
	return false;
}

function fix_sz(sz){
	if(sz == "all"){ return sz; }
	return Number(sz);
}

export function encode_mini(mini){
	if(mini.s != null){
		mini.s = Object.entries(mini.s).map(rr => rr.join(":")).join("+");
	}
	mini.I = mini.I.map(rr => rr.join(":")).join("+");
	const ents = Object.entries(mini);
	const encoded = ents.map(rr => rr.join("$")).join("|");
	return encoded;
}

export function decode_mini(emini){
	const ents = emini.split("|").map(rr => rr.split("$"));
	const decoded = Object.fromEntries(ents); 
	decoded.I = decoded.I.split("+").map(rr => rr.split(":"));
	if(decoded.s != null){
		decoded.s = Object.fromEntries(decoded.s.split("+").map(rr => { const oo = rr.split(":"); return [oo[0], fix_sz(oo[1])]}));
	}
	decoded.r = fix_bool(decoded.r);
	return decoded;
}

