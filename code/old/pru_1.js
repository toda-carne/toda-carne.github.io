

let	db_nodes_exam = {};


function pru_stringfy(){
	const db = db_nodes_exam;
	db.q1_1__ = { 
		htm_stm: "q1_1__are_you_reasonable",
		answers: {
			r0: { htm_answ: "q1_1__yes" },
			r1: { htm_answ: "q1_1__no" },
		},
		set_reactions: function () {
			if(this.all_nxt != null){
				console.log("Already set_reactions for question " + this.htm_stm);
				return;
			}
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
	
	console.log(JSON.stringify(db_nodes_exam.q1_1__));
	//console.log("HOLA _MUNDO");
}

pru_stringfy();
 
