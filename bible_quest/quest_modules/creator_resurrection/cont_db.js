
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

	db.q_bible__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_bible"],
		htm_stm: "q1_0__bible",
		img_href: proy_img_dir + "bible.webp", 
		answers: {
			q1_0__YES_bible: { img_pos: rgt, },
			q1_0__NO_bible: { img_pos: lft, },
		},
	};
	
	db.q_creator__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_creator"],
		htm_stm: "q1_1__creator",
		img_href: proy_img_dir + "creator.webp", 
		answers: {
			q1_1__YES_creator: { img_pos: rgt, },
			q1_1__NO_creator: { img_pos: lft, },
		},
	};	
	
	db.q_six_days__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_creator"],
		htm_stm: "q1_1_2__six_days",
		img_href: proy_img_dir + "six_days.webp", 
		answers: {
			q1_1_2__YES_six_days: { img_pos: rgt, },
			q1_1_2__NO_six_days: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_creator__: { q1_1__YES_creator: "on", }, },
		},
	};	
	
	db.q_evolution__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evolution"],
		htm_stm: "q1_3__evolution",
		img_href: proy_img_dir + "evolution.webp", 
		answers: {
			q1_3__YES_evolution: { img_pos: rgt, },
			q1_3__NO_evolution: { img_pos: lft, },
		},
	};
	
	db.q_logic__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic"],
		htm_stm: "q_logic_stm",
		img_href: proy_img_dir + "logic.webp", 
		answers: {
			a_YES_logic: { img_pos: rgt, },
			a_NO_logic: { img_pos: lft, },
		},
	};	
	
	db.o_logic_comm__ = { 
		context: ["ctx_general", "ctx_logic"],
		htm_stm: "o_logic_comm",
		activated_if: {
			c1: { q_logic__: { a_NO_logic: "on", }, },
		},
	};
	
	db.q_language__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic", "ctx_language"],
		htm_stm: "q_language",
		img_href: proy_img_dir + "talking.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_logic__: { a_NO_logic: "on", }, },
		},
	};	
	
	db.o_language_comm__ = { 
		context: ["ctx_general", "ctx_logic", "ctx_language"],
		htm_stm: "o_language_comm",
		activated_if: {
			c1: { q_language__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_business__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic", "ctx_business"],
		htm_stm: "q_business",
		img_href: proy_img_dir + "stock_market.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_logic__: { a_NO_logic: "on", }, },
		},
	};	
	
	db.o_business_comm__ = { 
		context: ["ctx_general", "ctx_logic", "ctx_business"],
		htm_stm: "o_business_comm",
		activated_if: {
			c1: { q_business__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_technology__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic", "ctx_technology"],
		htm_stm: "q_technology",
		img_href: proy_img_dir + "technology.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_logic__: { a_NO_logic: "on", }, },
		},
	};	
	
	db.o_technology_comm__ = { 
		context: ["ctx_general", "ctx_logic", "ctx_technology"],
		htm_stm: "o_technology_comm",
		activated_if: {
			c1: { q_technology__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_evidence__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence"],
		htm_stm: "q_YES_NO_evidence",
		img_href: proy_img_dir + "senses.webp", 
		answers: {
			q_YES_evidence: { img_pos: rgt, },
			q_NO_evidence: { img_pos: lft, },
		},
	};	
	
	db.o_evidence_comm__ = { 
		context: ["ctx_general", "ctx_evidence"],
		htm_stm: "o_evidence_comm",
		activated_if: {
			c1: { q_evidence__: { q_NO_evidence: "on", }, },
		},
	};
	
	db.q_law__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_law"],
		htm_stm: "q_law",
		img_href: proy_img_dir + "law.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evidence__: { q_NO_evidence: "on", }, },
		},
	};	
	
	db.o_law_comm__ = { 
		context: ["ctx_general", "ctx_evidence", "ctx_law"],
		htm_stm: "o_law_comm",
		activated_if: {
			c1: { q_law__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_justice__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_law", "ctx_justice"],
		htm_stm: "q_justice",
		img_href: proy_img_dir + "justice.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_law__: { a_simple_NO: "on", }, },
		},
	};	
	
	db.o_justice_comm__ = { 
		context: ["ctx_general", "ctx_evidence", "ctx_law", "ctx_justice"],
		htm_stm: "o_justice_comm",
		activated_if: {
			c1: { q_justice__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_contracts__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_contracts"],
		htm_stm: "q_contracts",
		img_href: proy_img_dir + "signing.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evidence__: { q_NO_evidence: "on", }, },
		},
	};	
	
	db.o_contracts_comm__ = { 
		context: ["ctx_general", "ctx_evidence", "ctx_contracts"],
		htm_stm: "o_contract_comm",
		activated_if: {
			c1: { q_contracts__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_technology2__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_technology2"],
		htm_stm: "q_technology",
		img_href: proy_img_dir + "technology.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evidence__: { q_NO_evidence: "on", }, },
		},
	};	
	
	db.o_technology2_comm__ = { 
		context: ["ctx_general", "ctx_logic", "ctx_technology"],
		htm_stm: "o_technology2_comm",
		activated_if: {
			c1: { q_technology2__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_car_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_car_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_car_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_evidence_car_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_evidence_made_by_ape",
		img_href: proy_img_dir + "evidence_ape_car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_car_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.q_knife_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_knife_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_knife_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_evidence_knife_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity"],
		htm_stm: "q_evidence_made_by_ape",
		img_href: proy_img_dir + "evidence_ape_knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_knife_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.q_clock_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_clock_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_clock_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_evidence_clock_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity"],
		htm_stm: "q_evidence_made_by_ape",
		img_href: proy_img_dir + "evidence_ape_clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_clock_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.q_phone_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_phone_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_car_req_creativity__: { a_simple_NO: "on", }, },
			c2: { q_knife_req_creativity__: { a_simple_NO: "on", }, },
			c3: { q_clock_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_phone_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_phone_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_phone_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_evidence_phone_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_phone_req_creativity"],
		htm_stm: "q_evidence_made_by_ape",
		img_href: proy_img_dir + "evidence_ape_phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_phone_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.q_laptop_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_laptop_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "laptop.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_car_req_creativity__: { a_simple_NO: "on", }, },
			c2: { q_knife_req_creativity__: { a_simple_NO: "on", }, },
			c3: { q_clock_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_laptop_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_laptop_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_laptop.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_laptop_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_evidence_laptop_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_laptop_req_creativity"],
		htm_stm: "q_evidence_made_by_ape",
		img_href: proy_img_dir + "evidence_ape_laptop.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_laptop_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.q_building_vs_knife_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife.webp", },
			a_building: { img_pos: lft, img_href: proy_img_dir + "building.webp", },
		},
	};
	
	db.q_building_vs_knife_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife_complexity.webp", },
			a_building: { img_pos: lft, img_href: proy_img_dir + "building_complexity.webp", },
		},
		activated_if: {
			c1: { q_building_vs_knife_harder_to_make__: { a_knife: "on", }, },
		},
	};
	
	db.q_building_vs_knife_more_planning__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_more_planning",
		answers: {
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife_design.webp", },
			a_building: { img_pos: lft, img_href: proy_img_dir + "building_design.webp", },
		},
		activated_if: {
			c1: { q_building_vs_knife_harder_to_make__: { a_knife: "on", }, },
		},
	};
	
	db.q_car_vs_lamp_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_lamp_car", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_car: { img_pos: rgt, img_href: proy_img_dir + "car.webp", },
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp.webp", },
		},
	};
	
	db.q_lamp_vs_car_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_lamp_car", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_car: { img_pos: rgt, img_href: proy_img_dir + "car_complexity.webp", },
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp_complexity.webp", },
		},
		activated_if: {
			c1: { q_car_vs_lamp_harder_to_make__: { a_lamp: "on", }, },
		},
	};
	
	db.q_lamp_vs_car_more_planning__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_lamp_car", ],
		htm_stm: "q_more_planning",
		answers: {
			a_car: { img_pos: rgt, img_href: proy_img_dir + "car_design.webp", },
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp_design.webp", },
		},
		activated_if: {
			c1: { q_car_vs_lamp_harder_to_make__: { a_lamp: "on", }, },
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
	
	db.q_clock_vs_air_purifier_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_clock_air_purifier", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_air_purifier: { img_pos: rgt, img_href: proy_img_dir + "air_purifier_complexity.webp", },
			a_clock: { img_pos: lft, img_href: proy_img_dir + "clock_complexity.webp", },
		},
		activated_if: {
			c1: { q_clock_vs_air_purifier_harder_to_make__: { a_clock: "on", }, },
		},
	};
	
	db.q_clock_vs_air_purifier_more_planning__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_clock_air_purifier", ],
		htm_stm: "q_more_planning",
		answers: {
			a_air_purifier: { img_pos: rgt, img_href: proy_img_dir + "air_purifier_design.webp", },
			a_clock: { img_pos: lft, img_href: proy_img_dir + "clock_design.webp", },
		},
		activated_if: {
			c1: { q_clock_vs_air_purifier_harder_to_make__: { a_clock: "on", }, },
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

