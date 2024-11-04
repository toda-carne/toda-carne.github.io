

import { bib_defaults, uppercase_words_in_string, all_strongrefs, get_verse_reponse_name, make_bible_ref, get_verse_cit_key, 
	bib_obj_to_txt, glb_all_bibrefs, glb_all_book_hrefs, glb_poll_txt } from '../../code/tc_lang_all.js';

"use strict";

export function init_en_poll_txt(){
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let bibref = {};
	let rnam = null;	
	
	const rf = glb_all_bibrefs;
	const hb = glb_all_book_hrefs;
	const lg = glb_poll_txt;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	//lg.ctx_bible2 = "<span class='has_left_padding very_big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='h1'><b>Bible?</b></span>";
	//lg.ctx_bible = "<span class='has_left_padding'><b>Bible</b></span>";
	//lg.ctx_bible = `<span class='has_left_padding'><img src="../quest/creator_resurrection/img/bible.webp"></span>`;
	//lg.ctx_bible = "Bible?";
	lg.q1_0__bible = `<span class='big_font bold_font'>Bible?</span>`;
	lg.q1_0__YES_bible = "YES Bible";
	lg.q1_0__NO_bible = "NO Bible";

	lg.q1_1__creator = `<span class='big_font bold_font'>Creator?</span>`;
	lg.q1_1__YES_creator = "YES Creator";
	lg.q1_1__NO_creator = "NO Creator";	
	
	lg.q1_2__evolution = `<span class='big_font bold_font'>Evolution?</span>`;
	lg.q1_2__YES_evolution = "YES evolution";
	lg.q1_2__NO_evolution = "NO evolution";
	
	
}

