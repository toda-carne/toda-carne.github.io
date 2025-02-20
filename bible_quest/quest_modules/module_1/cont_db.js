
import { get_verse_reponse_name, get_answer_key, init_poll_glb, add_response_observation, 
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

	db.THIS_MODULE_NAME = "MODULE_1";  // CAREFUL. Name of this module in firebase. OBLIGATORY FIELD.

	db.q_first_quest_mod_1__ = { 
		htm_stm: "q_first_quest_mod_1",
		answers: {
			a_simple_YES: { htm_answ: "q1_1__yes", },
			a_simple_NO: { htm_answ: "q1_1__no", },
		},
	};
	
	db.q_second_quest_mod_1__ = { 
		htm_stm: "q_second_quest_mod_1",
		answers: {
			a_simple_YES: { htm_answ: "q1_1__yes", },
			a_simple_NO: { htm_answ: "q1_1__no", },
		},
	};
	
	
}

