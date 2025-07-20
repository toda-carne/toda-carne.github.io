
import { init_poll_glb, gvar, } from '../../code/bq_tools.js';

"use strict";

let db_nodes_exam = {};

export function init_exam_database(){
	db_nodes_exam = {};
	init_poll_glb(db_nodes_exam);

	const db = db_nodes_exam;
	const rf = gvar.glb_all_bibrefs;
	const rgt = "grid_item_right";
	const lft = "grid_item_left";
	
	db.img_hrefs = {  // ALL GLOBAL IMAGES MUST BE IN THE DIRECTORY 'all_vars.conf_qmodus.image_dir' CONFIGURED IN bq_modules.js
		yes_like: "yes_like.webp",
		no_like: "no_like.webp",
		less_than: "less_than.webp",
		more: "more.webp",
		less: "less.webp",
	};

	// ALL IMAGES (img_href) MUST BE IN THE DIRECTORY 'all_vars.conf_qmodus.all_qmodus[this_qmonam].image_dir' CONFIGURED IN bq_modules.js
	
	db.q_creator__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_creator"],
		htm_stm: "q1_1__creator",
		img_href: "creator.webp", 
		answers: {
			q1_1__YES_creator: { img_pos: rgt, },
			q1_1__NO_creator: { img_pos: lft, },
		},
	};	
	
	db.q_six_days__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_creator"],
		htm_stm: "q1_1_2__six_days",
		img_href: "six_days.webp", 
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
		context: ["ctx_general", "ctx_intelligent_design"],
		htm_stm: "q1_3__evolution",
		img_href: "evolution.webp", 
		answers: {
			q1_3__YES_evolution: { img_pos: rgt, },
			q1_3__NO_evolution: { img_pos: lft, },
		},
	};

	db.o_evolution_comm__ = { 
		context: ["ctx_general", "ctx_intelligent_design"],
		htm_stm: "o_evolution_comm",
		htm_nam: "o_evolution_nam",
		activated_if: {
			c1: { q_six_days__: { q1_1_2__YES_six_days: "on", }, q_evolution__: { q1_3__YES_evolution: "on", }, },
		},
	};
	
	db.q_millions_of_years__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_intelligent_design"],
		htm_stm: "q_millions_of_years",
		img_href: "solar_cycle.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evolution__: { q1_3__YES_evolution: "on", }, },
		},
	};

	db.q_intelligent_design__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_intelligent_design"],
		htm_stm: "q_intelligent_design",
		img_href: "intelligent_design.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { 
				//q_bible__: { q1_0__YES_bible: "on", }, 
				q_creator__: { q1_1__YES_creator: "on", }, 
				q_six_days__: { q1_1_2__YES_six_days: "on", }, 
				q_evolution__: { q1_3__NO_evolution: "on", }, 
			},
		},
	};

	db.q_about_7_thousand_years__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_intelligent_design"],
		htm_stm: "q_about_7_thousand_years",
		img_href: "adam_and_eve.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_intelligent_design__: { a_simple_YES: "on", }, },
		},
	};

	db.q_logic__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic"],
		htm_stm: "q_logic_stm",
		img_href: "logic.webp", 
		answers: {
			a_YES_logic: { img_pos: rgt, },
			a_NO_logic: { img_pos: lft, },
		},
	};	
	
	db.o_logic_comm__ = { 
		context: ["ctx_general", "ctx_logic"],
		htm_stm: "o_logic_comm",
		htm_nam: "o_logic_nam",
		activated_if: {
			c1: { q_logic__: { a_NO_logic: "on", }, },
		},
	};
	
	db.q_language__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic", "ctx_language"],
		htm_stm: "q_language",
		img_href: "talking.webp", 
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
		htm_nam: "o_language_nam",
		activated_if: {
			c1: { q_language__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_business__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic", "ctx_business"],
		htm_stm: "q_business",
		img_href: "stock_market.webp", 
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
		htm_nam: "o_business_nam",
		activated_if: {
			c1: { q_business__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_technology__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_logic", "ctx_technology"],
		htm_stm: "q_technology",
		img_href: "technology.webp", 
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
		htm_nam: "o_technology_nam",
		activated_if: {
			c1: { q_technology__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_logic_incons_comm__ = { 
		context: ["ctx_general", "ctx_logic"],
		htm_stm: "o_logic_incons_comm",
		htm_nam: "o_logic_incons_nam",
		activated_if: {
			c1: { q_logic__: { a_YES_logic: "on", }, o_language_comm__: { shown: "on", }, },
			c2: { q_logic__: { a_YES_logic: "on", }, o_business_comm__: { shown: "on", }, },
			c3: { q_logic__: { a_YES_logic: "on", }, o_technology_comm__: { shown: "on", }, },
		},
	};
	
	db.q_evidence__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence"],
		htm_stm: "q_YES_NO_evidence",
		img_href: "senses.webp", 
		answers: {
			a_YES_evidence: { img_pos: rgt, },
			a_NO_evidence: { img_pos: lft, },
		},
	};	
	
	db.o_evidence_comm__ = { 
		context: ["ctx_general", "ctx_evidence"],
		htm_stm: "o_evidence_comm",
		htm_nam: "o_evidence_nam",
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
		},
	};
	
	db.q_law__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_law"],
		htm_stm: "q_law",
		img_href: "law.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
		},
	};	
	
	db.o_law_comm__ = { 
		context: ["ctx_general", "ctx_evidence", "ctx_law"],
		htm_stm: "o_law_comm",
		htm_nam: "o_law_nam",
		activated_if: {
			c1: { q_law__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_justice__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_law", "ctx_justice"],
		htm_stm: "q_justice",
		img_href: "justice.webp", 
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
		htm_nam: "o_justice_nam",
		activated_if: {
			c1: { q_justice__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_contracts__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_contracts"],
		htm_stm: "q_contracts",
		img_href: "signing.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
		},
	};	
	
	db.o_contracts_comm__ = { 
		context: ["ctx_general", "ctx_evidence", "ctx_contracts"],
		htm_stm: "o_contracts_comm",
		htm_nam: "o_contracts_nam",
		activated_if: {
			c1: { q_contracts__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_technology2__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_evidence", "ctx_technology2"],
		htm_stm: "q_technology",
		img_href: "technology.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_evidence__: { a_NO_evidence: "on", }, },
		},
	};	
	
	db.o_technology2_comm__ = { 
		context: ["ctx_general", "ctx_evidence", "ctx_technology2"],
		htm_stm: "o_technology2_comm",
		htm_nam: "o_technology2_nam",
		activated_if: {
			c1: { q_technology2__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_evidence_incons_comm__ = { 
		context: ["ctx_general", "ctx_evidence", ],
		htm_stm: "o_evidence_incons_comm",
		htm_nam: "o_evidence_incons_nam",
		activated_if: {
			c1: { q_evidence__: { a_YES_evidence: "on", }, o_law_comm__: { shown: "on", }, },
			c2: { q_evidence__: { a_YES_evidence: "on", }, o_justice_comm__: { shown: "on", }, },
			c3: { q_evidence__: { a_YES_evidence: "on", }, o_contracts_comm__: { shown: "on", }, },
			c4: { q_evidence__: { a_YES_evidence: "on", }, o_technology2_comm__: { shown: "on", }, },
		},
	};
	
	db.q_noah__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_noah", ],
		htm_stm: "q_noah",
		img_href: "noah_flood.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_about_7_thousand_years__: { a_simple_YES: "on", }, 
				q_logic__: { a_YES_logic: "on", }, 
				q_evidence__: { a_YES_evidence: "on", }, 
				q_language__: { shown: "off", }, 
				q_law__: { shown: "off", }, 
			},			
		},
	};	
	
	db.q_genesis__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_genesis", ],
		htm_stm: "q_genesis",
		img_href: "red_sea.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_noah__: { a_simple_YES: "on", }, },
		},
	};	
	
	db.q_bible__ = { 
		choose_yes: true,
		context: ["ctx_general", "ctx_bible"],
		htm_stm: "q1_0__bible",
		img_href: "bible.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_genesis__: { a_simple_YES: "on", }, },
		},		
	};
	
	db.q_car_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_requires_creativity",
		img_href: "car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_car_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "q_made_by_ape",
		img_href: "ape_and_car.webp", 
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
		img_href: "evidence_ape_car.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_car_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.o_car_req_creativity_comm__ = { 
		context: ["ctx_requires_creativity", "ctx_car_req_creativity"],
		htm_stm: "o_car_req_creativity_comm",
		htm_nam: "o_car_req_creativity_nam",
		activated_if: {
			c1: { q_car_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_knife_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: "knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_knife_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: "ape_and_knife.webp", 
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
		img_href: "evidence_ape_knife.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_knife_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.o_knife_req_creativity_comm__ = { 
		context: ["ctx_requires_creativity", "ctx_knife_req_creativity"],
		htm_stm: "o_knife_req_creativity_comm",
		htm_nam: "o_knife_req_creativity_nam",
		activated_if: {
			c1: { q_knife_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_clock_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: "clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_clock_by_ape__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity", ],
		htm_stm: "q_made_by_ape",
		img_href: "ape_and_clock.webp", 
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
		img_href: "evidence_ape_clock.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_clock_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	db.o_clock_req_creativity_comm__ = { 
		context: ["ctx_requires_creativity", "ctx_clock_req_creativity"],
		htm_stm: "o_clock_req_creativity_comm",
		htm_nam: "o_clock_req_creativity_nam",
		activated_if: {
			c1: { q_clock_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_phone_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_phone_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: "phone.webp", 
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
		img_href: "ape_and_phone.webp", 
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
		img_href: "evidence_ape_phone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_phone_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	/*db.o_phone_req_creativity_comm__ = { 
		context: ["ctx_requires_creativity", "ctx_phone_req_creativity"],
		htm_stm: "o_phone_req_creativity_comm",
		htm_nam: "o_phone_req_creativity_nam",
		activated_if: {
			c1: { q_phone_req_creativity__: { a_simple_NO: "on", }, },
		},
	};*/
	
	db.q_laptop_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_requires_creativity", "ctx_laptop_req_creativity", ],
		htm_stm: "q_requires_creativity",
		img_href: "laptop.webp", 
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
		img_href: "ape_and_laptop.webp", 
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
		img_href: "evidence_ape_laptop.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_laptop_by_ape__: { a_simple_YES: "on", }, },
		},
	};

	/*db.o_laptop_req_creativity_comm__ = { 
		context: ["ctx_requires_creativity", "ctx_laptop_req_creativity"],
		htm_stm: "o_laptop_req_creativity_comm",
		htm_nam: "o_laptop_req_creativity_nam",
		activated_if: {
			c1: { q_laptop_req_creativity__: { a_simple_NO: "on", }, },
		},
	};*/
	
	db.q_building_vs_knife_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_knife: { img_pos: rgt, img_href: "knife.webp", },
			a_building: { img_pos: lft, img_href: "building.webp", },
		},
	};
	
	db.q_building_vs_knife_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_building_knife", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_knife: { img_pos: rgt, img_href: "knife_complexity.webp", },
			a_building: { img_pos: lft, img_href: "building_complexity.webp", },
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
			a_knife: { img_pos: rgt, img_href: "knife_design.webp", },
			a_building: { img_pos: lft, img_href: "building_design.webp", },
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
			a_car: { img_pos: rgt, img_href: "car.webp", },
			a_lamp: { img_pos: lft, img_href: "lamp.webp", },
		},
	};
	
	db.q_lamp_vs_car_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_lamp_car", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_car: { img_pos: rgt, img_href: "car_complexity.webp", },
			a_lamp: { img_pos: lft, img_href: "lamp_complexity.webp", },
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
			a_car: { img_pos: rgt, img_href: "car_design.webp", },
			a_lamp: { img_pos: lft, img_href: "lamp_design.webp", },
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
			a_clock: { img_pos: rgt, img_href: "clock.webp", },
			a_cellphone: { img_pos: lft, img_href: "phone.webp", },
		},
	};*/
	
	db.q_clock_vs_air_purifier_harder_to_make__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_clock_air_purifier", ],
		htm_stm: "q_harder_to_make",
		answers: {
			a_clock: { img_pos: rgt, img_href: "clock.webp", },
			a_air_purifier: { img_pos: lft, img_href: "air_purifier.webp", },
		},
	};
	
	db.q_clock_vs_air_purifier_more_complexity__ = { 
		choose_more: true,
		context: ["ctx_harder_to_make", "ctx_clock_air_purifier", ],
		htm_stm: "q_more_complexity",
		answers: {
			a_air_purifier: { img_pos: rgt, img_href: "air_purifier_complexity.webp", },
			a_clock: { img_pos: lft, img_href: "clock_complexity.webp", },
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
			a_air_purifier: { img_pos: rgt, img_href: "air_purifier_design.webp", },
			a_clock: { img_pos: lft, img_href: "clock_design.webp", },
		},
		activated_if: {
			c1: { q_clock_vs_air_purifier_harder_to_make__: { a_clock: "on", }, },
		},
	};
	
	db.o_complexity_with_design_is_harder_comm__ = { 
		context: ["ctx_harder_to_make", ],
		htm_stm: "o_complexity_with_design_is_harder_comm",
		htm_nam: "o_complexity_with_design_is_harder_nam",
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
			a_car_wheel: { img_pos: rgt, img_href: "car_wheel.webp", },
			a_foot: { img_pos: lft, img_href: "foot.webp", },
		},
	};
	
	db.q_make_foot__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_foot_vs_car", ],
		htm_stm: "q_make_foot",
		img_href: "make_foot.webp", 
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
		img_href: "amputee.webp", 
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
			a_air_purifier: { img_pos: rgt, img_href: "air_purifier.webp", },
			a_human_lung: { img_pos: lft, img_href: "lungs.webp", },
		},
	};
	
	db.q_make_lung__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_lung_vs_air_purifier", ],
		htm_stm: "q_make_lung",
		img_href: "make_lungs.webp", 
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
		img_href: "one_lung.webp", 
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
			a_building: { img_pos: rgt, img_href: "building.webp", },
			a_human_body: { img_pos: lft, img_href: "baby.webp", },
		},
	};

	db.q_make_liver__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_body_vs_building", ],
		htm_stm: "q_make_liver",
		img_href: "make_liver.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_human_body_vs_building_harder_to_make__: { a_building: "on", }, },
		},
	};
	
	db.q_make_kidney__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_body_vs_building", ],
		htm_stm: "q_make_kidney",
		img_href: "make_kidney.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_human_body_vs_building_harder_to_make__: { a_building: "on", }, },
		},
	};
	
	db.q_make_body__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_body_vs_building", ],
		htm_stm: "q_make_body",
		img_href: "make_baby.webp", 
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
		img_href: "tomb.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_make_liver__: { a_simple_YES: "on", }, },
			c2: { q_make_kidney__: { a_simple_YES: "on", }, },
			c3: { q_make_body__: { a_simple_YES: "on", }, },
		},
	};
	
	db.o_biology_is_harder_comm__ = { 
		context: ["ctx_harder_to_make", ],
		htm_stm: "o_biology_is_harder_comm",
		htm_nam: "o_biology_is_harder_nam",
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
			c6: { q_make_liver__: { a_simple_YES: "on", }, },
	};
			
	db.q_phone_mitosis__ = { 
		choose_yes: true,
		context: ["ctx_harder_to_make", "ctx_phone_mitosis", ],
		htm_stm: "q_phone_mitosis",
		img_href: "phone_mitosis.webp", 
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
		img_href: "truck_baby.webp", 
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
		img_href: "red_cell.webp", 
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
		img_href: "human_egg.webp", 
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
		img_href: "liver.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: any_biology,
	};


	db.o_we_cannot_simulate_biology_comm__ = { 
		context: ["ctx_harder_to_make", ],
		htm_stm: "o_we_cannot_simulate_biology_comm",
		htm_nam: "o_we_cannot_simulate_biology_nam",
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
		img_href: "foot.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_lungs_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_biology_req_creativity"],
		htm_stm: "q_bilology_req_creativity",
		img_href: "lungs.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.q_human_body_req_creativity__ = { 
		choose_yes: true,
		context: ["ctx_biology_req_creativity"],
		htm_stm: "q_bilology_req_creativity",
		img_href: "baby.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.o_biology_req_creativity_comm__ = { 
		context: ["ctx_biology_req_creativity", "ctx_human_body_req_creativity"],
		htm_stm: "o_biology_req_creativity_comm",
		htm_nam: "o_biology_req_creativity_nam",
		activated_if: {
			c1: { q_foot_req_creativity__: { a_simple_NO: "on", }, },
			c2: { q_lungs_req_creativity__: { a_simple_NO: "on", }, },
			c3: { q_human_body_req_creativity__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_you_can_make_a_car_again__ = { 
		choose_yes: true,
		context: ["ctx_reproduction", ],
		htm_stm: "q_you_can_make_a_car_again",
		img_href: "car_production.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.o_humans_can_re_create_their_creations__ = { 
		context: ["ctx_reproduction", ],
		htm_stm: "o_humans_can_re_create_their_creations",
		htm_nam: "o_humans_can_re_create_their_creations_nam",
		activated_if: {
			c1: { q_you_can_make_a_car_again__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q_he_can_make_a_body_again__ = { 
		choose_yes: true,
		context: ["ctx_reproduction", ],
		htm_stm: "q_he_can_make_a_body_again",
		img_href: "baby_replica.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};
	
	db.o_the_creator_can_re_create_his_creation__ = { 
		context: ["ctx_reproduction", ],
		htm_stm: "o_the_creator_can_re_create_his_creation",
		htm_nam: "o_the_creator_can_re_create_his_creation_nam",
		activated_if: {
			c1: { q_he_can_make_a_body_again__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_fast_track_get_qrcode__ = { 
		calls_write_results: true,
		is_positive: true,
		context: ["ctx_get_qrcode"],
		htm_stm: "o_get_qrcode",
		htm_nam: "o_short_end_nam",
		activated_if: {
			c1: { q_bible__: { a_simple_YES: "on", }, },
		},
	};
	
	/*
	db.o_get_qrcode__ = { 
		calls_write_results: true,
		is_positive: true,
		context: ["ctx_get_qrcode"],
		htm_stm: "o_get_qrcode",
		htm_nam: "o_long_end_nam",
		activated_if: {
			c2: { q_he_can_make_a_body_again__	: { shown: "on", }, },
		},
	};*/
	
	db.o_get_qrcode__ = { 
		calls_write_results: true,
		is_positive: true,
		context: ["ctx_get_qrcode"],
		htm_stm: "o_get_qrcode",
		htm_nam: "o_long_end_nam",
		activated_if: {
			c1: { NO_QUESTIONS_LEFT : true, },
		},
	};
	
	
	/*
	db.o_o_faulty_logic_comm__ = { 
		//stops_until_not_shown: true,
		context: ["ctx_ending_creator", ],
		htm_stm: "o_faulty_logic_comm",
		activated_if: {
			c1: { 	q_human_body_req_creativity__	: { shown: "on", }, q_creator__: { q1_1__NO_creator: "on", }, },
			c2: { 	q_human_body_req_creativity__	: { shown: "on", }, o_logic_comm__: { shown: "on", }, },
			c2_1: { q_human_body_req_creativity__	: { shown: "on", }, o_logic_incons_comm__: { shown: "on", }, },
			c3: { 	q_human_body_req_creativity__	: { shown: "on", }, o_evidence_comm__: { shown: "on", }, },
			c3_1: { q_human_body_req_creativity__	: { shown: "on", }, o_evidence_incons_comm__: { shown: "on", }, },
			c4: { 	q_human_body_req_creativity__	: { shown: "on", }, o_car_req_creativity_comm__: { shown: "on", }, },
			c5: { 	q_human_body_req_creativity__	: { shown: "on", }, o_knife_req_creativity_comm__: { shown: "on", }, },
			c6: { 	q_human_body_req_creativity__	: { shown: "on", }, o_clock_req_creativity_comm__: { shown: "on", }, },
			c7: { 	q_human_body_req_creativity__	: { shown: "on", }, o_complexity_with_design_is_harder_comm__: { shown: "on", }, },			
			c8: { 	q_human_body_req_creativity__	: { shown: "on", }, o_biology_is_harder_comm__: { shown: "on", }, },
			c9: { 	q_human_body_req_creativity__	: { shown: "on", }, o_we_cannot_simulate_biology_comm__: { shown: "on", }, },
			c10: { 	q_human_body_req_creativity__	: { shown: "on", }, o_biology_req_creativity_comm__: { shown: "on", }, },
		},
	};	
	*/

}

// 	c1: { q1_7__: { shown: "on", }, q1_91__: { shown: "on", }, q1_70__: { shown: "off", }, q1_91_0__: { shown: "off", }, },
