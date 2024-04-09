
import { num2abbr, num2book_en, get_msg, 
	glb_exam_language, glb_all_books, glb_all_bibles, glb_books_nums, glb_curr_lang } from './tc_lang_all.js';
	
import { STARTING_QUESTIONS, db_nodes_exam, db_user_info, init_exam_database } from './tc_db_exam.js';

// import { firebase_write_object, firebase_read_object, firebase_sign_out } from './tc_firebase.js';

"use strict";

let DEFAULT_BOOK = null;
let DEFAULT_STRONG = null;
let DEFAULT_LINK_NAME = null;

let fb_write_object = null;
let fb_read_object = null;
let fb_sign_out = null;

const qref_prefix = "QREF_";

function init_exam_fb(){
	const mod_nm = "./tc_firebase.js";
	import(mod_nm)
	.then((module) => {
		fb_write_object = module.firebase_write_object;
		fb_read_object = module.firebase_read_object;
		fb_sign_out = module.firebase_sign_out;
	})
	.catch((err) => {
		console.log("Could NOT import '${mod_nm}' err:" + err.message);
	});
	
}

function init_exam_module_vars(){
	console.log("Calling init_exam_module_vars");
	
	DEFAULT_BOOK = glb_curr_lang.msg_def_book;
	DEFAULT_STRONG = glb_curr_lang.msg_def_strong;
	DEFAULT_LINK_NAME = glb_curr_lang.msg_def_link_name;
}

const ALL_SAVED_OBJ_NAMES = "all_saved_object_names";

const SUF_ID_POS = "_pos";
const SUF_ID_MSG = "_msg";
const SUF_ID_BIBREF = "_bibref";
const SUF_ID_POS_MIN = "_pos_min";
const SUF_ID_POS_MAX = "_pos_max";
const SUF_ID_POS_SET_MIN = "_pos_set_min";
const SUF_ID_POS_SET_MAX = "_pos_set_max";
const SUF_ID_POS_SHOW = "_pos_show";
const SUF_ID_POS_OK = "_pos_ok";
const SUF_ID_INTER = "_inter";
const SUF_ID_ANSWERS = "_answers";
const SUF_ID_SUPPORT = "_support";
const SUF_ID_SCODES = "_scodes";
const SUF_ID_LINKS = "_links";

const SUF_ID_LAST_ADDED_CITATION = "_last_added_citation";
const SUF_ID_LAST_ADDED_STRONG = "_last_added_strong";
const SUF_ID_LAST_ADDED_LINK = "_last_added_link";

const DEFAULT_CHAPTER = 0;
const DEFAULT_VERSE = 0;
const DEFAULT_LAST_VERSE = 0;
const DEFAULT_BIBLES_SITE = "biblegateway";
const DEFAULT_BIB_VER = "BIB";

const DEFAULT_LINK_HREF = "https://www.biblehub.com";

const VRS_CIT_KIND = "vrs_cit_kind";
const VRS_BOOK_IDX = 0;
const VRS_CHAPTER_IDX = 1;
const VRS_VERSE_IDX = 3;
const VRS_SEP_RANGE_IDX = 4;
const VRS_LAST_VERSE_IDX = 5;
const VRS_SITE_IDX = 6;
const VRS_BIB_VER_IDX = 7;

const STG_CIT_KIND = "stg_cit_kind";

const LNK_CIT_KIND = "lnk_cit_kind";
const LNK_NAME_IDX = 0;
const LNK_HREF_IDX = 1;

const MIN_DATE = -7000;
const MAX_DATE = -5000;

const id_ed_book = "id_ed_book";
const id_ed_chapter = "id_ed_chapter";
const id_ed_verse = "id_ed_verse";
const id_ed_last_verse = "id_ed_last_verse";
const id_ed_site = "id_ed_site";
const id_ed_bib_ver_sel = "id_ed_bib_ver_sel";

const id_dv_citation_ed = "id_citation_ed";
const id_dv_code_ed = "id_dv_code_ed";
const id_dv_link_ed = "id_dv_link_ed";
const id_dv_sel_option = "id_dv_sel_option";
const id_dv_name_ed = "id_dv_name_ed";
const id_dv_answ_ed = "id_dv_answ_ed"; 

const firebase_answers_path = "/user_answers"; 

function is_in_viewport(elem) {	
	var rect = elem.getBoundingClientRect();
	
	var dv_content = document.getElementById("id_exam_content");
	var rect2 = dv_content.getBoundingClientRect();
	return (
		(rect.top >= rect2.top) &&
		(rect.bottom <= rect2.bottom)
	);
}

function add_question(qid){
	const quest = db_nodes_exam[qid];
	if(quest == null){
		console.log("Could not find question " + qid + " in questions db.");
		return null;
	}
	const old_dv = document.getElementById(qid);
	if(old_dv != null){ 
		console.log("Question " + qid + " ALREADY in page (add_question)");
		return null;
	}
	
	const bibref = quest.bibref;
	const v_min = quest.v_min;
	const v_max = quest.v_max;
	
	var dv_all_quest = document.getElementById("id_exam_all_questions");
	const dv_quest = dv_all_quest.appendChild(document.createElement("div"));
	dv_quest.id = qid;
	dv_quest.classList.add("exam");
	dv_quest.classList.add("has_border");
	
	quest.pos_page = dv_all_quest.childNodes.length - 1;
	
	const dv_stm = dv_quest.appendChild(document.createElement("div"));
	dv_stm.classList.add("exam");
	dv_stm.classList.add("stm");
	
	const dv_pos = dv_stm.appendChild(document.createElement("div"));
	dv_pos.classList.add("exam");
	dv_pos.classList.add("pos");
	dv_pos.classList.add("is_button");
	dv_pos.addEventListener('click', function() {
		toggle_pos_interaction(qid);
	});

	if(bibref != null){
		const dv_bibref = dv_pos.appendChild(document.createElement("div"));
		dv_bibref.id = qid + SUF_ID_BIBREF;
		dv_bibref.classList.add("exam");
		//dv_bibref.classList.add("is_hover");
		dv_bibref.classList.add("is_block");
		dv_bibref.innerHTML = bibref;
	}
	
	if(v_min != null){
		const dv_min = dv_pos.appendChild(document.createElement("div"));
		dv_min.id = qid + SUF_ID_POS_MIN;
		dv_min.classList.add("exam");
		//dv_min.classList.add("is_hover");
		dv_min.classList.add("is_block");
		dv_min.innerHTML = v_min;

		if(v_max != null){
			const dv_max = dv_pos.appendChild(document.createElement("div"));
			dv_max.id = qid + SUF_ID_POS_MAX;
			dv_max.classList.add("exam");
			//dv_max.classList.add("is_hover");
			dv_max.classList.add("is_block");
			dv_max.innerHTML = v_max;
		}
	}
	
	let the_stm = get_msg(quest.htm_stm);
	if(quest.has_qrefs){
		the_stm = replace_all_qrefs(the_stm);
	}
	
	const dv_msg = dv_stm.appendChild(document.createElement("div"));
	dv_msg.id = qid + SUF_ID_MSG;
	dv_msg.classList.add("exam");
	dv_msg.classList.add("msg");
	dv_msg.innerHTML = "" + quest.pos_page + ". " + the_stm;
	//dv_msg.classList.toggle("contradiction");

	init_answers(qid);
	
	const id_dv_support = qid + SUF_ID_SUPPORT;
	var dv_support = dv_quest.appendChild(document.createElement("div"));
	dv_support.id = id_dv_support;
	dv_support.classList.add("exam");
	dv_support.classList.add("is_block");		
	
	if(! is_in_viewport(dv_stm)){
		dv_stm.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
	
	return dv_quest;
}

function init_answers(qid){
	set_is_contra_if_so(qid);
	const quest = db_nodes_exam[qid];
	const is_init_to_answer = (quest.has_answ == null);
	const dv_quest = document.getElementById(qid);
	if(dv_quest == null){
		console.log("COULD NOT FIND qid = " + qid);
		return;
	}
	var id_dv_answers = qid + SUF_ID_ANSWERS;
	var dv_answers = document.getElementById(id_dv_answers);
	if(dv_answers == null){
		dv_answers = dv_quest.appendChild(document.createElement("div"));
		dv_answers.id = id_dv_answers;
		dv_answers.classList.add("exam");
		dv_answers.classList.add("is_block");
	}
	
	dv_answers.innerHTML = "";
	
	const arr_answers = quest.answers;
	if(arr_answers == null){
		return;
	}
	const is_mult = quest.is_multi;
	arr_answers.forEach((an_answ) => {
		if(! is_init_to_answer && ! an_answ.is_on){
			return; // continue with next elem
		}
		
		const dv_answ = dv_answers.appendChild(document.createElement("div"));
		dv_answ.classList.add("exam");
		dv_answ.classList.add("is_answer");
		dv_answ.innerHTML = get_msg(an_answ.htm_answ);
		if(an_answ.is_on){
			dv_answ.classList.add("selected");
		}
		
		if(is_init_to_answer){
			dv_answ.classList.remove("selected");
			an_answ.is_on = false;
			
			dv_answ.addEventListener('click', function() {
				if(an_answ.is_on){
					dv_answ.classList.remove("selected");
					an_answ.is_on = false;
				} else {
					dv_answ.classList.add("selected");
					an_answ.is_on = true;
					if(! is_mult){
						end_question(qid);
					}
				}
			});
		} else {
			dv_answ.addEventListener('click', function() {
				// togle edit button
				var dv_answ_ed = document.getElementById(id_dv_answ_ed);
				if(dv_answ_ed != null){
					dv_answ_ed.remove();
				} else {
					dv_answ_ed = dv_answers.appendChild(document.createElement("div"));
					dv_answ_ed.id = id_dv_answ_ed;
					dv_answ_ed.classList.add("exam");
					dv_answ_ed.classList.add("is_button");
					dv_answ_ed.innerHTML = glb_curr_lang.msg_edit_ans;
					dv_answ_ed.addEventListener('click', function() {
						quest.has_answ = null;
						init_answers(qid);
					});
				}
			});
		}
	});
	
	if(is_mult && is_init_to_answer){
		const dv_end = dv_answers.appendChild(document.createElement("div"));
		dv_end.classList.add("exam");
		dv_end.classList.add("is_button");
		dv_end.innerHTML = glb_curr_lang.msg_end_ans;
		dv_end.addEventListener('click', function() {
			end_question(qid);
		});
	}
}

function end_question(qid){
	const quest = db_nodes_exam[qid];
	if(quest.all_nxt != null){
		remove_all_descendants(qid);
	}
	quest.has_answ = true;
	init_answers(qid);
	
	if(quest.set_reactions == null){
		return;
	}
	//console.log("BEFORE set_reactions = " + quest.all_nxt);
	quest.set_reactions();
	//console.log("AFTER set_reactions = " + quest.all_nxt);
	
	add_all_nxt(qid);
	add_contradictions(qid);
}

function add_all_nxt(qid){
	const quest = db_nodes_exam[qid];
	if(quest.all_nxt == null){
		return;
	}
	const all_added = [];
	for(const qq of quest.all_nxt){
		//console.log("Adding question " + qq + " to page");
		const added = add_question(qq);
		if(added == null){
			console.log("Question " + qq + " could NOT be added to page !!!");
		} else {
			all_added.push(qq);
		}
	}
	quest.all_nxt = all_added;
	//console.log("ALL ADDED = " + quest.all_nxt);
	//console.log(JSON.stringify(quest, null, "  "));
}

function add_contradictions(qid){
	const quest = db_nodes_exam[qid];
	const all_ctra = quest.all_contra;
	if(all_ctra != null){
		for(const ctra of all_ctra){
			add_contradicted_by(ctra, qid);
		}
	}
}

function add_contradicted_by(ctra, qid){
	const quest = db_nodes_exam[ctra];
	if(quest.all_dicted_by == null){
		quest.all_dicted_by = [];
	}
	quest.all_dicted_by.push(qid);
	set_is_contra_if_so(ctra);
}

function set_is_contra_if_so(qid){
	const quest = db_nodes_exam[qid];
	if(quest.all_dicted_by == null){
		return;
	}
	if(quest.all_dicted_by.length == 0){
		return;
	}
	const dv_quest = document.getElementById(qid + SUF_ID_MSG);
	if(dv_quest != null){
		dv_quest.classList.add("is_contradiction");
	}
}

function remove_all_descendants(qid){
	const quest = db_nodes_exam[qid];
	const all_desc = quest.all_nxt;
	quest.all_nxt = null;
	if(all_desc != null){
		for(const qq of all_desc){
			remove_descendant(qq);
		}
	}
	
	remove_contradictions(qid);	
}

function remove_contradictions(qid){
	const quest = db_nodes_exam[qid];
	const all_ctra = quest.all_contra;
	quest.all_contra = null;
	if(all_ctra != null){
		for(const ctra of all_ctra){
			remove_contradicted_by(ctra, qid);
		}
	}
}

function remove_contradicted_by(ctra, qid){ 
	//console.log("Removing all_dicted_by of " + ctra + " with qid=" + qid);
	const quest = db_nodes_exam[ctra];
	const all_dictd_by = quest.all_dicted_by;
	if(all_dictd_by == null){
		console.log("Cannot find all_dicted_by of " + ctra + " !!!");
		return;
	}
	//console.log("BEFORE remove_contradicted_by = " + quest.all_nxt);
	quest.all_dicted_by = all_dictd_by.filter((val) => (val != qid));
	if(quest.all_dicted_by.length == 0){
		//console.log("Removing is_red of " + ctra);
		const dv_quest = document.getElementById(ctra + SUF_ID_MSG);
		if(dv_quest != null){
			dv_quest.classList.remove("is_contradiction");
		}
	}
}

function remove_descendant(qid){
	const quest = db_nodes_exam[qid];
	quest.has_answ = null;
	
	const dv_quest = document.getElementById(qid);
	if(dv_quest != null){
		//console.log("REMOVING question " + qid + " from page");
		dv_quest.remove();
		remove_all_descendants(qid);
		return true;
	}
	console.log("Question " + qid + " was NOT found in page !!!");
	return false;
}

function remove_last_added(qid, sufix){
	const id_dv_last = qid + sufix;
	const dv_last = document.getElementById(id_dv_last);
	if(dv_last != null){
		dv_last.remove();
	}
}


function remove_id(id_dv){
	var dv_to_rm = document.getElementById(id_dv);
	if(dv_to_rm != null){
		dv_to_rm.remove();
	}
}

function remove_all_ed(qid){
	if(! is_last_added_verse_cit_ok(qid)){
		remove_last_added(qid, SUF_ID_LAST_ADDED_CITATION);
	}
	if(! is_last_added_strong_ok(qid)){
		remove_last_added(qid, SUF_ID_LAST_ADDED_STRONG);
	}
	if(! is_last_added_link_ok(qid)){
		remove_last_added(qid, SUF_ID_LAST_ADDED_LINK);
	}
	remove_id(id_dv_citation_ed);
	remove_id(id_dv_code_ed);
	remove_id(id_dv_link_ed);
	remove_id(id_dv_sel_option);
}


function toggle_pos_interaction(qid){
	const id_dv_support = qid + SUF_ID_SUPPORT;
	const dv_support = document.getElementById(id_dv_support);
	const dv_quest = document.getElementById(qid);
	
	//var id_dv_inter = qid + SUF_ID_INTER;
	var id_dv_inter = "id_interac_ed";
	var dv_inter = document.getElementById(id_dv_inter);
	if(dv_inter != null){
		var prv = dv_inter.previousSibling;
		if(prv != null){
			var old_id_dv_support = prv.id + SUF_ID_SUPPORT;
			const old_dv_support = document.getElementById(old_id_dv_support);
			old_dv_support.classList.toggle("ed_support");
		}
		var was_mine = (dv_quest.nextSibling == dv_inter);
		dv_inter.remove();
		remove_all_ed(qid);
		if(was_mine){
			return;
		}
	}
	dv_support.classList.toggle("ed_support");
	
	dv_inter = get_new_dv_under(dv_quest, id_dv_inter);
	//dv_inter = dv_quest.appendChild(document.createElement("div"));
	dv_inter.id = id_dv_inter;
	
	dv_inter.classList.add("exam");
	dv_inter.classList.add("pos_inter");
	
	const nd_min = document.getElementById(qid + SUF_ID_POS_MIN);
	const nd_max = document.getElementById(qid + SUF_ID_POS_MAX);
	if(nd_min != null){
		var v_min = nd_min.innerHTML;
		var id_set_min = qid + SUF_ID_POS_SET_MIN;
		add_input_interaction(dv_inter, id_set_min, "Year begins", v_min);
		
		if(nd_max != null){
			var v_max = nd_max.innerHTML;
			var id_set_max = qid + SUF_ID_POS_SET_MAX;
			add_input_interaction(dv_inter, id_set_max, "Year ends", v_max);
		}
	}
	
	
	const dv_ok = dv_inter.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_block");
	dv_ok.classList.add("is_button");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {
		if(nd_min != null){
			nd_min.innerHTML = document.getElementById(qid + SUF_ID_POS_SET_MIN).value;
			if(nd_max != null){
				nd_max.innerHTML = document.getElementById(qid + SUF_ID_POS_SET_MAX).value;
			}
		}
		dv_support.classList.toggle("ed_support");
		dv_inter.remove();
		remove_all_ed(qid);

		if(! is_in_viewport(dv_quest)){
			dv_quest.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    
	
	const dv_add_cit = dv_inter.appendChild(document.createElement("div"));
	dv_add_cit.classList.add("exam");
	dv_add_cit.classList.add("is_block");
	dv_add_cit.classList.add("is_button");
	dv_add_cit.innerHTML = glb_curr_lang.msg_add_verse;
	dv_add_cit.addEventListener('click', function() {
		add_verse_cit(qid, null);
		return;
	});
	
	const dv_add_strong = dv_inter.appendChild(document.createElement("div"));
	dv_add_strong.classList.add("exam");
	dv_add_strong.classList.add("is_block");
	dv_add_strong.classList.add("is_button");
	dv_add_strong.innerHTML = glb_curr_lang.msg_add_strong;
	dv_add_strong.addEventListener('click', function() {
		add_strong_cit(qid, null);
		return;
	});
	
	const dv_add_link = dv_inter.appendChild(document.createElement("div"));
	dv_add_link.classList.add("exam");
	dv_add_link.classList.add("is_block");
	dv_add_link.classList.add("is_button");
	dv_add_link.innerHTML = glb_curr_lang.msg_add_link;
	dv_add_link.addEventListener('click', function() {
		add_link_cit(qid, null);
		return;
	});
	
	if(! is_in_viewport(dv_inter)){
		dv_inter.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
	
}

function is_last_added_verse_cit_ok(qid){
	const id_dv_last_cit = qid + SUF_ID_LAST_ADDED_CITATION;
	const dv_last_cit = document.getElementById(id_dv_last_cit);
	if(dv_last_cit == null){
		return true;
	}
	if(dv_last_cit != null){
		var chls = dv_last_cit.childNodes;
		var ck1 = (chls[VRS_BOOK_IDX].innerHTML != DEFAULT_BOOK);
		var ck2 = (chls[VRS_CHAPTER_IDX].innerHTML != DEFAULT_CHAPTER);
		var ck3 = (chls[VRS_VERSE_IDX].innerHTML != DEFAULT_VERSE);
		if(ck1 && ck2 && ck3){ 
			dv_last_cit.removeAttribute('id');  // ONLY ONE LAST ADDED
			return true;		
		}
	}
	return false;
}

function add_verse_cit(qid, verse_obj){
	const id_dv_support = qid + SUF_ID_SUPPORT;
	const dv_support = document.getElementById(id_dv_support);

	const id_dv_last_cit = qid + SUF_ID_LAST_ADDED_CITATION;
	if(! is_last_added_verse_cit_ok(qid)){
		return;
	}
	
	const dv_citation = dv_support.appendChild(document.createElement("div"));
	dv_citation.id = id_dv_last_cit;
	dv_citation.classList.add("exam");
	dv_citation.classList.add("is_verse_cit");
	dv_citation.classList.add("is_option");
	
	const dv_book = dv_citation.appendChild(document.createElement("div"));
	dv_book.classList.add("exam");
	dv_book.classList.add("is_citation_item");
	if(verse_obj == null){
		dv_book.innerHTML = DEFAULT_BOOK;
	} else {
		dv_book.innerHTML = verse_obj.book;
	}
	
	const dv_chapter = dv_citation.appendChild(document.createElement("div"));
	dv_chapter.classList.add("exam");
	dv_chapter.classList.add("is_citation_item");
	if(verse_obj == null){
		dv_chapter.innerHTML = DEFAULT_CHAPTER;
	} else {
		dv_chapter.innerHTML = verse_obj.chapter;
	}

	const sep1 = dv_citation.appendChild(document.createElement("div"));
	sep1.classList.add("exam");
	sep1.classList.add("is_citation_item");
	sep1.innerHTML = " : ";
		
	const dv_verse = dv_citation.appendChild(document.createElement("div"));
	dv_verse.classList.add("exam");
	dv_verse.classList.add("is_citation_item");
	if(verse_obj == null){
		dv_verse.innerHTML = DEFAULT_VERSE;
	} else {
		dv_verse.innerHTML = verse_obj.verse;
	}

	const sep2 = dv_citation.appendChild(document.createElement("div"));
	sep2.classList.add("exam");
	sep2.classList.add("is_citation_item");
	sep2.classList.add("is_hidden");
	sep2.innerHTML = " - ";
	
	const dv_last_verse = dv_citation.appendChild(document.createElement("div"));
	dv_last_verse.classList.add("exam");
	dv_last_verse.classList.add("is_citation_item");
	dv_last_verse.classList.add("is_hidden");
	if(verse_obj == null){
		dv_last_verse.innerHTML = DEFAULT_VERSE;
	} else {
		dv_last_verse.innerHTML = verse_obj.last_verse;
	}

	const dv_site = dv_citation.appendChild(document.createElement("div"));
	dv_site.classList.add("exam");
	dv_site.classList.add("is_citation_item");
	dv_site.classList.add("is_hidden");
	if(verse_obj == null){
		dv_site.innerHTML = DEFAULT_BIBLES_SITE;
	} else {
		dv_site.innerHTML = verse_obj.site;
	}
	
	const bibs = glb_all_bibles[DEFAULT_BIBLES_SITE];
	var bib_ver = DEFAULT_BIB_VER;
	if(bibs.length > 0){ bib_ver = bibs[0]; }
	
	const dv_bib_ver = dv_citation.appendChild(document.createElement("div"));
	dv_bib_ver.classList.add("exam");
	dv_bib_ver.classList.add("is_citation_item");
	if(verse_obj == null){
		dv_bib_ver.innerHTML = bib_ver;
	} else {
		dv_bib_ver.innerHTML = verse_obj.bib_ver;
	}

	dv_citation.addEventListener('click', function() {
		if(dv_support.classList.contains("ed_support")){
			toggle_verse_ed(dv_citation);
		} else {
			const verse_cit_obj_2 = calc_verse_cit_object(dv_citation);
			const tg = make_bible_ref(verse_cit_obj_2);
			//console.log("going to: " + tg);
			window.open(tg, '_blank');
			//window.location.href = dv_href.innerHTML;
		}
		return;
	});

	if(! is_in_viewport(dv_citation)){
		dv_citation.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
	}
}

function calc_verse_cit_object(dv_citation){
	const cit_obj = {};
	if(dv_citation != null){
		var chls = dv_citation.childNodes;
		cit_obj.kind = VRS_CIT_KIND;
		cit_obj.book = chls[VRS_BOOK_IDX].innerHTML;
		cit_obj.chapter = chls[VRS_CHAPTER_IDX].innerHTML;
		cit_obj.verse = chls[VRS_VERSE_IDX].innerHTML;
		cit_obj.last_verse = chls[VRS_LAST_VERSE_IDX].innerHTML;
		cit_obj.site = chls[VRS_SITE_IDX].innerHTML;
		cit_obj.bib_ver = chls[VRS_BIB_VER_IDX].innerHTML;
	}
	return cit_obj;
}

function citation_to_en(cit_obj){ // websites use english names for citations
	var num_b = glb_books_nums[cit_obj.book];
	cit_obj.abbr = num2abbr[num_b];
	cit_obj.book = num2book_en[num_b];  
	return cit_obj;
}

function make_bible_ref(cit_obj_orig){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	const cit_obj = citation_to_en(cit_obj_orig); // websites use english names for citations
	var bibref = null;
	if(cit_obj.site == "blueletterbible"){
		bibref = "https://www.blueletterbible.org/" + cit_obj.bib_ver + "/" + cit_obj.abbr + "/" + cit_obj.chapter + "/" + cit_obj.verse;
		return bibref;
		//https://www.blueletterbible.org/kjv/mat/3/4/
	}
	if(cit_obj.site == "biblehub"){
		if(cit_obj.bib_ver == "text"){
			bibref = "https://www.biblehub.com/text/" + cit_obj.book + "/" + cit_obj.chapter + "-" + cit_obj.verse + ".htm";
			return bibref;
		} else {
			bibref = "https://www.biblehub.com/" + cit_obj.bib_ver + "/" + cit_obj.book + "/" + cit_obj.chapter + ".htm";
			return bibref;
		}
	}
	if(cit_obj.site == "bibliaparalela"){
		// https://bibliaparalela.com/nblh/genesis/1.htm
		bibref = "https://bibliaparalela.com/" + cit_obj.bib_ver + "/" + cit_obj.book + "/" + cit_obj.chapter + ".htm";
		return bibref;
	}
	if(cit_obj.site == "biblegateway"){
		bibref = "https://www.biblegateway.com/passage/?search=" + cit_obj.book + "+" + cit_obj.chapter + ":" + cit_obj.verse;
		if(! (cit_obj.last_verse == DEFAULT_LAST_VERSE)){
			bibref += "-" + cit_obj.last_verse;
		}
		bibref += "&version=" + cit_obj.bib_ver;
		return bibref;
	}
	
}

function toggle_verse_ed(dv_citation){
	var dv_ed_cit = get_new_dv_under(dv_citation, id_dv_citation_ed);
	dv_ed_cit.classList.add("exam");
	dv_ed_cit.classList.add("is_block");
	
	const cit_obj = calc_verse_cit_object(dv_citation);	
	//const cit_obj = {chapter:"543",verse:"123"};

	const inp_book = dv_ed_cit.appendChild(document.createElement("div"));
	inp_book.id = id_ed_book;
	inp_book.classList.add("exam");
	inp_book.classList.add("is_ed_verse");
	inp_book.classList.add("is_button");
	inp_book.innerHTML = cit_obj.book;
	inp_book.addEventListener('click', function() {
		const books_arr = Object.values(glb_all_books);
		toggle_select_option(inp_book, books_arr, null);
		return;
	});
	
	const inp_chapter = dv_ed_cit.appendChild(document.createElement("input"));
	inp_chapter.id = id_ed_chapter;
	inp_chapter.value = cit_obj.chapter;
	inp_chapter.type = "number";
	inp_chapter.size = 3;
	inp_chapter.classList.add("exam");
	inp_chapter.classList.add("is_ed_verse");

	const sep1 = dv_ed_cit.appendChild(document.createElement("div"));
	sep1.classList.add("exam");
	sep1.classList.add("is_ed_verse");
	sep1.innerHTML = " : ";
	
	const inp_verse = dv_ed_cit.appendChild(document.createElement("input"));
	inp_verse.id = id_ed_verse;
	inp_verse.value = cit_obj.verse;
	inp_verse.type = "number";
	inp_verse.size = 3;
	inp_verse.classList.add("exam");
	inp_verse.classList.add("is_ed_verse");

	const sep2 = dv_ed_cit.appendChild(document.createElement("div"));
	sep2.classList.add("exam");
	sep2.classList.add("is_ed_verse");
	sep2.innerHTML = " - ";
	
	const inp_last_verse = dv_ed_cit.appendChild(document.createElement("input"));
	inp_last_verse.id = id_ed_last_verse;
	inp_last_verse.value = cit_obj.last_verse;
	inp_last_verse.type = "number";
	inp_last_verse.size = 3;
	inp_last_verse.classList.add("exam");
	inp_last_verse.classList.add("is_ed_verse");
	
	if(cit_obj.last_verse == DEFAULT_LAST_VERSE){
		sep2.classList.toggle("is_hidden");
		inp_last_verse.classList.toggle("is_hidden");
	}
	
	const inp_site = dv_ed_cit.appendChild(document.createElement("div"));
	inp_site.id = id_ed_site;
	inp_site.classList.add("exam");
	inp_site.classList.add("is_ed_verse");
	inp_site.classList.add("is_button");
	inp_site.innerHTML = cit_obj.site;
	
	const inp_bib_ver_sel = dv_ed_cit.appendChild(document.createElement("div"));
	inp_bib_ver_sel.id = id_ed_bib_ver_sel;
	inp_bib_ver_sel.classList.add("exam");
	inp_bib_ver_sel.classList.add("is_ed_verse");
	inp_bib_ver_sel.classList.add("is_button");
	inp_bib_ver_sel.innerHTML = cit_obj.bib_ver;
	
	
	inp_site.addEventListener('click', function() {
		const all_sites_arr = Object.keys(glb_all_bibles);
		toggle_select_option(inp_site, all_sites_arr, function(dv_ret, dv_ops, val_sel){
			const bibs = glb_all_bibles[val_sel];
			if(bibs.length > 0){ inp_bib_ver_sel.innerHTML = bibs[0]; }
			dv_ret.innerHTML = val_sel;
			dv_ops.remove();
		});
		return;
	});
		
	
	inp_bib_ver_sel.addEventListener('click', function() {
		const all_bibs_arr = glb_all_bibles[inp_site.innerHTML];
		toggle_select_option(inp_bib_ver_sel, all_bibs_arr, null);
		return;
	});
	
	var id_ed_bib_ver_txt = "id_ed_bib_ver_txt";
	const inp_bib_ver_txt = dv_ed_cit.appendChild(document.createElement("input"));
	inp_bib_ver_txt.id = id_ed_bib_ver_txt;
	inp_bib_ver_txt.value = cit_obj.bib_ver;
	inp_bib_ver_txt.type = "text";
	inp_bib_ver_txt.size = 6;
	inp_bib_ver_txt.classList.add("exam");
	inp_bib_ver_txt.classList.add("is_ed_verse");
	inp_bib_ver_txt.classList.add("is_hidden");
		
	const dv_ok = dv_ed_cit.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_button");
	dv_ok.classList.add("is_ed_verse");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {
		//const all_chd = dv_citation.childNodes;
		dv_citation.childNodes[VRS_BOOK_IDX].innerHTML = inp_book.innerHTML;
		dv_citation.childNodes[VRS_CHAPTER_IDX].innerHTML = inp_chapter.value;
		dv_citation.childNodes[VRS_VERSE_IDX].innerHTML = inp_verse.value;
		
		var sep_range = dv_citation.childNodes[VRS_SEP_RANGE_IDX];
		var lst_Verse = dv_citation.childNodes[VRS_LAST_VERSE_IDX];
		if(! inp_last_verse.classList.contains("is_hidden") && (inp_last_verse.value != DEFAULT_LAST_VERSE)){			
			if(sep_range.classList.contains("is_hidden")){ sep_range.classList.toggle("is_hidden"); }
			if(lst_Verse.classList.contains("is_hidden")){ lst_Verse.classList.toggle("is_hidden"); }
			lst_Verse.innerHTML = inp_last_verse.value;
		} else {
			if(! sep_range.classList.contains("is_hidden")){ sep_range.classList.toggle("is_hidden"); }
			if(! lst_Verse.classList.contains("is_hidden")){ lst_Verse.classList.toggle("is_hidden"); }
			lst_Verse.innerHTML = DEFAULT_LAST_VERSE;
		}
		
		dv_citation.childNodes[VRS_SITE_IDX].innerHTML = inp_site.innerHTML;
		
		if(inp_bib_ver_sel.classList.contains("is_hidden")){
			dv_citation.childNodes[VRS_BIB_VER_IDX].innerHTML = inp_bib_ver_txt.value;
		} else {
			dv_citation.childNodes[VRS_BIB_VER_IDX].innerHTML = inp_bib_ver_sel.innerHTML;
		}
		
		dv_ed_cit.remove();
		
		if(! is_in_viewport(dv_citation)){
			dv_citation.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	const dv_del = dv_ed_cit.appendChild(document.createElement("div"));
	dv_del.classList.add("exam");
	dv_del.classList.add("is_button");
	dv_del.classList.add("is_ed_verse");
	dv_del.innerHTML = glb_curr_lang.msg_del;
	dv_del.addEventListener('click', function() {
		dv_citation.remove();
		dv_ed_cit.remove();
		return;
	});    
	
	const dv_range = dv_ed_cit.appendChild(document.createElement("div"));
	dv_range.classList.add("exam");
	dv_range.classList.add("is_button");
	dv_range.classList.add("is_ed_verse");
	dv_range.innerHTML = glb_curr_lang.msg_range;
	dv_range.addEventListener('click', function() {
		sep2.classList.toggle("is_hidden");
		inp_last_verse.classList.toggle("is_hidden");
		return;
	});    

	const dv_any = dv_ed_cit.appendChild(document.createElement("div"));
	dv_any.classList.add("exam");
	dv_any.classList.add("is_button");
	dv_any.classList.add("is_ed_verse");
	dv_any.innerHTML = glb_curr_lang.msg_any;
	dv_any.addEventListener('click', function() {
		if(inp_bib_ver_sel.classList.contains("is_hidden")){
			inp_bib_ver_sel.innerHTML = inp_bib_ver_txt.value;
		} else {
			inp_bib_ver_txt.value = inp_bib_ver_sel.innerHTML;
		}
		inp_bib_ver_sel.classList.toggle("is_hidden");
		inp_bib_ver_txt.classList.toggle("is_hidden");
		return;
	});    
	
	if(! is_in_viewport(dv_ed_cit)){
		dv_ed_cit.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

function get_new_dv_under(dv_pop_up, id_dv){
	var dv_parent = dv_pop_up.parentNode;
	var dv_options = document.getElementById(id_dv);
	if(dv_options != null){
		var was_mine = (dv_pop_up.nextSibling == dv_options);
		dv_options.remove();
		if(was_mine){
			return;
		}
	}
	if(dv_pop_up.nextSibling == null){
		dv_options = dv_parent.appendChild(document.createElement("div"));
	} else {
		dv_options = dv_parent.insertBefore(document.createElement("div"), dv_pop_up.nextSibling);
	}	
	dv_options.id = id_dv;
	return dv_options;
}

function toggle_select_option(dv_return, all_options_arr, on_click_fn){
	var dv_options = get_new_dv_under(dv_return, id_dv_sel_option);
	dv_options.classList.add("exam");
	dv_options.classList.add("is_block");
	
	//for (const [key, value] of Object.entries(all_options)) {
	all_options_arr.forEach((value) => {
		const dv_opt = add_option(dv_options, null, value, null);
		dv_opt.addEventListener('click', function() {
			if(on_click_fn != null){
				on_click_fn(dv_return, dv_options, value);
			} else {
				dv_return.innerHTML = value;
				dv_options.remove();
			}
		});
	});

	if(! is_in_viewport(dv_options)){
		dv_options.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}	
}

function add_option(dv_parent, id_option, label, handler){
	const dv_opt = dv_parent.appendChild(document.createElement("div"));
	if(id_option != null){
		dv_opt.id = id_option;
	}
	dv_opt.classList.add("exam");
	dv_opt.classList.add("is_option");
	dv_opt.innerHTML = label;
	if(handler != null){
		dv_opt.addEventListener('click', handler);
	}
	return dv_opt; 
}

function add_input_interaction(dv_inter, id_input, label, curr_val){
	const lab_1 = dv_inter.appendChild(document.createElement("div"));
	lab_1.classList.add("exam");
	lab_1.classList.add("is_block");
	lab_1.innerHTML = label;
	
	
	const full_inp = dv_inter.appendChild(document.createElement("div"));
	full_inp.classList.add("is_block");
	if(is_mobile_browser()){
		const dv_neg = full_inp.appendChild(document.createElement("div"));
		dv_neg.classList.add("exam");
		dv_neg.classList.add("is_inline_input");
		dv_neg.classList.add("is_button");
		dv_neg.innerHTML = "neg";
		dv_neg.addEventListener('click', function() {
			document.getElementById(id_input).value = -document.getElementById(id_input).value;
			return;
		});
		
	}
	const inp_1 = full_inp.appendChild(document.createElement("input"));
	inp_1.id = id_input;
	inp_1.value = curr_val;
	inp_1.type = "number";
	inp_1.size = 5;
	inp_1.classList.add("exam");
	inp_1.classList.add("is_inline_input");
}

function is_mobile_browser() {
	const m_list = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
	
	return m_list.some((m_item) => {
		return navigator.userAgent.match(m_item);
	});
}

function get_id_pos_array(dv_elem){
	if(dv_elem.tagName != "DIV"){
		return ["INVALID_ID", MIN_DATE];
	}
	const id_min = dv_elem.id + SUF_ID_POS_MIN;
	const dv_min = document.getElementById(id_min);
	
	var val_min = MIN_DATE;
	if(dv_min != null){
		val_min = parseInt(dv_min.innerHTML);
	}

	const id_pos_pair = [dv_elem.id, val_min];
	return id_pos_pair;
}

function get_all_id_pos_array(){
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	const all_pairs = [];
	for (const child of dv_all_quest.children) {
		all_pairs.push(get_id_pos_array(child));
		//console.log(child.tagName);
		//console.log(child.id);
	}
	return all_pairs;
}

function save_button_handler(){	
	const dv_exam_top = document.getElementById("id_exam_top_content");
	const dv_exam_nm = document.getElementById("id_exam_name");
	
	const mg_browser = glb_curr_lang.msg_save_in_browser;
	const mg_cloud = glb_curr_lang.msg_save_in_cloud;
	const where_arr = [mg_browser, mg_cloud];
	toggle_select_option(dv_exam_top, where_arr, function(dv_ret_w, dv_ops_w, val_sel_w){
		dv_ops_w.remove();
		if(val_sel_w == mg_browser){
			const nw_nm = glb_curr_lang.msg_new_answers_name;
			let all_sv_nams = read_all_exam_names();
			let all_disp_nams = [];
			if(all_sv_nams.length == 0){
				all_disp_nams = [nw_nm];
			} else {
				all_disp_nams = all_sv_nams.concat([nw_nm]);
			}
			toggle_select_option(dv_exam_nm, all_disp_nams, function(dv_ret_n, dv_ops_n, exam_nm){
				dv_ops_n.remove();
				if(exam_nm == nw_nm){
					toggle_exam_name_ed(dv_exam_nm, write_exam_object);
				} else {
					dv_exam_nm.innerHTML = exam_nm;
					write_exam_object(exam_nm);
				}
			});
		} else {
			dv_exam_nm.innerHTML = glb_curr_lang.msg_todacarne_answers_writing;
			//dv_exam_nm.classList.add("is_red");
			write_firebase_exam_object().then((result) => {
				dv_exam_nm.innerHTML = glb_curr_lang.msg_todacarne_answers_name;
				//dv_exam_nm.classList.remove("is_red");
			});
		}
	});
}

function open_button_handler(){
	const dv_exam_top = document.getElementById("id_exam_top_content");
	const dv_exam_nm = document.getElementById("id_exam_name");
	
	const mg_browser = glb_curr_lang.msg_open_from_browser;
	const mg_cloud = glb_curr_lang.msg_open_from_cloud;
	const where_arr = [mg_browser, mg_cloud];
	toggle_select_option(dv_exam_top, where_arr, function(dv_ret_w, dv_ops_w, val_sel_w){
		dv_ops_w.remove();
		if(val_sel_w == mg_browser){
			let all_disp_nams = read_all_exam_names();
			toggle_select_option(dv_exam_nm, all_disp_nams, function(dv_ret_n, dv_ops_n, exam_nm){
				dv_ops_n.remove();
				read_exam_object(exam_nm);
				dv_exam_nm.innerHTML = exam_nm;
			});
		} else {
			dv_exam_nm.innerHTML = glb_curr_lang.msg_todacarne_answers_reading;
			read_firebase_exam_object();
		}
	});
}

function delete_button_handler(){
	const dv_exam_top = document.getElementById("id_exam_top_content");
	const dv_exam_nm = document.getElementById("id_exam_name");
	
	const mg_browser = glb_curr_lang.msg_open_from_browser;
	const mg_cloud = glb_curr_lang.msg_open_from_cloud;
	const where_arr = [mg_browser, mg_cloud];
	
	let all_disp_nams = read_all_exam_names();
	toggle_select_option(dv_exam_nm, all_disp_nams, function(dv_ret_n, dv_ops_n, exam_nm){
		dv_ops_n.remove();
		delete_exam_object(exam_nm);
		dv_exam_nm.innerHTML = "";
	});	
}

function sort_button_handler(){
	const all_pairs = get_all_id_pos_array();
	const sorted_pairs = all_pairs.sort((p1, p2) => p1[1] - p2[1]);
	//console.log(sorted_pairs);
	//console.log("PRESSED_SORT_BUTTON");
	
	const dv_all_stm = document.getElementById("id_exam_all_questions");
	sorted_pairs.forEach((pair) => {
		const qid = pair[0];
		const dv_quest = document.getElementById(qid);
		dv_quest.remove();
		dv_all_stm.appendChild(dv_quest);
	});
	
}


function make_strong_ref(scode){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	if((scode.length < 2) || ((scode[0] != "G") && (scode[0] != "H"))){
		return "https://www.biblehub.com";
	}
	var bibref = null;
	const the_code = scode.substring(1);
	if(scode[0] == "H"){
		bibref = "https://www.biblehub.com/hebrew/" + the_code + ".htm";
	}
	if(scode[0] == "G"){
		bibref = "https://www.biblehub.com/greek/" + the_code + ".htm";
	}
	return bibref;
}

function is_last_added_strong_ok(qid){
	const id_dv_last_strong = qid + SUF_ID_LAST_ADDED_STRONG;
	const dv_last_strong = document.getElementById(id_dv_last_strong);
	if(dv_last_strong == null){
		return true;
	}
	if(dv_last_strong != null){
		var ck1 = (dv_last_strong.innerHTML != DEFAULT_STRONG);
		if(ck1){ 
			dv_last_strong.removeAttribute('id');
			return true;		
		}
	}
	return false;
}

function add_strong_cit(qid, stg_obj){
	//console.log("ENTRA a add_strong");
	const id_dv_support = qid + SUF_ID_SUPPORT;
	const dv_support = document.getElementById(id_dv_support);

	const id_dv_last_strong = qid + SUF_ID_LAST_ADDED_STRONG;
	if(! is_last_added_strong_ok(qid)){
		return;
	}
	
	const dv_code = dv_support.appendChild(document.createElement("div"));
	dv_code.id = id_dv_last_strong;
	dv_code.classList.add("exam");
	dv_code.classList.add("is_strong_cit");
	dv_code.classList.add("is_option");
	if(stg_obj == null){
		dv_code.innerHTML = DEFAULT_STRONG;
	} else {
		dv_code.innerHTML = stg_obj.lang + stg_obj.num;
	}
	
	dv_code.addEventListener('click', function() {
		if(dv_support.classList.contains("ed_support")){
			toggle_strong_ed(dv_code);
		} else {
			const tg = make_strong_ref(dv_code.innerHTML);
			//console.log("going to: " + tg);
			window.open(tg, '_blank');
			//window.location.href = dv_href.innerHTML;
		}
		return;
	});

	if(! is_in_viewport(dv_code)){
		dv_code.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
	}
}

function calc_strong_cit_object(dv_citation){
	const cit_obj = {};
	if(dv_citation != null){
		const scode = dv_citation.innerHTML;
		cit_obj.kind = STG_CIT_KIND;
		cit_obj.lang = scode[0];
		cit_obj.num = scode.substring(1);
	}
	return cit_obj;	
}

function toggle_strong_ed(dv_code){
	var dv_ed_strong = get_new_dv_under(dv_code, id_dv_code_ed);
	dv_ed_strong.classList.add("exam");
	dv_ed_strong.classList.add("is_block");

	var strong_lang = "H";
	var strong_num = "0";
	const scode = dv_code.innerHTML;
	if((scode != DEFAULT_STRONG) && (scode.length > 1)){
		const cit_obj = calc_strong_cit_object(dv_code);
		strong_lang = cit_obj.lang;
		strong_num = cit_obj.num;
	}

	//console.log("IN toggle_strong_ed " + strong_lang + strong_num);
	
	const inp_slang = dv_ed_strong.appendChild(document.createElement("div"));
	inp_slang.classList.add("exam");
	inp_slang.classList.add("is_ed_verse");
	inp_slang.classList.add("is_button");
	inp_slang.innerHTML = strong_lang;
	inp_slang.addEventListener('click', function() {
		const lang_arr = ["H", "G"];
		toggle_select_option(inp_slang, lang_arr, null);
		return;
	});
	
	const inp_snum = dv_ed_strong.appendChild(document.createElement("input"));
	inp_snum.value = strong_num;
	inp_snum.type = "number";
	inp_snum.size = 4;
	inp_snum.classList.add("exam");
	inp_snum.classList.add("is_ed_verse");

	const dv_ok = dv_ed_strong.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_button");
	dv_ok.classList.add("is_ed_verse");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {
		//const all_chd = dv_code.childNodes;
		dv_code.innerHTML = inp_slang.innerHTML + inp_snum.value;
		dv_ed_strong.remove();
		
		if(! is_in_viewport(dv_code)){
			dv_code.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	const dv_del = dv_ed_strong.appendChild(document.createElement("div"));
	dv_del.classList.add("exam");
	dv_del.classList.add("is_button");
	dv_del.classList.add("is_ed_verse");
	dv_del.innerHTML = glb_curr_lang.msg_del;
	dv_del.addEventListener('click', function() {
		dv_code.remove();
		dv_ed_strong.remove();
		return;
	});    
	
	if(! is_in_viewport(dv_ed_strong)){
		dv_ed_strong.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

function init_exam_buttons(){
	const id_save_butt = "id_exam_save_button"; // this must be the same to the id in the HTML page.
	const dv_save_butt = document.getElementById(id_save_butt);
	dv_save_butt.addEventListener('click', save_button_handler);
	
	const id_open_butt = "id_exam_open_button"; // this must be the same to the id in the HTML page.
	const dv_open_butt = document.getElementById(id_open_butt);
	dv_open_butt.addEventListener('click', open_button_handler);
	
	const id_del_butt = "id_exam_delete_button"; // this must be the same to the id in the HTML page.
	const dv_del_butt = document.getElementById(id_del_butt);
	dv_del_butt.addEventListener('click', delete_button_handler);
	
	const id_sort_butt = "id_exam_sort_button"; // this must be the same to the id in the HTML page.
	const dv_sort_butt = document.getElementById(id_sort_butt);
	dv_sort_butt.addEventListener('click', sort_button_handler);
	
}

function is_last_added_link_ok(qid){
	const id_dv_last_link = qid + SUF_ID_LAST_ADDED_LINK;
	const dv_last_link = document.getElementById(id_dv_last_link);
	if(dv_last_link == null){
		return true;
	}
	if(dv_last_link != null){
		var chls = dv_last_link.childNodes;
		var ck1 = (chls[LNK_NAME_IDX].innerHTML != DEFAULT_LINK_NAME);
		if(ck1){ 
			dv_last_link.removeAttribute('id');
			return true;		
		}
	}
	return false;
}

function add_link_cit(qid, link_obj){
	//console.log("ENTRA a add_link");
	const id_dv_support = qid + SUF_ID_SUPPORT;
	const dv_support = document.getElementById(id_dv_support);

	const id_dv_last_link = qid + SUF_ID_LAST_ADDED_LINK;
	if(! is_last_added_link_ok(qid)){
		return;
	}
	
	const dv_link = dv_support.appendChild(document.createElement("div"));
	dv_link.id = id_dv_last_link;
	dv_link.classList.add("exam");
	dv_link.classList.add("is_link_cit");
	dv_link.classList.add("is_option");
	
	const dv_name = dv_link.appendChild(document.createElement("div"));
	dv_name.classList.add("exam");
	dv_name.classList.add("is_citation_item");
	if(link_obj == null){
		dv_name.innerHTML = DEFAULT_LINK_NAME;
	} else {
		dv_name.innerHTML = link_obj.name;
	}
	
	const dv_href = dv_link.appendChild(document.createElement("a"));
	dv_href.classList.add("is_hidden");
	if(link_obj == null){
		dv_href.href = DEFAULT_LINK_HREF;
	} else {
		dv_href.href = link_obj.href;
	}

	dv_link.addEventListener('click', function() {
		if(dv_support.classList.contains("ed_support")){
			toggle_link_ed(dv_link);
		} else {
			const tg = dv_href.href;
			//console.log("going to: " + tg);
			window.open(tg, '_blank');
			//window.location.href = dv_href.innerHTML;
		}
		return;
	});

	if(! is_in_viewport(dv_link)){
		dv_link.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
	}
}

function calc_link_cit_object(dv_citation){
	const cit_obj = {};
	if(dv_citation != null){
		const chls = dv_citation.childNodes;
		cit_obj.kind = LNK_CIT_KIND;
		cit_obj.name = chls[LNK_NAME_IDX].innerHTML;
		cit_obj.href = chls[LNK_HREF_IDX].href;
	}
	return cit_obj;
}

function toggle_link_ed(dv_link){
	var dv_ed_link = get_new_dv_under(dv_link, id_dv_link_ed);
	dv_ed_link.classList.add("exam");
	dv_ed_link.classList.add("is_block");

	const lnk_cit_obj = calc_link_cit_object(dv_link);
	var link_name = lnk_cit_obj.name;
	var link_href = lnk_cit_obj.href;

	//console.log("IN toggle_link_ed " + link_lang + link_num);
	
	const inp_name = dv_ed_link.appendChild(document.createElement("input"));
	inp_name.value = link_name;
	inp_name.type = "text";
	inp_name.size = 10;
	inp_name.classList.add("exam");
	inp_name.classList.add("is_ed_verse");
	
	const inp_href = dv_ed_link.appendChild(document.createElement("input"));
	inp_href.value = link_href;
	inp_href.type = "text";
	inp_href.size = 20;
	inp_href.classList.add("exam");
	inp_href.classList.add("is_ed_verse");

	const dv_ok = dv_ed_link.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_button");
	dv_ok.classList.add("is_ed_verse");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {
		const all_chd = dv_link.childNodes;
		all_chd[LNK_NAME_IDX].innerHTML = inp_name.value;
		all_chd[LNK_HREF_IDX].href = inp_href.value;
		dv_ed_link.remove();
		
		if(! is_in_viewport(dv_link)){
			dv_link.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	const dv_del = dv_ed_link.appendChild(document.createElement("div"));
	dv_del.classList.add("exam");
	dv_del.classList.add("is_button");
	dv_del.classList.add("is_ed_verse");
	dv_del.innerHTML = glb_curr_lang.msg_del;
	dv_del.addEventListener('click', function() {
		dv_link.remove();
		dv_ed_link.remove();
		return;
	});    
	
	if(! is_in_viewport(dv_ed_link)){
		dv_ed_link.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

function toggle_exam_name_ed(dv_name, save_fn){
	var dv_ed_name = get_new_dv_under(dv_name, id_dv_name_ed);
	dv_ed_name.classList.add("exam");
	dv_ed_name.classList.add("is_block");

	const exam_name = dv_name.innerHTML;

	//console.log("IN toggle_link_ed " + link_lang + link_num);
	
	const inp_name = dv_ed_name.appendChild(document.createElement("input"));
	inp_name.value = exam_name;
	inp_name.type = "text";
	inp_name.size = 30;
	inp_name.classList.add("exam");
	inp_name.classList.add("is_ed_verse");
	
	const dv_ok = dv_ed_name.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_button");
	dv_ok.classList.add("is_ed_verse");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {
		let nm_nm = inp_name.value;
		if(save_fn != null){
			save_fn(nm_nm); 
		}
		dv_name.innerHTML = nm_nm;
		dv_ed_name.remove();
		
		if(! is_in_viewport(dv_name)){
			dv_name.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	if(! is_in_viewport(dv_ed_name)){
		dv_ed_name.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

//function init_page_exam(){
export function init_page_exam(){
	console.log("Called init_page_exam");

	//let sd_menu = document.getElementById("id_side_menu");
	//sd_menu.classList.toggle("has_side_nav");
	
	init_exam_fb();
	init_exam_database();
	init_exam_module_vars();
	init_exam_buttons();
	
	let added = null;
	for(const qq of STARTING_QUESTIONS){
		//console.log("Adding question " + qq + " to page");
		added = add_question(qq);
		if(added == null){
			console.log("Question " + qq + " could NOT be added to page !!!");
		}
	}
	return added;
	//return add_question(FIRST_EXAM_QUESTION_ID);
};

function calc_support_save_array(dv_quest){
	const qid = dv_quest.id;
	const id_dv_support = qid + SUF_ID_SUPPORT;
	const dv_support = document.getElementById(id_dv_support);
	const sv_obj = [];
	for (const dv_citation of dv_support.children) {
		let ct_obj = null;
		if(dv_citation.classList.contains("is_verse_cit")){
			ct_obj = calc_verse_cit_object(dv_citation);	
		}
		if(dv_citation.classList.contains("is_strong_cit")){
			ct_obj = calc_strong_cit_object(dv_citation);	
		}
		if(dv_citation.classList.contains("is_link_cit")){
			ct_obj = calc_link_cit_object(dv_citation);
		}
		if(ct_obj != null){
			sv_obj.push(ct_obj);
		}
	}
	return sv_obj;
}

function calc_quest_save_object(dv_quest){
	const qid = dv_quest.id;
	const quest = db_nodes_exam[qid];
	if(quest == null){
		return null;
	}
	const sv_obj = {};

	if(quest.v_min != null){
		sv_obj.v_min = quest.v_min;
	}
	if(quest.v_max != null){
		sv_obj.v_max = quest.v_max;
	}
	if(quest.has_answ != null){
		sv_obj.has_answ = quest.has_answ;
	}
	if(quest.answers != null){
		sv_obj.answers = JSON.parse(JSON.stringify(quest.answers));
	}
	if(quest.all_nxt != null){
		sv_obj.all_nxt = JSON.parse(JSON.stringify(quest.all_nxt));
	}
	if(quest.all_contra != null){
		sv_obj.all_contra = JSON.parse(JSON.stringify(quest.all_contra));
	}
	if(quest.all_dicted_by != null){
		sv_obj.all_dicted_by = JSON.parse(JSON.stringify(quest.all_dicted_by));
	}
	
	sv_obj.support = calc_support_save_array(dv_quest);
	
	return sv_obj;
}

function calc_exam_save_object(){
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	const sv_obj = {};
	for (const dv_quest of dv_all_quest.children) {
		const q_obj = calc_quest_save_object(dv_quest);
		if(q_obj != null){
			sv_obj[dv_quest.id] = q_obj;
		}
	}
	console.log("FULL_SAVE_OBJ = " + JSON.stringify(sv_obj, null, "  "));
	return sv_obj;
}

function update_nodes_exam_with(ld_obj){
	const db = db_nodes_exam;
	for (const [qid, quest] of Object.entries(ld_obj)) {
		if(quest.v_min != null){
			db[qid].v_min = quest.v_min;
		}
		if(quest.v_max != null){
			db[qid].v_max = quest.v_max;
		}
		if(quest.has_answ != null){
			db[qid].has_answ = quest.has_answ;
		}
		if(quest.answers != null){
			db[qid].answers = JSON.parse(JSON.stringify(quest.answers));
		}
		if(quest.all_nxt != null){
			db[qid].all_nxt = JSON.parse(JSON.stringify(quest.all_nxt));
		}
		if(quest.all_contra != null){
			db[qid].all_contra = JSON.parse(JSON.stringify(quest.all_contra));
		}
		if(quest.all_dicted_by != null){
			db[qid].all_dicted_by = JSON.parse(JSON.stringify(quest.all_dicted_by));
		}
	}
}

function display_support_for_question(qid, ld_obj){
	const quest = ld_obj[qid];
	if(quest == null){
		return;
	}
	const all_supp = quest.support;
	if(all_supp == null){
		return;
	}
	all_supp.forEach((cit_obj) => {
		if(cit_obj.kind == VRS_CIT_KIND){
			add_verse_cit(qid, cit_obj);
		} else if(cit_obj.kind == STG_CIT_KIND){
			add_strong_cit(qid, cit_obj);
		} else if(cit_obj.kind == LNK_CIT_KIND){
			add_link_cit(qid, cit_obj);
		}
	});
}

function display_exam_load_object(ld_obj){
	console.log("FULL_READ_OBJ = " + JSON.stringify(ld_obj, null, "  "));
	init_exam_database();
	update_nodes_exam_with(ld_obj);
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	dv_all_quest.innerHTML = "";
	
	for (const [qid, quest] of Object.entries(ld_obj)) {
		const added = add_question(qid);
		if(added == null){
			console.log("Question " + qid + " could NOT be DISPLAYED in page !!!");
		} else {
			display_support_for_question(qid, ld_obj);
		}
	}
}

function read_all_exam_names(){
	let all_nm_str = window.localStorage.getItem(ALL_SAVED_OBJ_NAMES);
	let all_nm = [];
	if(all_nm_str != null){
		all_nm = JSON.parse(all_nm_str);
	}
	return all_nm;
}

function write_exam_name(name){
	let all_nm = read_all_exam_names()
	all_nm = [name].concat(all_nm.filter((val) => (val != name)));
	window.localStorage.setItem(ALL_SAVED_OBJ_NAMES, JSON.stringify(all_nm));
}

function delete_exam_name(name){
	let all_nm = read_all_exam_names()
	all_nm = all_nm.filter((val) => (val != name));
	window.localStorage.setItem(ALL_SAVED_OBJ_NAMES, JSON.stringify(all_nm));
}

function write_exam_object(name){
	console.log("SAVING " + name);
	const wr_obj = calc_exam_save_object();
	write_exam_name(name);
	if(wr_obj != null){
		window.localStorage.setItem(name, JSON.stringify(wr_obj));
	}
}

function read_exam_object(name){
	console.log("READING " + name);
	write_exam_name(name);
	let rd_obj_str = window.localStorage.getItem(name);
	let rd_obj = null;
	if(rd_obj_str != null){
		rd_obj = JSON.parse(rd_obj_str);
	}
	if(rd_obj != null){
		display_exam_load_object(rd_obj);
	}
}

function delete_exam_object(name){
	console.log("DELETING " + name);
	delete_exam_name(name);
	window.localStorage.removeItem(name);
}

function write_firebase_exam_object(){
	if(fb_write_object == null){
		console.log("CANNOT write_firebase_exam_object. fb_write_object == null");
		const dv_exam_nm = document.getElementById("id_exam_name");
		dv_exam_nm.innerHTML = glb_curr_lang.msg_todacarne_no_internet;
		return;
	}
	console.log("SAVING in TodaCarne.com");
	const wr_obj = calc_exam_save_object();
	return fb_write_object(firebase_answers_path, wr_obj);
}

function read_firebase_exam_object(){
	if(fb_read_object == null){
		console.log("CANNOT read_firebase_exam_object. fb_read_object == null");
		const dv_exam_nm = document.getElementById("id_exam_name");
		dv_exam_nm.innerHTML = glb_curr_lang.msg_todacarne_no_internet;
		return;
	}
	console.log("LOADING from TodaCarne.com");
	return fb_read_object(firebase_answers_path, (snapshot) => {
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			display_exam_load_object(rd_obj);
			const dv_exam_nm = document.getElementById("id_exam_name");
			dv_exam_nm.innerHTML = glb_curr_lang.msg_todacarne_answers_name;
		} else {
			console.log("No data available");
		}
	});	
}

function qref_to_qid(qrf){
	return qrf.slice(qref_prefix.length);
}

function qid_to_qhref(qid){
	const quest = db_nodes_exam[qid];
	if(quest == null){
		const bad_qhrf = "<a class='exam_ref' href='#" + qid + "'>invalid question " + qid + "</a>";
		return bad_qhrf;
	}
	const qhrf = "<a class='exam_ref' href='#" + qid + "'>question number " + quest.pos_page + "</a>";
	return qhrf;
}

function replace_all_qrefs(str){
	const words = str.split(' ');
	words.forEach((wrd, idx, arr) => {
		if(wrd.startsWith(qref_prefix)){
			arr[idx] = qid_to_qhref(qref_to_qid(wrd)); 
		}
	});
	
	const nwstr = words.join(' ');
	return nwstr;
}

