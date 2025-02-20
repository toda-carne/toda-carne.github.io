
import { gvar, } from '../../code/bq_tools.js';

"use strict";

let modules_info = {};

export function init_modules_info(){
	modules_info = {};
	gvar.modules_info = modules_info;
	
	const mm = modules_info;
	const conf_dir = "quest_conf";
	const mod_dir = "quest_modules";

	mm.conf_lang = {};
	mm.conf_lang.en = `${conf_dir}/bq_lang_en.js`;
	mm.conf_lang.es = `${conf_dir}/bq_lang_es.js`;
	
	const creator_dir = `${mod_dir}/creator_resurrection`;
	
	mm.creator = {};
	mm.creator.module_name = `CREATOR_RESURRECTION_MODULE`;
	mm.creator.quest_file = `${creator_dir}/cont_db.js`;
	mm.creator.text_lang = {};
	mm.creator.text_lang.en = `${creator_dir}/en_text.js`;
	mm.creator.text_lang.es = `${creator_dir}/es_text.js`;
	
}



