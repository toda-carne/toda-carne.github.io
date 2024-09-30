
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

export function is_mobile_browser() {
	const m_list = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
	
	return m_list.some((m_item) => {
		return navigator.userAgent.match(m_item);
	});
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
	added_pfx: "added_",
	verse_kind: "vrs_kind",
	strong_kind: "stg_kind",
	link_kind: "lnk_kind",
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
	
	obj.msg_sel_cit = "SELECT FROM DB";
	obj.msg_add_verse = "ADD VERSE";
	obj.msg_add_strong = "ADD STRONG CODE";
	obj.msg_add_link = "ADD WEB LINK";
	obj.msg_end_edit = "END EDIT";
	
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

	obj.msg_dispute_rclick = "To dispute right click";
	obj.msg_dispute_hold_click = "To dispute hold click";
	
	obj.msg_in_favor = "In favor";
	obj.msg_against = "Against";
	obj.msg_respond = "RESPOND";
	
	obj.msg_help_statement_right_click = "Right click to open/close interaction of against or in favor citations ";
	obj.msg_help_answer_right_click = "Right click to go to corresponding web link";
	obj.msg_help_cit_ed_ok_right_click = "Right click to toggle In favor/Against";
	obj.msg_help_cit_ed_range_right_click = "Right click to toggle range field";
	obj.msg_help_cit_ed_any_bib_right_click = "Right click to toggle any bible version selection";

	obj.msg_qref_question_num = "question number";
	
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

export function get_dispute_msg() {
	if(is_mobile_browser()){
		return glb_curr_lang.msg_dispute_hold_click;
	}
	return glb_curr_lang.msg_dispute_rclick;
}

export function fill_all_strongrefs_href(){
	for (const [key, value] of Object.entries(all_strongrefs)) {
		const ob_sufx = "_cod";
		if(key.endsWith(ob_sufx)){
			const prefx = key.slice(0, key.length - ob_sufx.length);
			const href_attr = prefx + "_href";
			const href_val = make_strong_ref(value);
			all_strongrefs[href_attr] = href_val;
			//console.log(`${href_attr} = ${href_val}`);
		}
	}  	
}

export function fill_bibrefs_href(all_rfs){
	for (const [key, bib_obj] of Object.entries(all_rfs)) {
		const ob_sufx = "_obj";
		if(key.endsWith(ob_sufx)){
			const prefx = key.slice(0, key.length - ob_sufx.length);
			const href_attr = prefx + "_href";
			const href_val = make_bible_ref(bib_obj);
			all_rfs[href_attr] = href_val;
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
	
	fill_bibrefs_href(all_bibrefs);
	fill_all_strongrefs_href();

	init_en_exam_msg();
}

//init_en_module();
export function uppercase_words_in_string(the_str, to_up_arr){
	const words = the_str.split(' ');
	//console.log(JSON.stringify(words, null, "  "));
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

export function get_book_nam(book){
	let book_nam = book; 
	if(isNaN(book)){ // bibrefs references
		book_nam = book;
	} else { // normal references
		let num = Number(book);
		book_nam =  num2book_en[num];
	}
	return book_nam;
}

export function get_loc_book_nam(book){
	let num = -1;
	if(isNaN(book)){ // bibrefs references
		num = book2num_en[book];
	} else { // normal references
		num = Number(book);
	}
	let book_nam =  glb_all_books[num];  
	return book_nam;
}

export function get_verse_cit_key(cit_obj){
	const book_nam =  get_book_nam(cit_obj.book);
	const kk = "ver_" + book_nam + "_" + cit_obj.chapter + "_" + cit_obj.verse;
	if(cit_obj.last_verse != bib_defaults.LAST_VERSE){
		kk = kk + "_" + cit_obj.last_verse;
	}
	return kk;
}

//export function make_bible_ref(cit_obj_orig){
export function make_bible_ref(cit_obj){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	//const cit_obj = citation_to_en(cit_obj_orig); // websites use english names for citations
	const book_nam =  get_book_nam(cit_obj.book);
	//console.log("make_bible_ref. cit_obj= " + JSON.stringify(cit_obj, null, "  ") + "\nbook_nam=" + book_nam);
	let bibref = null;
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

export function bib_obj_to_txt(bib_obj){
	const loc_book_nam =  get_loc_book_nam(bib_obj.book);
	//console.log("loc_book_nam=" + loc_book_nam);
	let cit_txt = loc_book_nam + " " + bib_obj.chapter + ":" + bib_obj.verse;
	if(! (bib_obj.last_verse == bib_defaults.LAST_VERSE)){
		cit_txt += " - " + bib_obj.last_verse;
	}
	cit_txt += " (" + bib_obj.bib_ver + ")";
	return cit_txt;
}

export function bib_obj_to_cit_obj(bib_obj){
	const cit_obj = JSON.parse(JSON.stringify(bib_obj));
	cit_obj.book = book2num_en[bib_obj.book];
	cit_obj.kind = refs_ids.verse_kind;
	cit_obj.rclk_href = make_bible_ref(bib_obj);
	return cit_obj;
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

export function get_verse_reponse_name(qid, cit_obj){
	const kk = get_verse_cit_key(cit_obj);
	const r_nam = qid + "reponse_" + kk;
	return r_nam;
}

export const all_strongrefs = {
	H1004_cod: "H1004",
	H5782_cod: "H5782",
}

export const all_bibrefs = {
	// all '_href' terminated entries it will be filled with '_obj' terminated data when fill_bibrefs_href gets called
	gen_15_15_obj: { book: "genesis", chapter: 15, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	gen_15_15_str: `Gen 15:15. but you will go to your fathers in peace. You will be buried at a good old age.`,
	gen_25_8_obj: { book: "genesis", chapter: 25, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	gen_25_8_str: `Gen 25:8. Abraham gave up his spirit, and died at a good old age, an old man, and full of years, and was gathered to his people.`,
	gen_35_29_obj: { book: "genesis", chapter: 35, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	gen_35_29_str: `Gen 35:29. Isaac gave up the spirit and died, and was gathered to his people, old and full of days. Esau and Jacob, his sons, buried him.`,
	job_7_21_obj: { book: "job", chapter: 7, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	job_7_21_str: `Job 7:21. Why do you not pardon my disobedience, and take away my iniquity? For now will I lie down in the dust. You will seek me diligently, but I will not be.`,
	job_14_12_obj: { book: "job", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	job_14_12_str: `Job 14:12. so man lies down and doesn’t rise. Until the heavens are no more, they will not awake, nor be roused out of their sleep.`,
	psa_16_11_obj: { book: "psalms", chapter: 16, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	psa_16_11_str: `Psa 16:11. You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.`,
	psa_115_17_obj: { book: "psalms", chapter: 115, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	psa_115_17_str: `Psa 115:17. The dead don’t praise Yah, neither any who go down into silence;`,
	ecc_9_10_obj: { book: "ecclesiastes", chapter: 9, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	ecc_9_10_str: `Ecc 9:10. Whatever your hand finds to do, do it with your might; for there is no work, nor plan, nor knowledge, nor wisdom, in Sheol, where you are going.`,
	ecc_12_7_obj: { book: "ecclesiastes", chapter: 12, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	ecc_12_7_str: `Ecc 12:7. and the dust returns to the earth as it was, and the spirit returns to God who gave it.`,
	isa_8_19_obj: { book: "isaiah", chapter: 8, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_8_19_str: `Isa 8:19. When they tell you, “Consult with those who have familiar spirits and with the wizards, who chirp and who mutter,” shouldn’t a people consult with their God? Should they consult the dead on behalf of the living?`,
	isa_14_7_obj: { book: "isaiah", chapter: 14, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_14_8_obj: { book: "isaiah", chapter: 14, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_14_9_txt_obj: { book: "isaiah", chapter: 14, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", },
	isa_14_10_obj: { book: "isaiah", chapter: 14, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_14_10_str: `Isa 14:10. They all will answer and ask you, "Have you also become as weak as we are? Have you become like us?"`,
	isa_14_12_obj: { book: "isaiah", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_14_18_txt_obj: { book: "isaiah", chapter: 14, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", },
	isa_65_17_obj: { book: "isaiah", chapter: 65, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_65_17_str: `Isa 65:17. For, behold, I create new heavens and a new earth; and the former things will not be remembered, nor come into mind.`,
	isa_66_22_obj: { book: "isaiah", chapter: 66, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	isa_66_22_str: `Isa 66:22. "For as the new heavens and the new earth, which I will make, shall remain before me," says Yahweh, "so your offspring and your name shall remain."`,
	mat_17_3_obj: { book: "matthew", chapter: 17, verse: 3, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mat_17_3_str: `Mat 17:3. Behold, Moses and Elijah appeared to them talking with him.`,
	mat_17_4_obj: { book: "matthew", chapter: 17, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mat_26_64_obj: { book: "matthew", chapter: 26, verse: 64, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mat_26_64_str: `Mat 26:64. Jesus said to him, "You have said so. Nevertheless, I tell you, after this you will see the Son of Man sitting at the right hand of Power, and coming on the clouds of the sky."`,
	mat_28_9_obj: { book: "matthew", chapter: 28, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mat_28_9_str: `Mat 28:9. As they went to tell his disciples, behold, Jesus met them, saying, "Rejoice!" They came and took hold of his feet, and worshiped him.`,
	mar_16_19_obj: { book: "mark", chapter: 16, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	mar_16_19_str: `Mar 16:19. So then the Lord, after he had spoken to them, was received up into heaven, and sat down at the right hand of God.`,
	luk_8_52_obj: { book: "luke", chapter: 8, verse: 52, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_8_52_str: `Luk 8:52. All were weeping and mourning her, but he said, "Don’t weep. She isn’t dead, but sleeping."`,
	luk_15_24_obj: { book: "luke", chapter: 15, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_15_24_str: `Luk 15:24. for this, my son, was dead, and is alive again. He was lost, and is found.’ Then they began to celebrate.`,
	luk_16_24_obj: { book: "luke", chapter: 16, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_16_24_str: `Luk 16:24. He cried and said, ‘Father Abraham, have mercy on me, and send Lazarus, that he may dip the tip of his finger in water, and cool my tongue! For I am in anguish in this flame.’`,
	luk_20_36_obj: { book: "luke", chapter: 20, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_20_36_str: `Luk 20:36. For they can’t die any more, for they are like the angels, and are children of God, being children of the resurrection.`,
	luk_20_38_obj: { book: "luke", chapter: 20, verse: 38, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_20_38_str: `Luk 20:38. Now he is not the God of the dead, but of the living, for all are alive to him.`,
	luk_23_43_obj: { book: "luke", chapter: 23, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_23_43_str: `Luk 23:43.  Jesus said to him, "Assuredly I tell you, today you will be with me in Paradise."`,
	luk_24_30_obj: { book: "luke", chapter: 24, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_24_30_str: `Luk 24:30. When he had sat down at the table with them, he took the bread and gave thanks. Breaking it, he gave it to them.`,
	luk_24_39_obj: { book: "luke", chapter: 24, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_24_39_str: `Luk 24:39. See my hands and my feet, that it is truly me. Touch me and see, for a spirit doesn’t have flesh and bones, as you see that I have`,
	luk_24_43_obj: { book: "luke", chapter: 24, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	luk_24_43_str: `Luk 24:43. He took them, and ate in front of them.`,
	jhn_2_19_obj: { book: "john", chapter: 2, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_2_19_str: `Jhn 2:19. Jesus answered them, "Destroy this temple, and in three days I will raise it up."`,
	jhn_4_24_obj: { book: "john", chapter: 4, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_4_24_str: `Jhn 4:24. God is spirit, and those who worship him must worship in spirit and truth.`,
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
	jhn_11_11_obj: { book: "john", chapter: 11, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_11_11_str: `Jhn 11:11. He said these things, and after that, he said to them, "Our friend, Lazarus, has fallen asleep, but I am going so that I may awake him out of sleep."`,
	jhn_11_24_obj: { book: "john", chapter: 11, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_11_24_str: `Jhn 11:24. Martha said to him, "I know that he will rise again in the resurrection at the last day."`,
	jhn_17_2_obj: { book: "john", chapter: 17, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_17_2_str: `Jhn 17:2. even as you gave him authority over all flesh, so he will give eternal life to all whom you have given him.`,
	jhn_20_20_obj: { book: "john", chapter: 20, verse: 20, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_20_20_str: `Jhn 20:20. When he had said this, he showed them his hands and his side. The disciples therefore were glad when they saw the Lord.`,
	jhn_20_27_obj: { book: "john", chapter: 20, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_20_27_str: `Jhn 20:27. Then he said to Thomas, "Reach here your finger, and see my hands. Reach here your hand, and put it into my side. Don’t be unbelieving, but believing"`,
	jhn_14_2_obj: { book: "john", chapter: 14, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	jhn_14_2_str: `Jhn 14:2. In my Father’s house are many homes. If it weren’t so, I would have told you. I am going to prepare a place for you.`,
	act_1_11_obj: { book: "acts", chapter: 1, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_1_11_str: `Act 1:11. who also said, "You men of Galilee, why do you stand looking into the sky? This Jesus, who was received up from you into the sky, will come back in the same way as you saw him going into the sky."`,
	act_7_59_obj: { book: "acts", chapter: 7, verse: 59, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_7_59_str: `Act 7:59. They stoned Stephen as he called out, saying, "Lord Jesus, receive my spirit!"`,
	act_10_41_obj: { book: "acts", chapter: 10, verse: 41, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_10_41_str: `Act 10:41. not to all the people, but to witnesses who were chosen before by God, to us, who ate and drank with him after he rose from the dead`,
	act_13_36_obj: { book: "acts", chapter: 13, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	act_13_36_str: `Act 13:36. For David, after he had in his own generation served the counsel of God, fell asleep, was laid with his fathers, and saw decay.`,
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
	_2co_5_8_obj: { book: "2_corinthians", chapter: 5, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_2co_5_8_str: `2Co 5:8. We are courageous, I say, and are willing rather to be absent from the body and to be at home with the Lord.`,
	_2co_12_4_obj: { book: "2_corinthians", chapter: 12, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_2co_12_4_str: `2Co 12:4. how he was caught up into Paradise, and heard unspeakable words, which it is not lawful for a man to utter.`,
	phl_1_23_obj: { book: "philippians", chapter: 1, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	phl_1_23_str: `Phl 1:23. But I am hard pressed between the two, having the desire to depart and be with Christ, which is far better.`,
	phl_3_21_obj: { book: "philippians", chapter: 3, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	phl_3_21_str: `Phl 3:21. who will change the body of our humiliation to be conformed to the body of his glory, according to the working by which he is able even to subject all things to himself.`,
	col_1_15_obj: { book: "colossians", chapter: 1, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	col_1_15_str: `Col 1:15. He is the image of the invisible God, the firstborn of all creation.`,
	_1th_4_14_obj: { book: "1_thessalonians", chapter: 4, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1th_4_14_str: `1Th 4:14. For if we believe that Jesus died and rose again, even so God will bring with him those who have fallen asleep in Jesus.`,
	_1ti_5_6_obj: { book: "1_timothy", chapter: 5, verse: 6, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1ti_5_6_str: `1Ti 5:6. But she who gives herself to pleasure is dead while she lives. `,
	_2ti_2_18_obj: { book: "2_timothy", chapter: 2, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_2ti_2_18_str: `2Ti 2:18. men who have erred concerning the truth, saying that the resurrection is already past, and overthrowing the faith of some.`,
	heb_1_14_obj: { book: "hebrews", chapter: 1, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_1_14_str: `Heb 1:14. Aren’t they all serving spirits, sent out to do service for the sake of those who will inherit salvation?`,
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
	heb_12_23_obj: { book: "hebrews", chapter: 12, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_12_23_str: `Heb 12:23. to the festal gathering and assembly of the firstborn who are enrolled in heaven, to God the Judge of all, to the spirits of just men made perfect,`,
	heb_13_8_obj: { book: "hebrews", chapter: 13, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	heb_13_8_str: `Heb 13:8. Jesus Christ is the same yesterday, today, and forever.`,
	_1pe_3_19_obj: { book: "1_peter", chapter: 3, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1pe_3_19_str: `1Pe 3:19. in whom he also went and preached to the spirits in prison, `,
	_2pe_3_13_obj: { book: "2_peter", chapter: 3, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_2pe_3_13_str: `2Pe 3:13. But, according to his promise, we look for new heavens and a new earth, in which righteousness dwells.`,
	_1jo_3_2_obj: { book: "1_john", chapter: 3, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	_1jo_3_2_str: `1Jo 3:2. Beloved, now we are children of God. It is not yet revealed what we will be; but we know that when he is revealed, we will be like him; for we will see him just as he is.`,
	rev_6_10_obj: { book: "revelation", chapter: 6, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_6_10_str: `Rev 6:10. They cried with a loud voice, saying, "How long, Master, the holy and true, until you judge and avenge our blood on those who dwell on the earth?"`,
	rev_14_13_obj: { book: "revelation", chapter: 14, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_14_13_str: `Rev 14:13. I heard a voice from heaven saying, "Write, ‘Blessed are the dead who die in the Lord from now on.’" "Yes," says the Spirit, "that they may rest from their labors; for their works follow with them."`,
	rev_1_18_obj: { book: "revelation", chapter: 1, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_1_18_str: `Rev 1:18. and the Living one. I was dead, and behold, I am alive forever and ever. Amen. I have the keys of Death and of Hades`,
	rev_20_13_obj: { book: "revelation", chapter: 20, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_20_13_str: `Rev 20:13. The sea gave up the dead who were in it. Death and Hades gave up the dead who were in them. They were judged, each one according to his works.`,
	rev_21_1_obj: { book: "revelation", chapter: 21, verse: 1, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", },
	rev_21_1_str: `Rev 21:1. I saw a new heaven and a new earth: for the first heaven and the first earth have passed away, and the sea is no more.`,
};

function init_en_exam_msg(){
	let bibref = {};
	let rnam = null;
	
	const href_home = "../en/index.html";
	const href_creator_tit = "../en/book.html#creator_DOT_";
	const href_tch_crea = "../en/book.html#technical-creativity_DOT_";
	const href_tch_cplx = "../en/book.html#technical-complexity_DOT_";
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
	const href_asleep = "../en/book.html#asleep_DOT_";
	const href_the_cloth = "../en/book.html#the-cloth_DOT_";
	const href_angels = "../en/book.html#angels_DOT_";
	const href_wings = "../en/book.html#wings_DOT_";
	const href_life = "../en/book.html#life_DOT_";
	const href_death = "../en/book.html#death_DOT_";
	const href_liberator = "../en/book.html#liberator_DOT_";
	const href_sleeping = "../en/book.html#sleeping_DOT_";
	const href_rich_and_laza = "../en/book.html#the-rich-and-the-poor-lazarus_DOT_";
	const href_144000 = "../en/book.html#section";
	const href_eternal_abhorrence = "../en/book.html#eternal-abhorrence_DOT_";
	const href_factories = "../en/book.html#factories_DOT_";
	
	const lg = all_en_msg;
	const rf = all_bibrefs;
	
	lg.q0_1__end_of_test = "These questions are not for you. This is the end of the questions for you, unless you did not really mean it and change your answer. Click on your answer to change it.";
	lg.q0_2__contradiction = "You have a contradiction in your answers. Please change one of your answers to the questions shown in red. The contradiction is in one of them. Otherwise you cannot continue with these questions. Click on your answer to change it.";
	lg.q0_3__end_so_far = "These questions are in construction. This is the end of the questions for you so far...";
	lg.q0_4__about_beliefs = "<b>All these questions are about what you believe, NOT about what you think you have certainty. Some of them might be check questions to avoid silly behaviour. Answer them all properly. You can change any answer at any time by clicking on it.</b>";
	
	lg.q1_1__are_you_reasonable = "This questions are for rational and reasonable people.";
	lg.q1_1__yes = "I am a rational and reasonable person.";
	lg.q1_1__should_yes = "All people answering these questions are required to be RATIONAL and REASONABLE.";
	lg.q1_1__pru_pos_txt = `<span class="is_big">+</span>`;
	lg.q1_1__pru_href = rf.luk_24_39_href;
	lg.q1_1__pru_should_href = rf.mat_26_64_href;
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
	lg.q3_1__jesus_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${href_resurrection}'>RESURRECTED</a> Jesus Christ: `;
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
	lg.q4_1__physical = `Select all verses that support a physical <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of Jesus Christ`;
	lg.q4_1__verse1_str = uppercase_words_in_string(rf.luk_24_39_str, ["Touch", "flesh", "bones,"]);
	lg.q4_1__verse1_href = rf.luk_24_39_href;
	lg.q4_1__verse1_should = "FLESH and BONES are PHYSICAL.";
	lg.q4_1__verse2_str = uppercase_words_in_string(rf.jhn_20_27_str, ["hand,", "put", "side."]);
	lg.q4_1__verse2_href = rf.jhn_20_27_href;
	lg.q4_1__verse2_should = "Putting a hand into FLESH is something PHYSICAL.";
	lg.q4_1__verse3_str = uppercase_words_in_string(rf.act_10_41_str, ["ate", "drank"]);
	lg.q4_1__verse3_href = rf.act_10_41_href;
	lg.q4_1__verse3_should = "EATING and DRINKING is something PHYSICAL.";
	lg.q4_1__verse4_str = uppercase_words_in_string(rf.mat_28_9_str, ["took", "hold", "feet,"]);
	lg.q4_1__verse4_href = rf.mat_28_9_href;
	lg.q4_1__verse4_should = "TAKING hold of somebody's feet is something PHYSICAL.";
	lg.q4_1__verse5_str = uppercase_words_in_string(rf.luk_24_30_str, ["took", "bread"]);
	lg.q4_1__verse5_href = rf.luk_24_30_href;
	lg.q4_1__verse5_should = "BREAKING bread is something PHYSICAL.";
	lg.q4_1__verse6_str = uppercase_words_in_string(rf.jhn_2_19_str, ["temple,", "raise"]);
	lg.q4_1__verse6_href = rf.jhn_2_19_href;
	lg.q4_1__verse6_should = "REBUILDING a body is something PHYSICAL.";
	lg.q4_1__verse7_str = uppercase_words_in_string(rf.luk_24_43_str, ["took", "ate"]);
	lg.q4_1__verse7_href = rf.luk_24_43_href;
	lg.q4_1__verse7_should = "EATING is something PHYSICAL.";
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${href_not_die_resu}'>To NOT die again</a>`;
	lg.q5_1__not_die = `Select all verses that support a <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of Jesus Christ to NOT die again`;
	lg.q5_1__verse1_str = uppercase_words_in_string(rf.rom_6_9_str, ["dies", "no", "more."]);
	lg.q5_1__verse1_href = rf.rom_6_9_href;
	lg.q5_1__verse1_should = "DIES NO MORE.";
	lg.q5_1__verse2_str = uppercase_words_in_string(rf.heb_7_16_str, ["endless", "life;"]);
	lg.q5_1__verse2_href = rf.heb_7_16_href;
	lg.q5_1__verse2_should = "ENDLESS LIFE.";
	lg.q5_1__verse3_str = uppercase_words_in_string(rf.rev_1_18_str, ["alive", "forever", "ever."]);
	lg.q5_1__verse3_href = rf.rev_1_18_href;
	lg.q5_1__verse3_should = "ALIVE FOREVER and EVER.";
	lg.q5_1__verse4_str = uppercase_words_in_string(rf.heb_7_25_str, ["lives", "forever", ]);
	lg.q5_1__verse4_href = rf.heb_7_25_href;
	lg.q5_1__verse4_should = "LIVES FOREVER.";
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${href_in_heaven_resu}'>In Heaven</a>`;
	lg.q6_1__in_heaven = `Select all verses that support a <a class='exam_ref' href='${href_resurrection}'>RESURRECTED</a> Jesus Christ that is in heaven in BODY and spirit.`;
	lg.q6_1__verse1_str = uppercase_words_in_string(rf.act_1_11_str, ["going", "into", "sky."]);
	lg.q6_1__verse1_href = rf.act_1_11_href;
	lg.q6_1__verse1_should = "GOING INTO the SKY. He went physically into the heavens";
	lg.q6_1__verse2_str = uppercase_words_in_string(rf.mat_26_64_str, ["sitting", "clouds", "sky"]);
	lg.q6_1__verse2_href = rf.mat_26_64_href;
	lg.q6_1__verse2_should = "He is SITTING and coming on the CLOUDS";
	lg.q6_1__verse3_str = uppercase_words_in_string(rf.jhn_14_2_str, ["house", "mansions;", "place"]);
	lg.q6_1__verse3_href = rf.jhn_14_2_href;
	lg.q6_1__verse3_should = "He makes in a PLACE for his disciples";
	lg.q6_1__verse4_str = uppercase_words_in_string(rf.heb_9_12_str, ["entered", "Place,", "heaven"]);
	lg.q6_1__verse4_href = rf.heb_9_12_href;
	lg.q6_1__verse4_should = "He ENTERED the Holy PLACE in the heavens";
	lg.q6_1__verse5_str = uppercase_words_in_string(rf.heb_10_12_str, ["sat", "down"]);
	lg.q6_1__verse5_href = rf.heb_10_12_href;
	lg.q6_1__verse5_should = "He SAT DOWN in the heavens";
	lg.q6_1__verse6_str = uppercase_words_in_string(rf.heb_13_8_str, ["is", "same", "forever."]);
	lg.q6_1__verse6_href = rf.heb_13_8_href;
	lg.q6_1__verse6_should = "He is ALWAYS the same. So if He resurrected in BODY and spirit, He MUST be in BODY and spirit in the heavens.";
	lg.q6_1__verse7_str = uppercase_words_in_string(rf.col_1_15_str, ["image", "invisible"]);
	lg.q6_1__verse7_href = rf.col_1_15_href;
	lg.q6_1__verse7_should = "He is the IMAGE of the INVISIBLE God. So if He was visible when He resurrected, He must STILL be visible in the heavens.";
	

	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${href_like_jesus_resu}'>Like Jesus</a>`;
	lg.q7_1__like_jesus = `Select all verses that support a <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of the dead that is like Jesus <a class='exam_ref' href='${href_resurrection}'>resurrection</a>`;
	lg.q7_1__verse1_str = uppercase_words_in_string(rf.phl_3_21_str, ["conformed", "body", ]);
	lg.q7_1__verse1_href = rf.phl_3_21_href;
	lg.q7_1__verse1_should = "Just LIKE the BODY of Jesus";
	lg.q7_1__verse2_str = uppercase_words_in_string(rf._1jo_3_2_str, ["like", "him;", ]);
	lg.q7_1__verse2_href = rf._1jo_3_2_href;
	lg.q7_1__verse2_should = "We will be LIKE HIM";
	lg.q7_1__verse3_str = uppercase_words_in_string(rf.luk_20_36_str, ["can’t", "die", ]);
	lg.q7_1__verse3_href = rf.luk_20_36_href;
	lg.q7_1__verse3_should = "Those bodies CAN'T DIE";
	lg.q7_1__verse4_str = uppercase_words_in_string(rf.heb_9_27_str, ["die", "once,", ]);
	lg.q7_1__verse4_href = rf.heb_9_27_href;
	lg.q7_1__verse4_should = "We are destined to DIE ONCE. No more.";
	lg.q7_1__verse5_str = uppercase_words_in_string(rf._1co_15_49_str, ["bear", "image", "heavenly.", ]);
	lg.q7_1__verse5_href = rf._1co_15_49_href;
	lg.q7_1__verse5_should = "We BARE the image of the HEAVENLY";
	lg.q7_1__verse6_str = uppercase_words_in_string(rf._1co_15_42_str, ["body", "raised", "imperishable."]);
	lg.q7_1__verse6_href = rf._1co_15_42_href;
	lg.q7_1__verse6_should = "The raised body is IMPERISHABLE";
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${href_for_all_resu}'>For All</a>`;
	lg.q8_1__for_all = `Select all verses that support a <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of the dead that is for ALL people`;
	lg.q8_1__verse1_str = uppercase_words_in_string(rf.jhn_5_28_str, ["all", "tombs", ]);
	lg.q8_1__verse1_href = rf.jhn_5_28_href;
	lg.q8_1__verse1_should = "ALL is ALL";
	lg.q8_1__verse2_str = uppercase_words_in_string(rf.jhn_5_29_str, ["good,", "evil,", ]);
	lg.q8_1__verse2_href = rf.jhn_5_29_href;
	lg.q8_1__verse2_should = "GOOD and EVIL";
	lg.q8_1__verse3_str = uppercase_words_in_string(rf.act_24_15_str, ["both", "just", "unjust.", ]);
	lg.q8_1__verse3_href = rf.act_24_15_href;
	lg.q8_1__verse3_should = "BOTH JUST and UNJUST";
	lg.q8_1__verse4_str = uppercase_words_in_string(rf.jhn_6_39_str, ["all", "lose", "nothing,", ]);
	lg.q8_1__verse4_href = rf.jhn_6_39_href;
	lg.q8_1__verse4_should = "ALL and LOSE NOTHING";
	lg.q8_1__verse5_str = uppercase_words_in_string(rf.jhn_17_2_str, ["all", "flesh", "eternal", "life", ]);
	lg.q8_1__verse5_href = rf.jhn_17_2_href;
	lg.q8_1__verse5_should = "ALL FLESH ETERNAL LIFE";
	lg.q8_1__verse6_str = uppercase_words_in_string(rf._1co_15_22_str, ["all", "alive.", ]);
	lg.q8_1__verse6_href = rf._1co_15_22_href;
	lg.q8_1__verse6_should = "ALL is ALL";
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${href_not_yet_resu}'>Has NOT happend</a>`;
	lg.q9_1__not_yet = `Select all verses that support a <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of the dead that has NOT happend for almost ANYBODY`;
	lg.q9_1__verse1_str = uppercase_words_in_string(rf.jhn_6_39_str, ["last", "day.", ]);
	lg.q9_1__verse1_href = rf.jhn_6_39_href;
	lg.q9_1__verse1_should = "It is on the LAST DAY";
	lg.q9_1__verse2_str = uppercase_words_in_string(rf._2ti_2_18_str, ["erred", "already", "past,"]);
	lg.q9_1__verse2_href = rf._2ti_2_18_href;
	lg.q9_1__verse2_should = "It is NOT already past";
	lg.q9_1__verse3_str = uppercase_words_in_string(rf.jhn_6_40_str, ["last", "day.", ]);
	lg.q9_1__verse3_href = rf.jhn_6_40_href;
	lg.q9_1__verse3_should = "It is on the LAST DAY";
	lg.q9_1__verse4_str = uppercase_words_in_string(rf.jhn_6_44_str, ["last", "day.", ]);
	lg.q9_1__verse4_href = rf.jhn_6_44_href;
	lg.q9_1__verse4_should = "It is on the LAST DAY";
	lg.q9_1__verse5_str = uppercase_words_in_string(rf.jhn_6_54_str, ["last", "day.", ]);
	lg.q9_1__verse5_href = rf.jhn_6_54_href;
	lg.q9_1__verse5_should = "It is on the LAST DAY";
	lg.q9_1__verse6_str = uppercase_words_in_string(rf.jhn_11_24_str, ["last", 'day."', ]);
	lg.q9_1__verse6_href = rf.jhn_11_24_href;
	lg.q9_1__verse6_should = "It is on the LAST DAY";
	lg.q9_1__verse7_str = uppercase_words_in_string(rf.rev_20_13_str, ["gave", "dead"]);
	lg.q9_1__verse7_href = rf.rev_20_13_href;
	lg.q9_1__verse7_should = "It is AFTER this earth and these heavens get destroyed";
	
	/*
	lg.q10_1__has_for_few_sec = `<a class='exam_ref exam_title' href='${href_only_few_resu}'>Only for few</a>`;
	lg.q10_1__has_for_few = `1st quest ONLY FOR FEW`;
	lg.q10_1__go = "Go";
	lg.q10_1__stay = "Stay";
	*/
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${href_new_earth_resu}'>New Earth</a>`;
	lg.q11_1__new_earth = `Select all verses that support a <a class='exam_ref' href='${href_resurrection}'>resurrection</a> of the dead to live in a NEW EARTH with a new heavens`;
	lg.q11_1__verse1_str = uppercase_words_in_string(rf.rev_21_1_str, ["new", "earth:", ]);
	lg.q11_1__verse1_href = rf.rev_21_1_href;
	lg.q11_1__verse1_should = "It is on a NEW EARTH with a new heavens";
	lg.q11_1__verse2_str = uppercase_words_in_string(rf._2pe_3_13_str, ["new", "earth,", ]);
	lg.q11_1__verse2_href = rf._2pe_3_13_href;
	lg.q11_1__verse2_should = "It is on a NEW EARTH with a new heavens";
	lg.q11_1__verse3_str = uppercase_words_in_string(rf.isa_65_17_str, ["new", "earth;", ]);
	lg.q11_1__verse3_href = rf.isa_65_17_href;
	lg.q11_1__verse3_should = "It is on a NEW EARTH with a new heavens";
	lg.q11_1__verse4_str = uppercase_words_in_string(rf.isa_66_22_str, ["new", "earth,", ]);
	lg.q11_1__verse4_href = rf.isa_66_22_href;
	lg.q11_1__verse4_should = "It is on a NEW EARTH with a new heavens";
	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${href_sleeping}'>Sleep</a>`;
	lg.q12_1__sleep = `Select a GOOD verse that supports that physically dead people DO HAVE CONSCIOUSNESS before <a class='exam_ref' href='${href_resurrection}'>resurrection</a>.`;
	lg.q12_1__no_consciousness = "There is no good verse";
	lg.q12_1__verse1_str = uppercase_words_in_string(rf.isa_14_10_str, ["answer", "ask", "you,", ]);
	lg.q12_1__verse1_href = rf.isa_14_10_href;
	lg.q12_1__verse2_str = uppercase_words_in_string(rf.mat_17_3_str, ["talking", "him.", ]);;
	lg.q12_1__verse2_href = rf.mat_17_3_href;
	lg.q12_1__verse3_str = uppercase_words_in_string(rf.rev_6_10_str, ["cried", "loud", "voice,", "saying,", ]);
	lg.q12_1__verse3_href = rf.rev_6_10_href;
	lg.q12_1__verse4_str = uppercase_words_in_string(rf.heb_12_23_str, ["festal", "gathering", "assembly", ]);
	lg.q12_1__verse4_href = rf.heb_12_23_href;
	lg.q12_1__verse5_str = uppercase_words_in_string(rf.luk_16_24_str, ["cried", "said,", ]);
	lg.q12_1__verse5_href = rf.luk_16_24_href;

	const q12_1__response_INTRO = `<p> This is a commonly cited verse as objection to SPIRIT <a class='exam_ref' href='${href_sleeping}'>sleep</a>.</p>
	<p> When arguing against SPIRIT (NOT soul) <a class='exam_ref' href='${href_sleeping}'>sleep</a> always remember that the whole bible refers to the dead as <a class='exam_ref' href='${href_sleeping}'>SLEEP</a>, specially our Lord Jesus Christ. The reason is obvious: NO <a class='exam_ref' href='${href_sleeping}'>sleeping</a> person has CONSCIOUSNESS. That is the most prominent characteristic of a <a class='exam_ref' href='${href_sleeping}'>sleeping</a> person. Please read the section introducing the biblical concept of SPIRIT <a class='exam_ref' href='${href_sleeping}'>sleep</a> of the completely FREE book <a class='exam_ref' href='${href_home}'>TodaCarne.com</a>. </p>`;
	
	const q12_1__response_END = `<p> So this verse <b>DOES NOT REFER</b> to the physically dead having CONSCIOUSNESS.</p>`;

	
	lg.q12_1__response_to_verse1 = `<a class='exam_ref' target='_blank' href=${rf.isa_14_10_href}>Isa 14:10</a> ${q12_1__response_INTRO}
	<p> This verse refers to a literal future time or an spiritual one that happend as reafirmation of the literal case. The king of Babilon represents The Satan, that is why <a class='exam_ref' href=${rf.isa_14_12_href}>verse 12</a> is commonly cited to refer to The Satan. </p>
	<p>Note that:</p> 
	<li> <a class='exam_ref' href=${rf.isa_14_8_href}>Verse 8</a> says: Yes, the cypress trees rejoice with you, with the cedars of Lebanon, saying, "Since you are humbled, no lumberjack has come up against us". So for the spiritual case it is a metaphor and the literal case has not nappened yet because <a class='exam_ref' href=${rf.isa_14_7_href}>verse 7</a> has NOT happened literally: "The whole earth is at rest, and is quiet". 
	<li> <a class='exam_ref' href=${rf.isa_14_9_txt_href}>Verse 9</a> shows that the literal case implies that the dead have AWAKEN (word <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>) which has NOT happend either because the resurrection of the dead has not happend. 
	<li> <a class='exam_ref' href=${rf.isa_14_18_txt_href}>Verse 18</a> tell us that each king is in his own HOUSE (word <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). For the literal case they have been resurrected. 
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse2 = `<a class='exam_ref' href=${rf.mat_17_3_href}>Mat 17:3</a> ${q12_1__response_INTRO}
	<p>It is also recommended that you have at least read the section introducing the biblical concept of <a class='exam_ref' href='${href_resurrection}'>Resurrection</a> and in particular the fact that <a class='exam_ref' href='${href_not_yet_resu}'>It has not happend</a>.</p>
	<p> The most important thing to note about this verse is that they were physically present, they all have BODIES, and that is why Peter, in <a class='exam_ref' href=${rf.mat_17_4_href}>verse 4</a>, offers to build three tents. Two tents for Moses and Elijah and one for Our Lord. They are physically ALIVE. They where in the Jewish festival of Sukkot. The feast of Tabernacles. Very appropiate signal to show that these "tabernacles" are going to be replaced by permanent "houses". </p>
	${q12_1__response_END}
	`;
	
	const q12_1__response_144000 = `<p>This verse refers to the 144.000. Please read the section <a class='exam_ref' href='${href_144000}'>144.000</a>.	Another section that could help is the one called <a class='exam_ref' href='${href_eternal_abhorrence}'>Eternal Abhorrence</a>.</p>
	<p> The most important thing to note about this verse is that it refers to people that have been resurrected. The Saints. The Great ones. The first fruits. The firstborn. The ones God brings with Jesus Christ. They are a FEW: 144.000 male genetic descendants of Israel when completed. They all have BODIES, and that is why they can actually CRY, SPEAK, GATHER and ASSEMBLY.</p>`;
	
	
	lg.q12_1__response_to_verse3 = `<a class='exam_ref' href=${rf.rev_6_10_href}>Rev 6:10</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse4 = `<a class='exam_ref' href=${rf.heb_12_23_href}>Heb 12:23</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse5 = `<a class='exam_ref' href=${rf.luk_16_24_href}>Luk 16:24</a> ${q12_1__response_INTRO}
	<p>This verse is part of the famous PARABLE in Luke. Please read the section called <a class='exam_ref' href='${href_rich_and_laza}'>The rich and the poor Lazarus.</a>.</p>
	<p> The most important thing to note about this verse is that it part of a PARABLE. So please read the correct <a class='exam_ref' href='${href_rich_and_laza}'>INTERPRETATION</a>.</p>
	${q12_1__response_END}
	`;
		
	const q12_1__nowhere_consciousness = `<p> NOWHERE in this verse and its context is there any thing that remotely refers to CONSCIOUSNESS of physically dead people. It is really remarkable how the greek culture has affected the hebrew teachings of the hebrew scriptures.</p>`;
	
	const q12_1__response_sheol = `<p> This verse refers to the fact that ALL dead people go to the Sheol, to the tomb, to the Sepulcre, to the pit. </p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.gen_15_15_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_15_15_href}>Gen 15:15</a> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.gen_25_8_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_25_8_href}>Gen 25:8</a> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.gen_35_29_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_35_29_href}>Gen 35:29</a> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	const q12_1__response_spiritually_dead = `<p> This verse refers to spiritually dead people. Please read the sections called <a class='exam_ref' href='${href_life}'>Life</a>, <a class='exam_ref' href='${href_death}'>Death</a>, and <a class='exam_ref' href='${href_liberator}'>Liberator</a>.</p>`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._1pe_3_19_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._1pe_3_19_href}>1Pe 3:19</a> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	<p> The most important thing to note in this verse and its context is that ALL people are DEAD without Jesus Christ who is LIFE itself. So the verse refers to people PHYSICALLY alive but spiritually dead. Any person that does not believe in Jesus Christ is a slave, a PRISONER of the Spirit that rules this world, that person is a "spirit in prison". Jesus's RESURRECTION good news set that person free. It is a new begining. And the times of Noah, which were a new begining, were a SIGN of the new begining in the times of Christ. That is what the passage is about. Maybe NOT in a bad translation but certanly in the ancient koine greek.</p>
	<p> The second thing to note is that NOWHERE, in the verse or its context, appears the greek word Hades, the greek word used in ancient greek manuscripts for the hebrew Sheol, the place where dead people go: the tomb, the Sepulcre, the pit. This passage is NOT talking about PHYSICALLY dead people. It is about spiritually dead people and they were ALL spiritually dead when Jesus died and resurrected. </p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._2co_5_8_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_5_8_href}>2Co 5:8</a> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers to be absent of this body that dies AND, when RESURRECTED in a new body that cannot die, be present with the Lord. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be PRESENT with Him is to be ALSO RESURRECTED.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.act_7_59_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.act_7_59_href}>Act 7:59</a> ${q12_1__response_INTRO}
	<p> This verse refers to the fact that when people die, as <a class='exam_ref' href=${rf.ecc_12_7_href}>Ecc 12:7</a> tells us, the spirit RETURNS to Elohim who gave it, so everything goes back as it was BEFORE the person was physically born. </p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.luk_20_38_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_20_38_href}>Luk 20:38</a> ${q12_1__response_INTRO}
	<p> This verse refers to the fact that dead people CAN be AWAKEN from their <a class='exam_ref' href='${href_sleeping}'>SLEEP</a>, and that is why to the one who can WAKE them up they are still ALIVE.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	const q12_1__response_paradise = `<p> This verse refers to the PARADISE, a physical PLACE where RESURRECTED people will live eternally with Jesus Christ, NOT to the Sheol, to the tomb, to the Sepulcre, to the pit.</p>
	${q12_1__nowhere_consciousness}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._2co_12_4_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_12_4_href}>2Co 12:4</a> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.luk_23_43_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_23_43_href}>Luk 23:43</a> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._1ti_5_6_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._1ti_5_6_href}>1Ti 5:6</a> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.luk_15_24_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_15_24_href}>Luk 15:24</a> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.jhn_4_24_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.jhn_4_24_href}>Jhn 4:24</a> ${q12_1__response_INTRO}
	<p> This verse refers to PHYSICALLY alive people to worship in spirit and in truth.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.heb_1_14_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>Heb 1:14</a> ${q12_1__response_INTRO}
	<p>This verse refers to angels as spirits. The bible refers to any physically living person as a spirit. Please read the sections <a class='exam_ref' href='${href_angels}'>Angels</a> and <a class='exam_ref' href='${href_wings}'>Wings</a>.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.phl_1_23_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.phl_1_23_href}>Phl 1:23</a> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers depart and be with Christ when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be with Him is to be ALSO RESURRECTED.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.psa_16_11_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.psa_16_11_href}>Psa 16:11</a> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ knows that he is The Way and The Life and that he will get to be in His presence when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be in His presence is to be ALSO RESURRECTED.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.isa_8_19_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.isa_8_19_href}>Isa 8:19</a> ${q12_1__response_INTRO}
	<p> The prohibition in the Old Testament for people to speak to the dead is to prevent them from speaking to Celestial Powers, commonly known in the New Testament as DEMONS, that will pretend to be the dead person to decieve the one trying to communicate with the dead.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._1th_4_14_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>1Th 4:14</a> ${q12_1__response_INTRO}
	${q12_1__response_144000}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;	
	
	lg.q13_1__sleep = `Select all verses that support that dead people do NOT have CONSCIOUSNESS until <a class='exam_ref' href='${href_resurrection}'>resurrection</a>.`;
	lg.q13_1__verse1_str = uppercase_words_in_string(rf.jhn_11_11_str, ["asleep,", "awake", ]);
	lg.q13_1__verse1_href = rf.jhn_11_11_href;
	lg.q13_1__verse1_should = "Lazarous is ASLEEP until he is AWAKEN";
	lg.q13_1__verse2_str = `In 1 Corinthians 11:30 PEOPLE (not bodies) are sleeping (STILL going on) according to the greek conjugation: κοιμῶνται`;
	const obj_1co_11_30 = { book: "1_corinthians", chapter: 11, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", };
	lg.q13_1__verse2_href = make_bible_ref(obj_1co_11_30);
	lg.q13_1__verse2_should = "They SLEEPING acording to the conjugation of the greek verb";
	lg.q13_1__verse3_str = uppercase_words_in_string(rf.ecc_9_10_str, ["no", "work,", "nor", "plan,", "knowledge,", "wisdom,", "Sheol,", ]);
	lg.q13_1__verse3_href = rf.ecc_9_10_href;
	lg.q13_1__verse3_should = "WORK, PLAN, KNOWLEDGE, WISDOM. These words specifically refer to actions of CONSCIOUSNESS. A property of living PEOPLE not just bodies made dust.";
	lg.q13_1__verse4_str = uppercase_words_in_string(rf.ecc_12_7_str, ["dust", "returns", "spirit", ]);
	lg.q13_1__verse4_href = rf.ecc_12_7_href;
	lg.q13_1__verse4_should = "After dead things RETURN as they were. You did NOT have CONSCIOUSNESS before being born.";
	lg.q13_1__verse5_str = uppercase_words_in_string(rf.job_7_21_str, ["not", 'be.', ]);
	lg.q13_1__verse5_href = rf.job_7_21_href;
	lg.q13_1__verse5_should = "When a person dies it will NOT BE anymore.";
	lg.q13_1__verse6_str = uppercase_words_in_string(rf.job_14_12_str, ["Until", "nor", "roused", "out", "sleep.", ]);
	lg.q13_1__verse6_href = rf.job_14_12_href;
	lg.q13_1__verse6_should = "People will NOT be ROUSED OUT of their SLEEP UNTIL these heavens are no more";
	lg.q13_1__verse7_str = uppercase_words_in_string(rf.psa_115_17_str, ["dead", "don’t", "praise", ]);
	lg.q13_1__verse7_href = rf.psa_115_17_href;
	lg.q13_1__verse7_should = "DEAD people (NOT just bodies) do NOT PRAISE";	
	lg.q13_1__verse8_str = uppercase_words_in_string(rf.jhn_5_28_str, ["are", "in", "tombs"]);
	lg.q13_1__verse8_href = rf.jhn_5_28_href;
	lg.q13_1__verse8_should = "People who get resurrection ARE IN the TOMBS, the sepulcre, the hebrew Sheol, the poorly translated greek Hades, NOT in heaven or hell.";
	

	lg.q14_1__the_cloth_sec = `<a class='exam_ref exam_title' href='${href_the_cloth}'>The Cloth</a>`;
	lg.q14_1__the_cloth = `1st quest THE CLOTH`;
	lg.q14_1__go = "Go";
	lg.q14_1__stay = "Stay";
	
}

