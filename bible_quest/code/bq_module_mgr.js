
import { gvar, get_qid_base, } from './bq_tools.js';
import { init_firebase_mgr, fb_mod, fill_div_user, scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	close_pop_menu, get_user_path, id_pop_menu_sele, init_page_exam, 
} from './bq_quest_mgr.js';

import { init_qmodu_info, } from '../quest_conf/bq_modules.js';

const DEBUG_LOADER = true;

const INVALID_MONAM = "INVALID_MONAM";

let qmodule_lang = "en";

function get_fini_qmodus(){
	let fini_md = {};
	if((fb_mod != null) && (fb_mod.bq_fb_user_finished_qmodules != null)){ fini_md = fb_mod.bq_fb_user_finished_qmodules; }
	return fini_md;
}

function get_nxt_qmonam(){
	if(gvar.conf_qmodus == null){ 
		init_qmodu_info(gvar);
	}
	if(gvar.conf_qmodus.all_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus.all_qmodus == null."); return INVALID_MONAM; }
	const fini_md = get_fini_qmodus();
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	for(const qmonam of all_qmonams){
		if(! is_qmodu_dnf_sat(qmonam)){
			continue;
		}
		if(fini_md[qmonam] == null){
			return qmonam;
		}
	}
	if(all_qmonams.length > 0){
		return all_qmonams[0];
	}
	return INVALID_MONAM;
}

let md_lang = null;
let md_txt = null;
let md_cont_db = null;

async function import_file(mod_nm){
	const resp = import(mod_nm);
	return resp;
}

async function import_qmodu_files(qmonam){
	if(gvar.conf_qmodus == null){ 
		init_qmodu_info(gvar);
	}
	
	md_lang = null;
	md_txt = null;
	md_cont_db = null;
	
	const db_fn = "../" + gvar.conf_qmodus.all_qmodus[qmonam].quest_file;
	const txt_fnams = gvar.conf_qmodus.all_qmodus[qmonam].text_lang;
	const txt_fn = "../" + txt_fnams[qmodule_lang];
	const results = await Promise.all([
		import_file("../quest_conf/bq_lang_" + qmodule_lang + ".js"),
		import_file(txt_fn),
		import_file(db_fn),
	]);
	
	md_lang = results[0];
	md_txt = results[1];
	md_cont_db = results[2];
}

export async function load_qmodu(qmonam){
	await import_qmodu_files(qmonam);
	
	md_lang.init_lang_module();
	md_txt.init_module_text();

	gvar.current_qmonam = qmonam;
	console.log("CURRENT MODULE NAME:" + gvar.current_qmonam);	
	if(md_cont_db != null){
		gvar.init_qmodu_db = md_cont_db.init_exam_database;
	}
}

async function load_next_qmodu(){
	const nxt_mod2 = get_nxt_qmonam();
	await load_qmodu(nxt_mod2);
	init_page_exam();
}

async function init_current_qmodu(){
	await load_next_qmodu();
	fill_div_user();
}

function load_fb_mod(){
	init_firebase_mgr(() => {
		init_current_qmodu();
	})
	.catch((err) => {
		console.log("load_fb_mod. Cannot load firebase manager module. Loading next LOCAL qmodu. " + err.message);
		init_current_qmodu();
	});
}

export function load_current_module(curr_lang){	
	qmodule_lang = curr_lang;
	init_qmodu_info(gvar);
	load_fb_mod();
}

function is_qmodu_dnf_sat(monam){
	const fini_md = get_fini_qmodus();
	if(monam == null){ return false; }
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	if(qmodu == null){ return false; }
	if(qmodu.debug){ console.log("DEBUGING monam=" + monam + " called is_qmodu_dnf_sat"); }
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
			if(resps_obj == null){ conj_act = false; break; }
			if(fini_md[cond_monam] == null){ conj_act = false; break; }			
		}
		if(conj_act){
			if(qmodu.debug){ console.log("DEBUGING monam=" + monam + " is_qmodu_dnf_sat IS_SAT"); }
			qmodu.last_sat_conj = conj_id;
			qmodu.last_conj_qst = last_qst;
			return true;
		}
	}
	if(qmodu.debug){ console.log("DEBUGING monam=" + monam + " is_qmodu_dnf_sat NOT_sat"); }
	qmodu.last_sat_conj = null;
	qmodu.last_conj_qst = null;
	return false;
}

