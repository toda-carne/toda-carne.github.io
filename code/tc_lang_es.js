
import { init_get_msg, init_all_glb, fill_reversed_object, init_en_module, get_dispute_msg, bib_defaults, uppercase_words_in_string, 
	all_strongrefs, get_verse_reponse_name, make_bible_ref, fill_bibrefs_href, fill_all_strongrefs_href, get_verse_cit_key } from '../code/tc_lang_all.js';

"use strict";

const book2num_es = {};
const all_es_msg = {};

const bibles_es = {
	biblegateway: [ "RVA", "RVR1960", "DHH", "NTV", "WLC", "HHH", "WHNU", "TR1550", ],
	biblehub: [ "text", "sepd", "wlco", ],
	bibliaparalela: [ "rvg", "rv", "nblh", ],
	blueletterbible: [ "RVR09", "RVR60", "EM", "VUL", "NASB95", "VUL", "WLC", "LXX", "MGNT", "TR", ],
};

const DEFAULT_BOOK_NAME = "LIBRO";

const num2book_es = {
	"-1":DEFAULT_BOOK_NAME,
	"1":"génesis",
	"2":"éxodo",
	"3":"levítico",
	"4":"números",
	"5":"deuteronomio",
	"6":"josué",
	"7":"jueces",
	"8":"rut",
	"9":"1_samuel",
	"10":"2_samuel",
	"11":"1_reyes",
	"12":"2_reyes",
	"13":"1_crónicas",
	"14":"2_crónicas",
	"15":"esdras",
	"16":"nehemías",
	"17":"ester",
	"18":"job",
	"19":"salmos",
	"20":"proverbios",
	"21":"eclesiastés",
	"22":"cantares",
	"23":"isaías",
	"24":"jeremías",
	"25":"lamentaciones",
	"26":"ezequiel",
	"27":"daniel",
	"28":"oseas",
	"29":"joel",
	"30":"amós",
	"31":"abdías",
	"32":"jonás",
	"33":"miqueas",
	"34":"nahúm",
	"35":"habacuc",
	"36":"sofonías",
	"37":"hageo",
	"38":"zacarías",
	"39":"malaquías",
	"40":"mateo",
	"41":"marcos",
	"42":"lucas",
	"43":"juan",
	"44":"hechos",
	"45":"romanos",
	"46":"1_corintios",
	"47":"2_corintios",
	"48":"gálatas",
	"49":"efesios",
	"50":"filipenses",
	"51":"colosenses",
	"52":"1_tesalonicenses",
	"53":"2_tesalonicenses",
	"54":"1_timoteo",
	"55":"2_timoteo",
	"56":"tito",
	"57":"filemón",
	"58":"hebreos",
	"59":"santiago",
	"60":"1_pedro",
	"61":"2_pedro",
	"62":"1_juan",
	"63":"2_juan",
	"64":"3_juan",
	"65":"judas",
	"66":"apocalipsis",
};

/*
function set_glb_lang(){
	glb_exam_language = "es";
	glb_all_books = num2book_es;
	glb_all_bibles = bibles_es;
	glb_books_nums = book2num_es;
	glb_curr_lang = all_es_msg;
	glb_all_bibrefs = all_es_bibrefs;
}*/

function init_es_basic_msg(){
	const obj = all_es_msg;
	obj.msg_ok = "ACEPTAR";
	obj.msg_del = "BORRAR";
	obj.msg_range = "RANGO";
	obj.msg_any = "CUALQUIERA";
	obj.msg_invert_ans = "INVERTIR RESPUESTA";
	obj.msg_end_ans = "TERMINAR RESPUESTA";
	obj.msg_edit_ans = "CAMBIAR RESPUESTA";
	
	obj.msg_sel_cit = "ESCOGER DE BD";
	obj.msg_add_verse = "AGREGAR VERSICULO";
	obj.msg_add_strong = "AGREGAR CODIGO STRONG";
	obj.msg_add_link = "AGREGAR ENLACE WEB";
	obj.msg_end_edit = "TERMINAR EDICION";
	
	obj.msg_def_book = DEFAULT_BOOK_NAME;
	obj.msg_def_strong = "CODIGO STRONG";
	obj.msg_def_link_name = "ENLACE WEB";
	
	obj.msg_save_in_browser = "EN NAVEGADOR";
	obj.msg_save_in_cloud = "EN TodaCarne.com";
	
	obj.msg_open_from_browser = "DEL NAVEGADOR";
	obj.msg_open_from_cloud = "DE TodaCarne.com";
	
	obj.msg_new_answers_name = "NUEVO";

	obj.msg_todacarne_answers_name = "EN TodaCarne.com";
	obj.msg_todacarne_answers_writing = "Guardando...";
	obj.msg_todacarne_answers_reading = "Abriendo...";
	obj.msg_todacarne_no_internet = "Sin conexion a internet.";

	obj.msg_change_one_answer = "Cambie una de estas respuestas: ";

	obj.msg_dispute_rclick = "Dispute con clik derecho";
	obj.msg_dispute_hold_click = "Dispute manteniendo clik";
	
	obj.msg_in_favor = "A favor";
	obj.msg_against = "En contra";
	obj.msg_respond = "RESPONDER";
	
	obj.msg_help_statement_right_click = "Click derecho para abrir/cerrar la iteraccion de citas en contra o a favor";
	obj.msg_help_answer_right_click = "Click derecho para ir al enlace web correspondiente";
	obj.msg_help_cit_ed_ok_right_click = "Click derecho para cambiar entre A favor/En contra";
	obj.msg_help_cit_ed_range_right_click = "Click derecho para mostrar o no el campo de rango";
	obj.msg_help_cit_ed_any_bib_right_click = "Click derecho para mostrar o no la seleccion de cualquier version de biblia";
	
	obj.msg_qref_question_num = "pregunta número";
}

const all_es_bibrefs = {};

export function init_es_module(){
	init_en_module();
	init_es_basic_msg();
	
	console.log("Called init_es_module");
	
	init_get_msg(all_es_msg);
	init_es_bibrefs();
	
	num2book_es["-1"] = all_es_msg.msg_def_book;
	fill_reversed_object(num2book_es, book2num_es);
	
	fill_bibrefs_href(all_es_bibrefs);
	fill_all_strongrefs_href();

	init_es_exam_msg();
	
	init_all_glb("es", num2book_es, bibles_es, book2num_es, all_es_msg, all_es_bibrefs);
}

//init_es_module();

export const all_es_strongrefs = {
	H1004_cod: "H1004",
	H5782_cod: "H5782",
}

function init_es_bibrefs(){
	let cit_obj = null;
	let kk = null;
	const rf = all_es_bibrefs;
	// all '_href' terminated entries it will be filled with '_obj' terminated data when fill_bibrefs_href gets called
	cit_obj = rf.gen_15_15_obj = { book: "genesis", chapter: 15, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Y tú vendrás á tus padres en paz, y serás sepultado en buena vejez.`;
	cit_obj = rf.gen_25_8_obj = { book: "genesis", chapter: 25, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Y exhaló el espíritu, y murió Abraham en buena vejez, anciano y lleno de días y fué unido á su pueblo.`;	
	rf.gen_25_8_str = `Gen 25:8. Abraham gave up his spirit, and died at a good old age, an old man, and full of years, and was gathered to his people.`;
	rf.gen_35_29_obj = { book: "genesis", chapter: 35, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.gen_35_29_str = `Gen 35:29. Isaac gave up the spirit and died, and was gathered to his people, old and full of days. Esau and Jacob, his sons, buried him.`;
	rf.job_7_21_obj = { book: "job", chapter: 7, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.job_7_21_str = `Job 7:21. ¿Y por qué no quitas mi rebelión, y perdonas mi iniquidad? Porque ahora dormiré en el polvo, Y si me buscares de mañana, ya no seré.`;
	rf.job_14_12_obj = { book: "job", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.job_14_12_str = `Job 14:12. Así el hombre yace, y no se tornará á levantar: Hasta que no haya cielo no despertarán, Ni se levantarán de su sueño.`;
	cit_obj = rf.psa_16_11_obj = { book: "psalms", chapter: 16, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Me mostrarás la senda de la vida: Hartura de alegrías hay con tu rostro; Deleites en tu diestra para siempre.`;	
	rf.psa_115_17_obj = { book: "psalms", chapter: 115, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.psa_115_17_str = `Psa 115:17. No alabarán los muertos á JAH, Ni cuantos descienden al silencio;`;
	rf.ecc_9_10_obj = { book: "ecclesiastes", chapter: 9, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVR1960", };
	rf.ecc_9_10_str = `Ecc 9:10. Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas; porque en el Seol, adonde vas, no hay obra, ni trabajo, ni ciencia, ni sabiduría.`;
	rf.ecc_12_7_obj = { book: "ecclesiastes", chapter: 12, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.ecc_12_7_str = `Ecc 12:7. Y el polvo se torne á la tierra, como era, y el espíritu se vuelva á Dios que lo dió.`;
	cit_obj = rf.isa_8_19_obj = { book: "isaiah", chapter: 8, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Y si os dijeren: Preguntad á los pythones y á los adivinos, que susurran hablando, responded: ¿No consultará el pueblo á su Dios? ¿Apelará por los vivos á los muertos?`;	
	rf.isa_14_7_obj = { book: "isaiah", chapter: 14, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NBLA", };
	rf.isa_14_8_obj = { book: "isaiah", chapter: 14, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "LBLA", };
	rf.isa_14_9_txt_obj = { book: "isaiah", chapter: 14, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", };
	rf.isa_14_10_obj = { book: "isaiah", chapter: 14, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.isa_14_10_str = `Isa 14:10. Todos ellos darán voces, y te dirán: ¿Tú también enfermaste como nosotros, y como nosotros fuiste?`;
	rf.isa_14_12_obj = { book: "isaiah", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.isa_14_18_txt_obj = { book: "isaiah", chapter: 14, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", };
	rf.isa_65_17_obj = { book: "isaiah", chapter: 65, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.isa_65_17_str = `Isa 65:17.  Porque he aquí que yo crío nuevos cielos y nueva tierra: y de lo primero no habrá memoria, ni más vendrá al pensamiento.`;
	rf.isa_66_22_obj = { book: "isaiah", chapter: 66, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.isa_66_22_str = `Isa 66:22. Porque como los cielos nuevos y la nueva tierra, que yo hago, permanecen delante de mí, dice Jehová, así permanecerá vuestra simiente y vuestro nombre.`;
	rf.mat_17_3_obj = { book: "matthew", chapter: 17, verse: 3, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.mat_17_3_str = `Mat 17:3.  Y he aquí les aparecieron Moisés y Elías, hablando con él.`;
	rf.mat_17_4_obj = { book: "matthew", chapter: 17, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.mat_26_64_obj = { book: "matthew", chapter: 26, verse: 64, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.mat_26_64_str = `Mat 26:64.  Jesús le dijo: Tú lo has dicho: y aun os digo, que desde ahora habéis de ver al Hijo de los hombres sentado á la diestra de la potencia de Dios, y que viene en las nubes del cielo."`;
	rf.mat_28_9_obj = { book: "matthew", chapter: 28, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.mat_28_9_str = `Mat 28:9. He aquí, Jesús les sale al encuentro, diciendo: Salve. Y ellas se llegaron y abrazaron sus pies, y le adoraron.`;
	rf.mar_16_19_obj = { book: "mark", chapter: 16, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.mar_16_19_str = `Mar 16:19. So then the Lord, after he had spoken to them, was received up into heaven, and sat down at the right hand of God.`;
	rf.luk_8_52_obj = { book: "luke", chapter: 8, verse: 52, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_8_52_str = `Luk 8:52. All were weeping and mourning her, but he said, "Don’t weep. She isn’t dead, but sleeping."`;
	cit_obj = rf.luk_15_24_obj = { book: "luke", chapter: 15, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Porque este mi hijo muerto era, y ha revivido; habíase perdido, y es hallado. Y comenzaron á regocijarse.`;
	rf.luk_16_24_obj = { book: "luke", chapter: 16, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_16_24_str = `Luk 16:24. Entonces él, dando voces, dijo: Padre Abraham, ten misericordia de mí, y envía á Lázaro que moje la punta de su dedo en agua, y refresque mi lengua; porque soy atormentado en esta llama.`;
	rf.luk_20_36_obj = { book: "luke", chapter: 20, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_20_36_str = `Luk 20:36. Porque no pueden ya más morir: porque son iguales á los ángeles, y son hijos de Dios, cuando son hijos de la resurrección.`;
	cit_obj = rf.luk_20_38_obj = { book: "luke", chapter: 20, verse: 38, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Porque Dios no es Dios de muertos, mas de vivos: porque todos viven á él.`;
	cit_obj = rf.luk_23_43_obj = { book: "luke", chapter: 23, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Entonces Jesús le dijo: De cierto te digo, que hoy estarás conmigo en el paraíso.`;
	rf.luk_24_30_obj = { book: "luke", chapter: 24, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_24_30_str = `Luk 24:30. Y aconteció, que estando sentado con ellos á la mesa, tomando el pan, bendijo, y partió, y dióles.`;
	rf.luk_24_39_obj = { book: "luke", chapter: 24, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", };
	rf.luk_24_39_str = `Luk 24:39. Miren mis manos y mis pies. Soy yo mismo. Tóquenme y vean: un espíritu no tiene carne ni huesos, como ustedes ven que tengo yo.`;
	rf.luk_24_43_obj = { book: "luke", chapter: 24, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_24_43_str = `Luk 24:43. Y él tomó, y comió delante de ellos.`;
	rf.jhn_2_19_obj = { book: "john", chapter: 2, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_2_19_str = `Jhn 2:19. Respondió Jesús, y díjoles: Destruid este templo, y en tres días lo levantaré.`;
	cit_obj = rf.jhn_4_24_obj = { book: "john", chapter: 4, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren.`;
	rf.jhn_5_28_obj = { book: "john", chapter: 5, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_5_28_str = `Jhn 5:28. No os maravilléis de esto; porque vendrá hora, cuando todos los que están en los sepulcros oirán su voz;`;
	rf.jhn_5_29_obj = { book: "john", chapter: 5, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_5_29_str = `Jhn 5:29.  Y los que hicieron bien, saldrán á resurrección de vida; mas los que hicieron mal, á resurrección de condenación.`;
	rf.jhn_6_39_obj = { book: "john", chapter: 6, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "LBLA", };
	rf.jhn_6_39_str = `Jhn 6:39. Y esta es la voluntad del que me envió: que de todo lo que Él me ha dado yo no pierda nada, sino que lo resucite en el día final.`;
	rf.jhn_6_40_obj = { book: "john", chapter: 6, verse: 40, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NBLA", };
	rf.jhn_6_40_str = `Jhn 6:40. Porque esta es la voluntad de Mi Padre: que todo aquel que ve al Hijo y cree en Él, tenga vida eterna, y Yo mismo lo resucitaré en el día final.`;
	rf.jhn_6_44_obj = { book: "john", chapter: 6, verse: 44, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NBLA", };
	rf.jhn_6_44_str = `Jhn 6:44.  Nadie puede venir a Mí si no lo trae el Padre que me envió, y Yo lo resucitaré en el día final.`;
	rf.jhn_6_54_obj = { book: "john", chapter: 6, verse: 54, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NBLA", };
	rf.jhn_6_54_str = `Jhn 6:54. El que come Mi carne y bebe Mi sangre, tiene vida eterna, y Yo lo resucitaré en el día final.`;
	rf.jhn_11_11_obj = { book: "john", chapter: 11, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_11_11_str = `Jhn 11:11. Dicho esto, díceles después: Lázaro nuestro amigo duerme; mas voy á despertarle del sueño.`;
	rf.jhn_11_24_obj = { book: "john", chapter: 11, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NBLA", };
	rf.jhn_11_24_str = `Jhn 11:24. Marta le contestó: Yo sé que resucitará en la resurrección, en el día final.`;
	rf.jhn_17_2_obj = { book: "john", chapter: 17, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_17_2_str = `Jhn 17:2. Como le has dado la potestad de toda carne, para que dé vida eterna á todos los que le diste.`;
	rf.jhn_20_20_obj = { book: "john", chapter: 20, verse: 20, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_20_20_str = `Jhn 20:20. When he had said this, he showed them his hands and his side. The disciples therefore were glad when they saw the Lord.`;
	rf.jhn_20_27_obj = { book: "john", chapter: 20, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_20_27_str = `Jhn 20:27. Luego dice á Tomás: Mete tu dedo aquí, y ve mis manos: y alarga acá tu mano, y métela en mi costado: y no seas incrédulo, sino fiel.`;
	rf.jhn_14_2_obj = { book: "john", chapter: 14, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.jhn_14_2_str = `Jhn 14:2. En la casa de mi Padre muchas moradas hay: de otra manera os lo hubiera dicho: voy, pues, á preparar lugar para vosotros.`;
	rf.act_1_11_obj = { book: "acts", chapter: 1, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.act_1_11_str = `Act 1:11. Los cuales también les dijeron: Varones Galileos, ¿qué estáis mirando al cielo? este mismo Jesús que ha sido tomado desde vosotros arriba en el cielo, así vendrá como le habéis visto ir al cielo."`;
	cit_obj = rf.act_7_59_obj = { book: "acts", chapter: 7, verse: 59, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	kk = get_verse_cit_key(cit_obj) + "_str";
	rf[kk] = `Y apedrearon á Esteban, invocando él y diciendo: Señor Jesús, recibe mi espíritu.`;
	rf.act_10_41_obj = { book: "acts", chapter: 10, verse: 41, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.act_10_41_str = `Act 10:41. No á todo el pueblo, sino á los testigos que Dios antes había ordenado, es á saber, á nosotros que comimos y bebimos con él, después que resucitó de los muertos.`;
	rf.act_13_36_obj = { book: "acts", chapter: 13, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.act_13_36_str = `Act 13:36. For David, after he had in his own generation served the counsel of God, fell asleep, was laid with his fathers, and saw decay.`;
	rf.act_24_15_obj = { book: "acts", chapter: 24, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.act_24_15_str = `Act 24:15. Teniendo esperanza en Dios que ha de haber resurrección de los muertos, así de justos como de injustos, la cual también ellos esperan.`;
	rf.rom_6_9_obj = { book: "romans", chapter: 6, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.rom_6_9_str = `Rom 6:9. Sabiendo que Cristo, habiendo resucitado de entre los muertos, ya no muere: la muerte no se enseñoreará más de él.`;
	rf._1co_15_22_obj = { book: "1_corinthians", chapter: 15, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1co_15_22_str = `1Co 15:22. Porque así como en Adam todos mueren, así también en Cristo todos serán vivificados.`;
	rf._1co_15_42_obj = { book: "1_corinthians", chapter: 15, verse: 42, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1co_15_42_str = `1Co 15:42. Así también es la resurrección de los muertos. Se siembra en corrupción se levantará en incorrupción;`;
	rf._1co_15_49_obj = { book: "1_corinthians", chapter: 15, verse: 49, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1co_15_49_str = `1Co 15:49. Y como trajimos la imagen del terreno, traeremos también la imagen del celestial.`;
	rf._2co_5_8_obj = { book: "2_corinthians", chapter: 5, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._2co_5_8_str = `2Co 5:8. We are courageous, I say, and are willing rather to be absent from the body and to be at home with the Lord.`;
	rf._2co_12_4_obj = { book: "2_corinthians", chapter: 12, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._2co_12_4_str = `2Co 12:4. how he was caught up into Paradise, and heard unspeakable words, which it is not lawful for a man to utter.`;
	rf.phl_1_23_obj = { book: "philippians", chapter: 1, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.phl_1_23_str = `Phl 1:23. But I am hard pressed between the two, having the desire to depart and be with Christ, which is far better.`;
	rf.phl_3_21_obj = { book: "philippians", chapter: 3, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.phl_3_21_str = `Phl 3:21. El cual transformará el cuerpo de nuestra bajeza, para ser semejante al cuerpo de su gloria, por la operación con la cual puede también sujetar á sí todas las cosas.`;
	rf.col_1_15_obj = { book: "colossians", chapter: 1, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", };
	rf.col_1_15_str = `Col 1:15. Cristo es la imagen visible de Dios, que es invisible; es su Hijo primogénito, anterior a todo lo creado.`;
	rf._1th_4_14_obj = { book: "1_thessalonians", chapter: 4, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1th_4_14_str = `1Th 4:14. For if we believe that Jesus died and rose again, even so God will bring with him those who have fallen asleep in Jesus.`;
	rf._1ti_5_6_obj = { book: "1_timothy", chapter: 5, verse: 6, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1ti_5_6_str = `1Ti 5:6. But she who gives herself to pleasure is dead while she lives. `;
	rf._2ti_2_18_obj = { book: "2_timothy", chapter: 2, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NTV", };
	rf._2ti_2_18_str = `2Ti 2:18. Ellos han abandonado el camino de la verdad al afirmar que la resurrección de los muertos ya ocurrió; de esa manera, desviaron de la fe a algunas personas.`;
	rf.heb_1_14_obj = { book: "hebrews", chapter: 1, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_1_14_str = `Heb 1:14. Aren’t they all serving spirits, sent out to do service for the sake of those who will inherit salvation?`;
	rf.heb_7_16_obj = { book: "hebrews", chapter: 7, verse: 16, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", };
	rf.heb_7_16_str = `Heb 7:16. que no fue sacerdote según una ley que toma en cuenta elementos puramente humanos, sino según el poder de una vida indestructible.`;
	rf.heb_7_25_obj = { book: "hebrews", chapter: 7, verse: 25, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_7_25_str = `Heb 7:25. Por lo cual puede también salvar eternamente á los que por él se allegan á Dios, viviendo siempre para interceder por ellos.`;
	rf.heb_9_12_obj = { book: "hebrews", chapter: 9, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_9_12_str = `Heb 9:12. Y no por sangre de machos cabríos ni de becerros, mas por su propia sangre, entró una sola vez en el santuario, habiendo obtenido eterna redención.`;
	rf.heb_9_27_obj = { book: "hebrews", chapter: 9, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_9_27_str = `Heb 9:27. Y de la manera que está establecido á los hombres que mueran una vez, y después el juicio;`;
	rf.heb_9_28_obj = { book: "hebrews", chapter: 9, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_9_28_str = `Heb 9:28. so Christ also, having been offered once to bear the sins of many, will appear a second time, without sin, to those who are eagerly waiting for him for salvation.`;
	rf.heb_10_12_obj = { book: "hebrews", chapter: 10, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_10_12_str = `Heb 10:12. Pero éste, habiendo ofrecido por los pecados un solo sacrificio para siempre, está sentado á la diestra de Dios,`;
	rf.heb_12_23_obj = { book: "hebrews", chapter: 12, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.heb_12_23_str = `Heb 12:23. Y á la congregación de los primogénitos que están alistados en los cielos, y á Dios el Juez de todos, y á los espíritus de los justos hechos perfectos,`;
	rf.heb_13_8_obj = { book: "hebrews", chapter: 13, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", };
	rf.heb_13_8_str = `Heb 13:8.  Jesucristo es el mismo ayer, hoy y siempre.`;
	rf._1pe_3_19_obj = { book: "1_peter", chapter: 3, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1pe_3_19_str = `1Pe 3:19. in whom he also went and preached to the spirits in prison, `;
	rf._2pe_3_13_obj = { book: "2_peter", chapter: 3, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._2pe_3_13_str = `2Pe 3:13. Bien que esperamos cielos nuevos y tierra nueva, según sus promesas, en los cuales mora la justicia.`;
	rf._1jo_3_2_obj = { book: "1_john", chapter: 3, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf._1jo_3_2_str = `1Jo 3:2. Muy amados, ahora somos hijos de Dios, y aun no se ha manifestado lo que hemos de ser; pero sabemos que cuando él apareciere, seremos semejantes á él, porque le veremos como él es.`;
	rf.rev_6_10_obj = { book: "revelation", chapter: 6, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.rev_6_10_str = `Rev 6:10. Y clamaban en alta voz diciendo: ¿Hasta cuándo, Señor, santo y verdadero, no juzgas y vengas nuestra sangre de los que moran en la tierra?`;
	rf.rev_14_13_obj = { book: "revelation", chapter: 14, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.rev_14_13_str = `Rev 14:13. I heard a voice from heaven saying, "Write, ‘Blessed are the dead who die in the Lord from now on.’" "Yes," says the Spirit, "that they may rest from their labors; for their works follow with them."`;
	rf.rev_1_18_obj = { book: "revelation", chapter: 1, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", };
	rf.rev_1_18_str = `Rev 1:18. y el que vive. Estuve muerto, pero ahora vivo para siempre. Yo tengo las llaves del reino de la muerte.`;
	rf.rev_20_13_obj = { book: "revelation", chapter: 20, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVR1960", };
	rf.rev_20_13_str = `Rev 20:13. Y el mar entregó los muertos que había en él; y la muerte y el Hades entregaron los muertos que había en ellos; y fueron juzgados cada uno según sus obras.`;
	rf.rev_21_1_obj = { book: "revelation", chapter: 21, verse: 1, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.rev_21_1_str = `Rev 21:1. Y VI un cielo nuevo, y una tierra nueva: porque el primer cielo y la primera tierra se fueron, y el mar ya no es.`;
};

function init_es_exam_msg(){
	let bibref = {};
	let rnam = null;	

	const href_home = "../es/index.html";
	const href_creator_tit = "../es/book.html#creador_DOT_";
	const href_tch_crea = "../es/book.html#creatividad-técnica_DOT_";
	const href_tch_cplx = "../es/book.html#complejidad-técnica_DOT_";
	const href_biology = "../es/book.html#biología_DOT_";
	const href_creator = "../es/book.html#creador_DOT_-1";
	const href_evidence = "../es/book.html#evidencia_DOT_";
	const href_reproduction_tit = "../es/book.html#reproducción_DOT_";
	const href_reproduction = "../es/book.html#reproducción_DOT_";
	const href_resurrection = "../es/book.html#resurrección_DOT_";
	const href_resurrection_tit = "../es/book.html#resurrección_DOT_";
	const href_physical_resu = "../es/book.html#física_DOT_";
	const href_still_physical = "../es/book.html#física_DOT_";
	const href_not_die_resu = "../es/book.html#no-pueden-morir_DOT_";
	const href_in_heaven_resu = "../es/book.html#en-el-cielo_DOT_";
	const href_like_jesus_resu = "../es/book.html#física_DOT_";
	const href_for_all_resu = "../es/book.html#para-todos_DOT_";
	const href_not_yet_resu = "../es/book.html#no-ha-sucedido_DOT_";
	const href_only_few_resu = "../es/book.html#no-ha-sucedido_DOT_";
	const href_new_earth_resu = "../es/book.html#una-tierra-nueva_DOT_";
	const href_asleep = "../es/book.html#dormiditos_DOT_";
	const href_the_cloth = "../es/book.html#la-tela_DOT_";
	const href_angels = "../es/book.html#ángeles_DOT_";
	const href_wings = "../es/book.html#alas_DOT_";
	const href_life = "../es/book.html#vida_DOT_";
	const href_death = "../es/book.html#muerte_DOT_";
	const href_liberator = "../es/book.html#libertador_DOT_";
	const href_sleeping = "../es/book.html#dormiditos_DOT_-1";
	const href_rich_and_laza = "../es/book.html#el-rico-y-el-pobre-lázaro_DOT_";
	const href_144000 = "../es/book.html#section";
	const href_eternal_abhorrence = "../es/book.html#horror-eterno_DOT_";
	const href_factories = "../es/book.html#fábricas_DOT_";

	
	const lg = all_es_msg;
	const rf = all_es_bibrefs;
	
	
	lg.q0_1__end_of_test = "Este cuestionario no es para usted. Aqui termina el examen para usted, a menos que no fuera la respuesta que queria decir. Hagale clik a su respuesta para cambiarla.";
	lg.q0_2__contradiction = "Usted tiene una contradiccion en sus respuestas. Por favor cambie una de las respuestas en rojo. La contradiccion está en una de ellas. De otra manera no puede continuar con el cuestionario. Hagale clik a su respuesta para cambiarla.";
	lg.q0_3__end_so_far = "Este cuestionario está en construcción. Este es el final del cuestionario por el momento...";
	lg.q0_4__about_beliefs = "<b>Todas estas preguntas son sobre lo que usted cree, NO sobre lo que usted cree tener certeza. Algunas preguntas son para evitar que se haga el tonto. Conteste todas apropiadamente. Usted puede cambiar cualquier respuesta en cualquier momento haciendole clik a la respuesta.</b>";
	
	lg.q1_1__are_you_reasonable = "Estas preguntas son para personas racionales y razonables.";
	lg.q1_1__yes = "Yo soy una persona racional y razonable.";
	lg.q1_1__no = "Yo NO soy una persona racional y razonable.";
	
	lg.q1_2__experience_is_evidence = "Una afirmación que la mayoria de las personas puede ver, oir, oler, degustar, tocar, oconfirmar por experiencia perceptual, ";
	lg.q1_2__yes = "ES evidencia.";
	lg.q1_2__no = "NO es evidencia";

	lg.q1_3__creator_section = `<a class='exam_ref exam_title' href='${href_creator_tit}'>Creador</a>`;
	lg.q1_3__are_humans_intelligent = `Con respecto a la <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a>, hay <a class='exam_ref' href='${href_evidence}'>evidencia</a> que el ser humano `;
	lg.q1_3__yes = "es inteligente, diseñador y tiene creatividad técnica.";
	lg.q1_3__should = "EVIDENCIA son todos los edificios, transistores, automóviles, satélites, neveras, lavadoras, pulidoras, retroescabadoras, máquinas que hacen máquinas, fábricas que usan máquinas hechas por otras fábricas, que ha hecho el hombre";
	lg.q1_3__no = "NO es inteligente, o NO es diseñador, o NO tiene creatividad técnica.";
	
	lg.q1_31__all_biological_machines = "Toda la maquinaria biologica observada en plantas, animales y personas:";
	lg.q1_31__creator = "fueron hechas por un CREADOR";
	lg.q1_31__other = "son el resultado de OTRA causa, NO de un creador";

	lg.q1_32__the_creator = `La afirmación: 'Al igual que el ser humano, el CREADOR de toda la maquinaria biologica observada en plantas, animales y personas, es inteligente, diseñador y tiene <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a>'`;
	lg.q1_32__intelligent = "es verdadera.";
	lg.q1_32__not_intelligent = "es falsa.";
	
	lg.q1_33__the_evolution = `La afirmación: 'El creador uso la EVOLUCIÓN como un mecanismo para crear toda la <a class='exam_ref' href='${href_factories}'>maquinaria biologica</a> observada en plantas, animales y personas'`;
	lg.q1_33__yes = "es verdadera.";
	lg.q1_33__no = "es falsa.";
	
	lg.q1_34__six_spins = "La afirmación: 'El creador de toda la maquinaria biológica observada en plantas, animales y personas, la creó en no mas de seis rotaciones del planeta sobre su eje, seis dias cronológicos'";
	lg.q1_34__yes = "es verdadera.";
	lg.q1_34__no = "es falsa.";
	
	lg.q1_35__skip_creator_proof = `Usted ahora puede escojer SALTARSE todas las preguntas para probar con evidencia y lógica la existencia de un creador de toda la maquinaria biológica, quiere saltarse las preguntas?`;
	lg.q1_35__yes = "Si, SALTAR las preguntas.";
	lg.q1_35__no = "No, dejeme CONTESTARLAS.";
	
	lg.q1_4__requires_technical_creativity = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a> que están soportadas por evidencia: `;
	lg.q1_4__knife = "reproducir un cuchillo requiere creatividad técnica";
	lg.q1_4__should1 = "un cuchillo es EVIDENCIA de la creatividad técnica del hombre";
	lg.q1_4__lamp = "reproducir una lámpara requiere creatividad técnica";
	lg.q1_4__should2 = "una lámpara es EVIDENCIA de la creatividad técnica del hombre";
	lg.q1_4__clock = "reproducir un reloj requiere creatividad técnica";
	lg.q1_4__should3 = "un reloj es EVIDENCIA de la creatividad técnica del hombre";
	
	lg.q1_5__more_complex_than = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${href_tch_cplx}'>complejidad técnica</a> que están soportadas por evidencia: `;
	lg.q1_5__building_vs_knife = "un edificio tiene mas complejidad técnica que un cuchillo";
	lg.q1_5__should1 = "hablando de manera general un edificio es mas DIFICIL de hacer que un cuchillo, solo por el hecho de que usualmente se necesitan cuchillos para hacer edificios";
	lg.q1_5__car_vs_lamp = "un carro tiene mas complejidad técnica que una lámpara";
	lg.q1_5__should2 = "hablando de manera general un carro es mas DIFICIL de hacer que una lámpara, solo por el hecho de que los carros usualmente tienen lámparas";
	lg.q1_5__cellphone_vs_clock = "un celular tiene mas complejidad técnica que una reloj";
	lg.q1_5__should3 = "hablando de manera general un celular es mas DIFICIL de hacer que un reloj, solo por el hecho de que los celulares usualmente tienen un reloj incorporado en sus funcionalidades";
	
	lg.q1_7__more_complexity_then_more_creativity = `Dada toda la experiencia perceptible normal, la afirmación: "entre mayor sea la <a class='exam_ref' href='${href_tch_cplx}'>complejidad técnica</a> de un objeto o máquina, ENTONCES, se necesita más <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a> para reproducirlo"`;
	lg.q1_7__yes = "Es verdadera.";
	lg.q1_7__no = "Es falsa.";
	
	lg.q1_8__more_creativity = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a> que están soportadas por evidencia: `;
	lg.q1_8__building_vs_knife = "se requiere mas creatividad técnica para reproducir un edificio que para reproducir un cuchillo";
	lg.q1_8__car_vs_lamp = "se requiere mas creatividad técnica para reproducir un carro que para reproducir una lámpara";
	lg.q1_8__cellphone_vs_clock = "se requiere mas creatividad técnica para reproducir un celular que para reproducir un reloj";
	
	lg.q1_9__coplexity_of_biological_machines = `Seleccione TODAS las afirmaciones soportadas por la experiencia perceptual normal acerca de la maquinaria y las <a class='exam_ref' href='${href_factories}'>fábricas</a> hechas por el hombre comparadas con la <a class='exam_ref' href='${href_biology}'>maquinaria biológica</a>: `;
	lg.q1_9__car_vs_mitosis = "NO observamos en CARROS que uno de estos inicie un proceso en el cual se divida en dos carros idénticos al original, ni lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la MITOSIS de maquinas biológicas como la CELULA.";
	lg.q1_9__smartphone_vs_sex = "NO observamos en CELULARES que un celular macho se una con un celular hembra, y despues de un tiempo, un tercer celular mas pequeño salga de la hembra, que se parece a una mescla de los dos primeros, y que con el tiempo crece en tamaño, tampoco lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la reproducción SEXUAL de maquinas biológicas como el CUERPO HUMANO.";
	lg.q1_9__bicycle_vs_healing = "NO observamos en BICICLETAS que cuando una se choca y se daña su superficie, en unos dias la bicicleta haya reparado su superficie, ni lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la SANACION de heridas en maquinas biológicas como la PIEL de animales.";
	lg.q1_9__knife_vs_regeneration = "NO observamos en CUCHILLOS que cuando se parte y pierde la punta, en unos dias haya crecido una nueva punta, ni lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la REGENERACION de maquinas biológicas como la COLA de algunas iguanas.";
	
	lg.q1_91__more_complexity_in_biology = `Dada toda la experiencia perceptible normal, la afirmación: "las <a class='exam_ref' href='${href_biology}'>maquinas biológicas</a> tienen mayor <a class='exam_ref' href='${href_tch_cplx}'>complejidad técnica</a> que las maquinas hechas por el ser humano"`;
	lg.q1_91__yes = "Es cierta.";
	lg.q1_91__no = "Es falsa.";
	
	lg.q1_92__human_complexity = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${href_tch_cplx}'>complejidad técnica</a> and <a class='exam_ref' href='${href_factories}'>fábricas</a> que están soportadas por evidencia: `;
	lg.q1_92__leg = "una PIERNA es tan compleja que si entendieramos como estan hechas podriamos tomar una gota de sangre de la persona que le falta la pierna, hacer una pierna personalizada para dicha persona, e instalarsela, tal cual como hacemos con una LLANTA de un carro.";
	lg.q1_92__liver = "un HIGADO es tan complejo que si entendieramos como estan hechos podriamos tomar una gota de sangre de la persona que lo tiene dañado, hacer un hígado personalizado para dicha persona, e instalarselo, tal cual como hacemos con una bodega de distribución y logística de una FABRICA.";
	lg.q1_92__lung = "un PULMON es tan complejo que si entendieramos como estan hechos podriamos tomar una gota de sangre de la persona que lo tiene dañado, hacer un pulmón personalizado para dicha persona, e instalarselo, tal cual como hacemos con un equipo de filtrado de aire en un sistema de VENTILACION.";
	
	lg.q1_93__biological_requires_creativity = `Dadas sus respuestas en la QREF_q1_91__ y la QREF_q1_7__ usted TIENE que concluir que la afirmación: "las máquinas biológicas requieren mayor <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a> que las máquinas hechas por humanos"`;
	lg.q1_93__yes = "Es verdadera.";
	lg.q1_93__no = "Es falsa.";
	
	lg.q1_94__if_human_then_creator = `Dada su respuesta en la QREF_q1_93__ usted TIENE que concluir que la afirmación: "SI el ser humano se va a llamar a si mismo inteligente, diseñador y <a class='exam_ref' href='${href_creator}'>creador</a>, debido a toda la <a class='exam_ref' href='${href_evidence}'>EVIDENCIA</a> en la tecnología que ha creado, ENTONCES, tiene que admitir que EXISTE un creador inteligente y diseñador de toda la <a class='exam_ref' href='${href_biology}'>maquinaria biológica</a> que observamos"`;
	lg.q1_94__yes = "Es verdadera.";
	lg.q1_94__no = "Es falsa.";
	
	lg.q2_0__reproduction_section = `<a class='exam_ref exam_title' href='${href_reproduction_tit}'>Reproducción</a>`;
	
	lg.q2_1__can_an_engineer_rebuild_his_house = `SI un ingeniero ha <a class='exam_ref' href='${href_reproduction}'>reproducido</a>, construido, la misma casa varias veces, y una de ellas es destruida, por el fuego, en un accidente, o por alguien mas `;
	lg.q2_1__yes = "el puede CONSTRUIR la casa destruida de nuevo.";
	lg.q2_1__no = "el NO PUEDE construir la casa destruida de nuevo.";
	
	lg.q2_2__future_resurrection = `Dada su respuesta en la QREF_q2_1__ usted tiene que aceptar que es RAZONABLE visualizar un futuro, tal vez distante, cuando entendamos lo suficiente sobre el cuerpo humano, en el cual los humanos podrán <a class='exam_ref' href='${href_reproduction}'>reproducir</a> el cuerpo humano y simular una <a class='exam_ref' href='${href_resurrection}'>resurrección</a>`;
	lg.q2_2__yes = "Si. Tengo que aceptarlo como RAZONABLE";
	lg.q2_2__no = "No. NO tengo porque aceptarlo como razonable";
		
	lg.q3_1__resurrection_section = `<a class='exam_ref exam_title' href='${href_resurrection_tit}'>Resurrección</a>`;
	lg.q3_1__jesus_resurrection_claims = `Seleccione TODAS las afirmaciones que usted cree que hace La Biblia acerca de Jesucristo <a class='exam_ref' href='${href_resurrection}'>RESUCITADO</a>: `;
	lg.q3_1__physical = "El fue físicamente resucitado, en CUERPO y Espíritu.";
	lg.q3_1__not_to_die = "El está vivo para SIEMPRE, para no volver a morir, porque ya no puede morir.";
	lg.q3_1__in_heaven = "El está, en CUERPO y Espíritu, en los cielos, esos cielos FISICOS que podemos ver, y que tienen nubes.";
	
	lg.q3_2__people_resurrection_claims = `Seleccione TODAS las afirmaciones que usted cree que hace La Biblia acerca de la <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de los muertos prometida por Jesucristo: `;
	lg.q3_2__like_jesus = "Es en CUERPO y ESPIRITU igual a la de Jesucristo. Y es en un cuerpo nuevo, como el de Jesucristo, que no puede morir.";
	lg.q3_2__for_all = "Es para todos, TODAS las personas, justos e injustos.";
	lg.q3_2__not_yet_most = "NO ha sucedido para casi nadie. El evento prometido es en el último dia.";
	//lg.q3_2__happened_for_few = "It HAS happened for a FEW ones. Some male genetic decendants of Jacob, of Israel, have been resurrected.";
	lg.q3_2__new_earth = "Es para vivir para siempre en una TIERRA física nueva con unos CIELOS físicos nuevos.";
	lg.q3_2__sleep = "Antes de la resurrección, la persona muerta NO tiene cuerpo, NI conciencia, y por lo tanto no puede hacer nada. Los muertos ESTAN muertos.";

	lg.q3_3__dispute_or_accept_resurrection = `Que afirmaciones acerca de la <a class='exam_ref' href='${href_resurrection}'>resurrección</a> le gustaría explorar y opcionalmente refutar? `;
	lg.q3_3__not_believed = "Las que NO CREO que son afirmadas por La Biblia.";
	lg.q3_3__all_stms = "TODAS.";
	lg.q3_3__go_on = "NINGUNA. ACEPTO que todas son afirmadas por La Biblia. Continuemos.";

	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${href_physical_resu}'>Física</a>`;
	lg.q4_1__physical = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${href_resurrection}'>resurrección</a> física de Jesucristo`;
	lg.q4_1__verse1_str = uppercase_words_in_string(rf.luk_24_39_str, ["Tóquenme", "carne", "huesos,"]);
	lg.q4_1__verse1_href = rf.luk_24_39_href;
	lg.q4_1__verse1_should = "La CARNE y los HUESOS son FISICOS.";
	lg.q4_1__verse2_str = uppercase_words_in_string(rf.jhn_20_27_str, ["mano,", "métela", "costado:"]);
	lg.q4_1__verse2_href = rf.jhn_20_27_href;
	lg.q4_1__verse2_should = "Meter una MANO en el COSTADO es algo FISICO.";
	lg.q4_1__verse3_str = uppercase_words_in_string(rf.act_10_41_str, ["comimos", "bebimos"]);
	lg.q4_1__verse3_href = rf.act_10_41_href;
	lg.q4_1__verse3_should = "COMER y BEBER son acciones FISICAS.";
	lg.q4_1__verse4_str = uppercase_words_in_string(rf.mat_28_9_str, ["abrazaron", "diciendo:", "pies,"]);
	lg.q4_1__verse4_href = rf.mat_28_9_href;
	lg.q4_1__verse4_should = "Decir, ABRAZAR los PIES de alguien es algo FISICO.";
	lg.q4_1__verse5_str = uppercase_words_in_string(rf.luk_24_30_str, ["partió,", "tomando", "pan,", "dióles."]);  
	lg.q4_1__verse5_href = rf.luk_24_30_href;
	lg.q4_1__verse5_should = "TOMAR el PAN, PARTIRLO y DARLO es algo FISICO.";
	lg.q4_1__verse6_str = uppercase_words_in_string(rf.jhn_2_19_str, ["templo,", "levantaré."]);
	lg.q4_1__verse6_href = rf.jhn_2_19_href;
	lg.q4_1__verse6_should = "RECONSTRUIR un cuerpo es algo FISICO.";
	lg.q4_1__verse7_str = uppercase_words_in_string(rf.luk_24_43_str, ["tomó,", "comió"]);
	lg.q4_1__verse7_href = rf.luk_24_43_href;
	lg.q4_1__verse7_should = "COMER pescado asado es algo FISICO.";
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${href_not_die_resu}'>Para NO volver a morir</a>`;
	lg.q5_1__not_die = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de Jesucristo para NO VOLVER a morir`;
	lg.q5_1__verse1_str = uppercase_words_in_string(rf.rom_6_9_str, ["ya", "no", "muere:"]);
	lg.q5_1__verse1_href = rf.rom_6_9_href;
	lg.q5_1__verse1_should = `Dice literalmente "YA NO MUERE"`;
	lg.q5_1__verse2_str = uppercase_words_in_string(rf.heb_7_16_str, ["vida", "indestructible."]);
	lg.q5_1__verse2_href = rf.heb_7_16_href;
	lg.q5_1__verse2_should = `Dice literalmente "VIDA INDESTRUCTIBLE"`;
	lg.q5_1__verse3_str = uppercase_words_in_string(rf.rev_1_18_str, ["vivo", "para", "siempre."]);
	lg.q5_1__verse3_href = rf.rev_1_18_href;
	lg.q5_1__verse3_should = `Dice literalmente "VIVO PARA SIEMPRE"`;
	lg.q5_1__verse4_str = uppercase_words_in_string(rf.heb_7_25_str, ["viviendo", "siempre", ]);
	lg.q5_1__verse4_href = rf.heb_7_25_href;
	lg.q5_1__verse4_should = `Dice literalmente "VIVIENDO SIEMPRE"`;
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${href_in_heaven_resu}'>En los cielos</a>`;
	lg.q6_1__in_heaven = `Seleccione todos los versiculos que soportan un Jesucristo <a class='exam_ref' href='${href_resurrection}'>RESUCITADO</a> que esta en los cielos en CUERPO y Espíritu.`;
	lg.q6_1__verse1_str = uppercase_words_in_string(rf.act_1_11_str, ["tomado", "vendrá", "ir", "al", "en", "el", "cielo.", "cielo,", "cielo?"]);
	lg.q6_1__verse1_href = rf.act_1_11_href;
	lg.q6_1__verse1_should = "IR AL CIELO y VENDRA del cielo. El está físicamente en unos cielos físicos";
	lg.q6_1__verse2_str = uppercase_words_in_string(rf.mat_26_64_str, ["sentado", "nubes", "cielo."]);
	lg.q6_1__verse2_href = rf.mat_26_64_href;
	lg.q6_1__verse2_should = "El está SENTADO y viene en las NUBES del CIELO";
	lg.q6_1__verse3_str = uppercase_words_in_string(rf.jhn_14_2_str, ["casa", "moradas", "lugar"]);
	lg.q6_1__verse3_href = rf.jhn_14_2_href;
	lg.q6_1__verse3_should = "EL hace un LUGAR para sus dicípulos";
	lg.q6_1__verse4_str = uppercase_words_in_string(rf.heb_9_12_str, ["entró", "santuario,"]);
	lg.q6_1__verse4_href = rf.heb_9_12_href;
	lg.q6_1__verse4_should = "El ENTRO al SANTUARIO que está en los cielos";
	lg.q6_1__verse5_str = uppercase_words_in_string(rf.heb_10_12_str, ["está", "sentado"]);
	lg.q6_1__verse5_href = rf.heb_10_12_href;
	lg.q6_1__verse5_should = "El ESTA SENTADO en los cielos";
	lg.q6_1__verse6_str = uppercase_words_in_string(rf.heb_13_8_str, ["es", "mismo", "siempre."]);
	lg.q6_1__verse6_href = rf.heb_13_8_href;
	lg.q6_1__verse6_should = "El es SIEMPRE el MISMO. Luego si resucitó en CUERPO y espíritu, el TIENE que estar en CUERPO y espíritu en los cielos.";
	lg.q6_1__verse7_str = uppercase_words_in_string(rf.col_1_15_str, ["imagen", "invisible;"]);
	lg.q6_1__verse7_href = rf.col_1_15_href;
	lg.q6_1__verse7_should = "El es la IMAGEN del Dios INVISIBLE. Luego si era visible cuando resucitó, El tiene que SEGUIR siendo visible en los cielos.";
	
	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${href_like_jesus_resu}'>Como Jesucristo</a>`;
	lg.q7_1__like_jesus = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de los muertos semejante a la <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de Jesucristo`;
	lg.q7_1__verse1_str = uppercase_words_in_string(rf.phl_3_21_str, ["semejante", "cuerpo", ]);
	lg.q7_1__verse1_href = rf.phl_3_21_href;
	lg.q7_1__verse1_should = `Dice literalmente "SEMEJANTE al CUERPO"`;
	lg.q7_1__verse2_str = uppercase_words_in_string(rf._1jo_3_2_str, ["semejantes", "á", "él,", ]);
	lg.q7_1__verse2_href = rf._1jo_3_2_href;
	lg.q7_1__verse2_should = `Dice literalmente "SEMEJANTES a EL"`;
	lg.q7_1__verse3_str = uppercase_words_in_string(rf.luk_20_36_str, ["no", "pueden", "morir:", ]);
	lg.q7_1__verse3_href = rf.luk_20_36_href;
	lg.q7_1__verse3_should = "Esos cuerpos NO PUEDEN MORIR";
	lg.q7_1__verse4_str = uppercase_words_in_string(rf.heb_9_27_str, ["mueran", "una", ]);
	lg.q7_1__verse4_href = rf.heb_9_27_href;
	lg.q7_1__verse4_should = "Estamos destinados a MORIR UNA vez. Solo UNA. No mas.";
	lg.q7_1__verse5_str = uppercase_words_in_string(rf._1co_15_49_str, ["traeremos", "imagen", "celestial.", ]);
	lg.q7_1__verse5_href = rf._1co_15_49_href;
	lg.q7_1__verse5_should = "TRAEREMOS la IMAGEN de lo CELESTIAL.";
	lg.q7_1__verse6_str = uppercase_words_in_string(rf._1co_15_42_str, ["levantará", "incorrupción;"]);
	lg.q7_1__verse6_href = rf._1co_15_42_href;
	lg.q7_1__verse6_should = "Lo que resucita es INCURRUPTIBLE";
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${href_for_all_resu}'>Para Todos</a>`;
	lg.q8_1__for_all = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de los muertos que es para TODOS`;
	lg.q8_1__verse1_str = uppercase_words_in_string(rf.jhn_5_28_str, ["todos", "sepulcros", ]);
	lg.q8_1__verse1_href = rf.jhn_5_28_href;
	lg.q8_1__verse1_should = "TODOS significa TODOS";
	lg.q8_1__verse2_str = uppercase_words_in_string(rf.jhn_5_29_str, ["bien,", "mal,", ]);
	lg.q8_1__verse2_href = rf.jhn_5_29_href;
	lg.q8_1__verse2_should = "Los que hicieron el BIEN y los que hicieron el MAL";
	lg.q8_1__verse3_str = uppercase_words_in_string(rf.act_24_15_str, ["como", "justos", "injustos,", ]);
	lg.q8_1__verse3_href = rf.act_24_15_href;
	lg.q8_1__verse3_should = "Todos resucitan: JUSTOS e INJUSTOS.";
	lg.q8_1__verse4_str = uppercase_words_in_string(rf.jhn_6_39_str, ["todo", "no", "pierda", "nada,", ]);
	lg.q8_1__verse4_href = rf.jhn_6_39_href;
	lg.q8_1__verse4_should = "De TODOS los que le dió NO PIERDA NADA.";
	lg.q8_1__verse5_str = uppercase_words_in_string(rf.jhn_17_2_str, ["toda", "carne,", "eterna", "vida", "todos", ]);
	lg.q8_1__verse5_href = rf.jhn_17_2_href;
	lg.q8_1__verse5_should = "VIDA ETERNA para TODA CARNE, que fué lo que le dió";
	lg.q8_1__verse6_str = uppercase_words_in_string(rf._1co_15_22_str, ["todos", "vivificados.", ]);
	lg.q8_1__verse6_href = rf._1co_15_22_href;
	lg.q8_1__verse6_should = "TODOS significa TODOS";
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${href_not_yet_resu}'>NO ha sucedido</a>`;
	lg.q9_1__not_yet = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de los muertos que NO ha sucedido para casi NADIE`;
	lg.q9_1__verse1_str = uppercase_words_in_string(rf.jhn_6_39_str, ["día", "final.", ]);
	lg.q9_1__verse1_href = rf.jhn_6_39_href;
	lg.q9_1__verse1_should = "Es el en DIA FINAL";
	lg.q9_1__verse2_str = uppercase_words_in_string(rf._2ti_2_18_str, ["desviaron", "ocurrió;", "past,"]);
	lg.q9_1__verse2_href = rf._2ti_2_18_href;
	lg.q9_1__verse2_should = "No ha OCURRIDO";
	lg.q9_1__verse3_str = uppercase_words_in_string(rf.jhn_6_40_str, ["final.", "día", ]);
	lg.q9_1__verse3_href = rf.jhn_6_40_href;
	lg.q9_1__verse3_should = "Es en el DIA FINAL";
	lg.q9_1__verse4_str = uppercase_words_in_string(rf.jhn_6_44_str, ["final.", "día", ]);
	lg.q9_1__verse4_href = rf.jhn_6_44_href;
	lg.q9_1__verse4_should = "Es en el DIA FINAL";
	lg.q9_1__verse5_str = uppercase_words_in_string(rf.jhn_6_54_str, ["final.", "día", ]);
	lg.q9_1__verse5_href = rf.jhn_6_54_href;
	lg.q9_1__verse5_should = "Es en el DIA FINAL";
	lg.q9_1__verse6_str = uppercase_words_in_string(rf.jhn_11_24_str, ["final.", "día", ]);
	lg.q9_1__verse6_href = rf.jhn_11_24_href;
	lg.q9_1__verse6_should = "Es en el DIA FINAL";
	lg.q9_1__verse7_str = uppercase_words_in_string(rf.rev_20_13_str, ["entregó", "entregaron", "muertos"]);
	lg.q9_1__verse7_href = rf.rev_20_13_href;
	lg.q9_1__verse7_should = "Es DESPUES de que esta tierra y estos cielos sean destruidos";
	
	/*
	lg.q10_1__has_for_few_sec = `<a class='exam_ref exam_title' href='${href_only_few_resu}'>Only for few</a>`;
	lg.q10_1__has_for_few = `1st quest ONLY FOR FEW`;
	lg.q10_1__go = "Go";
	lg.q10_1__stay = "Stay";
	*/
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${href_new_earth_resu}'>Tierra Nueva</a>`;
	lg.q11_1__new_earth = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${href_resurrection}'>resurrección</a> de los muertos para vivir en una TIERRA NUEVA con unos cielos nuevos`;
	lg.q11_1__verse1_str = uppercase_words_in_string(rf.rev_21_1_str, ["tierra", "nueva:", ]);
	lg.q11_1__verse1_href = rf.rev_21_1_href;
	lg.q11_1__verse1_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	lg.q11_1__verse2_str = uppercase_words_in_string(rf._2pe_3_13_str, ["tierra", "nueva,", ]);
	lg.q11_1__verse2_href = rf._2pe_3_13_href;
	lg.q11_1__verse2_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	lg.q11_1__verse3_str = uppercase_words_in_string(rf.isa_65_17_str, ["nueva", "tierra:", ]);
	lg.q11_1__verse3_href = rf.isa_65_17_href;
	lg.q11_1__verse3_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	lg.q11_1__verse4_str = uppercase_words_in_string(rf.isa_66_22_str, ["nueva", "tierra,", ]);
	lg.q11_1__verse4_href = rf.isa_66_22_href;
	lg.q11_1__verse4_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${href_sleeping}'>Dormiditos</a>`;
	lg.q12_1__sleep = `Seleccione un BUEN versiculo que soporte que las personas que están físicamente muertas (antes de la <a class='exam_ref' href='${href_resurrection}'>resurrección</a>) TIENEN CONCIENCIA`;
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

	const q12_1__response_INTRO = `<p> Este es un versículo que se cita con frecuencia como objeción a que en el muerto el ESPIRITU está <a class='exam_ref' href='${href_sleeping}'>dormido</a>.</p>
	
	<p> Cuando se argumenta en contra del ESPIRITU (NO alma) <a class='exam_ref' href='${href_sleeping}'>dormido</a> siempre hay que recordar que toda la Biblia se refiere a los muertos como a los que <a class='exam_ref' href='${href_sleeping}'>DUERMEN</a>, especialmente a nuestro Señor Jesucristo. La razón es obvia: NINGUNA persona que <a class='exam_ref' href='${href_sleeping}'>duerme</a> tiene CONCIENCIA. Esa es la característica más destacada de una persona que <a class='exam_ref' href='${href_sleeping}'>duerme</a>. Por favor, lea la sección que presenta el concepto bíblico del ESPIRITU <a class='exam_ref' href='${href_sleeping}'>dormido</a> del libro completamente GRATUITO <a class='exam_ref' href='${href_home}'>TodaCarne.com</a>. </p>`;
	
	const q12_1__response_END = `<p> Así que este versículo <b>NO SE REFIERE</b> a que las personas que están físicamente muertas tengan CONCIENCIA.</p>`;

	
	lg.q12_1__response_to_verse1 = `<a class='exam_ref' target='_blank' href=${rf.isa_14_10_href}>Isa 14:10</a> ${q12_1__response_INTRO}
	<p> Este versículo se refiere a un tiempo futuro literal o espiritual que sucedió como reafirmación del caso literal. El rey de Babilonia representa a El Satán, por eso es que el <a class='exam_ref' href=${rf.isa_14_12_href}>versículo 12</a> es comúnmente citado para referirse a El Satán. </p>

	<p>Nótese que: </p>
	<li>El <a class='exam_ref' href=${rf.isa_14_8_href}>versículo 8</a> dice: Aun los cipreses y los cedros del Líbano se alegran a causa de ti, diciendo: "Desde que fuiste derribado, no ha subido talador contra nosotros". Así que para el caso espiritual es una metáfora y el caso literal aún no ha sucedido porque el <a class='exam_ref' href=${rf.isa_14_7_href}>versículo 7</a> NO ha sucedido literalmente: "Toda la tierra está en reposo, está tranquila. Prorrumpe en gritos de júbilo.".

	<li>El <a class='exam_ref' href=${rf.isa_14_9_txt_href}>versículo 9</a> muestra que el caso literal implica que los muertos han DESPERTADO (vocablo <a class='exam_ref' href=${all_strongrefs.H5782_href}>H5782</a>) lo cual NO ha sucedido tampoco porque la resurrección de los muertos no ha sucedido.

	<li>El <a class='exam_ref' href=${rf.isa_14_18_txt_href}>versículo 18</a> nos dice que cada rey está en su propia CASA (vocablo <a class='exam_ref' href=${all_strongrefs.H1004_href}>H1004</a>). Para el caso literal han sido resucitados.
	${q12_1__response_END}`;
	
	lg.q12_1__response_to_verse2 = `<a class='exam_ref' href=${rf.mat_17_3_href}>Mat 17:3</a> ${q12_1__response_INTRO}
	<p> También es recomendable que hayas leído al menos la sección que introduce el concepto bíblico de la <a class='exam_ref' href='${href_resurrection}'>Resurrección</a> y en particular el hecho de que <a class='exam_ref' href='${href_not_yet_resu}'>No ha sucedido</a>.</p>

	<p> Lo más importante a destacar de este versículo es que ellos estaban físicamente presentes, todos tienen CUERPOS, y es por eso que Pedro, en el <a class='exam_ref' href=${rf.mat_17_4_href}>versículo 4</a>, ofrece construir tres tiendas. Dos tiendas para Moisés y Elías y una para Nuestro Señor. Estaban en la fiesta judía de Sucot. La fiesta de los Tabernáculos. Señal muy apropiada para mostrar que estos "tabernáculos" van a ser reemplazados por "casas" permanentes.</p>
	${q12_1__response_END}
	`;
	
	const q12_1__response_144000 = `<p>	Este versículo se refiere a los 144.000. Por favor, lea la sección <a class='exam_ref' href='${href_144000}'>144.000</a>. Otra sección que podría ayudar es la que se llama <a class='exam_ref' href='${href_eternal_abhorrence}'>Horror Eterno</a>.

	<p> Lo más importante que hay que notar sobre este versículo es que se refiere a las personas que han sido resucitadas. Los Santos. Los Grandes. Las primicias. Los primogénitos. Los que Dios trae con Jesucristo. Son unos POCOS: 144.000 descendientes genéticos masculinos de Israel cuando se complete el número. Todos ellos tienen CUERPOS, y es por eso que realmente pueden LLORAR, HABLAR, REUNIRSE y hacer ASAMBLEA.</p>`;
	
	
	lg.q12_1__response_to_verse3 = `<a class='exam_ref' href=${rf.rev_6_10_href}>Rev 6:10</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse4 = `<a class='exam_ref' href=${rf.heb_12_23_href}>Heb 12:23</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	lg.q12_1__response_to_verse5 = `<a class='exam_ref' href=${rf.luk_16_24_href}>Luk 16:24</a> ${q12_1__response_INTRO}
	<p>Este versículo es parte de la famosa PARÁBOLA de Lucas. Por favor, lea la sección llamada <a class='exam_ref' href='${href_rich_and_laza}'>El rico y el pobre Lázaro</a>.</p>

	Lo más importante que hay que tener en cuenta sobre este versículo es que es parte de una PARÁBOLA. Por lo tanto, lea la <a class='exam_ref' href='${href_rich_and_laza}'>INTERPRETACIÓN</a> correcta.</p>
	${q12_1__response_END}
	`;
		
	const q12_1__nowhere_consciousness = `<p> EN NINGUNA PARTE de este versículo y su contexto hay algo que se refiera remotamente a la CONCIENCIA de personas físicamente muertas. Es realmente notable cómo la cultura griega ha afectado las enseñanzas hebreas de las escrituras hebreas.</p>`;
	
	const q12_1__response_sheol = `<p> Este versículo se refiere al hecho de que TODOS los muertos van al Seol, a la tumba, al Sepulcro, al foso. </p>
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
	
	const q12_1__response_spiritually_dead = `<p> Este versículo se refiere a personas espiritualmente muertas. Por favor, lea las secciones llamadas <a class='exam_ref' href='${href_life}'>Vida</a>, <a class='exam_ref' href='${href_death}'>Muerte</a>, and <a class='exam_ref' href='${href_liberator}'>Libertador</a>.</p>`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._1pe_3_19_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._1pe_3_19_href}>1Pe 3:19</a> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	<p> Lo más importante que hay que notar en este versículo y su contexto es que TODAS las personas están MUERTAS sin Jesucristo, quien es la VIDA misma. Así que el versículo se refiere a personas FÍSICAMENTE vivas pero espiritualmente muertas. Cualquier persona que no cree en Jesucristo es un esclavo, un PRISIONERO del Espíritu que gobierna este mundo, esa persona es un "espíritu en prisión". La buena noticia de la RESURRECCIÓN de Jesucristo es que liberó a esa persona. Es un nuevo comienzo. Y los tiempos de Noé, que fueron un nuevo comienzo, fueron una SEÑAL del nuevo comienzo en los tiempos de Jesucristo. De eso se trata el pasaje. Quizás NO en una mala traducción, pero ciertamente en el griego koiné antiguo.</p>

	<p> La segunda cosa que hay que notar es que EN NINGÚN LUGAR, en el versículo o en su contexto, aparece la palabra griega Hades, la palabra griega usada en los manuscritos griegos antiguos para el Seol hebreo, el lugar donde van los muertos: la tumba, el Sepulcro, el pozo. Este pasaje NO está hablando de personas FÍSICAMENTE muertas. Se trata de personas espiritualmente muertas y TODOS estaban espiritualmente muertos cuando Jesucristo murió y resucitó.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._2co_5_8_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_5_8_href}>2Co 5:8</a> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere estar ausente de este cuerpo que muere y, cuando RESUCITE en un cuerpo nuevo que no puede morir, estar presente con el Señor. Él, después de todo, RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar PRESENTE con Él es estar TAMBIÉN RESUCITADO.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.act_7_59_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.act_7_59_href}>Act 7:59</a> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere al hecho de que cuando una persona muere, como dice <a class='exam_ref' href=${rf.ecc_12_7_href}>Ecc 12:7</a>, el espíritu VUELVE a Elohim, que lo dió, asi que todo vuelve a estar como estaba ANTES de que la persona naciera físicamente.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.luk_20_38_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_20_38_href}>Luk 20:38</a> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere al hecho de que la gente muerta PUEDE ser DESPERTADA cuando esta <a class='exam_ref' href='${href_sleeping}'>DORMIDITA</a>, y que para el que las puede DESPERTAR siguen VIVAS.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	const q12_1__response_paradise = `<p> Este versiculo se refiere al PARAISO, un LUGAR físico donde los RESUCITADOS vivirán eternamente con Jesucristo, NO se refiere al Sheol, a la tumba, al Sepulcro, al foso.</p>
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
	<p> Este versiculo se refiere a personas FISICAMENTE vivas que adoran en Espíritu y en Verdad.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.heb_1_14_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>Heb 1:14</a> ${q12_1__response_INTRO}
	<p>Este versículo se refiere a los ángeles como espíritus. La Biblia se refiere a cualquier persona físicamente viva como espíritu. Por favor lea las secciones de <a class='exam_ref' href='${href_angels}'>Angeles</a> y <a class='exam_ref' href='${href_wings}'>Alados</a>.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.phl_1_23_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.phl_1_23_href}>Phl 1:23</a> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere partir y estar con Cristo cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar con Él es estar RESUCITANDO TAMBIÉN.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.psa_16_11_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.psa_16_11_href}>Psa 16:11</a> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, todo aquel que cree en la RESURRECCIÓN de Jesucristo sabe que Él es el Camino y la Vida y que podrá estar en Su presencia cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de ver su ROSTRO es estar TAMBIÉN RESUCITADO.</p>
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.isa_8_19_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.isa_8_19_href}>Isa 8:19</a> ${q12_1__response_INTRO}
	<p> La prohibición en el Antiguo Testamento de que las personas hablen con los muertos es para evitar que hablen con los Poderes Celestiales, comúnmente conocidos en el Nuevo Testamento como DEMONIOS, que se harán pasar por la persona muerta para engañar a quien intente comunicarse con el muerto.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._1th_4_14_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>1Th 4:14</a> ${q12_1__response_INTRO}
	${q12_1__response_144000}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;	
	
	lg.q13_1__sleep = `Seleccione todos los versiculos que soportan que las personas muertas NO tienen CONCIENCIA hasta la <a class='exam_ref' href='${href_resurrection}'>resurrección</a>.`;
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
	

	lg.q14_1__the_cloth_sec = `<a class='exam_ref exam_title' href='${href_the_cloth}'>The Cloth</a>`;
	lg.q14_1__the_cloth = `1st quest THE CLOTH`;
	lg.q14_1__go = "Go";
	lg.q14_1__stay = "Stay";
	
	
}

