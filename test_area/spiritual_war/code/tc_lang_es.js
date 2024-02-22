
"use strict";

const book2num_es = {};

const msg_ok = "ACEPTAR";
const msg_del = "BORRAR";
const msg_range = "RANGO";
const msg_any = "CUALQUIERA";
const msg_end_ans = "TERMINAR RESPUESTA";
const msg_edit_ans = "CAMBIAR RESPUESTA";

const msg_add_verse = "AGREGAR VERSICULO";
const msg_add_strong = "AGREGAR CODIGO STRONG";
const msg_add_link = "AGREGAR ENLACE WEB";

const msg_def_book = "LIBRO";
const msg_def_strong = "CODIGO STRONG";
const msg_def_link_name = "ENLACE WEB";

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

fill_reversed_object(num2book_es, book2num_es);

const glb_exam_language = "es";
const glb_all_books = num2book_es;
const glb_all_bibles = bibles_es;
const glb_books_nums = book2num_es;

const msg_for_all_biological_machines = "Para todas las maquina biológicas observadas en plantas, animales y personas:";
const msg_there_is_a_creator = "Hay un CREADOR";
const msg_there_is_no_creator = "NO hay un creador";
const msg_i_do_not_know_if_there_is_creator = "NO SE si hay un creador";
const msg_i_do_not_care_if_there_is_creator = "No me IMPORTA si hay un creador";
const msg_it_is_impossible_to_know_if_there_is_creator = "Es imposible saber si hay un creador";

const msg_the_creator_for_all_biological_machines = "El creador para todas las maquinas biologicas observadas en plantas, animales y personas:";
const msg_the_creator_has_technical_creativity = "Es inteligente, diseñador y tiene creatividad técnica.";
const msg_the_creator_has_no_technical_creativity = "NO es inteligente, o NO es diseñador, o NO tiene creatividad técnica.";

 
