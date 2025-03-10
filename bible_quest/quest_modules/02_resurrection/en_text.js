

import { gvar, uppercase_words_in_string, } from '../../code/bq_tools.js';

"use strict";

export function init_module_text(){
	init_en_poll_txt();
}

export function init_en_poll_txt(){
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let bibref = {};
	let rnam = null;	
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	const module_img_dir = gvar.qmodu_img_dir;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	//lg.ctx_bible2 = "<span class='has_left_padding very_big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='h1'><b>Bible?</b></span>";
	//lg.ctx_bible = "<span class='has_left_padding'><b>Bible</b></span>";
	//lg.ctx_bible = `<span class='has_left_padding'><img src="${module_img_dir}/bible.webp"></span>`;
	//lg.ctx_bible = "Bible?";
	
	lg.a_simple_YES = `YES`;
	lg.a_simple_NO = `NO`;	

	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${hb.href_physical_resu}'>Physical</a>`;
	lg.q_jesus_physical = `Select all verses that support a physical <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of Jesus Christ`;
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
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${hb.href_not_die_resu}'>To NOT die again</a>`;
	lg.q_jesus_not_die = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of Jesus Christ to NOT die again`;
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
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${hb.href_in_heaven_resu}'>In Heaven</a>`;
	lg.q6_1__in_heaven = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>RESURRECTED</a> Jesus Christ that is in heaven in BODY and spirit.`;
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
	

	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Like Jesus</a>`;
	lg.q7_1__like_jesus = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead that is like Jesus <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a>`;
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
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${hb.href_for_all_resu}'>For All</a>`;
	lg.q8_1__for_all = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead that is for ALL people`;
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
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${hb.href_not_yet_resu}'>Has NOT happend</a>`;
	lg.q9_1__not_yet = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead that has NOT happend for almost ANYBODY`;
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
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${hb.href_new_earth_resu}'>New Earth</a>`;
	lg.q11_1__new_earth = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead to live in a NEW EARTH with a new heavens`;
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
	
	
}

