

import { bib_defaults, uppercase_words_in_string, all_strongrefs, get_verse_reponse_name, make_bible_ref, get_verse_cit_key, bib_obj_to_txt, 
	gvar, set_stm_bibref, set_href_bibcit, 
} from '../../code/bq_tools.js';


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
	
	if(gvar.has_qrefs == null){ gvar.has_qrefs = {}; } 
	const qrf = gvar.has_qrefs;

	if(gvar.has_bibrefs == null){ gvar.has_bibrefs = {}; } 
	const brf = gvar.has_bibrefs;
	
	if(gvar.bibrefs_upper == null){ gvar.bibrefs_upper = {}; } 
	const brfup = gvar.bibrefs_upper;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	lg.q0_1__end_of_test = "These questions are not for you. This is the end of the questions for you, unless you did not really mean it and change your answer. Click on your answer to change it.";
	lg.q0_2__contradiction = "<b>Observation.</b> It seems you have an inconsistency with your answers. To change an answer click on it.";
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
	
	lg.q1_3__creator_section = `<a class='exam_ref exam_title' href='${hb.href_creator_tit}'>Creator</a>`;
	lg.q1_3__are_humans_intelligent = `With respect to <a class='exam_ref' href='${hb.href_tch_crea}'>technical creativity</a>, there is <a class='exam_ref' href='${hb.href_evidence}'>evidence</a> that the human being `;
	lg.q1_3__yes = "is intelligent, designer and has technical creativity.";
	lg.q1_3__should = "EVIDENCE are all the buildings, transistors, cars, satellites, refrigerators, washing machines, polishers, MACHINES that make machines, factories that use machines made by other factories, that humans have made";
	lg.q1_3__no = "is NOT intelligent, or NOT a designer, or has NO technical creativity";
	
	lg.q1_31__all_biological_machines = "All biological machines observed in plants, animals and people:";
	lg.q1_31__creator = "Were created by a CREATOR";
	lg.q1_31__other = "Are result of an OTHER cause, not a creator";

	lg.q1_32__the_creator = `The statement: 'Just like the human being, the CREATOR of all biological machines observed in plants, animals and people is intelligent, designer and has <a class='exam_ref' href='${hb.href_tch_crea}'>technical creativity</a>'`;
	lg.q1_32__intelligent = "It is true.";
	lg.q1_32__not_intelligent = "It is false.";
	
	lg.q1_33__the_evolution = `The statement: 'The creator used EVOLUTION as means to create all <a class='exam_ref' href='${hb.href_factories}'>biological machines</a> observed in plants, animals and people'`;
	lg.q1_33__yes = "It is true.";
	lg.q1_33__no = "It is false.";
	
	lg.q1_34__six_spins = "The statement: 'The creator of all biological machines observed in plants, animals and people, created them in no more than six spins of the planet on its axis, six chronological days'";
	lg.q1_34__yes = "It is true.";
	lg.q1_34__no = "It is false.";
	
	lg.q1_35__skip_creator_proof = `You can now choose to SKIP all the questions for proving by evidence and logic the existance of a creator of all biological machines, do you want to skip them?`;
	lg.q1_35__yes = "Yes, SKIP the questions.";
	lg.q1_35__no = "No, let me ANSWER them.";
	
	lg.q1_4__requires_technical_creativity = `Select ALL claims about <a class='exam_ref' href='${hb.href_tch_crea}'>technical creativity</a> supported by evidence: `;
	lg.q1_4__knife = "a knife requires technical creativity to reproduce";
	lg.q1_4__should1 = "a knife is EVIDENCE of men's technical creativity";
	lg.q1_4__lamp = "a lamp requires technical creativity to reproduce";
	lg.q1_4__should2 = "a lamp is EVIDENCE of men's technical creativity";
	lg.q1_4__clock = "a clock requires technical creativity to reproduce";
	lg.q1_4__should3 = "a clock is EVIDENCE of men's technical creativity";
	
	lg.q1_5__more_complex_than = `Select ALL claims about <a class='exam_ref' href='${hb.href_tch_cplx}'>technical complexity</a> supported by evidence: `;
	lg.q1_5__building_vs_knife = "a building has more technical complexity than a knife";
	lg.q1_5__should1 = "generally speaking a building is HARDER to make than a knife, just by the fact that usually you need knives to make a building";
	lg.q1_5__car_vs_lamp = "a car has more technical complexity than a lamp";
	lg.q1_5__should2 = "generally speaking a car is HARDER to make than a lamp, just by the fact that cars usually have lamps";
	lg.q1_5__cellphone_vs_clock = "a cellphone has more technical complexity than a clock";
	lg.q1_5__should3 = "generally speaking a cellphone is HARDER to make than a clock, just by the fact that usually a cellphone has a built-in clock";
	
	lg.q1_7__more_complexity_then_more_creativity = `Given all normal perceptual experience, the statement: "the more <a class='exam_ref' href='${hb.href_tch_cplx}'>technical complexity</a> an object or machine has, THEN, the bigger the <a class='exam_ref' href='${hb.href_tch_crea}'>technical creativity</a> needed to reproduce it"`;
	lg.q1_7__yes = "It is true.";
	lg.q1_7__no = "It is false.";
	
	lg.q1_8__more_creativity = `Select ALL claims about <a class='exam_ref' href='${hb.href_tch_crea}'>technical creativity</a> supported by evidence: `;
	lg.q1_8__building_vs_knife = "a building requires more technical creativity to reproduce than a knife";
	lg.q1_8__car_vs_lamp = "a car requires more technical creativity to reproduce than a lamp";
	lg.q1_8__cellphone_vs_clock = "a cellphone requires more technical creativity to reproduce than a clock";
	
	lg.q1_9__coplexity_of_biological_machines = `Select ALL claims supported by normal perceptual experience about man made machines and <a class='exam_ref' href='${hb.href_factories}'>factories</a> compared to <a class='exam_ref' href='${hb.href_biology}'>biological machines</a>: `;
	lg.q1_9__car_vs_mitosis = "We do NOT observe in CARS that one can start a process in which it divides in two of them identical to the original, nor we observe it in any other man made machine, yet we observe it in the MITOSIS of biological machines like the CELL.";
	lg.q1_9__smartphone_vs_sex = "We do NOT observe in SMARTPHONES that a male one joins with a female one, and after a while, a third small one comes out of the female one, that resembles a mix of two of them, and that it grows in size as time goes by, nor we observe it in any other man made machine, yet we observe it in SEX reproduction of biological machines like the HUMAN BODY.";
	lg.q1_9__bicycle_vs_healing = "We do NOT observe in BICYCLES that when one crashes and its surface gets damaged, in a few days it has fixed its surface, nor we observe it in any other man made machine, yet we observe it in HEALING of biological machines like in the SKIN of animals.";
	lg.q1_9__knife_vs_regeneration = "We do NOT observe in KNIFES that when one brakes and looses its tip, in a few days it has grown a new tip, nor we observe it in any other man made machine, yet we observe it in REGENERATION of biological machines like the TAIL of some lizards.";
	
	lg.q1_91__more_complexity_in_biology = `Given all normal perceptual experience, the statement: "<a class='exam_ref' href='${hb.href_biology}'>biological machines</a> have more <a class='exam_ref' href='${hb.href_tch_cplx}'>technical complexity</a> that human made machines"`;
	lg.q1_91__yes = "It is true.";
	lg.q1_91__no = "It is false.";
	
	lg.q1_92__human_complexity = `Select ALL claims about <a class='exam_ref' href='${hb.href_tch_cplx}'>technical complexity</a> and <a class='exam_ref' href='${hb.href_factories}'>factories</a> supported by evidence: `;
	lg.q1_92__leg = "a LEG is so complex that if we understood how they are made we could take a drop of blood of the person missing a leg, make a custom leg for him, and install it, just like we do with a car WHEEL.";
	lg.q1_92__liver = "a LIVER is so complex that if we understood how they are made we could take a drop of blood of the person with a damaged liver, make a custom liver for him, and install it, just like we do with a distribution and logistics warehouse of a FACTORY.";
	lg.q1_92__lung = "a LUNG is so complex that if we understood how they are made we could take a drop of blood of the person with a damaged lung, make a custom lung for him, and install it, just like we do with the air filtering equipment of a VENTILATION system.";
	
	qrf.q1_93__biological_requires_creativity = true;
	lg.q1_93__biological_requires_creativity = `Given your answers in QREF_q1_91__ and QREF_q1_7__ you MUST conclude that the statement: "biological machines require more <a class='exam_ref' href='${hb.href_tch_crea}'>technical creativity</a> than human made machines"`;
	lg.q1_93__yes = "It is true.";
	lg.q1_93__no = "It is false.";
	
	qrf.q1_94__if_human_then_creator = true;
	lg.q1_94__if_human_then_creator = `Given your answer in QREF_q1_93__ you MUST conclude that the statement: "IF the human being is going to call himself intelligent, designer and <a class='exam_ref' href='${hb.href_creator}'>creator</a>, due to all the <a class='exam_ref' href='${hb.href_evidence}'>EVIDENCE</a> in the tecnology that he has made, THEN, he has to admit that there EXISTS an intelligent, designer and creator of all <a class='exam_ref' href='${hb.href_biology}'>biological machines</a> that we observe"`;
	lg.q1_94__yes = "It is true.";
	lg.q1_94__no = "It is false.";
	
	lg.q2_0__reproduction_section = `<a class='exam_ref exam_title' href='${hb.href_reproduction_tit}'>Reproduction</a>`;
	
	lg.q2_1__can_an_engineer_rebuild_his_house = `If an engineer has <a class='exam_ref' href='${hb.href_reproduction}'>reproduced</a>, built, the same house many times, and one of them gets destroyed, by fire, in an accident, or by someone else `;
	lg.q2_1__yes = "he can BUILD the destroyed house again.";
	lg.q2_1__no = "he CANNOT build the destroyed house again";
	
	qrf.q2_2__future_resurrection = true;
	lg.q2_2__future_resurrection = `Given your answer in QREF_q2_1__ you must accept that it is REASONABLE to visualize a future, maybe distant, when we understand enough about the human body, in which humans will be able to <a class='exam_ref' href='${hb.href_reproduction}'>reproduce</a> the human body and simulate a <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a>`;
	lg.q2_2__yes = "Yes. I DO";
	lg.q2_2__no = "No. I do NOT";
	
	
	lg.q3_1__resurrection_section = `<a class='exam_ref exam_title' href='${hb.href_resurrection_tit}'>Resurrection</a>`;
	lg.q3_1__jesus_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${hb.href_resurrection}'>RESURRECTED</a> Jesus Christ: `;
	lg.q3_1__physical = "He was physically resurrected, in BODY and spirit";
	lg.q3_1__not_to_die = "He is alive FOREVER, to not die again, because He cannot longer die.";
	lg.q3_1__in_heaven = "He is, in BODY and spirit, in the heavens, that PHYSICAL sky that we can see, and that has clouds";
	
	lg.q3_2__people_resurrection_claims = `Select ALL statements that you believe are claimed by The Bible about the <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead promissed by Jesus Christ: `;
	lg.q3_2__like_jesus = "It is in BODY and SPIRIT just like Jesus Chist. And it is in a new body, similar to Jesus's one, that cannot die.";
	lg.q3_2__for_all = "It is for everyone. ALL people, just and unjust.";
	lg.q3_2__not_yet_most = "It has NOT happened for almost anybody. The promissed event is on the last day.";
	//lg.q3_2__happened_for_few = "It HAS happened for a FEW ones. Some male genetic decendants of Jacob, of Israel, have been resurrected.";
	lg.q3_2__new_earth = "It is to live forever in a new physical EARTH with new physical HEAVENS";
	lg.q3_2__sleep = "Before resurrection, the dead person has NO body, NO consciousness, and therefore cannot do anything. The dead ARE dead.";

	lg.q3_3__dispute_or_accept_resurrection = `What statements about <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> would you like to explore and optionally dispute? `;
	lg.q3_3__not_believed = "The ones I DO NOT believe are claimed by The Bible.";
	lg.q3_3__all_stms = "ALL of them.";
	lg.q3_3__go_on = "NONE of them. I ACCEPT they are all claimed by The Bible. Let's go on.";

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
	
	/*
	lg.q10_1__has_for_few_sec = `<a class='exam_ref exam_title' href='${hb.href_only_few_resu}'>Only for few</a>`;
	lg.q10_1__has_for_few = `1st quest ONLY FOR FEW`;
	lg.q10_1__go = "Go";
	lg.q10_1__stay = "Stay";
	*/
	
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
	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${hb.href_sleeping}'>Sleep</a>`;
	lg.q12_1__sleep = `Select a GOOD verse that supports that physically dead people DO HAVE CONSCIOUSNESS before <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a>.`;
	lg.q12_1__no_consciousness = "According to TodaCarne.com none of these is a good verse";
	numv = "1"; bcit = "Isa_14_10";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["answer", "ask", "you,", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "2"; bcit = "Mat_17_3";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["talking", "him.", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "3"; bcit = "Rev_6_10";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["cried", "loud", "voice,", "saying,", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "4"; bcit = "Heb_12_23";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["festal", "gathering", "assembly", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "5"; bcit = "Luk_16_24";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["cried", "said,", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);

	const q12_1__response_INTRO = `<p> This is a commonly cited verse as objection to SPIRIT <a class='exam_ref' href='${hb.href_sleeping}'>sleep</a>.</p>
	<p> When arguing against SPIRIT (NOT soul) <a class='exam_ref' href='${hb.href_sleeping}'>sleep</a> always remember that the whole bible refers to the dead as <a class='exam_ref' href='${hb.href_sleeping}'>SLEEP</a>, specially our Lord Jesus Christ. The reason is obvious: NO <a class='exam_ref' href='${hb.href_sleeping}'>sleeping</a> person has CONSCIOUSNESS. That is the most prominent characteristic of a <a class='exam_ref' href='${hb.href_sleeping}'>sleeping</a> person. Please read the section introducing the biblical concept of SPIRIT <a class='exam_ref' href='${hb.href_sleeping}'>sleep</a> of the completely FREE book <a class='exam_ref' href='${hb.href_home}'>TodaCarne.com</a>. </p>`;
	
	const q12_1__response_END = `<p> So this verse <b>DOES NOT REFER</b> to the physically dead having CONSCIOUSNESS.</p>`;

	
	lg.q12_1__response_to_verse1 = `<a class='exam_ref' target='_blank' href=${rf.isa_14_10_href}>Isa 14:10</a> ${q12_1__response_INTRO}
	<p> This verse refers to a literal future time or an spiritual one that happend as reafirmation of the literal case. The king of Babilon represents The Satan, that is why <a class='exam_ref' href=${rf.isa_14_12_href}>verse 12</a> is commonly cited to refer to The Satan. </p>
	<p>Note that:</p> 
	<li> <a class='exam_ref' href=${rf.isa_14_8_href}>Verse 8</a> says: Yes, the cypress trees rejoice with you, with the cedars of Lebanon, saying, "Since you are humbled, no lumberjack has come up against us". So for the spiritual case it is a metaphor and the literal case has not nappened yet because <a class='exam_ref' href=${rf.isa_14_7_href}>verse 7</a> has NOT happened literally: "The whole earth is at rest, and is quiet". 
	<li> <a class='exam_ref' href=${rf.isa_14_9_txt_href}>Verse 9</a> shows that the literal case implies that the dead have AWAKEN (word <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>) which has NOT happend either because the resurrection of the dead has not happend. 
	<li> <a class='exam_ref' href=${rf.isa_14_18_txt_href}>Verse 18</a> tell us that each king is in his own HOUSE (word <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). For the literal case they have been resurrected. 
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse2 = `<a class='exam_ref' href=${rf.mat_17_3_href}>Mat 17:3</a> ${q12_1__response_INTRO}
	<p>It is also recommended that you have at least read the section introducing the biblical concept of <a class='exam_ref' href='${hb.href_resurrection}'>Resurrection</a> and in particular the fact that <a class='exam_ref' href='${hb.href_not_yet_resu}'>It has not happend</a>.</p>
	<p> The most important thing to note about this verse is that they were physically present, they all have BODIES, and that is why Peter, in <a class='exam_ref' href=${rf.mat_17_4_href}>verse 4</a>, offers to build three tents. Two tents for Moses and Elijah and one for Our Lord. They are physically ALIVE. They where in the Jewish festival of Sukkot. The feast of Tabernacles. Very appropiate signal to show that these "tabernacles" are going to be replaced by permanent "houses". </p>
	${q12_1__response_END}
	`;
	
	const q12_1__response_144000 = `<p>This verse refers to the 144.000. Please read the section <a class='exam_ref' href='${hb.href_144000}'>144.000</a>.	Another section that could help is the one called <a class='exam_ref' href='${hb.href_eternal_abhorrence}'>Eternal Abhorrence</a>.</p>
	<p> The most important thing to note about this verse is that it refers to people that have been resurrected. The Saints. The Great ones. The first fruits. The firstborn. The ones God brings with Jesus Christ. They are a FEW: 144.000 male genetic descendants of Israel when completed. They all have BODIES, and that is why they can actually CRY, SPEAK, GATHER and ASSEMBLY.</p>`;
	
	
	lg.q12_1__response_to_verse3 = `<a class='exam_ref' href=${rf.rev_6_10_href}>Rev 6:10</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse4 = `<a class='exam_ref' href=${rf.heb_12_23_href}>Heb 12:23</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse5 = `<a class='exam_ref' href=${rf.luk_16_24_href}>Luk 16:24</a> ${q12_1__response_INTRO}
	<p>This verse is part of the famous PARABLE in Luke. Please read the section called <a class='exam_ref' href='${hb.href_rich_and_laza}'>The rich and the poor Lazarus.</a>.</p>
	<p> The most important thing to note about this verse is that it part of a PARABLE. So please read the correct <a class='exam_ref' href='${hb.href_rich_and_laza}'>INTERPRETATION</a>.</p>
	${q12_1__response_END}
	`;
		
	const q12_1__nowhere_consciousness = `<p> NOWHERE in this verse and its context is there any thing that remotely refers to CONSCIOUSNESS of physically dead people. It is really remarkable how the greek culture has affected the hebrew teachings of the hebrew scriptures.</p>`;
	
	const q12_1__response_sheol = `<p> This verse refers to the fact that ALL dead people go to the Sheol, to the tomb, to the Sepulcre, to the pit. </p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}`;
	
	cit_obj = rf.gen_15_15_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_15_15_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	cit_obj = rf.gen_25_8_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_25_8_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	cit_obj = rf.gen_35_29_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_35_29_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	const q12_1__response_spiritually_dead = `<p> This verse refers to spiritually dead people. Please read the sections called <a class='exam_ref' href='${hb.href_life}'>Life</a>, <a class='exam_ref' href='${hb.href_death}'>Death</a>, and <a class='exam_ref' href='${hb.href_liberator}'>Liberator</a>.</p>`;
	
	cit_obj = rf._1pe_3_19_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._1pe_3_19_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	<p> The most important thing to note in this verse and its context is that ALL people are DEAD without Jesus Christ who is LIFE itself. So the verse refers to people PHYSICALLY alive but spiritually dead. Any person that does not believe in Jesus Christ is a slave, a PRISONER of the Spirit that rules this world, that person is a "spirit in prison". Jesus's RESURRECTION good news set that person free. It is a new begining. And the times of Noah, which were a new begining, were a SIGN of the new begining in the times of Christ. That is what the passage is about. Maybe NOT in a bad translation but certanly in the ancient koine greek.</p>
	<p> The second thing to note is that NOWHERE, in the verse or its context, appears the greek word Hades, the greek word used in ancient greek manuscripts for the hebrew Sheol, the place where dead people go: the tomb, the Sepulcre, the pit. This passage is NOT talking about PHYSICALLY dead people. It is about spiritually dead people and they were ALL spiritually dead when Jesus died and resurrected. </p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf._2co_5_8_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_5_8_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers to be absent of this body that dies AND, when RESURRECTED in a new body that cannot die, be present with the Lord. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be PRESENT with Him is to be ALSO RESURRECTED.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.act_7_59_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.act_7_59_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> This verse refers to the fact that when people die, as <a class='exam_ref' href=${rf.ecc_12_7_href}>Ecc 12:7</a> tells us, the spirit RETURNS to Elohim who gave it, so everything goes back as it was BEFORE the person was physically born. </p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.luk_20_38_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_20_38_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> This verse refers to the fact that dead people CAN be AWAKEN from their <a class='exam_ref' href='${hb.href_sleeping}'>SLEEP</a>, and that is why to the one who can WAKE them up they are still ALIVE.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	const q12_1__response_paradise = `<p> This verse refers to the PARADISE, a physical PLACE where RESURRECTED people will live eternally with Jesus Christ, NOT to the Sheol, to the tomb, to the Sepulcre, to the pit.</p>
	${q12_1__nowhere_consciousness}
	`;
	
	cit_obj = rf._2co_12_4_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_12_4_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.luk_23_43_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_23_43_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	cit_obj = rf._1ti_5_6_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._1ti_5_6_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.luk_15_24_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_15_24_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.jhn_4_24_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.jhn_4_24_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> This verse refers to PHYSICALLY alive people to worship in spirit and in truth.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.heb_1_14_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p>This verse refers to angels as spirits. The bible refers to any physically living person as a spirit. Please read the sections <a class='exam_ref' href='${hb.href_angels}'>Angels</a> and <a class='exam_ref' href='${hb.href_wings}'>Wings</a>.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.phl_1_23_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.phl_1_23_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers depart and be with Christ when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be with Him is to be ALSO RESURRECTED.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.psa_16_11_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.psa_16_11_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ knows that he is The Way and The Life and that he will get to be in His presence when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be in His presence is to be ALSO RESURRECTED.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.isa_8_19_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.isa_8_19_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> The prohibition in the Old Testament for people to speak to the dead is to prevent them from speaking to Celestial Powers, commonly known in the New Testament as DEMONS, that will pretend to be the dead person to decieve the one trying to communicate with the dead.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf._1th_4_14_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_144000}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;	
	
	lg.q13_1__sleep = `Select all verses that support that dead people do NOT have CONSCIOUSNESS until <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a>.`;
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
	

	lg.q14_1__the_cloth_sec = `<a class='exam_ref exam_title' href='${hb.href_the_cloth}'>The Cloth</a>`;
	lg.q14_1__the_cloth = `1st quest THE CLOTH`;
	lg.q14_1__go = "Go";
	lg.q14_1__stay = "Stay";
	
}

