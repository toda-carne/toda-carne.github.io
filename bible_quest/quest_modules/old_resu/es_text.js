
import { bib_defaults, uppercase_words_in_string, all_strongrefs, get_verse_reponse_name, make_bible_ref, get_verse_cit_key, bib_obj_to_txt, 
	gvar, set_stm_bibref, set_href_bibcit, 
} from '../../code/bq_tools.js';

"use strict";

export function init_module_text(){
	init_es_poll_txt();
}

export function init_es_poll_txt(){
	let cit_obj = null;
	let cit_kk = null;
	let cit_ref = null;
	let cit_txt = null;
	let rnam = null;	
	
	gvar.working_bible = "RVA";
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	if(gvar.has_qrefs == null){ gvar.has_qrefs = {}; } 
	const qrf = gvar.has_qrefs;
	
	if(gvar.has_bibrefs == null){ gvar.has_bibrefs = {}; } 
	const brf = gvar.has_bibrefs;
	
	if(gvar.bibrefs_upper == null){ gvar.bibrefs_upper = {}; } 
	const brfup = gvar.bibrefs_upper;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	lg.q0_1__end_of_test = "Este cuestionario no es para usted. Aqui termina el examen para usted, a menos que no fuera la respuesta que queria decir. Hagale clik a su respuesta para cambiarla.";
	lg.q0_2__contradiction = "<b>Observación.</b> Parece que hay una inconsistencia en sus respuestas. Para cambiar una respuesta hagale click. ";
	lg.q0_3__end_so_far = "Este cuestionario está en construcción. Este es el final del cuestionario por el momento...";
	lg.q0_4__about_beliefs = "<b>Todas estas preguntas son sobre lo que usted cree, NO sobre lo que usted cree tener certeza. Algunas preguntas son para evitar que se haga el tonto. Conteste todas apropiadamente. Usted puede cambiar cualquier respuesta en cualquier momento haciendole clik a la respuesta.</b>";
	
	lg.q1_1__are_you_reasonable = "Estas preguntas son para personas racionales y razonables.";
	lg.q1_1__yes = "Yo soy una persona racional y razonable.";
	lg.q1_1__no = "Yo NO soy una persona racional y razonable.";
	
	lg.q1_2__experience_is_evidence = "Una afirmación que la mayoria de las personas puede ver, oir, oler, degustar, tocar, oconfirmar por experiencia perceptual, ";
	lg.q1_2__yes = "ES evidencia.";
	lg.q1_2__no = "NO es evidencia";

	lg.q1_3__creator_section = `<a class='exam_ref exam_title' href='${hb.href_creator_tit}'>Creador</a>`;
	lg.q1_3__are_humans_intelligent = `Con respecto a la <a class='exam_ref' href='${hb.href_tch_crea}'>creatividad técnica</a>, hay <a class='exam_ref' href='${hb.href_evidence}'>evidencia</a> que el ser humano `;
	lg.q1_3__yes = "es inteligente, diseñador y tiene creatividad técnica.";
	lg.q1_3__should = "EVIDENCIA son todos los edificios, transistores, automóviles, satélites, neveras, lavadoras, pulidoras, retroescabadoras, máquinas que hacen máquinas, fábricas que usan máquinas hechas por otras fábricas, que ha hecho el hombre";
	lg.q1_3__no = "NO es inteligente, o NO es diseñador, o NO tiene creatividad técnica.";
	
	lg.q1_31__all_biological_machines = "Toda la maquinaria biologica observada en plantas, animales y personas:";
	lg.q1_31__creator = "fueron hechas por un CREADOR";
	lg.q1_31__other = "son el resultado de OTRA causa, NO de un creador";

	lg.q1_32__the_creator = `La afirmación: 'Al igual que el ser humano, el CREADOR de toda la maquinaria biologica observada en plantas, animales y personas, es inteligente, diseñador y tiene <a class='exam_ref' href='${hb.href_tch_crea}'>creatividad técnica</a>'`;
	lg.q1_32__intelligent = "es verdadera.";
	lg.q1_32__not_intelligent = "es falsa.";
	
	lg.q1_33__the_evolution = `La afirmación: 'El creador uso la EVOLUCIÓN como un mecanismo para crear toda la <a class='exam_ref' href='${hb.href_factories}'>maquinaria biologica</a> observada en plantas, animales y personas'`;
	lg.q1_33__yes = "es verdadera.";
	lg.q1_33__no = "es falsa.";
	
	lg.q1_34__six_spins = "La afirmación: 'El creador de toda la maquinaria biológica observada en plantas, animales y personas, la creó en no mas de seis rotaciones del planeta sobre su eje, seis dias cronológicos'";
	lg.q1_34__yes = "es verdadera.";
	lg.q1_34__no = "es falsa.";
	
	lg.q1_35__skip_creator_proof = `Usted ahora puede escojer SALTARSE todas las preguntas para probar con evidencia y lógica la existencia de un creador de toda la maquinaria biológica, quiere saltarse las preguntas?`;
	lg.q1_35__yes = "Si, SALTAR las preguntas.";
	lg.q1_35__no = "No, dejeme CONTESTARLAS.";
	
	lg.q1_4__requires_technical_creativity = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${hb.href_tch_crea}'>creatividad técnica</a> que están soportadas por evidencia: `;
	lg.q1_4__knife = "reproducir un cuchillo requiere creatividad técnica";
	lg.q1_4__should1 = "un cuchillo es EVIDENCIA de la creatividad técnica del hombre";
	lg.q1_4__lamp = "reproducir una lámpara requiere creatividad técnica";
	lg.q1_4__should2 = "una lámpara es EVIDENCIA de la creatividad técnica del hombre";
	lg.q1_4__clock = "reproducir un reloj requiere creatividad técnica";
	lg.q1_4__should3 = "un reloj es EVIDENCIA de la creatividad técnica del hombre";
	
	lg.q1_5__more_complex_than = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${hb.href_tch_cplx}'>complejidad técnica</a> que están soportadas por evidencia: `;
	lg.q1_5__building_vs_knife = "un edificio tiene mas complejidad técnica que un cuchillo";
	lg.q1_5__should1 = "hablando de manera general un edificio es mas DIFICIL de hacer que un cuchillo, solo por el hecho de que usualmente se necesitan cuchillos para hacer edificios";
	lg.q1_5__car_vs_lamp = "un carro tiene mas complejidad técnica que una lámpara";
	lg.q1_5__should2 = "hablando de manera general un carro es mas DIFICIL de hacer que una lámpara, solo por el hecho de que los carros usualmente tienen lámparas";
	lg.q1_5__cellphone_vs_clock = "un celular tiene mas complejidad técnica que una reloj";
	lg.q1_5__should3 = "hablando de manera general un celular es mas DIFICIL de hacer que un reloj, solo por el hecho de que los celulares usualmente tienen un reloj incorporado en sus funcionalidades";
	
	lg.q1_7__more_complexity_then_more_creativity = `Dada toda la experiencia perceptible normal, la afirmación: "entre mayor sea la <a class='exam_ref' href='${hb.href_tch_cplx}'>complejidad técnica</a> de un objeto o máquina, ENTONCES, se necesita más <a class='exam_ref' href='${hb.href_tch_crea}'>creatividad técnica</a> para reproducirlo"`;
	lg.q1_7__yes = "Es verdadera.";
	lg.q1_7__no = "Es falsa.";
	
	lg.q1_8__more_creativity = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${hb.href_tch_crea}'>creatividad técnica</a> que están soportadas por evidencia: `;
	lg.q1_8__building_vs_knife = "se requiere mas creatividad técnica para reproducir un edificio que para reproducir un cuchillo";
	lg.q1_8__car_vs_lamp = "se requiere mas creatividad técnica para reproducir un carro que para reproducir una lámpara";
	lg.q1_8__cellphone_vs_clock = "se requiere mas creatividad técnica para reproducir un celular que para reproducir un reloj";
	
	lg.q1_9__coplexity_of_biological_machines = `Seleccione TODAS las afirmaciones soportadas por la experiencia perceptual normal acerca de la maquinaria y las <a class='exam_ref' href='${hb.href_factories}'>fábricas</a> hechas por el hombre comparadas con la <a class='exam_ref' href='${hb.href_biology}'>maquinaria biológica</a>: `;
	lg.q1_9__car_vs_mitosis = "NO observamos en CARROS que uno de estos inicie un proceso en el cual se divida en dos carros idénticos al original, ni lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la MITOSIS de maquinas biológicas como la CELULA.";
	lg.q1_9__smartphone_vs_sex = "NO observamos en CELULARES que un celular macho se una con un celular hembra, y despues de un tiempo, un tercer celular mas pequeño salga de la hembra, que se parece a una mescla de los dos primeros, y que con el tiempo crece en tamaño, tampoco lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la reproducción SEXUAL de maquinas biológicas como el CUERPO HUMANO.";
	lg.q1_9__bicycle_vs_healing = "NO observamos en BICICLETAS que cuando una se choca y se daña su superficie, en unos dias la bicicleta haya reparado su superficie, ni lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la SANACION de heridas en maquinas biológicas como la PIEL de animales.";
	lg.q1_9__knife_vs_regeneration = "NO observamos en CUCHILLOS que cuando se parte y pierde la punta, en unos dias haya crecido una nueva punta, ni lo observamos en ninguna otra máquina hecha por el hombre, sin embargo observamos dicho proceso en la REGENERACION de maquinas biológicas como la COLA de algunas iguanas.";
	
	lg.q1_91__more_complexity_in_biology = `Dada toda la experiencia perceptible normal, la afirmación: "las <a class='exam_ref' href='${hb.href_biology}'>maquinas biológicas</a> tienen mayor <a class='exam_ref' href='${hb.href_tch_cplx}'>complejidad técnica</a> que las maquinas hechas por el ser humano"`;
	lg.q1_91__yes = "Es cierta.";
	lg.q1_91__no = "Es falsa.";
	
	lg.q1_92__human_complexity = `Seleccione TODAS las afirmaciones acerca de la <a class='exam_ref' href='${hb.href_tch_cplx}'>complejidad técnica</a> and <a class='exam_ref' href='${hb.href_factories}'>fábricas</a> que están soportadas por evidencia: `;
	lg.q1_92__leg = "una PIERNA es tan compleja que si entendieramos como estan hechas podriamos tomar una gota de sangre de la persona que le falta la pierna, hacer una pierna personalizada para dicha persona, e instalarsela, tal cual como hacemos con una LLANTA de un carro.";
	lg.q1_92__liver = "un HIGADO es tan complejo que si entendieramos como estan hechos podriamos tomar una gota de sangre de la persona que lo tiene dañado, hacer un hígado personalizado para dicha persona, e instalarselo, tal cual como hacemos con una bodega de distribución y logística de una FABRICA.";
	lg.q1_92__lung = "un PULMON es tan complejo que si entendieramos como estan hechos podriamos tomar una gota de sangre de la persona que lo tiene dañado, hacer un pulmón personalizado para dicha persona, e instalarselo, tal cual como hacemos con un equipo de filtrado de aire en un sistema de VENTILACION.";
	
	qrf.q1_93__biological_requires_creativity = true;
	lg.q1_93__biological_requires_creativity = `Dadas sus respuestas en la QREF_q1_91__ y la QREF_q1_7__ usted TIENE que concluir que la afirmación: "las máquinas biológicas requieren mayor <a class='exam_ref' href='${hb.href_tch_crea}'>creatividad técnica</a> que las máquinas hechas por humanos"`;
	lg.q1_93__yes = "Es verdadera.";
	lg.q1_93__no = "Es falsa.";
	
	qrf.q1_94__if_human_then_creator = true;
	lg.q1_94__if_human_then_creator = `Dada su respuesta en la QREF_q1_93__ usted TIENE que concluir que la afirmación: "SI el ser humano se va a llamar a si mismo inteligente, diseñador y <a class='exam_ref' href='${hb.href_creator}'>creador</a>, debido a toda la <a class='exam_ref' href='${hb.href_evidence}'>EVIDENCIA</a> en la tecnología que ha creado, ENTONCES, tiene que admitir que EXISTE un creador inteligente y diseñador de toda la <a class='exam_ref' href='${hb.href_biology}'>maquinaria biológica</a> que observamos"`;
	lg.q1_94__yes = "Es verdadera.";
	lg.q1_94__no = "Es falsa.";
	
	lg.q2_0__reproduction_section = `<a class='exam_ref exam_title' href='${hb.href_reproduction_tit}'>Reproducción</a>`;
	
	lg.q2_1__can_an_engineer_rebuild_his_house = `SI un ingeniero ha <a class='exam_ref' href='${hb.href_reproduction}'>reproducido</a>, construido, la misma casa varias veces, y una de ellas es destruida, por el fuego, en un accidente, o por alguien mas `;
	lg.q2_1__yes = "el puede CONSTRUIR la casa destruida de nuevo.";
	lg.q2_1__no = "el NO PUEDE construir la casa destruida de nuevo.";
	
	qrf.q2_2__future_resurrection = true;
	lg.q2_2__future_resurrection = `Dada su respuesta en la QREF_q2_1__ usted tiene que aceptar que es RAZONABLE visualizar un futuro, tal vez distante, cuando entendamos lo suficiente sobre el cuerpo humano, en el cual los humanos podrán <a class='exam_ref' href='${hb.href_reproduction}'>reproducir</a> el cuerpo humano y simular una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a>`;
	lg.q2_2__yes = "Si. Tengo que aceptarlo como RAZONABLE";
	lg.q2_2__no = "No. NO tengo porque aceptarlo como razonable";
		
	lg.q3_1__resurrection_section = `<a class='exam_ref exam_title' href='${hb.href_resurrection_tit}'>Resurrección</a>`;
	lg.q3_1__jesus_resurrection_claims = `Seleccione TODAS las afirmaciones que usted cree que hace La Biblia acerca de Jesucristo <a class='exam_ref' href='${hb.href_resurrection}'>RESUCITADO</a>: `;
	lg.q3_1__physical = "El fue físicamente resucitado, en CUERPO y Espíritu.";
	lg.q3_1__not_to_die = "El está vivo para SIEMPRE, para no volver a morir, porque ya no puede morir.";
	lg.q3_1__in_heaven = "El está, en CUERPO y Espíritu, en los cielos, esos cielos FISICOS que podemos ver, y que tienen nubes.";
	
	lg.q3_2__people_resurrection_claims = `Seleccione TODAS las afirmaciones que usted cree que hace La Biblia acerca de la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos prometida por Jesucristo: `;
	lg.q3_2__like_jesus = "Es en CUERPO y ESPIRITU igual a la de Jesucristo. Y es en un cuerpo nuevo, como el de Jesucristo, que no puede morir.";
	lg.q3_2__for_all = "Es para todos, TODAS las personas, justos e injustos.";
	lg.q3_2__not_yet_most = "NO ha sucedido para casi nadie. El evento prometido es en el último dia.";
	//lg.q3_2__happened_for_few = "It HAS happened for a FEW ones. Some male genetic decendants of Jacob, of Israel, have been resurrected.";
	lg.q3_2__new_earth = "Es para vivir para siempre en una TIERRA física nueva con unos CIELOS físicos nuevos.";
	lg.q3_2__sleep = "Antes de la resurrección, la persona muerta NO tiene cuerpo, NI conciencia, y por lo tanto no puede hacer nada. Los muertos ESTAN muertos.";

	lg.q3_3__dispute_or_accept_resurrection = `Que afirmaciones acerca de la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> le gustaría explorar y opcionalmente refutar? `;
	lg.q3_3__not_believed = "Las que NO CREO que son afirmadas por La Biblia.";
	lg.q3_3__all_stms = "TODAS.";
	lg.q3_3__go_on = "NINGUNA. ACEPTO que todas son afirmadas por La Biblia. Continuemos.";

	let bcit = null;
	let numv = null;
	
	lg.q4_1__physical_sec = `<a class='exam_ref exam_title' href='${hb.href_physical_resu}'>Física</a>`;
	lg.q4_1__physical = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> física de Jesucristo`;
	numv = "1"; bcit = "Luk_24_39";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["palpad,", "carne", "huesos,"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse1_should = "La CARNE y los HUESOS son FISICOS.";
	numv = "2"; bcit = "Jhn_20_27";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["mano,", "métela", "costado:"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse2_should = "Meter una MANO en el COSTADO es algo FISICO.";
	numv = "3"; bcit = "Act_10_41";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["comimos", "bebimos"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse3_should = "COMER y BEBER son acciones FISICAS.";
	numv = "4"; bcit = "Mat_28_9";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["abrazaron", "diciendo:", "pies,"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse4_should = "Decir, ABRAZAR los PIES de alguien es algo FISICO.";
	numv = "5"; bcit = "Luk_24_30";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["partió,", "tomando", "pan,", "dióles."] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse5_should = "TOMAR el PAN, PARTIRLO y DARLO es algo FISICO.";
	numv = "6"; bcit = "Jhn_2_19";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["templo,", "levantaré."] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse6_should = "RECONSTRUIR un cuerpo es algo FISICO.";
	numv = "7"; bcit = "Luk_24_43";
	set_stm_bibref(`q4_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tomó,", "comió"] });
	set_href_bibcit(`q4_1__verse${numv}_href`, bcit);
	lg.q4_1__verse7_should = "COMER pescado asado es algo FISICO.";
	
	lg.q5_1__not_die_sec = `<a class='exam_ref exam_title' href='${hb.href_not_die_resu}'>Para NO volver a morir</a>`;
	lg.q5_1__not_die = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo para NO VOLVER a morir`;
	numv = "1"; bcit = "Rom_6_9";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["ya", "no", "muere:"] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse1_should = `Dice literalmente "YA NO MUERE"`;
	numv = "2"; bcit = "Heb_7_16";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["vida", "indestructible."] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse2_should = `Dice literalmente "VIDA INDESTRUCTIBLE"`;
	numv = "3"; bcit = "Rev_1_18";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["vivo", "para", "siempre."] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse3_should = `Dice literalmente "VIVO PARA SIEMPRE"`;
	numv = "4"; bcit = "Heb_7_25";
	set_stm_bibref(`q5_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["viviendo", "siempre", ] });
	set_href_bibcit(`q5_1__verse${numv}_href`, bcit);
	lg.q5_1__verse4_should = `Dice literalmente "VIVIENDO SIEMPRE"`;
	
	lg.q6_1__in_heaven_sec = `<a class='exam_ref exam_title' href='${hb.href_in_heaven_resu}'>En los cielos</a>`;
	lg.q6_1__in_heaven = `Seleccione todos los versiculos que soportan un Jesucristo <a class='exam_ref' href='${hb.href_resurrection}'>RESUCITADO</a> que esta en los cielos en CUERPO y Espíritu.`;
	lg.q6_1__verse1_str = uppercase_words_in_string(rf.act_1_11_str, ["tomado", "vendrá", "ir", "al", "en", "el", "cielo.", "cielo,", "cielo?"]);
	lg.q6_1__verse1_href = rf.act_1_11_href;
	numv = "1"; bcit = "Act_1_11";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tomado", "vendrá", "ir", "al", "en", "el", "cielo.", "cielo,", "cielo?"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse1_should = "IR AL CIELO y VENDRA del cielo. El está físicamente en unos cielos físicos";
	numv = "2"; bcit = "Mat_26_64";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["sentado", "nubes", "cielo."] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse2_should = "El está SENTADO y viene en las NUBES del CIELO";
	numv = "3"; bcit = "Jhn_14_2";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["casa", "moradas", "lugar"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse3_should = "EL hace un LUGAR para sus dicípulos";
	numv = "4"; bcit = "Heb_9_12";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["entró", "santuario,"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse4_should = "El ENTRO al SANTUARIO que está en los cielos";
	numv = "5"; bcit = "Heb_10_12";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["está", "sentado"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse5_should = "El ESTA SENTADO en los cielos";
	numv = "6"; bcit = "Heb_13_8";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["es", "mismo", "siempre."] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse6_should = "El es SIEMPRE el MISMO. Luego si resucitó en CUERPO y espíritu, el TIENE que estar en CUERPO y espíritu en los cielos.";
	numv = "7"; bcit = "Col_1_15";
	set_stm_bibref(`q6_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["imagen", "invisible;"] });
	set_href_bibcit(`q6_1__verse${numv}_href`, bcit);
	lg.q6_1__verse7_should = "El es la IMAGEN del Dios INVISIBLE. Luego si era visible cuando resucitó, El tiene que SEGUIR siendo visible en los cielos.";
	
	lg.q7_1__like_jesus_sec = `<a class='exam_ref exam_title' href='${hb.href_like_jesus_resu}'>Como Jesucristo</a>`;
	lg.q7_1__like_jesus = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos semejante a la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de Jesucristo`;
	numv = "1"; bcit = "Phl_3_21";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["semejante", "cuerpo", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse1_should = `Dice literalmente "SEMEJANTE al CUERPO"`;
	numv = "2"; bcit = "1Jo_3_2";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["semejantes", "á", "él,", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse2_should = `Dice literalmente "SEMEJANTES a EL"`;
	numv = "3"; bcit = "Luk_20_36";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["no", "pueden", "morir:", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse3_should = "Esos cuerpos NO PUEDEN MORIR";
	numv = "4"; bcit = "Heb_9_27";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["mueran", "una", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse4_should = "Estamos destinados a MORIR UNA vez. Solo UNA. No mas.";
	numv = "5"; bcit = "1Co_15_49";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["traeremos", "imagen", "celestial.", ] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse5_should = "TRAEREMOS la IMAGEN de lo CELESTIAL.";
	numv = "6"; bcit = "1Co_15_42";
	set_stm_bibref(`q7_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["levantará", "incorrupción;"] });
	set_href_bibcit(`q7_1__verse${numv}_href`, bcit);
	lg.q7_1__verse6_should = "Lo que resucita es INCURRUPTIBLE";
	
	lg.q8_1__for_all_sec = `<a class='exam_ref exam_title' href='${hb.href_for_all_resu}'>Para Todos</a>`;
	lg.q8_1__for_all = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos que es para TODOS`;
	numv = "1"; bcit = "Jhn_5_28";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["todos", "sepulcros", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse1_should = "TODOS significa TODOS";
	numv = "2"; bcit = "Jhn_5_29";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["bien,", "mal,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse2_should = "Los que hicieron el BIEN y los que hicieron el MAL";
	numv = "3"; bcit = "Act_24_15";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["como", "justos", "injustos,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse3_should = "Todos resucitan: JUSTOS e INJUSTOS.";
	numv = "4"; bcit = "Jhn_6_39";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["todo", "no", "pierda", "nada,", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse4_should = "De TODOS los que le dió NO PIERDA NADA.";
	numv = "5"; bcit = "Jhn_17_2";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["toda", "carne,", "eterna", "vida", "todos", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse5_should = "VIDA ETERNA para TODA CARNE, que fué lo que le dió";
	numv = "6"; bcit = "1Co_15_22";
	set_stm_bibref(`q8_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["todos", "vivificados.", ] });
	set_href_bibcit(`q8_1__verse${numv}_href`, bcit);
	lg.q8_1__verse6_should = "TODOS significa TODOS";
	
	lg.q9_1__not_yet_sec = `<a class='exam_ref exam_title' href='${hb.href_not_yet_resu}'>NO ha sucedido</a>`;
	lg.q9_1__not_yet = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos que NO ha sucedido para casi NADIE`;
	numv = "1"; bcit = "Jhn_6_39";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["día", "final.", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse1_should = "Es el en DIA FINAL";
	numv = "2"; bcit = "2Ti_2_18";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["desviaron", "ocurrió;", "past,"] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse2_should = "No ha OCURRIDO";
	numv = "3"; bcit = "Jhn_6_40";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse3_should = "Es en el DIA FINAL";
	numv = "4"; bcit = "Jhn_6_44";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse4_should = "Es en el DIA FINAL";
	numv = "5"; bcit = "Jhn_6_54";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse5_should = "Es en el DIA FINAL";
	numv = "6"; bcit = "Jhn_11_24";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["final.", "día", ] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse6_should = "Es en el DIA FINAL";
	numv = "7"; bcit = "Rev_20_13";
	set_stm_bibref(`q9_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["entregó", "entregaron", "muertos"] });
	set_href_bibcit(`q9_1__verse${numv}_href`, bcit);
	lg.q9_1__verse7_should = "Es DESPUES de que esta tierra y estos cielos sean destruidos";
	
	/*
	lg.q10_1__has_for_few_sec = `<a class='exam_ref exam_title' href='${hb.href_only_few_resu}'>Only for few</a>`;
	lg.q10_1__has_for_few = `1st quest ONLY FOR FEW`;
	lg.q10_1__go = "Go";
	lg.q10_1__stay = "Stay";
	*/
	
	lg.q11_1__new_earth_sec = `<a class='exam_ref exam_title' href='${hb.href_new_earth_resu}'>Tierra Nueva</a>`;
	lg.q11_1__new_earth = `Seleccione todos los versiculos que soportan una <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a> de los muertos para vivir en una TIERRA NUEVA con unos cielos nuevos`;
	numv = "1"; bcit = "Rev_21_1";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tierra", "nueva:", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse1_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	numv = "2"; bcit = "2Pe_3_13";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["tierra", "nueva,", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse2_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	numv = "3"; bcit = "Isa_65_17";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["nueva", "tierra:", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse3_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	numv = "4"; bcit = "Isa_66_22";
	set_stm_bibref(`q11_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["nueva", "tierra,", ] });
	set_href_bibcit(`q11_1__verse${numv}_href`, bcit);
	lg.q11_1__verse4_should = "Es en una TIERRA NUEVA con unos cielos nuevos";
	
	lg.q12_1__sleep_sec = `<a class='exam_ref exam_title' href='${hb.href_sleeping}'>Dormiditos</a>`;
	lg.q12_1__sleep = `Seleccione un BUEN versiculo que soporte que las personas que están físicamente muertas (antes de la <a class='exam_ref' href='${hb.href_resurrection}'>resurrección</a>) TIENEN CONCIENCIA`;
	lg.q12_1__no_consciousness = "Según TodaCarne.com ninguno de estos es un buen versiculo";
	numv = "1"; bcit = "Isa_14_10";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["voces,", "dirán:" ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "2"; bcit = "Mat_17_3";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["hablando", "él.", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "3"; bcit = "Rev_6_10";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["clamaban", "alta", "voz", "diciendo:", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "4"; bcit = "Heb_12_23";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["alistados", "congregación", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);
	numv = "5"; bcit = "Luk_16_24";
	set_stm_bibref(`q12_1__verse${numv}_str`, `BIBREF_${bcit}`, { [bcit]: ["voces,", "dijo:", ] });
	set_href_bibcit(`q12_1__verse${numv}_href`, bcit);

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
	
	cit_obj = rf.gen_15_15_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_15_15_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	cit_obj = rf.gen_25_8_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_25_8_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	cit_obj = rf.gen_35_29_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.gen_35_29_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_sheol}`;
	
	const q12_1__response_spiritually_dead = `<p> Este versículo se refiere a personas espiritualmente muertas. Por favor, lea las secciones llamadas <a class='exam_ref' href='${hb.href_life}'>Vida</a>, <a class='exam_ref' href='${hb.href_death}'>Muerte</a>, and <a class='exam_ref' href='${hb.href_liberator}'>Libertador</a>.</p>`;
	
	cit_obj = rf._1pe_3_19_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._1pe_3_19_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	<p> Lo más importante que hay que notar en este versículo y su contexto es que TODAS las personas están MUERTAS sin Jesucristo, quien es la VIDA misma. Así que el versículo se refiere a personas FÍSICAMENTE vivas pero espiritualmente muertas. Cualquier persona que no cree en Jesucristo es un esclavo, un PRISIONERO del Espíritu que gobierna este mundo, esa persona es un "espíritu en prisión". La buena noticia de la RESURRECCIÓN de Jesucristo es que liberó a esa persona. Es un nuevo comienzo. Y los tiempos de Noé, que fueron un nuevo comienzo, fueron una SEÑAL del nuevo comienzo en los tiempos de Jesucristo. De eso se trata el pasaje. Quizás NO en una mala traducción, pero ciertamente en el griego koiné antiguo.</p>

	<p> La segunda cosa que hay que notar es que EN NINGÚN LUGAR, en el versículo o en su contexto, aparece la palabra griega Hades, la palabra griega usada en los manuscritos griegos antiguos para el Seol hebreo, el lugar donde van los muertos: la tumba, el Sepulcro, el pozo. Este pasaje NO está hablando de personas FÍSICAMENTE muertas. Se trata de personas espiritualmente muertas y TODOS estaban espiritualmente muertos cuando Jesucristo murió y resucitó.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf._2co_5_8_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_5_8_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere estar ausente de este cuerpo que muere y, cuando RESUCITE en un cuerpo nuevo que no puede morir, estar presente con el Señor. Él, después de todo, RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar PRESENTE con Él es estar TAMBIÉN RESUCITADO.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.act_7_59_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.act_7_59_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere al hecho de que cuando una persona muere, como dice <a class='exam_ref' href=${rf.ecc_12_7_href}>Ecc 12:7</a>, el espíritu VUELVE a Elohim, que lo dió, asi que todo vuelve a estar como estaba ANTES de que la persona naciera físicamente.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.luk_20_38_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_20_38_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere al hecho de que la gente muerta PUEDE ser DESPERTADA cuando esta <a class='exam_ref' href='${hb.href_sleeping}'>DORMIDITA</a>, y que para el que las puede DESPERTAR siguen VIVAS.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	const q12_1__response_paradise = `<p> Este versiculo se refiere al PARAISO, un LUGAR físico donde los RESUCITADOS vivirán eternamente con Jesucristo, NO se refiere al Sheol, a la tumba, al Sepulcro, al foso.</p>
	${q12_1__nowhere_consciousness}
	`;
	
	cit_obj = rf._2co_12_4_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._2co_12_4_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.luk_23_43_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_23_43_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_paradise}
	${q12_1__response_END}
	`;
	
	cit_obj = rf._1ti_5_6_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._1ti_5_6_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.luk_15_24_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.luk_15_24_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__response_spiritually_dead}
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.jhn_4_24_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.jhn_4_24_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> Este versiculo se refiere a personas FISICAMENTE vivas que adoran en Espíritu y en Verdad.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf.heb_1_14_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.heb_1_14_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p>Este versículo se refiere a los ángeles como espíritus. La Biblia se refiere a cualquier persona físicamente viva como espíritu. Por favor lea las secciones de <a class='exam_ref' href='${hb.href_angels}'>Angeles</a> y <a class='exam_ref' href='${hb.href_wings}'>Alados</a>.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.phl_1_23_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.phl_1_23_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, cualquier creyente en la RESURRECCIÓN de Jesucristo prefiere partir y estar con Cristo cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de estar con Él es estar RESUCITANDO TAMBIÉN.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.psa_16_11_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.psa_16_11_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	${q12_1__nowhere_consciousness}
	<p>Por supuesto, todo aquel que cree en la RESURRECCIÓN de Jesucristo sabe que Él es el Camino y la Vida y que podrá estar en Su presencia cuando RESUCITE en un cuerpo nuevo que no puede morir. Después de todo, Él RESUCITÓ en CUERPO y ESPÍRITU. Así que la ÚNICA manera de ver su ROSTRO es estar TAMBIÉN RESUCITADO.</p>
	${q12_1__response_END}
	`;
	
	cit_obj = rf.isa_8_19_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf.isa_8_19_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
	<p> La prohibición en el Antiguo Testamento de que las personas hablen con los muertos es para evitar que hablen con los Poderes Celestiales, comúnmente conocidos en el Nuevo Testamento como DEMONIOS, que se harán pasar por la persona muerta para engañar a quien intente comunicarse con el muerto.</p>
	${q12_1__nowhere_consciousness}
	${q12_1__response_END}
	`;
	
	cit_obj = rf._1th_4_14_obj;
	rnam = get_verse_reponse_name("q12_1__", cit_obj);
	cit_kk = get_verse_cit_key(cit_obj);
	cit_ref = bib_obj_to_txt(cit_obj);
	cit_txt = rf[cit_kk + "_str"];
	lg[rnam] = `<a class='exam_ref' href=${rf._1th_4_14_href}>${cit_ref}</a> <b>${cit_txt}</b> ${q12_1__response_INTRO}
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
	

	lg.q14_1__the_cloth_sec = `<a class='exam_ref exam_title' href='${hb.href_the_cloth}'>The Cloth</a>`;
	lg.q14_1__the_cloth = `1st quest THE CLOTH`;
	lg.q14_1__go = "Go";
	lg.q14_1__stay = "Stay";
	
	
}

