
import { init_poll_glb, gvar, add_response_observation, } from '../../code/bq_tools.js';

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
	
	db.q_sleep__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_sleep", ],
		htm_stm: "q_sleep",
		img_href: "candle_smoking.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
	};	
	
	db.q_jesus_died__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_sleep", ],
		htm_stm: "q_jesus_died",
		img_href: "jesus_on_the_cross.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_sleep__: { a_simple_NO: "on", }, },
		},
	};	
	
	db.q_jesus_eternal__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_sleep", ],
		htm_stm: "q_jesus_eternal",
		img_href: "jesus_tomb.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_sleep__: { a_simple_NO: "on", }, },
		},
	};	
	
	db.q_eternal_life__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_sleep", ],
		htm_stm: "q_eternal_life",
		img_href: "jesus_and_diciples.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { q_sleep__: { a_simple_NO: "on", }, },
		},
	};	
	
	db.q_no_knowledge_in_death__ = { 
		choose_yes: true,
		context: ["ctx_people", "ctx_sleep", ],
		htm_stm: "q_no_knowledge_in_death",
		img_href: "jesus_no_knowledge.webp", 
		answers: {
			a_simple_YES: { img_pos: rgt, },
			a_simple_NO: { img_pos: lft, },
		},
		activated_if: {
			c1: { 	q_jesus_died__: { a_simple_YES: "on", }, 
					q_jesus_eternal__: { a_simple_YES: "on", }, 
					q_eternal_life__: { a_simple_YES: "on", }, },
		},
	};	
	
	// q3_3__

	db.q12_1__ = { 
		htm_stm: "q12_1__sleep",
		context: ["resurrection", "people", "sleep", ],
		presentation: "q12_1__sleep_sec",
		answers: {
			q12_1__no_consciousness: { },
			q12_1__verse1_str: { rclk_href: "q12_1__verse1_href", },
			q12_1__verse2_str: { rclk_href: "q12_1__verse2_href", },
			q12_1__verse3_str: { rclk_href: "q12_1__verse3_href", },
			q12_1__verse4_str: { rclk_href: "q12_1__verse4_href", },
			q12_1__verse5_str: { rclk_href: "q12_1__verse5_href", },
		},
		activated_if: {
			c1: { q_sleep__: { a_simple_NO: "on", }, },
		},
	};
	
	db.q12_rv1__ = { 
		htm_stm: "q12_1__response_to_verse1", 
		context: ["resurrection", "people", "sleep", ],
		activated_if: {
			c1: { q12_1__: { q12_1__verse1_str: "on", }, },
		},		
	};
	db.q12_rv2__ = { 
		htm_stm: "q12_1__response_to_verse2", 
		context: ["resurrection", "people", "sleep", ],
		activated_if: {
			c1: { q12_1__: { q12_1__verse2_str: "on", }, },
		},		
	};
	db.q12_rv3__ = { 
		htm_stm: "q12_1__response_to_verse3", 
		context: ["resurrection", "people", "sleep", ],
		activated_if: {
			c1: { q12_1__: { q12_1__verse3_str: "on", }, },
		},		
	};
	db.q12_rv4__ = { 
		htm_stm: "q12_1__response_to_verse4", 
		context: ["resurrection", "people", "sleep", ],
		activated_if: {
			c1: { q12_1__: { q12_1__verse4_str: "on", }, },
		},		
	};
	db.q12_rv5__ = { 
		htm_stm: "q12_1__response_to_verse5", 
		context: ["resurrection", "people", "sleep", ],
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
		context: ["resurrection", "people", "sleep_analysis", ],
		is_multi: true,
		answers: {
			q13_1__verse1_str: { rclk_href: "q13_1__verse1_href", should_on: "q13_1__verse1_should", },
			q13_1__verse2_str: { rclk_href: "q13_1__verse2_href", should_on: "q13_1__verse2_should", },
			q13_1__verse3_str: { rclk_href: "q13_1__verse3_href", should_on: "q13_1__verse3_should", },
			q13_1__verse4_str: { rclk_href: "q13_1__verse4_href", should_on: "q13_1__verse4_should", },
			q13_1__verse5_str: { rclk_href: "q13_1__verse5_href", should_on: "q13_1__verse5_should", },
			q13_1__verse6_str: { rclk_href: "q13_1__verse6_href", should_on: "q13_1__verse6_should", },
			q13_1__verse7_str: { rclk_href: "q13_1__verse7_href", should_on: "q13_1__verse7_should", },
			q13_1__verse8_str: { rclk_href: "q13_1__verse8_href", should_on: "q13_1__verse8_should", },
		},
	};
	

}

// 	c1: { q1_7__: { shown: "on", }, q1_91__: { shown: "on", }, q1_70__: { shown: "off", }, q1_91_0__: { shown: "off", }, },


// Is sheol the same place as hades? YES david went to hades.
// Can you know things in Sheol. NO but deniers will say yes.
// what is the ETARNAL LIFE: TO KNOW THE FATHER AND THE SON.
// Jesus refers to physically alive people as DEAD if they do not know him.
// Paul says that we were DEAD before starting to know Jesus.
// The consequense of SIN is DEATH both spiritual and physical.
// I am the LIFE said Jesus.
/*
THe argument:
If Jesus had to die spiritually to to pay for our sins and if he could, while he was physically dead, KNOW things like the father and himself, which is etarnal life, THEN he did not die spiritually and we are still in our sins

1. The consequense of SIN is death.
2. Death, both spiritual and physical, enter the world since Adam's sin.
3. Jesus died for our sins, so that we could have Eternal Life.
4. Spiritual life is at least equally important, if not much more important, than physical life.
5. Eternal life is Spiritual life in Jesus Chist.
6. God is Spirit.

4. If we do not know Jesus we are still spiritually dead.
5. Jesus did not loose his knowledge while he was physically dead.

1. Jesus had to die not only physically but also spiritually.
2. Eternal life is to know the father and know Jesus.
3. Jesus could know things while he was dead.
_____________________________________________
Jesus did not die spiritually.


1. Jesus did not loose his memory nor his knowledge while he was physically dead.
2. Jesus could know himself.
3. Jesus could know God.
4. Jesus had spiritual life.


*/

