
import { gvar, get_qid_base, } from './tc_lang_all.js';
import { fill_div_user, scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	fb_mod, close_pop_menu, get_user_path, id_pop_menu_sele, 
} from './tc_exam.js';

const DEBUG_LOADER = true;

let md_fb = null;
let md_lang = null;
let md_txt = null;
let md_cont_db = null;

async function load_md_fb(){
	md_fb = await import("./tc_firebase.js");
	md_fb.firebase_check_user((user) => {
		fill_div_user();
	}); 
}

async function load_module(curr_lang, module_nm){	
	const md_nm_lang = "./tc_lang_" + curr_lang + ".js";
	const md_nm_txt = "../quest_modules/" + module_nm + "/" + curr_lang + "_text.js";
	const md_nm_cont_db = "../quest_modules/" + module_nm + "/cont_db.js";	
	
	md_lang = await import(md_nm_lang);
	md_txt = await import(md_nm_txt);
	md_cont_db = await import(md_nm_cont_db);

	md_lang.init_es_module();
	md_txt.init_es_poll_txt();
	exm.init_page_exam(md_cont_db.init_exam_database);	
}

function load_current_module(curr_lang){	
}

/*

import * as es_lang from '../code/tc_lang_es.js';
import * as en_txt from '../quest_modules/creator_resurrection/es_text.js';
import * as cont_db from '../quest_modules/creator_resurrection/cont_db.js';
import * as exm from '../code/tc_exam.js';

es_lang.init_es_module();
en_txt.init_es_poll_txt();
exm.init_page_exam(cont_db.init_exam_database);

import * as en_lang from '../code/tc_lang_en.js';
import * as en_txt from '../quest_modules/old_resu/en_text.js';
import * as cont_db from '../quest_modules/old_resu/cont_db.js';
import * as exm from '../code/tc_exam.js';

en_lang.init_en_module();
en_txt.init_en_poll_txt();
exm.init_page_exam(cont_db.init_exam_database);

update_index_in_chunks(pth, obj).then((resp) => {
	console.log(`FINISHED UPLOAD OF ${mod_nm} OK`);
});

async function update_index_in_chunks(pth, obj){
	if(fb_mod == null){ console.log("(fb_mod == null) in update_module_observations"); return; }
	if(fb_mod.tc_fb_app == null){ console.error("(fb_mod.tc_fb_app == null) in update_module_observations");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const db_ref = fb_mod.md_db.ref(fb_database, pth);

	const ctr_pth = pth + "/total";
	const db_cnter = fb_mod.md_db.ref(fb_database, ctr_pth);	
	await fb_mod.md_db.set(db_cnter, 0).catch((error) => { 
		console.error(error); 
	});
	
	const min_sz = 5000;
	
	const codes = Object.keys(obj);
	let wr_data = {};
	let chunk_sz = 0;
	for(const cod of codes){
		if(chunk_sz == min_sz){
			wr_data.total = fb_mod.md_db.increment(chunk_sz);
			await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
			console.log("UPDATED " + pth); 
			wr_data = {};
			chunk_sz = 0;
		}
		wr_data[cod] = obj[cod];
		chunk_sz++;
	}
	if(chunk_sz > 0){
		wr_data.total = fb_mod.md_db.increment(chunk_sz);
		await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
		console.log("UPDATED " + pth); 
	}
}



*/