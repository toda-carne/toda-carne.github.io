
import { init_get_msg, init_all_glb, fill_reversed_object, init_en_module, get_dispute_msg, bib_defaults, uppercase_words_in_string, 
	all_strongrefs, get_verse_reponse_name, make_bible_ref, fill_bibrefs_href, fill_all_strongrefs_href } from '../code/tc_lang_all.js';

"use strict";

const book2num_es = {};
const all_es_msg = {};

const bibles_es = {
	biblegateway: [ "RVA", "RVR1960", "DHH", "NTV", "WLC", "HHH", "WHNU", "TR1550", ],
	biblehub: [ "text", "sepd", "wlco", ],
	bibliaparalela: [ "rvg", "rv", "nblh", ],
	blueletterbible: [ "RVR09", "RVR60", "EM", "VUL", "NASB95", "VUL", "WLC", "LXX", "MGNT", "TR", ],
};

const num2book_es = {
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

function set_glb_lang(){
	glb_exam_language = "es";
	glb_all_books = num2book_es;
	glb_all_bibles = bibles_es;
	glb_books_nums = book2num_es;
	glb_curr_lang = all_es_msg;
}

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
	
	obj.msg_def_book = "LIBRO";
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

export function init_es_module(){
	init_en_module();
	init_es_basic_msg();
	
	console.log("Called init_es_module");
	
	init_get_msg(all_es_msg);
	
	num2book_es["-1"] = all_es_msg.msg_def_book;
	fill_reversed_object(num2book_es, book2num_es);
	
	fill_bibrefs_href(all_es_bibrefs);
	fill_all_strongrefs_href();

	init_es_exam_msg();
	
	init_all_glb("es", num2book_es, bibles_es, book2num_es, all_es_msg);
}

//init_es_module();

export const all_es_strongrefs = {
	H1004_cod: "H1004",
	H5782_cod: "H5782",
}

export const all_es_bibrefs = {
	// all '_href' terminated entries it will be filled with '_obj' terminated data when fill_bibrefs_href gets called
	gen_15_15_obj: { book: "genesis", chapter: 15, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	gen_15_15_str: `Gen 15:15. but you will go to your fathers in peace. You will be buried at a good old age.`,
	gen_25_8_obj: { book: "genesis", chapter: 25, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	gen_25_8_str: `Gen 25:8. Abraham gave up his spirit, and died at a good old age, an old man, and full of years, and was gathered to his people.`,
	gen_35_29_obj: { book: "genesis", chapter: 35, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	gen_35_29_str: `Gen 35:29. Isaac gave up the spirit and died, and was gathered to his people, old and full of days. Esau and Jacob, his sons, buried him.`,
	job_7_21_obj: { book: "job", chapter: 7, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	job_7_21_str: `Job 7:21. Why do you not pardon my disobedience, and take away my iniquity? For now will I lie down in the dust. You will seek me diligently, but I will not be.`,
	job_14_12_obj: { book: "job", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	job_14_12_str: `Job 14:12. so man lies down and doesn’t rise. Until the heavens are no more, they will not awake, nor be roused out of their sleep.`,
	psa_16_11_obj: { book: "psalms", chapter: 16, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	psa_16_11_str: `Psa 16:11. You will show me the path of life. In your presence is fullness of joy. In your right hand there are pleasures forever more.`,
	psa_115_17_obj: { book: "psalms", chapter: 115, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	psa_115_17_str: `Psa 115:17. The dead don’t praise Yah, neither any who go down into silence;`,
	ecc_9_10_obj: { book: "ecclesiastes", chapter: 9, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	ecc_9_10_str: `Ecc 9:10. Whatever your hand finds to do, do it with your might; for there is no work, nor plan, nor knowledge, nor wisdom, in Sheol, where you are going.`,
	ecc_12_7_obj: { book: "ecclesiastes", chapter: 12, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	ecc_12_7_str: `Ecc 12:7. and the dust returns to the earth as it was, and the spirit returns to God who gave it.`,
	isa_8_19_obj: { book: "isaiah", chapter: 8, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_8_19_str: `Isa 8:19. When they tell you, “Consult with those who have familiar spirits and with the wizards, who chirp and who mutter,” shouldn’t a people consult with their God? Should they consult the dead on behalf of the living?`,
	isa_14_7_obj: { book: "isaiah", chapter: 14, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_14_8_obj: { book: "isaiah", chapter: 14, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_14_9_txt_obj: { book: "isaiah", chapter: 14, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", },
	isa_14_10_obj: { book: "isaiah", chapter: 14, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_14_10_str: `Isa 14:10. They all will answer and ask you, "Have you also become as weak as we are? Have you become like us?"`,
	isa_14_12_obj: { book: "isaiah", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_14_18_txt_obj: { book: "isaiah", chapter: 14, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblehub", bib_ver: "text", },
	isa_65_17_obj: { book: "isaiah", chapter: 65, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_65_17_str: `Isa 65:17. For, behold, I create new heavens and a new earth; and the former things will not be remembered, nor come into mind.`,
	isa_66_22_obj: { book: "isaiah", chapter: 66, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	isa_66_22_str: `Isa 66:22. "For as the new heavens and the new earth, which I will make, shall remain before me," says Yahweh, "so your offspring and your name shall remain."`,
	mat_17_3_obj: { book: "matthew", chapter: 17, verse: 3, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	mat_17_3_str: `Mat 17:3. Behold, Moses and Elijah appeared to them talking with him.`,
	mat_17_4_obj: { book: "matthew", chapter: 17, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	mat_26_64_obj: { book: "matthew", chapter: 26, verse: 64, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	mat_26_64_str: `Mat 26:64.  Jesús le dijo: Tú lo has dicho: y aun os digo, que desde ahora habéis de ver al Hijo de los hombres sentado á la diestra de la potencia de Dios, y que viene en las nubes del cielo."`,
	mat_28_9_obj: { book: "matthew", chapter: 28, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	mat_28_9_str: `Mat 28:9. He aquí, Jesús les sale al encuentro, diciendo: Salve. Y ellas se llegaron y abrazaron sus pies, y le adoraron.`,
	mar_16_19_obj: { book: "mark", chapter: 16, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	mar_16_19_str: `Mar 16:19. So then the Lord, after he had spoken to them, was received up into heaven, and sat down at the right hand of God.`,
	luk_8_52_obj: { book: "luke", chapter: 8, verse: 52, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_8_52_str: `Luk 8:52. All were weeping and mourning her, but he said, "Don’t weep. She isn’t dead, but sleeping."`,
	luk_15_24_obj: { book: "luke", chapter: 15, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_15_24_str: `Luk 15:24. for this, my son, was dead, and is alive again. He was lost, and is found.’ Then they began to celebrate.`,
	luk_16_24_obj: { book: "luke", chapter: 16, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_16_24_str: `Luk 16:24. He cried and said, ‘Father Abraham, have mercy on me, and send Lazarus, that he may dip the tip of his finger in water, and cool my tongue! For I am in anguish in this flame.’`,
	luk_20_36_obj: { book: "luke", chapter: 20, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_20_36_str: `Luk 20:36. Porque no pueden ya más morir: porque son iguales á los ángeles, y son hijos de Dios, cuando son hijos de la resurrección.`,
	luk_20_38_obj: { book: "luke", chapter: 20, verse: 38, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_20_38_str: `Luk 20:38. Now he is not the God of the dead, but of the living, for all are alive to him.`,
	luk_23_43_obj: { book: "luke", chapter: 23, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_23_43_str: `Luk 23:43.  Jesus said to him, "Assuredly I tell you, today you will be with me in Paradise."`,
	luk_24_30_obj: { book: "luke", chapter: 24, verse: 30, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_24_30_str: `Luk 24:30. Y aconteció, que estando sentado con ellos á la mesa, tomando el pan, bendijo, y partió, y dióles.`,
	luk_24_39_obj: { book: "luke", chapter: 24, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", },
	luk_24_39_str: `Luk 24:39. Miren mis manos y mis pies. Soy yo mismo. Tóquenme y vean: un espíritu no tiene carne ni huesos, como ustedes ven que tengo yo.`,
	luk_24_43_obj: { book: "luke", chapter: 24, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	luk_24_43_str: `Luk 24:43. Y él tomó, y comió delante de ellos.`,
	jhn_2_19_obj: { book: "john", chapter: 2, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_2_19_str: `Jhn 2:19. Respondió Jesús, y díjoles: Destruid este templo, y en tres días lo levantaré.`,
	jhn_4_24_obj: { book: "john", chapter: 4, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_4_24_str: `Jhn 4:24. God is spirit, and those who worship him must worship in spirit and truth.`,
	jhn_5_28_obj: { book: "john", chapter: 5, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_5_28_str: `Jhn 5:28. No os maravilléis de esto; porque vendrá hora, cuando todos los que están en los sepulcros oirán su voz;`,
	jhn_5_29_obj: { book: "john", chapter: 5, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_5_29_str: `Jhn 5:29.  Y los que hicieron bien, saldrán á resurrección de vida; mas los que hicieron mal, á resurrección de condenación.`,
	jhn_6_39_obj: { book: "john", chapter: 6, verse: 39, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "LBLA", },
	jhn_6_39_str: `Jhn 6:39. Y esta es la voluntad del que me envió: que de todo lo que Él me ha dado yo no pierda nada, sino que lo resucite en el día final.`,
	jhn_6_40_obj: { book: "john", chapter: 6, verse: 40, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_6_40_str: `Jhn 6:40. This is the will of the one who sent me, that everyone who sees the Son, and believes in him, should have eternal life; and I will raise him up at the last day.`,
	jhn_6_44_obj: { book: "john", chapter: 6, verse: 44, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_6_44_str: `Jhn 6:44. No one can come to me unless the Father who sent me draws him, and I will raise him up in the last day.`,
	jhn_6_54_obj: { book: "john", chapter: 6, verse: 54, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_6_54_str: `Jhn 6:54. He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day.`,
	jhn_11_11_obj: { book: "john", chapter: 11, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_11_11_str: `Jhn 11:11. He said these things, and after that, he said to them, "Our friend, Lazarus, has fallen asleep, but I am going so that I may awake him out of sleep."`,
	jhn_11_24_obj: { book: "john", chapter: 11, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_11_24_str: `Jhn 11:24. Martha said to him, "I know that he will rise again in the resurrection at the last day."`,
	jhn_17_2_obj: { book: "john", chapter: 17, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_17_2_str: `Jhn 17:2. Como le has dado la potestad de toda carne, para que dé vida eterna á todos los que le diste.`,
	jhn_20_20_obj: { book: "john", chapter: 20, verse: 20, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_20_20_str: `Jhn 20:20. When he had said this, he showed them his hands and his side. The disciples therefore were glad when they saw the Lord.`,
	jhn_20_27_obj: { book: "john", chapter: 20, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_20_27_str: `Jhn 20:27. Luego dice á Tomás: Mete tu dedo aquí, y ve mis manos: y alarga acá tu mano, y métela en mi costado: y no seas incrédulo, sino fiel.`,
	jhn_14_2_obj: { book: "john", chapter: 14, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	jhn_14_2_str: `Jhn 14:2. En la casa de mi Padre muchas moradas hay: de otra manera os lo hubiera dicho: voy, pues, á preparar lugar para vosotros.`,
	act_1_11_obj: { book: "acts", chapter: 1, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	act_1_11_str: `Act 1:11. Los cuales también les dijeron: Varones Galileos, ¿qué estáis mirando al cielo? este mismo Jesús que ha sido tomado desde vosotros arriba en el cielo, así vendrá como le habéis visto ir al cielo."`,
	act_7_59_obj: { book: "acts", chapter: 7, verse: 59, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	act_7_59_str: `Act 7:59. They stoned Stephen as he called out, saying, "Lord Jesus, receive my spirit!"`,
	act_10_41_obj: { book: "acts", chapter: 10, verse: 41, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	act_10_41_str: `Act 10:41. No á todo el pueblo, sino á los testigos que Dios antes había ordenado, es á saber, á nosotros que comimos y bebimos con él, después que resucitó de los muertos.`,
	act_13_36_obj: { book: "acts", chapter: 13, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	act_13_36_str: `Act 13:36. For David, after he had in his own generation served the counsel of God, fell asleep, was laid with his fathers, and saw decay.`,
	act_24_15_obj: { book: "acts", chapter: 24, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	act_24_15_str: `Act 24:15. Teniendo esperanza en Dios que ha de haber resurrección de los muertos, así de justos como de injustos, la cual también ellos esperan.`,
	rom_6_9_obj: { book: "romans", chapter: 6, verse: 9, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	rom_6_9_str: `Rom 6:9. Sabiendo que Cristo, habiendo resucitado de entre los muertos, ya no muere: la muerte no se enseñoreará más de él.`,
	_1co_15_22_obj: { book: "1_corinthians", chapter: 15, verse: 22, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1co_15_22_str: `1Co 15:22. Porque así como en Adam todos mueren, así también en Cristo todos serán vivificados.`,
	_1co_15_42_obj: { book: "1_corinthians", chapter: 15, verse: 42, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1co_15_42_str: `1Co 15:42. Así también es la resurrección de los muertos. Se siembra en corrupción se levantará en incorrupción;`,
	_1co_15_49_obj: { book: "1_corinthians", chapter: 15, verse: 49, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1co_15_49_str: `1Co 15:49. Y como trajimos la imagen del terreno, traeremos también la imagen del celestial.`,
	_2co_5_8_obj: { book: "2_corinthians", chapter: 5, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_2co_5_8_str: `2Co 5:8. We are courageous, I say, and are willing rather to be absent from the body and to be at home with the Lord.`,
	_2co_12_4_obj: { book: "2_corinthians", chapter: 12, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_2co_12_4_str: `2Co 12:4. how he was caught up into Paradise, and heard unspeakable words, which it is not lawful for a man to utter.`,
	phl_1_23_obj: { book: "philippians", chapter: 1, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	phl_1_23_str: `Phl 1:23. But I am hard pressed between the two, having the desire to depart and be with Christ, which is far better.`,
	phl_3_21_obj: { book: "philippians", chapter: 3, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	phl_3_21_str: `Phl 3:21. El cual transformará el cuerpo de nuestra bajeza, para ser semejante al cuerpo de su gloria, por la operación con la cual puede también sujetar á sí todas las cosas.`,
	col_1_15_obj: { book: "colossians", chapter: 1, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", },
	col_1_15_str: `Col 1:15. Cristo es la imagen visible de Dios, que es invisible; es su Hijo primogénito, anterior a todo lo creado.`,
	_1th_4_14_obj: { book: "1_thessalonians", chapter: 4, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1th_4_14_str: `1Th 4:14. For if we believe that Jesus died and rose again, even so God will bring with him those who have fallen asleep in Jesus.`,
	_1ti_5_6_obj: { book: "1_timothy", chapter: 5, verse: 6, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1ti_5_6_str: `1Ti 5:6. But she who gives herself to pleasure is dead while she lives. `,
	_2ti_2_18_obj: { book: "2_timothy", chapter: 2, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NTV", },
	_2ti_2_18_str: `2Ti 2:18. Ellos han abandonado el camino de la verdad al afirmar que la resurrección de los muertos ya ocurrió; de esa manera, desviaron de la fe a algunas personas.`,
	heb_1_14_obj: { book: "hebrews", chapter: 1, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_1_14_str: `Heb 1:14. Aren’t they all serving spirits, sent out to do service for the sake of those who will inherit salvation?`,
	heb_7_16_obj: { book: "hebrews", chapter: 7, verse: 16, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", },
	heb_7_16_str: `Heb 7:16. que no fue sacerdote según una ley que toma en cuenta elementos puramente humanos, sino según el poder de una vida indestructible.`,
	heb_7_25_obj: { book: "hebrews", chapter: 7, verse: 25, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_7_25_str: `Heb 7:25. Por lo cual puede también salvar eternamente á los que por él se allegan á Dios, viviendo siempre para interceder por ellos.`,
	heb_9_12_obj: { book: "hebrews", chapter: 9, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_9_12_str: `Heb 9:12. Y no por sangre de machos cabríos ni de becerros, mas por su propia sangre, entró una sola vez en el santuario, habiendo obtenido eterna redención.`,
	heb_9_27_obj: { book: "hebrews", chapter: 9, verse: 27, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_9_27_str: `Heb 9:27. Y de la manera que está establecido á los hombres que mueran una vez, y después el juicio;`,
	heb_9_28_obj: { book: "hebrews", chapter: 9, verse: 28, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_9_28_str: `Heb 9:28. so Christ also, having been offered once to bear the sins of many, will appear a second time, without sin, to those who are eagerly waiting for him for salvation.`,
	heb_10_12_obj: { book: "hebrews", chapter: 10, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_10_12_str: `Heb 10:12. Pero éste, habiendo ofrecido por los pecados un solo sacrificio para siempre, está sentado á la diestra de Dios,`,
	heb_12_23_obj: { book: "hebrews", chapter: 12, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	heb_12_23_str: `Heb 12:23. to the festal gathering and assembly of the firstborn who are enrolled in heaven, to God the Judge of all, to the spirits of just men made perfect,`,
	heb_13_8_obj: { book: "hebrews", chapter: 13, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", },
	heb_13_8_str: `Heb 13:8.  Jesucristo es el mismo ayer, hoy y siempre.`,
	_1pe_3_19_obj: { book: "1_peter", chapter: 3, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1pe_3_19_str: `1Pe 3:19. in whom he also went and preached to the spirits in prison, `,
	_2pe_3_13_obj: { book: "2_peter", chapter: 3, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_2pe_3_13_str: `2Pe 3:13. But, according to his promise, we look for new heavens and a new earth, in which righteousness dwells.`,
	_1jo_3_2_obj: { book: "1_john", chapter: 3, verse: 2, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	_1jo_3_2_str: `1Jo 3:2. Muy amados, ahora somos hijos de Dios, y aun no se ha manifestado lo que hemos de ser; pero sabemos que cuando él apareciere, seremos semejantes á él, porque le veremos como él es.`,
	rev_6_10_obj: { book: "revelation", chapter: 6, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	rev_6_10_str: `Rev 6:10. They cried with a loud voice, saying, "How long, Master, the holy and true, until you judge and avenge our blood on those who dwell on the earth?"`,
	rev_14_13_obj: { book: "revelation", chapter: 14, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	rev_14_13_str: `Rev 14:13. I heard a voice from heaven saying, "Write, ‘Blessed are the dead who die in the Lord from now on.’" "Yes," says the Spirit, "that they may rest from their labors; for their works follow with them."`,
	rev_1_18_obj: { book: "revelation", chapter: 1, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", },
	rev_1_18_str: `Rev 1:18. y el que vive. Estuve muerto, pero ahora vivo para siempre. Yo tengo las llaves del reino de la muerte.`,
	rev_20_13_obj: { book: "revelation", chapter: 20, verse: 13, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	rev_20_13_str: `Rev 20:13. The sea gave up the dead who were in it. Death and Hades gave up the dead who were in them. They were judged, each one according to his works.`,
	rev_21_1_obj: { book: "revelation", chapter: 21, verse: 1, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", },
	rev_21_1_str: `Rev 21:1. I saw a new heaven and a new earth: for the first heaven and the first earth have passed away, and the sea is no more.`,
};

function init_es_exam_msg(){
	let bibref = {};
	let rnam = null;	

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
	lg.q4_1__physical = `Seleccione todos los versiculos que soportan una resurrección física de Jesucristo`;
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
	lg.q5_1__not_die = `Seleccione todos los versiculos que soportan una resurrección de Jesucristo para NO VOLVER a morir`;
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
	lg.q6_1__in_heaven = `Seleccione todos los versiculos que soportan un Jesucristo RESUCITADO que esta en los cielos en CUERPO y Espíritu.`;
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
	lg.q7_1__like_jesus = `Seleccione todos los versiculos que soportan una resurrección de los muertos semejante a la resurrección de Jesucristo`;
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
	lg.q8_1__for_all = `Seleccione todos los versiculos que soportan una resurrección de los muertos que es para TODOS`;
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
	lg.q9_1__not_yet = `Seleccione todos los versiculos que soportan una resurrección de los muertos que NO ha sucedido para casi NADIE`;
	lg.q9_1__verse1_str = uppercase_words_in_string(rf.jhn_6_39_str, ["día", "final.", ]);
	lg.q9_1__verse1_href = rf.jhn_6_39_href;
	lg.q9_1__verse1_should = "Es el en DIA FINAL";
	lg.q9_1__verse2_str = uppercase_words_in_string(rf._2ti_2_18_str, ["desviaron", "ocurrió;", "past,"]);
	lg.q9_1__verse2_href = rf._2ti_2_18_href;
	lg.q9_1__verse2_should = "No ha OCURRIDO";
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
	
	// ============= TRADUCIENDO		

	/*
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${href_not_yet_resu}'>Has NOT happend</a>`;
	lg.q9_1__not_yet = `Select all verses that support a resurrection of the dead that has NOT happend for almost ANYBODY`;
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
	*/
	
	/*
	lg.q10_1__has_for_few_sec = `<a class='exam_ref exam_title' href='${href_only_few_resu}'>Only for few</a>`;
	lg.q10_1__has_for_few = `1st quest ONLY FOR FEW`;
	lg.q10_1__go = "Go";
	lg.q10_1__stay = "Stay";
	*/
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${href_new_earth_resu}'>New Earth</a>`;
	lg.q11_1__new_earth = `Select all verses that support a resurrection of the dead to live in a NEW EARTH with a new heavens`;
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
	lg.q12_1__sleep = `Select all verses that support that physically dead people DO HAVE CONSCIOUSNESS before resurrected.`;
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
	<p> When arguing against SPIRIT (NOT soul) <a class='exam_ref' href='${href_sleeping}'>sleep</a> always remember that the whole bible refers to the dead as <a class='exam_ref' href='${href_sleeping}'>SLEEP</a>, specially our Lord Jesus Christ. The reason is obvious: NO <a class='exam_ref' href='${href_sleeping}'>sleeping</a> person has CONSCIOUSNESS. That is the most prominent characteristic of a <a class='exam_ref' href='${href_sleeping}'>sleeping</a> person. Please read the section introducing the biblical concept of SPIRIT <a class='exam_ref' href='${href_sleeping}'>sleep</a>. </p>`;
	
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
	<p> The most important thing to note about this verse is that they were physically present, they all have BODIES, and that is why Peter, in <a class='exam_ref' href=${rf.mat_17_4_href}>verse 4</a>, offers to build three tents. Two tents for Moses and Elijah and one for Our Lord. They where in the Jewish festival of Sukkot. The feast of Tabernacles. Very appropiate signal to show that these "tabernacles" are going to be replaced by permanent "houses". </p>
	${q12_1__response_END}
	`;
	
	const q12_1__response_144000 = `<p>This verse refers to the 144.000. Please read the section <a class='exam_ref' href='${href_144000}'>144.000</a> of the completely FREE book TodaCarne.com.	Another section that could help is the one called <a class='exam_ref' href='${href_eternal_abhorrence}'>Eternal Abhorrence</a>.</p>
	<p> The most important thing to note about this verse is that it refers to people that have been resurrected. The Saints. The Great ones. The first fruits. The firstborn. The ones God brings with Jesus Christ. They are a FEW: 144.000 male genetic descendants of Israel when completed. They all have BODIES, and that is why they can actually CRY, SPEAK, GATHER and ASSEMBLY.</p>`;
	
	
	lg.q12_1__response_to_verse3 = `<a class='exam_ref' href=${rf.rev_6_10_href}>Rev 6:10</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse4 = `<a class='exam_ref' href=${rf.heb_12_23_href}>Heb 12:23</a> ${q12_1__response_INTRO} 
	${q12_1__response_144000}
	${q12_1__response_END}`;
	
	
	lg.q12_1__response_to_verse5 = `<a class='exam_ref' href=${rf.luk_16_24_href}>Luk 16:24</a> ${q12_1__response_INTRO}
	<p>This verse is part of the famous PARABLE in Luke. Please read the section called <a class='exam_ref' href='${href_rich_and_laza}'>The rich and the poor Lazarus.</a> of the completely FREE book TodaCarne.com.</p>
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
	
	const q12_1__response_spiritually_dead = `<p> This verse refers to spiritually dead people. Please read the sections called <a class='exam_ref' href='${href_life}'>Life</a>, <a class='exam_ref' href='${href_death}'>Death</a>, and <a class='exam_ref' href='${href_liberator}'>Liberator</a> of the completely FREE book TodaCarne.com.</p>`;
	
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
	<p> This verse refers to PHYSICALLY alive people to worship in spirit and in truth.
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf.heb_1_14_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>Heb 1:14</a> ${q12_1__response_INTRO}
	<p>This verse refers to angels as spirits. The bible refers to any physically living person as a spirit. Please read the sections <a class='exam_ref' href='${href_angels}'>Angels</a> and <a class='exam_ref' href='${href_wings}'>Wings</a> of the completely FREE book TodaCarne.com.</p>
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
	The prohibition in the Old Testament for people to speak to the dead is to prevent them from speaking to Celestial Powers, commonly known in the New Testament as DEMONS, that will pretend to be the dead person to decieve the one trying to communicate with the dead.
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	rnam = get_verse_reponse_name("q12_1__", rf._1th_4_14_obj);
	lg[rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>1Th 4:14</a> ${q12_1__response_INTRO}
	${q12_1__response_144000}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;	
	
	lg.q13_1__sleep = `Select all verses that support that dead people do NOT have CONSCIOUSNESS until resurrected.`;
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

