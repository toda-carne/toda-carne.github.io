
import { get_new_dv_under, scroll_to_top, toggle_select_option, get_opt_id, 
} from './sf_select_option_mgr.js';

import { verse_to_min_greek, verse_to_may_greek, verse_to_hebrew, get_text_analysis, make_strong_ref, get_scode_def, 
	get_scode_mutus, get_scode_roots, get_next_scode, get_prev_scode, fill_bibobj_vtxt, 
} from './sf_bible_mgr.js';

import { init_lang, } from './sf_lang_mgr.js';
import { init_biblang, eval_biblang_command, set_biblang_conf, verse_disp, 
	conf_to_mini, mini_to_conf, encode_mini, decode_mini, 	
} from './sf_biblang_mgr.js'

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


const GET_var_expr = "biblang";
const GET_var_conf = "conf";

const PERSISTANT_STATE = true;
const STORAGE_STATE_ID = "STORAGE_STATE_ID";

const SUF_SCOD_DEF = "_scod_def";

const id_grid_text_analysis = "id_grid_text_analysis";
const id_pop_menu_sele = "id_pop_menu_sele";
const id_select = "id_select";
const id_dbg_data = "id_dbg_data";
const id_history = "id_history";
const id_menu_tok = "id_menu_tok";
const id_header = "id_header";
const id_info = "id_info";
const id_del_expr = "id_del_expr";
const id_menu_scod_def = "id_menu_scod_def";
const id_menu_mutus = "id_menu_mutus";

const DEBUG_SELECTOR = true;
const DEBUG_SCODS = true;

const GREEK_PREFIX = "G";

const simbol_chars = {
UP:'\u2191',
DOWN:'\u2193',
};

const id_dv_tab = "id_dv_tab";
const tab_txt = "TAB";

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

function add_menu(dv_menu, ops_menu, update_fn){
	dv_menu.addEventListener('click', function() {
		const all_ops = Object.values(ops_menu);
		if(update_fn != null){
			update_fn(all_ops);
		}
		toggle_select_option(dv_menu, id_crit_sele, all_ops, function(dv_ret, dv_ops, val_sel, idx_sel){
			set_selec(dv_ret, val_sel);
			dv_ops.remove();
		});
		return;
	});
}

function get_tgt_rx_options(all_ops){
	const dv_old_tes = document.getElementById("id_old_test");
	const dv_new_tes = document.getElementById("id_new_test");
	const dv_loc_bib = document.getElementById("id_loc_bib");
	all_ops[0] += dv_old_tes.innerHTML;
	all_ops[1] += dv_new_tes.innerHTML;
	all_ops[2] += dv_loc_bib.innerHTML;
	return all_ops;
}

function init_menus(){
	
	const dv_old_tes = document.getElementById("id_old_test");
	add_menu(dv_old_tes, gvar.old_crit_txt);
	const dv_new_tes = document.getElementById("id_new_test");
	add_menu(dv_new_tes, gvar.new_crit_txt);
	const dv_loc_bib = document.getElementById("id_loc_bib");
	add_menu(dv_loc_bib, gvar.loc_bible);
	const dv_rx_tgt = document.getElementById("id_rx_tgt");
	add_menu(dv_rx_tgt, gvar.tgt_rx, get_tgt_rx_options);
	const dv_out_txt = document.getElementById("id_out_txt");
	add_menu(dv_out_txt, gvar.out_txt);

	//dv_out_txt.insertAdjacentElement('afterend', dv_tab);
	
	const dv_search = document.getElementById("id_search");
	const inp_box = document.createElement("input");
	inp_box.id = id_expression;
	inp_box.classList.add("width_95", "big_font");
	inp_box.value = "G66";
	inp_box.type = "text";
	dv_search.appendChild(inp_box);
	
	const dv_del_expr = document.createElement("div");
	dv_del_expr.id = id_del_expr;
	dv_del_expr.classList.add("delete_expr");
	dv_del_expr.innerHTML = "X";
	dv_del_expr.addEventListener('click', async function() {
		inp_box.value = "";
	});		
	dv_search.appendChild(dv_del_expr);
	
	const dv_select = document.getElementById(id_select);
	dv_select.addEventListener('click', async function() {
		await do_select();
		return;
	});

	inp_box.addEventListener('keydown', async function(ev) {
		if(ev.key === "Enter"){
			await do_select();
		}
		return;
	});
	
	const dv_header = document.createElement("div");
	dv_header.id = id_header;
	dv_header.classList.add("search_header");
	dv_header.innerHTML = "";
	dv_select.after(dv_header);

	const dv_info = document.createElement("div");
	dv_info.id = id_info;
	dv_info.classList.add("search_info");
	dv_info.innerHTML = "";
	dv_select.after(dv_info);

	let dv_button = null;
	let clk_hdlr = null;
	
	dv_button = document.getElementById("id_pop_menu"); // this id must be the same to the id in the HTML page.
	clk_hdlr = pop_menu_handler;
	if(dv_button != null){ dv_button.click_handler = clk_hdlr; dv_button.addEventListener('click', clk_hdlr); }
}

function get_ui_conf(){
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

	const rxin = rxtgt.toLowerCase();
	const txtout = otxt.toLowerCase();
	
	const conf = {};
	conf.curr_OT = oldt;
	conf.curr_NT = newt;
	conf.curr_LOC = loc_bib;
	conf.regex_input = rxin;
	conf.output = txtout;
	conf.expr = expr;
	return conf;
}

function set_ui_conf(conf){
	if(conf == null){
		return;
	}
	const dv_old_tes = document.getElementById("id_old_test");
	if(conf.curr_OT != null){
		dv_old_tes.innerHTML = conf.curr_OT;
	}
	const dv_new_tes = document.getElementById("id_new_test");
	if(conf.curr_NT != null){
		dv_new_tes.innerHTML = conf.curr_NT;
	}
	const dv_loc_bib = document.getElementById("id_loc_bib");
	if(conf.curr_LOC != null){
		dv_loc_bib.innerHTML = conf.curr_LOC;
	}
	const dv_rx_tgt = document.getElementById("id_rx_tgt");
	if(conf.regex_input != null){
		dv_rx_tgt.innerHTML = conf.regex_input.toUpperCase();
	}
	const dv_out_txt = document.getElementById("id_out_txt");
	if(conf.output != null){
		dv_out_txt.innerHTML = conf.output.toUpperCase();
	}
	const dv_expr = document.getElementById(id_expression);
	if(conf.expr != null){
		dv_expr.value = conf.expr;
	}
}

async function do_select(prv_conf){
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
	
	const rxin = rxtgt.toLowerCase();
	const txtout = otxt.toLowerCase();
	
	const dv_dbg_log = document.getElementById(id_dbg_data);
	if(dv_dbg_log != null){
		gvar.dbg_biblang = true;
	} else {
		gvar.dbg_biblang = false;
	}

	let conf = prv_conf;
	if(conf == null){
		conf = {};
		conf.curr_OT = oldt;
		conf.curr_NT = newt;
		conf.curr_LOC = loc_bib;
		conf.regex_input = rxin;
		conf.output = txtout;
	}
	//let comm = `.${oldt} ; .${newt} ; .${loc_bib} ; :${rxin} ; .${txtout} ; ${expr}`;
		
	const bl_obj = await eval_biblang_command(expr, conf);
	fill_search_info(bl_obj);
	await fill_verses(bl_obj);
	
	if(dv_dbg_log != null){
		toggle_dbg_info("keep");
	}	
	
	const dv_hist = document.getElementById(id_history);
	if(dv_hist != null){
		toggle_history_info("keep");
	}
}

function init_handlers(){
	const dv_verses = document.getElementById("id_verses");
	dv_verses.addEventListener('wheel', function(ev) {
		ev.stopPropagation();
	});
}

export async function start_srch_mgr(curr_lang){
	init_lang(curr_lang);
	init_biblang(curr_lang);
	init_menus();
	if(PERSISTANT_STATE){ read_storage_state(); }
	init_handlers();
	
	if(PERSISTANT_STATE){ window.addEventListener('beforeunload', write_storage_state); }
	
	const conf = set_search_from_url();
	if(conf != null){
		await do_select(conf);
	}
}

function get_conversion_func(){
	let otxt = gvar.biblang.output.toUpperCase();
	const rxi_val = gvar.biblang.regex_input.toUpperCase();
	if(rxi_val == "LOC"){
		otxt = "ASC";
	}
}

function verse_cod2obj(vrs_cod){
	const cod_ver = vrs_cod.split(':');
	const id_ver = cod_ver.join('_');
	const bibobj = {};
	
	//bibobj.bible = bib_ot;
	
	bibobj.id_dv_ver = id_ver;
	bibobj.book = Number(cod_ver[0]);
	bibobj.chapter = Number(cod_ver[1]);
	bibobj.verse = Number(cod_ver[2]);
	bibobj.cri_txt = gvar.biblang.curr_OT;
	if(bibobj.book > 39){
		bibobj.cri_txt = gvar.biblang.curr_NT;
	}
	const n2b = gvar.num2book_en;
	bibobj.book_name = n2b[bibobj.book];
	bibobj.conv_fn = verse_to_hebrew;
	if(bibobj.book > 39){
		bibobj.conv_fn = verse_to_min_greek;
	}
	if(bibobj.cri_txt == "LXX"){
		bibobj.conv_fn = verse_to_min_greek;
	}
		
	return bibobj;
}

async function fill_sdefs(bl_obj){
	const lang = gvar.lang;
	
	const dv_header = document.getElementById(id_header);
	const all_scods = bl_obj.all_scods;
	dv_header.innerHTML = "";
	
	let ii = 0;
	for(ii = 0; ii < all_scods.length; ii++){
		const scod = all_scods[ii];
		let conv_fn_nt = verse_to_hebrew;
		const is_gre = scod.startsWith(GREEK_PREFIX);
		if(is_gre){
			conv_fn_nt = verse_to_min_greek;
		}
		
		const dv_def = document.createElement("div");
		dv_def.id = scod + SUF_SCOD_DEF;
		dv_def.classList.add("full_width");
		//dv_def.classList.add("txt_ana_full_item");
		const sdef = await get_scode_def(scod, lang);
		
		const sco_txt = conv_fn_nt(sdef.asc);
		//const href_sco = make_strong_ref(scod);
		//const htm = `<a class="exam_ref big_font" href="${href_sco}" target="_blank">${scod}</a> <span>${sco_txt}</span>: ${sdef.def}`;
		const htm = `<span class="scode_info">${scod}</span> <span>${sco_txt}</span>: ${sdef.def}`;
		dv_def.innerHTML = htm;
		dv_header.appendChild(dv_def);
		
		dv_def.addEventListener('click', function() {
			toggle_scod_actions(dv_def, scod);
			scroll_to_top(dv_def);
		});		
	}
}

function fill_search_info(bl_obj){
	const lang = gvar.lang;
	
	const dv_info = document.getElementById(id_info);
	dv_info.innerHTML = "";

	const oldt = gvar.biblang.curr_OT;
	const newt = gvar.biblang.curr_NT;
	const loc_bib = gvar.biblang.curr_LOC;
	const rng_tit = gvar.all_msg.ranges_search;
	const rng_str = bl_obj.intervals.map(rr => rr.join("-")).join(" ");
	const rxi_val = gvar.biblang.regex_input.toUpperCase();
	let rx_in = gvar.biblang.curr_LOC;
	if(rxi_val == "OT"){
		rx_in = gvar.biblang.curr_OT;
	}
	if(rxi_val == "NT"){
		rx_in = gvar.biblang.curr_NT;
	}
	const info = `
	<span class="ot_info">${oldt}</span> 
	<span class="nt_info">${newt}</span> -> 
	<span class="loc_info">${loc_bib}</span> 
	<span class="rx_in_info">${gvar.all_msg.text_search} ${rxi_val} (<span class="rx_in_info_bib">${rx_in}</span>)</span> 
	<span class="ranges_info">${gvar.all_msg.ranges_search} ${rng_str}</span>`;// rx_in_info_bib
	dv_info.innerHTML = info;
}

/*
/*
function get_conv_fn(bib, book, op){
	let conv_fn = verse_to_hebrew;
	let is_greek = (book > 39);
	if(bib == "LXX"){
		is_greek = true;
	}
	if(is_greek){
		conv_fn = verse_to_min_greek;
		if(op == "MAY"){
			conv_fn = verse_to_may_greek;
		}
	}
	return conv_fn;
}*/

async function fill_verses(bl_obj){
	const all_vrs = bl_obj.lverses;
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
	
	const rxi_val = gvar.biblang.regex_input.toUpperCase();

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
		if(bib_ot == "LXX"){
			if(otxt == "MAY"){
				conv_fn_ot = verse_to_may_greek;
			}
			if(otxt == "MIN"){
				conv_fn_ot = verse_to_min_greek;
			}
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

	if(all_vrs.length == 0){
		dv_verses.innerHTML = gvar.all_msg.no_verses;
	}
	
	scroll_to_top(dv_verses);
			
	let ii = 0;
	for(ii = 0; ii < all_vrs.length; ii++){
		const bibobj = verse_cod2obj(all_vrs[ii]);
		const dv_ver = document.createElement("div");
		dv_ver.id = bibobj.id_dv_ver;
		dv_ver.innerHTML = bibobj.id_dv_ver;
		dv_verses.appendChild(dv_ver);
		
		bibobj.ui_idx = ii;
		bibobj.bible = bib_ot;
		let conv_fn = conv_fn_ot;
		if(bibobj.book > 39){
			bibobj.bible = bib_nt;
			conv_fn = conv_fn_nt;
		}
		if(conv_fn != null){
			bibobj.conv_fn = conv_fn;
		}
		
		await fill_bibobj_vtxt(bibobj);
		
		add_ui_bibobj(bibobj, dv_ver, conv_fn, bl_obj)		
	}
	
	await fill_sdefs(bl_obj);
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
	
	op = document.createElement("div");
	op.classList.add("exam", "is_block", "big_item");
	op.innerHTML = "GET WEB LINK";
	op.addEventListener('click', async () => {
		await get_href();
	});
	dv_pop_men.appendChild(op);
	
	op = document.createElement("div");
	op.classList.add("exam", "is_block", "big_item");
	op.innerHTML = "SHOW WEB LINK";
	op.addEventListener('click', () => {
		const hrf = get_search_href();
		const dv_info = document.getElementById(id_info);
		dv_info.innerHTML = hrf;
	});
	dv_pop_men.appendChild(op);
	
	scroll_to_top(dv_pop_men);
}

function toggle_history_info(toggle_op){
	const dv_expr = document.getElementById(id_expression);
	let his_vals = gvar.biblang.history.map((itm) => itm.expr);
	let clk_fn = async function(dv_ret, dv_ops, val_sel, idx_sel){
		dv_expr.value = val_sel;
		//const idx_conf = dv_ops
		const conf = gvar.biblang.history[idx_sel].conf;
		await do_select(conf);
		//dv_ops.remove();
	}
	if(his_vals.length == 0){
		his_vals = ["NO DATA TO SHOW. Do a search first."];
		clk_fn = null;
	}
	const cls_men = ["aux_item", "has_border"];
	const cls_itm = [];
	const dv_select = document.getElementById(id_select);
	const dv_to_scroll = null;
	toggle_select_option(dv_select, id_history, his_vals, clk_fn, cls_men, cls_itm, dv_to_scroll, toggle_op);
}

function toggle_books_info(){
	const dv_expr = document.getElementById(id_expression);
	let abbr = Object.keys(gvar.abbr2num);
	let clk_fn = async function(dv_ret, dv_ops, val_sel, idx_sel){
		add_to_expr(val_sel);
	}
	const cls_men = ["aux_item", "has_border"];
	const cls_itm = ["is_option"];
	const dv_select = document.getElementById(id_select);
	toggle_select_option(dv_select, "id_books", abbr, clk_fn, cls_men, cls_itm);
}

function toggle_dbg_info(toggle_op){
	let log = gvar.biblang.dbg_log;
	let clk_fn = null;
	if(log.length == 0){
		log = [`NO DATA TO SHOW. Run a command.`];
	}
	const cls_men = ["aux_item", "has_border"];
	const cls_itm = [];
	const dv_select = document.getElementById(id_select);
	const dv_to_scroll = null;
	toggle_select_option(dv_select, id_dbg_data, log, clk_fn, cls_men, cls_itm, dv_to_scroll, toggle_op);
}

function close_pop_menu() {
	let dv_pop_men = document.getElementById(id_pop_menu_sele);
	if(dv_pop_men != null){ dv_pop_men.remove(); }
}

function read_storage_state(){
	let state_str = window.localStorage.getItem(STORAGE_STATE_ID);
	let stat = {};
	if(state_str != null){
		stat = JSON.parse(state_str);
		if(stat.ui_conf != null){
			set_ui_conf(stat.ui_conf);
			set_biblang_conf(stat.ui_conf);
		}
		if(stat.hist != null){
			if(gvar.biblang == null){ gvar.biblang = {}; } 
			gvar.biblang.history = stat.hist;
		}
	}
}

function write_storage_state(){
	let stat = {};
	if(gvar.biblang.history != null){
		stat.hist = gvar.biblang.history;
	}
	stat.ui_conf = get_ui_conf();
	window.localStorage.setItem(STORAGE_STATE_ID, JSON.stringify(stat));
}

async function toggle_text_analysis(dv_txt, bibobj, bl_obj){
	var dv_ana = get_new_dv_under(dv_txt, id_grid_text_analysis);
	if(dv_ana == null){
		return;
	}
	dv_ana.classList.add("grid_txt_analysis", "grid_txt_columns");
	
	scroll_to_top(dv_txt);
	
	gvar.curr_dv_ver_id = bibobj.id_dv_ver;		// UGLY. It is to show the loding image under the right verse. 
	const full_ana = await get_text_analysis(bibobj.cri_txt, bibobj.book_name, bibobj.chapter, bibobj.verse, bl_obj);
	gvar.curr_dv_ver_id = null;
	
	if(DEBUG_SELECTOR){
		console.log("TEXT_ANALYSIS_OF " + dv_txt.id);
		console.log(bibobj);
		console.log(full_ana);
	}
	
	const toks = full_ana.ana;
	let ii = 0;
	for(; ii < toks.length; ii++){
		const tok = toks[ii];
		add_text_analysis_word(dv_ana, bibobj, tok);
		add_all_added(dv_ana, bibobj, tok);
	}
}

function add_text_analysis_word(dv_ana, bibobj, tok, is_added){
	let cri = "";
	if(bibobj.conv_fn != null){
		cri = bibobj.conv_fn(tok.id);
	}
	let bib_cri = bibobj.cri_txt;
	let marked = false;
	if(! tok.comm && ! is_added && (bib_cri != "LXX")){
		bib_cri = "BH";
		marked = true;
	}
	
	const t1 = add_tok_item(dv_ana, 1, cri, is_added, marked);
	const t2 = add_tok_item(dv_ana, "auto", tok.id, is_added, marked, true);
	const t3 = add_tok_item(dv_ana, "auto", tok.sco, is_added, marked, false, tok.sel_scod);
	const t4 = add_tok_item(dv_ana, "auto", bib_cri, is_added, marked, true);
	const t5 = add_tok_item(dv_ana, "auto", tok.tra, is_added, marked);
	
	t1.addEventListener('click', function() {
		toggle_asc_id_menu(t5, bibobj, tok);
	});		
	t2.addEventListener('click', function() {
		toggle_asc_id_menu(t5, bibobj, tok);
	});		
	t3.addEventListener('click', async function() {
		toggle_scod_menu(t5, bibobj, tok);
	});		
	
}

function add_all_added(dv_ana, bibobj, tok){
	const added = tok.added;
	if(added == null){
		return;
	}
	let ii = 0;
	for(; ii < added.length; ii++){
		const obj = added[ii];
		if(obj.idx1 != null){
			add_text_analysis_word(dv_ana, bibobj, obj, true);
		}
	}
}

function add_tok_item(dv_ana, col, htm, is_added, marked, is_optional, sel_itm){
	const dv_itm = document.createElement("div");
	dv_itm.classList.add("txt_ana_item");
	if(is_added){
		dv_itm.classList.add("txt_ana_added_item");
	}
	if(marked){
		dv_itm.classList.add("txt_ana_marked_item");
	}
	if(sel_itm){
		dv_itm.classList.add("txt_ana_selected_item");
	}
	if(is_optional){
		dv_itm.classList.add("txt_optional_item");
	}
	dv_itm.style.gridColumnStart = col;
	dv_itm.style.gridColumnEnd = col;
	dv_itm.innerHTML = "";
	if(htm != null){
		dv_itm.innerHTML = htm;
	}
	dv_ana.appendChild(dv_itm);
	return dv_itm;
}

function toggle_asc_id_menu(dv_up, bibobj, tok){
	const dv_expr = document.getElementById(id_expression);
	const ops = gvar.tok_ops_asc_id; // ["exact", "partial", "add"];
	if(ops.length != 3){
		console.error("ops.length != 3");
		return;
	}
	let clk_fn = async function(dv_ret, dv_ops, val_sel, idx_sel){
		let the_expr = null;
		let out = ":ot";
		if(bibobj.book >= 40){
			out = ":nt";
		}
	if(idx_sel == 0){
			the_expr = `${out} ; /(^|\\s)${tok.id}(\\s|$)/`;
		}
		if(idx_sel == 1){
			the_expr = `${out} ; /${tok.id}/`;
		}
		if(idx_sel == 2){
			add_to_expr(tok.id);
		}
		if(the_expr != null){
			dv_expr.value = the_expr;
			if(idx_sel != 2){
				await do_select();
			}
		}
		dv_ops.remove();
		scroll_to_top(dv_expr);
	}
	const cls_men = ["aux_item"];
	const cls_itm = ["is_option"];
	const dv_to_scroll = null;
	const toggle_op = null;
	toggle_select_option(dv_up, id_menu_tok, ops, clk_fn, cls_men, cls_itm, dv_to_scroll, toggle_op);
}

function toggle_scod_menu(dv_up, bibobj, tok){
	if(tok.sco.length == 0){
		return;
	}
	const dv_expr = document.getElementById(id_expression);
	const ops = gvar.tok_ops_scod; // ["select", "add", "bibhub"];
	if(ops.length != 3){
		console.error("ops.length != 3");
		return;
	}
	let clk_fn = async function(dv_ret, dv_ops, val_sel, idx_sel){
		let the_expr = null;
		if(idx_sel == 0){
			dv_expr.value = tok.sco;
			await do_select();
		}
		if(idx_sel == 1){
			add_to_expr(tok.sco);
		}
		if(idx_sel == 2){
			// go to bibhub
			const href_sco = make_strong_ref(tok.sco);
			window.open(href_sco, '_blank');
		}
		dv_ops.remove();
		scroll_to_top(dv_expr);
	}
	const cls_men = ["aux_item"];
	const cls_itm = ["is_option"];
	const dv_to_scroll = null;
	const toggle_op = null;
	toggle_select_option(dv_up, id_menu_tok, ops, clk_fn, cls_men, cls_itm, dv_to_scroll, toggle_op);
}

function cmp_ocurrence(oc1, oc2){
	/*{
			lng: rr[0].length,
			idx: rr.index,
	}
		*/
	const dd = (oc1.idx - oc2.idx);
	if(dd != 0){ return dd; }
	
	const l1 = oc1.lng;
	const l2 = oc2.lng;
	return (l2 - l1);
}

function insert_tag(htm, pos, tag){
	if(pos < htm.lpos){
		return;
	}
	const idx = pos + htm.disp;
	if((idx < 0) || (idx > htm.txt.length)){
		return;
	}
	htm.txt = htm.txt.slice(0, idx) + tag + htm.txt.slice(idx);
	htm.disp += tag.length;
	htm.lpos = pos;
}

function set_css_matches(vs_txt, bibobj, bl_obj){
	if(vs_txt == null){	return vs_txt; }
	if(bl_obj.all_ocu == null){	return vs_txt; }
	if(bibobj.bible == null){ return vs_txt; }
	let bib = bibobj.bible;
	if(bl_obj.all_ocu[bib] == null){ 
		bib += "i";
		if(bl_obj.all_ocu[bib] == null){ return vs_txt; }
	}
	
	const vs_id = "" + bibobj.book + ":" + bibobj.chapter + ":" + bibobj.verse;
	if(bl_obj.all_ocu[bib][vs_id] == null){ return vs_txt; }
	
	const vs_ocu = bl_obj.all_ocu[bib][vs_id];
	
	const socu = vs_ocu.sort(cmp_ocurrence);

	const ini_tag = `<span class="txt_matched">`;
	const end_tag = `</span>`;
	
	let htm = { txt: vs_txt, disp: 0, lpos: 0, };
	let ii = 0;
	for(; ii < vs_ocu.length; ii++){
		const ocu = vs_ocu[ii];
		insert_tag(htm, ocu.idx, ini_tag);
		const end_pos = ocu.idx + ocu.lng;
		insert_tag(htm, end_pos, end_tag);
	}
	
	return htm.txt;
}

function toggle_scod_actions(dv_def, scod){
	const id_menu = id_menu_scod_def;
		
	const ops = gvar.ops_def_scod; // ["prv", "nxt", "roots", "mutual", "bibhub"];
	if(ops.length != 5){
		console.error("ops.length != 5");
		return;
	}
	const dv_expr = document.getElementById(id_expression);
	let clk_fn = async function(dv_ret, dv_ops, val_sel, idx_sel){
		let the_expr = null;
		if(idx_sel == 0){
			const prv = await get_prev_scode(scod);
			dv_expr.value = prv;
			await do_select();
		}
		if(idx_sel == 1){
			const nxt = await get_next_scode(scod);
			dv_expr.value = nxt;
			await do_select();
		}
		if(idx_sel == 2){
			const roots = await get_scode_roots(scod);
			if(DEBUG_SCODS){
				console.log("get_scode_roots");
				console.log(roots);
			}
			let subops = ["HAS NO ROOT"];
			if((roots != null) && (roots.length > 0)){
				subops = roots.split(" ");
			}
			toggle_scod_subops(dv_ops, scod, id_menu, idx_sel, subops);
		}
		if(idx_sel == 3){
			const mutus = await get_scode_mutus(scod);
			if(DEBUG_SCODS){
				console.log("get_scode_mutus");
				console.log(mutus);
			}
			let subops = ["HAS NO MUTUAL"];
			if((mutus != null) && (mutus.length > 0)){
				subops = mutus.split(" ");
			}
			toggle_scod_subops(dv_ops, scod, id_menu, idx_sel, subops);
		}
		if(idx_sel == 4){
			const href_sco = make_strong_ref(scod);
			window.open(href_sco, '_blank');
			dv_ops.remove();
		}
	}
	const cls_men = ["aux_item"];
	const cls_itm = ["is_option"];
	const dv_to_scroll = null;
	const toggle_op = null;
	toggle_select_option(dv_def, id_menu, ops, clk_fn, cls_men, cls_itm, dv_to_scroll, toggle_op);
}

function toggle_scod_subops(dv_parent_ops, scod, id_menu, idx_sel, sub_ops){
	const opt_id = get_opt_id(id_menu, idx_sel);
	const dv_opt = document.getElementById(opt_id);
	
	const dv_expr = document.getElementById(id_expression);
	let clk_fn = async function(dv_ret, dv_ops, val_sel, idx_sel){
		dv_expr.value = val_sel;
		await do_select();
		dv_ops.remove();
		dv_parent_ops.remove();
	}
	const cls_men = ["aux_item"];
	const cls_itm = ["is_option"];
	const dv_to_scroll = null;
	const toggle_op = null;
	toggle_select_option(dv_opt, id_menu_mutus, sub_ops, clk_fn, cls_men, cls_itm, dv_to_scroll, toggle_op);
}

function add_to_expr(cad){
	const dv_expr = document.getElementById(id_expression);
	//const has_foc = (document.activeElement === dv_expr);
	const pos = dv_expr.selectionStart;
	if(pos > 0){
		const txt = dv_expr.value;
		dv_expr.value = txt.substring(0, pos) + cad + txt.substring(pos);
		dv_expr.focus();
		const pos2 = pos + cad.length;
		dv_expr.setSelectionRange(pos2, pos2);
		return;
	}
	dv_expr.value += cad;
}

async function select_disp(bibobj, num){
	const vr = [bibobj.book, bibobj.chapter, bibobj.verse];
	const fst = verse_disp(vr, -num);
	const lst = verse_disp(vr, num);
	const expr = `${fst[0]}:${fst[1]}:${fst[2]} :: ${lst[0]}:${lst[1]}:${lst[2]}`;
	const dv_expr = document.getElementById(id_expression);
	dv_expr.value = expr;
	await do_select();
}

function add_ui_disp(dv_ver, bibobj, disp, htm, butt_classes){
	let dv_itm = null;
	dv_itm = document.createElement("div");
	dv_itm.classList.add(...butt_classes);
	dv_itm.innerHTML = htm;
	dv_itm.addEventListener('click', async function() {
		await select_disp(bibobj, disp);
	});		
	dv_ver.appendChild(dv_itm);
}

function add_ui_bibobj(bibobj, dv_ver, conv_fn, bl_obj){
	
	const vhref = bibobj.href_bh;
	let vcit = "INVALID_BIBLE_CITATION";
	if(bibobj.vcit != null){
		vcit = `<b>${bibobj.vcit}</b>`;
	}
	let vtxt = "INVALID_BIBLE_TEXT";
	if(bibobj.vtxt != null){
		vtxt = bibobj.vtxt;
		if(conv_fn != null){
			vtxt = conv_fn(vtxt);
		}
		vtxt = set_css_matches(vtxt, bibobj, bl_obj);
	}
	
	const butt_classes = ["is_verse_oper"];
	
	dv_ver.innerHTML = "";
	
	add_ui_disp(dv_ver, bibobj, 5, vcit, ["is_verse_cit"]);
	add_ui_disp(dv_ver, bibobj, 10, "(10)", butt_classes);
	add_ui_disp(dv_ver, bibobj, 20, "(20)", butt_classes);
	add_ui_disp(dv_ver, bibobj, 40, "(40)", butt_classes);

	let dv_itm = null;
	dv_itm = document.createElement("div");
	dv_itm.classList.add(...butt_classes);
	dv_itm.innerHTML = "bibhub";
	dv_itm.addEventListener('click', function() {
		window.open(vhref, '_blank');
	});		
	dv_ver.appendChild(dv_itm);

	vtxt = `<b>${vtxt}</b>`;
	
	const dv_txt = document.createElement("div");
	dv_txt.innerHTML = vtxt;
	if(conv_fn == verse_to_hebrew){
		dv_txt.classList.add("in_right");
	}
	dv_txt.addEventListener('click', async function() {
		await toggle_text_analysis(dv_txt, bibobj, bl_obj);
		scroll_to_top(dv_ver);
	});		
	dv_ver.appendChild(dv_txt);	
}

function get_search_href(){
	const loc = document.location;
	const his = gvar.biblang.history;
	if(his == null){
		const qr_href = `${loc.origin}${loc.pathname}`;
		return qr_href;
	}
	if(his.length == 0){
		const qr_href = `${loc.origin}${loc.pathname}`;
		return qr_href;
	}
	const last = his[his.length - 1];
	const mm = conf_to_mini(last.conf);
	const mm2 = encode_mini(mm);
	const enc_conf = encodeURIComponent(mm2);
	const enc_expr = encodeURIComponent(last.expr);
	const qr_href = `${loc.origin}${loc.pathname}?${GET_var_expr}=${enc_expr}&${GET_var_conf}=${enc_conf}`;
	
	console.log("get_search_href");
	console.log(qr_href);
	return qr_href;
}

function find_GET_parameter(prm_nm) {
	let result = null,
	tmp = [];
	location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if(tmp[0] === prm_nm){ result = decodeURIComponent(tmp[1]); }
		});
	return result;
}

function set_search_from_url(){
	const expr = find_GET_parameter(GET_var_expr);
	if(expr == null){
		return null;
	}
	const mini = find_GET_parameter(GET_var_conf);
	if(mini == null){
		return null;
	}
	const mm = decode_mini(mini);
	const conf = mini_to_conf(mm);

	const dv_expr = document.getElementById(id_expression);
	dv_expr.value = expr;
	set_ui_conf(conf);
	set_biblang_conf(conf);
	
	return conf;
}

async function get_href(){
	try{
		const hrf = get_search_href();
		if(hrf != null){
			await navigator.clipboard.writeText(hrf);
		}
	} catch(err){
		console.error("Cannot get_href", err);
	}
}


