
import { init_get_msg, fill_reversed_object, bib_defaults, fill_bibrefs_href, 
	fill_all_strongrefs_href, get_verse_cit_key, 
} from '../code/bq_tools.js';

"use strict";

// ===============================

const all_es_msg = {};
const book_es_hrefs = {};
const all_es_bibrefs = {};

const book2num_es = {};
const all_es_poll_txt = {};

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

const countries_es = {
	"1":"Afganistán",
	"2":"Albania",
	"3":"Alemania",
	"4":"Andorra",
	"5":"Angola",
	"6":"Antigua y Barbuda",
	"7":"Arabia Saudita",
	"8":"Argelia",
	"9":"Argentina",
	"10":"Armenia",
	"11":"Australia",
	"12":"Austria",
	"13":"Azerbaiyán",
	"14":"Bahamas",
	"15":"Bahréin",
	"16":"Bangladesh",
	"17":"Barbados",
	"18":"Bélgica",
	"19":"Belice",
	"20":"Benín",
	"21":"Bielorrusia",
	"22":"Bolivia",
	"23":"Bosnia y Herzegovina",
	"24":"Botsuana",
	"25":"Brasil",
	"26":"Brunéi",
	"27":"Bulgaria",
	"28":"Burkina Faso",
	"29":"Burundi",
	"30":"Bután",
	"31":"Cabo Verde",
	"32":"Camboya",
	"33":"Camerún",
	"34":"Canadá",
	"35":"Catar",
	"36":"Chad",
	"37":"Chile",
	"38":"China",
	"39":"Chipre",
	"40":"Ciudad del Vaticano",
	"41":"Colombia",
	"42":"Comoras",
	"43":"Congo, República del",
	"44":"Congo, República Democrática del",
	"45":"Corea del Norte",
	"46":"Corea, Sur",
	"47":"Costa de Marfil",
	"48":"Costa Rica",
	"49":"Croacia",
	"50":"Cuba",
	"51":"Dinamarca",
	"52":"Dominica",
	"53":"Ecuador",
	"54":"Egipto",
	"55":"Emiratos Árabes Unidos",
	"56":"Eritrea",
	"57":"Eslovaquia",
	"58":"Eslovenia",
	"59":"España",
	"60":"Estados Unidos",
	"61":"Estonia",
	"62":"Esuatini",
	"63":"Etiopía",
	"64":"Filipinas",
	"65":"Finlandia",
	"66":"Fiyi",
	"67":"Francia",
	"68":"Gabón",
	"69":"Gambia",
	"70":"Georgia",
	"71":"Ghana",
	"72":"Granada",
	"73":"Grecia",
	"74":"Guatemala",
	"75":"Guayana",
	"76":"Guinea",
	"77":"Guinea-Bisáu",
	"78":"Guinea Ecuatorial",
	"79":"Haití",
	"80":"Honduras",
	"81":"Hungría",
	"82":"India",
	"83":"Indonesia",
	"84":"Irak",
	"85":"Irán",
	"86":"Irlanda",
	"87":"Islandia",
	"88":"Islas Marshall",
	"89":"Islas Salomón",
	"90":"Israel",
	"91":"Italia",
	"92":"Jamaica",
	"93":"Japón",
	"94":"Jordán",
	"95":"Kazajstán",
	"96":"Kenia",
	"97":"Kirguistán",
	"98":"Kiribati",
	"99":"Kosovo",
	"100":"Kuwait",
	"101":"Laos",
	"102":"Lesotho",
	"103":"Letonia",
	"104":"Líbano",
	"105":"Liberia",
	"106":"Libia",
	"107":"Liechtenstein",
	"108":"Lituania",
	"109":"Luxemburgo",
	"110":"Macedonia del Norte",
	"111":"Madagascar",
	"112":"Malasia",
	"113":"Malawi",
	"114":"Maldivas",
	"115":"Malí",
	"116":"Malta",
	"117":"Marruecos",
	"118":"Mauricio",
	"119":"Mauritania",
	"120":"México",
	"121":"Micronesia, Estados Federados de",
	"122":"Moldavia",
	"123":"Mónaco",
	"124":"Mongolia",
	"125":"Montenegro",
	"126":"Mozambique",
	"127":"Myanmar (Birmania)",
	"128":"Namibia",
	"129":"Nauru",
	"130":"Nepal",
	"131":"Nicaragua",
	"132":"Níger",
	"133":"Nigeria",
	"134":"Noruega",
	"135":"Nueva Zelanda",
	"136":"Omán",
	"137":"Países Bajos",
	"138":"Pakistán",
	"139":"Palau",
	"140":"Panamá",
	"141":"Papúa Nueva Guinea",
	"142":"Paraguay",
	"143":"Perú",
	"144":"Polonia",
	"145":"Portugal",
	"146":"Reino Unido",
	"147":"República Centroafricana",
	"148":"República Checa",
	"149":"República Dominicana",
	"150":"Ruanda",
	"151":"Rumania",
	"152":"Rusia",
	"153":"Salvador",
	"154":"Samoa",
	"155":"San Cristóbal y Nieves",
	"156":"San Marino",
	"157":"Santa Lucía",
	"158":"Santo Tomé y Príncipe",
	"159":"San Vicente y las Granadinas Granadinas",
	"160":"Senegal",
	"161":"Serbia",
	"162":"Seychelles",
	"163":"Sierra Leona",
	"164":"Singapur",
	"165":"Siria",
	"166":"Somalia",
	"167":"Sri Lanka",
	"168":"Sudáfrica",
	"169":"Sudán",
	"170":"Sudán del Sur",
	"171":"Suecia",
	"172":"Suiza",
	"173":"Surinam",
	"174":"Tailandia",
	"175":"Taiwán",
	"176":"Tanzania",
	"177":"Tayikistán",
	"178":"Timor Oriental (Timor Oriental)",
	"179":"Togo",
	"180":"Tonga",
	"181":"Trinidad y Tobago",
	"182":"Túnez",
	"183":"Turkmenistán",
	"184":"Turquía",
	"185":"Tuvalu",
	"186":"Ucrania",
	"187":"Uganda",
	"188":"Uruguay",
	"189":"Uzbekistán",
	"190":"Vanuatu",
	"191":"Venezuela",
	"192":"Vietnam",
	"193":"Yemen",
	"194":"Yibuti",
	"195":"Zambia",
	"196":"Zimbabue",
};

const country_id_names_es = {
	"41":"Cedula", // Colombia
	"60":"Id", // United States
};

const marital_es = {
	"1":"Nunca casado",
	"2":"Soltero",
	"3":"Casado",
	"4":"Divorciado",
	"5":"Separado",
	"6":"Viudo",
};

const sex_es = {
	"1":"Hombre",
	"2":"Mujer",
};

function init_es_basic_msg(){
	const obj = all_es_msg;
	
	obj.msg_qmodu_loading = "cargando";
	obj.msg_qmodu_all_finished = "Todos los modulos terminados";
	obj.msg_qmodu_improve_one = "Escoja un modulo a mejorar";
	
	obj.msg_guest = "Invitado";
	
	obj.msg_ok = "ACEPTAR";
	obj.msg_del = "BORRAR";
	obj.msg_range = "RANGO";
	obj.msg_any = "CUALQUIERA";
	obj.msg_invert_ans = "INVERTIR RESPUESTA";
	obj.msg_end_ans = "TERMINAR RESPUESTA";
	obj.msg_edit_ans = "CAMBIAR RESPUESTA";
	obj.msg_understood = "ENTENDIDO";
	obj.msg_yes = "SI";
	obj.msg_no = "NO";
	obj.msg_you = "Ud.";
	obj.msg_all = "Todos";
	obj.msg_final_obs_html = "Terminaste";
	obj.msg_final_obs_name = "Tipo de final";
	obj.msg_citation_obs_html = "Observación de cita biblica";
	obj.msg_citation_obs_name = "Observación de cita biblica";
	
	obj.msg_undo = "<i class='has_icons icon-undo'></i> Ups!";	

	obj.msg_sel_cit = "ESCOGER DE BD";
	obj.msg_add_verse = "AGREGAR VERSICULO";
	obj.msg_add_strong = "AGREGAR CODIGO STRONG";
	obj.msg_add_link = "AGREGAR ENLACE WEB";
	obj.msg_end_edit = "TERMINAR EDICION";
	obj.msg_save = "GUARDAR";
	
	obj.msg_def_book = DEFAULT_BOOK_NAME;
	obj.msg_def_strong = "CODIGO STRONG";
	obj.msg_def_link_name = "ENLACE WEB";
	
	obj.msg_save_in_browser = "EN NAVEGADOR";
	obj.msg_save_in_cloud = "EN SiBiblia.com";
	
	obj.msg_open_from_browser = "DEL NAVEGADOR";
	obj.msg_open_from_cloud = "DE SiBiblia.com";
	
	obj.msg_new_answers_name = "NUEVO";

	obj.msg_fb_answers_name = "Resultados guardados en SiBiblia.com";
	obj.msg_fb_answers_writing = "Guardando...";
	obj.msg_fb_answers_reading = "Abriendo...";
	obj.msg_fb_no_internet = "Sin conexion a internet.";
	obj.msg_fb_not_finished = "Por favor complete el cuestionario para guardar los resultados";
	
	const loggin_str = `por favor asegurate de hacer login en google.com y luego haz click en el icono superior <br>
	<img id="id_top_user_picture" class="img_user" src="../img/user.jpg">`;

	obj.msg_write_results_not_signed_in = `Felicitaciones ! Terminaste este modulo. 
		Para obtener un link personal, un codigo QR y participar en el concurso ${loggin_str}`;

	obj.msg_write_results_signed_in = `Felicitaciones ! Terminaste este modulo.`;

	obj.msg_rewrite_results_not_signed_in = `Has terminado este modulo mas de una vez. 
		Si quieres escribir de nuevo tus resultados en las estadísticas, ${loggin_str}`;

	obj.msg_rewrite_results_signed_in = `Has terminado este modulo mas de una vez. 
		Quieres escribir de nuevo tus resultados en las estadísticas?`;

	obj.msg_results = `Estos son tus resultados comparados con otros:`;
		
	obj.msg_change_answer = `Para adicionar respuestas click en la respuesta actual y click en "${obj.msg_edit_ans}"`;
	obj.msg_caused_by_answers = "Esta observación se muestra por sus respuestas en las siguientes preguntas: ";
	obj.msg_caused_by_observations = "Esta observación se muestra por causa de estas otras observaciones:";
	obj.msg_to_get_rid = `Para desaherse de esta observacion cambie una o mas respuestas que esten causando esta observación haciendo click sobre la respuesta y luego click en "${obj.msg_edit_ans}" o haciendo click en "${obj.msg_undo}" hasta llegar a la pregunta deseada.`;

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
	obj.msg_qref_observation_num = "observación número";
	
	obj.msg_logout = `<i class="has_icons icon-logout"></i> USUARIO SALIR`;
	obj.msg_google_name = "Nombre Google";
	obj.msg_google_photo = "Foto Google";
	obj.msg_google_email = "Email Google ";
	obj.msg_sibiblia_qr = "Su QR";
	obj.msg_sibiblia_link = "Su Enlace";
	obj.msg_sibiblia_id = "Su ID";
	obj.msg_sibiblia_photo = "Su foto";
	obj.msg_usr_nequi = "Nequi";
	obj.msg_usr_paypal = "Paypal email";
	obj.msg_usr_transfiya = "Transfiya";
	obj.msg_usr_url_photo = "URL a su foto";
	obj.msg_usr_country = "Pais";
	obj.msg_usr_country_id = "Cedula";
	obj.msg_usr_name = "Nombre";
	obj.msg_usr_sex = "Sexo";
	obj.msg_usr_birth_date = "Fecha nacimiento";
	obj.msg_usr_marital_status = "Estado civil";
	obj.msg_usr_divorce_num = "Num divorcios";
	obj.msg_usr_children_num = "Num hijos";
	obj.msg_usr_website = "Website";
	obj.msg_usr_facebook = "Facebook";
	obj.msg_usr_instagram = "Instagram";
	obj.msg_usr_youtube = "Youtube";
	
}

function ini_glb_vars_es(all_vars){
	all_vars.DEFAULT_BIB_HREF_SITE = "biblegateway";
	all_vars.DEFAULT_BIB_HREF_VERSION = "RVA";
	if(all_vars.has_qrefs == null){ all_vars.has_qrefs = {}; }
	if(all_vars.has_bibrefs == null){ all_vars.has_bibrefs = {}; }
	if(all_vars.bibrefs_upper == null){ all_vars.bibrefs_upper = {}; }
	
	all_vars.glb_exam_language = "es";
	all_vars.glb_all_countries = countries_es;
	all_vars.glb_all_marital = marital_es;
	all_vars.glb_all_sex = sex_es;
	all_vars.glb_all_id_names = country_id_names_es;
	all_vars.glb_def_country = "41";
	all_vars.glb_def_marital = "6";
	all_vars.glb_all_books = num2book_es;
	all_vars.glb_all_bibles = bibles_es;
	all_vars.glb_books_nums = book2num_es;
	all_vars.glb_curr_lang = all_es_msg;
	all_vars.glb_all_bibrefs = all_es_bibrefs;
	all_vars.glb_all_book_hrefs = book_es_hrefs;
	all_vars.glb_poll_txt = all_es_poll_txt;
	all_vars.glb_poll_db = {};
}

function init_es_module(all_vars){
	init_es_basic_msg();
	
	console.log("Called init_es_module");
	
	init_get_msg(all_es_poll_txt);
	init_es_bibrefs();
	init_es_book_hrefs();
	
	num2book_es["-1"] = all_es_msg.msg_def_book;
	fill_reversed_object(num2book_es, book2num_es);
	
	fill_bibrefs_href(all_es_bibrefs);
	fill_all_strongrefs_href();

	//const all_vars = {};
	ini_glb_vars_es(all_vars);
}

export function init_lang_module(all_vars){
	init_es_module(all_vars);
}

function init_es_bibrefs(){
	let cit_obj = null;
	let kk = null;
	const rf = all_es_bibrefs;
	// all '_href' terminated entries it will be filled with '_obj' terminated data when fill_bibrefs_href gets called
	cit_obj = 
	rf.gen_15_15_obj = { book: "genesis", chapter: 15, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Y tú vendrás á tus padres en paz, y serás sepultado en buena vejez.`;
	cit_obj = 
	rf.gen_25_8_obj = { book: "genesis", chapter: 25, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Y exhaló el espíritu, y murió Abraham en buena vejez, anciano y lleno de días y fué unido á su pueblo.`;	
	rf.gen_25_8_str = `Gen 25:8. Abraham gave up his spirit, and died at a good old age, an old man, and full of years, and was gathered to his people.`;
	rf.gen_35_29_obj = { book: "genesis", chapter: 35, verse: 29, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.gen_35_29_str = `Gen 35:29. Isaac gave up the spirit and died, and was gathered to his people, old and full of days. Esau and Jacob, his sons, buried him.`;
	rf.job_7_21_obj = { book: "job", chapter: 7, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.job_7_21_str = `Job 7:21. ¿Y por qué no quitas mi rebelión, y perdonas mi iniquidad? Porque ahora dormiré en el polvo, Y si me buscares de mañana, ya no seré.`;
	rf.job_14_12_obj = { book: "job", chapter: 14, verse: 12, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.job_14_12_str = `Job 14:12. Así el hombre yace, y no se tornará á levantar: Hasta que no haya cielo no despertarán, Ni se levantarán de su sueño.`;
	cit_obj = 
	rf.psa_16_11_obj = { book: "psalms", chapter: 16, verse: 11, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Me mostrarás la senda de la vida: Hartura de alegrías hay con tu rostro; Deleites en tu diestra para siempre.`;	
	rf.psa_115_17_obj = { book: "psalms", chapter: 115, verse: 17, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.psa_115_17_str = `Psa 115:17. No alabarán los muertos á JAH, Ni cuantos descienden al silencio;`;
	rf.ecc_9_10_obj = { book: "ecclesiastes", chapter: 9, verse: 10, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVR1960", };
	rf.ecc_9_10_str = `Ecc 9:10. Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas; porque en el Seol, adonde vas, no hay obra, ni trabajo, ni ciencia, ni sabiduría.`;
	rf.ecc_12_7_obj = { book: "ecclesiastes", chapter: 12, verse: 7, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.ecc_12_7_str = `Ecc 12:7. Y el polvo se torne á la tierra, como era, y el espíritu se vuelva á Dios que lo dió.`;
	cit_obj = 
	rf.isa_8_19_obj = { book: "isaiah", chapter: 8, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
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
	cit_obj = 
	rf.luk_15_24_obj = { book: "luke", chapter: 15, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Porque este mi hijo muerto era, y ha revivido; habíase perdido, y es hallado. Y comenzaron á regocijarse.`;
	rf.luk_16_24_obj = { book: "luke", chapter: 16, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_16_24_str = `Luk 16:24. Entonces él, dando voces, dijo: Padre Abraham, ten misericordia de mí, y envía á Lázaro que moje la punta de su dedo en agua, y refresque mi lengua; porque soy atormentado en esta llama.`;
	rf.luk_20_36_obj = { book: "luke", chapter: 20, verse: 36, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.luk_20_36_str = `Luk 20:36. Porque no pueden ya más morir: porque son iguales á los ángeles, y son hijos de Dios, cuando son hijos de la resurrección.`;
	cit_obj = 
	rf.luk_20_38_obj = { book: "luke", chapter: 20, verse: 38, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Porque Dios no es Dios de muertos, mas de vivos: porque todos viven á él.`;
	cit_obj = 
	rf.luk_23_43_obj = { book: "luke", chapter: 23, verse: 43, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
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
	cit_obj = 
	rf.jhn_4_24_obj = { book: "john", chapter: 4, verse: 24, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
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
	cit_obj = 
	rf.act_7_59_obj = { book: "acts", chapter: 7, verse: 59, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
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
	cit_obj = 
	rf._2co_5_8_obj = { book: "2_corinthians", chapter: 5, verse: 8, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Mas confiamos, y más quisiéramos partir del cuerpo, y estar presentes al Señor.`;
	cit_obj = 
	rf._2co_12_4_obj = { book: "2_corinthians", chapter: 12, verse: 4, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Que fué arrebatado al paraíso, donde oyó palabras secretas que el hombre no puede decir.`;
	cit_obj = 
	rf.phl_1_23_obj = { book: "philippians", chapter: 1, verse: 23, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Porque de ambas cosas estoy puesto en estrecho, teniendo deseo de ser desatado, y estar con Cristo, lo cual es mucho mejor:`;
	rf.phl_3_21_obj = { book: "philippians", chapter: 3, verse: 21, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
	rf.phl_3_21_str = `Phl 3:21. El cual transformará el cuerpo de nuestra bajeza, para ser semejante al cuerpo de su gloria, por la operación con la cual puede también sujetar á sí todas las cosas.`;
	rf.col_1_15_obj = { book: "colossians", chapter: 1, verse: 15, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "DHH", };
	rf.col_1_15_str = `Col 1:15. Cristo es la imagen visible de Dios, que es invisible; es su Hijo primogénito, anterior a todo lo creado.`;
	cit_obj = 
	rf._1th_4_14_obj = { book: "1_thessalonians", chapter: 4, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Porque de ambas cosas estoy puesto en estrecho, teniendo deseo de ser desatado, y estar con Cristo, lo cual es mucho mejor:`;
	cit_obj = 
	rf._1ti_5_6_obj = { book: "1_timothy", chapter: 5, verse: 6, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `Pero la que vive en delicias, viviendo está muerta.`;
	rf._2ti_2_18_obj = { book: "2_timothy", chapter: 2, verse: 18, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "NTV", };
	rf._2ti_2_18_str = `2Ti 2:18. Ellos han abandonado el camino de la verdad al afirmar que la resurrección de los muertos ya ocurrió; de esa manera, desviaron de la fe a algunas personas.`;
	cit_obj = 
	rf.heb_1_14_obj = { book: "hebrews", chapter: 1, verse: 14, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "LBLA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `¿No son todos ellos espíritus ministradores, enviados para servir por causa de los que heredarán la salvación?`;
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
	cit_obj = 
	rf._1pe_3_19_obj = { book: "1_peter", chapter: 3, verse: 19, last_verse: bib_defaults.LAST_VERSE, site: "biblegateway", bib_ver: "RVA", };
		kk = get_verse_cit_key(cit_obj) + "_str";
		rf[kk] = `En el cual también fué y predicó á los espíritus encarcelados;`;
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
}

function init_es_book_hrefs(){
	const tc_url = "https://toda-carne.github.io";	
	
	const hb = book_es_hrefs;
	hb.href_home = tc_url + "/es/index.html";
	hb.href_creator_tit = tc_url + "/es/book.html#creador_DOT_";
	hb.href_tch_crea = tc_url + "/es/book.html#creatividad-técnica_DOT_";
	hb.href_tch_cplx = tc_url + "/es/book.html#complejidad-técnica_DOT_";
	hb.href_biology = tc_url + "/es/book.html#biología_DOT_";
	hb.href_creator = tc_url + "/es/book.html#creador_DOT_-1";
	hb.href_evidence = tc_url + "/es/book.html#evidencia_DOT_";
	hb.href_reproduction_tit = tc_url + "/es/book.html#reproducción_DOT_";
	hb.href_reproduction = tc_url + "/es/book.html#reproducción_DOT_";
	hb.href_resurrection = tc_url + "/es/book.html#resurrección_DOT_";
	hb.href_resurrection_tit = tc_url + "/es/book.html#resurrección_DOT_";
	hb.href_physical_resu = tc_url + "/es/book.html#física_DOT_";
	hb.href_still_physical = tc_url + "/es/book.html#física_DOT_";
	hb.href_not_die_resu = tc_url + "/es/book.html#no-pueden-morir_DOT_";
	hb.href_in_heaven_resu = tc_url + "/es/book.html#en-el-cielo_DOT_";
	hb.href_like_jesus_resu = tc_url + "/es/book.html#física_DOT_";
	hb.href_for_all_resu = tc_url + "/es/book.html#para-todos_DOT_";
	hb.href_not_yet_resu = tc_url + "/es/book.html#no-ha-sucedido_DOT_";
	hb.href_only_few_resu = tc_url + "/es/book.html#no-ha-sucedido_DOT_";
	hb.href_new_earth_resu = tc_url + "/es/book.html#una-tierra-nueva_DOT_";
	hb.href_asleep = tc_url + "/es/book.html#dormiditos_DOT_";
	hb.href_the_cloth = tc_url + "/es/book.html#la-tela_DOT_";
	hb.href_angels = tc_url + "/es/book.html#ángeles_DOT_";
	hb.href_wings = tc_url + "/es/book.html#alas_DOT_";
	hb.href_creation = tc_url + "/es/book.html#creación_DOT_";
	hb.href_life = tc_url + "/es/book.html#vida_DOT_";
	hb.href_death = tc_url + "/es/book.html#muerte_DOT_";
	hb.href_liberator = tc_url + "/es/book.html#libertador_DOT_";
	hb.href_sleeping = tc_url + "/es/book.html#dormiditos_DOT_-1";
	hb.href_rich_and_laza = tc_url + "/es/book.html#el-rico-y-el-pobre-lázaro_DOT_";
	hb.href_144000 = tc_url + "/es/book.html#section";
	hb.href_eternal_abhorrence = tc_url + "/es/book.html#horror-eterno_DOT_";
	hb.href_factories = tc_url + "/es/book.html#fábricas_DOT_";	
}

