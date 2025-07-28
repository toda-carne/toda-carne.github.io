
import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './sf_select_option_mgr.js';

import { bibobj_to_bibtxt, verse_to_min_greek, verse_to_may_greek, verse_to_hebrew, get_text_analysis, get_scode_verses, 
} from './sf_bible_mgr.js';

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


const id_grid_text_analysis = "id_grid_text_analysis";
const id_pop_menu_sele = "id_pop_menu_sele";

const DEBUG_SELECTOR = true;

const GREEK_PREFIX = "G";

const simbol_chars = {
UP:'\u2191',
DOWN:'\u2193',
};

const id_dv_tab = "id_dv_tab";
const tab_txt = "TAB";

const tab1_adds = {
	id_up_arrow: { htm: "" + simbol_chars.UP, hndlr: set_prv_in_history, },
	id_down_arrow: { htm: "" + simbol_chars.DOWN, hndlr: set_nxt_in_history, },
	id_equal: { htm: "=", hndlr: () => { append_command_text("="); }, },
	id_more: { htm: ">", hndlr: () => { append_command_text(">"); }, },
	id_less: { htm: "<", hndlr: () => { append_command_text("<"); }, },
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

function get_tgt_rx_options(){
	const rx_ops = JSON.parse(JSON.stringify(gvar.tgt_rx, null, null));
	rx_ops["1"] += gvar.biblang.curr_OT;
	rx_ops["2"] += gvar.biblang.curr_NT;
	rx_ops["3"] += gvar.biblang.curr_LOC;
	return rx_ops;
}

function init_menus(){
	
	const dv_old_tes = document.getElementById("id_old_test");
	add_menu(dv_old_tes, gvar.old_crit_txt);
	const dv_new_tes = document.getElementById("id_new_test");
	add_menu(dv_new_tes, gvar.new_crit_txt);
	const dv_loc_bib = document.getElementById("id_loc_bib");
	add_menu(dv_loc_bib, gvar.loc_bible);
	const dv_rx_tgt = document.getElementById("id_rx_tgt");
	add_menu(dv_rx_tgt, get_tgt_rx_options());
	const dv_out_txt = document.getElementById("id_out_txt");
	add_menu(dv_out_txt, gvar.out_txt);

	const dv_tab = document.createElement("div");
	dv_tab.id = id_dv_tab;
	dv_tab.innerHTML = tab_txt;
	dv_tab.classList.add("bib_item");
	dv_out_txt.insertAdjacentElement('afterend', dv_tab);
	
	dv_tab.addEventListener('click', function() {
		add_buttons(dv_tab);
		return;
	});
	
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

	let dv_button = null;
	let clk_hdlr = null;
	
	dv_button = document.getElementById("id_pop_menu"); // this id must be the same to the id in the HTML page.
	clk_hdlr = pop_menu_handler;
	if(dv_button != null){ dv_button.click_handler = clk_hdlr; dv_button.addEventListener('click', clk_hdlr); }
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
	
	eval_biblang_command(expr).then((robj) => {
		const all_vrs = robj.lverses;
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
		
		const id_txt = "id_verse_" + ii;
		
		bibobj_to_bibtxt(bibobj, conv_fn, id_txt).then((vs_txt) => {
			dv_ver.innerHTML = vs_txt;
			const dv_txt = document.getElementById(id_txt);
			dv_txt.addEventListener('click', async function() {
				await toggle_text_analysis(dv_txt, bibobj);
			});
		});
	}
}
	
async function toggle_text_analysis(dv_txt, bibobj){
	var dv_ana = get_new_dv_under(dv_txt, id_grid_text_analysis);
	if(dv_ana == null){
		return;
	}
	dv_ana.classList.add("grid_txt_analysis");
	
	const n2b = gvar.num2book_en;
	const book = Number(bibobj.book);
	const chapter = bibobj.chapter;
	const verse = bibobj.verse;
	
	let bib = gvar.biblang.curr_OT;
	if(book > 39){
		bib = gvar.biblang.curr_NT;
	}
	const full_ana = await get_text_analysis(bib, n2b[book], chapter, verse);
	
	console.log("TEXT_ANALYSIS_OF " + dv_txt.id);
	console.log(bibobj);
	console.log(full_ana);
	
	const toks = full_ana.ana;
	let ii = 0;
	for(; ii < toks.length; ii++){
		const tok = toks[ii];
		const dv_tok = dv_ana.appendChild(document.createElement("div"));
		dv_tok.classList.add("txt_ana_item");
		dv_tok.style.gridColumnStart = 1;
		dv_tok.style.gridColumnEnd = -1;
		dv_tok.innerHTML = tok.id + " " + tok.sco + " :" + tok.tra;
	}
}

function pop_menu_handler(){
	const dv_pop_sec = document.getElementById("id_pop_opt_sec");

	let dv_pop_men = null;
	dv_pop_men = get_new_dv_under(dv_pop_sec, id_pop_menu_sele);
	if(dv_pop_men == null){
		if(DEBUG_POP_MENU){ console.log("toggle_pop_menu OFF"); }
		return;
	}
	
	let op = document.createElement("div");
	op.classList.add("exam", "is_block", "big_item");
	op.innerHTML = "HISTORY";
	op.addEventListener('click', toggle_history_info);
	dv_pop_men.appendChild(op);
	
	op = document.createElement("div");
	op.classList.add("exam", "is_block", "big_item");
	op.innerHTML = "BOOKS";
	op.addEventListener('click', toggle_books_info);
	dv_pop_men.appendChild(op);
	
	op = document.createElement("div");
	op.classList.add("exam", "is_block", "big_item");
	op.innerHTML = "DEBUG";
	op.addEventListener('click', toggle_dbg_info);
	dv_pop_men.appendChild(op);
	
	scroll_to_top(dv_pop_men);
}

function toggle_data(id_dat, arr_dat){
	const dv_dat = document.getElementById(id_dat);
	if(dv_dat == null){ console.err("No div for " + id_dat); }
	const cnt = dv_dat.innerHTML;
	if(cnt != ""){
		dv_dat.innerHTML = "";
		return;
	}

	if(arr_dat.length == 0){
		dv_dat.innerHTML = "NO DATA TO SHOW";
		return;
	}

	let ii = 0;
	for(; ii < arr_dat.length; ii++){
		dv_dat.innerHTML += arr_dat[ii] + "<br>";
	}
}

function toggle_history_info(){
	toggle_data("id_history", gvar.biblang.history);
	//close_pop_menu();
}

function toggle_books_info(){
	const abbr = Object.keys(gvar.abbr2num);
	toggle_data("id_info", abbr);
	//close_pop_menu();
}

function toggle_dbg_info(){
	toggle_data("id_dbg", gvar.biblang.dbg_log);
	//close_pop_menu();
}

function close_pop_menu() {
	let dv_pop_men = document.getElementById(id_pop_menu_sele);
	if(dv_pop_men != null){ dv_pop_men.remove(); }
}

function get_tab_buttons_to_show(){
}

function add_buttons(dv_tab){
	//tab1_adds
	const ids1 = object.keys(tab1_adds);
	const id_test = ids1[0];
	const dv_test = document.getElementById(id_test);
	if(dv_test != null){
	}
	//const dv_test = 
}

function set_prv_in_history(){
}

function set_nxt_in_history(){
}

function append_command_text(txt){
}

