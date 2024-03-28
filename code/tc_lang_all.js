
"use strict";

// ENGLISH IS THE DEFAULT LANGUAGE.
// SO THIS FILE MUST BE INCLUDED FOR ANY OTHER LANGUAGE

const abbr2num = {};
const book2num_en = {};
const all_en_msg = {};

export function fill_reversed_object(orig, reverse){
	for (const [key, value] of Object.entries(orig)) {
		reverse[value] = key;
		//console.log(`${key} = ${value}`);
	}  
}

export const num2abbr = {
	"1":"Gen",
	"2":"Exo",
	"3":"Lev",
	"4":"Num",
	"5":"Deu",
	"6":"Jos",
	"7":"Jdg",
	"8":"Rth",
	"9":"1Sa",
	"10":"2Sa",
	"11":"1Ki",
	"12":"2Ki",
	"13":"1Ch",
	"14":"2Ch",
	"15":"Ezr",
	"16":"Neh",
	"17":"Est",
	"18":"Job",
	"19":"Psa",
	"20":"Pro",
	"21":"Ecc",
	"22":"Sng",
	"23":"Isa",
	"24":"Jer",
	"25":"Lam",
	"26":"Eze",
	"27":"Dan",
	"28":"Hos",
	"29":"Joe",
	"30":"Amo",
	"31":"Oba",
	"32":"Jon",
	"33":"Mic",
	"34":"Nah",
	"35":"Hab",
	"36":"Zep",
	"37":"Hag",
	"38":"Zec",
	"39":"Mal",
	"40":"Mat",
	"41":"Mar",
	"42":"Luk",
	"43":"Jhn",
	"44":"Act",
	"45":"Rom",
	"46":"1Co",
	"47":"2Co",
	"48":"Gal",
	"49":"Eph",
	"50":"Phl",
	"51":"Col",
	"52":"1Th",
	"53":"2Th",
	"54":"1Ti",
	"55":"2Ti",
	"56":"Tit",
	"57":"Phm",
	"58":"Heb",
	"59":"Jas",
	"60":"1Pe",
	"61":"2Pe",
	"62":"1Jo",
	"63":"2Jo",
	"64":"3Jo",
	"65":"Jde",
	"66":"Rev",
};

export const num2book_en = {
	"1":"genesis",
	"2":"exodus",
	"3":"leviticus",
	"4":"numbers",
	"5":"deuteronomy",
	"6":"joshua",
	"7":"judges",
	"8":"ruth",
	"9":"1_samuel",
	"10":"2_samuel",
	"11":"1_kings",
	"12":"2_kings",
	"13":"1_chronicles",
	"14":"2_chronicles",
	"15":"ezra",
	"16":"nehemiah",
	"17":"esther",
	"18":"job",
	"19":"psalms",
	"20":"proverbs",
	"21":"ecclesiastes",
	"22":"songs",
	"23":"isaiah",
	"24":"jeremiah",
	"25":"lamentations",
	"26":"ezekiel",
	"27":"daniel",
	"28":"hosea",
	"29":"joel",
	"30":"amos",
	"31":"obadiah",
	"32":"jonah",
	"33":"micah",
	"34":"nahum",
	"35":"habakkuk",
	"36":"zephaniah",
	"37":"haggai",
	"38":"zechariah",
	"39":"malachi",
	"40":"matthew",
	"41":"mark",
	"42":"luke",
	"43":"john",
	"44":"acts",
	"45":"romans",
	"46":"1_corinthians",
	"47":"2_corinthians",
	"48":"galatians",
	"49":"ephesians",
	"50":"philippians",
	"51":"colossians",
	"52":"1_thessalonians",
	"53":"2_thessalonians",
	"54":"1_timothy",
	"55":"2_timothy",
	"56":"titus",
	"57":"philemon",
	"58":"hebrews",
	"59":"james",
	"60":"1_peter",
	"61":"2_peter",
	"62":"1_john",
	"63":"2_john",
	"64":"3_john",
	"65":"jude",
	"66":"revelation",
};

const bibles_en = {
	biblegateway: [ "KJV", "WEB", "YLT", "NASB", "WLC", "HHH", "WHNU", "TR1550", ],
	biblehub: [ "text", "kjv", "web", "ylt", "nasb77", "bsb", "sepd", "wlco", ],
	blueletterbible: [ "KJV", "WEB", "YLT", "VUL", "NASB95", "VUL", "WLC", "LXX", "MGNT", "TR", ],
};

function get_traduced_message(trad_msg, nom_msg){
	const tr_mg = trad_msg[nom_msg];
	if(tr_mg == null){
		const en_mg = all_en_msg[nom_msg];
		if(en_mg == null){
			return nom_msg;
		}
		return en_mg;
	}
	return tr_mg;
}

function nom1(){
	const lg = glb_curr_lang;
	//return lg.msg_there_is_a_creator;
	return lg.msg_i_do_not_know_if_there_is_creator;
}

function init_en_basic_msg(){
	const obj = all_en_msg;
	obj.msg_ok = "OK";
	obj.msg_del = "DEL";
	obj.msg_range = "RANGE";
	obj.msg_any = "ANY";
	obj.msg_end_ans = "END ANSWER";
	obj.msg_edit_ans = "CHANGE ANSWER";
	
	obj.msg_add_verse = "ADD VERSE";
	obj.msg_add_strong = "ADD STRONG CODE";
	obj.msg_add_link = "ADD WEB LINK";
	
	obj.msg_def_book = "BOOK";
	obj.msg_def_strong = "STRONG_CODE";
	obj.msg_def_link_name = "WEB LINK";
	
	obj.msg_save_in_browser = "IN BROWSER";
	obj.msg_save_in_cloud = "IN TodaCarne.com";
	
	obj.msg_open_from_browser = "FROM BROWSER";
	obj.msg_open_from_cloud = "FROM TodaCarne.com";
	
	obj.msg_new_answers_name = "NEW";
	
	obj.msg_todacarne_answers_name = "IN TodaCarne.com";
	obj.msg_todacarne_answers_writing = "Saving...";
	obj.msg_todacarne_answers_reading = "Opening...";
	
}

export let get_msg = null;

export function init_get_msg(lang_msgs){
	get_msg = function (nom_msg){
		return get_traduced_message(lang_msgs, nom_msg);
	};
}

export let glb_exam_language = "en";
export let glb_all_books = num2book_en;
export let glb_all_bibles = bibles_en;
export let glb_books_nums = book2num_en;
export let glb_curr_lang = all_en_msg;

export function init_all_glb(lang, books, bibles, nums, curr){
	glb_exam_language = lang;
	glb_all_books = books;
	glb_all_bibles = bibles;
	glb_books_nums = nums;
	glb_curr_lang = curr;
}


export function init_en_module(){
	console.log("Called init_en_module");
	
	init_get_msg(all_en_msg);
	
	fill_reversed_object(num2book_en, book2num_en);
	fill_reversed_object(num2abbr, abbr2num);

	init_en_basic_msg();
	init_en_exam_msg();
}

//init_en_module();


function init_en_exam_msg(){
	const lg = all_en_msg;
	lg.q0_0_1_end_of_test = "This test is not for you. This is the end of the test for you.";
	lg.q0_0_2_contradiction = "You have a contradiction in your answers. Please change one of your answers shown in red. The contradiction is in one of them. Otherwise you cannot continue with this test.";
	
	lg.q0_1_are_you_reasonable = "This questions are for rational and reasonable people.";
	lg.q0_1_yes = "I am a rational and reasonable person.";
	lg.q0_1_no = "I am NOT a rational and reasonable person.";
	
	lg.q0_2_are_humans_intelligent = "I consider that the human being ";
	lg.q0_2_yes = "is a creative, designer and intelligent being.";
	lg.q0_2_no = "is NOT a creative, designer and intelligent being";
	
	lg.q0_3_can_an_engineer_rebuild_his_house = "If an engineer has built a house, and it gets destroyed, or burned, in an accident or by someone else ";
	lg.q0_3_yes = "the engineer can build the house again.";
	lg.q0_3_no = "the engineer cannot build the house again";
	
	lg.q0_4_experience_is_evidence = "A claim that most people can see, hear, smell, taste, touch, or confirm by perceptual experience, ";
	lg.q0_4_yes = "it is evidence.";
	lg.q0_4_no = "it is NOT evidence";
	
	lg.q0_5_more_complex_than = "Select all claims supported by evidence: ";
	lg.q0_5_airplane_vs_knife = "an airplane is more complex than a knife";
	lg.q0_5_computer_vs_lamp = "a computer is more complex than a lamp";
	lg.q0_5_cellphone_vs_clock = "a cellphone is more complex than a clock";
	
	lg.q0_6_more_creativity_than = "Select all claims supported by evidence: ";
	lg.q0_6_airplane_vs_knife = "an airplane requires more technical creativity than a knife";
	lg.q0_6_computer_vs_lamp = "a computer requires more technical creativity than a lamp";
	lg.q0_6_cellphone_vs_clock = "a cellphone requires more technical creativity than a clock";
	
	lg.q0_7_more_complexity_then_more_creativity = "Given all normal perceptual experience, the statement: 'the more complex a machine is, the bigger the technical creativity needed to reproduce it'";
	lg.q0_7_yes = "It is true.";
	lg.q0_7_no = "It is false.";
	
	lg.q1_for_all_biological_machines = "For all biological machines observed in plants, animals and people:";
	lg.q1_there_is_a_creator = "There is a CREATOR";
	lg.q1_there_is_no_creator = "There is NO Creator";
	lg.q1_i_do_not_know_if_there_is_creator = "I do not KNOW if there is a creator";
	lg.q1_i_do_not_care_if_there_is_creator = "I do not CARE if there is a creator";
	lg.q1_it_is_impossible_to_know_if_there_is_creator = "It is impossible to know if there is a creator";

	lg.q2_the_creator_for_all_biological_machines = "The creator for all biological machines observed in plants, animals and people:";
	lg.q2_the_creator_has_technical_creativity = "is intelligent, designer and has technical creativity";
	lg.q2_the_creator_has_no_technical_creativity = "is NOT intelligent, or NOT a designer, or has NO technical creativity";

}

