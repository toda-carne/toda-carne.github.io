
import { gvar, uppercase_words_in_string, } from '../../code/bq_tools.js';

import { init_en_poll_txt, } from './en_text.js';

"use strict";

export function init_module_text(){
	init_es_poll_txt();
}

export function init_es_poll_txt(){
	init_en_poll_txt();
	
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let rnam = null;	
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	lg.qmodu_title = `Resurreccion biblica?`;
	
	lg.a_simple_YES = `SI`;
	lg.a_simple_NO = `NO`;	


	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${hb.href_physical_resu}'>Física</a>`;
	lg.q_jesus_physical = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> física de Jesucristo`;
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
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${hb.href_not_die_resu}'>Para NO volver a morir</a>`;
	lg.q_jesus_not_die = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo para NO VOLVER a morir`;
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
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${hb.href_in_heaven_resu}'>En los cielos</a>`;
	lg.q6_1__in_heaven = `Seleccione todos los versiculos que soportan un Jesucristo <a class='exam_ref' href='${hb.href_resurrection}'>RESUCITADO</a> que esta en los cielos en CUERPO y Espíritu.`;
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
	
	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Como Jesucristo</a>`;
	lg.q7_1__like_jesus = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos semejante a la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo`;
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
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${hb.href_for_all_resu}'>Para Todos</a>`;
	lg.q8_1__for_all = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos que es para TODOS`;
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
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${hb.href_not_yet_resu}'>NO ha sucedido</a>`;
	lg.q9_1__not_yet = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos que NO ha sucedido para casi NADIE`;
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
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${hb.href_new_earth_resu}'>Tierra Nueva</a>`;
	lg.q11_1__new_earth = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos para vivir en una TIERRA NUEVA con unos cielos nuevos`;
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
	
	
}

