
import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from '../../bible_quest/code/bq_select_option_mgr.js';

import { get_bib_verse, bibobj_to_bibhtm,  	
} from '../../bible_quest/code/bq_bible_mgr.js';

import { get_strocode_verses, } from './sf_strong_mgr.js';
import { init_lang, } from './sf_lang_mgr.js';

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
	const bib = dv_version.innerHTML.trim();
	const dv_expr = document.getElementById(id_expression);
	const expr = dv_expr.value.trim();

	let crit = oldt;
	if(expr.startsWith("G_")){
		crit = newt;
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
		fill_verses(bib, resp);
	});
}	

export async function start_srch_mgr(curr_lang){
	init_lang(curr_lang);
	init_menus();

}

function fill_verses(bib_cod, all_found){
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
		
		bibobj_to_bibhtm(bibobj, id_ver, gvar.book_names).then((vs_txt) => {
			dv_ver.innerHTML = vs_txt;
		});
	}
}


/*
id_search
id_old_test
id_new_test
id_version
id_select
id_find
*/

