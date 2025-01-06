

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
	
	const module_img_dir = "../quest_modules/creator_resurrection/img";
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	//lg.ctx_bible2 = "<span class='has_left_padding very_big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='h1'><b>Bible?</b></span>";
	//lg.ctx_bible = "<span class='has_left_padding'><b>Bible</b></span>";
	//lg.ctx_bible = `<span class='has_left_padding'><img src="${module_img_dir}/bible.webp"></span>`;
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

	lg.q_logic_stm = `<span class='big_font bold_font'>Logic?</span>`;
	lg.a_YES_logic = "YES logic";
	lg.a_NO_logic = "NO logic";
	
	const logic_needed = ` is needed in every day life. It is part of our systems. The question refers to that fact. You can change your
	answer by clicking on it or by going back with the 'Ups' button`;
	
	lg.o_logic_comm = `Logic ${logic_needed}`;

	lg.q_language = `<span class='big_font bold_font'>Language?</span>`;
	lg.o_language_comm = `Laguage uses logic. Laguage ${logic_needed}`;

	lg.q_business = `<span class='big_font bold_font'>Business?</span>`;
	lg.o_business_comm = `Business uses logic. Business ${logic_needed}`;
	
	lg.q_technology = `<span class='big_font bold_font'>Technology?</span>`;
	lg.o_technology_comm = `Technology uses logic. Technology ${logic_needed}`;
	
	lg.q_YES_NO_evidence = `<span class='big_font bold_font'><a href='${hb.href_evidence}'>Evidence</a>?</span>`;
	lg.q_YES_evidence = "YES evidence";
	lg.q_NO_evidence = "NO evidence";

	const evidence_needed = ` is needed in every day life. It is needed to gain trust. The question refers to that fact. You can change your answer by clicking on it or by going back with the 'Ups' button`;

	lg.o_evidence_comm = `Evidence ${evidence_needed}`;
	
	lg.q_justice = `<span class='big_font bold_font'>Justice?</span>`;
	lg.o_justice_comm = `Justice uses evidence. Justice ${evidence_needed}`;
	lg.q_law = `<span class='big_font bold_font'>Law?</span>`;
	lg.o_law_comm = `Law uses evidence. Law ${evidence_needed}`;
	lg.q_contracts = `<span class='big_font bold_font'>Contracts?</span>`;
	lg.o_contracts_comm = `A contract uses evidence. A contract ${evidence_needed}`;

	lg.o_technology2_comm = `Technology uses evidence. Technology ${evidence_needed}`;
	
	lg.q1_3__evolution = `<span class='big_font bold_font'><a href='${hb.href_factories}'>Evolution</a>?</span>`;
	lg.q1_3__YES_evolution = "YES evolution";
	lg.q1_3__NO_evolution = "NO evolution";
	
	lg.q_requires_creativity = `<span class='big_font bold_font'>Requires design and <a href='${hb.href_tch_crea}'>creativity</a>?</span>`;
	
	lg.q_made_by_ape = "<span class='big_font bold_font'>Can an ape make it?</span>";
	lg.q_evidence_made_by_ape = "<span class='big_font bold_font'>Is there evidence that an ape can make it?</span>";

	lg.q_harder_to_make = `<span class='big_font bold_font'>Harder to <a href='${hb.href_creator_tit}'>make</a>?</span>`;

	lg.q_more_time = `<span class='big_font bold_font'>What takes more time to <a href='${hb.href_creator_tit}'>make</a>?</span>`;
	lg.q_more_people = `<span class='big_font bold_font'>What takes more people to <a href='${hb.href_creator_tit}'>make</a>?</span>`;
	lg.q_more_planning = `<span class='big_font bold_font'>What takes more planning to <a href='${hb.href_creator_tit}'>make</a>?</span>`;
	lg.q_more_steps = `<span class='big_font bold_font'>What takes more steps to <a href='${hb.href_creator_tit}'>make</a>?</span>`;
	lg.q_more_complexity = `<span class='big_font bold_font'>What has more complexity to <a href='${hb.href_creator_tit}'>make</a>?</span>`;
	
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

	lg.q_make_foot = `<span class='big_font bold_font'>Can we <a href='${hb.href_creator_tit}'>make</a> you a foot from your DNA?</span>`;
	lg.q_make_lung = `<span class='big_font bold_font'>Can we <a href='${hb.href_creator_tit}'>make</a> you a lung from your DNA?</span>`;
	lg.q_make_body = `<span class='big_font bold_font'>Can we <a href='${hb.href_creator_tit}'>make</a> you a body from your DNA?</span>`;

	lg.q_why_amputees = `<span class='big_font bold_font'>Have you seen an amputee?</span>`;
	lg.q_why_one_lung = `<span class='big_font bold_font'>Are there people breathing on just one lung?</span>`;
	lg.q_why_die = `<span class='big_font bold_font'>Are you going to die?</span>`;
	
	lg.q_bilology_req_creativity = `<span class='big_font bold_font'>Requires design and <a href='${hb.href_creator}'>creativity</a>?</span>`;

	lg.t_good_job = `<span class='has_left_padding very_big_font bold_font'>Good job !</span>`;
	lg.q_participate = `<span class='big_font bold_font'>Participate?</span>`;
	lg.q_win_money = `<span class='big_font bold_font'>Win?</span>`;

	lg.o_chose_yes_to_participate = `<span class='very_big_font bold_font'>
		Waiting for Google Login. If you don have one get a <a href='http://accounts.google.com'>Google account</a>.</span>`;
	lg.o_congrats_you_have_a_ticket = `
		<img class="img_observ" src="${module_img_dir}/ticket.webp"><br>
		<span class='very_big_font bold_font'>Congrats ! You have a ticket</span>
	`;
	lg.o_sorry_no_loging_no_participation = `
		<img class="img_observ" src="${module_img_dir}/woman_shrugging.webp"><br>
		<span class='very_big_font bold_font'>Sorry. No Google login, no ticket. 
			If you don have one get a <a href='http://accounts.google.com'>Google account</a>.</span>
	`;
	
	lg.i_woman_shrugging = `<img src="${module_img_dir}/woman_shrugging.webp">`;
	lg.o_chose_no_participation = `
		<img class="img_observ" src="${module_img_dir}/woman_shrugging.webp"><br>
		<span class='very_big_font bold_font'>You chose no ...</span>
	`;

	lg.a_zero = `Zero`;
	lg.a_one = `One`;
	lg.a_more_than_one = `More than one`;
	
}

