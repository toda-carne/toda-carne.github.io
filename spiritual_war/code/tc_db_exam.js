"use strict";

const tit_kind = "title";
const stm_kind = "statement";
const rsp_kind = "response";

const msg_creator_for_all_biological_machines = "For all biological machines known as plants, animals and people:";
const msg_there_is_a_creator = "There is a CREATOR";
const msg_there_is_no_creator = "There is NO Creator";
const msg_i_do_not_know_if_there_is_creator = "I do not KNOW if there is a creator";
const msg_i_do_not_care_if_there_is_creator = "I do not CARE if there is a creator";
const msg_it_is_impossible_to_know_if_there_is_creator = "It is impossible to know if there is a creator";

const msg_the_creator_has_technical_creativity = "The creator is intelligent, designer and has technical creativity";
const msg_the_creator_has_no_technical_creativity = "The creator is NOT intelligent, or NOT a designer, or has NO technical creativity";

const get_name = (nombre, apellido) => {
	return `Mi nombre completo es ${nombre} ${apellido}`;
};


const db_messages_exam = {
	func_1:get_name,
	[msg_creator_for_all_biological_machines]: { 
		kind : tit_kind,
		year: -7000,
		parents: [],
		chldren: [msg_there_is_a_creator, msg_there_is_no_creator, msg_i_do_not_know_if_there_is_creator, msg_i_do_not_care_if_there_is_creator, 
		msg_it_is_impossible_to_know_if_there_is_creator, ],
	},
	[msg_there_is_a_creator]: { 
		kind : stm_kind,
		year: -7000,
		parents: [msg_creator_for_all_biological_machines],
		chldren: [msg_the_creator_has_technical_creativity, msg_the_creator_has_no_technical_creativity],
		deactivates: [msg_there_is_no_creator, msg_i_do_not_know_if_there_is_creator, msg_i_do_not_care_if_there_is_creator, 
		msg_it_is_impossible_to_know_if_there_is_creator, ],
	},
	[msg_there_is_no_creator]: { 
		kind : stm_kind,
		year: -7000,
		parents: [msg_creator_for_all_biological_machines],
		chldren: [],
		deactivates: [msg_there_is_a_creator, msg_i_do_not_know_if_there_is_creator, msg_i_do_not_care_if_there_is_creator, 
		msg_it_is_impossible_to_know_if_there_is_creator, ],
	},
	[msg_i_do_not_know_if_there_is_creator]: { 
		kind : stm_kind,
		year: -7000,
		parents: [msg_creator_for_all_biological_machines],
		chldren: [],
		deactivates: [msg_there_is_a_creator, msg_there_is_no_creator, ],
	},
	[msg_i_do_not_care_if_there_is_creator]: { 
		kind : stm_kind,
		year: -7000,
		parents: [msg_creator_for_all_biological_machines],
		chldren: [],
		deactivates: [msg_there_is_a_creator, msg_there_is_no_creator, ],
	},
	[msg_it_is_impossible_to_know_if_there_is_creator]: { 
		kind : stm_kind,
		year: -7000,
		parents: [msg_creator_for_all_biological_machines],
		chldren: [],
		deactivates: [msg_there_is_a_creator, msg_there_is_no_creator, ],
	},
};

const num2book_es = {
	"1":"génesis",
	"2":"éxodo",
	"3":"levítico",
	"4":"números",
	"5":"deuteronomio",
	"6":"josué",
	"7":"jueces",
	"8":"rut",
	"9":"1_samuel",
	"10":"2_samuel",
	"11":"1_reyes",
	"12":"2_reyes",
	"13":"1_crónicas",
	"14":"2_crónicas",
	"15":"esdras",
	"16":"nehemías",
	"17":"ester",
	"18":"job",
	"19":"salmos",
	"20":"proverbios",
	"21":"eclesiastés",
	"22":"cantares",
	"23":"isaías",
	"24":"jeremías",
	"25":"lamentaciones",
	"26":"ezequiel",
	"27":"daniel",
	"28":"oseas",
	"29":"joel",
	"30":"amós",
	"31":"abdías",
	"32":"jonás",
	"33":"miqueas",
	"34":"nahúm",
	"35":"habacuc",
	"36":"sofonías",
	"37":"hageo",
	"38":"zacarías",
	"39":"malaquías",
	"40":"mateo",
	"41":"marcos",
	"42":"lucas",
	"43":"juan",
	"44":"hechos",
	"45":"romanos",
	"46":"1_corintios",
	"47":"2_corintios",
	"48":"gálatas",
	"49":"efesios",
	"50":"filipenses",
	"51":"colosenses",
	"52":"1_tesalonicenses",
	"53":"2_tesalonicenses",
	"54":"1_timoteo",
	"55":"2_timoteo",
	"56":"tito",
	"57":"filemón",
	"58":"hebreos",
	"59":"santiago",
	"60":"1_pedro",
	"61":"2_pedro",
	"62":"1_juan",
	"63":"2_juan",
	"64":"3_juan",
	"65":"judas",
	"66":"apocalipsis",
};

const num2book_en = {
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

const num2abbr = {
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

const book2num_es = {};
const book2num_en = {};
const abbr2num = {};


function fill_reversed_object(orig, reverse){
	for (const [key, value] of Object.entries(orig)) {
		reverse[value] = key;
		//console.log(`${key} = ${value}`);
	}  
}

function fill_bible_objects(){
	
	fill_reversed_object(num2book_es, book2num_es);
	fill_reversed_object(num2book_en, book2num_en);
	fill_reversed_object(num2abbr, abbr2num);
	
	/*
	 *  console.log(book2num_es);
	 *  console.log(book2num_en);
	 *  console.log(abbr2num);
	 */
}

const bibles_es = {
	biblegateway: [ "RVA", "RVR1960", "DHH", "NTV", "WLC", "HHH", "WHNU", "TR1550", ],
	biblehub: [ "text", "sepd", "wlco", ],
	bibliaparalela: [ "rvg", "rv", "nblh", ],
	blueletterbible: [ "RVR09", "RVR60", "EM", "VUL", "NASB95", "VUL", "WLC", "LXX", "MGNT", "TR", ],
};

const bibles_en = {
	biblegateway: [ "KJV", "WEB", "YLT", "NASB", "WLC", "HHH", "WHNU", "TR1550", ],
	biblehub: [ "text", "kjv", "web", "ylt", "nasb77", "bsb", "sepd", "wlco", ],
	blueletterbible: [ "KJV", "WEB", "YLT", "VUL", "NASB95", "VUL", "WLC", "LXX", "MGNT", "TR", ],
};

const books_abbr = {
	"genesis":"Gen",
	"exodus":"Exo",
	"leviticus":"Lev",
	"numbers":"Num",
	"deuteronomy":"Deu",
	"joshua":"Jos",
	"judges":"Jdg",
	"ruth":"Rth",
	"1_samuel":"1Sa",
	"2_samuel":"2Sa",
	"1_kings":"1Ki",
	"2_kings":"2Ki",
	"1_chronicles":"1Ch",
	"2_chronicles":"2Ch",
	"ezra":"Ezr",
	"nehemiah":"Neh",
	"esther":"Est",
	"job":"Job",
	"psalms":"Psa",
	"proverbs":"Pro",
	"ecclesiastes":"Ecc",
	"songs":"Sng",
	"isaiah":"Isa",
	"jeremiah":"Jer",
	"lamentations":"Lam",
	"ezekiel":"Eze",
	"daniel":"Dan",
	"hosea":"Hos",
	"joel":"Joe",
	"amos":"Amo",
	"obadiah":"Oba",
	"jonah":"Jon",
	"micah":"Mic",
	"nahum":"Nah",
	"habakkuk":"Hab",
	"zephaniah":"Zep",
	"haggai":"Hag",
	"zechariah":"Zec",
	"malachi":"Mal",
	"matthew":"Mat",
	"mark":"Mar",
	"luke":"Luk",
	"john":"Jhn",
	"acts":"Act",
	"romans":"Rom",
	"1_corinthians":"1Co",
	"2_corinthians":"2Co",
	"galatians":"Gal",
	"ephesians":"Eph",
	"philippians":"Phl",
	"colossians":"Col",
	"1_thessalonians":"1Th",
	"2_thessalonians":"2Th",
	"1_timothy":"1Ti",
	"2_timothy":"2Ti",
	"titus":"Tit",
	"philemon":"Phm",
	"hebrews":"Heb",
	"james":"Jas",
	"1_peter":"1Pe",
	"2_peter":"2Pe",
	"1_john":"1Jo",
	"2_john":"2Jo",
	"3_john":"3Jo",
	"jude":"Jde",
	"revelation":"Rev",
};

function test1(){
	console.log("json_example");
	console.log(json_example);
	
	var key = "my_key";
	var val = "Jose Luis";
	
	
	json_example[key] = val;
	console.log(json_example);
	
	//json_example.[key] = val;
	//console.log(json_example);
	
	/*
	 *  for (const [key, value] of Object.entries(num2book_en)) {
	 *      console.log(`${key} = ${value}`);
}*/
	//console.log(JSON.stringify(json_example, null, "  "));
	//console.log(JSON.stringify(db_messages_exam, null, "  "));
}

//test1();
fill_bible_objects();

/*
 * const json_example = {
 *  "first_name": "John",
 *  "last_name": "Smith",
 *  "is_alive": true,
 *  "age": 27,
 *  "address": {
 *    "street_address": "21 2nd Street",
 *    "city": "New York",
 *    "state": "NY",
 *    "postal_code": "10021-3100"
 *  },
 *  "phone_numbers": [
 *    {
 *      "type": "home",
 *      "number": "212 555-1234"
 *    },
 *    {
 *      "type": "office",
 *      "number": "646 555-4567"
 *    }
 *  ],
 *  "children": [
 *    "Catherine",
 *    "Thomas",
 *    "Trevor"
 *  ],
 *  "spouse": null
 * };
 */


