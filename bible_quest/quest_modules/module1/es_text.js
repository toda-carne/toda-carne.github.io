
import { bib_defaults, uppercase_words_in_string, all_strongrefs, get_verse_reponse_name, make_bible_ref, get_verse_cit_key, bib_obj_to_txt, 
	gvar,
	//glb_all_bibrefs, glb_all_book_hrefs, glb_poll_txt 
} from '../../code/bq_tools.js';

"use strict";

export function init_module_text(){
	init_es_poll_txt();
}

export function init_es_poll_txt(){
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let rnam = null;	
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;

	/*
	lg.q_first_quest_mod_1
	lg.a_simple_YES
	lg.a_simple_NO
	
	lg.q_second_quest_mod_1
	*/
	
}

