
import { gvar, get_qid_base, } from './bq_tools.js';
import { init_firebase_mgr, fb_mod, fill_div_user, scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	close_pop_menu, get_user_path, id_pop_menu_sele, init_page_exam, 
} from './bq_quest_mgr.js';

import { init_qmodu_info, } from '../quest_conf/bq_modules.js';

const DEBUG_LOADER = true;

const INVALID_MONAM = "INVALID_MONAM";

let qmodule_lang = "en";
let qmodule_name = "creator_resurrection";

function get_fini_qmodus(){
	let fini_md = {};
	if((fb_mod != null) && (fb_mod.bq_fb_user_finished_qmodules != null)){ fini_md = fb_mod.bq_fb_user_finished_qmodules; }
	return fini_md;
}

function get_nxt_qmonam(){
	if(gvar.conf_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus == null."); return INVALID_MONAM; }
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
	if(gvar.conf_qmodus == null){ console.error("import_qmodu_files. gvar.conf_qmodus == null."); return; }
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

/*
async function import_mod_files_2(){
	md_lang = await import_file("../quest_conf/bq_lang_" + qmodule_lang + ".js");
	md_txt = await import_file("../quest_modules/" + qmodule_name + "/" + qmodule_lang + "_text.js");
	md_cont_db = await import_file("../quest_modules/" + qmodule_name + "/cont_db.js");
}
*/

async function load_qmodu(qmonam){	
	qmodule_name = qmonam;
	await import_qmodu_files(qmonam);

	md_lang.init_lang_module();
	md_txt.init_module_text();
	init_page_exam(md_cont_db.init_exam_database);	
}

async function load_next_qmodu(){
	const nxt_mod2 = get_nxt_qmonam();
	await load_qmodu(nxt_mod2);
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

/*
function init_qmodu_signals_for(monam){
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	if(qmodu == null){ return; }

	if(qmodu.signals_inited){ return; }
	qmodu.signals_inited = true;
	
	qmodu.name = monam;  // very convinient self ref

	if(qmodu.pre_req == null){ return; }
	
	const act_if = Object.entries(qmodu.pre_req);
	for (const [conj_id, conj_obj] of act_if) {
		if(conj_obj == null){ continue; }
		const conj = Object.entries(conj_obj);
		
		for (const [mod_req, resps_obj] of conj) {
			if(resps_obj == null){ continue; }
			
			const mdu_to_signl = gvar.conf_qmodus.all_qmodus[mod_req]; 
			if(mdu_to_signl == null){ continue; }

			if(mdu_to_signl.signals_to_fire == null){ mdu_to_signl.signals_to_fire = {}; }  // added_for_signals
			mdu_to_signl.signals_to_fire.push(monam);			
		}
	}
}
*/

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

/*
function send_qmodu_signals_to(all_to_signl, all_to_act){
	for(const monam_signl of all_to_signl){
		const msignl = gvar.conf_qmodus.all_qmodus[monam_signl];
		if(msignl == null){ continue; }
		
		const csat = is_qmodu_dnf_sat(monam_signl);
		if(csat){ all_to_act.push(monam_signl); }		
	}
}

function send_all_qmodu_signals(monam){
	const all_to_act = [];
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	if(qmodu == null){ return all_to_act; }
	
	const if_fini = qmodu.signals_to_fire;
	if(if_fini != null){
		const all_to_signl = Object.keys(if_fini);
		send_qmodu_signals_to(all_to_signl, all_to_act);
	}
	if(qmodu.debug){ 
		console.log("DEBUGING monam=" + monam + " send_all_qmodu_signals | all_to_signl=" + JSON.stringify(all_to_signl, null, "  ")); 
		console.log("DEBUGING monam=" + monam + " send_all_qmodu_signals | signals_to_fire=" + JSON.stringify(qmodu.signals_to_fire, null, "  ")); 		
	}
	
	return all_to_act;
}

function end_qmodu(monam){
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	qmodu.is_fini = true;
	
	const all_to_act = send_all_qmodu_signals(monam);
	activate_signals(monam, all_to_act);
	load_next_qmodu();		
}
*/
