

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
	
	lg.a_simple_YES = `YES`;
	lg.a_simple_NO = `NO`;	

	lg.a_simple_harder_to_make = `Harder to make`;
	lg.a_simple_harder_to_understand = `Harder to understand`;
	
	lg.q1_0__bible = `<span class='big_font bold_font'>Bible?</span>`;
	lg.q1_0__YES_bible = "YES Bible";
	lg.q1_0__NO_bible = "NO Bible";

	lg.q1_1__creator = `<span class='big_font bold_font'><a href='${hb.href_creator_tit}'>Creator</a>?</span>`;
	lg.q1_1__YES_creator = "YES Creator";
	lg.q1_1__NO_creator = "NO Creator";	

	lg.q1_1_2__six_days = `<span class='big_font bold_font'><a href='${hb.href_creation}'>Six Days</a>?</span>`;
	lg.q1_1_2__YES_six_days = "YES six days";
	lg.q1_1_2__NO_six_days = "NO six days";	

	lg.q1_2__logic = `<span class='big_font bold_font'>Logic?</span>`;
	lg.q1_2__YES_logic = "YES logic";
	lg.q1_2__NO_logic = "NO logic";
		
	lg.q_YES_NO_evidence = `<span class='big_font bold_font'><a href='${hb.href_evidence}'>Evidence</a>?</span>`;
	lg.q_YES_evidence = "YES evidence";
	lg.q_NO_evidence = "NO evidence";
		
	lg.q1_3__evolution = `<span class='big_font bold_font'><a href='${hb.href_factories}'>Evolution</a>?</span>`;
	lg.q1_3__YES_evolution = "YES evolution";
	lg.q1_3__NO_evolution = "NO evolution";
	
	lg.q_requires_creativity = `<span class='big_font bold_font'>Requires design and <a href='${hb.href_tch_crea}'>creativity</a>?</span>`;

	lg.q_harder_to_make = `<span class='big_font bold_font'>Harder to <a href='${hb.href_creator_tit}'>make</a>?</span>`;
	
	lg.a_building = `A building`;
	lg.a_knife = `A knife`;

	lg.a_car = `A car`;
	lg.a_lamp = `A lamp`;

	lg.a_clock = `A clock`;
	lg.a_cellphone = `A cellphone`;

	lg.a_car_wheel = `A car wheel`;
	lg.a_foot = `A foot`;
	
	lg.a_air_purifier = `An air purifier`;
	lg.a_human_lung = `A human lung`;
	
	lg.a_human_body = `A human body`;
	
	lg.q_bilology_req_creativity = `<span class='big_font bold_font'>Requires design and <a href='${hb.href_creator}'>creativity</a>?</span>`;

	lg.t_good_job = `<span class='has_left_padding very_big_font bold_font'>Good job !</span>`;
	lg.q_participate = `<span class='big_font bold_font'>Participate?</span>`;
	lg.q_win_money = `<span class='big_font bold_font'>Win?</span>`;

	lg.o_chose_yes_to_participate = `<span class='very_big_font bold_font'>
		Waiting for Google Login. If you don have one get a <a href='gmail.com'>gmail</a> account.</span>`;
	lg.o_congrats_you_have_a_ticket = `
		<img class="to_center" src="../quest/creator_resurrection/img/ticket.webp"><br>
		<span class='very_big_font bold_font'>Congrats ! You have a ticket</span>
	`;
	lg.o_sorry_no_loging_no_participation = `
		<img class="to_center" src="../quest/creator_resurrection/img/woman_shrugging.webp"><br>
		<span class='very_big_font bold_font'>Sorry. No Google login, no ticket. 
			If you don have one get a <a href='gmail.com'>gmail</a> account.</span>
	`;
	
	lg.i_woman_shrugging = `<img src="../quest/creator_resurrection/img/woman_shrugging.webp">`;
	lg.o_chose_no_participation = `
		<img class="to_center" src="../quest/creator_resurrection/img/woman_shrugging.webp"><br>
		<span class='very_big_font bold_font'>You chose no ...</span>
	`;
	
}

