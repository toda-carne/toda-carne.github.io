
import { get_verse_reponse_name, get_answer_key, glb_all_bibrefs, init_poll_glb, add_response_observation, } from '../../code/tc_lang_all.js';

"use strict";

const db_user_info = {};
const STARTING_QUESTIONS = [];
let db_nodes_exam = {};

export function init_exam_database(){
	db_nodes_exam = {};
	init_poll_glb(db_user_info, STARTING_QUESTIONS, db_nodes_exam);

	const glb_img_dir = "../img/";
	const proy_img_dir = "../quest_modules/creator_resurrection/img/";
	
	const db = db_nodes_exam;
	const rf = glb_all_bibrefs;
	const rgt = "grid_item_right";
	const lft = "grid_item_left";

	db.glb_img_dir = glb_img_dir;
	db.proy_img_dir = proy_img_dir;
	
	db.img_hrefs = {
		yes_like: glb_img_dir + "yes_like.webp",
		no_like: glb_img_dir + "no_like.webp",
		less_than: glb_img_dir + "less_than.webp",
		more: glb_img_dir + "more.webp",
		less: glb_img_dir + "less.webp",
	};

	db.q1_0__ = { 
		choose_yes: true,
		context: ["ctx_bible"],
		htm_stm: "q1_0__bible",
		img_href: proy_img_dir + "bible.webp", 
		answers: {
			q1_0__YES_bible: { img_pos: rgt, },
			q1_0__NO_bible: { img_pos: lft, },
		},
	};
	
	db.q1_1__ = { 
		choose_yes: true,
		context: ["ctx_creator"],
		htm_stm: "q1_1__creator",
		img_href: proy_img_dir + "creator.webp", 
		answers: {
			q1_1__YES_creator: { img_pos: rgt, },
			q1_1__NO_creator: { img_pos: lft, },
		},
	};	
	
	db.q1_1_2__ = { 
		choose_yes: true,
		context: ["ctx_creator"],
		htm_stm: "q1_1_2__six_days",
		img_href: proy_img_dir + "six_days.webp", 
		answers: {
			q1_1_2__YES_six_days: { img_pos: rgt, },
			q1_1_2__NO_six_days: { img_pos: lft, },
		},
		activated_if: {
			c1: { q1_1__: { q1_1__YES_creator: "on", }, },
		},
	};	
	
	db.q_logic__ = { 
		choose_yes: true,
		context: ["ctx_logic"],
		htm_stm: "q1_2__logic",
		img_href: proy_img_dir + "logic.webp", 
		answers: {
			q1_2__YES_logic: { img_pos: rgt, },
			q1_2__NO_logic: { img_pos: lft, },
		},
	};	
	
	db.q_evidence__ = { 
		choose_yes: true,
		context: ["ctx_evidence"],
		htm_stm: "q_YES_NO_evidence",
		img_href: proy_img_dir + "senses.webp", 
		answers: {
			q_YES_evidence: { img_pos: rgt, },
			q_NO_evidence: { img_pos: lft, },
		},
	};	
	
	db.q_evolution__ = { 
		choose_yes: true,
		context: ["ctx_evolution"],
		htm_stm: "q1_3__evolution",
		img_href: proy_img_dir + "evolution.webp", 
		answers: {
			q1_3__YES_evolution: { img_pos: rgt, },
			q1_3__NO_evolution: { img_pos: lft, },
		},
	};
	
	db.q_car_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_knife_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	/*
	db.q_phone_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};*/
	
	db.q_clock_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_building_vs_knife_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife.webp", },
			a_building: { img_pos: lft, img_href: proy_img_dir + "building.webp", },
		},
	};
	
	db.q_car_vs_lamp_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_car: { img_pos: rgt, img_href: proy_img_dir + "car.webp", },
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp.webp", },
		},
	};
	
	/*
	db.q_clock_vs_cellphone_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_clock: { img_pos: rgt, img_href: proy_img_dir + "clock.webp", },
			a_cellphone: { img_pos: lft, img_href: proy_img_dir + "phone.webp", },
		},
	};*/
	
	db.q_clock_vs_air_purifier_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_clock: { img_pos: rgt, img_href: proy_img_dir + "clock.webp", },
			a_air_purifier: { img_pos: lft, img_href: proy_img_dir + "air_purifier.webp", },
		},
	};
	
	db.q_foot_vs_car_wheel_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_car_wheel: { img_pos: rgt, img_href: proy_img_dir + "car_wheel.webp", },
			a_foot: { img_pos: lft, img_href: proy_img_dir + "foot.webp", },
		},
	};
	
	db.q_lung_vs_air_purifier_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_air_purifier: { img_pos: rgt, img_href: proy_img_dir + "air_purifier.webp", },
			a_human_lung: { img_pos: lft, img_href: proy_img_dir + "lungs.webp", },
		},
	};
	
	db.q_human_body_vs_building_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make"],
		htm_stm: "q_harder_to_make",
		answers: {
			a_building: { img_pos: rgt, img_href: proy_img_dir + "building.webp", },
			a_human_body: { img_pos: lft, img_href: proy_img_dir + "human_body.webp", },
		},
	};

	db.q_foot_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_biology_req_creativity"],
		htm_stm: "q_bilology_req_creativity",
		img_href: proy_img_dir + "foot.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_lungs_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_biology_req_creativity"],
		htm_stm: "q_bilology_req_creativity",
		img_href: proy_img_dir + "lungs.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_human_body_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_biology_req_creativity"],
		htm_stm: "q_bilology_req_creativity",
		img_href: proy_img_dir + "human_body.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_participate_in_contest__ = { 
		choose_yes: true,
		presentation: "t_good_job",
		context: ["ctx_contest"],
		htm_stm: "q_participate",
		img_href: proy_img_dir + "trophy.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.o_save_creator_quest__ = { 
		calls_write_object: true,
		is_positive: true,
		htm_stm: "o_chose_yes_to_participate",
		htm_stm_saved_ok: "o_congrats_you_have_a_ticket",
		htm_stm_not_saved: "o_sorry_no_loging_no_participation",
		activated_if: {
			c1: { q_participate_in_contest__: { a_simple_YES: "on", }, },
		},
	};
	
	db.o_no_participation__ = { 
		htm_stm: "o_chose_no_participation",
		activated_if: {
			c1: { q_participate_in_contest__: { a_simple_NO: "on", }, },
		},
	};
	
	
}

