
import { get_msg, is_mobile_browser, get_new_dv_under, glb_curr_lang, glb_poll_db, glb_all_countries, glb_all_marital, 
	glb_def_country, glb_def_marital, 
} from './tc_lang_all.js';

import { scroll_to_first_not_answered, scroll_to_top, } from './tc_exam.js';

const DEBUG_USER_INFO = true;
const id_ed_user_info = "id_ed_user_info";
const id_nequi_number = "id_nequi_number";
const id_paypal_email = "id_paypal_email";
const id_transfiya_number = "id_transfiya_number";
const id_url_photo = "id_url_photo";
const id_country = "id_country";
const id_country_id = "id_country_id";
const id_name = "id_name";
const id_sex = "id_sex";
const id_birth_year = "id_birth_year";
const id_birth_month = "id_birth_month";
const id_birth_day = "id_birth_day";
const id_marital_status = "id_marital_status";
const id_divorce_number = "id_divorce_number";
const id_children_number = "id_children_number";
const id_website = "id_website";
const id_facebook = "id_facebook";
const id_instagram = "id_instagram";
const id_youtube = "id_youtube";

function new_user_info(){
	user_info = {};
	user_info.nequi_num = "";
	user_info.paypal_id = "";
	user_info.transfiya_num = "";
	user_info.url_photo = "";
	user_info.country = "";
	user_info.country_id = 0;
	user_info.name = "";
	user_info.sex = "";
	user_info.birth_year = 0;
	user_info.birth_month = 0;
	user_info.birth_day = 0;
	user_info.marital_status = "";
	user_info.divorce_number = -1;
	user_info.children_number = -1;
	user_info.website = "";
	user_info.facebook = "";
	user_info.instagram = "";
	user_info.youtube = "";
	return user_info;
}

function add_user_info_label(htm_txt){ 
	const inp_fld = document.createElement("div");
	inp_fld.innerHTML = htm_txt;
	inp_fld.classList.add("exam", "big_font", "bold_font");
	inp_fld.classList.add("grid_item_auto_auto");
	return inp_fld;
}

function add_user_info_end_line(){ 
	const inp_fld = document.createElement("div");
	inp_fld.classList.add("exam");
	inp_fld.classList.add("grid_item_auto_rest");
	return inp_fld;
}

function add_user_info_field(id, tp, sz, mx_ln, val, snum){ // type "number" or "text"
	//const cls = "grid_item_auto_span_" + snum;
	const g_col = "auto / span " + snum;
	
	const inp_fld = document.createElement("input");
	inp_fld.id = id;
	inp_fld.type = tp;
	inp_fld.size = sz;
	inp_fld.maxlength = mx_ln;
	inp_fld.value = val;
	inp_fld.classList.add("exam");
	//inp_fld.classList.add(cls);
	inp_fld.classList.add("grid_item_user");
	inp_fld.style.gridColumn = g_col;
	return inp_fld;
}

function add_user_info_simple_line(dv_ed_usr, label, id, tp, sz, mx_ln, val){ 
	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label(label);
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(id, tp, sz, mx_ln, val, 10);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line();
	dv_ed_usr.appendChild(fld);
}

export function toggle_user_info(){
	const dv_exam_top = document.getElementById("id_exam_top_content");

	let dv_ed_usr = get_new_dv_under(dv_exam_top, id_ed_user_info);
	if(dv_ed_usr == null){
		if(DEBUG_USER_INFO){ console.log("toggle_user_info OFF"); }
		scroll_to_first_not_answered();
		return;
	}
	dv_ed_usr.classList.add("exam");
	dv_ed_usr.classList.add("grid_user_info");
	
	/*
	let user_info = glb_poll_db.user_info;
	if(user_info == null){
		glb_poll_db.user_info = new_user_info();
		user_info = glb_poll_db.user_info;
	}
	obj.msg_usr_nequi = "Nequi";
	obj.msg_usr_paypal = "Paypal";
	obj.msg_usr_transfiya = "Transfiya";
	obj.msg_usr_url_photo = "URL a su foto";
	obj.msg_usr_country = "Pais";
	obj.msg_usr_country_id = "Cedula";
	obj.msg_usr_name = "Nombre";
	obj.msg_usr_sex = "Sexo";
	obj.msg_usr_birth_date = "Fecha nacimiento";
	obj.msg_usr_marital_status = "Estado civil";
	obj.msg_usr_divorce_num = "Numero de divorcios";
	obj.msg_usr_children_num = "Numero de hijos";
	obj.msg_usr_website = "Website";
	obj.msg_usr_facebook = "Facebook";
	obj.msg_usr_instagram = "Instagram";
	obj.msg_usr_youtube = "Youtube";
	*/
	
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_nequi, id_nequi_number, "number", 10, 10, 0);
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_paypal, id_paypal_email, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_transfiya, id_transfiya_number, "number", 10, 10, 0);
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_url_photo, id_url_photo, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_name, id_name, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_divorce_num, id_divorce_number, "number", 1, 1, 0);
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_children_num, id_children_number, "number", 2, 2, 0);
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_website, id_website, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_facebook, id_facebook, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_instagram, id_instagram, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, glb_curr_lang.msg_usr_youtube, id_youtube, "text", 150, 150, "");
	
	//glb_all_countries[glb_def_country]
	//glb_all_countries[glb_def_country]

	let lbl = null;
	let fld = null;
	
	const dv_ok = dv_ed_usr.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("grid_item_auto_span_4");
	dv_ok.classList.add("is_button");
	dv_ok.innerHTML = glb_curr_lang.msg_end_edit;
	dv_ok.addEventListener('click', function() {
		dv_ed_usr.remove();
		scroll_to_first_not_answered();
		return;
	});    

	scroll_to_top(dv_ed_usr);
}



/*
		<div class="grid_item_auto_span_5">NEQUI IUY IUY IUY IUY IUYASDIFH IHYFGI UYSGIU</div>
		<div class="grid_item_auto_span_4"><input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" /></div>
		<div class="grid_item_auto_span_1">3121234567</div>
		<div class="grid_item_auto_rest"></div>
		<div class="grid_item_auto_auto">SECOND</div>
		<div class="grid_item_auto_auto">Transfiya</div>
		<div class="grid_item_auto_rest"></div>
		<div class="grid_item_auto_auto">THIRD</div>
		<div class="grid_item_auto_auto">Otra vez</div>
		<div class="grid_item_auto_rest"></div>
*/

