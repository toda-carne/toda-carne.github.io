
import { bib_defaults, uppercase_words_in_string, all_strongrefs, get_verse_reponse_name, make_bible_ref, get_verse_cit_key, 
	bib_obj_to_txt, glb_all_bibrefs, glb_all_book_hrefs, glb_poll_txt } from '../../code/tc_lang_all.js';

"use strict";

export function init_es_poll_txt(){
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let rnam = null;	
	
	const rf = glb_all_bibrefs;
	const hb = glb_all_book_hrefs;
	const lg = glb_poll_txt;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	
	lg.ctx_bible = "Biblia?";
	lg.q1_0__YES_bible = "SI Biblia";
	lg.q1_0__NO_bible = "NO Biblia";
	
	
}

