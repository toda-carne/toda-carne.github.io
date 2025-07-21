

import { isArgumentsArray, ExpressionParser } from './sf_expression_parser.js'

import { get_scode_verses, } from './sf_strong_mgr.js';

import { init_lang, } from './sf_lang_mgr.js';

import { gvar, } from './sf_search_mgr.js';

import { bib_ranges, } from './sf_bib_ranges.js';

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
	const vbb = await bb();
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


const GREEK_PREFIX = "G";

const OT_nams = {
	"WLC":1,
	"ALE":1,
	"TKH":1,
	"LXX":1,
};

const NT_nams = {
	"BYZ":1,
	"TR":1,
	"WH":1,
	"NES":1,
};

function init_biblang(){
	gvar.curr_OT = "WLC";
	gvar.curr_NT = "BYZ";
}

function set_bib(inbib){
	const bib = inbib.toUpperCase();
	if(OT_nams[bib] != null){
		gvar.curr_OT = bib;
		return;
	}
	if(NT_nams[bib] != null){
		gvar.curr_NT = bib;
		return;
	}
}

const biblang = {
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
	 
	 termDelegate: function(term) {
		 return calc_base_term(term);
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

const regex_verse = /\d+:\d+:\d+/;

function is_verse(tm){
	const matches = tm.match(regex_verse);	
	if(matches){
		return true;
	}
	return false;
}
 
const regex_scode = /[HGhg]\d+/;

function is_scode(tm){
	const cod = tm.toUpperCase();
	const matches = cod.match(regex_scode);	
	if(matches){
		return true;
	}
	return false;
}

const regex_bibrx = /\/[^/]*\//;

function is_bib_regex(tm){
	const matches = tm.match(regex_bibrx);
	if(matches){
		return true;
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

const regex_cit_end = /^-(\d+)/;

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

const regex_bibvar = /[.#]\w+/;

function is_bib_var(tm){
	const vv = tm.toLowerCase();
	const matches = vv.match(regex_bibvar);	
	if(matches){
		return true;
	}
	return false;
}

async function calc_scode(scode){
	const scod = scode.toUpperCase();
	let bib = gvar.curr_OT;
	if(scod.startsWith(GREEK_PREFIX)){
		bib = gvar.curr_NT;
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

async function calc_word(wrd){
	if(gvar.dbg_biblang){
		console.log("calc_word");
		console.log(wrd);
	}
	return [];
}

async function calc_bibvar(bvar){
	if(gvar.dbg_biblang){
		console.log("calc_bibvar");
		console.log(bvar);
	}
	return [];
}

async function calc_bibregex(rx){
	if(gvar.dbg_biblang){
		console.log("calc_bibregex");
		console.log(rx);
	}
	return [];
}

async function calc_base_term(term){
	/*if(gvar.dbg_biblang){
		console.log("calc_base_term");
		console.log(term);
	}*/
	if(is_verse(term)){
		return calc_verse(term);
	}
	if(is_scode(term)){
		return calc_scode(term);
	}
	if(is_bib_regex(term)){
		return calc_bibregex(term);
	}
	if(is_bib_var(term)){
		return calc_bibvar(term);
	}
	const cit = is_bib_citation(term);
	if(cit){
		return calc_citation(cit);
	}
	return calc_word(term);
}


/*

	// .toUpperCase();

	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		const vs_ln = line.split('|');
		const regex = /([^\d]+)(\d+):(\d+)/;
		const matches = vs_ln[0].match(regex);
		const words = vs_ln[1].split(' ');
		const txt = words.join('|');
		
		if(matches){
			let nam = matches[1].trim();
			let chap = matches[2];
			let vers = matches[3];
			console.log(BOOKS[nam] + "|" + chap + "|" + vers + "|" + vs_ln[1]);
		}		
	}

*/

async function main_selector(){
	if (process.argv.length < 3) {
		console.log('Usage: node ' + process.argv[1] + '<command>');
		process.exit(1);
	}

	const command = process.argv[2];
	
	gvar.dbg_biblang = true;

	init_lang('es');
	init_biblang();
	
	const par = new ExpressionParser(biblang);

	const toks = par.tokenize(command);
	console.log("TOKENS");
	console.log(toks);

	
	const all_vss = await par.expressionToValue(command);
	const sorvers = all_vss.sort(cmp_verses);
	console.log("FINAL_RESULT");
	console.log(sorvers);
	
	//console.log(gvar.inbook2num);
	
}


main_selector();

