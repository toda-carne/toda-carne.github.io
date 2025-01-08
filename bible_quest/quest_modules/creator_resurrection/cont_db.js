
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
	db.score_it = {};
	
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
			q1_0__YES_bible: { img_pos: rgt, score: { bib: 1.2, }, },
			q1_0__NO_bible: { img_pos: lft, score: { bib: 0.8, }, },
		},
		
	};
	
	db.q_creator__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_creator"],
		htm_stm: "q1_1__creator",
		img_href: proy_img_dir + "creator.webp", 
		answers: {
			q1_1__YES_creator: { img_pos: rgt, score: { bib: 1.2, log: 1.2, evi: 1.2, }, },
			q1_1__NO_creator: { img_pos: lft, score: { bib: 0.8, log: 0.8, }, },
		},
	};	
	
	db.q_six_days__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_creator"],
		htm_stm: "q1_1_2__six_days",
		img_href: proy_img_dir + "six_days.webp", 
		answers: {
			q1_1_2__YES_six_days: { img_pos: rgt, score: { bib: 1.2, log: 1.2, }, },
			q1_1_2__NO_six_days: { img_pos: lft, score: { bib: 0.4, log: 0.8, }, },
		},
		activated_if: {
			c1: { q_creator__: { q1_1__YES_creator: "on", }, },
		},
		score: { bib: 1.2, log: 1.2, }, 
	};	
	
	db.q_evolution__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evolution"],
		htm_stm: "q1_3__evolution",
		img_href: proy_img_dir + "evolution.webp", 
		answers: {
			q1_3__YES_evolution: { img_pos: rgt, score: { bib: 0.7, log: 0.8, evi: 0.7 }, },
			q1_3__NO_evolution: { img_pos: lft, },
		},
	};

	db.q_millions_of_years__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evolution"],
		htm_stm: "q_millions_of_years",
		img_href: proy_img_dir + "solar_cycle.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, score: { bib: 0.2, log: 0.4, evi: 0.3 }, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evolution__: { q1_3__YES_evolution: "on", }, },
		},
	};

	db.q_logic__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic"],
		htm_stm: "q_logic_stm",
		img_href: proy_img_dir + "logic.webp", 
		answers: {
			a_YES_logic: { img_pos: rgt, },
			a_NO_logic: { img_pos: lft, score: { log: 0.4, }, },
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
			a_simple_NO: { img_pos: lft, score: { log: 0.2, evi: 0.7, }, },
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
			a_simple_NO: { img_pos: lft, score: { log: 0.2, evi: 0.7, }, },
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
			a_simple_NO: { img_pos: lft, score: { log: 0.2, evi: 0.7, }, },
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
	
	db.score_it.logic_1 = { 
		score_if: {
			c1: { q_language__: { a_simple_YES: "on", }, q_business__: { a_simple_YES: "on", }, q_technology__: { a_simple_YES: "on", }, },
		},
		score: { con: 1.2, },
	}
	
	db.score_it.logic_2 = { 
		score_if: {
			c1: { q_language__: { a_simple_NO: "on", }, q_business__: { a_simple_NO: "on", }, q_technology__: { a_simple_NO: "on", }, },
		},
		score: { con: 1.2, },
	}
	
	db.score_it.logic_3 = { 
		score_if: {
			c1: { q_logic__: { a_NO_logic: "on", }, logic_1: "off", logic_2: "off", },
		},
		score: { con: 0.5, },
	}
	
	db.q_evidence__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence"],
		htm_stm: "q_YES_NO_evidence",
		img_href: proy_img_dir + "senses.webp", 
		answers: {
			a_YES_evidence: { img_pos: rgt, },
			a_NO_evidence: { img_pos: lft, score: { evi: 0.7, }, },
		},
	};	
	
	db.o_evidence_comm__ = { 
		context: ["ctx_general", "ctx_evidence"],
		htm_stm: "o_evidence_comm",
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
		},
	};
	
	db.q_law__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_law"],
		htm_stm: "q_law",
		img_href: proy_img_dir + "law.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.4, }, },
		},
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
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
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.4, }, },
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
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.4, }, },
		},
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
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
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.4, }, },
		},
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
		},
	};	
	
	db.o_technology2_comm__ = { 
		context: ["ctx_general", "ctx_logic", "ctx_technology"],
		htm_stm: "o_technology2_comm",
		activated_if: {
			c1: { q_technology2__: { a_simple_NO: "on", }, },
		},
	};
	
	db.score_it.evidence_1 = { 
		score_if: {
			c1: { q_law__: { a_simple_YES: "on", }, q_justice__: { a_simple_YES: "on", }, q_contracts__: { a_simple_YES: "on", }, 
				q_technology2__: { a_simple_YES: "on", }, 
			},
		},
		score: { con: 1.2, },
	}
	
	db.score_it.evidence_2 = { 
		score_if: {
			c1: { q_law__: { a_simple_NO: "on", }, q_justice__: { a_simple_NO: "on", }, q_contracts__: { a_simple_NO: "on", }, 
				q_technology2__: { a_simple_NO: "on", }, 
			},
		},
		score: { con: 1.2, },
	}
	
	db.score_it.evidence_3 = { 
		score_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, evidence_1: "off", evidence_2: "off", },
		},
		score: { con: 0.5, },
	}
	
	db.q_car_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.7, }, },
		},
	};
	
	db.q_car_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, score: { log: 0.4, evi: 0.4, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.4, evi: 0.2, }, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_car_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.o_car_req_creativity_comm__ = { 
		context: ["ctx_general", "ctx_car_req_creativity"],
		htm_stm: "o_car_req_creativity_comm",
		activated_if: {
			c1: { q_car_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_knife_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.7, }, },
		},
	};
	
	db.q_knife_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, score: { log: 0.7, evi: 0.4, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.4, evi: 0.4, }, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_knife_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.o_knife_req_creativity_comm__ = { 
		context: ["ctx_general", "ctx_knife_req_creativity"],
		htm_stm: "o_knife_req_creativity_comm",
		activated_if: {
			c1: { q_knife_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_clock_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.8, }, },
		},
	};
	
	db.q_clock_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: proy_img_dir + "ape_and_clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, score: { log: 0.7, evi: 0.4, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.4, evi: 0.4, }, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_clock_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.o_clock_req_creativity_comm__ = { 
		context: ["ctx_general", "ctx_clock_req_creativity"],
		htm_stm: "o_clock_req_creativity_comm",
		activated_if: {
			c1: { q_clock_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_phone_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_phone_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.8, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.7, evi: 0.2, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.4, evi: 0.2, }, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_phone_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	/*db.o_phone_req_creativity_comm__ = { 
		context: ["ctx_general", "ctx_phone_req_creativity"],
		htm_stm: "o_phone_req_creativity_comm",
		activated_if: {
			c1: { q_phone_req_creativity__: { a_simple_NO: "on", }, },
		},
	};*/
	
	db.q_laptop_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_laptop_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: proy_img_dir + "laptop.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, score: { log: 0.8, evi: 0.8, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.2, evi: 0.1, }, },
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
			a_simple_YES: { img_pos: rgt, score: { log: 0.2, evi: 0.1, }, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_laptop_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	/*db.o_laptop_req_creativity_comm__ = { 
		context: ["ctx_general", "ctx_laptop_req_creativity"],
		htm_stm: "o_laptop_req_creativity_comm",
		activated_if: {
			c1: { q_laptop_req_creativity__: { a_simple_NO: "on", }, },
		},
	};*/
	
	db.q_building_vs_knife_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife.webp", score: { log: 0.8, evi: 0.8, }, },
			a_building: { img_pos: lft, img_href: proy_img_dir + "building.webp", },
		},
	};
	
	db.q_building_vs_knife_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife_complexity.webp", score: { log: 0.4, evi: 0.4, }, },
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
			a_knife: { img_pos: rgt, img_href: proy_img_dir + "knife_design.webp", score: { log: 0.4, evi: 0.4, }, },
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
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp.webp", score: { log: 0.8, evi: 0.8, }, },
		},
	};
	
	db.q_lamp_vs_car_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_lamp_car", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_car: { img_pos: rgt, img_href: proy_img_dir + "car_complexity.webp", },
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp_complexity.webp", score: { log: 0.4, evi: 0.4, }, },
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
			a_lamp: { img_pos: lft, img_href: proy_img_dir + "lamp_design.webp", score: { log: 0.4, evi: 0.4, }, },
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
		context: ["ctx_harder_to_make", "ctx_clock_air_purifier", ],
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
	
	db.o_complexity_with_design_is_harder_comm__ = { 
		context: ["ctx_harder_to_make", ],
		htm_stm: "o_complexity_with_design_is_harder_comm",
		activated_if: {
			c1: { 
				q_building_vs_knife_more_planning__: { shown: "on", }, 
				q_building_vs_knife_harder_to_make__: { a_knife: "on", },
			},
			c2: { 
				q_lamp_vs_car_more_planning__: { shown: "on", }, 
				q_car_vs_lamp_harder_to_make__: { a_lamp: "on", },
			},
			c3: { 
				q_clock_vs_air_purifier_more_planning__: { shown: "on", }, 
				q_clock_vs_air_purifier_harder_to_make__: { a_clock: "on", },
			},
		},
	};
	
	db.q_foot_vs_car_wheel_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_foot_vs_car", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_car_wheel: { img_pos: rgt, img_href: proy_img_dir + "car_wheel.webp", },
			a_foot: { img_pos: lft, img_href: proy_img_dir + "foot.webp", },
		},
	};
	
	db.q_make_foot__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_foot_vs_car", ],
		htm_stm: "q_make_foot",
		img_href: proy_img_dir + "make_foot.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_foot_vs_car_wheel_harder_to_make__: { a_car_wheel: "on", }, },
		},
	};
	
	db.q_why_amputees__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_foot_vs_car", ],
		htm_stm: "q_why_amputees",
		img_href: proy_img_dir + "amputee.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_make_foot__: { a_simple_YES: "on", }, },
		},
	};
	
	db.q_lung_vs_air_purifier_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_lung_vs_air_purifier", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_air_purifier: { img_pos: rgt, img_href: proy_img_dir + "air_purifier.webp", },
			a_human_lung: { img_pos: lft, img_href: proy_img_dir + "lungs.webp", },
		},
	};
	
	db.q_make_lung__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_lung_vs_air_purifier", ],
		htm_stm: "q_make_lung",
		img_href: proy_img_dir + "make_lungs.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_lung_vs_air_purifier_harder_to_make__: { a_air_purifier: "on", }, },
		},
	};
	
	db.q_why_one_lung__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_lung_vs_air_purifier", ],
		htm_stm: "q_why_one_lung",
		img_href: proy_img_dir + "one_lung.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_make_lung__: { a_simple_YES: "on", }, },
		},
	};
	
	db.q_human_body_vs_building_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_body_vs_building", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_building: { img_pos: rgt, img_href: proy_img_dir + "building.webp", },
			a_human_body: { img_pos: lft, img_href: proy_img_dir + "human_body.webp", },
		},
	};

	db.q_make_body__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_body_vs_building", ],
		htm_stm: "q_make_body",
		img_href: proy_img_dir + "make_body.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_human_body_vs_building_harder_to_make__: { a_building: "on", }, },
		},
	};
	
	db.q_why_die__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_body_vs_building", ],
		htm_stm: "q_why_die",
		img_href: proy_img_dir + "tomb.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_make_body__: { a_simple_YES: "on", }, },
		},
	};
	
	db.o_biology_is_harder_comm__ = { 
		context: ["ctx_harder_to_make", ],
		htm_stm: "o_biology_is_harder_comm",
		activated_if: {
			c1: { q_foot_vs_car_wheel_harder_to_make__: { a_car_wheel: "on", }, },
			c2: { q_lung_vs_air_purifier_harder_to_make__: { a_air_purifier: "on", }, },
			c3: { q_human_body_vs_building_harder_to_make__: { a_building: "on", }, },
		},
	};
	
	const any_biology = {
			c1: { q_foot_vs_car_wheel_harder_to_make__: { a_car_wheel: "on", }, },
			c2: { q_make_foot__: { a_simple_YES: "on", }, },
			c3: { q_lung_vs_air_purifier_harder_to_make__: { a_air_purifier: "on", }, },
			c4: { q_make_lung__: { a_simple_YES: "on", }, },
			c5: { q_human_body_vs_building_harder_to_make__: { a_building: "on", }, },
			c6: { q_make_body__: { a_simple_YES: "on", }, },
	};
			
	db.q_phone_mitosis__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_phone_mitosis", ],
		htm_stm: "q_phone_mitosis",
		img_href: proy_img_dir + "phone_mitosis.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: any_biology,
	};
	
	db.q_truck_baby__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_truck_baby", ],
		htm_stm: "q_truck_baby",
		img_href: proy_img_dir + "truck_baby.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: any_biology,
	};
	
	db.q_red_cell__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_red_cell", ],
		htm_stm: "q_red_cell",
		img_href: proy_img_dir + "red_cell.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: any_biology,
	};
	
	db.q_human_egg__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_human_egg", ],
		htm_stm: "q_human_egg",
		img_href: proy_img_dir + "human_egg.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: any_biology,
	};
	
	db.q_liver__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_liver", ],
		htm_stm: "q_liver",
		img_href: proy_img_dir + "liver.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: any_biology,
	};


	db.o_we_cannot_simulate_biology_comm__ = { 
		context: ["ctx_harder_to_make", ],
		htm_stm: "o_we_cannot_simulate_biology_comm",
		activated_if: {
			c1: { q_phone_mitosis__: { a_simple_YES: "on", }, },
			c2: { q_truck_baby__: { a_simple_YES: "on", }, },
			c3: { q_red_cell__: { a_simple_YES: "on", }, },
			c4: { q_human_egg__: { a_simple_YES: "on", }, },
			c5: { q_liver__: { a_simple_YES: "on", }, },
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
	
	db.o_biology_req_creativity_comm__ = { 
		context: ["ctx_general", "ctx_human_body_req_creativity"],
		htm_stm: "o_biology_req_creativity_comm",
		activated_if: {
			c1: { q_foot_req_creativity__: { a_simple_NO: "on", }, },
			c2: { q_lungs_req_creativity__: { a_simple_NO: "on", }, },
			c3: { q_human_body_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_o_faulty_logic_comm__ = { 
		context: ["ctx_general", "ctx_human_body_req_creativity"],
		htm_stm: "o_faulty_logic_comm",
		activated_if: {
			c1: { 	q_human_body_req_creativity__	: { shown: "on", }, q_creator__: { q1_1__NO_creator: "on", }, },
			c2: { 	q_human_body_req_creativity__	: { shown: "on", }, o_logic_comm__: { shown: "on", }, },
			c3: { 	q_human_body_req_creativity__	: { shown: "on", }, o_evidence_comm__: { shown: "on", }, },
			c4: { 	q_human_body_req_creativity__	: { shown: "on", }, o_car_req_creativity_comm__: { shown: "on", }, },
			c5: { 	q_human_body_req_creativity__	: { shown: "on", }, o_knife_req_creativity_comm__: { shown: "on", }, },
			c6: { 	q_human_body_req_creativity__	: { shown: "on", }, o_clock_req_creativity_comm__: { shown: "on", }, },
			c7: { 	q_human_body_req_creativity__	: { shown: "on", }, o_complexity_with_design_is_harder_comm__: { shown: "on", }, },			
			c8: { 	q_human_body_req_creativity__	: { shown: "on", }, o_biology_is_harder_comm__: { shown: "on", }, },
			c9: { 	q_human_body_req_creativity__	: { shown: "on", }, o_we_cannot_simulate_biology_comm__: { shown: "on", }, },
			c10: { 	q_human_body_req_creativity__	: { shown: "on", }, o_biology_req_creativity_comm__: { shown: "on", }, },
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

// 	c1: { q1_7__: { shown: "on", }, q1_91__: { shown: "on", }, q1_70__: { shown: "off", }, q1_91_0__: { shown: "off", }, },
