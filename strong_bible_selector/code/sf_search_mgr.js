
import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './sf_select_option_mgr.js';

import { bibobj_to_bibtxt, verse_to_min_greek, verse_to_may_greek, verse_to_hebrew, 
} from './sf_bible_mgr.js';

import { get_scode_verses, } from './sf_strong_mgr.js';
import { init_lang, } from './sf_lang_mgr.js';
import { init_biblang, eval_biblang_command } from './sf_biblang_mgr.js'

//import { keyb_handler, 
//} from './sf_tokenizer.js';
/*
id_search
id_old_test
id_new_test
id_loc_bib
id_select
id_find

*/


export let gvar = {};



const DEBUG_SELECTOR = true;

const GREEK_PREFIX = "G";

const old_crit_txt = {
	"1": "WestMin Leningrad Codex (WLC)",
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

const loc_bible = {
	"1": "Reina-Valera 1909 (RVA)",
	"2": "King James Bible (KJV)",
	"3": "Sagrada Biblia Libre para el Mundo (SBLM)",
	"4": "World Estandard Bible (WEB)",
};

const tgt_rx = {
	"1": "Old Testament Critical text (OT)",
	"2": "New Testament Critical text (NT)",
	"3": "Local bible (LOC)",
};

const out_txt = {
	"1": "Critical text minuscule (MIN)",
	"2": "Critical text mayuscule (MAY)",
	"3": "ASCII (ASC)",
};

const id_crit_sele = "id_crit_sele";
const id_expression = "id_expression";

const crit_regex = /[^(]*\((\w+)\).*/;

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

function add_menu(dv_menu, ops_menu){
	dv_menu.addEventListener('click', function() {
		const all_ops = Object.values(ops_menu);
		toggle_select_option(dv_menu, id_crit_sele, all_ops, function(dv_ret, dv_ops, val_sel, idx_sel){
			set_selec(dv_ret, val_sel);
			dv_ops.remove();
		});
		return;
	});
}

function init_menus(){
	
	const dv_old_tes = document.getElementById("id_old_test");
	add_menu(dv_old_tes, old_crit_txt);
	const dv_new_tes = document.getElementById("id_new_test");
	add_menu(dv_new_tes, new_crit_txt);
	const dv_loc_bib = document.getElementById("id_loc_bib");
	add_menu(dv_loc_bib, loc_bible);
	const dv_rx_tgt = document.getElementById("id_rx_tgt");
	add_menu(dv_rx_tgt, tgt_rx);
	const dv_out_txt = document.getElementById("id_out_txt");
	add_menu(dv_out_txt, out_txt);

	const dv_search = document.getElementById("id_search");
	const inp_box = document.createElement("input");
	inp_box.id = id_expression;
	inp_box.classList.add("full_width", "big_font");
	inp_box.value = "G66";
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
	const dv_loc_bib = document.getElementById("id_loc_bib");
	const loc_bib = dv_loc_bib.innerHTML.trim();
	const dv_rx_tgt = document.getElementById("id_rx_tgt");
	const rxtgt = dv_rx_tgt.innerHTML.trim();
	const dv_out_txt = document.getElementById("id_out_txt");
	const otxt = dv_out_txt.innerHTML.trim();
	const dv_expr = document.getElementById(id_expression);
	const expr = dv_expr.value.trim();

	gvar.biblang.curr_OT = oldt;
	gvar.biblang.curr_NT = newt;
	gvar.biblang.curr_LOC = loc_bib;
	
	const suf_tgt = rxtgt.toLowerCase();
	const rxin = "rx:" + suf_tgt;		// MUST MATCH ONE OF rx_in_nams in sf_biblang_mgr.js
	const wdin = "wd:" + suf_tgt;		// MUST MATCH ONE OF wd_in_nams in sf_biblang_mgr.js
	gvar.biblang.regex_input = rxin;
	gvar.biblang.word_input = wdin;
	
	gvar.biblang.output = otxt.toLowerCase();
	
	eval_biblang_command(expr).then((all_vrs) => {
		fill_verses(all_vrs);
	});	
}	

export async function start_srch_mgr(curr_lang){
	init_lang(curr_lang);
	init_biblang(curr_lang);
	init_menus();
}

function fill_verses(all_vrs){
	const oldt = gvar.biblang.curr_OT;
	const newt = gvar.biblang.curr_NT;
	const loc_bib = gvar.biblang.curr_LOC;
	let otxt = gvar.biblang.output.toUpperCase();
	const dv_old_tes = document.getElementById("id_old_test");
	dv_old_tes.innerHTML = oldt;
	const dv_new_tes = document.getElementById("id_new_test");
	dv_new_tes.innerHTML = newt;
	const dv_loc_bib = document.getElementById("id_loc_bib");
	dv_loc_bib.innerHTML = loc_bib;
	
	const rxin = gvar.biblang.regex_input;
	const rxi_val = (rxin.split(":"))[1].toUpperCase();

	if(rxi_val == "LOC"){
		otxt = "ASC";
	}
	
	const dv_out_txt = document.getElementById("id_out_txt");
	dv_out_txt.innerHTML = otxt;
	
	const dv_rx_tgt = document.getElementById("id_rx_tgt");
	dv_rx_tgt.innerHTML = rxi_val;
	
	let bib_ot = gvar.biblang.curr_LOC;
	let bib_nt = gvar.biblang.curr_LOC;
	let conv_fn_ot = null;
	let conv_fn_nt = null;
	if(rxi_val == "OT"){
		bib_ot = gvar.biblang.curr_OT;
		if((otxt == "MAY") || (otxt == "MIN")){
			conv_fn_ot = verse_to_hebrew;
		}
	}
	if(rxi_val == "NT"){
		bib_nt = gvar.biblang.curr_NT;
		if(otxt == "MAY"){
			conv_fn_nt = verse_to_may_greek;
		}
		if(otxt == "MIN"){
			conv_fn_nt = verse_to_min_greek;
		}
	}
	
	const dv_verses = document.getElementById("id_verses");
	dv_verses.innerHTML = "";
	//const all_vrs = Object.keys(all_found);
	let ii = 0;
	for(ii = 0; ii < all_vrs.length; ii++){
		const cod_ver = all_vrs[ii].split(':');
		const id_ver = cod_ver.join('_');
		const dv_ver = document.createElement("div");
		dv_ver.id = id_ver;
		dv_ver.innerHTML = id_ver;
		dv_verses.appendChild(dv_ver);
		
		let bib_cod = bib_ot;
		let conv_fn = conv_fn_ot;
		if(cod_ver[0] > 39){
			bib_cod = bib_nt;
			conv_fn = conv_fn_nt;
		}
		
		const bibobj = {};
		bibobj.bible = bib_cod;
		bibobj.book = cod_ver[0];
		bibobj.chapter = cod_ver[1];
		bibobj.verse = cod_ver[2];
		
		bibobj_to_bibtxt(bibobj, conv_fn).then((vs_txt) => {
			dv_ver.innerHTML = vs_txt;
		});
	}
}
	
