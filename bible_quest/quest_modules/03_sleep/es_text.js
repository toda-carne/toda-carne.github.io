
import { gvar, uppercase_words_in_string, make_bible_ref, get_resp_for, all_strongrefs, bib_defaults, } from '../../code/bq_tools.js';

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
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	lg.qmodu_title = `Los muertos no saben nada?`;
	
	lg.a_simple_YES = `SI`;
	lg.a_simple_NO = `NO`;	

	lg.a_is_TRUE = `VERDADERO`;
	lg.a_is_FALSE = `FALSO`;	

	const bf = `<span class='big_font'>`;
	const ef = `</span>`;

	const cl_until = `La biblia afirma que DESPUES de la muerte física y HASTA nuestra resurección <br>`;
	lg.q_sleep = `${cl_until}${bf}el espíritu esta DORMIDO y NO hay CONOCIMIENTO.${ef}`;

	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${hb.href_sleeping}'>Dormiditos</a>`;
	lg.q12_1__sleep = `Seleccione un BUEN versiculo que soporte que las personas que están físicamente muertas (antes de la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a>) TIENEN CONCIENCIA`;
	lg.q12_1__no_consciousness = "Según TodaCarne.com ninguno de estos es un buen versiculo";
	lg.q12_1__verse1_str = uppercase_words_in_string(rf.isa_14_10_str, ["voces,", "dirán:" ]);
	lg.q12_1__verse1_href = rf.isa_14_10_href;
	lg.q12_1__verse2_str = uppercase_words_in_string(rf.mat_17_3_str, ["hablando", "él.", ]);
	lg.q12_1__verse2_href = rf.mat_17_3_href;
	lg.q12_1__verse3_str = uppercase_words_in_string(rf.rev_6_10_str, ["clamaban", "alta", "voz", "diciendo:", ]);
	lg.q12_1__verse3_href = rf.rev_6_10_href;
	lg.q12_1__verse4_str = uppercase_words_in_string(rf.heb_12_23_str, ["alistados", "congregación", ]);
	lg.q12_1__verse4_href = rf.heb_12_23_href;
	lg.q12_1__verse5_str = uppercase_words_in_string(rf.luk_16_24_str, ["voces,", "dijo:", ]);
	lg.q12_1__verse5_href = rf.luk_16_24_href;

	const q12_1__response_INTRO = `<p> Este es un versículo que se cita con frecuencia como objeción a que el ESPIRITU de la persona muerta está <a class='exam_ref' href='${hb.href_sleeping}'>dormido</a>.</p>
	
	<p> Cuando se argumenta en contra del ESPIRITU (NO alma) <a class='exam_ref' href='${hb.href_sleeping}'>dormido</a> siempre hay que recordar que toda la Biblia se refiere a los muertos como a los que <a class='exam_ref' href='${hb.href_sleeping}'>DUERMEN</a>, especialmente a nuestro Señor Jesucristo. La razón es obvia: NINGUNA persona que <a class='exam_ref' href='${hb.href_sleeping}'>duerme</a> tiene CONCIENCIA. Esa es la característica más destacada de una persona que <a class='exam_ref' href='${hb.href_sleeping}'>duerme</a>. Por favor, lea la sección que presenta el concepto bíblico del ESPIRITU <a class='exam_ref' href='${hb.href_sleeping}'>dormido</a> del libro completamente GRATUITO <a class='exam_ref' href='${hb.href_home}'>TodaCarne.com</a>. </p>`;
	
	const q12_1__response_END = `<p> Así que este versículo <b>NO SE REFIERE</b> a que las personas que están físicamente muertas tengan CONCIENCIA.</p>`;

	
	lg.q12_1__response_to_verse1 = `<a class='exam_ref' target='_blank' href=${rf.isa_14_10_href}>Isa 14:10</a> ${q12_1__response_INTRO}
	<p> Este versículo se refiere a un tiempo futuro literal o espiritual que sucedió como reafirmación del caso literal. El rey de Babilonia representa a El Satán, por eso es que el <a class='exam_ref' href=${rf.isa_14_12_href}>versículo 12</a> es comúnmente citado para referirse a El Satán. </p>

	<p>Nótese que: </p>
	<li>El <a class='exam_ref' href=${rf.isa_14_8_href}>versículo 8</a> dice: Aun los cipreses y los cedros del Líbano se alegran a causa de ti, diciendo: "Desde que fuiste derribado, no ha subido talador contra nosotros". Así que para el caso espiritual es una metáfora y el caso literal aún no ha sucedido porque el <a class='exam_ref' href=${rf.isa_14_7_href}>versículo 7</a> NO ha sucedido literalmente: "Toda la tierra está en reposo, está tranquila. Prorrumpe en gritos de júbilo.".

	<li>El <a class='exam_ref' href=${rf.isa_14_9_txt_href}>versículo 9</a> muestra que el caso literal implica que los muertos han DESPERTADO (vocablo <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>) lo cual NO ha sucedido tampoco porque la resurrección de los muertos no ha sucedido.

	<li>El <a class='exam_ref' href=${rf.isa_14_18_txt_href}>versículo 18</a> nos dice que cada rey está en su propia CASA (vocablo <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). Para el caso literal han sido resucitados.
	${q12_1__response_END}`;
	
	lg.q12_1__response_to_verse2 = `<a class='exam_ref' href=${rf.mat_17_3_href}>Mat 17:3</a> ${q12_1__response_INTRO}
	<p> También es recomendable que hayas leído al menos la sección que introduce el concepto bíblico de la <a class='exam_ref' href='${hb.href_resurrection}'>Resurrección</a> y en particular el hecho de que <a class='exam_ref' href='${hb.href_not_yet_resu}'>No ha sucedido</a>.</p>

	<p> Lo más importante a destacar de este versículo es que ellos estaban físicamente presentes, todos tienen CUERPOS, y es por eso que Pedro, en el <a class='exam_ref' href=${rf.mat_17_4_href}>versículo 4</a>, ofrece construir tres tiendas. Dos tiendas para Moisés y Elías y una para Nuestro Señor. Estaban en la fiesta judía de Sucot. La fiesta de los Tabernáculos. Señal muy apropiada para mostrar que estos "tabernáculos" van a ser reemplazados por "casas" permanentes.</p>
	${q12_1__response_END}
	`;
	
	const q12_1__response_144000 = `<p>	Este versículo se refiere a los 144.000. Por favor, lea la sección <a class='exam_ref' href='${hb.href_144000}'>144.000</a>. Otra sección que podría ayudar es la que se llama <a class='exam_ref' href='${hb.href_eternal_abhorrence}'>Horror Eterno</a>.

	<p> Lo más importante que hay que notar sobre este versículo es que se refiere a las personas que han sido resucitadas. Los Santos. Los Grandes. Las primicias. Los primogénitos. Los que Dios trae con Jesucristo. Son unos POCOS: 144.000 descendientes genéticos masculinos de Israel cuando se complete el número. Todos ellos tienen CUERPOS, y es por eso que realmente pueden LLORAR, HABLAR, REUNIRSE y hacer ASAMBLEA.</p>`;
	
	
	lg.q12_1__response_to_verse3 = `<a class='exam_ref' href=${rf.rev_6_10_href}>Rev 6:10</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse4 = `<a class='exam_ref' href=${rf.heb_12_23_href}>Heb 12:23</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	lg.q12_1__response_to_verse5 = `<a class='exam_ref' href=${rf.luk_16_24_href}>Luk 16:24</a> ${q12_1__response_INTRO}
	<p>Este versículo es parte de la famosa PARÁBOLA de Lucas. Por favor, lea la sección llamada <a class='exam_ref' href='${hb.href_rich_and_laza}'>El rico y el pobre Lázaro</a>.</p>

	Lo más importante que hay que tener en cuenta sobre este versículo es que es parte de una PARÁBOLA. Por lo tanto, lea la <a class='exam_ref' href='${hb.href_rich_and_laza}'>INTERPRETACIÓN</a> correcta.</p>
	${q12_1__response_END}
	`;
		
	const q12_1__nowhere_consciousness = `<p> EN NINGUNA PARTE de este versículo y su contexto hay algo que se refiera remotamente a la CONCIENCIA de personas físicamente muertas. Es realmente notable cómo la cultura griega ha afectado las enseñanzas hebreas de las escrituras hebreas.</p>`;
	
	const q12_1__response_sheol = `<p> Este versículo se refiere al hecho de que TODOS los muertos van al Seol, a la tumba, al Sepulcro, al foso. </p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}`;
	
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
	
	const q12_1__response_spiritually_dead = `<p> Este versículo se refiere a personas espiritualmente muertas. Por favor, lea las secciones llamadas <a class='exam_ref' href='${hb.href_life}'>Vida</a>, <a class='exam_ref' href='${hb.href_death}'>Muerte</a>, and <a class='exam_ref' href='${hb.href_liberator}'>Libertador</a>.</p>`;
	
	rdat = get_resp_for("q12_1__", rf._1pe_3_19_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._1pe_3_19_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	<p> Lo más importante que hay que notar en este versículo y su contexto es que TODAS las personas están MUERTAS sin Jesucristo, quien es la VIDA misma. Así que el versículo se refiere a personas FÍSICAMENTE vivas pero espiritualmente muertas. Cualquier persona que no cree en Jesucristo es un esclavo, un PRISIONERO del Espíritu que gobierna este mundo, esa persona es un "espíritu en prisión". La buena noticia de la RESURRECCIÓN de Jesucristo es que liberó a esa persona. Es un nuevo comienzo. Y los tiempos de Noé, que fueron un nuevo comienzo, fueron una SEÑAL del nuevo comienzo en los tiempos de Jesucristo. De eso se trata el pasaje. Quizás NO en una mala traducción, pero ciertamente en el griego koiné antiguo.</p>

	<p> La segunda cosa que hay que notar es que EN NINGÚN LUGAR, en el versículo o en su contexto, aparece la palabra griega Hades, la palabra griega usada en los manuscritos griegos antiguos para el Seol hebreo, el lugar donde van los muertos: la tumba, el Sepulcro, el pozo. Este pasaje NO está hablando de personas FÍSICAMENTE muertas. Se trata de personas espiritualmente muertas y TODOS estaban espiritualmente muertos cuando Jesucristo murió y resucitó.</p>
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf._2co_5_8_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._2co_5_8_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere estar ausente de este cuerpo que muere y, cuando RESUCITE en un cuerpo nuevo que no puede morir, estar presente con el Señor. Él, después de todo, RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar PRESENTE con Él es estar TAMBIÉN RESUCITADO.</p>
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.act_7_59_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.act_7_59_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere al hecho de que cuando una persona muere, como dice <a class='exam_ref' href=${rf.ecc_12_7_href}>Ecc 12:7</a>, el espíritu VUELVE a Elohim, que lo dió, asi que todo vuelve a estar como estaba ANTES de que la persona naciera físicamente.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.luk_20_38_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.luk_20_38_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere al hecho de que la gente muerta PUEDE ser DESPERTADA cuando esta <a class='exam_ref' href='${hb.href_sleeping}'>DORMIDITA</a>, y que para el que las puede DESPERTAR siguen VIVAS.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	const q12_1__response_paradise = `<p> Este versiculo se refiere al PARAISO, un LUGAR físico donde los RESUCITADOS vivirán eternamente con Jesucristo, NO se refiere al Sheol, a la tumba, al Sepulcro, al foso.</p>
	${q12_1__nowhere_consciousness}
	`;
	
	rdat = get_resp_for("q12_1__", rf._2co_12_4_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._2co_12_4_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.luk_23_43_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.luk_23_43_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf._1ti_5_6_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._1ti_5_6_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.luk_15_24_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.luk_15_24_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.jhn_4_24_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.jhn_4_24_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere a personas FISICAMENTE vivas que adoran en Espíritu y en Verdad.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.heb_1_14_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p>Este versículo se refiere a los ángeles como espíritus. La Biblia se refiere a cualquier persona físicamente viva como espíritu. Por favor lea las secciones de <a class='exam_ref' href='${hb.href_angels}'>Angeles</a> y <a class='exam_ref' href='${hb.href_wings}'>Alados</a>.</p>
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.phl_1_23_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.phl_1_23_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere partir y estar con Cristo cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar con Él es estar RESUCITANDO TAMBIÉN.</p>
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.psa_16_11_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.psa_16_11_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, todo aquel que cree en la RESURRECCIÓN de Jesucristo sabe que Él es el Camino y la Vida y que podrá estar en Su presencia cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de ver su ROSTRO es estar TAMBIÉN RESUCITADO.</p>
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf.isa_8_19_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf.isa_8_19_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> La prohibición en el Antiguo Testamento de que las personas hablen con los muertos es para evitar que hablen con los Poderes Celestiales, comúnmente conocidos en el Nuevo Testamento como DEMONIOS, que se harán pasar por la persona muerta para engañar a quien intente comunicarse con el muerto.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rdat = get_resp_for("q12_1__", rf._1th_4_14_obj);
	cit_txt = rf[rdat.cit_kk + "_str"];
	lg[rdat.rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>${rdat.cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_144000}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;	
	
	lg.q13_1__sleep = `Seleccione todos los versiculos que soportan que las personas muertas NO tienen CONCIENCIA hasta la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a>.`;
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
	
	
}

