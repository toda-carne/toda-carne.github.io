
import { refs_ids } from './tc_lang_all.js';
import { init_answers } from './tc_exam.js';

"use strict";

export const STARTING_QUESTIONS = ["q0_4__", "q1_1__"];
export const db_user_info = {};

export let db_nodes_exam = {};

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
		//pos_txt: "q1_1__pru_pos_txt", // uncomment to debug pos_txt
		//v_min: -500,  // uncomment to debug sort
		//v_max: 200,  // uncomment to debug sort
		answers: {
			r0: { htm_answ: "q1_1__yes", 
				should_on: "q1_1__should_yes",
				rclk_href: "q1_1__pru_href", // uncomment to debug right_click 
				//rclk_should_href: "q1_1__pru_should_href", // uncomment to debug right_click of should_href
			},
			r1: { htm_answ: "q1_1__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			if(this.answers.r0.is_on){ 
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
		answers: {
			r0: { htm_answ: "q1_2__yes" },
			r1: { htm_answ: "q1_2__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			if(this.answers.r0.is_on){ 
				this.all_nxt = ["q1_3__"];
				return;
			}
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q1_2__"];
			//console.log(this);
		},
	};
	
	db.q1_3__ = { 
		htm_stm: "q1_3__are_humans_intelligent",
		presentation: "q1_3__creator_section",
		answers: {
			r0: { htm_answ: "q1_3__yes", should_on: "q1_3__should", },
			r1: { htm_answ: "q1_3__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			if(this.answers.r0.is_on){ 
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
		answers: {
			r0: { htm_answ: "q1_31__creator" },
			r1: { htm_answ: "q1_31__other" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0 = this.answers.r0.is_on;
			const a1 = this.answers.r1.is_on;
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
		answers: {
			r0: { htm_answ: "q1_32__intelligent" },
			r1: { htm_answ: "q1_32__not_intelligent" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0 = this.answers.r0.is_on;
			const a1 = this.answers.r1.is_on;
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
		answers: {
			r0: { htm_answ: "q1_33__yes" },
			r1: { htm_answ: "q1_33__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0 = this.answers.r0.is_on;
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
		answers: {
			r0: { htm_answ: "q1_34__yes" },
			r1: { htm_answ: "q1_34__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0 = this.answers.r0.is_on;
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
		answers: {
			r0: { htm_answ: "q1_35__yes" },
			r1: { htm_answ: "q1_35__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0 = this.answers.r0.is_on;
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
		answers: {
			r0: { htm_answ: "q1_4__knife", should_on: "q1_4__should1", },
			r1: { htm_answ: "q1_4__lamp", should_on: "q1_4__should2", },
			r2: { htm_answ: "q1_4__clock", should_on: "q1_4__should3", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
			const a2_on = this.answers.r2.is_on;
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
		answers: {
			r0: { htm_answ: "q1_5__building_vs_knife", should_on: "q1_5__should1", },
			r1: { htm_answ: "q1_5__car_vs_lamp", should_on: "q1_5__should2", },
			r2: { htm_answ: "q1_5__cellphone_vs_clock", should_on: "q1_5__should3", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
			const a2_on = this.answers.r2.is_on;
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
		answers: {
			r0: { htm_answ: "q1_7__yes" },
			r1: { htm_answ: "q1_7__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0_on = this.answers.r0.is_on;
			//const a1_on = this.answers.r1.is_on;
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
		answers: {
			r0: { htm_answ: "q1_8__building_vs_knife" },
			r1: { htm_answ: "q1_8__car_vs_lamp" },
			r2: { htm_answ: "q1_8__cellphone_vs_clock" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
			const a2_on = this.answers.r2.is_on;
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
		answers: {
			r0: { htm_answ: "q1_9__car_vs_mitosis" },
			r1: { htm_answ: "q1_9__smartphone_vs_sex" },
			r2: { htm_answ: "q1_9__bicycle_vs_healing" },
			r3: { htm_answ: "q1_9__knife_vs_regeneration" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
			const a2_on = this.answers.r2.is_on;
			const a3_on = this.answers.r3.is_on;
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
		answers: {
			r0: { htm_answ: "q1_91__yes" },
			r1: { htm_answ: "q1_91__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];
			
			const a0_on = this.answers.r0.is_on;
			//const a1_on = this.answers.r1.is_on;
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
		answers: {
			r0: { htm_answ: "q1_92__leg" },
			r1: { htm_answ: "q1_92__liver" },
			r2: { htm_answ: "q1_92__lung" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
			const a2_on = this.answers.r2.is_on;
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
		answers: {
			r0: { htm_answ: "q1_93__yes" },
			r1: { htm_answ: "q1_93__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
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
		answers: {
			r0: { htm_answ: "q1_94__yes" },
			r1: { htm_answ: "q1_94__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
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
		answers: {
			r0: { htm_answ: "q2_1__yes" },
			r1: { htm_answ: "q2_1__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
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
		answers: {
			r0: { htm_answ: "q2_2__yes" },
			r1: { htm_answ: "q2_2__no" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = [];

			const a0_on = this.answers.r0.is_on;
			if(a0_on){ 
				this.all_nxt = ["q3_1__"];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q1_1__", "q2_1__", "q2_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q3_1__ = { 
		htm_stm: "q3_1__jesus_resurrection_claims",
		presentation: "q3_1__resurrection_section",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q3_1__physical", should_on: "q3_1__physical", },
			r1: { htm_answ: "q3_1__not_to_die", should_on: "q3_1__not_to_die", },
			r2: { htm_answ: "q3_1__in_heaven", should_on: "q3_1__in_heaven", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = ["q3_2__"];
		},
	};
	
	db.q3_2__ = { 
		htm_stm: "q3_2__people_resurrection_claims",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q3_2__like_jesus", should_on: "q3_2__like_jesus", },
			r1: { htm_answ: "q3_2__for_all", should_on: "q3_2__for_all", },
			r2: { htm_answ: "q3_2__not_yet_most", should_on: "q3_2__not_yet_most", },
			//r3: { htm_answ: "q3_2__happened_for_few", should_on: "q3_2__happened_for_few", }, // NO_FEW
			r3: { htm_answ: "q3_2__new_earth", should_on: "q3_2__new_earth", },
			r4: { htm_answ: "q3_2__sleep", should_on: "q3_2__sleep", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = ["q3_3__"];
		},
	};
	
	db.q3_3__ = { 
		htm_stm: "q3_3__dispute_or_accept_resurrection",
		answers: {
			r0: { htm_answ: "q3_3__not_believed" },
			r1: { htm_answ: "q3_3__all_stms" },
			r2: { htm_answ: "q3_3__go_on" },
		},
		sections: {
			q3_1__physical: "q4_1__",
			q3_1__not_to_die: "q5_1__",
			q3_1__in_heaven: "q6_1__",
			q3_2__like_jesus: "q7_1__",
			q3_2__for_all: "q8_1__",
			q3_2__not_yet_most: "q9_1__",
			//q3_2__happened_for_few: "q10_1__", // NO_FEW
			q3_2__new_earth: "q11_1__",
			q3_2__sleep: "q12_1__",
		},
		nxt_sec: {
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.nxt_sec = {};
			this.all_nxt = [];
			const a0_on = this.answers.r0.is_on;
			const a1_on = this.answers.r1.is_on;
			const a2_on = this.answers.r2.is_on;
			
			const nxt_topic = "q13_1__";
			
			let ck_val = false;
			if(a0_on){ ck_val = true; }
			if(a0_on || a1_on){
				const lst_stm1 = add_sections(this.nxt_sec, this.sections, db.q3_1__.answers, ck_val, false, "q3_3__");
				const lst_stm2 = add_sections(this.nxt_sec, this.sections, db.q3_2__.answers, ck_val, false, lst_stm1);
				this.nxt_sec[lst_stm2] = nxt_topic;
				
				console.log("nxt_sec= " + JSON.stringify(this.nxt_sec));
			
				const fqid = this.nxt_sec["q3_3__"];
				this.all_nxt = [fqid];
				return;
			}
			if(a2_on){
				this.all_nxt = [nxt_topic];
				set_all_on(db.q3_1__);
				set_all_on(db.q3_2__);
				init_answers("q3_1__");
				init_answers("q3_2__");
				return;
			}
		},
	};
	
	db.q4_1__ = { 
		htm_stm: "q4_1__physical",
		presentation: "q4_1__physical_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q4_1__verse1_str", rclk_href: "q4_1__verse1_href", should_on: "q4_1__verse1_should", },
			r1: { htm_answ: "q4_1__verse2_str", rclk_href: "q4_1__verse2_href", should_on: "q4_1__verse2_should", },
			r2: { htm_answ: "q4_1__verse3_str", rclk_href: "q4_1__verse3_href", should_on: "q4_1__verse3_should", },
			r3: { htm_answ: "q4_1__verse4_str", rclk_href: "q4_1__verse4_href", should_on: "q4_1__verse4_should", },
			r4: { htm_answ: "q4_1__verse5_str", rclk_href: "q4_1__verse5_href", should_on: "q4_1__verse5_should", },
			r5: { htm_answ: "q4_1__verse6_str", rclk_href: "q4_1__verse6_href", should_on: "q4_1__verse6_should", },
			r6: { htm_answ: "q4_1__verse7_str", rclk_href: "q4_1__verse7_href", should_on: "q4_1__verse7_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_1__.answers.r0.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_1__physical"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q4_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q5_1__ = { 
		htm_stm: "q5_1__not_die",
		presentation: "q5_1__not_die_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q5_1__verse1_str", rclk_href: "q5_1__verse1_href", should_on: "q5_1__verse1_should", },
			r1: { htm_answ: "q5_1__verse2_str", rclk_href: "q5_1__verse2_href", should_on: "q5_1__verse2_should", },
			r2: { htm_answ: "q5_1__verse3_str", rclk_href: "q5_1__verse3_href", should_on: "q5_1__verse3_should", },
			r3: { htm_answ: "q5_1__verse4_str", rclk_href: "q5_1__verse4_href", should_on: "q5_1__verse4_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_1__.answers.r1.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_1__not_to_die"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q5_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q6_1__ = { 
		htm_stm: "q6_1__in_heaven",
		presentation: "q6_1__in_heaven_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q6_1__verse1_str", rclk_href: "q6_1__verse1_href", should_on: "q6_1__verse1_should", },
			r1: { htm_answ: "q6_1__verse2_str", rclk_href: "q6_1__verse2_href", should_on: "q6_1__verse2_should", },
			r2: { htm_answ: "q6_1__verse3_str", rclk_href: "q6_1__verse3_href", should_on: "q6_1__verse3_should", },
			r3: { htm_answ: "q6_1__verse4_str", rclk_href: "q6_1__verse4_href", should_on: "q6_1__verse4_should", },
			r4: { htm_answ: "q6_1__verse5_str", rclk_href: "q6_1__verse5_href", should_on: "q6_1__verse5_should", },
			r5: { htm_answ: "q6_1__verse6_str", rclk_href: "q6_1__verse6_href", should_on: "q6_1__verse6_should", },
			r6: { htm_answ: "q6_1__verse7_str", rclk_href: "q6_1__verse7_href", should_on: "q6_1__verse7_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_1__.answers.r2.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_1__in_heaven"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q6_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q7_1__ = { 
		htm_stm: "q7_1__like_jesus",
		presentation: "q7_1__like_jesus_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q7_1__verse1_str", rclk_href: "q7_1__verse1_href", should_on: "q7_1__verse1_should", },
			r1: { htm_answ: "q7_1__verse2_str", rclk_href: "q7_1__verse2_href", should_on: "q7_1__verse2_should", },
			r2: { htm_answ: "q7_1__verse3_str", rclk_href: "q7_1__verse3_href", should_on: "q7_1__verse3_should", },
			r3: { htm_answ: "q7_1__verse4_str", rclk_href: "q7_1__verse4_href", should_on: "q7_1__verse4_should", },
			r4: { htm_answ: "q7_1__verse5_str", rclk_href: "q7_1__verse5_href", should_on: "q7_1__verse5_should", },
			r5: { htm_answ: "q7_1__verse6_str", rclk_href: "q7_1__verse6_href", should_on: "q7_1__verse6_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_2__.answers.r0.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_2__like_jesus"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q7_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q8_1__ = { 
		htm_stm: "q8_1__for_all",
		presentation: "q8_1__for_all_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q8_1__verse1_str", rclk_href: "q8_1__verse1_href", should_on: "q8_1__verse1_should", },
			r1: { htm_answ: "q8_1__verse2_str", rclk_href: "q8_1__verse2_href", should_on: "q8_1__verse2_should", },
			r2: { htm_answ: "q8_1__verse3_str", rclk_href: "q8_1__verse3_href", should_on: "q8_1__verse3_should", },
			r3: { htm_answ: "q8_1__verse4_str", rclk_href: "q8_1__verse4_href", should_on: "q8_1__verse4_should", },
			r4: { htm_answ: "q8_1__verse5_str", rclk_href: "q8_1__verse5_href", should_on: "q8_1__verse5_should", },
			r5: { htm_answ: "q8_1__verse6_str", rclk_href: "q8_1__verse6_href", should_on: "q8_1__verse6_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_2__.answers.r1.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_2__for_all"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q8_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q9_1__ = { 
		htm_stm: "q9_1__not_yet",
		presentation: "q9_1__not_yet_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q9_1__verse1_str", rclk_href: "q9_1__verse1_href", should_on: "q9_1__verse1_should", },
			r1: { htm_answ: "q9_1__verse2_str", rclk_href: "q9_1__verse2_href", should_on: "q9_1__verse2_should", },
			r2: { htm_answ: "q9_1__verse3_str", rclk_href: "q9_1__verse3_href", should_on: "q9_1__verse3_should", },
			r3: { htm_answ: "q9_1__verse4_str", rclk_href: "q9_1__verse4_href", should_on: "q9_1__verse4_should", },
			r4: { htm_answ: "q9_1__verse5_str", rclk_href: "q9_1__verse5_href", should_on: "q9_1__verse5_should", },
			r5: { htm_answ: "q9_1__verse6_str", rclk_href: "q9_1__verse6_href", should_on: "q9_1__verse6_should", },
			r6: { htm_answ: "q9_1__verse7_str", rclk_href: "q9_1__verse7_href", should_on: "q9_1__verse7_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_2__.answers.r2.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_2__not_yet_most"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q9_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	/* NO_FEW
	db.q10_1__ = { 
		htm_stm: "q10_1__has_for_few",
		presentation: "q10_1__has_for_few_sec",
		answers: {
			r0: { htm_answ: "q10_1__go" },
			r1: { htm_answ: "q10_1__stay" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const a0_on = this.answers.r0.is_on;
			if(a0_on){ 
				const nxt_qid = db.q3_3__.nxt_sec["q3_2__happened_for_few"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q10_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	*/
	
	db.q11_1__ = { 
		htm_stm: "q11_1__new_earth",
		presentation: "q11_1__new_earth_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q11_1__verse1_str", rclk_href: "q11_1__verse1_href", should_on: "q11_1__verse1_should", },
			r1: { htm_answ: "q11_1__verse2_str", rclk_href: "q11_1__verse2_href", should_on: "q11_1__verse2_should", },
			r2: { htm_answ: "q11_1__verse3_str", rclk_href: "q11_1__verse3_href", should_on: "q11_1__verse3_should", },
			r3: { htm_answ: "q11_1__verse4_str", rclk_href: "q11_1__verse4_href", should_on: "q11_1__verse4_should", },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_2__.answers.r3.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_2__new_earth"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q11_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q12_1__ = { 
		htm_stm: "q12_1__sleep",
		presentation: "q12_1__sleep_sec",
		is_multi: true,
		answers: {
			r0: { htm_answ: "q12_1__go" },
			r1: { htm_answ: "q12_1__stay" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			const all_on = are_all_on(this);
			if(all_on){ 
				if(! db.q3_2__.answers.r4.is_on){
					this.all_nxt = ["q0_2__"];
					this.all_contra = ["q0_2__", "q3_2__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
					return;
				} 
				const nxt_qid = db.q3_3__.nxt_sec["q3_2__sleep"];
				this.all_nxt = [nxt_qid];
				return;
			}
			
			this.all_nxt = ["q0_2__"];
			this.all_contra = ["q0_2__", "q12_1__"]; // q1_1__are_you_reasonable q1_2__experience_is_evidence
		},
	};
	
	db.q13_1__ = { 
		htm_stm: "q13_1__the_cloth",
		presentation: "q13_1__the_cloth_sec",
		answers: {
			r0: { htm_answ: "q13_1__go" },
			r1: { htm_answ: "q13_1__stay" },
		},
		set_reactions: function () {
			if(has_all_next(this)){ return; }
			this.all_nxt = ["q0_3__"];
		},
	};
	
	
}

function add_sections(nxt_sec, secs, answs, ck_val, value, fst_stm){
	let prv_stm = fst_stm;
	//answs.forEach((an_answ) => {
	for (const [aid, an_answ] of Object.entries(answs)) {
		let curr_stm = an_answ.htm_answ;
		if(! ck_val || (an_answ.is_on == value)){
			const fst_qid = secs[curr_stm];
			if(fst_qid != null){
				nxt_sec[prv_stm] = fst_qid;
			} else {
				console.log("add_sections. Could not find " + curr_stm + " in " + JSON.stringify(secs));
			}
			prv_stm = curr_stm;
		}
	}
	//});
		
	return prv_stm;
}

function set_all_on(quest){
	if(! quest.is_multi){
		return;
	}
	for (const [aid, an_answ] of Object.entries(quest.answers)) {
		an_answ.is_on = true;
	}
}

function has_all_next(quest){
	if(quest.all_nxt != null){
		console.log("Already set_reactions for question " + quest.htm_stm);
		return true;
	}
	return false;
}

function are_all_on(quest){
	if(quest.answers == null){
		return false;
	}
	for (const [aid, an_answ] of Object.entries(quest.answers)) {
		if(! an_answ.is_on){
			return false;
		}
	}
	return true;
}
