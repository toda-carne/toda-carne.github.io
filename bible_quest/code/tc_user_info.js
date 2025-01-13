
import { get_msg, is_mobile_browser, get_new_dv_under, glb_curr_lang, glb_poll_db, } from './tc_lang_all.js';

import { scroll_to_first_not_answered, scroll_to_top, } from './tc_exam.js';

const DEBUG_USER_INFO = true;
const id_ed_user_info = "id_ed_user_info";
const id_wallet_kind = "id_wallet_kind";
const id_wallet_number = "id_wallet_number";

function new_user_info(){
	user_info = {};
	user_info.wallet_kind = "";
	user_info.wallet_phone_num = "";
	user_info.paypal_id = "";
	user_info.url_photo = "";
	user_info.country = "";
	user_info.country_id = 0;
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

function add_user_info_label(htm_txt, snum){ 
	//const cls = "grid_item_auto_span_" + snum;
	const cls = "grid_item_auto_auto";
	
	const inp_fld = document.createElement("div");
	inp_fld.innerHTML = htm_txt;
	inp_fld.classList.add("exam");
	inp_fld.classList.add(cls);
	return inp_fld;
}

function add_user_info_end_line(){ 
	const inp_fld = document.createElement("div");
	inp_fld.classList.add("exam");
	inp_fld.classList.add("grid_item_auto_rest");
	return inp_fld;
}

function add_user_info_field(id, tp, sz, mx_ln, val, snum){ // type "number" or "text"
	const cls = "grid_item_auto_span_" + snum;
	
	const inp_fld = document.createElement("input");
	inp_fld.id = id;
	inp_fld.type = tp;
	inp_fld.size = sz;
	inp_fld.maxlength = mx_ln;
	inp_fld.value = val;
	inp_fld.classList.add("exam");
	inp_fld.classList.add(cls);
	return inp_fld;
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
	}*/

	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label("NEQUI", 1);
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(id_wallet_number, "number", 3, 5, 123, 2);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line();
	dv_ed_usr.appendChild(fld);

	lbl = add_user_info_label("AHSDFIUY ISUDYF", 1);
	dv_ed_usr.appendChild(lbl);

	
	const dv_ok = dv_ed_usr.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("grid_item_auto_span_3");
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

