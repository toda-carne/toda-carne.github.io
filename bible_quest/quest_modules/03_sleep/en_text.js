

import { gvar, uppercase_words_in_string, make_bible_ref, get_resp_for, all_strongrefs, bib_defaults, fill_response, fill_responses_for, 
	get_bibcit_obs_stm_id, 
} from '../../code/bq_tools.js';

"use strict";

export function init_module_text(){
	init_en_poll_txt();
}

export function init_en_poll_txt(){
	console.log("Called init_en_poll_txt.");
	
	let rdat = null;
	let cit_txt = null;
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	const module_img_dir = gvar.qmodu_img_dir;
	
	if(gvar.has_qrefs == null){ gvar.has_qrefs = {}; } 
	const qrf = gvar.has_qrefs;
	
	if(gvar.has_bibrefs == null){ gvar.has_bibrefs = {}; } 
	const brf = gvar.has_bibrefs;
	
	if(gvar.bibrefs_upper == null){ gvar.bibrefs_upper = {}; } 
	const brfup = gvar.bibrefs_upper;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	//lg.ctx_bible2 = "<span class='has_left_padding very_big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='big_font bold_font'>Bible?</span>";
	//lg.ctx_bible = "<span class='h1'><b>Bible?</b></span>";
	//lg.ctx_bible = "<span class='has_left_padding'><b>Bible</b></span>";
	//lg.ctx_bible = `<span class='has_left_padding'><img src="${module_img_dir}/bible.webp"></span>`;
	//lg.ctx_bible = "Bible?";

	lg.qmodu_title = gvar.qmodule_title;
	
	lg.a_simple_YES = `YES`;
	lg.a_simple_NO = `NO`;

	lg.a_is_TRUE = `TRUE`;
	lg.a_is_FALSE = `FALSE`;	
	
	const bf = `<span class='big_font'>`;
	const ef = `</span>`;

	const cl_bible = `The bible claims that <br>`;
	const cl_jesus = `According to the bible, Jesus Christ claims that <br>`;
	const cl_until = `The bible claims that AFTER physical death and UNTIL our resurrection <br>`;
	const the_gospel = `${bf}To deny this is to deny the Good News, the Gospel.${ef}`;
		
	lg.q_sleep = `${cl_until}${bf}the spirit is ASLEEP and there is NO KNOWLEDGE.${ef}`;

	lg.q_jesus_died = `${cl_bible}${bf}Jesus Christ died on the cross.${ef}`;
	
	brf.o_jesus_died_comm = true;
	lg.o_jesus_died_comm = `The following verses are just some of the verses claiming that <br> ${bf}Jesus Christ died on the cross.${ef} <br> 
	<li> BIBREF_Luk_23_46 
	<li> BIBREF_Rom_5_8 
	<li> BIBREF_1Co_15_3 
	<br>	
	${the_gospel}
	`;
	lg.o_jesus_died_nm = `Jesus died`;

	lg.q_jesus_eternal = `${cl_bible}${bf}His ETERNAL LIFE was interrupted for three nights and three days.${ef}`;

	brf.o_jesus_eternal_comm = true;
	lg.o_jesus_eternal_comm = `The following verses are just some of the verses claiming that <br> 
	${bf}Jesus Christ ETERNAL LIFE was interrupted for three nights and three days.${ef} <br> 
	<li> BIBREF_Mat_12_40 
	<li> BIBREF_1Co_15_4 
	<li> BIBREF_Act_10_40 
	<br>
	${the_gospel}
	`;
	lg.o_jesus_eternal_nm = `Jesus life interrupted`;
	
	lg.q_eternal_life = `${cl_jesus}${bf}ETERNAL LIFE is to know the True God and His son Jesus Christ.${ef}`;

	brf.o_eternal_life_comm = true;
	lg.o_eternal_life_comm = `In the following verse teaches PRECISELY that <br> 
	${bf} BIBREF_Jhn_17_3 ${ef}
	`;
	lg.o_eternal_life_nm = `Eternal Life definition`;

	lg.q_no_knowledge_in_death = `We can conclude that according to the bible <br> 
	${bf}Jesus Christ KNOWLEDGE of God and of Himself${ef} <br> 
	was interrupted three nights and three days.
	`;

	brf.o_no_knowledge_comm = true;
	lg.o_no_knowledge_comm = `It seems you like to deny the evident. The argument is very simple, yet very strong: <br> 
	${lg.q_jesus_died} <br> 
	${lg.q_jesus_eternal} <br> 
	${lg.q_eternal_life} <br> 
	${lg.q_no_knowledge_in_death} <br> 
	${the_gospel}
	`;
	lg.o_no_knowledge_nm = `No Knowledge`;

	lg.q_verse_for_knowledge_in_death = `Choose ONE verse that supports the claim that according to the bible <br>
	${bf} the NOT resurrected and physically dead people HAVE KNOWLEDGE${ef}
	`;
	
	const dead_know_response_INTRO = `<p> This is a commonly cited verse as objection to 
	"<a class='exam_ref' href='${hb.href_sleeping}'>the dead know NOTHING</a>". Click on the link for more info. </p>`;
	
	const dead_know_response_END = `<p> So this verse <b>DOES NOT REFER</b> to the physically dead having KNOWLEDGE before resurrection. 
		Only ALIVE people, which requires having a physycal body, can have knowledge. </p>`;
	
	const dead_know_response_UNKNOWN_VERSE = `BIBREF_CHOSEN  <p> This verse does not seem to talk about physically dead people having KNOWLEDGE before resurrection. If you are sure that this verse can be used to argue for that, please write an email to debate@SiBibla.com explaining the case. </p>`;

	let resp_bcit = null;
	let stm_id = null;

	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", gvar.UNKNOWN_VERSE);
	lg[stm_id] = dead_know_response_UNKNOWN_VERSE;
	brf[stm_id] = true;

	// -----------
	
	resp_bcit = `BIBREF_Isa_14_10 ${dead_know_response_INTRO}
	<p> Just as the Passover was a type of the Meshiakh. This passage is a type of future time. The king of Babilon represents The Satan, that is why <p> BIBREF_Isa_14_12 <p> is commonly cited to refer to The Satan. </p>
	<p>Note that:</p> 
	<p><li> BIBREF_Isa_14_8 <p> It has not nappened yet because BIBREF_Isa_14_7 <br> has NOT happened yet. There is no peace on earth yet.
	<p><li> BIBREF_Isa_14_9 <p> shows that the dead have RAISED, actually AWAKEN (word <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>), which has NOT happend because the <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead, since they are awakening from Sheol, <a class='exam_ref' href='${hb.href_not_yet_resu}'>has not happend</a>. 
	<p><li> BIBREF_Isa_14_18 <p> tell us that each king is in his own HOUSE (word <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). Which means that they HAVE been RESURRECTED. 
	${dead_know_response_END}`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Isa_14_10");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Isa_14_7 = ["rest,", "quiet.", ];
	brfup[stm_id].Isa_14_10 = ["answer", "ask", "you,", ];
	brfup[stm_id].Isa_14_9 = ["raised", ];
	brfup[stm_id].Isa_14_18 = ["house.", ];

	// -----------
	
	resp_bcit = `BIBREF_Mat_17_3 ${dead_know_response_INTRO}
	<p>It important to note that the general <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead <a class='exam_ref' href='${hb.href_not_yet_resu}'>has not happend yet</a>. However temporal resurrections happen in several places in the bible. So, the most important thing to note about this verse is that they were physically present, they all have BODIES, that is why they can TALK, and that is why Peter, in 
	<p> BIBREF_Mat_17_4 
	<p>offers to build three tents. Two tents for Moses and Elijah and one for Our Lord. They are physically ALIVE. They where in the Jewish festival of Sukkot. The feast of Tabernacles. Very appropiate signal to show that these "tabernacles" are going to be replaced by permanent "houses". </p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Mat_17_3");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Mat_17_3 = ["talking", "him.", ];
	brfup[stm_id].Mat_17_4 = ["make", "three", "tents", ];

	// -----------
	
	const dead_know_response_144000 = `<p>This verse refers to the <a class='exam_ref' href='${hb.href_144000}'>144.000</a> saints of Revelation also mentioned in Daniel in the <a class='exam_ref' href='${hb.href_eternal_abhorrence}'>Eternal Abhorrence</a>.</p>
	<p> The most important thing to note about this verse is that it refers to people that have been resurrected. The Saints. The Great ones. The first fruits. The firstborn. The ones God brings with Jesus Christ. They are a FEW: 144.000 male genetic descendants of Israel when completed. They all have BODIES, and that is why they can actually CRY, SPEAK, GATHER and ASSEMBLY.</p>`;	
	
	resp_bcit = `BIBREF_Rev_6_10 ${dead_know_response_INTRO}
	${dead_know_response_144000}
	${dead_know_response_END}`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Rev_6_10");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Rev_6_10 = ["cried", "loud", "voice,", "saying,", ];
	
	// -----------
	
	resp_bcit = `BIBREF_Heb_12_23 ${dead_know_response_INTRO}
	${dead_know_response_144000}
	${dead_know_response_END}`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Heb_12_23");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Heb_12_23 = ["festal", "gathering", "assembly", ];
	
	// -----------

	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p>This verse is part of the famous PARABLE in Luke 16 about <a class='exam_ref' href='${hb.href_rich_and_laza}'>The rich and the poor Lazarus.</a>.</p>
	${dead_know_response_END}
	`;
		
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Luk_16_24");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Luk_16_24 = ["cried", "said,", ];
	
	fill_response("q_verse_for_knowledge_in_death__", "Luk_16_19_31", resp_bcit, brfup[stm_id]);
	
	// -----------
	
	const nowhere_knowledge = `<p> NOWHERE in this verse and its context is there any thing that remotely refers to physically dead people having KNOWLEDGE. It is really remarkable how the greek culture has affected the hebrew teachings of the hebrew scriptures.</p>`;
	
	const response_sheol = `<p> This verse refers to the fact that ALL dead people go to the Sheol, to the tomb, to the Sepulcre, to the pit. </p>
	${nowhere_knowledge}
	${dead_know_response_END}`;
	
	resp_bcit = `BIBREF_Gen_15_15 ${dead_know_response_INTRO}
	${response_sheol}`;

	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Gen_15_15");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Gen_25_8 ${dead_know_response_INTRO}
	${response_sheol}`;

	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Gen_25_8");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Gen_35_29 ${dead_know_response_INTRO}
	${response_sheol}`;

	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Gen_35_29");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	const response_spiritually_dead = `<p> This verse refers to <a class='exam_ref' href='${hb.href_death}'>spiritually dead people</a>, because they do NOT have <a class='exam_ref' href='${hb.href_life}'>The Life</a>, they have NOT been <a class='exam_ref' href='${hb.href_liberator}'>freed</a> from their <a class='exam_ref' href='${hb.href_death}'>spiritual death</a>. </p>`;
	
	resp_bcit = `BIBREF_1Pe_3_19 ${dead_know_response_INTRO}
	${response_spiritually_dead}
	<p> The most important thing to note in this verse and its context is that ALL people are DEAD without Jesus Christ who is LIFE itself. So the verse refers to people PHYSICALLY alive but spiritually dead. Any person that does not believe in Jesus Christ is a slave, a PRISONER of the Spirit that rules this world, that person is a "spirit in prison". Jesus's RESURRECTION good news set that person free. It is a new begining. And the times of Noah, which were a new begining, were a SIGN of the new begining in the times of Christ. That is what the passage is about. Maybe NOT in a bad translation but certanly in the ancient koine greek.</p>
	<p> The second thing to note is that NOWHERE, in the verse or its context, appears the greek word Hades, the greek word used in ancient greek manuscripts for the hebrew Sheol, the place where dead people go: the tomb, the Sepulcre, the pit. This passage is NOT talking about PHYSICALLY dead people. It is about spiritually dead people and they were ALL spiritually dead when Jesus died and resurrected. </p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "1Pe_3_19");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_2Co_5_8 ${dead_know_response_INTRO}
	${nowhere_knowledge}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers to be absent of this body that dies AND, when RESURRECTED in a new body that cannot die, be present with the Lord. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be PRESENT with Him is to be ALSO RESURRECTED.</p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "2Co_5_8");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Act_7_59 ${dead_know_response_INTRO}
	<p> This verse refers to the fact that when people die, as <br> 
	BIBREF_Ecc_12_7 <br> tells us, the spirit RETURNS to Elohim who gave it, so everything GOES BACK as it was BEFORE the person was physically born. </p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Act_7_59");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Luk_20_38 ${dead_know_response_INTRO}
	<p> This verse refers to the fact that dead people CAN be AWAKEN from their <a class='exam_ref' href='${hb.href_sleeping}'>SLEEP</a>, and that is why to the one who can WAKE them up they have always been ALIVE.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Luk_20_38");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	const response_paradise = `<p> This verse refers to the PARADISE, a physical PLACE where RESURRECTED people will live eternally with Jesus Christ, NOT to the Sheol, to the tomb, to the Sepulcre, to the pit. To be there dead people must be first AWAKEN from their <a class='exam_ref' href='${hb.href_sleeping}'>SLEEP</a>. </p>
	${nowhere_knowledge}
	`;
	
	resp_bcit = `BIBREF_2Co_12_4 ${dead_know_response_INTRO}
	${response_paradise}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "2Co_12_4");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Luk_23_43 ${dead_know_response_INTRO}
	${response_paradise}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Luk_23_43");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_1Ti_5_6 ${dead_know_response_INTRO}
	${response_spiritually_dead}
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "1Ti_5_6");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Luk_15_24 ${dead_know_response_INTRO}
	${response_spiritually_dead}
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Luk_15_24");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Jhn_4_24 ${dead_know_response_INTRO}
	<p> This verse refers to PHYSICALLY alive people to worship in spirit and in truth.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Jhn_4_24");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Heb_1_14 ${dead_know_response_INTRO}
	<p>This verse refers to angels as spirits. The bible refers to any physically living person as a spirit. These include <a class='exam_ref' href='${hb.href_angels}'>angels</a> and <a class='exam_ref' href='${hb.href_wings}'>creatures with wings</a>.</p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Heb_1_14");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Phl_1_23 ${dead_know_response_INTRO}
	${nowhere_knowledge}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers to depart, to physically die, and be with Christ when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be with Him is to be ALSO RESURRECTED.</p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Phl_1_23");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Psa_16_11 ${dead_know_response_INTRO}
	${nowhere_knowledge}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ knows that he is The Way and The Life and that he will get to be in His presence when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be in His presence is to be ALSO RESURRECTED.</p>
	${dead_know_response_END}
	`;	
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Psa_16_11");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_Isa_8_19 ${dead_know_response_INTRO}
	<p> The prohibition in the Old Testament for people to speak to the dead is to prevent them from speaking to Celestial Powers, commonly known in the New Testament as DEMONS, that will pretend to be the dead person to decieve the one trying to communicate with the dead.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Isa_8_19");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
	resp_bcit = `BIBREF_1Th_4_14 ${dead_know_response_INTRO}
	${dead_know_response_144000}
	${nowhere_knowledge}
	${dead_know_response_END}
	`;	
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "1Th_4_14");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	
	// -----------
	
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
	
	lg.o_finished_resu_qmodu = "Congrats. You finished this module";
	lg.o_module_writen_ok = "Module results saved ok in the cloud.";
	lg.o_you_need_to_login_to_participate = "To participate you need to login.";
	
}

