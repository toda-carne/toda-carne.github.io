
import { get_verse_reponse_name, get_answer_key, init_poll_glb, 
	gvar,
	//glb_all_bibrefs, 
} from '../../code/bq_tools.js';

"use strict";

let db_nodes_exam = {};

export function init_exam_database(){
	db_nodes_exam = {};
	init_poll_glb(db_nodes_exam);
	
	const db = db_nodes_exam;
	const rf = gvar.glb_all_bibrefs;

	db.q_first_quest_mod_5__ = { 
		htm_stm: "q_first_quest_mod_5",
		answers: {
			a_simple_YES: {},
			a_simple_NO: {},
		},
	};
	
	db.q_second_quest_mod_5__ = { 
		htm_stm: "q_second_quest_mod_5",
		answers: {
			a_simple_YES: {},
			a_simple_NO: {},
		},
	};
	
	
}

