
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
	obj.msg_todacarne_no_internet = "No internet conection.";
	
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
	const href_creator_tit = "../en/book.html#creator_DOT_";
	const href_tch_crea = "../en/book.html#technical-creativity_DOT_";
	const href_tch_cplx = "../en/book.html#technical-complexity_DOT_";
	const href_factories = "../en/book.html#factories_DOT_";
	const href_biology = "../en/book.html#biology_DOT_";
	const href_creator = "../en/book.html#creator_DOT_-1";
	const href_evidence = "../en/book.html#evidence_DOT_";
	const href_reproduction_tit = "../en/book.html#reproduction_DOT_";
	const href_reproduction = "../en/book.html#reproduction_DOT_";
	const href_resurrection = "../en/book.html#resurrection_DOT_";
	const href_resurrection_tit = "../en/book.html#resurrection_DOT_";
	
	const lg = all_en_msg;
	lg.q0_1__end_of_test = "This test is not for you. This is the end of the test for you, unless you did not really mean it and change your answer. Click on your answer to change it.";
	lg.q0_2__contradiction = "You have a contradiction in your answers. Please change one of your answers to the questions shown in red. The contradiction is in one of them. Otherwise you cannot continue with this test. Click on your answer to change it.";
	lg.q0_3__end_so_far = "This test is in construction. This is the end of the test for you so far...";
	lg.q0_4__about_beliefs = "<b>All these questions are about what you believe, NOT about what you think you have certainty. Some of them might be check questions to avoid silly behaviour. Answer them all properly. You can change any answer at any time by clicking on it.</b>";
	
	lg.q1_1__are_you_reasonable = "This questions are for rational and reasonable people.";
	lg.q1_1__yes = "I am a rational and reasonable person.";
	lg.q1_1__no = "I am NOT a rational and reasonable person.";
	
	lg.q1_2__experience_is_evidence = "A claim that most people can see, hear, smell, taste, touch, or confirm by perceptual experience, ";
	lg.q1_2__yes = "it is evidence.";
	lg.q1_2__no = "it is NOT evidence";

	lg.q1_21__creator_section = `<a class='exam_ref exam_title' href='${href_creator_tit}'>Creator</a>`;
	
	lg.q1_3__are_humans_intelligent = `With respect to <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a>, there is <a class='exam_ref' href='${href_evidence}'>evidence</a> that the human being `;
	lg.q1_3__yes = "is intelligent, designer and has technical creativity.";
	lg.q1_3__no = "is NOT intelligent, or NOT a designer, or has NO technical creativity";
	
	lg.q1_31__all_biological_machines = "All biological machines observed in plants, animals and people:";
	lg.q1_31__creator = "Were created by a CREATOR";
	lg.q1_31__other = "Are result of an OTHER cause, not a creator";

	lg.q1_32__the_creator = `The statement: 'Just like the human being, the CREATOR of all biological machines observed in plants, animals and people is intelligent, designer and has <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a>'`;
	lg.q1_32__intelligent = "It is true.";
	lg.q1_32__not_intelligent = "It is false.";
	
	lg.q1_33__the_evolution = `The statement: 'The creator used EVOLUTION as means to create all <a class='exam_ref' href='${href_factories}'>biological machines</a> observed in plants, animals and people'`;
	lg.q1_33__yes = "It is true.";
	lg.q1_33__no = "It is false.";
	
	lg.q1_34__six_spins = "The statement: 'The creator of all biological machines observed in plants, animals and people, created them in no more than six spins of the planet on its axis, six chronological days'";
	lg.q1_34__yes = "It is true.";
	lg.q1_34__no = "It is false.";
	
	lg.q1_35__skip_creator_proof = `You can now choose to SKIP all the questions for proving by evidence and logic the existance of a creator of all biological machines, do you want to skip them?`;
	lg.q1_35__yes = "Yes, SKIP the questions.";
	lg.q1_35__no = "No, let me ANSWER them.";
	
	lg.q1_4__requires_technical_creativity = `Select ALL claims about <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a> supported by evidence: `;
	lg.q1_4__knife = "a knife requires technical creativity to reproduce";
	lg.q1_4__lamp = "a lamp requires technical creativity to reproduce";
	lg.q1_4__clock = "a clock requires technical creativity to reproduce";
	
	lg.q1_5__more_complex_than = `Select ALL claims about <a class='exam_ref' href='${href_tch_cplx}'>technical complexity</a> supported by evidence: `;
	lg.q1_5__building_vs_knife = "a building has more technical complexity than a knife";
	lg.q1_5__car_vs_lamp = "a car has more technical complexity than a lamp";
	lg.q1_5__cellphone_vs_clock = "a cellphone has more technical complexity than a clock";
	
	lg.q1_7__more_complexity_then_more_creativity = `Given all normal perceptual experience, the statement: "the more <a class='exam_ref' href='${href_tch_cplx}'>technical complexity</a> an object or machine has, THEN, the bigger the <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a> needed to reproduce it"`;
	lg.q1_7__yes = "It is true.";
	lg.q1_7__no = "It is false.";
	
	lg.q1_8__more_creativity = `Select ALL claims about <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a> supported by evidence: `;
	lg.q1_8__building_vs_knife = "a building requires more technical creativity to reproduce than a knife";
	lg.q1_8__car_vs_lamp = "a car requires more technical creativity to reproduce than a lamp";
	lg.q1_8__cellphone_vs_clock = "a cellphone requires more technical creativity to reproduce than a clock";
	
	lg.q1_9__coplexity_of_biological_machines = `Select ALL claims supported by normal perceptual experience about man made machines and <a class='exam_ref' href='${href_factories}'>factories</a> compared to <a class='exam_ref' href='${href_biology}'>biological machines</a>: `;
	lg.q1_9__car_vs_mitosis = "We do NOT observe in CARS that one can start a process in which it divides in two of them identical to the original, nor we observe it in any other man made machine, yet we observe it in the MITOSIS of biological machines like the CELL.";
	lg.q1_9__smartphone_vs_sex = "We do NOT observe in SMARTPHONES that a male one joins with a female one, and after a while, a third small one comes out of the female one, that resembles a mix of two of them, and that it grows in size as time goes by, nor we observe it in any other man made machine, yet we observe it in SEX reproduction of biological machines like the HUMAN BODY.";
	lg.q1_9__bicycle_vs_healing = "We do NOT observe in BICYCLES that when one crashes and its surface gets damaged, in a few days it has fixed its surface, nor we observe it in any other man made machine, yet we observe it in HEALING of biological machines like in the SKIN of animals.";
	lg.q1_9__knife_vs_regeneration = "We do NOT observe in KNIFES that when one brakes and looses its tip, in a few days it has grown a new tip, nor we observe it in any other man made machine, yet we observe it in REGENERATION of biological machines like the TAIL of some lizards.";
	
	lg.q1_91__more_complexity_in_biology = `Given all normal perceptual experience, the statement: "<a class='exam_ref' href='${href_biology}'>biological machines</a> have more <a class='exam_ref' href='${href_tch_cplx}'>technical complexity</a> that human made machines"`;
	lg.q1_91__yes = "It is true.";
	lg.q1_91__no = "It is false.";
	
	lg.q1_92__human_complexity = `Select ALL claims about <a class='exam_ref' href='${href_tch_cplx}'>technical complexity</a> and <a class='exam_ref' href='${href_factories}'>factories</a> supported by evidence: `;
	lg.q1_92__leg = "a LEG is so complex that if we understood how they are made we could take a drop of blood of the person missing a leg, make a custom leg for him, and install it, just like we do with a car WHEEL.";
	lg.q1_92__liver = "a LIVER is so complex that if we understood how they are made we could take a drop of blood of the person with a damaged liver, make a custom liver for him, and install it, just like we do with a distribution and logistics warehouse of a FACTORY.";
	lg.q1_92__lung = "a LUNG is so complex that if we understood how they are made we could take a drop of blood of the person with a damaged lung, make a custom lung for him, and install it, just like we do with the air filtering equipment of a VENTILATION system.";
	
	lg.q1_93__biological_requires_creativity = `Given your answers in QREF_q1_91__ and QREF_q1_7__ you MUST conclude that the statement: "biological machines require more <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a> than human made machines"`;
	lg.q1_93__yes = "It is true.";
	lg.q1_93__no = "It is false.";
	
	lg.q1_94__if_human_then_creator = `Given your answer in QREF_q1_93__ you MUST conclude that the statement: "IF the human being is going to call himself intelligent, designer and <a class='exam_ref' href='${href_creator}'>creator</a>, due to all the <a class='exam_ref' href='${href_evidence}'>EVIDENCE</a> in the tecnology that he has made, THEN, he has to admit that there EXISTS an intelligent, designer and creator of all <a class='exam_ref' href='${href_biology}'>biological machines</a> that we observe"`;
	lg.q1_94__yes = "It is true.";
	lg.q1_94__no = "It is false.";
	
	lg.q2_0__reproduction_section = `<a class='exam_ref exam_title' href='${href_reproduction_tit}'>Reproduction</a>`;
	
	lg.q2_1__can_an_engineer_rebuild_his_house = `If an engineer has <a class='exam_ref' href='${href_reproduction}'>reproduced</a>, built, the same house many times, and one of them gets destroyed, by fire, in an accident, or by someone else `;
	lg.q2_1__yes = "he can BUILD the destroyed house again.";
	lg.q2_1__no = "he CANNOT build the destroyed house again";
	
	lg.q2_2__future_resurrection = `Given your answer in QREF_q2_1__ you must accept that it is REASONABLE to visualize a future, maybe distant, when we understand enough about the human body, in which humans will be able to <a class='exam_ref' href='${href_reproduction}'>reproduce</a> the human body and simulate a <a class='exam_ref' href='${href_resurrection}'>resurrection</a>`;
	lg.q2_2__yes = "Yes. I DO";
	lg.q2_2__no = "No. I do NOT";
	
	lg.q3_0__resurrection_section = `<a class='exam_ref exam_title' href='${href_resurrection_tit}'>Resurrection</a>`;
	
	lg.q3_1__jesus_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of Jesus Christ: `;
	lg.q3_1__physical = "He is physically alive in BODY and SPIRIT";
	lg.q3_1__not_to_die = "He is alive FOREVER, to not die again, because He cannot longer die.";
	lg.q3_1__in_heaven = "He is in the heavens, those PHYSICAL ones that we can see and that have clouds";
	
	lg.q3_2__people_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of the dead promissed by Jesus Christ: `;
	lg.q3_2__like_jesus = "It is in BODY and SPIRIT just like Jesus Chist. And it is in a new body, similar to Jesus's one, that cannot die.";
	lg.q3_2__for_all = "It is for everyone. ALL people, just and unjust.";
	lg.q3_2__not_happened_for_most = "It has NOT happened for the great MAJORITY of people. The promissed event is on the last day.";
	lg.q3_2__happened_for_few = "It HAS happened for a FEW ones. Some male genetic decendants of Jacob, of Israel, have been resurrected.";
	lg.q3_2__new_earth = "It is to live forever in a new physical EARTH with new physical HEAVENS";
	lg.q3_2__sleep = "Before resurrection, the dead person has NO body, NO consciousness, and therefore cannot do anything";

	lg.q20_4__dispute_or_accept_resurrection = `What statements about <a class='exam_ref' href='${href_resurrection}'>resurrection</a> would you like to explore and optionally dispute? `;
	lg.q20_4__not_believed = "The ones I do NOT believe are claimed by The Bible.";
	lg.q20_4__all_stms = "ALL of them.";
	lg.q20_4__go_on = "None of them. I ACCEPT they are all claimed by The Bible. Let's go on.";
	
}
