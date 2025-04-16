
import { gvar, init_glb_vars, get_qid_base, init_default_lang, } from './bq_tools.js';
import { init_page_buttons, init_firebase_mgr, fb_mod, fill_div_user, init_page_exam, start_qmodu, update_qmodu_title, add_last_module_ending, 
} from './bq_quest_mgr.js';

import { init_loc_cand_referrer, 
} from './bq_referrer_mgr.js';

import { init_qmodu_info, } from '../quest_conf/bq_modules.js';

const DEBUG_LOADER = true;

const INVALID_MONAM = "INVALID_MONAM";
const INVALID_TITLE = "INVALID_TITLE";

let site_lang = "en";
let local_conf_qmodus = null;

const STORAGE_FINI_QMODUS_ID = "STORAGE_FINI_QMODUS_ID";

function read_storage_fini_qmodus(){
	let all_fini_str = window.localStorage.getItem(STORAGE_FINI_QMODUS_ID);
	let all_fini = {};
	if(all_fini_str != null){
		all_fini = JSON.parse(all_fini_str);
	}
	return all_fini;
}

export function write_storage_fini_qmodus(all_fini){
	const prev = read_storage_fini_qmodus();
	const are_eq = objs_eq(prev, all_fini);
	if(! are_eq){
		window.localStorage.setItem(STORAGE_FINI_QMODUS_ID, JSON.stringify(all_fini));
	}
	return are_eq;
}

function objs_eq(obj1, obj2){
	const s1 = JSON.stringify(obj1);
	const s2 = JSON.stringify(obj2);
	return (s1 == s2);
}

export function set_fini_qmodu(qmonam){
	const all_fini = get_fini_qmodus();
	all_fini[qmonam] = 1;
	write_storage_fini_qmodus(all_fini);
}

function get_fini_qmodus(){
	let all_fini = null;
	if((fb_mod != null) && (fb_mod.bq_fb_user_finished_qmodules != null)){ 
		all_fini = fb_mod.bq_fb_user_finished_qmodules;		
	} else {
		all_fini = read_storage_fini_qmodus();
	}
	return all_fini;
}

function init_conf_qmodus(){
	if(local_conf_qmodus == null){ 
		const loc_vars = {};
		init_qmodu_info(loc_vars);
		local_conf_qmodus = loc_vars.conf_qmodus;
	}
	if(gvar.conf_qmodus == null){ 
		gvar.conf_qmodus = local_conf_qmodus;
	}
}

function get_nxt_qmonam(){
	if(gvar.conf_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus == null."); return null; }
	if(gvar.conf_qmodus.all_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus.all_qmodus == null."); return null; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	const all_fini = get_fini_qmodus();
	for(const qmonam of all_qmonams){
		if(! is_qmodu_dnf_sat(qmonam, all_fini)){
			continue;
		}
		if(all_fini[qmonam] == null){
			return qmonam;
		}
	}
	if(all_qmonams.length > 0){
		const fst_qmonam = all_qmonams[0];
		if(all_fini[fst_qmonam] == null){
			return fst_qmonam;
		}
	}
	return null;
}

let md_lang = null;
let md_txt = null;
let md_cont_db = null;

async function import_file(mod_nm){
	if(mod_nm == null){ return null; }
	const resp = import(mod_nm);
	return resp;
}

function init_all_jsmod_handles(){
	md_lang = null;
	md_txt = null;
	md_cont_db = null;
}

async function import_qmodu_files(qmonam){
	if(gvar.conf_qmodus == null){ console.error("import_qmodu_files. gvar.conf_qmodus == null."); return; }
	
	init_all_jsmod_handles();

	let txt_fn = null;
	let db_fn = null;

	if(qmonam != null){
		const txt_fnams = gvar.conf_qmodus.all_qmodus[qmonam].text_lang;
		txt_fn = "../" + txt_fnams[site_lang];
		db_fn = "../" + gvar.conf_qmodus.all_qmodus[qmonam].quest_file;
	}
	const results = await Promise.all([
		import_file("../quest_conf/bq_lang_" + site_lang + ".js"),
		import_file(txt_fn),
		import_file(db_fn),
	]);
	
	md_lang = results[0];
	md_txt = results[1];
	md_cont_db = results[2];
}

function get_title(){
	if(gvar.current_qmonam == null){ console.error("write_firebase_qmodu_results. gvar.current_qmonam == null."); return INVALID_TITLE; }
	if(gvar.conf_qmodus == null){ return INVALID_TITLE; }
	const cf_qmodu = gvar.conf_qmodus.all_qmodus[gvar.current_qmonam];
	let title = gvar.current_qmonam;
	let d_nam = null;
	if(cf_qmodu.display_name != null){ d_nam = cf_qmodu.display_name[gvar.site_lang]; }
	if(d_nam != null){ title = d_nam; }
	
	return title;
}

export async function load_qmodu(qmonam, st_qmodu){
	init_all_jsmod_handles();
	const all_vars = {};
	all_vars.site_img_dir = "../img/";
	all_vars.qmodu_img_dir = "../img/"
	all_vars.site_lang = site_lang;
	all_vars.qmodule_title = INVALID_TITLE;
	init_glb_vars(all_vars);	
	init_conf_qmodus();
	
	if(qmonam != null){ 
		console.log("CURRENT MODULE NAME:" + qmonam);	
		gvar.current_qmonam = qmonam;
		gvar.qmodule_title = get_title();
	}
	init_page_exam();
	
	await import_qmodu_files(qmonam);	

	init_default_lang(all_vars);
	md_lang.init_lang_module(all_vars);
	
	update_qmodu_title();
	
	if(gvar.conf_qmodus.image_dir != null){ gvar.site_img_dir = "../" + gvar.conf_qmodus.image_dir + "/"; }
	
	if(qmonam != null){ 
		const cf_qmodu = gvar.conf_qmodus.all_qmodus[qmonam];	
		if(cf_qmodu.image_dir != null){ gvar.qmodu_img_dir = "../" + cf_qmodu.image_dir + "/"; }
	}	
	
	if(md_txt != null){
		md_txt.init_module_text();
	}

	if(md_cont_db != null){
		gvar.init_qmodu_db = md_cont_db.init_exam_database;
		if(st_qmodu){ start_qmodu(); }
	}
		
}

export async function load_next_qmodu(){
	const qmonam = get_nxt_qmonam();
	console.log("load_next_qmodu. qmonam = " + qmonam);
	await load_qmodu(qmonam, true);
	if(gvar.current_qmonam == null){
		add_last_module_ending();
	}
}

async function init_current_qmodu(){
	await load_next_qmodu();
	fill_div_user();
}

/*
async function load_fb_mod(){
	init_firebase_mgr(() => {
		init_current_qmodu();
	})
	.catch((err) => {
		console.log("load_fb_mod. Cannot load firebase manager module. Loading next LOCAL qmodu. " + err.message);
		init_current_qmodu();
	});
}*/

export async function start_module_mgr(curr_lang){	
	site_lang = curr_lang;
	init_page_buttons();
	init_conf_qmodus();
	init_loc_cand_referrer();
	try {
		await init_firebase_mgr();
		await init_current_qmodu();
	} catch(err) {
		console.error("start_module_mgr. init_firebase_mgr FAILED. " + err.message);
		await init_current_qmodu();
	}
}

function is_qmodu_dnf_sat(monam, all_fini){
	if(monam == null){ return false; }
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	if(qmodu == null){ return false; }
	if(qmodu.debug){ console.log("Called is_qmodu_dnf_sat. monam=" + monam); }
	//if
	qmodu.last_sat_conj = null;
	qmodu.last_conj_qst = null;
	
	if(qmodu.pre_req == null){ 
		return true;
	}
	
	const act_if = Object.entries(qmodu.pre_req);
	for (const [conj_id, conj_obj] of act_if) {
		if(conj_obj == null){ continue; }
		const conj = Object.entries(conj_obj);
		let conj_act = true;
		
		let last_qst = null;
		//console.log(" | monam=" + monam + " | conj_id=" + conj_id + " conj_obj=" + JSON.stringify(conj_obj, null, "  "));
		for (const [cond_monam, resps_obj] of conj) {
			if(all_fini[cond_monam] != resps_obj){
				conj_act = false; break; 
			}
		}
		if(conj_act){
			if(qmodu.debug){ console.log("is_qmodu_dnf_sat. monam=" + monam + " IS_SAT"); }
			qmodu.last_sat_conj = conj_id;
			qmodu.last_conj_qst = last_qst;
			return true;
		}
	}
	if(qmodu.debug){ console.log("is_qmodu_dnf_sat. monam=" + monam + " NOT_sat"); }
	qmodu.last_sat_conj = null;
	qmodu.last_conj_qst = null;
	return false;
}

