
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

	db.q1_1__ = { 
		htm_stm: "q1_1__are_you_reasonable",
		answers: {
			q1_1__yes: { htm_answ: "q1_1__yes", 
				should_on: "q1_1__should_yes",
				rclk_href: "q1_1__pru_href", // uncomment to debug right_click 
				//rclk_should_href: "q1_1__pru_should_href", // uncomment to debug right_click of should_href
			},
			q1_1__no: { htm_answ: "q1_1__no", 
			},
		},
	};
	
	db.q1_10__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_1__: { q1_1__no: "on", }, },
		},
	};
	
	db.q1_2__ = { 
		htm_stm: "q1_2__experience_is_evidence",
		answers: {
			q1_2__yes: { htm_answ: "q1_2__yes" },
			q1_2__no: { htm_answ: "q1_2__no" },
		},
	};
	
	db.q1_20__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_2__: { q1_2__no: "on", }, },
		},
	};
	
	db.q1_3__ = { 
		htm_stm: "q1_3__are_humans_intelligent",
		presentation: "q1_3__creator_section",
		answers: {
			q1_3__yes: { htm_answ: "q1_3__yes", should_on: "q1_3__should", },
			q1_3__no: { htm_answ: "q1_3__no" },
		},
	};
	
	db.q1_30__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_3__: { q1_3__no: "on", }, },
		},
	};
	
	db.q1_31__ = { 
		htm_stm: "q1_31__all_biological_machines",
		answers: {
			q1_31__creator: { htm_answ: "q1_31__creator" },
			q1_31__other: { htm_answ: "q1_31__other" },
		},
	};
	
	db.q1_32__ = { 
		htm_stm: "q1_32__the_creator",
		answers: {
			q1_32__intelligent: { htm_answ: "q1_32__intelligent" },
			q1_32__not_intelligent: { htm_answ: "q1_32__not_intelligent" },
		},
		context: ["act"],
		activated_if: {
			c1: { q1_31__: { q1_31__creator: "on", }, },
		},
	};
	
	db.q1_33__ = { 
		htm_stm: "q1_33__the_evolution",
		answers: {
			q1_33__yes: { htm_answ: "q1_33__yes" },
			q1_33__no: { htm_answ: "q1_33__no" },
		},
	};
	
	db.q1_34__ = { 
		htm_stm: "q1_34__six_spins",
		answers: {
			q1_34__yes: { htm_answ: "q1_34__yes" },
			q1_34__no: { htm_answ: "q1_34__no" },
		},
		context: ["act"],
		activated_if: {
			c1: { q1_31__: { q1_31__creator: "on", }, },
		},
	};
	
	db.q1_4__ = { 
		htm_stm: "q1_4__requires_technical_creativity",
		is_multi: true,
		answers: {
			q1_4__knife: { htm_answ: "q1_4__knife", should_on: "q1_4__should1", },
			q1_4__lamp: { htm_answ: "q1_4__lamp", should_on: "q1_4__should2", },
			q1_4__clock: { htm_answ: "q1_4__clock", should_on: "q1_4__should3", },
		},
	};
	
	db.q1_40__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_4__: { q1_4__knife: "off", }, },
			c2: { q1_4__: { q1_4__lamp: "off", }, },
			c3: { q1_4__: { q1_4__clock: "off", }, },
		},
	};
	
	db.q1_5__ = { 
		htm_stm: "q1_5__more_complex_than",
		is_multi: true,
		answers: {
			q1_5__building_vs_knife: { htm_answ: "q1_5__building_vs_knife", should_on: "q1_5__should1", },
			q1_5__car_vs_lamp: { htm_answ: "q1_5__car_vs_lamp", should_on: "q1_5__should2", },
			q1_5__cellphone_vs_clock: { htm_answ: "q1_5__cellphone_vs_clock", should_on: "q1_5__should3", },
		},
	};
	
	db.q1_50__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_5__: { q1_5__building_vs_knife: "off", }, },
			c2: { q1_5__: { q1_5__car_vs_lamp: "off", }, },
			c3: { q1_5__: { q1_5__cellphone_vs_clock: "off", }, },
		},
	};
	
	db.q1_7__ = { 
		htm_stm: "q1_7__more_complexity_then_more_creativity",
		answers: {
			q1_7__yes: { htm_answ: "q1_7__yes" },
			q1_7__no: { htm_answ: "q1_7__no" },
		},
	};
	
	db.q1_70__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_7__: { q1_7__no: "on", }, },
		},
	};
	
	db.q1_8__ = { 
		htm_stm: "q1_8__more_creativity",
		is_multi: true,
		answers: {
			q1_8__building_vs_knife: { htm_answ: "q1_8__building_vs_knife" },
			q1_8__car_vs_lamp: { htm_answ: "q1_8__car_vs_lamp" },
			q1_8__cellphone_vs_clock: { htm_answ: "q1_8__cellphone_vs_clock" },
		},
	};
	
	db.q1_80__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_8__: { q1_8__building_vs_knife: "off", }, },
			c2: { q1_8__: { q1_8__car_vs_lamp: "off", }, },
			c3: { q1_8__: { q1_8__cellphone_vs_clock: "off", }, },
		},
	};
	
	db.q1_9__ = { 
		htm_stm: "q1_9__coplexity_of_biological_machines",
		is_multi: true,
		answers: {
			q1_9__car_vs_mitosis: { htm_answ: "q1_9__car_vs_mitosis" },
			q1_9__smartphone_vs_sex: { htm_answ: "q1_9__smartphone_vs_sex" },
			q1_9__bicycle_vs_healing: { htm_answ: "q1_9__bicycle_vs_healing" },
			q1_9__knife_vs_regeneration: { htm_answ: "q1_9__knife_vs_regeneration" },
		},
	};
	
	db.q1_90__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_9__: { q1_9__car_vs_mitosis: "off", }, },
			c2: { q1_9__: { q1_9__smartphone_vs_sex: "off", }, },
			c3: { q1_9__: { q1_9__bicycle_vs_healing: "off", }, },
			c4: { q1_9__: { q1_9__knife_vs_regeneration: "off", }, },
		},
	};
	
	db.q1_91__ = { 
		htm_stm: "q1_91__more_complexity_in_biology",
		answers: {
			q1_91__yes: { htm_answ: "q1_91__yes" },
			q1_91__no: { htm_answ: "q1_91__no" },
		},
	};
	
	db.q1_91_0__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_91__: { q1_91__no: "on", }, },
		},
	};
	
	db.q1_92__ = { 
		htm_stm: "q1_92__human_complexity",
		is_multi: true,
		answers: {
			q1_92__leg: { htm_answ: "q1_92__leg" },
			q1_92__liver: { htm_answ: "q1_92__liver" },
			q1_92__lung: { htm_answ: "q1_92__lung" },
		},
	};
	
	db.q1_92_0__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_92__: { q1_92__leg: "off", }, },
			c2: { q1_92__: { q1_92__liver: "off", }, },
			c3: { q1_92__: { q1_92__lung: "off", }, },
		},
	};
	
	// UPDATING_HERE
	
	db.q1_93__ = { 
		htm_stm: "q1_93__biological_requires_creativity",
		has_qrefs: true,
		answers: {
			q1_93__yes: { htm_answ: "q1_93__yes" },
			q1_93__no: { htm_answ: "q1_93__no" },
		},
		context: ["act"],
		activated_if: {
			c1: { q1_7__: { shown: "on", }, q1_91__: { shown: "on", }, q1_70__: { shown: "off", }, q1_91_0__: { shown: "off", }, },
		},
	};
	
	db.q1_93_0__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_93__: { q1_93__no: "on", }, },
		},
	};
	
	db.q1_94__ = { 
		htm_stm: "q1_94__if_human_then_creator",
		has_qrefs: true,
		answers: {
			q1_94__yes: { htm_answ: "q1_94__yes" },
			q1_94__no: { htm_answ: "q1_94__no" },
		},
		context: ["act"],
		activated_if: {
			c1: { q1_93__: { q1_93__yes: "on", }, q1_50__: { shown: "off", }, q1_40__: { shown: "off", }, q1_30__: { shown: "off", }, },
		},
	};
	
	db.q1_94_0__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q1_94__: { q1_94__no: "on", }, },
		},
	};
	
	db.q2_1__ = { 
		htm_stm: "q2_1__can_an_engineer_rebuild_his_house",
		presentation: "q2_0__reproduction_section",
		answers: {
			q2_1__yes: { htm_answ: "q2_1__yes" },
			q2_1__no: { htm_answ: "q2_1__no" },
		},
	};
	
	db.q2_10__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q2_1__: { q2_1__no: "on", }, q1_30__: { shown: "off", }, },
		},
	};
	
	db.q2_2__ = { 
		htm_stm: "q2_2__future_resurrection",
		has_qrefs: true,
		answers: {
			q2_2__yes: { htm_answ: "q2_2__yes" },
			q2_2__no: { htm_answ: "q2_2__no" },
		},
		context: ["act"],
		activated_if: {
			c1: { q2_1__: { q2_1__yes: "on", }, },
		},
	};
	
	db.q2_20__ = { 
		htm_stm: "q0_2__contradiction",
		context: ["act"],
		activated_if: {
			c1: { q2_2__: { q2_2__no: "on", }, },
		},
	};
	
	db.q3_1__ = { 
		htm_stm: "q3_1__jesus_resurrection_claims",
		presentation: "q3_1__resurrection_section",
		is_multi: true,
		answers: {
			q3_1__physical: { htm_answ: "q3_1__physical", should_on: "q3_1__physical", },
			q3_1__not_to_die: { htm_answ: "q3_1__not_to_die", should_on: "q3_1__not_to_die", },
			q3_1__in_heaven: { htm_answ: "q3_1__in_heaven", should_on: "q3_1__in_heaven", },
		},
	};
	
	db.q3_2__ = { 
		htm_stm: "q3_2__people_resurrection_claims",
		is_multi: true,
		answers: {
			q3_2__like_jesus: { htm_answ: "q3_2__like_jesus", should_on: "q3_2__like_jesus", },
			q3_2__for_all: { htm_answ: "q3_2__for_all", should_on: "q3_2__for_all", },
			q3_2__not_yet_most: { htm_answ: "q3_2__not_yet_most", should_on: "q3_2__not_yet_most", },
			q3_2__new_earth: { htm_answ: "q3_2__new_earth", should_on: "q3_2__new_earth", },
			q3_2__sleep: { htm_answ: "q3_2__sleep", should_on: "q3_2__sleep", },
		},
	};
	
	db.q3_3__ = { 
		htm_stm: "q3_3__dispute_or_accept_resurrection",
		answers: {
			q3_3__not_believed: { htm_answ: "q3_3__not_believed" },
			q3_3__all_stms: { htm_answ: "q3_3__all_stms" },
			q3_3__go_on: { htm_answ: "q3_3__go_on" },
		},
	};
	
	db.q4_1__ = { 
		htm_stm: "q4_1__physical",
		presentation: "q4_1__physical_sec",
		is_multi: true,
		answers: {
			q4_1__verse1_str: { htm_answ: "q4_1__verse1_str", rclk_href: "q4_1__verse1_href", should_on: "q4_1__verse1_should", },
			q4_1__verse2_str: { htm_answ: "q4_1__verse2_str", rclk_href: "q4_1__verse2_href", should_on: "q4_1__verse2_should", },
			q4_1__verse3_str: { htm_answ: "q4_1__verse3_str", rclk_href: "q4_1__verse3_href", should_on: "q4_1__verse3_should", },
			q4_1__verse4_str: { htm_answ: "q4_1__verse4_str", rclk_href: "q4_1__verse4_href", should_on: "q4_1__verse4_should", },
			q4_1__verse5_str: { htm_answ: "q4_1__verse5_str", rclk_href: "q4_1__verse5_href", should_on: "q4_1__verse5_should", },
			q4_1__verse6_str: { htm_answ: "q4_1__verse6_str", rclk_href: "q4_1__verse6_href", should_on: "q4_1__verse6_should", },
			q4_1__verse7_str: { htm_answ: "q4_1__verse7_str", rclk_href: "q4_1__verse7_href", should_on: "q4_1__verse7_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_1__: { q3_1__physical: "off", }, },
		},
	};
	
	db.q5_1__ = { 
		htm_stm: "q5_1__not_die",
		presentation: "q5_1__not_die_sec",
		is_multi: true,
		answers: {
			q5_1__verse1_str: { htm_answ: "q5_1__verse1_str", rclk_href: "q5_1__verse1_href", should_on: "q5_1__verse1_should", },
			q5_1__verse2_str: { htm_answ: "q5_1__verse2_str", rclk_href: "q5_1__verse2_href", should_on: "q5_1__verse2_should", },
			q5_1__verse3_str: { htm_answ: "q5_1__verse3_str", rclk_href: "q5_1__verse3_href", should_on: "q5_1__verse3_should", },
			q5_1__verse4_str: { htm_answ: "q5_1__verse4_str", rclk_href: "q5_1__verse4_href", should_on: "q5_1__verse4_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_1__: { q3_1__not_to_die: "off", }, },
		},
	};
	
	db.q6_1__ = { 
		htm_stm: "q6_1__in_heaven",
		presentation: "q6_1__in_heaven_sec",
		is_multi: true,
		answers: {
			q6_1__verse1_str: { htm_answ: "q6_1__verse1_str", rclk_href: "q6_1__verse1_href", should_on: "q6_1__verse1_should", },
			q6_1__verse2_str: { htm_answ: "q6_1__verse2_str", rclk_href: "q6_1__verse2_href", should_on: "q6_1__verse2_should", },
			q6_1__verse3_str: { htm_answ: "q6_1__verse3_str", rclk_href: "q6_1__verse3_href", should_on: "q6_1__verse3_should", },
			q6_1__verse4_str: { htm_answ: "q6_1__verse4_str", rclk_href: "q6_1__verse4_href", should_on: "q6_1__verse4_should", },
			q6_1__verse5_str: { htm_answ: "q6_1__verse5_str", rclk_href: "q6_1__verse5_href", should_on: "q6_1__verse5_should", },
			q6_1__verse6_str: { htm_answ: "q6_1__verse6_str", rclk_href: "q6_1__verse6_href", should_on: "q6_1__verse6_should", },
			q6_1__verse7_str: { htm_answ: "q6_1__verse7_str", rclk_href: "q6_1__verse7_href", should_on: "q6_1__verse7_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_1__: { q3_1__in_heaven: "off", }, },
		},
	};
	
	db.q7_1__ = { 
		htm_stm: "q7_1__like_jesus",
		presentation: "q7_1__like_jesus_sec",
		is_multi: true,
		answers: {
			q7_1__verse1_str: { htm_answ: "q7_1__verse1_str", rclk_href: "q7_1__verse1_href", should_on: "q7_1__verse1_should", },
			q7_1__verse2_str: { htm_answ: "q7_1__verse2_str", rclk_href: "q7_1__verse2_href", should_on: "q7_1__verse2_should", },
			q7_1__verse3_str: { htm_answ: "q7_1__verse3_str", rclk_href: "q7_1__verse3_href", should_on: "q7_1__verse3_should", },
			q7_1__verse4_str: { htm_answ: "q7_1__verse4_str", rclk_href: "q7_1__verse4_href", should_on: "q7_1__verse4_should", },
			q7_1__verse5_str: { htm_answ: "q7_1__verse5_str", rclk_href: "q7_1__verse5_href", should_on: "q7_1__verse5_should", },
			q7_1__verse6_str: { htm_answ: "q7_1__verse6_str", rclk_href: "q7_1__verse6_href", should_on: "q7_1__verse6_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_2__: { q3_2__like_jesus: "off", }, },
		},
	};
	
	db.q8_1__ = { 
		htm_stm: "q8_1__for_all",
		presentation: "q8_1__for_all_sec",
		is_multi: true,
		answers: {
			q8_1__verse1_str: { htm_answ: "q8_1__verse1_str", rclk_href: "q8_1__verse1_href", should_on: "q8_1__verse1_should", },
			q8_1__verse2_str: { htm_answ: "q8_1__verse2_str", rclk_href: "q8_1__verse2_href", should_on: "q8_1__verse2_should", },
			q8_1__verse3_str: { htm_answ: "q8_1__verse3_str", rclk_href: "q8_1__verse3_href", should_on: "q8_1__verse3_should", },
			q8_1__verse4_str: { htm_answ: "q8_1__verse4_str", rclk_href: "q8_1__verse4_href", should_on: "q8_1__verse4_should", },
			q8_1__verse5_str: { htm_answ: "q8_1__verse5_str", rclk_href: "q8_1__verse5_href", should_on: "q8_1__verse5_should", },
			q8_1__verse6_str: { htm_answ: "q8_1__verse6_str", rclk_href: "q8_1__verse6_href", should_on: "q8_1__verse6_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_2__: { q3_2__for_all: "off", }, },
		},
	};
	
	db.q9_1__ = { 
		htm_stm: "q9_1__not_yet",
		presentation: "q9_1__not_yet_sec",
		is_multi: true,
		answers: {
			q9_1__verse1_str: { htm_answ: "q9_1__verse1_str", rclk_href: "q9_1__verse1_href", should_on: "q9_1__verse1_should", },
			q9_1__verse2_str: { htm_answ: "q9_1__verse2_str", rclk_href: "q9_1__verse2_href", should_on: "q9_1__verse2_should", },
			q9_1__verse3_str: { htm_answ: "q9_1__verse3_str", rclk_href: "q9_1__verse3_href", should_on: "q9_1__verse3_should", },
			q9_1__verse4_str: { htm_answ: "q9_1__verse4_str", rclk_href: "q9_1__verse4_href", should_on: "q9_1__verse4_should", },
			q9_1__verse5_str: { htm_answ: "q9_1__verse5_str", rclk_href: "q9_1__verse5_href", should_on: "q9_1__verse5_should", },
			q9_1__verse6_str: { htm_answ: "q9_1__verse6_str", rclk_href: "q9_1__verse6_href", should_on: "q9_1__verse6_should", },
			q9_1__verse7_str: { htm_answ: "q9_1__verse7_str", rclk_href: "q9_1__verse7_href", should_on: "q9_1__verse7_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_2__: { q3_2__not_yet_most: "off", }, },
		},
	};
	
	db.q11_1__ = { 
		htm_stm: "q11_1__new_earth",
		presentation: "q11_1__new_earth_sec",
		is_multi: true,
		answers: {
			q11_1__verse1_str: { htm_answ: "q11_1__verse1_str", rclk_href: "q11_1__verse1_href", should_on: "q11_1__verse1_should", },
			q11_1__verse2_str: { htm_answ: "q11_1__verse2_str", rclk_href: "q11_1__verse2_href", should_on: "q11_1__verse2_should", },
			q11_1__verse3_str: { htm_answ: "q11_1__verse3_str", rclk_href: "q11_1__verse3_href", should_on: "q11_1__verse3_should", },
			q11_1__verse4_str: { htm_answ: "q11_1__verse4_str", rclk_href: "q11_1__verse4_href", should_on: "q11_1__verse4_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_2__: { q3_2__new_earth: "off", }, },
		},
	};

	db.q12_1__ = { 
		htm_stm: "q12_1__sleep",
		presentation: "q12_1__sleep_sec",
		answers: {
			q12_1__no_consciousness: { htm_answ: "q12_1__no_consciousness", },
			q12_1__verse1_str: { htm_answ: "q12_1__verse1_str", rclk_href: "q12_1__verse1_href", },
			q12_1__verse2_str: { htm_answ: "q12_1__verse2_str", rclk_href: "q12_1__verse2_href", },
			q12_1__verse3_str: { htm_answ: "q12_1__verse3_str", rclk_href: "q12_1__verse3_href", },
			q12_1__verse4_str: { htm_answ: "q12_1__verse4_str", rclk_href: "q12_1__verse4_href", },
			q12_1__verse5_str: { htm_answ: "q12_1__verse5_str", rclk_href: "q12_1__verse5_href", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_2__: { q3_2__sleep: "off", }, },
		},
	};
	
	db.q12_rv1__ = { 
		htm_stm: "q12_1__response_to_verse1", 
		context: ["act"],
		activated_if: {
			c1: { q12_1__: { q12_1__verse1_str: "on", }, },
		},		
	};
	db.q12_rv2__ = { 
		htm_stm: "q12_1__response_to_verse2", 
		context: ["act"],
		activated_if: {
			c1: { q12_1__: { q12_1__verse2_str: "on", }, },
		},		
	};
	db.q12_rv3__ = { 
		htm_stm: "q12_1__response_to_verse3", 
		context: ["act"],
		activated_if: {
			c1: { q12_1__: { q12_1__verse3_str: "on", }, },
		},		
	};
	db.q12_rv4__ = { 
		htm_stm: "q12_1__response_to_verse4", 
		context: ["act"],
		activated_if: {
			c1: { q12_1__: { q12_1__verse4_str: "on", }, },
		},		
	};
	db.q12_rv5__ = { 
		htm_stm: "q12_1__response_to_verse5", 
		context: ["act"],
		activated_if: {
			c1: { q12_1__: { q12_1__verse5_str: "on", }, },
		},		
	};

	const all_q12_1__with_response = [
		rf.gen_15_15_obj, rf.gen_25_8_obj, rf.psa_16_11_obj, rf.isa_8_19_obj, rf.luk_15_24_obj, rf.luk_20_38_obj, rf.luk_23_43_obj, rf.jhn_4_24_obj, rf.act_7_59_obj, rf._2co_5_8_obj, rf._2co_12_4_obj, rf.phl_1_23_obj, rf._1th_4_14_obj, rf._1ti_5_6_obj, rf.heb_1_14_obj, rf._1pe_3_19_obj, 
	];
	
	db.q12_1__.vrs_with_response = all_q12_1__with_response;
	
	db.q12_resp1__ = add_response_observation("q12_1__", rf.gen_15_15_obj);
	db.q12_resp2__ = add_response_observation("q12_1__", rf.gen_25_8_obj);
	db.q12_resp3__ = add_response_observation("q12_1__", rf.psa_16_11_obj);
	db.q12_resp4__ = add_response_observation("q12_1__", rf.isa_8_19_obj);
	db.q12_resp5__ = add_response_observation("q12_1__", rf.luk_15_24_obj);
	db.q12_resp6__ = add_response_observation("q12_1__", rf.luk_20_38_obj);
	db.q12_resp7__ = add_response_observation("q12_1__", rf.luk_23_43_obj);
	db.q12_resp8__ = add_response_observation("q12_1__", rf.jhn_4_24_obj);
	db.q12_resp9__ = add_response_observation("q12_1__", rf.act_7_59_obj);
	db.q12_resp10__ = add_response_observation("q12_1__", rf._2co_5_8_obj);
	db.q12_resp11__ = add_response_observation("q12_1__", rf._2co_12_4_obj);
	db.q12_resp12__ = add_response_observation("q12_1__", rf.phl_1_23_obj);
	db.q12_resp13__ = add_response_observation("q12_1__", rf._1th_4_14_obj);
	db.q12_resp14__ = add_response_observation("q12_1__", rf._1ti_5_6_obj);
	db.q12_resp15__ = add_response_observation("q12_1__", rf.heb_1_14_obj);
	db.q12_resp16__ = add_response_observation("q12_1__", rf._1pe_3_19_obj);
	
	db.q13_1__ = { 
		htm_stm: "q13_1__sleep",
		is_multi: true,
		answers: {
			q13_1__verse1_str: { htm_answ: "q13_1__verse1_str", rclk_href: "q13_1__verse1_href", should_on: "q13_1__verse1_should", },
			q13_1__verse2_str: { htm_answ: "q13_1__verse2_str", rclk_href: "q13_1__verse2_href", should_on: "q13_1__verse2_should", },
			q13_1__verse3_str: { htm_answ: "q13_1__verse3_str", rclk_href: "q13_1__verse3_href", should_on: "q13_1__verse3_should", },
			q13_1__verse4_str: { htm_answ: "q13_1__verse4_str", rclk_href: "q13_1__verse4_href", should_on: "q13_1__verse4_should", },
			q13_1__verse5_str: { htm_answ: "q13_1__verse5_str", rclk_href: "q13_1__verse5_href", should_on: "q13_1__verse5_should", },
			q13_1__verse6_str: { htm_answ: "q13_1__verse6_str", rclk_href: "q13_1__verse6_href", should_on: "q13_1__verse6_should", },
			q13_1__verse7_str: { htm_answ: "q13_1__verse7_str", rclk_href: "q13_1__verse7_href", should_on: "q13_1__verse7_should", },
			q13_1__verse8_str: { htm_answ: "q13_1__verse8_str", rclk_href: "q13_1__verse8_href", should_on: "q13_1__verse8_should", },
		},
		context: ["act"],
		activated_if: {
			c1: { q3_3__: { q3_3__all_stms: "on", }, },
			c2: { q3_3__: { q3_3__not_believed: "on", }, q3_2__: { q3_2__sleep: "off", }, },
		},
	};
	
	db.q14_1__ = { 
		htm_stm: "q14_1__the_cloth",
		presentation: "q14_1__the_cloth_sec",
		answers: {
			q14_1__go: { htm_answ: "q14_1__go" },
			q14_1__stay: { htm_answ: "q14_1__stay" },
		},
	};
	
	
}
