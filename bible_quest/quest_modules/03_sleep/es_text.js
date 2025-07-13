
import { gvar, uppercase_words_in_string, make_bible_ref, get_resp_for, all_strongrefs, bib_defaults, fill_response, fill_responses_for, 
	get_bibcit_obs_stm_id, 
} from '../../code/bq_tools.js';

import { init_en_poll_txt, } from './en_text.js';

"use strict";

export function init_module_text(){
	init_es_poll_txt();
}

export function init_es_poll_txt(){
	init_en_poll_txt();
	
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
	
	lg.qmodu_title = gvar.qmodule_title;
	
	lg.a_simple_YES = `SI`;
	lg.a_simple_NO = `NO`;	

	lg.a_is_TRUE = `VERDADERO`;
	lg.a_is_FALSE = `FALSO`;	

	const bf = `<span class='big_font'>`;
	const ef = `</span>`;

	const cl_bible = `La biblia afirma que <br>`;
	const cl_jesus = `De acuerdo a la biblia, Jesucristo afirma que <br>`;
	const cl_until = `La biblia afirma que DESPUES de la muerte física y HASTA nuestra resurrección <br>`;
	const the_gospel = `${bf}Negar esto es negar la Buenas Noticias, el Evangelio.${ef}`;
	
	lg.q_sleep = `${cl_until}${bf}el espíritu esta DORMIDO y NO hay CONOCIMIENTO.${ef}`;

	lg.q_jesus_died = `${cl_bible}${bf}Jesucristo murió en la cruz.${ef}`;
	
	brf.o_jesus_died_comm = true;
	lg.o_jesus_died_comm = `Los siguientes versículos son solo algunos de los versículos que afirman que <br> 
	${bf}Jesucristo murió en la cruz.${ef} <br> 
	<li> BIBREF_Luk_23_46 
	<li> BIBREF_Rom_5_8 
	<li> BIBREF_1Co_15_3 
	<br>	
	${the_gospel}
	`;
	lg.o_jesus_died_nm = `Jesus Murió`;

	lg.q_jesus_eternal = `${cl_bible}${bf}Su VIDA ETERNA fue interrumpida por tres noches y tres dias.${ef}`;

	brf.o_jesus_eternal_comm = true;
	lg.o_jesus_eternal_comm = `Los siguientes versículos son solo algunos de los versículos que afirman que <br> 
	${bf}La VIDA ETERNA de Jesucristo fue interrumpida por tres noches y tres dias.${ef} <br> 
	<li> BIBREF_Mat_12_40 
	<li> BIBREF_1Co_15_4 
	<li> BIBREF_Act_10_40 
	<br>
	${the_gospel}
	`;
	lg.o_jesus_eternal_nm = `Vida de Jesus interrumpida`;
	
	lg.q_eternal_life = `${cl_jesus}${bf}La VIDA ETERNA es conocer al Dios Verdadero y su Hijo Jesucristo.${ef}`;

	brf.o_eternal_life_comm = true;
	lg.o_eternal_life_comm = `El siguiente versiculo enseña PRECISAMENTE eso <br> 
	${bf} BIBREF_Jhn_17_3 ${ef}
	`;
	lg.o_eternal_life_nm = `Definición de Vida Eterna`;

	lg.q_no_knowledge_in_death = `Podemos concluir que de acuerdo a la biblia <br> 
	${bf}El CONOCIMIENTO de Jesucristo de Dios y de si mismo${ef} <br> 
	fue interrumpido por tres noches y tres dias.
	`;

	brf.o_no_knowledge_comm = true;
	lg.o_no_knowledge_comm = `Parece que a usted le gusta negar lo evidente. El argumento es muy simple, sin embargo muy fuerte: <br> 
	${lg.q_jesus_died} <br> 
	${lg.q_jesus_eternal} <br> 
	${lg.q_eternal_life} <br> 
	${lg.q_no_knowledge_in_death} <br> 
	${the_gospel}
	`;
	lg.o_no_knowledge_nm = `No hay conocimiento`;

	lg.q_verse_for_knowledge_in_death = `Seleccione UN versiculo que apoye la afirmación de que: según la biblia <br>
	${bf} los muertos físicos que NO han resucitado TIENEN CONOCIMIENTO.${ef}
	`;
	
	const dead_know_response_INTRO = `<p> Este es un versiculo comunmente citado para objetar que
	"<a class='exam_ref' href='${hb.href_sleeping}'>los muertos no conocen NADA</a>". Haga click en el link para mas información.</p>`;
	
	const dead_know_response_END = `<p> Así que este versiculo <b>NO SE REFIERE</b> a que las personas físicamente muertas tengan CONOCIMIENTO antes de su resurrección. Solamente las personas VIVAS, lo cual implica que tienen un cuerpo físico, pueden tener CONOCIMIENTO. </p>`;
	
	const dead_know_response_UNKNOWN_VERSE = `BIBREF_CHOSEN <p> Este versículo no parece decir nada acerca de que las personas físicamente muertas tengan CONOCIMIENTO antes de su resurrección. Si usted está seguro que se puede usar para argumentar a favor, por favor escriba un correo a debate@SiBiblia.com explicando el caso. </p>`;

	let resp_bcit = null;
	let stm_id = null;
	let bref = gvar.bibref_prefix;
	let bcita = null;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", gvar.UNKNOWN_VERSE);
	lg[stm_id] = dead_know_response_UNKNOWN_VERSE;
	brf[stm_id] = true;

	// -----------
	
	resp_bcit = `BIBREF_Isa_14_10 ${dead_know_response_INTRO}
	<p> Así como la Pascua era un tipo para el Mesías. Este pasaje es un tipo para un tiempo futuro. El rey de Babilonia representa a El Satan, es por eso que <p> BIBREF_Isa_14_12 <p> se cita comunmente para referirse a El Satan. </p>
	<p>Observe que:</p> 
	<p><li> BIBREF_Isa_14_8 <p> No ha sucedido porque BIBREF_Isa_14_7 <br> NO ha sucedido. Todavía no hay paz en la tierra.
	<p><li> BIBREF_Isa_14_9 <p> muestra que los muertos se han LEVANTADO, de hecho DESPERTADO (vocablo <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>), lo cual NO ha sucedido porque la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos, puesto que estan hablando del Sheol, <a class='exam_ref' href='${hb.href_not_yet_resu}'>no ha sucedido</a>. 
	<p><li> BIBREF_Isa_14_18 <p> nos dice que cada rey esta en su CASA (vocablo <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). lo que significa que estan RESUCITADOS. 
	${dead_know_response_END}`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", "Isa_14_10");
	lg[stm_id] = resp_bcit;
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Isa_14_7 = ["descansa", "aquieta.", ];
	brfup[stm_id].Isa_14_10 = ["responderán", "preguntarán:", "te", ];
	brfup[stm_id].Isa_14_9 = ["levantado", ];
	brfup[stm_id].Isa_14_18 = ["casa.", ];

	// -----------
	
	bcita = "Mat_17_3";	
	resp_bcit = `${bref}${bcita} ${dead_know_response_INTRO}
	<p> Es importante notar que la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> general <a class='exam_ref' href='${hb.href_not_yet_resu}'>no ha sucedido</a>. Sin embargo resurrecciones temporales ocurren en varios pasajes biblicos. Así, lo más importante a destacar de este versículo es que ellos estaban físicamente presentes, todos tienen CUERPOS, y es por eso que Pedro, en 
	<p> ${bref}Mat_17_4 
	<p> ofrece construir tres tiendas. Dos tiendas para Moisés y Elías y una para Nuestro Señor. Estaban en la fiesta judía de Sucot. La fiesta de los Tabernáculos. Señal muy apropiada para mostrar que estos "tabernáculos" van a ser reemplazados por "casas" permanentes.</p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", bcita);
	lg[stm_id] = resp_bcit;	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id].Mat_17_3 = ["hablando", "él.", ];
	brfup[stm_id].Mat_17_4 = ["hagamos", "tres", "tiendas:", ];

	// -----------

	const response_144000 = `<p> Este versículo se refiere a los <a class='exam_ref' href='${hb.href_144000}'>144.000</a> Santos del libro de la Revelación también mencionados en Daniel en el <a class='exam_ref' href='${hb.href_eternal_abhorrence}'>Horror Eterno</a>.</p>
	<p> Lo más importante que hay que notar sobre este versículo es que se refiere a las personas que han sido resucitadas. Los Santos. Los Grandes. Las primicias. Los primogénitos. Los que Dios trae con Jesucristo. Son unos POCOS: 144.000 descendientes genéticos masculinos de Israel cuando se complete el número. Todos ellos tienen CUERPOS, y es por eso que realmente pueden LLORAR, HABLAR, REUNIRSE y hacer ASAMBLEA.</p>`;	
	
	bcita = "Rev_6_10";	
	resp_bcit = `${bref}${bcita} ${dead_know_response_INTRO}
	${response_144000}
	${dead_know_response_END}`;
		
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", bcita);
	lg[stm_id] = resp_bcit;	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id][bcita] = ["clamaban", "gran", "voz,", "diciendo:", ];

	// -----------
	
	bcita = "Heb_12_23";	
	resp_bcit = `${bref}${bcita} ${dead_know_response_INTRO}
	${response_144000}
	${dead_know_response_END}`;
		
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", bcita);
	lg[stm_id] = resp_bcit;	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id][bcita] = ["festiva", "reunión", "asamblea", ];

	// -----------
	
	bcita = "Luk_16_24";
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p>Este versículo es parte de la famosa PARÁBOLA de Lucas 16 llamada <a class='exam_ref' href='${hb.href_rich_and_laza}'>El rico y el pobre Lázaro</a>.</p>
	${dead_know_response_END}
	`;
	
	stm_id = get_bibcit_obs_stm_id("q_verse_for_knowledge_in_death__", bcita);
	lg[stm_id] = resp_bcit;	
	brf[stm_id] = true;
	brfup[stm_id] = {};
	brfup[stm_id][bcita] = ["llorando", "dijo:", ];

	fill_response("q_verse_for_knowledge_in_death__", "Luk_16_19_31", resp_bcit, brfup[stm_id]);
	
	// -----------
	
	const nowhere_knowledge = `<p> EN NINGUNA PARTE de este versículo y su contexto hay algo que se refiera remotamente a que las personas físicamente muertas tengan CONOCIMIENTO antes de su resurrección. Es realmente notable cómo la cultura griega ha afectado las enseñanzas hebreas de las escrituras hebreas.</p>`;
	
	const response_sheol = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p> Este versículo se refiere al hecho de que TODOS los muertos van al Seol, a la tumba, al Sepulcro, al foso. </p>
	${nowhere_knowledge}
	${dead_know_response_END}`;
	
	fill_responses_for("q_verse_for_knowledge_in_death__", ["Gen_15_15", "Gen_25_8", "Gen_35_29", ], response_sheol);
	
	// -----------
		
	const response_spiritually_dead = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p> Este versículo se refiere a personas <a class='exam_ref' href='${hb.href_death}'>espiritualmente muertas</a>, porque NO tienen <a class='exam_ref' href='${hb.href_life}'>La Vida</a>, no han sido <a class='exam_ref' href='${hb.href_liberator}'>liberadas</a> de su <a class='exam_ref' href='${hb.href_death}'>muerte espiritual</a>.</p>`;
	
	resp_bcit = `${response_spiritually_dead}
	<p> Lo más importante que hay que notar en este versículo y su contexto es que TODAS las personas están MUERTAS sin Jesucristo, quien es la VIDA misma. Así que el versículo se refiere a personas FÍSICAMENTE vivas pero espiritualmente muertas. Cualquier persona que no cree en Jesucristo es un esclavo, un PRISIONERO del Espíritu que gobierna este mundo, esa persona es un "espíritu en prisión". La buena noticia de la RESURRECCIÓN de Jesucristo es que liberó a esa persona. Es un nuevo comienzo. Y los tiempos de Noé, que fueron un nuevo comienzo, fueron una SEÑAL del nuevo comienzo en los tiempos de Jesucristo. De eso se trata el pasaje. Quizás NO en una mala traducción, pero ciertamente en el griego koiné antiguo.</p>

	<p> La segunda cosa que hay que notar es que EN NINGÚN LUGAR, en el versículo o en su contexto, aparece la palabra griega Hades, la palabra griega usada en los manuscritos griegos antiguos para el Seol hebreo, el lugar donde van los muertos: la tumba, el Sepulcro, el pozo. Este pasaje NO está hablando de personas FÍSICAMENTE muertas. Se trata de personas espiritualmente muertas y TODOS estaban espiritualmente muertos cuando Jesucristo murió y resucitó.</p>
	${dead_know_response_END}
	`;

	fill_response("q_verse_for_knowledge_in_death__", "1Pe_3_19", resp_bcit);
	
	// -----------
		
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${nowhere_knowledge}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere estar ausente de este cuerpo que muere y, cuando RESUCITE en un cuerpo nuevo que no puede morir, estar presente con el Señor. Él, después de todo, RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar PRESENTE con Él es estar TAMBIÉN RESUCITADO.</p>
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "2Co_5_8", resp_bcit);
	
	// -----------
		
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p> Este versiculo se refiere al hecho de que cuando una persona muere, como <br> 
	 BIBREF_Ecc_12_7 <br> nos dice: el espíritu VUELVE a Elohim, que lo dió, asi que todo vuelve a estar como estaba ANTES de que la persona naciera físicamente.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Act_7_59", resp_bcit);
	
	// -----------
		
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p> Este versiculo se refiere al hecho de que la gente muerta PUEDE ser DESPERTADA cuando esta <a class='exam_ref' href='${hb.href_sleeping}'>DORMIDITA</a>, y que para el que las puede DESPERTAR siempre han estado VIVAS.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Luk_20_38", resp_bcit);
	
	// -----------
			
	const response_paradise = `<p> Este versiculo se refiere al PARAISO, un LUGAR físico donde los RESUCITADOS vivirán eternamente con Jesucristo, NO se refiere al Sheol, a la tumba, al Sepulcro, al foso.</p>
	${nowhere_knowledge}
	`;
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${response_paradise}
	${dead_know_response_END}
	`;	
	fill_response("q_verse_for_knowledge_in_death__", "2Co_12_4", resp_bcit);
	
	// -----------
			
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${response_paradise}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Luk_23_43", resp_bcit);
	
	// -----------
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${response_spiritually_dead}
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "1Ti_5_6", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${response_spiritually_dead}
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Luk_15_24", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p> Este versiculo se refiere a personas FISICAMENTE vivas que adoran en Espíritu y en Verdad.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Jhn_4_24", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p>Este versículo se refiere a los ángeles como espíritus. La Biblia se refiere a cualquier persona físicamente viva como espíritu. Esto incluye a los <a class='exam_ref' href='${hb.href_angels}'>ángeles</a> y las <a class='exam_ref' href='${hb.href_wings}'>criaturas aladas</a>.</p>
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Heb_1_14", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${nowhere_knowledge}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere partir y estar con Cristo cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar con Él es estar RESUCITANDO TAMBIÉN.</p>
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Phl_1_23", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${nowhere_knowledge}
	<p>Por supuesto, todo aquel que cree en la RESURRECCIÓN de Jesucristo sabe que Él es el Camino y la Vida y que podrá estar en Su presencia cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de ver su ROSTRO es estar TAMBIÉN RESUCITADO.</p>
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Psa_16_11", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	<p> La prohibición en el Antiguo Testamento de que las personas hablen con los muertos es para evitar que hablen con los Poderes Celestiales, comúnmente conocidos en el Nuevo Testamento como DEMONIOS, que se harán pasar por la persona muerta para engañar a quien intente comunicarse con el muerto.</p>
	${nowhere_knowledge}
	${dead_know_response_END}
	`;
	fill_response("q_verse_for_knowledge_in_death__", "Isa_8_19", resp_bcit);
	
	// -----------	
	
	resp_bcit = `BIBREF_CHOSEN ${dead_know_response_INTRO}
	${response_144000}
	${nowhere_knowledge}
	${dead_know_response_END}
	`;	
	fill_response("q_verse_for_knowledge_in_death__", "1Th_4_14", resp_bcit);
	
	// -----------	
	
	lg.q13_1__sleep = `Seleccione todos los versículos que soportan que las personas muertas NO tienen CONCIENCIA hasta la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a>.`;
	lg.q13_1__verse1_str = uppercase_words_in_string(rf.jhn_11_11_str, ["duerme;", "despertarle", ]);
	lg.q13_1__verse1_href = rf.jhn_11_11_href;
	lg.q13_1__verse1_should = "Lazaro DUERME hasta que es DESPERTADO";
	lg.q13_1__verse2_str = `En 1 Corintios 11:30 las PERSONAS (no los cuerpos) estan durmiendo (SIGUEN durmiendo) segun la conjugación del griego: κοιμῶνται`;
	const obj_1co_11_30 = { book: "1_corinthians", chapter: 11, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", };
	lg.q13_1__verse2_href = make_bible_ref(obj_1co_11_30);
	lg.q13_1__verse2_should = "Esas personas estan DURMIENDO según la conjugación del griego";
	lg.q13_1__verse3_str = uppercase_words_in_string(rf.ecc_9_10_str, ["no", "obra,", "ni", "trabajo,", "ciencia,", "sabiduría.", "Seol,", ]);
	lg.q13_1__verse3_href = rf.ecc_9_10_href;
	lg.q13_1__verse3_should = "OBRA, TRABAJO, CIENCIA, SABIDURIA. Estas palabras se refieren específicamente a acciones de CONCIENCIA, una propiedad de las PERSONAS vivas, no sólo de cuerpos convertidos en polvo.";
	lg.q13_1__verse4_str = uppercase_words_in_string(rf.ecc_12_7_str, ["polvo", "torne", "vuelva", "espíritu", ]);
	lg.q13_1__verse4_href = rf.ecc_12_7_href;
	lg.q13_1__verse4_should = "Despues de morir las cosas REGRESAN a como eran antes de nacer. Usted NO tenia CONCIENCIA antes de nacer.";
	lg.q13_1__verse5_str = uppercase_words_in_string(rf.job_7_21_str, ["no", 'seré.', ]);
	lg.q13_1__verse5_href = rf.job_7_21_href;
	lg.q13_1__verse5_should = "Cuando una persona muere ya NO SERA";
	lg.q13_1__verse6_str = uppercase_words_in_string(rf.job_14_12_str, ["Hasta", "no", "despertarán,", "Ni", "levantarán", "sueño.", ]);
	lg.q13_1__verse6_href = rf.job_14_12_href;
	lg.q13_1__verse6_should = "Los muertos NO se LEVANTARAN ni se DESPERTARAN de su SUEÑO HASTA que no haya cielos";
	lg.q13_1__verse7_str = uppercase_words_in_string(rf.psa_115_17_str, ["muertos", "No", "alabarán", ]);
	lg.q13_1__verse7_href = rf.psa_115_17_href;
	lg.q13_1__verse7_should = "Los MUERTOS (NO solo los cuerpos) NO ALABAN";	
	lg.q13_1__verse8_str = uppercase_words_in_string(rf.jhn_5_28_str, ["están", "en", "sepulcros"]);
	lg.q13_1__verse8_href = rf.jhn_5_28_href;
	lg.q13_1__verse8_should = "Los que van a resucitar ESTAN EN SEPULCROS, el Sheol hebreo, el mal traducido al griego Hades, NO en el cielo o en el infierno.";
	
	lg.o_finished_resu_qmodu = "Felicitaciones. Terminaste este modulo";
	lg.o_module_writen_ok = "Modulo guardado en la nube correctamente.";
	lg.o_you_need_to_login_to_participate = "Para participar necesitas hacer login.";
	
}

