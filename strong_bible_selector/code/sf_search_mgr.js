
import * as MOD_BIB_WLC from "../data/js_bib/WLC_BIB/index_of_WLC_BIB.js";
import * as MOD_BIB_ALE from "../data/js_bib/ALE_BIB/index_of_ALE_BIB.js";
import * as MOD_BIB_TKH from "../data/js_bib/TKH_BIB/index_of_TKH_BIB.js";
import * as MOD_BIB_LXX from "../data/js_bib/LXX_BIB/index_of_LXX_BIB.js";

import * as MOD_BIB_NES from "../data/js_bib/NES_BIB/index_of_NES_BIB.js";
import * as MOD_BIB_BYZ from "../data/js_bib/BYZ_BIB/index_of_BYZ_BIB.js";
import * as MOD_BIB_TR from "../data/js_bib/TR_BIB/index_of_TR_BIB.js";
import * as MOD_BIB_WH from "../data/js_bib/WH_BIB/index_of_WH_BIB.js";

import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from '../../bible_quest/code/bq_select_option_mgr.js';

import { get_bib_verse, bibobj_to_bibhtm, add_bible, 
} from '../../bible_quest/code/bq_bible_mgr.js';

import { get_strocode_verses, } from './sf_strong_mgr.js';
import { init_lang, } from './sf_lang_mgr.js';

const bib_dir = "../../strong_bible_selector/data/js_bib/";

const local_bibles = {
	WLC_BIB : MOD_BIB_WLC.bib_index,
	ALE_BIB : MOD_BIB_ALE.bib_index,
	TKH_BIB : MOD_BIB_TKH.bib_index,
	LXX_BIB : MOD_BIB_LXX.bib_index,
	
	NES_BIB : MOD_BIB_NES.bib_index,
	BYZ_BIB : MOD_BIB_BYZ.bib_index,
	TR_BIB : MOD_BIB_TR.bib_index,
	WH_BIB : MOD_BIB_WH.bib_index,
};


const DEBUG_SELECTOR = true;

export let gvar = {};

const old_crit_txt = {
	"1": "WM Leningrad Codex (WLC)",
	"2": "Aleppo (ALE)",
	"3": "Tanakh (TKH)",
	"4": "Septuagint (LXX)",
};

const new_crit_txt = {
	"1": "Byzantine Text (BYZ)",
	"2": "Textus Receptus Text (TR)",
	"3": "Wescott and Hort Text (WH)",
	"4": "Nestle 1904 Text (NES)",
};

const bib_version = {
	"1": "Reina-Valera 1909 (RVA)",
	"2": "King James Bible (KJV)",
	"3": "Sagrada Biblia Libre Mundial (SBLM)",
	"4": "World Estandard Bible (WEB)",
	"5": "Critical text in minuscule (MIN)",
	"6": "Critical text in mayuscule (MAY)",
	"7": "Critical text in ASCII (ASCII)",
	"8": "Critical text in Strong codes (SCOD)",
};

const id_crit_sele = "id_crit_sele";
const id_expression = "id_expression";

const crit_regex = /[^(]*\((\w+)\).*/;

function add_bibles(){
	const all_cod = Object.keys(local_bibles);
	let ii = 0;
	for(ii = 0; ii < all_cod.length; ii++){
		const cod = all_cod[ii];
		add_bible(cod, local_bibles[cod], bib_dir);
	}
}

function get_crit_cod(val_sel){
	const matches = val_sel.match(crit_regex);
	
	if(matches){
		console.log(matches);
		let cod = matches[1].trim();
		return cod;
	}
	return null;
}

function set_selec(dv_ret, val_sel){
	const cod = get_crit_cod(val_sel);
	if(cod != null){
		dv_ret.innerHTML = cod;
	}
}

function init_menus(){
	
	const dv_old_tes = document.getElementById("id_old_test");
	dv_old_tes.addEventListener('click', function() {
		const all_ops = Object.values(old_crit_txt);
		toggle_select_option(dv_old_tes, id_crit_sele, all_ops, function(dv_ret, dv_ops, val_sel, idx_sel){
			set_selec(dv_ret, val_sel);
			dv_ops.remove();
		});
		return;
	});
	const dv_new_tes = document.getElementById("id_new_test");
	dv_new_tes.addEventListener('click', function() {
		const all_ops = Object.values(new_crit_txt);
		toggle_select_option(dv_new_tes, id_crit_sele, all_ops, function(dv_ret, dv_ops, val_sel, idx_sel){
			set_selec(dv_ret, val_sel);
			dv_ops.remove();
		});
		return;
	});
	const dv_version = document.getElementById("id_version");
	dv_version.addEventListener('click', function() {
		const all_ops = Object.values(bib_version);
		toggle_select_option(dv_version, id_crit_sele, all_ops, function(dv_ret, dv_ops, val_sel, idx_sel){
			set_selec(dv_ret, val_sel);
			dv_ops.remove();
		});
		return;
	});

	const dv_search = document.getElementById("id_search");
	const inp_box = document.createElement("input");
	inp_box.id = id_expression;
	inp_box.value = "G_66";
	inp_box.type = "text";
	dv_search.appendChild(inp_box);

	const dv_select = document.getElementById("id_select");
	dv_select.addEventListener('click', function() {
		do_select();
		return;
	});

	inp_box.addEventListener('keydown', function(ev) {
		if(ev.key === "Enter"){
			do_select();
		}
		return;
	});
	
}

function do_select(){
	const dv_old_tes = document.getElementById("id_old_test");
	const oldt = dv_old_tes.innerHTML.trim();
	const dv_new_tes = document.getElementById("id_new_test");
	const newt = dv_new_tes.innerHTML.trim();
	const dv_version = document.getElementById("id_version");
	let bib = dv_version.innerHTML.trim();
	const dv_expr = document.getElementById(id_expression);
	const expr = dv_expr.value.trim();

	let crit = oldt;
	let conv_fn = null;
	if(expr.startsWith("G_")){
		crit = newt;
	}
	if((bib == "MIN") || (bib == "MAY") || (bib == "ASCII")){
		if((bib == "MIN") || (bib == "MAY")){
			conv_fn = verse_to_hebrew;
			if(crit == newt){
				conv_fn = verse_to_greek;
			} 
		}
		bib = crit + "_BIB";
	}
	
	if(DEBUG_SELECTOR){
		console.log("oldt=" + oldt);
		console.log("newt=" + newt);
		console.log("bib=" + bib);
		console.log("expr='" + expr + "'");
		console.log("crit=" + crit);
	}
	const dv_verses = document.getElementById("id_verses");
	dv_verses.innerHTML = "";
	
	get_strocode_verses(crit, expr).then((resp) => {
		const all_v = JSON.stringify(resp, null, "  ");
		fill_verses(bib, resp, conv_fn);
	});
}	

export async function start_srch_mgr(curr_lang){
	add_bibles();
	init_lang(curr_lang);
	init_menus();
}

function fill_verses(bib_cod, all_found, conv_fn){
	const dv_verses = document.getElementById("id_verses");
	const all_vrs = Object.keys(all_found);
	let ii = 0;
	for(ii = 0; ii < all_vrs.length; ii++){
		const cod_ver = all_vrs[ii].split(':');
		const id_ver = cod_ver.join('_');
		const dv_ver = document.createElement("div");
		dv_ver.id = id_ver;
		dv_ver.innerHTML = id_ver;
		dv_verses.appendChild(dv_ver);
		
		const bibobj = {};
		bibobj.bible = bib_cod;
		bibobj.book = cod_ver[0];
		bibobj.chapter = cod_ver[1];
		bibobj.verse = cod_ver[2];
		
		bibobj_to_bibhtm(bibobj, id_ver, gvar.book_names, conv_fn).then((vs_txt) => {
			dv_ver.innerHTML = vs_txt;
		});
	}
}

const hebrew_chars = {
ALEF:'\u05D0',
BET:'\u05D1',
GIMEL:'\u05D2',
DALET:'\u05D3',
HE:'\u05D4',
VAV:'\u05D5',
ZAYIN:'\u05D6',
HET:'\u05D7',
TET:'\u05D8',
YOD:'\u05D9',
F_KAF:'\u05DA',
KAF:'\u05DB',
LAMED:'\u05DC',
F_MEM:'\u05DD',
MEM:'\u05DE',
F_NUN:'\u05DF',
NUN:'\u05E0',
SAMEKH:'\u05E1',
AYIN:'\u05E2',
F_PE:'\u05E3',
PE:'\u05E4',
F_TSADI:'\u05E5',
TSADI:'\u05E6',
KUF:'\u05E7',
RESH:'\u05E8',
SHIN:'\u05E9',
TAV:'\u05EA',
};

const ascii_heb_finals = {
'c':1,
'm':1,
'n':1,
'f':1,
'z':1,
}

const ascii_to_hebrew = {
'e':hebrew_chars.ALEF,
'b':hebrew_chars.BET,
'g':hebrew_chars.GIMEL,
'd':hebrew_chars.DALET,
'h':hebrew_chars.HE,
'v':hebrew_chars.VAV,
'x':hebrew_chars.ZAYIN,
'k':hebrew_chars.HET,
'p':hebrew_chars.TET,
'i':hebrew_chars.YOD,
'cf':hebrew_chars.F_KAF,
'c':hebrew_chars.KAF,
'l':hebrew_chars.LAMED,
'mf':hebrew_chars.F_MEM,
'm':hebrew_chars.MEM,
'nf':hebrew_chars.F_NUN,
'n':hebrew_chars.NUN,
's':hebrew_chars.SAMEKH,
'a':hebrew_chars.AYIN,
'ff':hebrew_chars.F_PE,
'f':hebrew_chars.PE,
'zf':hebrew_chars.F_TSADI,
'z':hebrew_chars.TSADI,
'q':hebrew_chars.KUF,
'r':hebrew_chars.RESH,
'w':hebrew_chars.SHIN,
't':hebrew_chars.TAV,
};

const ascii_to_greek = {
'a':'α',
'b':'β',
'g':'γ',
'd':'δ',
'e':'ε',
'F':'ϝ',
'N':'ͷ',
'S':'ϛ',
'z':'ζ',
'H':'ͱ',
'h':'η',
'q':'θ',
'i':'ι',
'j':'ϳ',
'k':'κ',
'l':'λ',
'm':'μ',
'n':'ν',
'x':'ξ',
'o':'ο',
'p':'π',
'M':'ϻ',
'K':'ϟ',
'Q':'ϙ',
'r':'ρ',
's':'ς',
's':'σ',
'Z':'ͼ',
't':'τ',
'u':'υ',
'f':'φ',
'c':'χ',
'y':'ψ',
'w':'ω',
};

function word_to_greek(word){
	const letras = word.split('');
	let gre = letras.map(ll => ascii_to_greek[ll]);
	return gre.join('');
}

function verse_to_greek(verse){
	const all_ww = verse.split(' ');
	let gre = all_ww.map(ww => word_to_greek(ww));
	return gre.join(' ');
}

function word_to_hebrew(word){
	const letras = word.split('');
	const last = letras[letras.length - 1];
	if(ascii_heb_finals[last] != null){
		letras[letras.length - 1] = last + 'f';
	}
	let heb = letras.map(ll => ascii_to_hebrew[ll]);
	return heb.join('');
}

function verse_to_hebrew(verse){
	const all_ww = verse.split(' ');
	let heb = all_ww.map(ww => word_to_hebrew(ww));
	return heb.join(' ');
}

/*
id_search
id_old_test
id_new_test
id_version
id_select
id_find


function get_greek_min(ch){
	let rr = ch;
	switch(ch){
		case 'a': rr = 'α'; break;
		case 'b': rr = 'β'; break;
		case 'g': rr = 'γ'; break;
		case 'd': rr = 'δ'; break;
		case 'e': rr = 'ε'; break;
		case 'F': rr = 'ϝ'; break;
		case 'N': rr = 'ͷ'; break;
		case 'S': rr = 'ϛ'; break;
		case 'z': rr = 'ζ'; break;
		case 'H': rr = 'ͱ'; break;
		case 'h': rr = 'η'; break;
		case 'q': rr = 'θ'; break;
		case 'i': rr = 'ι'; break;
		case 'j': rr = 'ϳ'; break;
		case 'k': rr = 'κ'; break;
		case 'l': rr = 'λ'; break;
		case 'm': rr = 'μ'; break;
		case 'n': rr = 'ν'; break;
		case 'x': rr = 'ξ'; break;
		case 'o': rr = 'ο'; break;
		case 'p': rr = 'π'; break;
		case 'M': rr = 'ϻ'; break;
		case 'K': rr = 'ϟ'; break;
		case 'Q': rr = 'ϙ'; break;
		case 'r': rr = 'ρ'; break;
		case 's': rr = 'ς'; break;
		case 's': rr = 'σ'; break;
		case 'Z': rr = 'ͼ'; break;
		case 't': rr = 'τ'; break;
		case 'u': rr = 'υ'; break;
		case 'f': rr = 'φ'; break;
		case 'c': rr = 'χ'; break;
		case 'y': rr = 'ψ'; break;
		case 'w': rr = 'ω'; break;
	}
	return rr;
}

function get_hebrew_may(ch){
	let rr = ch;
	switch(ch){
		case 'e': rr = hebrew_chars.ALEF; break;
		case 'b': rr = hebrew_chars.BET; break;
		case 'g': rr = hebrew_chars.GIMEL; break;
		case 'd': rr = hebrew_chars.DALET; break;
		case 'h': rr = hebrew_chars.HE; break;
		case 'v': rr = hebrew_chars.VAV; break;
		case 'x': rr = hebrew_chars.ZAYIN; break;
		case 'k': rr = hebrew_chars.HET; break;
		case 'p': rr = hebrew_chars.TET; break;
		case 'i': rr = hebrew_chars.YOD; break;
		case 'cf': rr = hebrew_chars.F_KAF; break;
		case 'c': rr = hebrew_chars.KAF; break;
		case 'l': rr = hebrew_chars.LAMED; break;
		case 'mf': rr = hebrew_chars.F_MEM; break;
		case 'm': rr = hebrew_chars.MEM; break;
		case 'nf': rr = hebrew_chars.F_NUN; break;
		case 'n': rr = hebrew_chars.NUN; break;
		case 's': rr = hebrew_chars.SAMEKH; break;
		case 'a': rr = hebrew_chars.AYIN; break;
		case 'ff': rr = hebrew_chars.F_PE; break;
		case 'f': rr = hebrew_chars.PE; break;
		case 'zf': rr = hebrew_chars.F_TSADI; break;
		case 'z': rr = hebrew_chars.TSADI; break;
		case 'q': rr = hebrew_chars.KUF; break;
		case 'r': rr = hebrew_chars.RESH; break;
		case 'w': rr = hebrew_chars.SHIN; break;
		case 't': rr = hebrew_chars.TAV; break;
	}
	return rr;
}



*/

