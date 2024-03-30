
"use strict";

export const FIRST_EXAM_QUESTION_ID = "q1_1__";
//export const FIRST_EXAM_QUESTION_ID = "q1";
export const db_user_info = {};

export let db_nodes_exam = {};

//init_exam_database();
export function init_exam_database(){
	db_nodes_exam = {};
	const db = db_nodes_exam;

	db.q0_1__ = { 
		htm_stm: "q0_1__end_of_test",
	};
	
	db.q0_2__ = { 
		htm_stm: "q0_2__contradiction",
	};
	
	db.q1_1__ = { 
		htm_stm: "q1_1__are_you_reasonable",
		answers: [
			{ htm_answ: "q1_1__yes" },
			{ htm_answ: "q1_1__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q1_1__");
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q1_2__"];
				return;
			}
			this.all_nxt = ["q0_1__"];
			this.all_contra = ["q1_1__", "q0_1__"];
			//console.log(this);
		},
	};
	
	db.q1_2__ = { 
		htm_stm: "q1_2__experience_is_evidence",
		answers: [
			{ htm_answ: "q1_2__yes" },
			{ htm_answ: "q1_2__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q1_2__");
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q1_3__"];
				return;
			}
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q1_1__", "q1_2__", "q0_2__"];
			//console.log(this);
		},
	};
	
	db.q1_3__ = { 
		htm_stm: "q1_3__are_humans_intelligent",
		answers: [
			{ htm_answ: "q1_3__yes" },
			{ htm_answ: "q1_3__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q1_3__");
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q1_5__"];
				return;
			}
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q1_1__", "q1_3__", "q0_2__"];
			//console.log(this);
		},
	};
	
	db.q1_5__ = { 
		htm_stm: "q1_5__more_complex_than",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_5__airplane_vs_knife" },
			{ htm_answ: "q1_5__computer_vs_lamp" },
			{ htm_answ: "q1_5__cellphone_vs_clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q1_5__");
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q1_2__", "q1_5__", "q0_2__"];
				return;
			}
			this.all_nxt = ["q1_6__"];
			//console.log(this);
		},
	};
	
	db.q1_6__ = { 
		htm_stm: "q1_6__more_creativity_than",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_6__airplane_vs_knife" },
			{ htm_answ: "q1_6__computer_vs_lamp" },
			{ htm_answ: "q1_6__cellphone_vs_clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q1_6__");
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q1_2__", "q1_6__", "q0_2__"];
				return;
			}
			this.all_nxt = ["q1_7__"];
			//console.log(this);
		},
	};
	
	db.q1_7__ = { 
		htm_stm: "q1_7__more_complexity_then_more_creativity",
		answers: [
			{ htm_answ: "q1_7__yes" },
			{ htm_answ: "q1_7__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions in question q1_6__");
				return;
			}
			this.all_nxt = [];
			
			//const a0_on = this.answers[0].is_on;
			//const a1_on = this.answers[1].is_on;
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


