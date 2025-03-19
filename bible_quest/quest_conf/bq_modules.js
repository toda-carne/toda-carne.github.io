
"use strict";

let qmodu_info = {};

export function init_qmodu_info(all_vars){
	if(all_vars.conf_qmodus != null){ return; }
	qmodu_info = {};
	all_vars.conf_qmodus = qmodu_info;
	
	const conf_dir = "quest_conf";
	const mod_dir = "quest_modules";

	qmodu_info.image_dir = `img`;
	
	qmodu_info.conf_lang = {};
	qmodu_info.conf_lang.en = `${conf_dir}/bq_lang_en.js`;
	qmodu_info.conf_lang.es = `${conf_dir}/bq_lang_es.js`;

	qmodu_info.all_qmodus = {};
	const mm = qmodu_info.all_qmodus;
	
	const creator_dir = `${mod_dir}/01_creator`;
	
	mm.creator = {};
	mm.creator.display_name = `qmodu_title`;  
	mm.creator.image_dir = `${creator_dir}/img`;
	mm.creator.quest_file = `${creator_dir}/cont_db.js`;
	mm.creator.text_lang = {};
	mm.creator.text_lang.en = `${creator_dir}/en_text.js`;
	mm.creator.text_lang.es = `${creator_dir}/es_text.js`;

	const resurrection_dir = `${mod_dir}/02_resurrection`;
	
	mm.resurrection = {};
	mm.resurrection.display_name = `qmodu_title`;
	mm.resurrection.image_dir = `${resurrection_dir}/img`;
	mm.resurrection.quest_file = `${resurrection_dir}/cont_db.js`;
	mm.resurrection.text_lang = {};
	mm.resurrection.text_lang.en = `${resurrection_dir}/en_text.js`;
	mm.resurrection.text_lang.es = `${resurrection_dir}/es_text.js`;

	const sleep_dir = `${mod_dir}/03_sleep`;
	
	mm.sleep = {};
	mm.sleep.display_name = `qmodu_title`;
	mm.sleep.image_dir = `${sleep_dir}/img`;
	mm.sleep.quest_file = `${sleep_dir}/cont_db.js`;
	mm.sleep.text_lang = {};
	mm.sleep.text_lang.en = `${sleep_dir}/en_text.js`;
	mm.sleep.text_lang.es = `${sleep_dir}/es_text.js`;

	/*
	mm.module1 = get_test_module("module1");
	mm.module1.pre_req = {
		c1: { creator: 1, },
	};
	*/
	
	const old_resu_dir = `${mod_dir}/old_resu`;
	
	mm.old_resu = {};
	mm.old_resu.quest_file = `${old_resu_dir}/cont_db.js`;
	mm.old_resu.text_lang = {};
	mm.old_resu.text_lang.en = `${old_resu_dir}/en_text.js`;
	mm.old_resu.text_lang.es = `${old_resu_dir}/es_text.js`;
	/*
	*/
}

function get_test_module(nam){
	const mm_dir = `quest_modules/${nam}`;
	const mm_dat = {};
	mm_dat.quest_file = `${mm_dir}/cont_db.js`;
	mm_dat.text_lang = {};
	mm_dat.text_lang.en = `${mm_dir}/en_text.js`;
	mm_dat.text_lang.es = `${mm_dir}/es_text.js`;
	
	return mm_dat;
}


