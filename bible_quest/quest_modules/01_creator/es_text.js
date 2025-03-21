
import { gvar, } from '../../code/bq_tools.js';

import { init_en_poll_txt, } from './en_text.js';

"use strict";

export function init_module_text(){
	init_es_poll_txt();
}

export function init_es_poll_txt(){
	init_en_poll_txt();
	
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let rnam = null;	
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	lg.qmodu_title = `Creador de Bio-maquinas?`;  
	
	lg.q1_0__bible = `<span class='big_font bold_font'>Biblia?</span>`;
	lg.q1_0__YES_bible = "SI Biblia";
	lg.q1_0__NO_bible = "NO Biblia";
	
	
}

