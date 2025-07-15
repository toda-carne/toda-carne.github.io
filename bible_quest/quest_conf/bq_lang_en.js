
import { init_get_msg, fill_reversed_object, bib_defaults, fill_bibrefs_href, 
	fill_all_strongrefs_href, get_verse_cit_key, 
} from '../code/bq_tools.js';

"use strict";

// ENGLISH IS THE DEFAULT LANGUAGE.
// SO THIS FILE WORKS TOGETHER WITH '../code/bq_tools.js';


const all_en_msg = {};
const book_en_hrefs = {};
const all_en_bibrefs = {};

export const book2num_en = {};
export const all_en_poll_txt = {};

const bibles_en = {
	biblegateway: [ "KJV", "WEB", "YLT", "NASB", "WLC", "HHH", "WHNU", "TR1550", ],
	biblehub: [ "text", "kjv", "web", "ylt", "nasb77", "bsb", "sepd", "wlco", ],
	blueletterbible: [ "KJV", "WEB", "YLT", "VUL", "NASB95", "VUL", "WLC", "LXX", "MGNT", "TR", ],
};

export const DEFAULT_BOOK_NAME = "BOOK";

export const num2book_en = {
	"-1":DEFAULT_BOOK_NAME,
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

const countries_en = {
	"1":"Afghanistan",
	"2":"Albania",
	"3":"Algeria",
	"4":"Andorra",
	"5":"Angola",
	"6":"Antigua and Barbuda",
	"7":"Argentina",
	"8":"Armenia",
	"9":"Australia",
	"10":"Austria",
	"11":"Azerbaijan",
	"12":"Bahrain",
	"13":"Bangladesh",
	"14":"Barbados",
	"15":"Belarus",
	"16":"Belgium",
	"17":"Belize",
	"18":"Benin",
	"19":"Bhutan",
	"20":"Bolivia",
	"21":"Bosnia and Herzegovina",
	"22":"Botswana",
	"23":"Brazil",
	"24":"Brunei",
	"25":"Bulgaria",
	"26":"Burkina Faso",
	"27":"Burundi",
	"28":"Cabo Verde",
	"29":"Cambodia",
	"30":"Cameroon",
	"31":"Canada",
	"32":"Central African Republic",
	"33":"Chad",
	"34":"Chile",
	"35":"China",
	"36":"Colombia",
	"37":"Comoros",
	"38":"Congo, Democratic Republic of the",
	"39":"Congo, Republic of the",
	"40":"Costa Rica",
	"41":"Côte d’Ivoire",
	"42":"Croatia",
	"43":"Cuba",
	"44":"Cyprus",
	"45":"Czech Republic",
	"46":"Denmark",
	"47":"Djibouti",
	"48":"Dominica",
	"49":"Dominican Republic",
	"50":"East Timor (Timor-Leste)",
	"51":"Ecuador",
	"52":"Egypt",
	"53":"El Salvador",
	"54":"Equatorial Guinea",
	"55":"Eritrea",
	"56":"Estonia",
	"57":"Eswatini",
	"58":"Ethiopia",
	"59":"Fiji",
	"60":"Finland",
	"61":"France",
	"62":"Gabon",
	"63":"Georgia",
	"64":"Germany",
	"65":"Ghana",
	"66":"Greece",
	"67":"Grenada",
	"68":"Guatemala",
	"69":"Guinea",
	"70":"Guinea-Bissau",
	"71":"Guyana",
	"72":"Haiti",
	"73":"Honduras",
	"74":"Hungary",
	"75":"Iceland",
	"76":"India",
	"77":"Indonesia",
	"78":"Iran",
	"79":"Iraq",
	"80":"Ireland",
	"81":"Israel",
	"82":"Italy",
	"83":"Jamaica",
	"84":"Japan",
	"85":"Jordan",
	"86":"Kazakhstan",
	"87":"Kenya",
	"88":"Kiribati",
	"89":"Korea, North",
	"90":"Korea, South",
	"91":"Kosovo",
	"92":"Kuwait",
	"93":"Kyrgyzstan",
	"94":"Laos",
	"95":"Latvia",
	"96":"Lebanon",
	"97":"Lesotho",
	"98":"Liberia",
	"99":"Libya",
	"100":"Liechtenstein",
	"101":"Lithuania",
	"102":"Luxembourg",
	"103":"Madagascar",
	"104":"Malawi",
	"105":"Malaysia",
	"106":"Maldives",
	"107":"Mali",
	"108":"Malta",
	"109":"Marshall Islands",
	"110":"Mauritania",
	"111":"Mauritius",
	"112":"Mexico",
	"113":"Micronesia, Federated States of",
	"114":"Moldova",
	"115":"Monaco",
	"116":"Mongolia",
	"117":"Montenegro",
	"118":"Morocco",
	"119":"Mozambique",
	"120":"Myanmar (Burma)",
	"121":"Namibia",
	"122":"Nauru",
	"123":"Nepal",
	"124":"Netherlands",
	"125":"New Zealand",
	"126":"Nicaragua",
	"127":"Niger",
	"128":"Nigeria",
	"129":"North Macedonia",
	"130":"Norway",
	"131":"Oman",
	"132":"Pakistan",
	"133":"Palau",
	"134":"Panama",
	"135":"Papua New Guinea",
	"136":"Paraguay",
	"137":"Peru",
	"138":"Philippines",
	"139":"Poland",
	"140":"Portugal",
	"141":"Qatar",
	"142":"Romania",
	"143":"Russia",
	"144":"Rwanda",
	"145":"Saint Kitts and Nevis",
	"146":"Saint Lucia",
	"147":"Saint Vincent and the Grenadines",
	"148":"Samoa",
	"149":"San Marino",
	"150":"Sao Tome and Principe",
	"151":"Saudi Arabia",
	"152":"Senegal",
	"153":"Serbia",
	"154":"Seychelles",
	"155":"Sierra Leone",
	"156":"Singapore",
	"157":"Slovakia",
	"158":"Slovenia",
	"159":"Solomon Islands",
	"160":"Somalia",
	"161":"South Africa",
	"162":"Spain",
	"163":"Sri Lanka",
	"164":"Sudan",
	"165":"Sudan, South",
	"166":"Suriname",
	"167":"Sweden",
	"168":"Switzerland",
	"169":"Syria",
	"170":"Taiwan",
	"171":"Tajikistan",
	"172":"Tanzania",
	"173":"Thailand",
	"174":"The Bahamas",
	"175":"The Gambia",
	"176":"Togo",
	"177":"Tonga",
	"178":"Trinidad and Tobago",
	"179":"Tunisia",
	"180":"Turkey",
	"181":"Turkmenistan",
	"182":"Tuvalu",
	"183":"Uganda",
	"184":"Ukraine",
	"185":"United Arab Emirates",
	"186":"United Kingdom",
	"187":"United States",
	"188":"Uruguay",
	"189":"Uzbekistan",
	"190":"Vanuatu",
	"191":"Vatican City",
	"192":"Venezuela",
	"193":"Vietnam",
	"194":"Yemen",
	"195":"Zambia",
	"196":"Zimbabwe",
};

const country_id_names_en = {
	"36":"Cedula", // Colombia
	"187":"Id", // United States
};

const marital_en = {
	"1":"Never married",
	"2":"Single",
	"3":"Married",
	"4":"Divorced",
	"5":"Separated",
	"6":"Widowed",
};

const sex_en = {
	"1":"Man",
	"2":"Woman",
};

function init_en_basic_msg(){
	const obj = all_en_msg;
	
	obj.msg_qmodu_loading = "loading";
	obj.msg_qmodu_all_finished = "All modules finished";
	obj.msg_qmodu_improve_one = "Choose a module to improve";
	
	obj.msg_guest = "Guest";
	
	obj.msg_ok = "OK";
	obj.msg_del = "DEL";
	obj.msg_range = "RANGE";
	obj.msg_any = "ANY";
	obj.msg_invert_ans = "INVERT ANSWER";
	obj.msg_end_ans = "END ANSWER";
	obj.msg_edit_ans = "CHANGE ANSWER";
	obj.msg_understood = "OK";
	obj.msg_yes = "YES";
	obj.msg_no = "NO";
	obj.msg_you = "You";
	obj.msg_all = "All";
	obj.msg_final_obs_html = "You finished";
	obj.msg_final_obs_name = "Ending Kind";
	obj.msg_citation_obs_html = "Bible Citation observation";
	obj.msg_citation_obs_name = "Bible Citation observation";
	
	obj.msg_undo = "<i class='has_icons icon-undo'></i> Ups!";	
	
	obj.msg_sel_cit = "SELECT FROM DB";
	obj.msg_add_verse = "ADD VERSE";
	obj.msg_add_strong = "ADD STRONG CODE";
	obj.msg_add_link = "ADD WEB LINK";
	obj.msg_end_edit = "END EDIT";
	obj.msg_save = "SAVE";
	
	obj.msg_def_book = DEFAULT_BOOK_NAME;
	obj.msg_def_strong = "STRONG_CODE";
	obj.msg_def_link_name = "WEB LINK";
	
	obj.msg_save_in_browser = "IN BROWSER";
	obj.msg_save_in_cloud = "IN SiBiblia.com";
	
	obj.msg_open_from_browser = "FROM BROWSER";
	obj.msg_open_from_cloud = "FROM SiBiblia.com";
	
	obj.msg_new_answers_name = "NEW";
	
	obj.msg_fb_answers_name = "Results saved in SiBiblia.com";
	obj.msg_fb_answers_writing = "Saving...";
	obj.msg_fb_answers_reading = "Opening...";
	obj.msg_fb_no_internet = "No internet conection.";
	obj.msg_fb_not_finished = "Please complete the questionary to save results";

	const loggin_str = `please be sure to login in google.com and then click on the top icon <br>
		<img id="id_top_user_picture" class="img_user" src="../img/user.jpg">`;

	obj.msg_write_results_not_signed_in = `Congrats ! You finished this module. 
		To get a personal link and a QR code and participate in the contest ${loggin_str}`;

	obj.msg_write_results_signed_in = `Congrats ! You finished this module.`;

	obj.msg_rewrite_results_not_signed_in = `You have finished this module more than once. 
		If you want to write your results again in the stats, ${loggin_str}`;

	obj.msg_rewrite_results_signed_in = `You have finished this module more than once. 
		Do you want to write your results again in the stats?`;

	obj.msg_results = `These are your results compared to others:`;
		
	obj.msg_change_answer = `To add answers click on the current answer and click on "${obj.msg_edit_ans}"`;
	obj.msg_caused_by_answers = "This observation is shown due to your answer in these questions: ";
	obj.msg_caused_by_observations = "This observation is shown due these other observations: ";
	obj.msg_to_get_rid = `To get rid of this observation change one o more answers that are causing this observation by clicking the answer and then clicking on "${obj.msg_edit_ans}" or by clicking on "${obj.msg_undo}" until you get to the desired question`;

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
	obj.msg_qref_observation_num = "observation number";

	obj.msg_logout = `<i class="has_icons icon-logout"></i> USER LOGOUT`;
	obj.msg_google_name = "Google name";
	obj.msg_google_photo = "Google photo";
	obj.msg_google_email = "Google email";
	obj.msg_sibiblia_qr = "Your QR";
	obj.msg_sibiblia_link = "Your Link";
	obj.msg_sibiblia_id = "Your ID";
	obj.msg_sibiblia_photo = "Your Photo";
	obj.msg_usr_nequi = "Nequi";
	obj.msg_usr_paypal = "Paypal email";
	obj.msg_usr_transfiya = "Transfiya";
	obj.msg_usr_url_photo = "Photo URL";
	obj.msg_usr_country = "Country";
	obj.msg_usr_country_id = "Id";
	obj.msg_usr_name = "Name";
	obj.msg_usr_sex = "Sex";
	obj.msg_usr_birth_date = "Birth date";
	obj.msg_usr_marital_status = "Marital Status";
	obj.msg_usr_divorce_num = "Num divorces";
	obj.msg_usr_children_num = "Num children";
	obj.msg_usr_website = "Website";
	obj.msg_usr_facebook = "Facebook";
	obj.msg_usr_instagram = "Instagram";
	obj.msg_usr_youtube = "Youtube";
	
}

function ini_glb_vars_en(all_vars){
	all_vars.DEFAULT_BIB_HREF_SITE = "biblegateway";
	all_vars.DEFAULT_BIB_HREF_VERSION = "WEB";
	if(all_vars.has_qrefs == null){ all_vars.has_qrefs = {}; }
	if(all_vars.has_bibrefs == null){ all_vars.has_bibrefs = {}; }
	if(all_vars.bibrefs_upper == null){ all_vars.bibrefs_upper = {}; }
	
	all_vars.glb_exam_language = "en";
	all_vars.glb_all_countries = countries_en;
	all_vars.glb_all_marital = marital_en;
	all_vars.glb_all_sex = sex_en;
	all_vars.glb_all_id_names = country_id_names_en;
	all_vars.glb_def_country = "187";
	all_vars.glb_def_marital = "6";
	all_vars.glb_all_books = num2book_en;
	all_vars.glb_all_bibles = bibles_en;
	all_vars.glb_books_nums = book2num_en;
	all_vars.glb_curr_lang = all_en_msg;
	all_vars.glb_all_bibrefs = all_en_bibrefs;
	all_vars.glb_all_book_hrefs = book_en_hrefs;
	all_vars.glb_poll_txt = all_en_poll_txt;
	all_vars.glb_poll_db = {};	
}

export function init_en_module(all_vars){
	init_en_basic_msg();
	
	console.log("Called init_en_module");

	init_get_msg(all_en_poll_txt);
	init_en_bibrefs();
	init_en_book_hrefs();
	
	//num2book_en["-1"] = all_en_msg.msg_def_book;
	fill_reversed_object(num2book_en, book2num_en);
	
	fill_bibrefs_href(all_en_bibrefs);
	fill_all_strongrefs_href();

	//const all_vars = {};
	ini_glb_vars_en(all_vars);
}

export function init_lang_module(all_vars){
	init_en_module(all_vars);
}

function init_en_bibrefs(){
	let cit_obj = null;
	let kk = null;
	const rf = all_en_bibrefs;
	// all '_href' terminated entries it will be filled with '_obj' terminated data when fill_bibrefs_href gets called
	cit_obj = 
	rf.gen_15_15_obj = { book: "genesis", chapter: 15, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `but you will go to your fathers in peace. You will be buried at a good old age.`;
	cit_obj = 
	rf.gen_25_8_obj = { book: "genesis", chapter: 25, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Abraham gave up his spirit, and died at a good old age, an old man, and full of years, and was gathered to his people.`;
	rf.gen_35_29_obj = { book: "genesis", chapter: 35, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.gen_35_29_str = `Gen 35:29. Isaac gave up the spirit and died, and was gathered to his people, old and full of days. Esau and Jacob, his sons, buried him.`;
	rf.job_7_21_obj = { book: "job", chapter: 7, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.job_7_21_str = `Job 7:21. Why do you not pardon my disobedience, and take away my iniquity? For now will I lie down in the dust. You will seek me diligently, but I will not be.`;
	rf.job_14_12_obj = { book: "job", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.job_14_12_str = `Job 14:12. so man lies down and doesn’t rise. Until the heavens are no more, they will not awake, nor be roused out of their sleep.`;
	cit_obj = 
	rf.psa_16_11_obj = { book: "psalms", chapter: 16, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.`;	
	rf.psa_115_17_obj = { book: "psalms", chapter: 115, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.psa_115_17_str = `Psa 115:17. The dead don’t praise Yah, neither any who go down into silence;`;
	rf.ecc_9_10_obj = { book: "ecclesiastes", chapter: 9, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.ecc_9_10_str = `Ecc 9:10. Whatever your hand finds to do, do it with your might; for there is no work, nor plan, nor knowledge, nor wisdom, in Sheol, where you are going.`;
	rf.ecc_12_7_obj = { book: "ecclesiastes", chapter: 12, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.ecc_12_7_str = `Ecc 12:7. and the dust returns to the earth as it was, and the spirit returns to God who gave it.`;
	cit_obj = 
	rf.isa_8_19_obj = { book: "isaiah", chapter: 8, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `When they tell you, “Consult with those who have familiar spirits and with the wizards, who chirp and who mutter,” shouldn’t a people consult with their God? Should they consult the dead on behalf of the living?`;	
	rf.isa_14_7_obj = { book: "isaiah", chapter: 14, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.isa_14_8_obj = { book: "isaiah", chapter: 14, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.isa_14_9_txt_obj = { book: "isaiah", chapter: 14, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", };
	rf.isa_14_10_obj = { book: "isaiah", chapter: 14, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.isa_14_10_str = `Isa 14:10. They all will answer and ask you, "Have you also become as weak as we are? Have you become like us?"`;
	rf.isa_14_12_obj = { book: "isaiah", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.isa_14_18_txt_obj = { book: "isaiah", chapter: 14, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", };
	rf.isa_65_17_obj = { book: "isaiah", chapter: 65, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.isa_65_17_str = `Isa 65:17. For, behold, I create new heavens and a new earth; and the former things will not be remembered, nor come into mind.`;
	rf.isa_66_22_obj = { book: "isaiah", chapter: 66, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.isa_66_22_str = `Isa 66:22. "For as the new heavens and the new earth, which I will make, shall remain before me," says Yahweh, "so your offspring and your name shall remain."`;
	rf.mat_17_3_obj = { book: "matthew", chapter: 17, verse: 3, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.mat_17_3_str = `Mat 17:3. Behold, Moses and Elijah appeared to them talking with him.`;
	rf.mat_17_4_obj = { book: "matthew", chapter: 17, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.mat_26_64_obj = { book: "matthew", chapter: 26, verse: 64, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.mat_26_64_str = `Mat 26:64. Jesus said to him, "You have said so. Nevertheless, I tell you, after this you will see the Son of Man sitting at the right hand of Power, and coming on the clouds of the sky."`;
	rf.mat_28_9_obj = { book: "matthew", chapter: 28, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.mat_28_9_str = `Mat 28:9. As they went to tell his disciples, behold, Jesus met them, saying, "Rejoice!" They came and took hold of his feet, and worshiped him.`;
	rf.mar_16_19_obj = { book: "mark", chapter: 16, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.mar_16_19_str = `Mar 16:19. So then the Lord, after he had spoken to them, was received up into heaven, and sat down at the right hand of God.`;
	rf.luk_8_52_obj = { book: "luke", chapter: 8, verse: 52, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.luk_8_52_str = `Luk 8:52. All were weeping and mourning her, but he said, "Don’t weep. She isn’t dead, but sleeping."`;
	cit_obj = 
	rf.luk_15_24_obj = { book: "luke", chapter: 15, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `for this, my son, was dead, and is alive again. He was lost, and is found.’ Then they began to celebrate.`;	
	rf.luk_16_24_obj = { book: "luke", chapter: 16, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.luk_16_24_str = `Luk 16:24. He cried and said, ‘Father Abraham, have mercy on me, and send Lazarus, that he may dip the tip of his finger in water, and cool my tongue! For I am in anguish in this flame.’`;
	rf.luk_20_36_obj = { book: "luke", chapter: 20, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.luk_20_36_str = `Luk 20:36. For they can’t die any more, for they are like the angels, and are children of God, being children of the resurrection.`;
	cit_obj = 
	rf.luk_20_38_obj = { book: "luke", chapter: 20, verse: 38, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Now he is not the God of the dead, but of the living, for all are alive to him.`;	
	cit_obj = 
	rf.luk_23_43_obj = { book: "luke", chapter: 23, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Jesus said to him, “Assuredly I tell you, today you will be with me in Paradise.”`;
	rf.luk_24_30_obj = { book: "luke", chapter: 24, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.luk_24_30_str = `Luk 24:30. When he had sat down at the table with them, he took the bread and gave thanks. Breaking it, he gave it to them.`;
	rf.luk_24_39_obj = { book: "luke", chapter: 24, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.luk_24_39_str = `Luk 24:39. See my hands and my feet, that it is truly me. Touch me and see, for a spirit doesn’t have flesh and bones, as you see that I have`;
	rf.luk_24_43_obj = { book: "luke", chapter: 24, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.luk_24_43_str = `Luk 24:43. He took them, and ate in front of them.`;
	rf.jhn_2_19_obj = { book: "john", chapter: 2, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_2_19_str = `Jhn 2:19. Jesus answered them, "Destroy this temple, and in three days I will raise it up."`;
	cit_obj = 
	rf.jhn_4_24_obj = { book: "john", chapter: 4, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `God is spirit, and those who worship him must worship in spirit and truth.`;
	rf.jhn_5_28_obj = { book: "john", chapter: 5, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_5_28_str = `Jhn 5:28. Don’t marvel at this, for the hour comes in which all who are in the tombs will hear his voice,`;
	rf.jhn_5_29_obj = { book: "john", chapter: 5, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_5_29_str = `Jhn 5:29. and will come out; those who have done good, to the resurrection of life; and those who have done evil, to the resurrection of judgment.`;
	rf.jhn_6_39_obj = { book: "john", chapter: 6, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_6_39_str = `Jhn 6:39. This is the will of my Father who sent me, that of all he has given to me I should lose nothing, but should raise him up at the last day.`;
	rf.jhn_6_40_obj = { book: "john", chapter: 6, verse: 40, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_6_40_str = `Jhn 6:40. This is the will of the one who sent me, that everyone who sees the Son, and believes in him, should have eternal life; and I will raise him up at the last day.`;
	rf.jhn_6_44_obj = { book: "john", chapter: 6, verse: 44, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_6_44_str = `Jhn 6:44. No one can come to me unless the Father who sent me draws him, and I will raise him up in the last day.`;
	rf.jhn_6_54_obj = { book: "john", chapter: 6, verse: 54, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_6_54_str = `Jhn 6:54. He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day.`;
	rf.jhn_11_11_obj = { book: "john", chapter: 11, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_11_11_str = `Jhn 11:11. He said these things, and after that, he said to them, "Our friend, Lazarus, has fallen asleep, but I am going so that I may awake him out of sleep."`;
	rf.jhn_11_24_obj = { book: "john", chapter: 11, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_11_24_str = `Jhn 11:24. Martha said to him, "I know that he will rise again in the resurrection at the last day."`;
	rf.jhn_17_2_obj = { book: "john", chapter: 17, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_17_2_str = `Jhn 17:2. even as you gave him authority over all flesh, so he will give eternal life to all whom you have given him.`;
	rf.jhn_20_20_obj = { book: "john", chapter: 20, verse: 20, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_20_20_str = `Jhn 20:20. When he had said this, he showed them his hands and his side. The disciples therefore were glad when they saw the Lord.`;
	rf.jhn_20_27_obj = { book: "john", chapter: 20, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_20_27_str = `Jhn 20:27. Then he said to Thomas, "Reach here your finger, and see my hands. Reach here your hand, and put it into my side. Don’t be unbelieving, but believing"`;
	rf.jhn_14_2_obj = { book: "john", chapter: 14, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.jhn_14_2_str = `Jhn 14:2. In my Father’s house are many homes. If it weren’t so, I would have told you. I am going to prepare a place for you.`;
	rf.act_1_11_obj = { book: "acts", chapter: 1, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.act_1_11_str = `Act 1:11. who also said, "You men of Galilee, why do you stand looking into the sky? This Jesus, who was received up from you into the sky, will come back in the same way as you saw him going into the sky."`;
	cit_obj = 
	rf.act_7_59_obj = { book: "acts", chapter: 7, verse: 59, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `They stoned Stephen as he called out, saying, "Lord Jesus, receive my spirit!"`;
	rf.act_10_41_obj = { book: "acts", chapter: 10, verse: 41, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.act_10_41_str = `Act 10:41. not to all the people, but to witnesses who were chosen before by God, to us, who ate and drank with him after he rose from the dead`;
	rf.act_13_36_obj = { book: "acts", chapter: 13, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.act_13_36_str = `Act 13:36. For David, after he had in his own generation served the counsel of God, fell asleep, was laid with his fathers, and saw decay.`;
	rf.act_24_15_obj = { book: "acts", chapter: 24, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.act_24_15_str = `Act 24:15. having hope toward God, which these also themselves look for, that there will be a resurrection of the dead, both of the just and unjust.`;
	rf.rom_6_9_obj = { book: "romans", chapter: 6, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.rom_6_9_str = `Rom 6:9. knowing that Christ, being raised from the dead, dies no more. Death no longer has dominion over him`;
	rf._1co_15_22_obj = { book: "1_corinthians", chapter: 15, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf._1co_15_22_str = `1Co 15:22. For as in Adam all die, so also in Christ all will be made alive.`;
	rf._1co_15_42_obj = { book: "1_corinthians", chapter: 15, verse: 42, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf._1co_15_42_str = `1Co 15:42. So also is the resurrection of the dead. The body is sown perishable; it is raised imperishable.`;
	rf._1co_15_49_obj = { book: "1_corinthians", chapter: 15, verse: 49, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf._1co_15_49_str = `1Co 15:49. As we have borne the image of those made of dust, let’s also bear the image of the heavenly.`;
	cit_obj = 
	rf._2co_5_8_obj = { book: "2_corinthians", chapter: 5, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `We are courageous, I say, and are willing rather to be absent from the body and to be at home with the Lord.`;
	cit_obj = 
	rf._2co_12_4_obj = { book: "2_corinthians", chapter: 12, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `how he was caught up into Paradise, and heard unspeakable words, which it is not lawful for a man to utter.`;
	cit_obj = 
	rf.phl_1_23_obj = { book: "philippians", chapter: 1, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `But I am hard pressed between the two, having the desire to depart and be with Christ, which is far better.`;
	rf.phl_3_21_obj = { book: "philippians", chapter: 3, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.phl_3_21_str = `Phl 3:21. who will change the body of our humiliation to be conformed to the body of his glory, according to the working by which he is able even to subject all things to himself.`;
	rf.col_1_15_obj = { book: "colossians", chapter: 1, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.col_1_15_str = `Col 1:15. He is the image of the invisible God, the firstborn of all creation.`;
	cit_obj = 
	rf._1th_4_14_obj = { book: "1_thessalonians", chapter: 4, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `For if we believe that Jesus died and rose again, even so God will bring with him those who have fallen asleep in Jesus.`;
	cit_obj = 
	rf._1ti_5_6_obj = { book: "1_timothy", chapter: 5, verse: 6, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `But she who gives herself to pleasure is dead while she lives.`;
	rf._2ti_2_18_obj = { book: "2_timothy", chapter: 2, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf._2ti_2_18_str = `2Ti 2:18. men who have erred concerning the truth, saying that the resurrection is already past, and overthrowing the faith of some.`;
	cit_obj = 
	rf.heb_1_14_obj = { book: "hebrews", chapter: 1, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Aren’t they all serving spirits, sent out to do service for the sake of those who will inherit salvation?`;
	rf.heb_7_16_obj = { book: "hebrews", chapter: 7, verse: 16, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_7_16_str = `Heb 7:16. who has been made, not after the law of a fleshly commandment, but after the power of an endless life;`;
	rf.heb_7_25_obj = { book: "hebrews", chapter: 7, verse: 25, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_7_25_str = `Heb 7:25. Therefore he is also able to save to the uttermost those who draw near to God through him, seeing that he lives forever to make intercession for them.`;
	rf.heb_9_12_obj = { book: "hebrews", chapter: 9, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_9_12_str = `Heb 9:12. nor yet through the blood of goats and calves, but through his own blood, entered in once for all into the Holy Place, having obtained eternal redemption.`;
	rf.heb_9_27_obj = { book: "hebrews", chapter: 9, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_9_27_str = `Heb 9:27. Inasmuch as it is appointed for men to die once, and after this, judgment,`;
	rf.heb_9_28_obj = { book: "hebrews", chapter: 9, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_9_28_str = `Heb 9:28. so Christ also, having been offered once to bear the sins of many, will appear a second time, without sin, to those who are eagerly waiting for him for salvation.`;
	rf.heb_10_12_obj = { book: "hebrews", chapter: 10, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_10_12_str = `Heb 10:12. but he, when he had offered one sacrifice for sins forever, sat down on the right hand of God,`;
	rf.heb_12_23_obj = { book: "hebrews", chapter: 12, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_12_23_str = `Heb 12:23. to the festal gathering and assembly of the firstborn who are enrolled in heaven, to God the Judge of all, to the spirits of just men made perfect,`;
	rf.heb_13_8_obj = { book: "hebrews", chapter: 13, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.heb_13_8_str = `Heb 13:8. Jesus Christ is the same yesterday, today, and forever.`;
	cit_obj = 
	rf._1pe_3_19_obj = { book: "1_peter", chapter: 3, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `in whom he also went and preached to the spirits in prison,`;
	rf._2pe_3_13_obj = { book: "2_peter", chapter: 3, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf._2pe_3_13_str = `2Pe 3:13. But, according to his promise, we look for new heavens and a new earth, in which righteousness dwells.`;
	rf._1jo_3_2_obj = { book: "1_john", chapter: 3, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf._1jo_3_2_str = `1Jo 3:2. Beloved, now we are children of God. It is not yet revealed what we will be; but we know that when he is revealed, we will be like him; for we will see him just as he is.`;
	rf.rev_6_10_obj = { book: "revelation", chapter: 6, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.rev_6_10_str = `Rev 6:10. They cried with a loud voice, saying, "How long, Master, the holy and true, until you judge and avenge our blood on those who dwell on the earth?"`;
	rf.rev_14_13_obj = { book: "revelation", chapter: 14, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.rev_14_13_str = `Rev 14:13. I heard a voice from heaven saying, "Write, ‘Blessed are the dead who die in the Lord from now on.’" "Yes," says the Spirit, "that they may rest from their labors; for their works follow with them."`;
	rf.rev_1_18_obj = { book: "revelation", chapter: 1, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.rev_1_18_str = `Rev 1:18. and the Living one. I was dead, and behold, I am alive forever and ever. Amen. I have the keys of Death and of Hades`;
	rf.rev_20_13_obj = { book: "revelation", chapter: 20, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.rev_20_13_str = `Rev 20:13. The sea gave up the dead who were in it. Death and Hades gave up the dead who were in them. They were judged, each one according to his works.`;
	rf.rev_21_1_obj = { book: "revelation", chapter: 21, verse: 1, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "WEB", };
	rf.rev_21_1_str = `Rev 21:1. I saw a new heaven and a new earth: for the first heaven and the first earth have passed away, and the sea is no more.`;
}

function init_en_book_hrefs(){
	const tc_url = "https://toda-carne.github.io";
	
	const hb = book_en_hrefs;
	hb.href_home = tc_url + "/en/index.html";
	hb.href_creator_tit = tc_url + "/en/book.html#creator_DOT_";
	hb.href_tch_crea = tc_url + "/en/book.html#technical-creativity_DOT_";
	hb.href_tch_cplx = tc_url + "/en/book.html#technical-complexity_DOT_";
	hb.href_biology = tc_url + "/en/book.html#biology_DOT_";
	hb.href_creator = tc_url + "/en/book.html#creator_DOT_-1";
	hb.href_evidence = tc_url + "/en/book.html#evidence_DOT_";
	hb.href_reproduction_tit = tc_url + "/en/book.html#reproduction_DOT_";
	hb.href_reproduction = tc_url + "/en/book.html#reproduction_DOT_";
	hb.href_resurrection = tc_url + "/en/book.html#resurrection_DOT_";
	hb.href_resurrection_tit = tc_url + "/en/book.html#resurrection_DOT_";
	hb.href_physical_resu = tc_url + "/en/book.html#physical_DOT_";
	hb.href_still_physical = tc_url + "/en/book.html#physical_DOT_";
	hb.href_not_die_resu = tc_url + "/en/book.html#they-cant-die_DOT_";
	hb.href_in_heaven_resu = tc_url + "/en/book.html#in-the-sky_DOT_";
	hb.href_like_jesus_resu = tc_url + "/en/book.html#physical_DOT_";
	hb.href_for_all_resu = tc_url + "/en/book.html#for-all_DOT_";
	hb.href_not_yet_resu = tc_url + "/en/book.html#has-not-happened_DOT_";
	hb.href_only_few_resu = tc_url + "/en/book.html#has-not-happened_DOT_";
	hb.href_new_earth_resu = tc_url + "/en/book.html#a-new-earth_DOT_";
	hb.href_asleep = tc_url + "/en/book.html#asleep_DOT_";
	hb.href_the_cloth = tc_url + "/en/book.html#the-cloth_DOT_";
	hb.href_angels = tc_url + "/en/book.html#angels_DOT_";
	hb.href_wings = tc_url + "/en/book.html#wings_DOT_";
	hb.href_creation = tc_url + "/en/book.html#creation_DOT_";
	hb.href_life = tc_url + "/en/book.html#life_DOT_";
	hb.href_death = tc_url + "/en/book.html#death_DOT_";
	hb.href_liberator = tc_url + "/en/book.html#liberator_DOT_";
	hb.href_sleeping = tc_url + "/en/book.html#sleeping_DOT_";
	hb.href_rich_and_laza = tc_url + "/en/book.html#the-rich-and-the-poor-lazarus_DOT_";
	hb.href_144000 = tc_url + "/en/book.html#section";
	hb.href_eternal_abhorrence = tc_url + "/en/book.html#eternal-abhorrence_DOT_";
	hb.href_factories = tc_url + "/en/book.html#factories_DOT_";
}


// ENGLISH IS THE DEFAULT LANGUAGE 
// ALL OF ENGLISH DEFS ARE IN THE FILE "bq_tools.js"  THAT IS ALWAYS INCLUDED.

