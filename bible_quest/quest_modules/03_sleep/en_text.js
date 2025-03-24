

import { gvar, uppercase_words_in_string, make_bible_ref, get_resp_for, all_strongrefs, bib_defaults, 
	get_bibcit_obs_stm_id, 
} from '../../code/bq_tools.js';

"use strict";

export function init_module_text(){
	init_en_poll_txt();
}

export function init_en_poll_txt(){
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

	lg.qmodu_title = `The dead know nothing?`;
	
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
	
	lg.q_eternal_life = `${cl_jesus}${bf}ETERNAL LIFE is to know the True God and His son Jesus Christ.${ef}`;

	brf.o_eternal_life_comm = true;
	lg.o_eternal_life_comm = `In the following verse teaches PRECISELY that <br> 
	${bf} BIBREF_Jhn_17_3 ${ef}
	`;

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

	lg.q_verse_for_knowledge_in_death = `Choose ONE verse that supports the claim that according to the bible <br>
	${bf} the NOT resurrected and physically dead people HAVE KNOWLEDGE${ef}
	`;
	
	const dead_know_response_INTRO = `<p> This is a commonly cited verse as objection to 
	"<a class='exam_ref' href='${hb.href_sleeping}'>the dead know NOTHING</a>".</p>`;
	
	const dead_know_response_END = `<p> So this verse <b>DOES NOT REFER</b> to the physically dead having KNOWLEDGE before resurrection. 
		Only ALIVE people, which requires having a physycal body, can have knowledge. </p>`;
	
	let resp_bcit = null;
	let stm_id = null;

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

	resp_bcit = `BIBREF_Mat_17_3 ${dead_know_response_INTRO}
	<p>It important to note that the general <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a> of the dead <a class='exam_ref' href='${hb.href_not_yet_resu}'>has not happend yet</a>. However tamporal resurrections happen in several places in the bible. So, the most important thing to note about this verse is that they were physically present, they all have BODIES, that is why they can TALK, and that is why Peter, in 
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
	
	const dead_know_response_144000 = `<p>This verse refers to the <a class='exam_ref' href='${hb.href_144000}'>144.000</a> saints of Revelation also mentioned in Daniel in the <a class='exam_ref' href='${hb.href_eternal_abhorrence}'>Eternal Abhorrence</a> (click on the links).</p>
	<p> The most important thing to note about this verse is that it refers to people that have been resurrected. The Saints. The Great ones. The first fruits. The firstborn. The ones God brings with Jesus Christ. They are a FEW: 144.000 male genetic descendants of Israel when completed. They all have BODIES, and that is why they can actually CRY, SPEAK, GATHER and ASSEMBLY.</p>`;
	
	
	resp_bcit = `BIBREF_Rev_6_10 ${dead_know_response_INTRO}
	${dead_know_response_144000}
	${dead_know_response_END}`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Rev_6_10");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Rev_6_10 = ["cried", "loud", "voice,", "saying,", ];
	
	resp_bcit = `BIBREF_Heb_12_23 ${dead_know_response_INTRO}
	${dead_know_response_144000}
	${dead_know_response_END}`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Heb_12_23");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Heb_12_23 = ["festal", "gathering", "assembly", ];
	

	resp_bcit = `BIBREF_Luk_16_24 ${dead_know_response_INTRO}
	<p>This verse is part of the famous PARABLE in Luke 16 about <a class='exam_ref' href='${hb.href_rich_and_laza}'>The rich and the poor Lazarus.</a>. Click the link to understand the meaning of the parable.</p>
	${dead_know_response_END}
	`;
		
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Luk_16_24");
	lg[stm_id] = resp_bcit;
	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Luk_16_24 = ["cried", "said,", ];
	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${hb.href_sleeping}'>Sleep</a>`;
	lg.q12_1__sleep = `Select a GOOD verse that supports that physically dead people DO HAVE CONSCIOUSNESS before <a class='exam_ref' href='${hb.href_resurrection}'>resurrection</a>.`;
	lg.q12_1__no_consciousness = "According to TodaCarne.com none of these is a good verse";
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

	const q12_1__response_INTRO = `<p> This is a commonly cited verse as objection to SPIRIT <a class='exam_ref' href='${hb.href_sleeping}'>sleep</a>.</p>
	<p> When arguing against SPIRIT (NOT soul) <a class='exam_ref' href='${hb.href_sleeping}'>sleep</a> always remember that the whole bible refers to the dead as <a class='exam_ref' href='${hb.href_sleeping}'>SLEEP</a>, specially our Lord Jesus Christ. The reason is obvious: NO <a class='exam_ref' href='${hb.href_sleeping}'>sleeping</a> person has CONSCIOUSNESS. That is the most prominent characteristic of a <a class='exam_ref' href='${hb.href_sleeping}'>sleeping</a> person. Please read the section introducing the biblical concept of SPIRIT <a class='exam_ref' href='${hb.href_sleeping}'>sleep</a> of the completely FREE book <a class='exam_ref' href='${hb.href_home}'>TodaCarne.com</a>. </p>`;
		
	lg.q12_1__response_to_verse1 = `<a class='exam_ref' target='_blank' href=${rf.isa_14_10_href}>Isa 14:10</a> ${q12_1__response_INTRO}
	<p> This verse refers to a literal future time or an spiritual one that happend as reafirmation of the literal case. The king of Babilon represents The Satan, that is why <a class='exam_ref' href=${rf.isa_14_12_href}>verse 12</a> is commonly cited to refer to The Satan. </p>
	<p>Note that:</p> 
	<li> <a class='exam_ref' href=${rf.isa_14_8_href}>Verse 8</a> says: Yes, the cypress trees rejoice with you, with the cedars of Lebanon, saying, "Since you are humbled, no lumberjack has come up against us". So for the spiritual case it is a metaphor and the literal case has not nappened yet because <a class='exam_ref' href=${rf.isa_14_7_href}>verse 7</a> has NOT happened literally: "The whole earth is at rest, and is quiet". 
	<li> <a class='exam_ref' href=${rf.isa_14_9_txt_href}>Verse 9</a> shows that the literal case implies that the dead have AWAKEN (word <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>) which has NOT happend either because the resurrection of the dead has not happend. 
	<li> <a class='exam_ref' href=${rf.isa_14_18_txt_href}>Verse 18</a> tell us that each king is in his own HOUSE (word <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). For the literal case they have been resurrected. 
	${dead_know_response_END}`;
	
	
	lg.q12_1__response_to_verse2 = `<a class='exam_ref' href=${rf.mat_17_3_href}>Mat 17:3</a> ${q12_1__response_INTRO}
	<p>It is also recommended that you have at least read the section introducing the biblical concept of <a class='exam_ref' href='${hb.href_resurrection}'>Resurrection</a> and in particular the fact that <a class='exam_ref' href='${hb.href_not_yet_resu}'>It has not happend</a>.</p>
	<p> The most important thing to note about this verse is that they were physically present, they all have BODIES, and that is why Peter, in <a class='exam_ref' href=${rf.mat_17_4_href}>verse 4</a>, offers to build three tents. Two tents for Moses and Elijah and one for Our Lord. They are physically ALIVE. They where in the Jewish festival of Sukkot. The feast of Tabernacles. Very appropiate signal to show that these "tabernacles" are going to be replaced by permanent "houses". </p>
	${dead_know_response_END}
	`;
	
	const q12_1__response_144000 = `<p>This verse refers to the 144.000. Please read the section <a class='exam_ref' href='${hb.href_144000}'>144.000</a>.	Another section that could help is the one called <a class='exam_ref' href='${hb.href_eternal_abhorrence}'>Eternal Abhorrence</a>.</p>
	<p> The most important thing to note about this verse is that it refers to people that have been resurrected. The Saints. The Great ones. The first fruits. The firstborn. The ones God brings with Jesus Christ. They are a FEW: 144.000 male genetic descendants of Israel when completed. They all have BODIES, and that is why they can actually CRY, SPEAK, GATHER and ASSEMBLY.</p>`;
	
	
	lg.q12_1__response_to_verse3 = `<a class='exam_ref' href=${rf.rev_6_10_href}>Rev 6:10</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${dead_know_response_END}`;
	
	
	lg.q12_1__response_to_verse4 = `<a class='exam_ref' href=${rf.heb_12_23_href}>Heb 12:23</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${dead_know_response_END}`;
	
	
	lg.q12_1__response_to_verse5 = `<a class='exam_ref' href=${rf.luk_16_24_href}>Luk 16:24</a> ${q12_1__response_INTRO}
	<p>This verse is part of the famous PARABLE in Luke. Please read the section called <a class='exam_ref' href='${hb.href_rich_and_laza}'>The rich and the poor Lazarus.</a>.</p>
	<p> The most important thing to note about this verse is that it part of a PARABLE. So please read the correct <a class='exam_ref' href='${hb.href_rich_and_laza}'>INTERPRETATION</a>.</p>
	${dead_know_response_END}
	`;
		
	const q12_1__nowhere_consciousness = `<p> NOWHERE in this verse and its context is there any thing that remotely refers to CONSCIOUSNESS of physically dead people. It is really remarkable how the greek culture has affected the hebrew teachings of the hebrew scriptures.</p>`;
	
	const q12_1__response_sheol = `<p> This verse refers to the fact that ALL dead people go to the Sheol, to the tomb, to the Sepulcre, to the pit. </p>
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}`;
	
	rdat = get_resp_for("q12_1__", rf.gen_15_15_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.gen_15_15_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	rdat = get_resp_for("q12_1__", rf.gen_25_8_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.gen_25_8_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	rdat = get_resp_for("q12_1__", rf.gen_35_29_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.gen_35_29_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	const q12_1__response_spiritually_dead = `<p> This verse refers to spiritually dead people. Please read the sections called <a class='exam_ref' href='${hb.href_life}'>Life</a>, <a class='exam_ref' href='${hb.href_death}'>Death</a>, and <a class='exam_ref' href='${hb.href_liberator}'>Liberator</a>.</p>`;
	
	rdat = get_resp_for("q12_1__", rf._1pe_3_19_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._1pe_3_19_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	<p> The most important thing to note in this verse and its context is that ALL people are DEAD without Jesus Christ who is LIFE itself. So the verse refers to people PHYSICALLY alive but spiritually dead. Any person that does not believe in Jesus Christ is a slave, a PRISONER of the Spirit that rules this world, that person is a "spirit in prison". Jesus's RESURRECTION good news set that person free. It is a new begining. And the times of Noah, which were a new begining, were a SIGN of the new begining in the times of Christ. That is what the passage is about. Maybe NOT in a bad translation but certanly in the ancient koine greek.</p>
	<p> The second thing to note is that NOWHERE, in the verse or its context, appears the greek word Hades, the greek word used in ancient greek manuscripts for the hebrew Sheol, the place where dead people go: the tomb, the Sepulcre, the pit. This passage is NOT talking about PHYSICALLY dead people. It is about spiritually dead people and they were ALL spiritually dead when Jesus died and resurrected. </p>
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf._2co_5_8_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._2co_5_8_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers to be absent of this body that dies AND, when RESURRECTED in a new body that cannot die, be present with the Lord. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be PRESENT with Him is to be ALSO RESURRECTED.</p>
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.act_7_59_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.act_7_59_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> This verse refers to the fact that when people die, as <a class='exam_ref' href=${rf.ecc_12_7_href}>Ecc 12:7</a> tells us, the spirit RETURNS to Elohim who gave it, so everything goes back as it was BEFORE the person was physically born. </p>
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.luk_20_38_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.luk_20_38_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> This verse refers to the fact that dead people CAN be AWAKEN from their <a class='exam_ref' href='${hb.href_sleeping}'>SLEEP</a>, and that is why to the one who can WAKE them up they are still ALIVE.</p>
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
	`;
	
	const q12_1__response_paradise = `<p> This verse refers to the PARADISE, a physical PLACE where RESURRECTED people will live eternally with Jesus Christ, NOT to the Sheol, to the tomb, to the Sepulcre, to the pit.</p>
	${q12_1__nowhere_consciousness}
	`;
	
	rdat = get_resp_for("q12_1__", rf._2co_12_4_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._2co_12_4_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.luk_23_43_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.luk_23_43_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf._1ti_5_6_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._1ti_5_6_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.luk_15_24_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.luk_15_24_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.jhn_4_24_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.jhn_4_24_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> This verse refers to PHYSICALLY alive people to worship in spirit and in truth.</p>
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.heb_1_14_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p>This verse refers to angels as spirits. The bible refers to any physically living person as a spirit. Please read the sections <a class='exam_ref' href='${hb.href_angels}'>Angels</a> and <a class='exam_ref' href='${hb.href_wings}'>Wings</a>.</p>
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.phl_1_23_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.phl_1_23_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ prefers depart and be with Christ when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be with Him is to be ALSO RESURRECTED.</p>
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.psa_16_11_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.psa_16_11_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Ofcourse any believer in the RESURRECTION of Jesus Christ knows that he is The Way and The Life and that he will get to be in His presence when RESURRECTED in a new body that cannot die. He is, after all, RESURRECTED in BODY and SPIRIT. So the ONLY way to be in His presence is to be ALSO RESURRECTED.</p>
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.isa_8_19_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.isa_8_19_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> The prohibition in the Old Testament for people to speak to the dead is to prevent them from speaking to Celestial Powers, commonly known in the New Testament as DEMONS, that will pretend to be the dead person to decieve the one trying to communicate with the dead.</p>
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf._1th_4_14_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_144000}
	${q12_1__nowhere_consciousness}
	${dead_know_response_END}
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
	
	
}

