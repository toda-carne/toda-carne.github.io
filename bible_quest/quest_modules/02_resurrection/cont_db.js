
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
	
	db.q_physical_resu__ = { 
		choose_yes: true,
		context: ["ctx_jesus", "ctx_physical", ],
		htm_stm: "q_physical_resu",
		img_href: "jesus_and_diciples.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		
	};
	
	db.q_die_again__ = { 
		choose_yes: true,
		context: ["ctx_jesus", "ctx_die_again", ],
		htm_stm: "q_die_again",
		img_href: "tomb_garden.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	

	db.q_alive_in_body_and_spirit__ = { 
		choose_yes: true,
		context: ["ctx_jesus", "ctx_body_and_spirit", ],
		htm_stm: "q_alive_in_body_and_spirit",
		img_href: "jesus_throne.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	

	db.q_like_jesus__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_like_jesus", ],
		htm_stm: "q_like_jesus_body",
		img_href: "tomb_and_angels.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	

	db.q_for_all__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_for_all", ],
		htm_stm: "q_for_all",
		img_href: "all_people.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	

	db.q_not_yet__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_not_yet", ],
		htm_stm: "q_not_yet",
		img_href: "cemetery.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	

	db.q_new_earth__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_new_earth", ],
		htm_stm: "q_new_earth",
		img_href: "new_jerusalem_alone.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	

	db.o_is_about_bible__ = { 
		htm_stm: "o_is_about_bible",
		htm_nam: "o_is_about_bible_nm",
		context: ["ctx_points_resurr", ],
		activated_if: {
			c1: { q_physical_resu__: { a_simple_NO: "on", }, },
			c2: { q_die_again__: { a_simple_NO: "on", }, },
			c3: { q_alive_in_body_and_spirit__: { a_simple_NO: "on", }, },
			c4: { q_like_jesus__: { a_simple_NO: "on", }, },
			c5: { q_for_all__: { a_simple_NO: "on", }, },
			c6: { q_not_yet__: { a_simple_NO: "on", }, },
			c7: { q_new_earth__: { a_simple_NO: "on", }, },
		},
	};	

	db.q_jesus_physical__ = { 
		htm_stm: "q_jesus_physical",
		context: ["ctx_jesus_physical", ],
		presentation: "q4_1__physical_sec",
		is_multi: true,
		answers: {
			q4_1__verse1_str: { rclk_href: "q4_1__verse1_href", should_on: "q4_1__verse1_should", },
			q4_1__verse2_str: { rclk_href: "q4_1__verse2_href", should_on: "q4_1__verse2_should", },
			q4_1__verse3_str: { rclk_href: "q4_1__verse3_href", should_on: "q4_1__verse3_should", },
			q4_1__verse4_str: { rclk_href: "q4_1__verse4_href", should_on: "q4_1__verse4_should", },
			q4_1__verse5_str: { rclk_href: "q4_1__verse5_href", should_on: "q4_1__verse5_should", },
			q4_1__verse6_str: { rclk_href: "q4_1__verse6_href", should_on: "q4_1__verse6_should", },
			q4_1__verse7_str: { rclk_href: "q4_1__verse7_href", should_on: "q4_1__verse7_should", },
		},
		activated_if: {
			c1: { q_physical_resu__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_denial_physical_resu__ = { 
		htm_stm: "o_denial_physical_resu",
		htm_nam: "o_denial_physical_resu_nm",
		context: ["ctx_jesus_physical", ],
		activated_if: {
			c1: { q_jesus_physical__: { q4_1__verse1_str: "off", }, },
			c2: { q_jesus_physical__: { q4_1__verse2_str: "off", }, },
			c3: { q_jesus_physical__: { q4_1__verse3_str: "off", }, },
			c4: { q_jesus_physical__: { q4_1__verse4_str: "off", }, },
			c5: { q_jesus_physical__: { q4_1__verse5_str: "off", }, },
			c6: { q_jesus_physical__: { q4_1__verse6_str: "off", }, },
			c7: { q_jesus_physical__: { q4_1__verse7_str: "off", }, },
		},
	};	

	db.q_jesus_not_die__ = { 
		htm_stm: "q_jesus_not_die",
		context: ["ctx_jesus_not_die", ],
		presentation: "q5_1__not_die_sec",
		is_multi: true,
		answers: {
			q5_1__verse1_str: { rclk_href: "q5_1__verse1_href", should_on: "q5_1__verse1_should", },
			q5_1__verse2_str: { rclk_href: "q5_1__verse2_href", should_on: "q5_1__verse2_should", },
			q5_1__verse3_str: { rclk_href: "q5_1__verse3_href", should_on: "q5_1__verse3_should", },
			q5_1__verse4_str: { rclk_href: "q5_1__verse4_href", should_on: "q5_1__verse4_should", },
		},
		activated_if: {
			c1: { q_die_again__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_denial_die_again__ = { 
		htm_stm: "o_denial_die_again",
		htm_nam: "o_denial_die_again_nm",
		context: ["ctx_jesus_not_die", ],
		activated_if: {
			c1: { q_jesus_not_die__: { q5_1__verse1_str: "off", }, },
			c2: { q_jesus_not_die__: { q5_1__verse2_str: "off", }, },
			c3: { q_jesus_not_die__: { q5_1__verse3_str: "off", }, },
			c4: { q_jesus_not_die__: { q5_1__verse4_str: "off", }, },
		},
	};	

	db.jesus_in_heaven__ = { 
		htm_stm: "q6_1__in_heaven",
		context: ["ctx_jesus_body_and_spirit", ],
		presentation: "q6_1__in_heaven_sec",
		is_multi: true,
		answers: {
			q6_1__verse1_str: { rclk_href: "q6_1__verse1_href", should_on: "q6_1__verse1_should", },
			q6_1__verse2_str: { rclk_href: "q6_1__verse2_href", should_on: "q6_1__verse2_should", },
			q6_1__verse3_str: { rclk_href: "q6_1__verse3_href", should_on: "q6_1__verse3_should", },
			q6_1__verse4_str: { rclk_href: "q6_1__verse4_href", should_on: "q6_1__verse4_should", },
			q6_1__verse5_str: { rclk_href: "q6_1__verse5_href", should_on: "q6_1__verse5_should", },
			q6_1__verse6_str: { rclk_href: "q6_1__verse6_href", should_on: "q6_1__verse6_should", },
			q6_1__verse7_str: { rclk_href: "q6_1__verse7_href", should_on: "q6_1__verse7_should", },
		},
		activated_if: {
			c1: { q_alive_in_body_and_spirit__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_denial_alive_in_body_and_spirit__ = { 
		htm_stm: "o_denial_alive_in_body_and_spirit",
		htm_nam: "o_denial_alive_in_body_and_spirit_nm",
		context: ["ctx_jesus_body_and_spirit", ],
		activated_if: {
			c1: { jesus_in_heaven__: { q6_1__verse1_str: "off", }, },
			c2: { jesus_in_heaven__: { q6_1__verse2_str: "off", }, },
			c3: { jesus_in_heaven__: { q6_1__verse3_str: "off", }, },
			c4: { jesus_in_heaven__: { q6_1__verse4_str: "off", }, },
			c5: { jesus_in_heaven__: { q6_1__verse5_str: "off", }, },
			c6: { jesus_in_heaven__: { q6_1__verse6_str: "off", }, },
			c7: { jesus_in_heaven__: { q6_1__verse7_str: "off", }, },
		},
	};	

	db.ours_like_jesus__ = { 
		htm_stm: "q7_1__like_jesus",
		context: ["ctx_people_like_jesus", ],
		presentation: "q7_1__like_jesus_sec",
		is_multi: true,
		answers: {
			q7_1__verse1_str: { rclk_href: "q7_1__verse1_href", should_on: "q7_1__verse1_should", },
			q7_1__verse2_str: { rclk_href: "q7_1__verse2_href", should_on: "q7_1__verse2_should", },
			q7_1__verse3_str: { rclk_href: "q7_1__verse3_href", should_on: "q7_1__verse3_should", },
			q7_1__verse4_str: { rclk_href: "q7_1__verse4_href", should_on: "q7_1__verse4_should", },
			q7_1__verse5_str: { rclk_href: "q7_1__verse5_href", should_on: "q7_1__verse5_should", },
			q7_1__verse6_str: { rclk_href: "q7_1__verse6_href", should_on: "q7_1__verse6_should", },
		},
		activated_if: {
			c1: { q_like_jesus__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_denial_like_jesus_body__ = { 
		htm_stm: "o_denial_like_jesus_body",
		htm_nam: "o_denial_like_jesus_body_nm",
		context: ["ctx_people_like_jesus", ],
		activated_if: {
			c1: { ours_like_jesus__: { q7_1__verse1_str: "off", }, },
			c2: { ours_like_jesus__: { q7_1__verse2_str: "off", }, },
			c3: { ours_like_jesus__: { q7_1__verse3_str: "off", }, },
			c4: { ours_like_jesus__: { q7_1__verse4_str: "off", }, },
			c5: { ours_like_jesus__: { q7_1__verse5_str: "off", }, },
			c6: { ours_like_jesus__: { q7_1__verse6_str: "off", }, },
		},
	};	

	db.ours_for_all__ = { 
		htm_stm: "q8_1__for_all",
		context: ["ctx_people_for_all", ],
		presentation: "q8_1__for_all_sec",
		is_multi: true,
		answers: {
			q8_1__verse1_str: { rclk_href: "q8_1__verse1_href", should_on: "q8_1__verse1_should", },
			q8_1__verse2_str: { rclk_href: "q8_1__verse2_href", should_on: "q8_1__verse2_should", },
			q8_1__verse3_str: { rclk_href: "q8_1__verse3_href", should_on: "q8_1__verse3_should", },
			q8_1__verse4_str: { rclk_href: "q8_1__verse4_href", should_on: "q8_1__verse4_should", },
			q8_1__verse5_str: { rclk_href: "q8_1__verse5_href", should_on: "q8_1__verse5_should", },
			q8_1__verse6_str: { rclk_href: "q8_1__verse6_href", should_on: "q8_1__verse6_should", },
		},
		activated_if: {
			c1: { q_for_all__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_denial_for_all__ = { 
		htm_stm: "o_denial_for_all",
		htm_nam: "o_denial_for_all_nm",
		context: ["ctx_people_for_all", ],
		activated_if: {
			c1: { ours_for_all__: { q8_1__verse1_str: "off", }, },
			c2: { ours_for_all__: { q8_1__verse2_str: "off", }, },
			c3: { ours_for_all__: { q8_1__verse3_str: "off", }, },
			c4: { ours_for_all__: { q8_1__verse4_str: "off", }, },
			c5: { ours_for_all__: { q8_1__verse5_str: "off", }, },
			c6: { ours_for_all__: { q8_1__verse6_str: "off", }, },
		},
	};	

	db.ours_not_yet__ = { 
		htm_stm: "q9_1__not_yet",
		context: ["ctx_people_not_yet", ],
		presentation: "q9_1__not_yet_sec",
		is_multi: true,
		answers: {
			q9_1__verse1_str: { rclk_href: "q9_1__verse1_href", should_on: "q9_1__verse1_should", },
			q9_1__verse2_str: { rclk_href: "q9_1__verse2_href", should_on: "q9_1__verse2_should", },
			q9_1__verse3_str: { rclk_href: "q9_1__verse3_href", should_on: "q9_1__verse3_should", },
			q9_1__verse4_str: { rclk_href: "q9_1__verse4_href", should_on: "q9_1__verse4_should", },
			q9_1__verse5_str: { rclk_href: "q9_1__verse5_href", should_on: "q9_1__verse5_should", },
			q9_1__verse6_str: { rclk_href: "q9_1__verse6_href", should_on: "q9_1__verse6_should", },
			q9_1__verse7_str: { rclk_href: "q9_1__verse7_href", should_on: "q9_1__verse7_should", },
		},
		activated_if: {
			c1: { q_not_yet__: { a_simple_NO: "on", }, },
		},
	};
	
	db.o_denial_not_yet__ = { 
		htm_stm: "o_denial_not_yet",
		htm_nam: "o_denial_not_yet_nm",
		context: ["ctx_people_not_yet", ],
		activated_if: {
			c1: { ours_not_yet__: { q9_1__verse1_str: "off", }, },
			c2: { ours_not_yet__: { q9_1__verse2_str: "off", }, },
			c3: { ours_not_yet__: { q9_1__verse3_str: "off", }, },
			c4: { ours_not_yet__: { q9_1__verse4_str: "off", }, },
			c5: { ours_not_yet__: { q9_1__verse5_str: "off", }, },
			c6: { ours_not_yet__: { q9_1__verse6_str: "off", }, },
			c7: { ours_not_yet__: { q9_1__verse7_str: "off", }, },
		}
	};	

	db.ours_in_new_earth__ = { 
		htm_stm: "q11_1__new_earth",
		context: ["ctx_people_new_earth", ],
		presentation: "q11_1__new_earth_sec",
		is_multi: true,
		answers: {
			q11_1__verse1_str: { rclk_href: "q11_1__verse1_href", should_on: "q11_1__verse1_should", },
			q11_1__verse2_str: { rclk_href: "q11_1__verse2_href", should_on: "q11_1__verse2_should", },
			q11_1__verse3_str: { rclk_href: "q11_1__verse3_href", should_on: "q11_1__verse3_should", },
			q11_1__verse4_str: { rclk_href: "q11_1__verse4_href", should_on: "q11_1__verse4_should", },
		},
		activated_if: {
			c1: { q_new_earth__: { a_simple_NO: "on", }, },
		},
	};

	db.o_denial_new_earth__ = { 
		htm_stm: "o_denial_new_earth",
		htm_nam: "o_denial_new_earth_nm",
		context: ["ctx_people_new_earth", ],
		activated_if: {
			c1: { ours_in_new_earth__: { q11_1__verse1_str: "off", }, },
			c2: { ours_in_new_earth__: { q11_1__verse2_str: "off", }, },
			c3: { ours_in_new_earth__: { q11_1__verse3_str: "off", }, },
			c4: { ours_in_new_earth__: { q11_1__verse4_str: "off", }, },
		}
	};	

}

// 	c1: { q1_7__: { shown: "on", }, q1_91__: { shown: "on", }, q1_70__: { shown: "off", }, q1_91_0__: { shown: "off", }, },
