
import { gvar, } from '../../code/bq_tools.js';

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
	let bibref = {};
	let rnam = null;	
	
	const rf = gvar.glb_all_bibrefs;
	const hb = gvar.glb_all_book_hrefs;
	const lg = gvar.glb_poll_txt;
	
	const module_img_dir = gvar.qmodu_img_dir;
	const site_img_dir = gvar.site_img_dir;
	
	// ALL QUESTION IDS MUST END WITH DOBLE UNDERSCORE: "__"
	
	//lg.ctx_bible2 = "<span class='has_left_padding very_big_font bold_font'>Bible?</span>";
	
	lg.qmodu_title = gvar.qmodule_title;  
	
	lg.a_simple_YES = `SI`;
	lg.a_simple_NO = `NO`;	

	lg.a_simple_harder_to_make = `Harder to make`;
	lg.a_simple_harder_to_understand = `Harder to understand`;
	
	lg.q1_0__bible = `<span class='big_font bold_font'>Es La Biblia La Palabra Escrita de Dios?</span>`;
	lg.q1_0__YES_bible = "SI me gusta la Biblia";
	lg.q1_0__NO_bible = "NO me gusta la Biblia";
	
	lg.q1_1__creator = `<span class='big_font bold_font'><a href='${hb.href_creator_tit}'>Creador</a>?</span>`;
	lg.q1_1__YES_creator = "SI hay un Creador";
	lg.q1_1__NO_creator = "NO hay un Creador";	

	lg.q1_1_2__six_days = `<span class='big_font bold_font'>En <a href='${hb.href_creation}'>Seis Dias</a>?</span>`;
	lg.q1_1_2__YES_six_days = "SI, en seis dias de creación";
	lg.q1_1_2__NO_six_days = "NO, en mas de seis dias de creación";	

	lg.q1_3__evolution = `<span class='big_font bold_font'><a href='${hb.href_factories}'>Evolución</a>?</span>`;
	lg.q1_3__YES_evolution = "SI hay Evolución";
	lg.q1_3__NO_evolution = "NO hay Evolución";
	
	lg.o_evolution_comm = `La pregunta sobre seis dias se refiere a seis rotaciones del planeta sobre su eje. Seis dias literales así que no hay tiempo para evolución.`;

	lg.q_millions_of_years = `<span class='big_font bold_font'>Millones de <a href='${hb.href_factories}'>años</a>?</span>`;

	lg.q_intelligent_design = `<span class='big_font bold_font'>Diseño Inteligente?</span>`;
	lg.q_about_7_thousand_years = `<span class='big_font bold_font'>Una pareja hace aprox. 7 mil años?</span>`;
	
	lg.q_logic_stm = `<span class='big_font bold_font'>Lógica?</span>`;
	lg.a_YES_logic = "SI es necesaria la lógica";
	lg.a_NO_logic = "NO es necesaria la lógica";
	
	const logic_needed = ` se necesita en el dia a dia. Hace parte de nuestros sistemas. La pregunta se refiere a ese hecho.`;
	
	lg.o_logic_comm = `La lógica ${logic_needed}`;

	lg.q_language = `<span class='big_font bold_font'>Lenguaje?</span>`;
	lg.o_language_comm = `En el lenguaje se usa la lógica. La lógica en el lenguaje ${logic_needed}`;

	lg.q_business = `<span class='big_font bold_font'>Comercio?</span>`;
	lg.o_business_comm = `En el comercio se usa la lógica. La lógica en el comercio ${logic_needed}`;
	
	lg.q_technology = `<span class='big_font bold_font'>Tecnología?</span>`;
	lg.o_technology_comm = `En la tecnología se usa la lógica. La lógica en la tecnología ${logic_needed}`;
	
	lg.o_logic_incons_comm = `Parece que usted tiene respuestas inconsistentes si ud. admite la necesidad de la lógica.`;
	
	lg.q_YES_NO_evidence = `<span class='big_font bold_font'><a href='${hb.href_evidence}'>Evidencia</a>?</span>`;
	lg.a_YES_evidence = "SI es necesaria la evidencia";
	lg.a_NO_evidence = "NO es necesaria la evidencia";

	const evidence_needed = ` se necesita en el dia a dia. Se necesita para obtener confianza. La pregunta se refiere a ese hecho.`;

	lg.o_evidence_comm = `Evidencia ${evidence_needed}`;
	
	lg.q_justice = `<span class='big_font bold_font'>Justicia?</span>`;
	lg.o_justice_comm = `La justicia humana usa evidencia. La evidencia en la justicia ${evidence_needed}`;
	lg.q_law = `<span class='big_font bold_font'>Ley?</span>`;
	lg.o_law_comm = `La ley humana usa evidencia. La evidencia en la ley ${evidence_needed}`;
	lg.q_contracts = `<span class='big_font bold_font'>Contratos?</span>`;
	lg.o_contracts_comm = `Los contratos usan evidencia. La evidencia en los contratos ${evidence_needed}`;

	lg.o_technology2_comm = `La tecnología usa evidencia. La evidencia en tecnología ${evidence_needed}`;

	lg.o_evidence_incons_comm = `Parece que usted tiene respuestas inconsistentes si ud. admite la necesidad de la evidencia.`;
	
	lg.q_noah = `<span class='big_font bold_font'>Noé y el diluvio son historia?</span>`;
	lg.q_genesis = `<span class='big_font bold_font'>El libro de Génesis es historia?</span>`;
	
	lg.q_requires_creativity = `<span class='big_font bold_font'>Requiere diseño y <a href='${hb.href_tch_crea}'>creatividad</a>?</span>`;
	
	lg.q_made_by_ape = "<span class='big_font bold_font'>Puede un simio hacerlo?</span>";
	lg.q_evidence_made_by_ape = "<span class='big_font bold_font'>Hay evidencia de que un simio pueda hacerlo?</span>";
	
	const creativity_comm = `La lógica y la evidencia muestran que una de las razones de los humanos para llamarse a si mismos inteligentes, diseñadores y creadores es la tecnología que construyen.` 

	lg.o_car_req_creativity_comm = `<span class='big_font bold_font'>${creativity_comm} Un ejemplo es un automóvil.</span>`;
	lg.o_knife_req_creativity_comm = `<span class='big_font bold_font'>${creativity_comm} Un ejemplo es un cuchillo.</span>`;
	lg.o_clock_req_creativity_comm = `<span class='big_font bold_font'>${creativity_comm} Un ejemplo es un reloj.</span>`;
	lg.o_phone_req_creativity_comm = `<span class='big_font bold_font'>${creativity_comm} Un ejemplo es un celular.</span>`;
	lg.o_laptop_req_creativity_comm = `<span class='big_font bold_font'>${creativity_comm} Un ejemplo es un portatil.</span>`;
	
	lg.o_complexity_with_design_is_harder_comm = `<span class='big_font bold_font'>Mas complejidad y mas diseño lo hacen mas difícil de <a href='${hb.href_creator_tit}'>hacer o construir</a></span>`;

	lg.q_harder_to_make = `<span class='big_font bold_font'>Qué es mas difícil de <a href='${hb.href_creator_tit}'>hacer</a>?</span>`;

	lg.q_more_time = `<span class='big_font bold_font'>Qué es mas demorado de <a href='${hb.href_creator_tit}'>hacer</a>?</span>`;
	lg.q_more_people = `<span class='big_font bold_font'>Qué necesita de mas personas para <a href='${hb.href_creator_tit}'>hacerlo</a>?</span>`;
	lg.q_more_planning = `<span class='big_font bold_font'>Qué necesita un plan mas complejo para <a href='${hb.href_creator_tit}'>hacerlo</a>?</span>`;
	lg.q_more_steps = `<span class='big_font bold_font'>Qué necesita mas pasos para <a href='${hb.href_creator_tit}'>hacerlo</a>?</span>`;
	lg.q_more_complexity = `<span class='big_font bold_font'>Qué necesita mas gente, mas tiempo, mas pasos, mas partes para <a href='${hb.href_creator_tit}'>hacerlo</a>?</span>`;
	
	lg.a_building = `Un edificio`;
	lg.a_knife = `Un cuchillo`;

	lg.a_car = `Un carro`;
	lg.a_lamp = `Una lámpara`;

	lg.a_clock = `Un reloj`;
	lg.a_cellphone = `Un celular`;

	lg.a_car_wheel = `Una llanta`;
	lg.a_foot = `Un pie`;
	
	lg.a_air_purifier = `Un purificador de aire`;
	lg.a_human_lung = `Un pulmón`;
	
	lg.a_human_body = `Un cuerpo humano`;

	lg.q_make_foot = `<span class='big_font bold_font'>Podemos <a href='${hb.href_creator_tit}'>hacerle</a> un pie a partir de su ADN?</span>`;
	lg.q_make_lung = `<span class='big_font bold_font'>Podemos <a href='${hb.href_creator_tit}'>hacerle</a> un pulmón a partir de su ADN?</span>`;
	lg.q_make_liver = `<span class='big_font bold_font'>Podemos <a href='${hb.href_creator_tit}'>hacerle</a> un higado a partir de su ADN?</span>`;
	lg.q_make_kidney = `<span class='big_font bold_font'>Podemos <a href='${hb.href_creator_tit}'>hacerle</a> un riñon a partir de su ADN?</span>`;
	lg.q_make_body = `<span class='big_font bold_font'>Podemos <a href='${hb.href_creator_tit}'>hacerle</a> un cuerpo a partir de su ADN?</span>`;

	lg.q_why_amputees = `<span class='big_font bold_font'>Ha visto un amputado?</span>`;
	lg.q_why_one_lung = `<span class='big_font bold_font'>Hay personas respirando con un solo pulmón?</span>`;
	lg.q_why_die = `<span class='big_font bold_font'>Usted se va a morir?</span>`;

	lg.o_biology_is_harder_comm = `La lógica y la evidencia muestran que la maquinaria biológica es mucho mas difícil de hacer que la maquinaria hecha por los humanos. Es por eso que no podemos reproducir a voluntad la maquinaria biológica.`;

	lg.q_phone_mitosis = `<span class='big_font bold_font'>Podemos hacer celulares que se dividan en otros dos identicos?</span>`;
	lg.q_truck_baby = `<span class='big_font bold_font'>Podemos hacer tractomulas que tengan bebés tractomula?</span>`;
	lg.q_red_cell = `<span class='big_font bold_font'>Podemos hacer una celula globulo rojo?</span>`;
	lg.q_human_egg = `<span class='big_font bold_font'>Podemos hacer un óvulo humano?</span>`;
	lg.q_liver = `<span class='big_font bold_font'>Podemos hacer un hígado humano?</span>`;
	
	lg.o_we_cannot_simulate_biology_comm = `La lógica y la evidencia muestran que la maquinaria hecha por los humanos no puede simular el comportamiento de la maquinaria biológica porque ésta es mucho mas difícil de hacer.`;

	lg.q_bilology_req_creativity = `<span class='big_font bold_font'>Requiere diseño y <a href='${hb.href_creator}'>creatividad</a>?</span>`;
	
	lg.o_biology_req_creativity_comm = `La lógica y la evidencia muestran que maquinaria biológica es mucho mas difícil de hacer que la maquinaria hecha por humanos. Si nos vamos a llamar a nosotros mismos diseñadores inteligentes con creatividad técnica por la maquinaria que hacemos, tenemos que reconocer que la maquinaria biológica tambien requiere un diseñador inteligente con una creatividad técnica mucho mas grande que la nuestra.`;
	
	lg.o_change_creator_comm = `Ud. había escogido que NO hay un creador. Parece que cambio de posición. Por favor cambie su respuesta para deshacerse de este comentario.`;

	lg.o_faulty_logic_comm = `Para continuar con estas preguntas ud. necesita deshacerse de este comentario porque su lógica basada en evidencia parece equivocada.`;
	
	lg.q_you_can_make_a_car_again = `Si ud. lo puede hacer una vez, ud. lo puede volver a hacer.`;
	lg.o_humans_can_re_create_their_creations = `Si los humanos saben como hacer un carro es evidente que pueden hacer mas.`;
	lg.q_he_can_make_a_body_again = `Si El lo hiso una vez, El lo puede volver a hacer.`;
	lg.o_the_creator_can_re_create_his_creation = `EL creador del cuerpo humano puede hacerlo de nuevo así como nosotros los humanos podemos hacer de nuevo nuestras creaciones.`;

	lg.o_get_qrcode = `<span class='has_left_padding very_big_font bold_font'>Usted necesita hacer "login" (entrar) para obtener un código QR y comenzar a compartir las Buenas Nuevas y ganarse algo mientras lo hace. Por favor haga "login" (entre).</span>`;
	
	lg.o_congrats_you_have_a_qrcode = `
		Felicidades ! Ya puede compartir las Buenas Nuevas usando su código QR. Cualquiera que use su código QR para acceder esta página sera registrado como una persona referida por usted. Entre mas personas usen su código QR, mas ganará usted.
	`;
	
	lg.o_sorry_no_loging_no_qrcode = `
		<img class="img_observ" src="${site_img_dir}/woman_shrugging.webp"><br>
		<span class='big_font bold_font'>Lo sentimos. Sin Google login, no hay código QR. Si usted no tiene una <a href='http://accounts.google.com'>cuenta Google</a>, por favor obtenga una haciendo click en <a href='http://accounts.google.com'>este link</a>. Usted puede hacer login en cualquier momento haciendo click "Invitado" o haciendo click en el icono <img id="id_top_user_picture" class="img_user" src="${site_img_dir}/user.jpg"></span>
	`;
	
	lg.o_finished_module = `TERMINASTE ESTE MODULO !!!`;

	lg.o_evolution_nam = `Evolución`;
	lg.o_logic_nam = `Lógica`;
	lg.o_language_nam = `Lenguaje`;
	lg.o_business_nam = `Comercio`;
	lg.o_technology_nam = `Tecnología & logica`;
	lg.o_logic_incons_nam = `Consistencia en la lógica`;
	lg.o_evidence_nam = `Evidencia`;
	lg.o_law_nam = `Ley humana`;
	lg.o_justice_nam = `Justicia humana`;
	lg.o_contracts_nam = `Contratos`;
	lg.o_technology2_nam = `Tecnología & evidencia`;
	lg.o_evidence_incons_nam = `Consistencia en la evidencia`;
	lg.o_car_req_creativity_nam = `Creatividad & carro`;
	lg.o_knife_req_creativity_nam = `Creatividad & cuchillo`;
	lg.o_clock_req_creativity_nam = `Creatividad & reloj`;
	lg.o_phone_req_creativity_nam = `Creatividad & celula`;
	lg.o_laptop_req_creativity_nam = `Creatividad & portatil`;
	lg.o_complexity_with_design_is_harder_nam = `complejidad y diseño & Dificultad`;
	lg.o_biology_is_harder_nam = `Biologico vs hecho por el hombre`;
	lg.o_we_cannot_simulate_biology_nam = `SImulacion de la biología`;
	lg.o_biology_req_creativity_nam = `Maquinaria biológica & Creatividad`;
	lg.o_humans_can_re_create_their_creations_nam = `Re-creando de lo hecho por el hombre`;
	lg.o_the_creator_can_re_create_his_creation_nam = `Re-creando la biología`;
	lg.o_short_end_nam = `Final corto`;
	lg.o_long_end_nam = `Final largo`;
	lg.o_final_nam = `Observación Final`;

}

