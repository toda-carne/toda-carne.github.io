
import { init_get_msg, init_all_glb, fill_reversed_object, init_en_module, get_dispute_msg } from '../code/tc_lang_all.js';

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
	
}

export function init_es_module(){
	init_en_module();
	init_es_basic_msg();
	
	console.log("Called init_es_module");
	
	init_get_msg(all_es_msg);
	
	num2book_es["-1"] = all_es_msg.msg_def_book;
	fill_reversed_object(num2book_es, book2num_es);
	
	init_es_exam_msg();
	
	init_all_glb("es", num2book_es, bibles_es, book2num_es, all_es_msg);
}

//init_es_module();

function init_es_exam_msg(){

	const href_creator_tit = "../es/book.html#creador_DOT_";
	const href_tch_crea = "../es/book.html#creatividad-técnica_DOT_";
	const href_tch_cplx = "../es/book.html#complejidad-técnica_DOT_";
	const href_factories = "../es/book.html#fábricas_DOT_";
	const href_biology = "../es/book.html#biología_DOT_";
	const href_creator = "../es/book.html#creador_DOT_-1";
	const href_evidence = "../es/book.html#evidencia_DOT_";
	const href_reproduction_tit = "../es/book.html#reproducción_DOT_";
	const href_reproduction = "../es/book.html#reproducción_DOT_";
	const href_resurrection = "../es/book.html#resurrección_DOT_";
	const href_resurrection_tit = "../es/book.html#resurrección_DOT_";
	
	const lg = all_es_msg;
	lg.q0_1__end_of_test = "Este cuestionario no es para usted. Aqui termina el examen para usted, a menos que no fuera la respuesta que queria decir. Hagale clik a su respuesta para cambiarla.";
	lg.q0_2__contradiction = "Usted tiene una contradiccion en sus respuestas. Por favor cambie una de las respuestas en rojo. La contradiccion está en una de ellas. De otra manera no puede continuar con el cuestionario. Hagale clik a su respuesta para cambiarla.";
	lg.q0_3__end_so_far = "Este cuestionario está en construcción. Este es el final del cuestionario por el momento...";
	lg.q0_4__about_beliefs = "<b>Todas estas preguntas son sobre lo que usted cree, NO sobre lo que usted cree tener certeza. Algunas preguntas son para evitar que se haga el tonto. Conteste todas apropiadamente. Usted puede cambiar cualquier respuesta en cualquier momento haciendole clik a la respuesta.</b>";
	
	lg.q1_1__are_you_reasonable = "Estas preguntas son para personas racionales y razonables.";
	lg.q1_1__yes = "Yo soy una persona racional y razonable.";
	lg.q1_1__no = "Yo NO soy una persona racional y razonable.";
	
	lg.q1_2__experience_is_evidence = "Una afirmacion que la mayoria de las personas puede ver, oir, oler, degustar, tocar, oconfirmar por experiencia perceptual, ";
	lg.q1_2__yes = "ES evidencia.";
	lg.q1_2__no = "NO es evidencia";

	lg.q1_21__creator_section = `<a class='exam_ref exam_title' href='${href_creator_tit}'>Creador</a>`;
	
	lg.q1_3__are_humans_intelligent = `Con respecto a la <a class='exam_ref' href='${href_tch_crea}'>creatividad técnica</a>, hay <a class='exam_ref' href='${href_evidence}'>evidencia</a> que el ser humano `;
	lg.q1_3__yes = "es inteligente, diseñador y tiene creatividad técnica.";
	lg.q1_3__should = "EVIDENCIA son todos los edificios, transistores, automóviles, satélites, neveras, lavadoras, pulidoras, retroescabadoras, máquinas que hacen máquinas, fábricas que usan máquinas hechas por otras fábricas, que ha hecho el hombre";
	lg.q1_3__no = "NO es inteligente, o NO es diseñador, o NO tiene creatividad técnica.";
	
	lg.q1_31__all_biological_machines = "Toda la maquinaria biologica observada en plantas, animales y personas:";
	lg.q1_31__creator = "fueron hechas por un CREADOR";
	lg.q1_31__other = "son el resultado de OTRA causa, NO de un creador";

	
}

