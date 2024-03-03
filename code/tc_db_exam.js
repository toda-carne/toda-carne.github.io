
"use strict";

// enum.js

/*
export function Enum(baseEnum) {  
	return new Proxy(baseEnum, {
		get(target, name) {
			if (!baseEnum.hasOwnProperty(name)) {
				throw new Error(`"${name}" value does not exist in the enum`)
			}
			return baseEnum[name]
		},
		set(target, name, value) {
			throw new Error('Cannot add a new value to the enum')
		}
	})
}

const Choice = Enum({
  single: 0,
  multiple: 1,
})

const get_name = (nombre, apellido) => {
	return `Mi nombre completo es ${nombre} ${apellido}`;
};
*/

const FIRST_EXAM_QUESTION_ID = "qid_1";
const db_nodes_exam = {};

init_exam_database();

function init_exam_database(){
	const db = db_nodes_exam;
	db.qid_1 = { 
		is_multi: false,
		htm_stm: "msg_for_all_biological_machines",
		v_min: -100,
		v_max: -500,
		answers: [
			{ htm_answ: "msg_there_is_a_creator" },
			{ htm_answ: "msg_there_is_no_creator" },
			{ htm_answ: "msg_i_do_not_know_if_there_is_creator" },
			{ htm_answ: "msg_i_do_not_care_if_there_is_creator" },
			{ htm_answ: "msg_it_is_impossible_to_know_if_there_is_creator" },
		],
		set_all_nxt: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Could NOT set_all_nxt in question " + qid);
				return;
			}
			if(this.answers[0].is_on){ 
				this.all_nxt = ["qid_2", "qid_5"];
				return;
			}
			this.all_nxt = ["qid_3", "qid_6"];
			//console.log(this);
		},
	};
	
	db.qid_2 = { 
		htm_stm: "msg_the_creator_for_all_biological_machines",
		v_min: -7000,
		answers: [
			{ htm_answ: "msg_the_creator_has_technical_creativity" },
			{ htm_answ: "msg_the_creator_has_no_technical_creativity" },
		],
	};
	
}


