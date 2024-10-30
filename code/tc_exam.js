
import { get_msg, make_bible_ref, make_strong_ref, bib_defaults, refs_ids, bib_obj_to_txt, get_verse_cit_txt, bib_obj_to_cit_obj, is_mobile_browser,
	glb_exam_language, glb_all_books, glb_all_bibles, glb_books_nums, glb_curr_lang, glb_all_bibrefs, get_qid_base, 
	glb_poll_user_info, glb_poll_starting_questions, glb_poll_db, get_verse_match, get_answer_key
} from './tc_lang_all.js';

// import { firebase_write_object, firebase_read_object, firebase_sign_out } from './tc_firebase.js';

"use strict";

const INVALID_PAGE_POS = "???";

let INIT_EXAM_DB_FUNC = null;

let DEBUG_QNUMS = true;

let DEFAULT_BOOK = null;
let DEFAULT_STRONG = null;
let DEFAULT_LINK_NAME = null;

let fb_write_object = null;
let fb_read_object = null;
let fb_sign_out = null;

const MIN_ANSW_SHOW_INVERT = 3;

const qref_prefix = "QREF_";
const stg_prefix = "STRONG";
const lnk_prefix = "LINK";

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

const SUF_ID_QSTM = "_qstm";
const SUF_ID_QREFS_OBSERVATION = "_qrefs_observation";
const SUF_ID_ANSWERS = "_answers";
const SUF_ID_SCODES = "_scodes";
const SUF_ID_LINKS = "_links";
const SUF_ID_END_ANS = "_end_all_ans";

const SUF_ID_LAST_ADDED_CITATION = "_last_added_citation";
const SUF_ID_LAST_ADDED_STRONG = "_last_added_strong";
const SUF_ID_LAST_ADDED_LINK = "_last_added_link";

const DEFAULT_CHAPTER = bib_defaults.CHAPTER;
const DEFAULT_VERSE = bib_defaults.VERSE;
const DEFAULT_LAST_VERSE = bib_defaults.LAST_VERSE;
const DEFAULT_BIBLES_SITE = bib_defaults.BIBLES_SITE;
const DEFAULT_BIB_VER = bib_defaults.BIB_VER;

const DEFAULT_LINK_HREF = "https://www.biblehub.com";

const VRS_CIT_KIND = refs_ids.verse_kind;
const STG_CIT_KIND = refs_ids.strong_kind;
const LNK_CIT_KIND = refs_ids.link_kind;

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
const id_support_ed = "id_support_ed";
const id_quest_img = "id_quest_img";

// FOR DAG pending management
const id_ctx_pend = "ctx_pend";

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

function scroll_to_top(dv_elem) {	
	if(dv_elem == null){ return; }
	const rect = dv_elem.getBoundingClientRect();
	const dv_content = document.getElementById("id_exam_content");
	const rect2 = dv_content.getBoundingClientRect();
	dv_content.scrollBy(0, (rect.top - rect2.top));
}


// CODE_FOR QUESTION DYSPLAY AND USER OPERATION

function is_observation(quest){
	if(quest == null){ return false; }
	const has_answers = (quest.answers != null);
	const has_activate = (quest.activated_if != null);
	return (! has_answers && has_activate);
}

function is_base_question(quest){
	if(quest == null){ return false; }
	const has_answers = (quest.answers != null);
	const has_activate = (quest.activated_if != null);
	return (has_answers && ! has_activate);
}

function is_activated_question(quest){
	if(quest == null){ return false; }
	const has_answers = (quest.answers != null);
	const has_activate = (quest.activated_if != null);
	return (has_answers && has_activate);
}

function is_question(quest){
	if(quest == null){ return false; }
	const has_answers = (quest.answers != null);
	return has_answers;
}

function get_last_quest(){
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	const all_q = dv_all_quest.childNodes;
	let curr_idx = all_q.length - 1;
	let quest = null;
	while(curr_idx > 0){
		//console.log("get_curr_pos_page [1] curr_idx=" + curr_idx);
		const qid = all_q[curr_idx].id;
		curr_idx--;
		if(qid == null){ continue; }
		quest = glb_poll_db[qid];
		if(quest == null){ continue; }
		if(is_question(quest)){
			break;
		}
	}
	//console.log("get_curr_pos_page [2] curr_idx=" + curr_idx);
	return quest;
}

function get_first_not_answered(){
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	const all_q = dv_all_quest.childNodes;
	let curr_idx = 0;
	let quest = null;
	while(curr_idx < all_q.length){
		//console.log("get_curr_pos_page [1] curr_idx=" + curr_idx);
		const qid = all_q[curr_idx].id;
		curr_idx++;
		if(qid == null){ continue; }
		quest = glb_poll_db[qid];
		if(quest == null){ continue; }
		if(is_question(quest) && (quest.has_answ == null)){
			break;
		}
	}
	//console.log("get_curr_pos_page [2] curr_idx=" + curr_idx);
	return quest;
}

function scroll_to_last_quest(){
	const quest = get_last_quest();
	if(quest == null){ return; }
	if(quest.qid == null){ return; }
	const dv_quest = document.getElementById(quest.qid);
	if(dv_quest == null){ return; }
	scroll_to_top(dv_quest);
}

function scroll_to_first_not_answered(){
	const quest = get_first_not_answered();
	if(quest == null){ return; }
	if(quest.qid == null){ return; }
	const dv_quest = document.getElementById(quest.qid);
	if(dv_quest == null){ return; }
	scroll_to_top(dv_quest);
}

function add_question(qid){
	const quest = glb_poll_db[qid];
	if(quest == null){
		console.log("Could not find question " + qid + " in questions db.");
		return null;
	}
	const old_dv = document.getElementById(qid);
	if(old_dv != null){ 
		console.log("Question " + qid + " ALREADY in page (add_question)");
		return null;
	}
	//console.log("ADDING question " + qid + " to page.");
	
	const lst_quest = get_last_quest();
	let lst_pos = 0;
	if((lst_quest != null) && (lst_quest.pos_page != null) && (lst_quest.pos_page != INVALID_PAGE_POS)){ lst_pos = lst_quest.pos_page; }
	
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	const dv_quest = dv_all_quest.appendChild(document.createElement("div"));
	dv_quest.id = qid;
	dv_quest.classList.add("exam");
	dv_quest.classList.add("has_border");
	dv_quest.classList.add("grid_1col");
	
	dv_quest.tc_quest = quest;	
	
	if(quest.pos_page == null){
		quest.pos_page = lst_pos + 1;
	}
	
	if(quest.presentation != null){
		const dv_title = dv_quest.appendChild(document.createElement("div"));
		dv_title.classList.add("exam");
		dv_title.classList.add("exam_title");
		dv_title.innerHTML = get_msg(quest.presentation);
	}
	
	const dv_stm = dv_quest.appendChild(document.createElement("div"));
	dv_stm.classList.add("exam");
	dv_stm.classList.add("stm");
	
	let the_stm = get_msg(quest.htm_stm);
	if(quest.has_qrefs){
		the_stm = replace_all_qrefs(the_stm);
	}
	
	const sp_num = document.createElement("span")
	sp_num.classList.add("exam");
	sp_num.classList.add("is_qnum");
	
	sp_num.innerHTML = "<b>" + quest.pos_page + ". </b>";
	
	if(DEBUG_QNUMS){
		sp_num.title = quest.htm_stm;
	}
	
	const dv_qstm = dv_stm.appendChild(document.createElement("div"));
	dv_qstm.id = qid + SUF_ID_QSTM;
	if(quest.answers != null){
		dv_qstm.title = glb_curr_lang.msg_help_statement_right_click;
	}
	dv_qstm.classList.add("exam");
	dv_qstm.classList.add("msg");
	dv_qstm.innerHTML = "" + the_stm;
	dv_qstm.prepend(sp_num);
	
	if(quest.answers != null){
		/*dv_qstm.addEventListener('contextmenu', (ev1) => {
			ev1.preventDefault();
			toggle_support_interaction(qid, SUF_ID_ANSWERS);
			return false;				
		});*/
		sp_num.addEventListener('click', (ev1) => {
			ev1.preventDefault();
			toggle_support_interaction(qid, SUF_ID_ANSWERS);
			return false;				
		});
	}

	init_answers(qid);

	scroll_to_top(dv_quest);
	
	return dv_quest;
}

function get_exam_image(id_img){
	if(id_img == null){ return; }
	const hrefs = glb_poll_db.img_hrefs;
	if(hrefs == null){ return; }
	const dv_content = document.getElementById("id_exam_content");
	return dv_content.all_img[id_img];
}

function load_image(dv_scroll, all_img, id_img, src_img){
	if(id_img == null){ return null; }
	if(all_img == null){ return null; }
	let htm_img = all_img[id_img];
	if(htm_img == null){
		if(src_img == null){ return null; }
		htm_img = document.createElement("img");
		all_img[id_img] = htm_img;
		htm_img.classList.add("exam", "is_answ_img");
		htm_img.src = src_img;
		if(dv_scroll != null){ 
			if (htm_img.complete) {
				scroll_to_top(dv_scroll);
			} else {
				htm_img.addEventListener('load', (ev1) => {
					scroll_to_top(dv_scroll);
				});
				htm_img.addEventListener('error', function() {
					console.log("Could not run scroll_to_top on load image");
				})
			}
		}
	}
	return htm_img;
}

function add_simple_choice_item(dv_answers, dv_img, pos_cls, htm_txt){
	const dv_answ = dv_answers.appendChild(document.createElement("div"));
	const answ_classes = ["exam", "grid_img_answer", pos_cls];
	if(pos_cls != "grid_item_center"){
		answ_classes.push("item_can_select");
	}
	dv_answ.classList.add(...answ_classes);
	
	if(dv_img != null){	dv_answ.append(dv_img);	}
	const dv_txt = document.createElement("div");
	dv_txt.classList.add("exam", "grid_item", "to_center");
	if(htm_txt != null){
		dv_txt.innerHTML = get_msg(htm_txt);
	}
	dv_answ.append(dv_txt);
	return dv_answ;
}

function init_answers(qid){
	//console.log("init_answers of qid = " + qid);
	const quest = glb_poll_db[qid];
	
	const is_init_to_answer = (quest.has_answ == null);
	
	const dv_quest = document.getElementById(qid);
	if(dv_quest == null){
		console.log("COULD NOT FIND qid = " + qid);
		return;
	}
	let dv_quest_img = null;
	let dv_less = null;
	let dv_more = null;
	if(quest.choose_yes && (quest.img_href != null) && (quest.img_pos != null)){
		const htm_quest_img = load_image(dv_quest, dv_quest, id_quest_img, quest.img_href);
		dv_quest_img = document.createElement("div");
		dv_quest_img.classList.add("exam", "grid_item");
		dv_quest_img.append(htm_quest_img);
	}
	if(quest.choose_more){
		let htm_quest_img = null;
		htm_quest_img = get_exam_image("less");
		if(htm_quest_img != null){
			dv_less = document.createElement("div");
			dv_less.classList.add("exam", "grid_item");
			dv_less.append(htm_quest_img);
		}
		htm_quest_img = get_exam_image("more");
		if(htm_quest_img != null){
			dv_more = document.createElement("div");
			dv_more.classList.add("exam", "grid_item");
			dv_more.append(htm_quest_img);
		}
	}
	let showed_quest_img = false;
	const have_quest_img = (quest.choose_yes && (dv_quest_img != null));
	let showed_left = false;
	let showed_right = false;
	
	const id_dv_answers = qid + SUF_ID_ANSWERS;
	let dv_answers = document.getElementById(id_dv_answers);
	if(dv_answers == null){
		dv_answers = dv_quest.appendChild(document.createElement("div"));
		dv_answers.id = id_dv_answers;
		dv_answers.classList.add("exam");
		//dv_answers.classList.add("is_block");
		dv_answers.classList.add("grid_4col", "margin_top_bot");
		dv_answers.all_img = {};
	}
	
	dv_answers.innerHTML = "";
	
	if(quest.answers == null){
		set_anchors_target(dv_quest);
		return;
	}
	const all_answ = Object.entries(quest.answers);
	
	for (const [anid, an_answ] of all_answ) {
		//console.log("anid=" + anid + " an_answ=" + JSON.stringify(an_answ, null, "  "));
		if(an_answ == null){
			continue; // continue with next elem
		}
		
		const is_more_answ = (quest.choose_more && (an_answ.img_pos != null));
		
		let answ_classes = ["exam", "grid_item_all_col", "item_can_select"];
		
		if(! is_init_to_answer && ! an_answ.is_on && ! is_more_answ){
			if(an_answ.should_on != null){
				const dv_shd_on = document.createElement("div");
				dv_shd_on.classList.add(...answ_classes);
				dv_shd_on.classList.add("is_contradiction");
				dv_shd_on.innerHTML = get_msg(an_answ.should_on);
				add_listener_to_add_edit_button(dv_answers, dv_shd_on, qid);
				dv_shd_on.tc_answ_obj = an_answ;
				dv_shd_on.tc_is_should = true;
				add_right_click_listener_for_answer(qid, dv_shd_on);				
				dv_answers.appendChild(dv_shd_on);
			}
			continue; // continue with next elem
		}
		if(quest.choose_yes && ! showed_quest_img && have_quest_img && (an_answ.img_pos != null)){
			showed_quest_img = true;
			if(an_answ.is_on && (an_answ.img_pos != null)){
				quest.img_pos = an_answ.img_pos;
			}
			if(is_init_to_answer){
				quest.img_pos = "grid_item_center";
			}
			const pos_cls = quest.img_pos;
			add_simple_choice_item(dv_answers, dv_quest_img, pos_cls, null);
		}
		
		let dv_img = null;
		let htm_img = null;
		if(quest.choose_more && (an_answ.img_href != null)){
			htm_img = load_image(dv_quest, dv_answers.all_img, anid, an_answ.img_href);
			htm_img.style.width = "100%";
		}
		if(quest.choose_yes && (an_answ.img_pos != null)){
			if(an_answ.img_pos == "grid_item_right"){ htm_img = get_exam_image("yes_like"); }
			if(an_answ.img_pos == "grid_item_left"){ htm_img = get_exam_image("no_like"); }
		}
		if(htm_img != null){
			dv_img = document.createElement("div");
			dv_img.classList.add("exam", "grid_item");
			dv_img.append(htm_img);
		}
		//get_exam_image(
		let dv_answ = null;
		if (an_answ.kind == VRS_CIT_KIND){
			dv_answ = add_verse_cit(qid, an_answ);
		} else if (an_answ.kind == STG_CIT_KIND){
			dv_answ = add_strong_cit(qid, an_answ);
		} else if (an_answ.kind == LNK_CIT_KIND){
			dv_answ = add_link_cit(qid, an_answ);
		} else if (an_answ.img_pos != null){
			let pos_itm = null;
			let dv_add = null;
			if(quest.choose_more && (quest.has_answ != null)){
				if(an_answ.is_on){
					pos_itm = "grid_item_right";
					dv_add = dv_more;
					an_answ.img_pos = pos_itm;
					htm_img.style.width = "100%";
				} else {
					pos_itm = "grid_item_left";
					dv_add = dv_less;
					an_answ.img_pos = pos_itm;
					htm_img.style.width = "50%";
				}
			}
			const pos_cls = an_answ.img_pos;
			dv_answ = add_simple_choice_item(dv_answers, dv_img, pos_cls, an_answ.htm_answ);
			if(quest.choose_more && (pos_itm != null)){ dv_answ = add_simple_choice_item(dv_answers, dv_add, pos_itm, null); }
		} else {
			dv_answ = dv_answers.appendChild(document.createElement("div"));
			dv_answ.classList.add(...answ_classes);
			dv_answ.innerHTML = get_msg(an_answ.htm_answ);			
		}
		
		if(an_answ.rclk_href != null){
			dv_answ.title = glb_curr_lang.msg_help_answer_right_click;
		}
		
		dv_answ.tc_answ_obj = an_answ;
		
		if((an_answ.is_on) && (an_answ.img_pos == null)){
			dv_answ.classList.add("selected");
		}
		
		add_right_click_listener_for_answer(qid, dv_answ);
		if(is_init_to_answer){
			add_click_listener_for_answer(qid, dv_answ);
		} else {
			add_listener_to_add_edit_button(dv_answers, dv_answ, qid);
		}		
	}
	
	const id_dv_end_ans = qid + SUF_ID_END_ANS;
	let dv_end_ans = document.getElementById(id_dv_end_ans);
	if(dv_end_ans == null){
		dv_end_ans = dv_quest.appendChild(document.createElement("div"));
		dv_end_ans.id = id_dv_end_ans;
		dv_end_ans.classList.add("exam");
		dv_end_ans.classList.add("is_block");
	}
	dv_end_ans.innerHTML = "";
	if(quest.is_multi && is_init_to_answer){
		if(all_answ.length > MIN_ANSW_SHOW_INVERT){
			const dv_invert = dv_end_ans.appendChild(document.createElement("div"));
			dv_invert.classList.add("exam");
			dv_invert.classList.add("is_button");
			dv_invert.innerHTML = glb_curr_lang.msg_invert_ans;
			dv_invert.addEventListener('click', function() {
				invert_answers(qid);
				init_answers(qid);
			});
		}
		const dv_end = dv_end_ans.appendChild(document.createElement("div"));
		dv_end.classList.add("exam");
		dv_end.classList.add("is_button");
		dv_end.innerHTML = glb_curr_lang.msg_end_ans;
		dv_end.addEventListener('click', function() {
			end_question(qid);
		});
	}
	
	set_anchors_target(dv_quest);
	
	scroll_to_top(dv_quest);
}

function invert_answers(qid){
	const quest = glb_poll_db[qid];
	for (const [anid, an_answ] of Object.entries(quest.answers)) {
		if(an_answ.is_on == null){
			an_answ.is_on = true;
			continue;
		}
		an_answ.is_on = ! an_answ.is_on;
	}	
}

function add_right_click_listener_for_answer(qid, dv_answ){
	dv_answ.addEventListener('contextmenu', (ev1) => {
		ev1.preventDefault();
		if(dv_answ.tc_is_should){
			const val_shd_href = dv_answ.tc_answ_obj.rclk_should_href;
			if(val_shd_href != null){
				window.open(get_msg(val_shd_href), '_blank');				
				return false;
			}
		}
		const val_href = dv_answ.tc_answ_obj.rclk_href;
		if(val_href == null){
			return false;
		}
		let ref_str = val_href;
		if(dv_answ.tc_answ_obj.kind == null){
			ref_str = get_msg(val_href);
		}
		//console.log("rclick. val_href=" + val_href + " ref_str=" + ref_str);
		window.open(ref_str, '_blank');				
		return false; // skip default behaviour
	});
}

function add_click_listener_for_answer(qid, dv_answ) {
	const quest = glb_poll_db[qid];
	let dv_answers = dv_answ.parentNode;
	
	if(dv_answ.tc_answ_obj == null){
		dv_answ.tc_answ_obj = {};
	}
	
	if(! quest.is_multi || quest.reset_answ){
		dv_answ.classList.remove("selected");
		dv_answ.tc_answ_obj.is_on = false;
	}
	
	dv_answ.addEventListener('click', function() {
		if(dv_answ.tc_answ_obj == null){
			dv_answ.tc_answ_obj = {};
		}
		let my_answ = dv_answ.tc_answ_obj;
		//console.log("my_answ = " + JSON.stringify(my_answ, null, "  "));
		
		let dv_inter = document.getElementById(id_support_ed);
		const can_ed = ((dv_inter != null) && (dv_inter.current_working_qid == qid));
		
		if((my_answ.kind != null) && can_ed){
			toggle_answer_ed(dv_answ, my_answ.kind);
			return;
		} 
		
		if(my_answ.is_on){
			dv_answ.classList.remove("selected");
			my_answ.is_on = false;
		} else {
			dv_answ.classList.add("selected");
			my_answ.is_on = true;
			if(! quest.is_multi){
				end_question(qid);
			}
		}
	});
}

function toggle_answer_ed(dv_answ, ans_kind){
	if(ans_kind == null){
		return;
	}
	if (ans_kind == VRS_CIT_KIND){
		toggle_verse_ed(dv_answ);
	} else if (ans_kind == STG_CIT_KIND){
		toggle_strong_ed(dv_answ);
	} else if (ans_kind == LNK_CIT_KIND){
		toggle_link_ed(dv_answ);
	}
}

function add_listener_to_add_edit_button(dv_answers, dv_answ, qid){
	const quest = glb_poll_db[qid];
	dv_answ.addEventListener('click', function() {
		// togle edit button
		let dv_answ_ed = document.getElementById(id_dv_answ_ed);
		if(dv_answ_ed != null){
			dv_answ_ed.remove();
		} else {
			//dv_answ_ed = dv_answers.appendChild(document.createElement("div"));
			dv_answ_ed = get_new_dv_under(dv_answers, id_dv_answ_ed);
			dv_answ_ed.id = id_dv_answ_ed;
			dv_answ_ed.classList.add("exam");
			dv_answ_ed.classList.add("is_block");
			//dv_answ_ed.classList.add("grid_item_all_col");
			dv_answ_ed.classList.add("is_button");
			dv_answ_ed.innerHTML = glb_curr_lang.msg_edit_ans;
			dv_answ_ed.addEventListener('click', function() {
				dv_answ_ed.remove();
				quest.has_answ = null;
				init_answers(qid);
				remove_curr_support_ed(true);
			});
			
			//scroll_to_top(dv_answ_ed);
			dv_answ_ed.scrollIntoView({
				behavior: 'auto',
				block: 'center',
				inline: 'center'
			});
		}
	});
}

function end_question(qid){
	const quest = glb_poll_db[qid];
	quest.has_answ = true;
	init_answers(qid);
	remove_curr_support_ed(true);
	
	const all_to_act = send_all_signals(qid);
	activate_signals(all_to_act);
	ask_next();
	
	scroll_to_first_not_answered();
}

// CODE_FOR QUESTION GIVEN SUPPORT ED (add/remove a verse, add/remove a strong code, add/remove a link to the user support)

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

function remove_curr_support_ed(rm_it){
	let dv_inter = document.getElementById(id_support_ed);
	if(dv_inter != null){
		const curr_wrk_qid = dv_inter.current_working_qid;
		if(curr_wrk_qid != null){
			remove_all_ed(curr_wrk_qid);
			dv_inter.current_working_qid = null;
		}
		if(rm_it){
			dv_inter.remove();
		}
	}
}

function add_all_vrs_to_ops(all_vrs, all_ops){
	all_vrs.forEach((bib_obj) => {
		//console.log("bib_obj=" + JSON.stringify(bib_obj, null, "  "));
		const txt = bib_obj_to_txt(bib_obj);
		all_ops.all_txt.push(txt);
		all_ops.all_ref[txt] = bib_obj_to_cit_obj(bib_obj);
	});
}

function get_all_response_ops(quest){
	const has_vrs = (quest.vrs_with_response != null);
	const has_stg = (quest.stg_with_response != null);
	const has_lnk = (quest.lnk_with_response != null);
	const all_ops = { all_txt: [], all_ref: {}};
	if(has_vrs){
		add_all_vrs_to_ops(quest.vrs_with_response, all_ops);
	}
	return all_ops;
}

function get_new_dv_under(dv_pop_up, id_dv){
	var dv_parent = dv_pop_up.parentNode;
	var dv_options = document.getElementById(id_dv);
	if(dv_options != null){
		var was_mine = (dv_pop_up.nextSibling == dv_options);
		dv_options.remove();
		if(was_mine){
			//console.log("get_new_dv_under RETURNS NOTHING !!!!!");
			return null;
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

function toggle_support_interaction(qid){
	const quest = glb_poll_db[qid];
	if(quest == null){ return; }
	
	remove_curr_support_ed(false);
	
	const id_dv_support = qid + SUF_ID_ANSWERS;
	const dv_support = document.getElementById(id_dv_support);
	if(dv_support == null){
		console.log("toggle_support_interaction (dv_support == null) !!");
		return;
	}
	
	let dv_inter = get_new_dv_under(dv_support, id_support_ed);
	if(dv_inter == null){
		return;
	}
	dv_inter.id = id_support_ed;
	dv_inter.current_working_qid = qid;
	
	dv_inter.classList.add("exam");
	dv_inter.classList.add("pos_inter");
	dv_inter.classList.add("has_margin_bot");

	if(quest.has_answ != null){ 
		dv_inter.innerHTML = glb_curr_lang.msg_change_answer;
		scroll_to_top(dv_inter);
		return; 
	}
	
	const has_vrs = (quest.vrs_with_response != null);
	const has_stg = (quest.stg_with_response != null);
	const has_lnk = (quest.lnk_with_response != null);
	//console.log("has_vrs=" + has_vrs);
	
	if(has_vrs || has_stg || has_lnk){
		const dv_sel_cit = dv_inter.appendChild(document.createElement("div"));
		dv_sel_cit.classList.add("exam");
		dv_sel_cit.classList.add("is_block");
		dv_sel_cit.classList.add("is_button");
		dv_sel_cit.innerHTML = glb_curr_lang.msg_sel_cit;
		dv_sel_cit.addEventListener('click', function() {
			const all_ops = get_all_response_ops(quest);
			toggle_select_option(dv_sel_cit, all_ops.all_txt, function(dv_ret, dv_ops, val_sel){
				if (val_sel.startsWith(stg_prefix)){
				} else if (val_sel.startsWith(lnk_prefix)){
				} else {
					const cit_obj = all_ops.all_ref[val_sel];
					const dv_cit = add_verse_cit(qid, cit_obj);
					dv_cit.tc_answ_obj = cit_obj;
					set_answer_cit(dv_cit, cit_obj);
					add_click_listener_for_answer(qid, dv_cit);
					add_right_click_listener_for_answer(qid, dv_cit);
				}
				dv_ops.remove();
			});
			return;
		});
	}
	
	const dv_add_cit = dv_inter.appendChild(document.createElement("div"));
	dv_add_cit.classList.add("exam");
	dv_add_cit.classList.add("is_block");
	dv_add_cit.classList.add("is_button");
	dv_add_cit.innerHTML = glb_curr_lang.msg_add_verse;
	dv_add_cit.addEventListener('click', function() {
		const dv_cit = add_verse_cit(qid, null);
		dv_cit.tc_answ_obj = {};
		dv_cit.tc_answ_obj.kind = VRS_CIT_KIND;
		add_click_listener_for_answer(qid, dv_cit);
		add_right_click_listener_for_answer(qid, dv_cit);
		return;
	});
	
	const dv_add_strong = dv_inter.appendChild(document.createElement("div"));
	dv_add_strong.classList.add("exam");
	dv_add_strong.classList.add("is_block");
	dv_add_strong.classList.add("is_button");
	dv_add_strong.innerHTML = glb_curr_lang.msg_add_strong;
	dv_add_strong.addEventListener('click', function() {
		const dv_cit = add_strong_cit(qid, null);
		dv_cit.tc_answ_obj = {};
		dv_cit.tc_answ_obj.kind = STG_CIT_KIND;
		add_click_listener_for_answer(qid, dv_cit);
		add_right_click_listener_for_answer(qid, dv_cit);
		return;
	});
	
	const dv_add_link = dv_inter.appendChild(document.createElement("div"));
	dv_add_link.classList.add("exam");
	dv_add_link.classList.add("is_block");
	dv_add_link.classList.add("is_button");
	dv_add_link.innerHTML = glb_curr_lang.msg_add_link;
	dv_add_link.addEventListener('click', function() {
		const dv_cit = add_link_cit(qid, null);
		dv_cit.tc_answ_obj = {};
		dv_cit.tc_answ_obj.kind = LNK_CIT_KIND;
		add_click_listener_for_answer(qid, dv_cit);
		add_right_click_listener_for_answer(qid, dv_cit);
		return;
	});
	
	const dv_ok = dv_inter.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_block");
	dv_ok.classList.add("is_button");
	dv_ok.innerHTML = glb_curr_lang.msg_end_edit;
	dv_ok.addEventListener('click', function() {
		remove_curr_support_ed(true);
		if(quest.has_answ && has_citations(dv_support)){
			quest.has_answ = null;
			init_answers(qid);
		}

		const dv_quest = document.getElementById(qid);
		scroll_to_top(dv_quest);
		
		return;
	});    
	
	scroll_to_top(dv_inter);
}

function has_citations(dv_support){
	const chd = dv_support.lastChild;
	if(chd == null){ return false; }
	const ans = chd.tc_answ_obj;
	if(ans == null){ return false; }
	return (ans.kind != null);
}

// CODE_FOR VERSE ED

function is_last_added_verse_cit_ok(qid){
	const id_dv_last_cit = qid + SUF_ID_LAST_ADDED_CITATION;
	const dv_last_cit = document.getElementById(id_dv_last_cit);
	if(dv_last_cit == null){
		return true;
	}
	if(dv_last_cit != null){
		const verse_obj = dv_last_cit.tc_cit_obj;
		const ck1 = (verse_obj.book != bib_defaults.BOOK);
		const ck2 = (verse_obj.chapter != bib_defaults.CHAPTER);
		const ck3 = (verse_obj.verse != bib_defaults.VERSE);
		if(ck1 && ck2 && ck3){ 
			dv_last_cit.removeAttribute('id');  // ONLY ONE LAST ADDED
			return true;		
		}
	}
	return false;
}

function update_dv_verse(dv_citation){
	const verse_obj = dv_citation.tc_cit_obj;
	verse_obj.rclk_href = make_bible_ref(verse_obj);
	verse_obj.txtref = bib_obj_to_txt(verse_obj);
	verse_obj.cit_txt = get_verse_cit_txt(verse_obj);
	if(verse_obj.cit_txt == null){
		dv_citation.innerHTML = verse_obj.txtref;
	} else {
		dv_citation.innerHTML = verse_obj.txtref + " " + verse_obj.cit_txt;
	}
}

function add_verse_cit(qid, verse_obj){
	const id_dv_support = qid + SUF_ID_ANSWERS;
	const dv_support = document.getElementById(id_dv_support);

	const id_dv_last_cit = qid + SUF_ID_LAST_ADDED_CITATION;
	if(! is_last_added_verse_cit_ok(qid)){
		return null;
	}
	
	let obj_was_null = (verse_obj == null);
	if(obj_was_null){
		verse_obj = {};
		verse_obj.kind = VRS_CIT_KIND;
		verse_obj.book = bib_defaults.BOOK;
		verse_obj.chapter = bib_defaults.CHAPTER;
		verse_obj.verse = bib_defaults.VERSE;
		verse_obj.last_verse = bib_defaults.LAST_VERSE;
		verse_obj.site = bib_defaults.BIBLES_SITE;
		verse_obj.bib_ver = bib_defaults.BIB_VER;
		
		const bibs = glb_all_bibles[verse_obj.site];
		if(bibs.length > 0){ verse_obj.bib_ver = bibs[0]; }
	}
	
	const dv_citation = dv_support.appendChild(document.createElement("div"));
	dv_citation.id = id_dv_last_cit;
	dv_citation.answ_idx = dv_support.childNodes.length - 1;
	dv_citation.owner_qid = qid;
	dv_citation.classList.add("exam");
	dv_citation.classList.add("is_answer");
	dv_citation.title = glb_curr_lang.msg_help_answer_right_click;
	dv_citation.tc_cit_obj = JSON.parse(JSON.stringify(verse_obj));

	update_dv_verse(dv_citation);
	
	scroll_to_top(dv_citation);
	
	return dv_citation;
}

function calc_verse_cit_object(dv_citation){
	let cit_obj = {};
	if(dv_citation != null){
		cit_obj = JSON.parse(JSON.stringify(dv_citation.tc_cit_obj));
	}
	return cit_obj;
}

function toggle_verse_ed(dv_citation){
	let dv_ed_cit = get_new_dv_under(dv_citation, id_dv_citation_ed);
	if(dv_ed_cit == null){
		return;
	}
	dv_ed_cit.classList.add("exam");
	dv_ed_cit.classList.add("is_block");
	dv_ed_cit.classList.add("grid_item_all_col");
	
	const cit_obj = calc_verse_cit_object(dv_citation);	

	const inp_book = dv_ed_cit.appendChild(document.createElement("div"));
	inp_book.id = id_ed_book;
	inp_book.classList.add("exam");
	inp_book.classList.add("is_ed_verse");
	inp_book.classList.add("is_button");
	inp_book.innerHTML = glb_all_books[cit_obj.book];
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
	inp_verse.title = glb_curr_lang.msg_help_cit_ed_range_right_click;
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
		sep2.classList.add("is_hidden");
		inp_last_verse.classList.add("is_hidden");
	}

	inp_verse.addEventListener('contextmenu', (ev1) => {
		ev1.preventDefault();
		sep2.classList.toggle("is_hidden");
		inp_last_verse.classList.toggle("is_hidden");
		return false;
	});
	
	const inp_site = dv_ed_cit.appendChild(document.createElement("div"));
	inp_site.id = id_ed_site;
	inp_site.classList.add("exam");
	inp_site.classList.add("is_ed_verse");
	inp_site.classList.add("is_button");
	inp_site.innerHTML = cit_obj.site;
	
	const inp_bib_ver_sel = dv_ed_cit.appendChild(document.createElement("div"));
	inp_bib_ver_sel.id = id_ed_bib_ver_sel;
	inp_bib_ver_sel.title = glb_curr_lang.msg_help_cit_ed_any_bib_right_click;
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
	
	const id_ed_bib_ver_txt = "id_ed_bib_ver_txt";
	const inp_bib_ver_txt = dv_ed_cit.appendChild(document.createElement("input"));
	inp_bib_ver_txt.id = id_ed_bib_ver_txt;
	inp_bib_ver_txt.title = glb_curr_lang.msg_help_cit_ed_any_bib_right_click;
	inp_bib_ver_txt.value = cit_obj.bib_ver;
	inp_bib_ver_txt.type = "text";
	inp_bib_ver_txt.size = 6;
	inp_bib_ver_txt.classList.add("exam");
	inp_bib_ver_txt.classList.add("is_ed_verse");
	inp_bib_ver_txt.classList.add("is_hidden");
	
	
	inp_bib_ver_sel.addEventListener('contextmenu', (ev1) => {
		ev1.preventDefault();
		inp_bib_ver_txt.value = inp_bib_ver_sel.innerHTML;
		inp_bib_ver_txt.classList.remove("is_hidden");
		inp_bib_ver_sel.classList.add("is_hidden");
		return false;
	});
	
	inp_bib_ver_txt.addEventListener('contextmenu', (ev1) => {
		ev1.preventDefault();
		inp_bib_ver_sel.innerHTML = inp_bib_ver_txt.value;
		inp_bib_ver_sel.classList.remove("is_hidden");
		inp_bib_ver_txt.classList.add("is_hidden");
		return false;
	});
	
	const dv_del = dv_ed_cit.appendChild(document.createElement("div"));
	dv_del.classList.add("exam");
	dv_del.classList.add("is_button");
	dv_del.classList.add("is_ed_verse");
	dv_del.innerHTML = glb_curr_lang.msg_del;
	dv_del.addEventListener('click', function() {
		remove_answer_cit(dv_citation);
		
		dv_citation.remove();
		dv_ed_cit.remove();
		return;
	});    
	
	const dv_ok = dv_ed_cit.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_button");
	dv_ok.classList.add("is_ed_verse");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {

		const cit_adding = dv_citation.tc_cit_obj;
		cit_adding.book = glb_books_nums[inp_book.innerHTML];
		cit_adding.chapter = inp_chapter.value;
		cit_adding.verse = inp_verse.value;

		cit_adding.last_verse = inp_last_verse.value;
		cit_adding.site = inp_site.innerHTML;
		
		let bib_ver = inp_bib_ver_sel.innerHTML;
		if(inp_bib_ver_sel.classList.contains("is_hidden")){
			bib_ver = inp_bib_ver_txt.value;
		}
		cit_adding.bib_ver = bib_ver;
		
		const quest = glb_poll_db[dv_citation.owner_qid];
		const has_vrs = (quest.vrs_with_response != null);
		if(has_vrs){
			const cit_match = get_verse_match(cit_adding, quest.vrs_with_response);
			if(cit_match != null){
				cit_adding.verse = cit_match.verse;
				cit_adding.last_verse = cit_match.last_verse;
				cit_adding.site = cit_match.site;
				cit_adding.bib_ver = cit_match.bib_ver;
			}
		}

		update_dv_verse(dv_citation);
				
		dv_ed_cit.remove();

		set_answer_for_verse_cit(dv_citation);
		
		scroll_to_top(dv_citation);
		
		return;
	});
	
	scroll_to_top(dv_ed_cit);
}

function set_answer_cit(dv_citation, cit_obj){
	const qid = dv_citation.owner_qid;
	const quest = glb_poll_db[qid];
	const kk = get_answer_key(qid, cit_obj);
	quest.answers[kk] = cit_obj;
	dv_citation.tc_answ_obj = cit_obj;
	console.log("QUESTION " + qid + "=" + JSON.stringify(quest, null, "  "));
}

function remove_answer_cit(dv_citation){
	const qid = dv_citation.owner_qid;
	const quest = glb_poll_db[qid];
	const cit_obj = dv_citation.tc_answ_obj;
	const kk = get_answer_key(qid, cit_obj);
	quest.answers[kk] = null;
	dv_citation.tc_answ_obj = null;
}

function set_answer_for_verse_cit(dv_citation){
	const obj_ok = calc_verse_cit_object(dv_citation);
	set_answer_cit(dv_citation, obj_ok);
}

// CODE_FOR SELECT FROM ARRAY OF OPTIONS (for example several verses)

function toggle_select_option(dv_return, all_options_arr, on_click_fn){
	var dv_options = get_new_dv_under(dv_return, id_dv_sel_option);
	if(dv_options == null){
		return;
	}
	dv_options.classList.add("exam");
	dv_options.classList.add("is_block");
	dv_options.classList.add("grid_item_all_col");
	
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

	scroll_to_top(dv_options);
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

// CODE_FOR GLOBAL BUTTONS HANDLERS

export function init_page_exam(ini_func){
	console.log("Called init_page_exam");

	//let sd_menu = document.getElementById("id_side_menu");
	//sd_menu.classList.toggle("has_side_nav");
	INIT_EXAM_DB_FUNC = ini_func;
	
	init_exam_fb();
	if(INIT_EXAM_DB_FUNC != null){ 
		INIT_EXAM_DB_FUNC(); 
	}
	init_exam_images();
	init_DAG_func();
	init_exam_module_vars();
	init_exam_buttons();
	
	ask_next();	
};

function init_exam_images(){
	const hrefs = glb_poll_db.img_hrefs;
	if(hrefs == null){ return; }
	const dv_content = document.getElementById("id_exam_content");
	let id_img = null;
	dv_content.all_img = {};
	const all_img = dv_content.all_img;
	id_img = "yes_like";
	load_image(null, all_img, id_img, hrefs.yes_like);
	id_img = "no_like";
	load_image(null, all_img, id_img, hrefs.no_like);
	id_img = "less_than";
	load_image(null, all_img, id_img, hrefs.less_than);
	id_img = "more";
	load_image(null, all_img, id_img, hrefs.more);
	id_img = "less";
	load_image(null, all_img, id_img, hrefs.less);
}

function init_exam_buttons(){
	let dv_button = null;
	
	dv_button = document.getElementById("id_exam_save_button"); // this id must be the same to the id in the HTML page.
	if(dv_button != null){ dv_button.addEventListener('click', save_button_handler); }
	
	dv_button = document.getElementById("id_exam_open_button"); // this id must be the same to the id in the HTML page.
	if(dv_button != null){ dv_button.addEventListener('click', open_button_handler); }
	
	dv_button = document.getElementById("id_exam_delete_button"); // this id must be the same to the id in the HTML page.
	if(dv_button != null){ dv_button.addEventListener('click', delete_button_handler); }
	
	dv_button = document.getElementById("id_exam_undo_button"); // this id must be the same to the id in the HTML page.
	if(dv_button != null){ dv_button.addEventListener('click', undo_button_handler); }
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

function undo_button_handler(){
	undo_last_quest();
}

// CODE_FOR STRONG REF ED

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

function set_cit_params(dv_cit){
	dv_cit.classList.add("exam");
	dv_cit.classList.add("is_answer");
	dv_cit.title = glb_curr_lang.msg_help_answer_right_click;
}

function add_strong_cit(qid, stg_obj){
	//console.log("ENTRA a add_strong");
	const id_dv_support = qid + SUF_ID_ANSWERS;
	const dv_support = document.getElementById(id_dv_support);

	const id_dv_last_strong = qid + SUF_ID_LAST_ADDED_STRONG;
	if(! is_last_added_strong_ok(qid)){
		return null;
	}
	
	const dv_citation = dv_support.appendChild(document.createElement("div"));
	dv_citation.id = id_dv_last_strong;
	dv_citation.answ_idx = dv_support.childNodes.length - 1;
	dv_citation.owner_qid = qid;
	set_cit_params(dv_citation);
	
	if(stg_obj == null){
		dv_citation.innerHTML = DEFAULT_STRONG;
	} else {
		dv_citation.innerHTML = stg_obj.lang + stg_obj.num;
	}
	
	scroll_to_top(dv_citation);
	
	return dv_citation;
}

function calc_strong_cit_object(dv_citation){
	const cit_obj = {};
	if(dv_citation != null){
		const scode = dv_citation.innerHTML;
		cit_obj.kind = STG_CIT_KIND;
		//cit_obj.side = dv_citation.tc_cit_side;
		cit_obj.lang = scode[0];
		cit_obj.num = scode.substring(1);
		cit_obj.rclk_href = make_strong_ref(scode);
	}
	return cit_obj;	
}

function get_strong_cit_key(obj){
	const kk = "stg_" + obj.lang + "_" + obj.num;
	return kk;
}

function toggle_strong_ed(dv_code){
	var dv_ed_strong = get_new_dv_under(dv_code, id_dv_code_ed);
	if(dv_ed_strong == null){
		return;
	}
	dv_ed_strong.classList.add("exam");
	dv_ed_strong.classList.add("is_block");
	dv_ed_strong.classList.add("grid_item_all_col");

	const cit_obj = calc_strong_cit_object(dv_code);
	
	var strong_lang = "H";
	var strong_num = "0";
	const scode = dv_code.innerHTML;
	if((scode != DEFAULT_STRONG) && (scode.length > 1)){
		strong_lang = cit_obj.lang;
		strong_num = cit_obj.num;
	}

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

	const dv_del = dv_ed_strong.appendChild(document.createElement("div"));
	dv_del.classList.add("exam");
	dv_del.classList.add("is_button");
	dv_del.classList.add("is_ed_verse");
	dv_del.innerHTML = glb_curr_lang.msg_del;
	dv_del.addEventListener('click', function() {
		remove_answer_cit(dv_code);
		
		dv_code.remove();
		dv_ed_strong.remove();
		return;
	});    
	
	const dv_ok = dv_ed_strong.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("is_button");
	dv_ok.classList.add("is_ed_verse");
	dv_ok.innerHTML = glb_curr_lang.msg_ok;
	dv_ok.addEventListener('click', function() {
		dv_code.innerHTML = inp_slang.innerHTML + inp_snum.value;
		dv_ed_strong.remove();
		
		set_answer_for_strong_cit(dv_code);
		
		scroll_to_top(dv_code);
		
		return;
	});    
	
	scroll_to_top(dv_ed_strong);
}

function set_answer_for_strong_cit(dv_citation){
	const obj_ok = calc_strong_cit_object(dv_citation);
	set_answer_cit(dv_citation, obj_ok);
}

// CODE_FOR LINK ED

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
	const id_dv_support = qid + SUF_ID_ANSWERS;
	const dv_support = document.getElementById(id_dv_support);

	const id_dv_last_link = qid + SUF_ID_LAST_ADDED_LINK;
	if(! is_last_added_link_ok(qid)){
		return null;
	}
	
	const dv_citation = dv_support.appendChild(document.createElement("div"));
	dv_citation.id = id_dv_last_link;
	dv_citation.answ_idx = dv_support.childNodes.length - 1;
	dv_citation.owner_qid = qid;
	set_cit_params(dv_citation);
	
	const dv_name = dv_citation.appendChild(document.createElement("div"));
	dv_name.classList.add("exam");
	dv_name.classList.add("is_citation_item");
	if(link_obj == null){
		dv_name.innerHTML = DEFAULT_LINK_NAME;
	} else {
		dv_name.innerHTML = link_obj.name;
	}
	
	const dv_href = dv_citation.appendChild(document.createElement("a"));
	dv_href.classList.add("is_hidden");
	if(link_obj == null){
		dv_href.href = DEFAULT_LINK_HREF;
	} else {
		dv_href.href = link_obj.href;
	}

	scroll_to_top(dv_citation);

	return dv_citation;	
}

function calc_link_cit_object(dv_citation){
	const cit_obj = {};
	if(dv_citation != null){
		const chls = dv_citation.childNodes;
		cit_obj.kind = LNK_CIT_KIND;
		//cit_obj.side = dv_citation.tc_cit_side;
		cit_obj.name = chls[LNK_NAME_IDX].innerHTML;
		cit_obj.href = chls[LNK_HREF_IDX].href;
		cit_obj.rclk_href = cit_obj.href;
	}
	return cit_obj;
}

function get_link_cit_key(obj){
	const kk = "lnk_" + obj.name;
	return kk;
}

function toggle_link_ed(dv_link){
	var dv_ed_link = get_new_dv_under(dv_link, id_dv_link_ed);
	if(dv_ed_link == null){
		return;
	}
	dv_ed_link.classList.add("exam");
	dv_ed_link.classList.add("is_block");
	dv_ed_link.classList.add("grid_item_all_col");

	const lnk_cit_obj = calc_link_cit_object(dv_link);
	var link_name = lnk_cit_obj.name;
	var link_href = lnk_cit_obj.href;

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

	const dv_del = dv_ed_link.appendChild(document.createElement("div"));
	dv_del.classList.add("exam");
	dv_del.classList.add("is_button");
	dv_del.classList.add("is_ed_verse");
	dv_del.innerHTML = glb_curr_lang.msg_del;
	dv_del.addEventListener('click', function() {
		remove_answer_cit(dv_link);
		
		dv_link.remove();
		dv_ed_link.remove();
		return;
	});    
	
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
		
		set_answer_for_link_cit(dv_link);
		
		scroll_to_top(dv_link);
		
		return;
	});    
	
	scroll_to_top(dv_ed_link);
}

function set_answer_for_link_cit(dv_citation){
	const obj_ok = calc_link_cit_object(dv_citation);
	set_answer_cit(dv_citation, obj_ok);
}

// CODE_FOR SAVE EXAM

function toggle_exam_name_ed(dv_name, save_fn){
	var dv_ed_name = get_new_dv_under(dv_name, id_dv_name_ed);
	if(dv_ed_name == null){
		return;
	}
	dv_ed_name.classList.add("exam");
	dv_ed_name.classList.add("is_block");
	//dv_ed_name.classList.add("grid_item_all_col");

	const exam_name = dv_name.innerHTML;

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
		
		scroll_to_top(dv_name);
		
		return;
	});    

	scroll_to_top(dv_ed_name);
}

function calc_quest_save_object(dv_quest){
	const qid = dv_quest.id;
	const quest = glb_poll_db[qid];
	if(quest == null){
		return null;
	}
	let sv_obj = {};
	
	sv_obj = JSON.parse(JSON.stringify(quest));
	
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
	const db = glb_poll_db;
	if(db.all_pending != null){
		sv_obj.all_pending = JSON.parse(JSON.stringify(db.all_pending));
	}
	if(db.last_added_qid != null){
		sv_obj.last_added_qid = db.last_added_qid;
	}
	//console.log("FULL_OBJECT_SAVE = " + JSON.stringify(sv_obj, null, "  "));
	return sv_obj;
}

function update_nodes_exam_with(ld_obj){
	const db = glb_poll_db;
	for (const [qid, quest] of Object.entries(ld_obj)) {
		db[qid] = JSON.parse(JSON.stringify(quest));
	}
	if(ld_obj.all_pending != null){
		db.all_pending = JSON.parse(JSON.stringify(ld_obj.all_pending));
	}
	if(ld_obj.last_added_qid != null){
		db.last_added_qid = ld_obj.last_added_qid;
	}
}

function display_exam_load_object(ld_obj){
	//console.log("FULL_OBJECT_READ = " + JSON.stringify(ld_obj, null, "  "));
	if(INIT_EXAM_DB_FUNC != null){ 
		INIT_EXAM_DB_FUNC(); 
	}
	init_DAG_func();
	update_nodes_exam_with(ld_obj);
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	dv_all_quest.innerHTML = "";
	
	for (const [qid, quest] of Object.entries(ld_obj)) {
		if(get_qid_base(qid) == null){
			continue; // it is not a question
		}
		if(is_observation(quest)){
			show_observation(qid, null);
			continue;
		}
		
		const added = add_question(qid);
		if(added == null){
			console.log("Question " + qid + " could NOT be DISPLAYED in page !!!");
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
	console.log("SAVING in https://todacarne-firebase-default-rtdb.firebaseio.com");
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
	console.log("LOADING from https://todacarne-firebase-default-rtdb.firebaseio.com");
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

// CODE_FOR QID, QREF AND HREF CONVERSION AND DISPLAY

function qref_to_qid(qrf){
	return qrf.slice(qref_prefix.length);
}

function qid_to_qhref(qid){
	const quest = glb_poll_db[qid];
	if(quest == null){
		const bad_qhrf = "<a class='exam_ref' href='#" + qid + "'>invalid question " + qid + "</a>";
		return bad_qhrf;
	}
	const qhrf = "<a class='exam_ref' href='#" + qid + "'>" + glb_curr_lang.msg_qref_question_num + " " + quest.pos_page + "</a>";
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

function get_qhrefs_of(all_qids, skip_qid){
	let all_qhrefs = "";
	if(all_qids != null){
		for(const ctra of all_qids){
			if(ctra != skip_qid){
				all_qhrefs = all_qhrefs + " " + qid_to_qhref(ctra);
			}
		}
	}
	return all_qhrefs;
}

function set_anchors_target(the_div){
	const all_anchor = the_div.querySelectorAll("a");

	all_anchor.forEach((aa) => {
		const is_local_ref = aa.getAttribute("href").startsWith("#");
		if(! is_local_ref){
			aa.setAttribute('target', '_blank');
		}
	});
}

// CODE_FOR DAG HANDLING

function init_DAG_func(){
	if(glb_poll_db.all_pending == null){
		glb_poll_db.all_pending = {};
		get_context();
	}
	
	const all_qids = Object.keys(glb_poll_db);
	for(const qid of all_qids){
		init_signals_for(qid);
	}
}

function init_signals_for(qid){
	if(get_qid_base(qid) == null){
		return; // it is not a question
	}
	
	const quest = glb_poll_db[qid];
	if(quest == null){ return; }
	
	if(quest.signals_inited){ return; }
	quest.signals_inited = true;
	
	quest.qid = qid;  // very convinient self ref

	if(quest.activated_if == null){ 
		add_pending(qid);
		return;
	}
	
	const act_if = Object.entries(quest.activated_if);
	for (const [conj_id, conj_obj] of act_if) {
		if(conj_obj == null){ continue; }
		const conj = Object.entries(conj_obj);
		
		for (const [qid_signl, resps_obj] of conj) {
			if(resps_obj == null){ continue; }
			
			const qst_to_signl = glb_poll_db[qid_signl]; 
			if(qst_to_signl == null){ continue; }

			if(qst_to_signl.signal_if_shown == null){ qst_to_signl.signal_if_shown = []; }
			if(qst_to_signl.signal_if_not_shown == null){ qst_to_signl.signal_if_not_shown = []; }
			
			if(qst_to_signl.signals_to_fire == null){ qst_to_signl.signals_to_fire = {}; }  // added_for_signals
			const all_to_fire = qst_to_signl.signals_to_fire; 
			//const qst_answs = qst_to_signl.answers;  // removed_for_signals
			
			const resps = Object.entries(resps_obj);
			for (const [anid, val] of resps) {
				if(anid == "shown"){
					if(val == "on"){ 
						qst_to_signl.signal_if_shown.push(qid); 
					}
					if(val == "off"){ 
						qst_to_signl.signal_if_not_shown.push(qid); 
					}
					continue;
				}
				
				if(all_to_fire == null){ continue; }
				if(all_to_fire[anid] == null){ all_to_fire[anid] = {}; } // added_for_signals
				const anid_fire = all_to_fire[anid];
				if(anid_fire == null){ continue; }
				
				const is_obs = is_observation(quest);
				if((val == "on") || is_obs){ 
					if(anid_fire.signal_if_on == null){ anid_fire.signal_if_on = []; }
					anid_fire.signal_if_on.push(qid); 
				}
				if((val == "off") || is_obs){ 
					if(anid_fire.signal_if_off == null){ anid_fire.signal_if_off = []; }
					anid_fire.signal_if_off.push(qid); 
				}
			}
		}
	}
}

function check_if_dnf_is_sat(qid){
	if(qid == null){ return false; }
	const quest = glb_poll_db[qid];
	if(quest == null){ return false; }
	if(quest.debug){ console.log("DEBUGING qid=" + qid + " called check_if_dnf_is_sat"); }
	//if
	if(quest.activated_if == null){ 
		if(is_base_question(quest)){
			return true;
		}
		return false; 
	}
	const act_if = Object.entries(quest.activated_if);
	for (const [conj_id, conj_obj] of act_if) {
		if(conj_obj == null){ continue; }
		const conj = Object.entries(conj_obj);
		let conj_act = true;
		
		//console.log(" | qid=" + qid + " | conj_id=" + conj_id + " conj_obj=" + JSON.stringify(conj_obj, null, "  "));
		for (const [qid_signl, resps_obj] of conj) {
			if(resps_obj == null){ continue; }
			
			const qst_to_signl = glb_poll_db[qid_signl];
			if(qst_to_signl == null){ continue; }
			const qst_answs = qst_to_signl.answers; 
			
			const resps = Object.entries(resps_obj);
			let all_act_2 = true;
			for (const [anid, val] of resps) {
				let is_act = false;
				if(anid == "shown"){
					const is_shown = (document.getElementById(qid_signl) != null);
					is_act = (((val == "on") && is_shown) || ((val == "off") && ! is_shown));
					//console.log(" | qid=" + qid + " | qid_signl=" + qid_signl + " | is_act=" + is_act + " | val=" + val + " | is_shown=" + is_shown);
				} else {				
					if(qst_answs == null){ continue; } // if (anid == "shown") of an observation it CAN be null
					const an_answ = qst_answs[anid];
					if(an_answ == null){ continue; }
					
					is_act = (((val == "on") && an_answ.is_on) || ((val == "off") && ! an_answ.is_on));
				}
				all_act_2 = all_act_2 && is_act;
				if(! all_act_2){
					break;
				}
			}
			conj_act = conj_act && all_act_2;
			if(! conj_act){
				break;
			}
		}
		if(conj_act){
			if(quest.debug){ console.log("DEBUGING qid=" + qid + " check_if_dnf_is_sat IS_SAT"); }
			quest.last_sat_conj = conj_id;
			return true;
		}
	}
	if(quest.debug){ console.log("DEBUGING qid=" + qid + " check_if_dnf_is_sat NOT_sat"); }
	quest.last_sat_conj = null;
	return false;
}

function get_context(arr_context){
	const db = glb_poll_db;
	let curr_ctx = db.all_pending;
	if(arr_context != null){
		for(const ctx of arr_context){
			if(ctx == null){ continue; }
			if(ctx == id_ctx_pend){ continue; }
			if(curr_ctx[ctx] == null){ 
				curr_ctx[ctx] = {}; 
				curr_ctx[ctx][id_ctx_pend] = []; 
			}
			curr_ctx = curr_ctx[ctx];
		}
	}
	if(curr_ctx[id_ctx_pend] == null){ curr_ctx[id_ctx_pend] = []; }
	return curr_ctx[id_ctx_pend];
}

function get_first_context(){
	let ctx_pair = get_first_open_context();
	let parent = ctx_pair[0];
	let ctx_nam = ctx_pair[1];
	let curr_ctx = parent[ctx_nam];
	while((ctx_nam != null) && (curr_ctx[id_ctx_pend].length == 0)){
		delete parent[ctx_nam];
		
		ctx_pair = get_first_open_context();
		parent = ctx_pair[0];
		ctx_nam = ctx_pair[1];
		curr_ctx = parent[ctx_nam];
	}
	if(ctx_nam != null){
		return curr_ctx[id_ctx_pend];
	}
	return parent[id_ctx_pend];
}

function get_first_open_context(){
	const db = glb_poll_db;
	let parent = db.all_pending;
	let curr_ctx = db.all_pending;
	let ctx_nam = null;
	let curr_keys = Object.keys(curr_ctx);
	while(curr_keys.length > 1){
		parent = curr_ctx;
		ctx_nam = curr_keys[1];
		curr_ctx = curr_ctx[ctx_nam];
		curr_keys = Object.keys(curr_ctx);
	}
	return [parent, ctx_nam];
}

function add_pending(qid){
	const quest = glb_poll_db[qid];
	if(quest == null){ return false; }
	if(is_observation(quest)){ 
		console.log("Internal error. Trying to add observation as pending qid=" + qid);
		return false;		
	}
	const dv_qid = document.getElementById(qid);
	const is_shown = (dv_qid != null);
	if(is_shown || quest.in_pending){
		return false;
	}
	//const pending = glb_poll_db.all_pending;
	const pending = get_context(quest.context);
	/*if(is_base_question(quest)){
		pending.push(qid); //fifo
	} else {
		pending.unshift(qid); //lifo
	}*/
	pending.push(qid);
	quest.in_pending = true;
	return true;
}

function get_pending(){
	//const pending = glb_poll_db.all_pending;
	const pending = get_first_context();
	if(pending.length == 0){
		return null;
	}
	const qid = pending.shift();
	const quest = glb_poll_db[qid];
	quest.in_pending = false;
	return qid;
}

function send_signals_to(all_to_signl, all_to_act){
	for(const qid_signl of all_to_signl){
		const qsignl = glb_poll_db[qid_signl];
		if(qsignl == null){ continue; }
		
		const csat = check_if_dnf_is_sat(qid_signl);
		
		if(is_observation(qsignl)){
			const dv_qsignl = document.getElementById(qid_signl);
			if(dv_qsignl != null){
				all_to_act.old_observ.push(qid_signl);
			} else {
				if(csat){ all_to_act.new_observ.push(qid_signl); }
			}
		} else {
			if(csat){ all_to_act.pends.push(qid_signl); }
		}
	}
}

function send_all_signals(qid){
	const all_to_act = { pends:[], old_observ:[], new_observ:[], };
	const quest = glb_poll_db[qid];
	if(quest == null){ return all_to_act; }
	
	let all_to_signl = quest.signal_if_shown;
	if(all_to_signl != null){
		send_signals_to(all_to_signl, all_to_act);
	}
	if(quest.debug){ 
		console.log("DEBUGING qid=" + qid + " send_all_signals | all_to_signl=" + JSON.stringify(all_to_signl, null, "  ")); 
		console.log("DEBUGING qid=" + qid + " send_all_signals | signals_to_fire=" + JSON.stringify(quest.signals_to_fire, null, "  ")); 		
	}
	
	if(quest.signals_to_fire == null){ return all_to_act; } // added_for_signals
	const all_signals = Object.entries(quest.signals_to_fire); // added_for_signals
	if(quest.answers == null){ return all_to_act; } // added_for_signals
	for (const [anid, a_sgl] of all_signals) {
		if(a_sgl == null){ continue; }
		const an_answ = quest.answers[anid];
		if(an_answ == null){ continue; }
		
		all_to_signl = null;
		if(an_answ.is_on){
			all_to_signl = a_sgl.signal_if_on;
		} else {
			all_to_signl = a_sgl.signal_if_off;
		}
		if(all_to_signl == null){
			continue;
		}
		send_signals_to(all_to_signl, all_to_act);
	}
	return all_to_act;
}

function activate_signals(all_to_act){
	for(const qid of all_to_act.old_observ){
		console.log("Updating OLD observation qid=" + qid);
		update_observation(qid, all_to_act);
	}
	for(const qid of all_to_act.new_observ){
		show_observation(qid, all_to_act);
	}
	for(const qid of all_to_act.pends){
		add_pending(qid);
	}
}

function ask_next(){
	let qid = glb_poll_db.last_added_qid;
	if(qid != null && (glb_poll_db[qid].has_answ == null)){
		return false;
	}
	qid = get_pending();
	while((qid != null) && ! check_if_dnf_is_sat(qid)){
		qid = get_pending();
	}
	let added = null;
	if(qid != null){
		added = add_question(qid);
		if(added != null){
			glb_poll_db.last_added_qid = qid;
			return true;
		}
		console.log("Question " + qid + " could NOT be added to page during ask_next [1] !!!");
	}
	return false;
}

function undo_last_quest(){
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	const all_q = dv_all_quest.childNodes;
	let curr_idx = all_q.length - 1;
	let quest = null;
	let found_last = false;
	while(curr_idx > 0){
		//console.log("get_curr_pos_page [1] curr_idx=" + curr_idx);
		const qid = all_q[curr_idx].id;
		if(qid == null){ continue; }
		
		quest = glb_poll_db[qid];
		if(quest == null){ continue; }
		
		if((quest.pos_page == 1) && (quest.has_answ == null)){ break; }
		
		quest.has_answ = null;
	
		if(is_question(quest)){
			if(! found_last){ 
				const pending = get_context(quest.context);
				pending.unshift(qid);
				quest.in_pending = true;
				found_last = true; 
			} else {
				glb_poll_db.last_added_qid = qid;
				init_answers(qid);
				break;
			}
		}
		
		const dv_quest = document.getElementById(qid);
		if(dv_quest == null){ continue; }
		dv_quest.remove();
			
		curr_idx--;
	}
	//console.log("get_curr_pos_page [2] curr_idx=" + curr_idx);
	return quest;
}

// CODE_FOR OBSERVATION DISPLAY

function show_observation(qid, all_to_act){
	const quest = glb_poll_db[qid];
	if(quest == null){
		console.log("Could not find observation " + qid + " in questions db.");
		return null;
	}
	if(is_question(quest)){
		console.log("Internal error. Trying to add a NON observation as observation qid=" + qid);
		return null;
	}
	let dv_quest = document.getElementById(qid);
	if(dv_quest != null){ 
		console.log("Updating OLD observation from show_observation qid=" + qid);
		update_observation(qid, all_to_act);
		return null;
	}
	//console.log("ADDING observation " + qid + " to page.");
	
	const dv_all_quest = document.getElementById("id_exam_all_questions");
	dv_quest = dv_all_quest.appendChild(document.createElement("div"));
	dv_quest.id = qid;
	dv_quest.classList.add("exam");
	dv_quest.classList.add("is_observ");
	
	quest.pos_page = INVALID_PAGE_POS;
	
	const dv_stm = dv_quest.appendChild(document.createElement("div"));
	dv_stm.classList.add("exam");
	dv_stm.classList.add("stm");
	dv_stm.classList.add("observ_color");
	
	let the_stm = get_msg(quest.htm_stm);
	if(quest.has_qrefs){
		the_stm = replace_all_qrefs(the_stm);
	}
	
	const dv_qstm = dv_stm.appendChild(document.createElement("div"));
	dv_qstm.id = qid + SUF_ID_QSTM;
	dv_qstm.classList.add("exam");
	dv_qstm.classList.add("msg");
	dv_qstm.classList.add("observ_color");
	dv_qstm.innerHTML = "" + the_stm;

	if(DEBUG_QNUMS){
		dv_qstm.title = qid;
	}	
	
	const sp_qrefs_observ = document.createElement("span");
	sp_qrefs_observ.id = qid + SUF_ID_QREFS_OBSERVATION;
	dv_qstm.append(sp_qrefs_observ);
	
	console.log("Updating NEW observation from show_observation qid=" + qid);
	update_observation(qid, all_to_act);

	scroll_to_top(dv_quest);
	
	return dv_quest;
}

function get_sat_conj_qids(qid){
	if(qid == null){ return null; }
	const quest = glb_poll_db[qid];
	if(quest == null){ return null; }
	if(quest.activated_if == null){ return null; }
	if(quest.last_sat_conj == null){ return null; }
	const conj = quest.activated_if[quest.last_sat_conj];
	const incos_qids = Object.keys(conj);
	return incos_qids;
}

function update_observation(qid, all_to_act){
	let sp_qrefs_observ = document.getElementById(qid + SUF_ID_QREFS_OBSERVATION);
	if(sp_qrefs_observ == null){ 
		//console.log("Internal error. Trying to update observation qid=" + qid + " without qrefs span");
		//console.log("Already removed qid=" + qid);
		return null;
	}
	const incos_qids = get_sat_conj_qids(qid);
	if(incos_qids == null){
		let dv_quest = document.getElementById(qid);
		if(dv_quest != null){ 
			//console.log("REMOVING div for qid=" + qid);
			dv_quest.remove(); 
		
			const quest = glb_poll_db[qid];
			if(quest == null){ return; }
			let all_to_signl = quest.signal_if_not_shown;
			if(all_to_signl != null){
				/*console.log("AFTER_REMOVE | qid=" + qid + " | all_to_signl=" + JSON.stringify(all_to_signl, null, "  ")
					+ " | all_to_act=" + JSON.stringify(all_to_act, null, "  ")
				);*/
				send_signals_to(all_to_signl, all_to_act);
				//console.log("AFTER_REMOVE [2] | all_to_act=" + JSON.stringify(all_to_act, null, "  "));
			}
		}
		return;
	}
	const sufix_qhrefs = get_qhrefs_of(incos_qids, null);
	sp_qrefs_observ.innerHTML = " <br>" + glb_curr_lang.msg_change_one_answer + sufix_qhrefs;
	
	const dv_quest_2 = document.getElementById(qid);
	set_anchors_target(dv_quest_2);
}

// CODE_FOR __________________


