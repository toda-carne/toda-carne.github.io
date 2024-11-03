
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
		img_href: "../quest/creator_resurrection/img/bible.webp", 
		answers: {
			q1_0__YES_bible: { img_pos: rgt, },
			q1_0__NO_bible: { img_pos: lft, },
		},
	};
	
	
	db.q1_1__ = { 
		choose_yes: true,
		context: ["ctx_evolution"],
		img_href: "../quest/creator_resurrection/img/evolution.webp", 
		answers: {
			q1_1__YES_evolution: { img_pos: rgt, },
			q1_1__NO_evolution: { img_pos: lft, },
		},
		activated_if: {
			c1: { q1_0__: { q1_0__NO_bible: "on", }, },
		},
	};
	/*
	db.q1_10__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_1__: { q1_1__no: "on", }, },
		},
	};
	
	db.q1_1__ = { 
		choose_more: true,
		context: ["q1_2__yes", "q1_2__no"],
		answers: {
			q1_2__yes: { 
				img_pos: rgt,
				img_href: "../quest/creator_resurrection/img/senses.webp",
			},
			q1_2__no: { 
				img_pos: lft,
				img_href: "../quest/creator_resurrection/img/evolution.webp",
			},
		},
	};
		*/
	
}

