
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
*/

const msg2id = {};

const simgle_choice = 0;
const multiple_choice = 1;

const get_name = (nombre, apellido) => {
	return `Mi nombre completo es ${nombre} ${apellido}`;
};


const db_nodes_exam = {
	STARTING_EXAM_MESSAGE: msg_for_all_biological_machines,
	func_1:get_name,
	qid_1: { 
		is_multi: true,
		htm_stm: msg_for_all_biological_machines,
		v_min: -7000,
		answers: [
			{ htm_answ: msg_there_is_a_creator},
			{ htm_answ: msg_there_is_no_creator},
			{ htm_answ: msg_i_do_not_know_if_there_is_creator},
			{ htm_answ: msg_i_do_not_care_if_there_is_creator},
			{ htm_answ: msg_it_is_impossible_to_know_if_there_is_creator},
		],
		get_nxt: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.answers[0].is_on){ 
				return qid_2;
			}
			return qid_3;
		},
	},
	qid_2: { 
		htm_stm: msg_the_creator_for_all_biological_machines,
		v_min: -7000,
		answers: [
			{ htm_answ: msg_the_creator_has_technical_creativity},
			{ htm_answ: msg_the_creator_has_no_technical_creativity},
		],
	},
};

function get_msg_id(msg){
	return msg2id[msg];
}

function test1(){
	console.log("json_example");
	console.log(json_example);
	
	var key = "my_key";
	var val = "Jose Luis";
	
	
	json_example[key] = val;
	console.log(json_example);
	
	//json_example.[key] = val;
	//console.log(json_example);
	//console.log(`${key} = ${val}`);
	//console.log(JSON.stringify(json_example, null, "  "));
	//console.log(JSON.stringify(db_nodes_exam, null, "  "));
}

fill_msg2id();

function fill_msg2id(){
	for (const [qid, quest] of Object.entries(db_nodes_exam)) {
		const all_answ = quest.answers;
		if(all_answ){
			all_answ.forEach((an_answ) => {
				msg2id[an_answ.htm_answ] = qid;
			});
		}
		const q_stm = quest.htm_stm;
		if(q_stm){
			msg2id[q_stm] = qid;
		}
		//console.log(`${key} = ${value}`);
	}  
}

