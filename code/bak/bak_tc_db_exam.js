
"use strict";

//export const FIRST_EXAM_QUESTION_ID = "q1_1__";
//export const FIRST_EXAM_QUESTION_ID = "q1";
export const STARTING_QUESTIONS = ["q0_4__", "q1_1__"];
export const db_user_info = {};

export let db_nodes_exam = {};

export let answ_stack = [];

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
	
	db.q0_3__ = { 
		htm_stm: "q0_3__end_so_far",
	};
	
	db.q0_4__ = { 
		htm_stm: "q0_4__about_beliefs",
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
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q1_2__"];
				return;
			}
			this.all_nxt = ["q0_1__"];
			this.all_contra = ["q0_1__", "q1_1__"];
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
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q1_21__", "q1_3__"];
				return;
			}
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q1_2__"];
			//console.log(this);
		},
	};
	
	db.q1_3__ = { 
		htm_stm: "q1_3__are_humans_intelligent",
		presentation: "q1_21__creator_section",
		answers: [
			{ htm_answ: "q1_3__yes" },
			{ htm_answ: "q1_3__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			if(this.answers[0].is_on){ 
				this.all_nxt = ["q1_31__"];
				return;
			}
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q1_2__", "q1_3__"];
			//console.log(this);
		},
	};
	
	db.q1_31__ = { 
		htm_stm: "q1_31__all_biological_machines",
		answers: [
			{ htm_answ: "q1_31__creator" },
			{ htm_answ: "q1_31__other" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0 = this.answers[0].is_on;
			const a1 = this.answers[1].is_on;
			if(a0){ 
				this.all_nxt = ["q1_32__"];
				return;
			}
			this.all_nxt = ["q1_4__"];
			//console.log(this);
		},
	};
	
	db.q1_32__ = { 
		htm_stm: "q1_32__the_creator",
		answers: [
			{ htm_answ: "q1_32__intelligent" },
			{ htm_answ: "q1_32__not_intelligent" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0 = this.answers[0].is_on;
			const a1 = this.answers[1].is_on;
			if(a0){ 
				this.all_nxt = ["q1_33__"];
				return;
			}
			this.all_nxt = ["q1_4__"];
			return;
			//console.log(this);
		},
	};
	
	db.q1_33__ = { 
		htm_stm: "q1_33__the_evolution",
		answers: [
			{ htm_answ: "q1_33__yes" },
			{ htm_answ: "q1_33__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0 = this.answers[0].is_on;
			if(a0){ 
				this.all_nxt = ["q1_4__"];
				return;
			}
			this.all_nxt = ["q1_34__"];
			return;
			//console.log(this);
		},
	};
	
	db.q1_34__ = { 
		htm_stm: "q1_34__six_spins",
		answers: [
			{ htm_answ: "q1_34__yes" },
			{ htm_answ: "q1_34__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0 = this.answers[0].is_on;
			if(a0){ 
				this.all_nxt = ["q1_35__"];
				return;
			}
			this.all_nxt = ["q1_4__"];
			return;
			//console.log(this);
		},
	};
	
	db.q1_35__ = { 
		htm_stm: "q1_35__skip_creator_proof",
		answers: [
			{ htm_answ: "q1_35__yes" },
			{ htm_answ: "q1_35__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0 = this.answers[0].is_on;
			if(a0){ 
				this.all_nxt = ["q2_1__"];
				return;
			}
			this.all_nxt = ["q1_4__"];
			return;
			//console.log(this);
		},
	};
	
	db.q1_4__ = { 
		htm_stm: "q1_4__requires_technical_creativity",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_4__knife" },
			{ htm_answ: "q1_4__lamp" },
			{ htm_answ: "q1_4__clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q0_2__", "q1_2__", "q1_4__"];
				return;
			}
			this.all_nxt = ["q1_5__"];
			//console.log(this);
		},
	};
	
	db.q1_5__ = { 
		htm_stm: "q1_5__more_complex_than",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_5__building_vs_knife" },
			{ htm_answ: "q1_5__car_vs_lamp" },
			{ htm_answ: "q1_5__cellphone_vs_clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q0_2__", "q1_2__", "q1_5__"];
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
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			//const a1_on = this.answers[1].is_on;
			if(a0_on){ 
				this.all_nxt = ["q1_9__"];
				return;
			}
			this.all_nxt = ["q1_8__"];
		},
	};
	
	db.q1_8__ = { 
		htm_stm: "q1_8__more_creativity",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_8__building_vs_knife" },
			{ htm_answ: "q1_8__car_vs_lamp" },
			{ htm_answ: "q1_8__cellphone_vs_clock" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q0_2__", "q1_2__", "q1_8__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q1_2__", "q1_7__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q1_9__ = { 
		htm_stm: "q1_9__coplexity_of_biological_machines",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_9__car_vs_mitosis" },
			{ htm_answ: "q1_9__smartphone_vs_sex" },
			{ htm_answ: "q1_9__bicycle_vs_healing" },
			{ htm_answ: "q1_9__knife_vs_regeneration" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			const a3_on = this.answers[3].is_on;
			if(! a0_on || ! a1_on || ! a2_on || ! a3_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q0_2__", "q1_2__", "q1_9__"];
				return;
			}
			
			this.all_nxt = ["q1_91__"];
		},
	};
	
	db.q1_91__ = { 
		htm_stm: "q1_91__more_complexity_in_biology",
		answers: [
			{ htm_answ: "q1_91__yes" },
			{ htm_answ: "q1_91__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];
			
			const a0_on = this.answers[0].is_on;
			//const a1_on = this.answers[1].is_on;
			if(a0_on){ 
				this.all_nxt = ["q1_93__"];
				return;
			}
			this.all_nxt = ["q1_92__"];
		},
	};
	
	db.q1_92__ = { 
		htm_stm: "q1_92__human_complexity",
		is_multi: true,
		answers: [
			{ htm_answ: "q1_92__leg" },
			{ htm_answ: "q1_92__liver" },
			{ htm_answ: "q1_92__lung" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			const a2_on = this.answers[2].is_on;
			if(! a0_on || ! a1_on || ! a2_on){ 
				this.all_nxt = ["q0_2__"];
				this.all_contra = ["q0_2__", "q1_2__", "q1_92__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q1_2__", "q1_91__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q1_93__ = { 
		htm_stm: "q1_93__biological_requires_creativity",
		has_qrefs: true,
		answers: [
			{ htm_answ: "q1_93__yes" },
			{ htm_answ: "q1_93__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			if(a0_on){ 
				this.all_nxt = ["q1_94__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_7__", "q1_91__", "q1_93__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q1_94__ = { 
		htm_stm: "q1_94__if_human_then_creator",
		has_qrefs: true,
		answers: [
			{ htm_answ: "q1_94__yes" },
			{ htm_answ: "q1_94__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			if(a0_on){ 
				this.all_nxt = ["q2_1__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_93__", "q1_94__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q2_1__ = { 
		htm_stm: "q2_1__can_an_engineer_rebuild_his_house",
		presentation: "q2_0__reproduction_section",
		has_qrefs: true,
		answers: [
			{ htm_answ: "q2_1__yes" },
			{ htm_answ: "q2_1__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			const a1_on = this.answers[1].is_on;
			if(a0_on){ 
				this.all_nxt = ["q2_2__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q1_2__", "q2_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q2_2__ = { 
		htm_stm: "q2_2__future_resurrection",
		has_qrefs: true,
		answers: [
			{ htm_answ: "q2_2__yes" },
			{ htm_answ: "q2_2__no" },
		],
		set_reactions: function () {
			//console.log(` answers[0]=${this.answers[0].htm_answ} \n answers[1]=${this.answers[1].htm_answ} \n v_min=${this.v_min}`);
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
			this.all_nxt = [];

			const a0_on = this.answers[0].is_on;
			if(a0_on){ 
				this.all_nxt = ["q10_3__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q2_1__", "q2_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
}


