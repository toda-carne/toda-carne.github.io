
import { gvar, get_qid_base, } from './bq_tools.js';
import { init_firebase_mgr, fb_mod, fill_div_user, scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	close_pop_menu, get_user_path, id_pop_menu_sele, init_page_exam, 
} from './bq_quest_mgr.js';

const DEBUG_LOADER = true;

let module_lang = "en";
let module_name = "creator_resurrection";
let user_finished_modules = {};

function calc_nxt_module(all_finished){
	const names = Object.keys(all_finished);
	if(names.length > 0){
		return "old_resu";
	}
	return "creator_resurrection";
}

async function get_finished(){
	if(fb_mod.tc_fb_app == null){ console.error("get_finished. (fb_mod.tc_fb_app == null)");  return null; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const usr_path = get_user_path(fb_mod.tc_fb_user.uid);
	const finished_path = usr_path + "/finished";
	const db_ref = fb_mod.md_db.ref(fb_database, finished_path);
	
	const snapshot = await fb_mod.md_db.get(db_ref);
	if(! snapshot.exists()) {
		console.log("get_finished. No path_found. PATH=" + finished_path);
		return null;
	}
	user_finished_modules = snapshot.val();
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
		import_file("../quest_lang/bq_lang_" + module_lang + ".js"),
		import_file("../quest_modules/" + module_name + "/" + module_lang + "_text.js"),
		import_file("../quest_modules/" + module_name + "/cont_db.js"),
	]);
	
	md_lang = results[0];
	md_txt = results[1];
	md_cont_db = results[2];
}

/*
async function import_mod_files_2(){
	md_lang = await import_file("../quest_lang/bq_lang_" + module_lang + ".js");
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
	if((fb_mod == null) || (fb_mod.tc_fb_user == null)){
		const usr_mods = [];
		const nxt_mod1 = calc_nxt_module(usr_mods);
		load_module(nxt_mod1);
		return;
	}
	get_finished().then(() => {
		const nxt_mod2 = calc_nxt_module(user_finished_modules);
		load_module(nxt_mod2);
	});
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

