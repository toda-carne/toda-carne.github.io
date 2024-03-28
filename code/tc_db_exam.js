
"use strict";

export const FIRST_EXAM_QUESTION_ID = "q0_1";
//export const FIRST_EXAM_QUESTION_ID = "q1";
export const db_user_info = {};

export let db_nodes_exam = {};

//init_exam_database();
export function init_exam_database(){
	db_nodes_exam = {};
	const db = db_nodes_exam;

	db.q0_0_1 = { 
		htm_stm: "q0_0_1_end_of_test",
	};
	
	db.q0_0_2 = { 
		htm_stm: "q0_0_2_contradiction",
	};
	
	db.q0_1 = { 
		htm_stm: "q0_1_are_you_reasonable",
		answers: [
			{ htm_answ: "q0_1_yes" },
			{ htm_answ: "q0_1_no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q0_1");
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q0_4"];
				return;
			}
			this.all_nxt = ["q0_0_1"];
			this.all_contra = ["q0_1", "q0_0_1"];
			//console.log(this);
		},
	};
	
	db.q0_2 = { 
		htm_stm: "q0_2_are_humans_intelligent",
		answers: [
			{ htm_answ: "q0_2_yes" },
			{ htm_answ: "q0_2_no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q0_2");
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q0_5"];
				return;
			}
			this.all_nxt = ["q0_0_2"];
			this.all_contra = ["q0_1", "q0_2", "q0_0_2"];
			//console.log(this);
		},
	};
	
	db.q0_4 = { 
		htm_stm: "q0_4_experience_is_evidence",
		answers: [
			{ htm_answ: "q0_4_yes" },
			{ htm_answ: "q0_4_no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q0_4");
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q0_2"];
				return;
			}
			this.all_nxt = ["q0_0_2"];
			this.all_contra = ["q0_1", "q0_4", "q0_0_2"];
			//console.log(this);
		},
	};
	
	db.q0_5 = { 
		htm_stm: "q0_5_more_complex_than",
		is_multi: true,
		answers: [
			{ htm_answ: "q0_5_airplane_vs_knife" },
			{ htm_answ: "q0_5_computer_vs_lamp" },
			{ htm_answ: "q0_5_cellphone_vs_clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q0_5");
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_0_2"];
				this.all_contra = ["q0_4", "q0_5", "q0_0_2"];
				return;
			}
			this.all_nxt = ["q0_6"];
			//console.log(this);
		},
	};
	
	db.q0_6 = { 
		htm_stm: "q0_6_more_creativity_than",
		is_multi: true,
		answers: [
			{ htm_answ: "q0_6_airplane_vs_knife" },
			{ htm_answ: "q0_6_computer_vs_lamp" },
			{ htm_answ: "q0_6_cellphone_vs_clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q0_5");
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_0_2"];
				return;
			}
			//console.log(this);
		},
	};
	
	db.q1 = { 
		htm_stm: "q1_for_all_biological_machines",
		//v_min: -100,
		//v_max: -500,
		answers: [
			{ htm_answ: "q1_there_is_a_creator" },
			{ htm_answ: "q1_there_is_no_creator" },
			{ htm_answ: "q1_i_do_not_know_if_there_is_creator" },
			{ htm_answ: "q1_i_do_not_care_if_there_is_creator" },
			{ htm_answ: "q1_it_is_impossible_to_know_if_there_is_creator" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question " + qid);
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q2"];
				return;
			}
			//console.log(this);
		},
	};
	
	db.q2 = { 
		htm_stm: "q2_the_creator_for_all_biological_machines",
		//v_min: -7000,
		answers: [
			{ htm_answ: "q2_the_creator_has_technical_creativity" },
			{ htm_answ: "q2_the_creator_has_no_technical_creativity" },
		],
	};
		
}


