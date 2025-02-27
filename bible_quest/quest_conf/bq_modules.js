
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
	mm.creator.module_name = `creator`;
	mm.creator.quest_file = `${creator_dir}/cont_db.js`;
	mm.creator.text_lang = {};
	mm.creator.text_lang.en = `${creator_dir}/en_text.js`;
	mm.creator.text_lang.es = `${creator_dir}/es_text.js`;

	mm.module1 = get_test_module("module1");
	mm.module1.pre_req: {
		c1: { creator: 1, },
	},
	mm.module2 = get_test_module("module2");
	mm.module2.pre_req: {
		c1: { module1: 1, },
	},
	mm.module3 = get_test_module("module3");
	mm.module3.pre_req: {
		c1: { creator: 1, },
	},
	mm.module4 = get_test_module("module4");
	mm.module4.pre_req: {
		c1: { module2: 1, module3: 1, },
	},
	mm.module5 = get_test_module("module5");
	mm.module5.pre_req: {
		c1: { module2: 1, module3: 1, },
	},
	
}

function get_test_module(nam){
	const mm_dir = `quest_modules/${nam}`;
	const mm_dat = {};
	mm_dat.module_name = `${nam}`;
	mm_dat.quest_file = `${mm_dir}/cont_db.js`;
	mm_dat.text_lang = {};
	mm_dat.text_lang.en = `${mm_dir}/en_text.js`;
	mm_dat.text_lang.es = `${mm_dir}/es_text.js`;
	
	return mm_dat;
}


