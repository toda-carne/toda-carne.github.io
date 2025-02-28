
import { gvar, get_qid_base, } from './bq_tools.js';
import { init_firebase_mgr, fb_mod, fill_div_user, scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	close_pop_menu, get_user_path, id_pop_menu_sele, init_page_exam, 
} from './bq_quest_mgr.js';

const DEBUG_LOADER = true;

const INVALID_MONAM = "INVALID_MONAM";

let module_lang = "en";
let module_name = "creator_resurrection";

function get_first_module(){
	if(gvar.modules_info == null){ return INVALID_MONAM; }
	const names = Object.keys(gvar.modules_info);
	if(names.length > 0){
		return names[0];
	}
	return INVALID_MONAM;
}

function get_fini_mods(){
	let fini_md = {};
	if((fb_mod != null) && (fb_mod.bq_fb_user_finished_qmodules != null)){ fini_md = fb_mod.bq_fb_user_finished_qmodules; }
	return fini_md;
}

function calc_nxt_module(){
	const fini_md = get_fini_mods();
	const names = Object.keys(fini_md);
	if(names.length > 0){
		return "old_resu";
	}
	return "creator_resurrection";
}

let md_lang = null;
let md_txt = null;
let md_cont_db = null;

async function import_file(mod_nm){
	const resp = import(mod_nm);
	return resp;
}

async function import_mod_files(){	
	const results = await Promise.all([
		import_file("../quest_conf/bq_lang_" + module_lang + ".js"),
		import_file("../quest_modules/" + module_name + "/" + module_lang + "_text.js"),
		import_file("../quest_modules/" + module_name + "/cont_db.js"),
	]);
	
	md_lang = results[0];
	md_txt = results[1];
	md_cont_db = results[2];
}

/*
async function import_mod_files_2(){
	md_lang = await import_file("../quest_conf/bq_lang_" + module_lang + ".js");
	md_txt = await import_file("../quest_modules/" + module_name + "/" + module_lang + "_text.js");
	md_cont_db = await import_file("../quest_modules/" + module_name + "/cont_db.js");
}
*/

async function load_module(module_nm){	
	module_name = module_nm;
	await import_mod_files();

	md_lang.init_lang_module();
	md_txt.init_module_text();
	init_page_exam(md_cont_db.init_exam_database);	
	
	fill_div_user();	
}

function load_next_module(){
	const nxt_mod2 = calc_nxt_module();
	load_module(nxt_mod2);
}

function load_fb_mod(){
	init_firebase_mgr(() => {
		load_next_module();		
	})
	.catch((err) => {
		console.log("load_fb_mod err:" + err.message);
		load_next_module();
	});
}

export function load_current_module(curr_lang){	
	module_lang = curr_lang;
	load_fb_mod();
}

function init_modu_signals_for(monam){
	const qmodu = gvar.modules_info[monam];
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
			
			const mdu_to_signl = gvar.modules_info[mod_req]; 
			if(mdu_to_signl == null){ continue; }

			if(mdu_to_signl.signals_to_fire == null){ mdu_to_signl.signals_to_fire = {}; }  // added_for_signals
			mdu_to_signl.signals_to_fire.push(monam);			
		}
	}
}

function check_if_modu_dnf_is_sat(monam){
	const fini_md = get_fini_mods();
	if(monam == null){ return false; }
	const qmodu = gvar.modules_info[monam];
	if(qmodu == null){ return false; }
	if(qmodu.debug){ console.log("DEBUGING monam=" + monam + " called check_if_modu_dnf_is_sat"); }
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
		for (const [monam_signl, resps_obj] of conj) {
			if(resps_obj == null){ conj_act = false; break; }
			if(fini_md[monam_signl] == null){ conj_act = false; break; }			
		}
		if(conj_act){
			if(qmodu.debug){ console.log("DEBUGING monam=" + monam + " check_if_modu_dnf_is_sat IS_SAT"); }
			qmodu.last_sat_conj = conj_id;
			qmodu.last_conj_qst = last_qst;
			return true;
		}
	}
	if(qmodu.debug){ console.log("DEBUGING monam=" + monam + " check_if_modu_dnf_is_sat NOT_sat"); }
	qmodu.last_sat_conj = null;
	qmodu.last_conj_qst = null;
	return false;
}

function send_modu_signals_to(all_to_signl, all_to_act){
	for(const monam_signl of all_to_signl){
		const msignl = gvar.modules_info[monam_signl];
		if(msignl == null){ continue; }
		
		const csat = check_if_modu_dnf_is_sat(monam_signl);
		if(csat){ all_to_act.push(monam_signl); }		
	}
}

function send_all_signals(monam){
	const all_to_act = [];
	const qmodu = gvar.modules_info[monam];
	if(qmodu == null){ return all_to_act; }
	
	const if_fini = qmodu.signals_to_fire;
	if(if_fini != null){
		const all_to_signl = Object.keys(if_fini);
		send_signals_to(all_to_signl, all_to_act);
	}
	if(qmodu.debug){ 
		console.log("DEBUGING monam=" + monam + " send_all_signals | all_to_signl=" + JSON.stringify(all_to_signl, null, "  ")); 
		console.log("DEBUGING monam=" + monam + " send_all_signals | signals_to_fire=" + JSON.stringify(qmodu.signals_to_fire, null, "  ")); 		
	}
	
	return all_to_act;
}

function end_module(monam){
	const qmodu = gvar.modules_info[monam];
	qmodu.is_fini = true;
	
	const all_to_act = send_all_signals(monam);
	activate_signals(monam, all_to_act);
	load_next_module();		
}
