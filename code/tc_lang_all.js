
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

export const bib_defaults = {
	CHAPTER: 0,
	VERSE: 0,
	LAST_VERSE: 0,
	BIBLES_SITE: "biblegateway",
	BIB_VER: "BIB",
};

export const refs_ids = {
	in_favor_side: "_in_favor",
	against_side: "_against",
	verse_kind: "vrs_kind",
	strong_kind: "stg_kind",
	ling_kind: "lnk_kind",
	qid_kind: "qid_kind",
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
	obj.msg_invert_ans = "INVERT ANSWER";
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

	obj.msg_change_one_answer = "Change one of these answers: ";
	
	obj.msg_in_favor = "In favor";
	obj.msg_against = "Against";
	obj.msg_respond = "RESPOND";
	
	obj.msg_help_statement_right_click = "Right click to open/close interaction of against or in favor citations ";
	obj.msg_help_answer_right_click = "Right click to go to corresponding web link";
	obj.msg_help_cit_ed_ok_right_click = "Right click to toggle In favor/Against";
	obj.msg_help_cit_ed_range_right_click = "Right click to toggle range field";
	obj.msg_help_cit_ed_any_bib_right_click = "Right click to toggle any bible version selection";
	
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

function fill_all_bibrefs_href(){
	for (const [key, value] of Object.entries(all_bibrefs)) {
		const ob_sufx = "_obj";
		if(key.endsWith(ob_sufx)){
			const prefx = key.slice(0, key.length - ob_sufx.length);
			const href_attr = prefx + "_href";
			const href_val = make_bible_ref(value);
			all_bibrefs[href_attr] = href_val;
			//console.log(`${href_attr} = ${href_val}`);
		}
	}  
	
}

export function init_en_module(){
	console.log("Called init_en_module");
	
	init_en_basic_msg();
	init_get_msg(all_en_msg);
	
	num2book_en["-1"] = all_en_msg.msg_def_book;	
	fill_reversed_object(num2book_en, book2num_en);
	
	fill_reversed_object(num2abbr, abbr2num);
	
	fill_all_bibrefs_href();

	init_en_exam_msg();
}

//init_en_module();
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

function citation_to_en(cit_obj){ // websites use english names for citations
	var num_b = glb_books_nums[cit_obj.book];
	cit_obj.lang = "en";
	cit_obj.abbr = num2abbr[num_b];
	cit_obj.book = num2book_en[num_b];  
	return cit_obj;
}

//export function make_bible_ref(cit_obj_orig){
export function make_bible_ref(cit_obj){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	//const cit_obj = citation_to_en(cit_obj_orig); // websites use english names for citations
	let book_nam =  cit_obj.book; // all_bibrefs references
	if(isNaN(cit_obj.book)){
		book_nam =  cit_obj.book;
	} else {
		let num = Number(cit_obj.book);
		book_nam =  num2book_en[num];  // normal references
	}
	console.log("make_bible_ref. cit_obj= " + JSON.stringify(cit_obj, null, "  ") + "\nbook_nam=" + book_nam);
	var bibref = null;
	if(cit_obj.site == "blueletterbible"){
		bibref = "https://www.blueletterbible.org/" + cit_obj.bib_ver + "/" + cit_obj.abbr + "/" + cit_obj.chapter + "/" + cit_obj.verse;
		return bibref;
		//https://www.blueletterbible.org/kjv/mat/3/4/
	}
	if(cit_obj.site == "biblehub"){
		if(cit_obj.bib_ver == "text"){
			bibref = "https://www.biblehub.com/text/" + book_nam + "/" + cit_obj.chapter + "-" + cit_obj.verse + ".htm";
			return bibref;
		} else {
			bibref = "https://www.biblehub.com/" + cit_obj.bib_ver + "/" + book_nam + "/" + cit_obj.chapter + ".htm";
			return bibref;
		}
	}
	if(cit_obj.site == "bibliaparalela"){
		// https://bibliaparalela.com/nblh/genesis/1.htm
		bibref = "https://bibliaparalela.com/" + cit_obj.bib_ver + "/" + book_nam + "/" + cit_obj.chapter + ".htm";
		return bibref;
	}
	if(cit_obj.site == "biblegateway"){
		bibref = "https://www.biblegateway.com/passage/?search=" + book_nam + "+" + cit_obj.chapter + ":" + cit_obj.verse;
		if(! (cit_obj.last_verse == bib_defaults.LAST_VERSE)){
			bibref += "-" + cit_obj.last_verse;
		}
		bibref += "&version=" + cit_obj.bib_ver;
		return bibref;
	}
	
}

export function make_strong_ref(scode){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	if((scode.length < 2) || ((scode[0] != "G") && (scode[0] != "H"))){
		return "https://www.biblehub.com";
	}
	var bibref = null;
	const the_code = scode.substring(1);
	if(scode[0] == "H"){
		bibref = "https://www.biblehub.com/hebrew/" + the_code + ".htm";
	}
	if(scode[0] == "G"){
		bibref = "https://www.biblehub.com/greek/" + the_code + ".htm";
	}
	return bibref;
}

const all_bibrefs = {
	// all '_href' terminated entries it will be filled with '_obj' terminated data when fill_all_bibrefs_href gets called
	isa_65_17_obj: { book: "isaiah", chapter: 65, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_65_17_str: `Isa 65:17. For, behold, I create new heavens and a new earth; and the former things will not be remembered, nor come into mind.`,
	isa_66_22_obj: { book: "isaiah", chapter: 66, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_66_22_str: `Isa 66:22. "For as the new heavens and the new earth, which I will make, shall remain before me," says Yahweh, "so your offspring and your name shall remain."`,
	mat_26_64_obj: { book: "matthew", chapter: 26, verse: 64, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mat_26_64_str: `Mat 26:64. Jesus said to him, "You have said so. Nevertheless, I tell you, after this you will see the Son of Man sitting at the right hand of Power, and coming on the clouds of the sky."`,
	mat_28_9_obj: { book: "matthew", chapter: 28, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mat_28_9_str: `Mat 28:9. As they went to tell his disciples, behold, Jesus met them, saying, “Rejoice!” They came and took hold of his feet, and worshiped him.`,
	mar_16_19_obj: { book: "mark", chapter: 16, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mar_16_19_str: `Mar 16:19. So then the Lord, after he had spoken to them, was received up into heaven, and sat down at the right hand of God.`,
	luk_20_36_obj: { book: "luke", chapter: 20, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_20_36_str: `Luk 20:36. For they can’t die any more, for they are like the angels, and are children of God, being children of the resurrection.`,
	luk_24_30_obj: { book: "luke", chapter: 24, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_24_30_str: `Luk 24:30. When he had sat down at the table with them, he took the bread and gave thanks. Breaking it, he gave it to them.`,
	luk_24_39_obj: { book: "luke", chapter: 24, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_24_39_str: `Luk 24:39. See my hands and my feet, that it is truly me. Touch me and see, for a spirit doesn’t have flesh and bones, as you see that I have`,
	luk_24_43_obj: { book: "luke", chapter: 24, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_24_43_str: `Luk 24:43. He took them, and ate in front of them.`,
	jhn_2_19_obj: { book: "john", chapter: 2, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_2_19_str: `Jhn 2:19. Jesus answered them, "Destroy this temple, and in three days I will raise it up."`,
	jhn_5_28_obj: { book: "john", chapter: 5, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_5_28_str: `Jhn 5:28. Don’t marvel at this, for the hour comes in which all who are in the tombs will hear his voice,`,
	jhn_5_29_obj: { book: "john", chapter: 5, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_5_29_str: `Jhn 5:29. and will come out; those who have done good, to the resurrection of life; and those who have done evil, to the resurrection of judgment.`,
	jhn_6_39_obj: { book: "john", chapter: 6, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_6_39_str: `Jhn 6:39. This is the will of my Father who sent me, that of all he has given to me I should lose nothing, but should raise him up at the last day.`,
	jhn_6_40_obj: { book: "john", chapter: 6, verse: 40, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_6_40_str: `Jhn 6:40. This is the will of the one who sent me, that everyone who sees the Son, and believes in him, should have eternal life; and I will raise him up at the last day.`,
	jhn_6_44_obj: { book: "john", chapter: 6, verse: 44, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_6_44_str: `Jhn 6:44. No one can come to me unless the Father who sent me draws him, and I will raise him up in the last day.`,
	jhn_6_54_obj: { book: "john", chapter: 6, verse: 54, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_6_54_str: `Jhn 6:54. He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day.`,
	jhn_11_24_obj: { book: "john", chapter: 11, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_11_24_str: `Jhn 11:24. Martha said to him, "I know that he will rise again in the resurrection at the last day."`,
	jhn_17_2_obj: { book: "john", chapter: 17, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_17_2_str: `Jhn 17:2. even as you gave him authority over all flesh, so he will give eternal life to all whom you have given him.`,
	jhn_20_20_obj: { book: "john", chapter: 20, verse: 20, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_20_20_str: `Jhn 20:20. When he had said this, he showed them his hands and his side. The disciples therefore were glad when they saw the Lord.`,
	jhn_20_27_obj: { book: "john", chapter: 20, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_20_27_str: `Jhn 20:27. Then he said to Thomas, “Reach here your finger, and see my hands. Reach here your hand, and put it into my side. Don’t be unbelieving, but believing`,
	jhn_14_2_obj: { book: "john", chapter: 14, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_14_2_str: `Jhn 14:2. In my Father’s house are many homes. If it weren’t so, I would have told you. I am going to prepare a place for you.`,
	act_1_11_obj: { book: "acts", chapter: 1, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_1_11_str: `Act 1:11. who also said, “You men of Galilee, why do you stand looking into the sky? This Jesus, who was received up from you into the sky, will come back in the same way as you saw him going into the sky.”`,
	act_10_41_obj: { book: "acts", chapter: 10, verse: 41, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_10_41_str: `Act 10:41. not to all the people, but to witnesses who were chosen before by God, to us, who ate and drank with him after he rose from the dead`,
	act_24_15_obj: { book: "acts", chapter: 24, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_24_15_str: `Act 24:15. having hope toward God, which these also themselves look for, that there will be a resurrection of the dead, both of the just and unjust.`,
	rom_6_9_obj: { book: "romans", chapter: 6, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rom_6_9_str: `Rom 6:9. knowing that Christ, being raised from the dead, dies no more. Death no longer has dominion over him`,
	_1co_15_22_obj: { book: "1_corinthians", chapter: 15, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1co_15_22_str: `1Co 15:22. For as in Adam all die, so also in Christ all will be made alive.`,
	_1co_15_42_obj: { book: "1_corinthians", chapter: 15, verse: 42, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1co_15_42_str: `1Co 15:42. So also is the resurrection of the dead. The body is sown perishable; it is raised imperishable.`,
	_1co_15_49_obj: { book: "1_corinthians", chapter: 15, verse: 49, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1co_15_49_str: `1Co 15:49. As we have borne the image of those made of dust, let’s also bear the image of the heavenly.`,
	phl_3_21_obj: { book: "philippians", chapter: 3, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	phl_3_21_str: `Phl 3:21. who will change the body of our humiliation to be conformed to the body of his glory, according to the working by which he is able even to subject all things to himself.`,
	col_1_15_obj: { book: "colossians", chapter: 1, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	col_1_15_str: `Col 1:15. He is the image of the invisible God, the firstborn of all creation.`,
	_2ti_2_18_obj: { book: "2_timothy", chapter: 2, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_2ti_2_18_str: `2Ti 2:18. men who have erred concerning the truth, saying that the resurrection is already past, and overthrowing the faith of some.`,
	heb_7_16_obj: { book: "hebrews", chapter: 7, verse: 16, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_7_16_str: `Heb 7:16. who has been made, not after the law of a fleshly commandment, but after the power of an endless life;`,
	heb_7_25_obj: { book: "hebrews", chapter: 7, verse: 25, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_7_25_str: `Heb 7:25. Therefore he is also able to save to the uttermost those who draw near to God through him, seeing that he lives forever to make intercession for them.`,
	heb_9_12_obj: { book: "hebrews", chapter: 9, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_9_12_str: `Heb 9:12. nor yet through the blood of goats and calves, but through his own blood, entered in once for all into the Holy Place, having obtained eternal redemption.`,
	heb_9_27_obj: { book: "hebrews", chapter: 9, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_9_27_str: `Heb 9:27. Inasmuch as it is appointed for men to die once, and after this, judgment,`,
	heb_9_28_obj: { book: "hebrews", chapter: 9, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_9_28_str: `Heb 9:28. so Christ also, having been offered once to bear the sins of many, will appear a second time, without sin, to those who are eagerly waiting for him for salvation.`,
	heb_10_12_obj: { book: "hebrews", chapter: 10, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_10_12_str: `Heb 10:12. but he, when he had offered one sacrifice for sins forever, sat down on the right hand of God,`,
	heb_13_8_obj: { book: "hebrews", chapter: 13, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_13_8_str: `Heb 13:8. Jesus Christ is the same yesterday, today, and forever.`,
	_2pe_3_13_obj: { book: "2_peter", chapter: 3, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_2pe_3_13_str: `2Pe 3:13. But, according to his promise, we look for new heavens and a new earth, in which righteousness dwells.`,
	_1jo_3_2_obj: { book: "1_john", chapter: 3, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1jo_3_2_str: `1Jo 3:2. Beloved, now we are children of God. It is not yet revealed what we will be; but we know that when he is revealed, we will be like him; for we will see him just as he is.`,
	rev_1_18_obj: { book: "revelation", chapter: 1, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_1_18_str: `Rev 1:18. and the Living one. I was dead, and behold, I am alive forever and ever. Amen. I have the keys of Death and of Hades`,
	rev_20_13_obj: { book: "revelation", chapter: 20, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_20_13_str: `Rev 20:13. The sea gave up the dead who were in it. Death and Hades gave up the dead who were in them. They were judged, each one according to his works.`,
	rev_21_1_obj: { book: "revelation", chapter: 21, verse: 1, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_21_1_str: `Rev 21:1. I saw a new heaven and a new earth: for the first heaven and the first earth have passed away, and the sea is no more.`,
};

function init_en_exam_msg(){
	let bibref = {};
	
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
	const href_physical_resu = "../en/book.html#physical_DOT_";
	const href_still_physical = "../en/book.html#physical_DOT_";
	const href_not_die_resu = "../en/book.html#they-cant-die_DOT_";
	const href_in_heaven_resu = "../en/book.html#in-the-sky_DOT_";
	const href_like_jesus_resu = "../en/book.html#physical_DOT_";
	const href_for_all_resu = "../en/book.html#for-all_DOT_";
	const href_not_yet_resu = "../en/book.html#has-not-happened_DOT_";
	const href_only_few_resu = "../en/book.html#has-not-happened_DOT_";
	const href_new_earth_resu = "../en/book.html#a-new-earth_DOT_";
	const href_sleep_resu = "../en/book.html#asleep_DOT_";
	const href_the_cloth = "../en/book.html#the-cloth_DOT_";
	
	const lg = all_en_msg;
	lg.q0_1__end_of_test = "These questions are not for you. This is the end of the questions for you, unless you did not really mean it and change your answer. Click on your answer to change it.";
	lg.q0_2__contradiction = "You have a contradiction in your answers. Please change one of your answers to the questions shown in red. The contradiction is in one of them. Otherwise you cannot continue with these questions. Click on your answer to change it.";
	lg.q0_3__end_so_far = "These questions are in construction. This is the end of the questions for you so far...";
	lg.q0_4__about_beliefs = "<b>All these questions are about what you believe, NOT about what you think you have certainty. Some of them might be check questions to avoid silly behaviour. Answer them all properly. You can change any answer at any time by clicking on it.</b>";
	
	lg.q1_1__are_you_reasonable = "This questions are for rational and reasonable people.";
	lg.q1_1__yes = "I am a rational and reasonable person.";
	lg.q1_1__should_yes = "All people answering these questions are required to be RATIONAL and REASONABLE.";
	lg.q1_1__pru_pos_txt = `<span class="is_big">+</span>`;
	lg.q1_1__pru_href = all_bibrefs.luk_24_39_href;
	lg.q1_1__pru_should_href = all_bibrefs.mat_26_64_href;
	lg.q1_1__no = "I am NOT a rational and reasonable person.";
	
	lg.q1_2__experience_is_evidence = "A claim that most people can see, hear, smell, taste, touch, or confirm by perceptual experience, ";
	lg.q1_2__yes = "it is evidence.";
	lg.q1_2__no = "it is NOT evidence";
	
	lg.q1_3__creator_section = `<a class='exam_ref exam_title' href='${href_creator_tit}'>Creator</a>`;
	lg.q1_3__are_humans_intelligent = `With respect to <a class='exam_ref' href='${href_tch_crea}'>technical creativity</a>, there is <a class='exam_ref' href='${href_evidence}'>evidence</a> that the human being `;
	lg.q1_3__yes = "is intelligent, designer and has technical creativity.";
	lg.q1_3__should = "EVIDENCE are all the buildings, transistors, cars, satellites, refrigerators, washing machines, polishers, MACHINES that make machines, factories that use machines made by other factories, that humans have made";
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
	lg.q1_4__should1 = "a knife is EVIDENCE of men's technical creativity";
	lg.q1_4__lamp = "a lamp requires technical creativity to reproduce";
	lg.q1_4__should2 = "a lamp is EVIDENCE of men's technical creativity";
	lg.q1_4__clock = "a clock requires technical creativity to reproduce";
	lg.q1_4__should3 = "a clock is EVIDENCE of men's technical creativity";
	
	lg.q1_5__more_complex_than = `Select ALL claims about <a class='exam_ref' href='${href_tch_cplx}'>technical complexity</a> supported by evidence: `;
	lg.q1_5__building_vs_knife = "a building has more technical complexity than a knife";
	lg.q1_5__should1 = "generally speaking a building is HARDER to make than a knife, just by the fact that usually you need knives to make a building";
	lg.q1_5__car_vs_lamp = "a car has more technical complexity than a lamp";
	lg.q1_5__should2 = "generally speaking a car is HARDER to make than a lamp, just by the fact that cars usually have lamps";
	lg.q1_5__cellphone_vs_clock = "a cellphone has more technical complexity than a clock";
	lg.q1_5__should3 = "generally speaking a cellphone is HARDER to make than a clock, just by the fact that usually a cellphone has a built-in clock";
	
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
	
	
	lg.q3_1__resurrection_section = `<a class='exam_ref exam_title' href='${href_resurrection_tit}'>Resurrection</a>`;
	lg.q3_1__jesus_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of Jesus Christ: `;
	lg.q3_1__physical = "He was physically resurrected, in BODY and spirit";
	lg.q3_1__not_to_die = "He is alive FOREVER, to not die again, because He cannot longer die.";
	lg.q3_1__in_heaven = "He is, in BODY and spirit, in the heavens, that PHYSICAL sky that we can see, and that has clouds";
	
	lg.q3_2__people_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of the dead promissed by Jesus Christ: `;
	lg.q3_2__like_jesus = "It is in BODY and SPIRIT just like Jesus Chist. And it is in a new body, similar to Jesus's one, that cannot die.";
	lg.q3_2__for_all = "It is for everyone. ALL people, just and unjust.";
	lg.q3_2__not_yet_most = "It has NOT happened for almost anybody. The promissed event is on the last day.";
	//lg.q3_2__happened_for_few = "It HAS happened for a FEW ones. Some male genetic decendants of Jacob, of Israel, have been resurrected.";
	lg.q3_2__new_earth = "It is to live forever in a new physical EARTH with new physical HEAVENS";
	lg.q3_2__sleep = "Before resurrection, the dead person has NO body, NO consciousness, and therefore cannot do anything. The dead ARE dead.";

	lg.q3_3__dispute_or_accept_resurrection = `What statements about <a class='exam_ref' href='${href_resurrection}'>resurrection</a> would you like to explore and optionally dispute? `;
	lg.q3_3__not_believed = "The ones I DO NOT believe are claimed by The Bible.";
	lg.q3_3__all_stms = "ALL of them.";
	lg.q3_3__go_on = "NONE of them. I ACCEPT they are all claimed by The Bible. Let's go on.";

	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${href_physical_resu}'>Physical</a>`;
	lg.q4_1__physical = `Select all verses that support a physical resurrection of Jesus Christ`;
	lg.q4_1__verse1_str = uppercase_words_in_string(all_bibrefs.luk_24_39_str, ["Touch", "flesh", "bones,"]);
	lg.q4_1__verse1_href = all_bibrefs.luk_24_39_href;
	lg.q4_1__verse1_should = "FLESH and BONES are PHYSICAL.";
	lg.q4_1__verse2_str = uppercase_words_in_string(all_bibrefs.jhn_20_27_str, ["hand,", "put", "side."]);
	lg.q4_1__verse2_href = all_bibrefs.jhn_20_27_href;
	lg.q4_1__verse2_should = "Putting a hand into FLESH is something PHYSICAL.";
	lg.q4_1__verse3_str = uppercase_words_in_string(all_bibrefs.act_10_41_str, ["ate", "drank"]);
	lg.q4_1__verse3_href = all_bibrefs.act_10_41_href;
	lg.q4_1__verse3_should = "EATING and DRINKING is something PHYSICAL.";
	lg.q4_1__verse4_str = uppercase_words_in_string(all_bibrefs.mat_28_9_str, ["took", "hold", "feet,"]);
	lg.q4_1__verse4_href = all_bibrefs.mat_28_9_href;
	lg.q4_1__verse4_should = "TAKING hold of somebody's feet is something PHYSICAL.";
	lg.q4_1__verse5_str = uppercase_words_in_string(all_bibrefs.luk_24_30_str, ["took", "bread"]);
	lg.q4_1__verse5_href = all_bibrefs.luk_24_30_href;
	lg.q4_1__verse5_should = "BREAKING bread is something PHYSICAL.";
	lg.q4_1__verse6_str = uppercase_words_in_string(all_bibrefs.jhn_2_19_str, ["temple,", "raise"]);
	lg.q4_1__verse6_href = all_bibrefs.jhn_2_19_href;
	lg.q4_1__verse6_should = "REBUILDING a body is something PHYSICAL.";
	lg.q4_1__verse7_str = uppercase_words_in_string(all_bibrefs.luk_24_43_str, ["took", "ate"]);
	lg.q4_1__verse7_href = all_bibrefs.luk_24_43_href;
	lg.q4_1__verse7_should = "EATING is something PHYSICAL.";
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${href_not_die_resu}'>To Not die again</a>`;
	lg.q5_1__not_die = `Select all verses that support a resurrection of Jesus Christ to NOT die again`;
	lg.q5_1__verse1_str = uppercase_words_in_string(all_bibrefs.rom_6_9_str, ["dies", "no", "more."]);
	lg.q5_1__verse1_href = all_bibrefs.rom_6_9_href;
	lg.q5_1__verse1_should = "DIES NO MORE.";
	lg.q5_1__verse2_str = uppercase_words_in_string(all_bibrefs.heb_7_16_str, ["endless", "life;"]);
	lg.q5_1__verse2_href = all_bibrefs.heb_7_16_href;
	lg.q5_1__verse2_should = "ENDLESS LIFE.";
	lg.q5_1__verse3_str = uppercase_words_in_string(all_bibrefs.rev_1_18_str, ["alive", "forever", "ever."]);
	lg.q5_1__verse3_href = all_bibrefs.rev_1_18_href;
	lg.q5_1__verse3_should = "ALIVE FOREVER and EVER.";
	lg.q5_1__verse4_str = uppercase_words_in_string(all_bibrefs.heb_7_25_str, ["lives", "forever", ]);
	lg.q5_1__verse4_href = all_bibrefs.heb_7_25_href;
	lg.q5_1__verse4_should = "LIVES FOREVER.";
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${href_in_heaven_resu}'>In Heaven</a>`;
	lg.q6_1__in_heaven = `Select all verses that support a resurrected Jesus Christ that is in heaven in BODY and spirit.`;
	lg.q6_1__verse1_str = uppercase_words_in_string(all_bibrefs.act_1_11_str, ["going", "into", "sky."]);
	lg.q6_1__verse1_href = all_bibrefs.act_1_11_href;
	lg.q6_1__verse1_should = "GOING INTO the SKY. He went physically into the heavens";
	lg.q6_1__verse2_str = uppercase_words_in_string(all_bibrefs.mat_26_64_str, ["sitting", "clouds", "sky"]);
	lg.q6_1__verse2_href = all_bibrefs.mat_26_64_href;
	lg.q6_1__verse2_should = "He is SITTING and coming on the CLOUDS";
	lg.q6_1__verse3_str = uppercase_words_in_string(all_bibrefs.jhn_14_2_str, ["house", "mansions;", "place"]);
	lg.q6_1__verse3_href = all_bibrefs.jhn_14_2_href;
	lg.q6_1__verse3_should = "He makes in a PLACE for his disciples";
	lg.q6_1__verse4_str = uppercase_words_in_string(all_bibrefs.heb_9_12_str, ["entered", "Place,", "heaven"]);
	lg.q6_1__verse4_href = all_bibrefs.heb_9_12_href;
	lg.q6_1__verse4_should = "He ENTERED the Holy PLACE in the heavens";
	lg.q6_1__verse5_str = uppercase_words_in_string(all_bibrefs.heb_10_12_str, ["sat", "down"]);
	lg.q6_1__verse5_href = all_bibrefs.heb_10_12_href;
	lg.q6_1__verse5_should = "He SAT DOWN in the heavens";
	lg.q6_1__verse6_str = uppercase_words_in_string(all_bibrefs.heb_13_8_str, ["is", "same", "forever."]);
	lg.q6_1__verse6_href = all_bibrefs.heb_13_8_href;
	lg.q6_1__verse6_should = "He is ALWAYS the same. So if He resurrected in BODY and spirit, He MUST be in BODY and spirit in the heavens.";
	lg.q6_1__verse7_str = uppercase_words_in_string(all_bibrefs.col_1_15_str, ["image", "invisible"]);
	lg.q6_1__verse7_href = all_bibrefs.col_1_15_href;
	lg.q6_1__verse7_should = "He is the IMAGE of the INVISIBLE God. So if He was visible when He resurrected, He must STILL be visible in the heavens.";
	

	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${href_like_jesus_resu}'>Like Jesus</a>`;
	lg.q7_1__like_jesus = `Select all verses that support a resurrection of the dead that is like Jesus resurrection`;
	lg.q7_1__verse1_str = uppercase_words_in_string(all_bibrefs.phl_3_21_str, ["conformed", "body", ]);
	lg.q7_1__verse1_href = all_bibrefs.phl_3_21_href;
	lg.q7_1__verse1_should = "Just LIKE the BODY of Jesus";
	lg.q7_1__verse2_str = uppercase_words_in_string(all_bibrefs._1jo_3_2_str, ["like", "him;", ]);
	lg.q7_1__verse2_href = all_bibrefs._1jo_3_2_href;
	lg.q7_1__verse2_should = "We will be LIKE HIM";
	lg.q7_1__verse3_str = uppercase_words_in_string(all_bibrefs.luk_20_36_str, ["can’t", "die", ]);
	lg.q7_1__verse3_href = all_bibrefs.luk_20_36_href;
	lg.q7_1__verse3_should = "Thos bodies CAN'T DIE";
	lg.q7_1__verse4_str = uppercase_words_in_string(all_bibrefs.heb_9_27_str, ["die", "once,", ]);
	lg.q7_1__verse4_href = all_bibrefs.heb_9_27_href;
	lg.q7_1__verse4_should = "He ENTERED the Holy PLACE in the heavens";
	lg.q7_1__verse5_str = uppercase_words_in_string(all_bibrefs._1co_15_49_str, ["bear", "image", "heavenly.", ]);
	lg.q7_1__verse5_href = all_bibrefs._1co_15_49_href;
	lg.q7_1__verse5_should = "We are destined to DIE ONCE. No more.";
	lg.q7_1__verse6_str = uppercase_words_in_string(all_bibrefs._1co_15_42_str, ["body", "raised", "imperishable."]);
	lg.q7_1__verse6_href = all_bibrefs._1co_15_42_href;
	lg.q7_1__verse6_should = "THe raised body is IMPERISHABLE";
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${href_for_all_resu}'>For All</a>`;
	lg.q8_1__for_all = `Select all verses that support a resurrection of the dead that is for ALL people`;
	lg.q8_1__verse1_str = uppercase_words_in_string(all_bibrefs.jhn_5_28_str, ["all", "tombs", ]);
	lg.q8_1__verse1_href = all_bibrefs.jhn_5_28_href;
	lg.q8_1__verse1_should = "ALL is ALL";
	lg.q8_1__verse2_str = uppercase_words_in_string(all_bibrefs.jhn_5_29_str, ["good,", "evil,", ]);
	lg.q8_1__verse2_href = all_bibrefs.jhn_5_29_href;
	lg.q8_1__verse2_should = "GOOD and EVIL";
	lg.q8_1__verse3_str = uppercase_words_in_string(all_bibrefs.act_24_15_str, ["both", "just", "unjust.", ]);
	lg.q8_1__verse3_href = all_bibrefs.act_24_15_href;
	lg.q8_1__verse3_should = "BOTH JUST and UNJUST";
	lg.q8_1__verse4_str = uppercase_words_in_string(all_bibrefs.jhn_6_39_str, ["all", "lose", "nothing,", ]);
	lg.q8_1__verse4_href = all_bibrefs.jhn_6_39_href;
	lg.q8_1__verse4_should = "ALL and LOSE NOTHING";
	lg.q8_1__verse5_str = uppercase_words_in_string(all_bibrefs.jhn_17_2_str, ["all", "flesh", "eternal", "life", ]);
	lg.q8_1__verse5_href = all_bibrefs.jhn_17_2_href;
	lg.q8_1__verse5_should = "ALL FLESH ETERNAL LIFE";
	lg.q8_1__verse6_str = uppercase_words_in_string(all_bibrefs._1co_15_22_str, ["all", "alive.", ]);
	lg.q8_1__verse6_href = all_bibrefs._1co_15_22_href;
	lg.q8_1__verse6_should = "ALL is ALL";
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${href_not_yet_resu}'>NOT yet for almost ANYBODY</a>`;
	lg.q9_1__not_yet = `Select all verses that support a resurrection of the dead that has NOT happend for almost ANYBODY`;
	lg.q9_1__verse1_str = uppercase_words_in_string(all_bibrefs.jhn_6_39_str, ["last", "day.", ]);
	lg.q9_1__verse1_href = all_bibrefs.jhn_6_39_href;
	lg.q9_1__verse1_should = "It is on the LAST DAY";
	lg.q9_1__verse2_str = uppercase_words_in_string(all_bibrefs._2ti_2_18_str, ["erred", "already", "past,"]);
	lg.q9_1__verse2_href = all_bibrefs._2ti_2_18_href;
	lg.q9_1__verse2_should = "It is NOT already past";
	lg.q9_1__verse3_str = uppercase_words_in_string(all_bibrefs.jhn_6_40_str, ["last", "day.", ]);
	lg.q9_1__verse3_href = all_bibrefs.jhn_6_40_href;
	lg.q9_1__verse3_should = "It is on the LAST DAY";
	lg.q9_1__verse4_str = uppercase_words_in_string(all_bibrefs.jhn_6_44_str, ["last", "day.", ]);
	lg.q9_1__verse4_href = all_bibrefs.jhn_6_44_href;
	lg.q9_1__verse4_should = "It is on the LAST DAY";
	lg.q9_1__verse5_str = uppercase_words_in_string(all_bibrefs.jhn_6_54_str, ["last", "day.", ]);
	lg.q9_1__verse5_href = all_bibrefs.jhn_6_54_href;
	lg.q9_1__verse5_should = "It is on the LAST DAY";
	lg.q9_1__verse6_str = uppercase_words_in_string(all_bibrefs.jhn_11_24_str, ["last", 'day."', ]);
	lg.q9_1__verse6_href = all_bibrefs.jhn_11_24_href;
	lg.q9_1__verse6_should = "It is on the LAST DAY";
	lg.q9_1__verse7_str = uppercase_words_in_string(all_bibrefs.rev_20_13_str, ["gave", "dead"]);
	lg.q9_1__verse7_href = all_bibrefs.rev_20_13_href;
	lg.q9_1__verse7_should = "It is AFTER this earth and these heavens get destroyed";
	
	/*
	lg.q10_1__has_for_few_sec = `<a class='exam_ref exam_title' href='${href_only_few_resu}'>Only for few</a>`;
	lg.q10_1__has_for_few = `1st quest ONLY FOR FEW`;
	lg.q10_1__go = "Go";
	lg.q10_1__stay = "Stay";
	*/
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${href_new_earth_resu}'>New Earth</a>`;
	lg.q11_1__new_earth = `Select all verses that support a resurrection of the dead to live in a NEW EARTH with a new heavens`;
	lg.q11_1__verse1_str = uppercase_words_in_string(all_bibrefs.rev_21_1_str, ["new", "earth:", ]);
	lg.q11_1__verse1_href = all_bibrefs.rev_21_1_href;
	lg.q11_1__verse1_should = "It is on a NEW EARTH with a new heavens";
	lg.q11_1__verse2_str = uppercase_words_in_string(all_bibrefs._2pe_3_13_str, ["new", "earth,", ]);
	lg.q11_1__verse2_href = all_bibrefs._2pe_3_13_href;
	lg.q11_1__verse2_should = "It is on a NEW EARTH with a new heavens";
	lg.q11_1__verse3_str = uppercase_words_in_string(all_bibrefs.isa_65_17_str, ["new", "earth;", ]);
	lg.q11_1__verse3_href = all_bibrefs.isa_65_17_href;
	lg.q11_1__verse3_should = "It is on a NEW EARTH with a new heavens";
	lg.q11_1__verse4_str = uppercase_words_in_string(all_bibrefs.isa_66_22_str, ["new", "earth,", ]);
	lg.q11_1__verse4_href = all_bibrefs.isa_66_22_href;
	lg.q11_1__verse4_should = "It is on a NEW EARTH with a new heavens";
	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${href_sleep_resu}'>Sleep</a>`;
	lg.q12_1__sleep = `1st quest SLEEP`;
	lg.q12_1__go = "Go";
	lg.q12_1__stay = "Stay";

	lg.q13_1__the_cloth_sec = `<a class='exam_ref exam_title' href='${href_the_cloth}'>The Cloth</a>`;
	lg.q13_1__the_cloth = `1st quest THE CLOTH`;
	lg.q13_1__go = "Go";
	lg.q13_1__stay = "Stay";
	
}

