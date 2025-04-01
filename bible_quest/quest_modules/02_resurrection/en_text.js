

import { gvar, uppercase_words_in_string, set_stm_bibref, set_href_bibcit, } from '../../code/bq_tools.js';

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
	
	lg.qmodu_title = `Biblical Resurrection?`;  
	
	lg.a_simple_YES = `YES`;
	lg.a_simple_NO = `NO`;
	
	const cl_jesus = `The bible claims that Jesus <br>`;
	const bf = `<span class='big_font'>`;
	const ef = `</span>`;

	const cl_ours = `The bible claims that our resurrection will be <br>`;
	
	lg.q_physical_resu = `${cl_jesus}${bf}resurrected in a physical body.${ef}`;
	lg.q_die_again = `${cl_jesus}${bf}will NOT die again.${ef}`;
	lg.q_alive_in_body_and_spirit = `${cl_jesus}${bf}is alive in his resurrected body in a celestial city.${ef}`;
	
	lg.q_like_jesus_body = `${cl_ours}${bf}in a physical body and spirit just like Jesus.${ef}`;
	lg.q_for_all = `${cl_ours}${bf}for ALL people good and bad.${ef}`;
	lg.q_not_yet = `${cl_ours}${bf}on the FINAL day. Not yet.${ef}`;
	lg.q_new_earth = `${cl_ours}${bf}in a NEW earth with a new heavens.${ef}`;

	const cl_until = `The bible claims that AFTER death and UNTIL our resurrection <br>`;
	lg.q_sleep = `${cl_until}${bf}the spirit is ASLEEP and there is NO consciousness.${ef}`;

	let bcit = null;
	let numv = null;
	
	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${hb.href_physical_resu}'>Physical</a>`;
	lg.q4_1__physical = `Select all verses that support a physical <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of Jesus Christ`;
	set_stm_bibref("q4_1__verse1_str", "BIBREF_Luk_24_39", { Luk_24_39: ["Touch", "flesh", "bones,"] });
	set_href_bibcit("q4_1__verse1_href", "Luk_24_39");
	lg.q4_1__verse1_should = "FLESH and BONES are PHYSICAL.";
	set_stm_bibref("q4_1__verse2_str", "BIBREF_Jhn_20_27", { Jhn_20_27: ["hand,", "put", "side."] });
	set_href_bibcit("q4_1__verse2_href", "Jhn_20_27");
	lg.q4_1__verse2_should = "Putting a hand into FLESH is something PHYSICAL.";
	numv = "3"; bcit = "Act_10_41";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["ate", "drank"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse3_should = "EATING and DRINKING is something PHYSICAL.";
	numv = "4"; bcit = "Mat_28_9";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["took", "hold", "feet,"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse4_should = "TAKING hold of somebody's feet is something PHYSICAL.";
	numv = "5"; bcit = "Luk_24_30";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["took", "bread"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse5_should = "BREAKING bread is something PHYSICAL.";
	numv = "6"; bcit = "Jhn_2_19";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["temple,", "raise"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse6_should = "REBUILDING a body is something PHYSICAL.";
	numv = "7"; bcit = "Luk_24_43";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["took", "ate"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse7_should = "EATING is something PHYSICAL.";
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${hb.href_not_die_resu}'>To NOT die again</a>`;
	lg.q5_1__not_die = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of Jesus Christ to NOT die again`;
	numv = "1"; bcit = "Rom_6_9";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["dies", "no", "more."] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse1_should = "DIES NO MORE.";
	numv = "2"; bcit = "Heb_7_16";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["endless", "life;"] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse2_should = "ENDLESS LIFE.";
	numv = "3"; bcit = "Rev_1_18";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["alive", "forever", "ever."] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse3_should = "ALIVE FOREVER and EVER.";
	numv = "4"; bcit = "Heb_7_25";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["lives", "forever", ] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse4_should = "LIVES FOREVER.";
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${hb.href_in_heaven_resu}'>In Heaven</a>`;
	lg.q6_1__in_heaven = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>RESURRECTED</a> Jesus Christ that is in heaven in BODY and spirit.`;
	numv = "1"; bcit = "Act_1_11";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["going", "into", "sky."] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse1_should = "GOING INTO the SKY. He went physically into the heavens";
	numv = "2"; bcit = "Mat_26_64";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["sitting", "clouds", "sky"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse2_should = "He is SITTING and coming on the CLOUDS";
	numv = "3"; bcit = "Jhn_14_2";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["house", "mansions;", "place"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse3_should = "He makes in a PLACE for his disciples";
	numv = "4"; bcit = "Heb_9_12";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["entered", "Place,", "heaven"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse4_should = "He ENTERED the Holy PLACE in the heavens";
	numv = "5"; bcit = "Heb_10_12";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["sat", "down"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse5_should = "He SAT DOWN in the heavens";
	numv = "6"; bcit = "Heb_13_8";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["is", "same", "forever."] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse6_should = "He is ALWAYS the same. So if He resurrected in BODY and spirit, He MUST be in BODY and spirit in the heavens.";
	numv = "7"; bcit = "Col_1_15";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["image", "invisible"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse7_should = "He is the IMAGE of the INVISIBLE God. So if He was visible when He resurrected, He must STILL be visible in the heavens.";
	

	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Like Jesus</a>`;
	lg.q7_1__like_jesus = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead that is like Jesus <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a>`;
	numv = "1"; bcit = "Phl_3_21";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["conformed", "body", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse1_should = "Just LIKE the BODY of Jesus";
	numv = "2"; bcit = "1Jo_3_2";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["like", "him,", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse2_should = "We will be LIKE HIM";
	numv = "3"; bcit = "Luk_20_36";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["can’t", "die", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse3_should = "Those bodies CAN'T DIE";
	numv = "4"; bcit = "Heb_9_27";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["die", "once,", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse4_should = "We are destined to DIE ONCE. No more.";
	numv = "5"; bcit = "1Co_15_49";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["bear", "image", "heavenly.", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse5_should = "We BARE the image of the HEAVENLY";
	numv = "6"; bcit = "1Co_15_42";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["body", "raised", "imperishable."] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse6_should = "The raised body is IMPERISHABLE";
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${hb.href_for_all_resu}'>For All</a>`;
	lg.q8_1__for_all = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead that is for ALL people`;
	numv = "1"; bcit = "Jhn_5_28";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["all", "tombs", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse1_should = "ALL is ALL";
	numv = "2"; bcit = "Jhn_5_29";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["good,", "evil,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse2_should = "GOOD and EVIL";
	numv = "3"; bcit = "Act_24_15";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["both", "just", "unjust.", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse3_should = "BOTH JUST and UNJUST";
	numv = "4"; bcit = "Jhn_6_39";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["all", "lose", "nothing,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse4_should = "ALL and LOSE NOTHING";
	numv = "5"; bcit = "Jhn_17_2";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["all", "flesh", "eternal", "life", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse5_should = "ALL FLESH ETERNAL LIFE";
	numv = "6"; bcit = "1Co_15_22";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["all", "alive.", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse6_should = "ALL is ALL";
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${hb.href_not_yet_resu}'>Has NOT happend</a>`;
	lg.q9_1__not_yet = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead that has NOT happend for almost ANYBODY`;
	numv = "1"; bcit = "Jhn_6_39";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["last", "day.", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse1_should = "It is on the LAST DAY";
	numv = "2"; bcit = "2Ti_2_18";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["erred", "already", "past,"] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse2_should = "It is NOT already past";
	numv = "3"; bcit = "Jhn_6_40";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["last", "day.", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse3_should = "It is on the LAST DAY";
	numv = "4"; bcit = "Jhn_6_44";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["last", "day.", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse4_should = "It is on the LAST DAY";
	numv = "5"; bcit = "Jhn_6_54";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["last", "day.", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse5_should = "It is on the LAST DAY";
	numv = "6"; bcit = "Jhn_11_24";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["last", 'day."', ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse6_should = "It is on the LAST DAY";
	numv = "7"; bcit = "Rev_20_13";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["gave", "dead"] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse7_should = "It is AFTER this earth and these heavens get destroyed";
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${hb.href_new_earth_resu}'>New Earth</a>`;
	lg.q11_1__new_earth = `Select all verses that support a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead to live in a NEW EARTH with a new heavens`;
	numv = "1"; bcit = "Rev_21_1";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["new", "earth:", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse1_should = "It is on a NEW EARTH with a new heavens";
	numv = "2"; bcit = "2Pe_3_13";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["new", "earth,", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse2_should = "It is on a NEW EARTH with a new heavens";
	numv = "3"; bcit = "Isa_65_17";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["new", "earth;", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse3_should = "It is on a NEW EARTH with a new heavens";
	numv = "4"; bcit = "Isa_66_22";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["new", "earth,", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse4_should = "It is on a NEW EARTH with a new heavens";
	
	/*
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
	*/
	
}

