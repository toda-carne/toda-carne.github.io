
import { get_verse_reponse_name, get_answer_key, glb_all_bibrefs, init_poll_glb, add_response_observation, } from '../../code/tc_lang_all.js';

"use strict";

const db_user_info = {};
const STARTING_QUESTIONS = [];
let db_nodes_exam = {};

export function init_exam_database(){
	db_nodes_exam = {};
	init_poll_glb(db_user_info, STARTING_QUESTIONS, db_nodes_exam);
	
	const db = db_nodes_exam;
	const rf = glb_all_bibrefs;
	const rgt = "grid_item_right";
	const lft = "grid_item_left";
	
	db.img_hrefs = {
		yes_like: "../img/exam/yes_like.webp",
		no_like: "../img/exam/no_like.webp",
		less_than: "../img/exam/less_than.webp",
		more: "../img/exam/more.webp",
		less: "../img/exam/less.webp",
	};

	db.q1_0__ = { 
		choose_yes: true,
		context: ["ctx_bible"],
		htm_stm: "q1_0__bible",
		img_href: "../quest/creator_resurrection/img/bible.webp", 
		answers: {
			q1_0__YES_bible: { img_pos: rgt, },
			q1_0__NO_bible: { img_pos: lft, },
		},
	};
	
	db.q1_1__ = { 
		choose_yes: true,
		context: ["ctx_creator"],
		htm_stm: "q1_1__creator",
		img_href: "../quest/creator_resurrection/img/creator.webp", 
		answers: {
			q1_1__YES_creator: { img_pos: rgt, },
			q1_1__NO_creator: { img_pos: lft, },
		},
	};	
	
	db.q1_1_2__ = { 
		choose_yes: true,
		context: ["ctx_creator"],
		htm_stm: "q1_1_2__six_days",
		img_href: "../quest/creator_resurrection/img/six_days.webp", 
		answers: {
			q1_1_2__YES_six_days: { img_pos: rgt, },
			q1_1_2__NO_six_days: { img_pos: lft, },
		},
		activated_if: {
			c1: { q1_1__: { q1_1__YES_creator: "on", }, },
		},
	};	
	
	db.q1_2__ = { 
		choose_yes: true,
		context: ["ctx_logic"],
		htm_stm: "q1_2__logic",
		img_href: "../quest/creator_resurrection/img/logic.webp", 
		answers: {
			q1_2__YES_logic: { img_pos: rgt, },
			q1_2__NO_logic: { img_pos: lft, },
		},
	};	
	
	db.q1_3__ = { 
		choose_yes: true,
		context: ["ctx_evolution"],
		htm_stm: "q1_3__evolution",
		img_href: "../quest/creator_resurrection/img/evolution.webp", 
		answers: {
			q1_3__YES_evolution: { img_pos: rgt, },
			q1_3__NO_evolution: { img_pos: lft, },
		},
	};
	
	db.q_car_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: "../quest/creator_resurrection/img/car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_knife_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: "../quest/creator_resurrection/img/knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_phone_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: "../quest/creator_resurrection/img/phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_building_vs_knife_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_requires_creativity"],
		htm_stm: "q_harder_to_make",
		img_href: "../quest/creator_resurrection/img/phone.webp", 
		answers: {
			a_knife: { img_pos: rgt, img_href: "../quest/creator_resurrection/img/knife.webp", },
			a_building: { img_pos: lft, img_href: "../quest/creator_resurrection/img/building.webp", },
		},
	};
	
	/*
	db.q1_3__ = { 
		choose_more: true,
		context: ["q100_3__yes", "q100_3__no"],
		answers: {
			q100_3__yes: { 
				img_pos: rgt,
				img_href: "../quest/creator_resurrection/img/senses.webp",
			},
			q100_3__no: { 
				img_pos: lft,
				img_href: "../quest/creator_resurrection/img/evolution.webp",
			},
		},
	};
		*/
	
}

