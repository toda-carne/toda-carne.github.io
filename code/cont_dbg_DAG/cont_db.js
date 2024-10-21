
import { get_book_nam, get_verse_reponse_name, get_verse_cit_key, refs_ids, glb_all_bibrefs, init_poll_glb, 
	add_sections, set_all_on, has_all_next, are_only_all_orig_on, get_first_added_on, get_response_qid, add_reponse_questions, 
} from '../tc_lang_all.js';

import { init_answers } from '../tc_exam.js';

"use strict";

const db_user_info = {};
const STARTING_QUESTIONS = [];
let db_nodes_exam = {};

export function init_exam_database(){
	db_nodes_exam = {};
	init_poll_glb(db_user_info, STARTING_QUESTIONS, db_nodes_exam);
	
	const db = db_nodes_exam;
	const rf = glb_all_bibrefs;

	db.q0_1__ = { 
		htm_stm: "q0_1__end_of_test",
	};
	
	db.q0_2__ = { 
		htm_stm: "q0_2__contradiction",
	};
	
	db.q0_3__ = { 
		htm_stm: "q0_3__end_so_far",
	};
	
	db.q0_4__ = { 
		htm_stm: "q0_4__about_beliefs",
	};
	
	db.q1_1__ = { 
		is_base_question: true,
		htm_stm: "q1_1__are_you_reasonable",
		//pos_txt: "q1_1__pru_pos_txt", // uncomment to debug pos_txt
		//v_min: -500,  // uncomment to debug sort
		//v_max: 200,  // uncomment to debug sort
		answers: {
			q1_1__yes: { htm_answ: "q1_1__yes", 
				should_on: "q1_1__should_yes",
				rclk_href: "q1_1__pru_href", // uncomment to debug right_click 
				//rclk_should_href: "q1_1__pru_should_href", // uncomment to debug right_click of should_href
			},
			q1_1__no: { htm_answ: "q1_1__no" },
		},
	};
	
	db.q1_10__ = { 
		is_inconsistency: true,
		htm_stm: "q0_2__contradiction",
		activated_if: {
			c1: { q1_1__: { q1_1__no: "on", }, },
		},
	};
	
	db.q1_2__ = { 
		is_base_question: true,
		htm_stm: "q1_2__experience_is_evidence",
		answers: {
			q1_2__yes: { htm_answ: "q1_2__yes" },
			q1_2__no: { htm_answ: "q1_2__no" },
		},
	};
	
	db.q1_3__ = { 
		is_base_question: true,
		htm_stm: "q1_3__are_humans_intelligent",
		presentation: "q1_3__creator_section",
		answers: {
			q1_3__yes: { htm_answ: "q1_3__yes", should_on: "q1_3__should", },
			q1_3__no: { htm_answ: "q1_3__no" },
		},
	};
	
	db.q1_31__ = { 
		is_base_question: true,
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
		activated_if: {
			c1: { q1_31__: { q1_31__creator: "on", }, },
		},
	};
	
	db.q1_33__ = { 
		is_base_question: true,
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
		activated_if: {
			c1: { q1_31__: { q1_31__creator: "on", }, },
		},
	};
	
	db.q1_35__ = { 
		htm_stm: "q1_35__skip_creator_proof",
		answers: {
			q1_35__yes: { htm_answ: "q1_35__yes" },
			q1_35__no: { htm_answ: "q1_35__no" },
		},
		activated_if: {
			c1: { q1_32__: { q1_32__intelligent: "on", }, q1_33__: { q1_33__no: "on", }, q1_34__: { q1_34__yes: "on", }, },
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
		activated_if: { 
			c1: { q1_31__: { q1_31__other: "on", }, },
			c2: { q1_32__: { q1_32__not_intelligent: "on", }, },
			c3: { q1_33__: { q1_33__yes: "on", }, },
			c4: { q1_34__: { q1_34__no: "on", }, },
			c5: { q1_35__: { q1_35__yes: "on", }, },
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
	
	db.q1_7__ = { 
		htm_stm: "q1_7__more_complexity_then_more_creativity",
		answers: {
			q1_7__yes: { htm_answ: "q1_7__yes" },
			q1_7__no: { htm_answ: "q1_7__no" },
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
	
	db.q1_91__ = { 
		htm_stm: "q1_91__more_complexity_in_biology",
		answers: {
			q1_91__yes: { htm_answ: "q1_91__yes" },
			q1_91__no: { htm_answ: "q1_91__no" },
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
	
	db.q1_93__ = { 
		htm_stm: "q1_93__biological_requires_creativity",
		has_qrefs: true,
		answers: {
			q1_93__yes: { htm_answ: "q1_93__yes" },
			q1_93__no: { htm_answ: "q1_93__no" },
		},
	};
	
	db.q1_94__ = { 
		htm_stm: "q1_94__if_human_then_creator",
		has_qrefs: true,
		answers: {
			q1_94__yes: { htm_answ: "q1_94__yes" },
			q1_94__no: { htm_answ: "q1_94__no" },
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
	
	db.q2_2__ = { 
		htm_stm: "q2_2__future_resurrection",
		has_qrefs: true,
		answers: {
			q2_2__yes: { htm_answ: "q2_2__yes" },
			q2_2__no: { htm_answ: "q2_2__no" },
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
		sections: {
			q3_1__physical: "q4_1__",
			q3_1__not_to_die: "q5_1__",
			q3_1__in_heaven: "q6_1__",
			q3_2__like_jesus: "q7_1__",
			q3_2__for_all: "q8_1__",
			q3_2__not_yet_most: "q9_1__",
			q3_2__new_earth: "q11_1__",
			q3_2__sleep: "q12_1__",
		},
		nxt_sec: {
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
	};

	const all_q12_1__with_response = [
		rf.gen_15_15_obj, rf.gen_25_8_obj, rf.psa_16_11_obj, rf.isa_8_19_obj, rf.luk_15_24_obj, rf.luk_20_38_obj, rf.luk_23_43_obj, rf.jhn_4_24_obj, rf.act_7_59_obj, rf._2co_5_8_obj, rf._2co_12_4_obj, rf.phl_1_23_obj, rf._1th_4_14_obj, rf._1ti_5_6_obj, rf.heb_1_14_obj, rf._1pe_3_19_obj, 
	];
	add_reponse_questions(db, "q12_1__", all_q12_1__with_response);

	db.q12_1__ = { 
		htm_stm: "q12_1__sleep",
		presentation: "q12_1__sleep_sec",
		//is_multi: true,
		answers: {
			q12_1__no_consciousness: { htm_answ: "q12_1__no_consciousness", },
			q12_1__verse1_str: { htm_answ: "q12_1__verse1_str", rclk_href: "q12_1__verse1_href", },
			q12_1__verse2_str: { htm_answ: "q12_1__verse2_str", rclk_href: "q12_1__verse2_href", },
			q12_1__verse3_str: { htm_answ: "q12_1__verse3_str", rclk_href: "q12_1__verse3_href", },
			q12_1__verse4_str: { htm_answ: "q12_1__verse4_str", rclk_href: "q12_1__verse4_href", },
			q12_1__verse5_str: { htm_answ: "q12_1__verse5_str", rclk_href: "q12_1__verse5_href", },
		},
		vrs_with_response: all_q12_1__with_response,
		// stg_with_response: [],
		// lnk_with_response: [],
	};
	
	db.q12_rv1__ = { htm_stm: "q12_1__response_to_verse1", };
	db.q12_rv2__ = { htm_stm: "q12_1__response_to_verse2", };
	db.q12_rv3__ = { htm_stm: "q12_1__response_to_verse3", };
	db.q12_rv4__ = { htm_stm: "q12_1__response_to_verse4", };
	db.q12_rv5__ = { htm_stm: "q12_1__response_to_verse5", };
	
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

