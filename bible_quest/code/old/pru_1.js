

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

//pru_stringfy();

function uppercase_words_in_string(the_str, to_up_arr){
	const words = the_str.split(' ');
	console.log(JSON.stringify(words, null, "  "));
	const nw_words = [];
	words.forEach((word) => {
		if(to_up_arr.includes(word)){
			word = word.toUpperCase();
		} 
		nw_words.push(word);
	});	
	const nwstr = nw_words.join(' ');
	return nwstr;
}

//console.log(uppercase_words_in_string("and the Living one. I was dead, and behold, I am alive forever and ever. Amen. ", ["forever", "ever."]));

function test_01(val){
	if(val){
		console.log("TRUE");
	} else {
		console.log("FALSE");
	}
}

// Example. BIBREF_Gen_1:3-5

const bibref_prefix = "BIBREF_";
const book_lng = 4;

function bibref_to_bibcit(brf){
	return brf.slice(bibref_prefix.length);
}

function bibcit_to_bibobj(bcit){
	const re = /([A-Za-z]*)_(\d*):(\d*)-*(\d*)/;
	const vcit = bcit.split(re);
	const obj = {};
	if(vcit.length > 1){ obj.book = vcit[1]; }
	if(vcit.length > 2){ obj.chapter = vcit[2]; }
	if(vcit.length > 3){ obj.verse = vcit[3]; }
	if(vcit.length > 4){ obj.last_verse = vcit[4]; }
	return obj;
}

function bibcit_to_bibtxt(bcit){
	const bibobj = bibcit_to_bibobj(bcit);
	console.log(bibobj);
	return bibobj.book + "/" + bibobj.chapter + "/" + bibobj.verse + "/" + bibobj.last_verse;
}

function replace_all_bibrefs(str){
	const words = str.split(' ');
	words.forEach((wrd, idx, arr) => {
		if(wrd.startsWith(bibref_prefix)){
			arr[idx] = bibcit_to_bibtxt(bibref_to_bibcit(wrd)); 
		}
	});
	
	const nwstr = words.join(' ');
	return nwstr;
}

function test_02(){
	const t1 = replace_all_bibrefs("Esta es una prueba con BIBREF_Gen_1:35 para ver que pasa y con este  BIBREF_Rev_1 otro");
	console.log(t1);
}

function test_03(){
	const t1 = null;
	if(t1){
		console.log("TRUE");
	} else {
		console.log("FALSE");
	}
}

test_03();



