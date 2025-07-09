

import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './bq_select_option_mgr.js';

import { gvar, 
} from './bq_tools.js';

import { scroll_to_first_not_answered, 
	fb_mod, id_pop_menu_sele, user_logout, 
} from './bq_quest_mgr.js';

import { get_user_href, 
} from './bq_referrer_mgr.js';

const DEBUG_USER_INFO = true;

const firebase_user_info_path = "/user_info";

//const id_ed_user_info = "id_ed_user_info";
const id_comm_info = "id_ed_user_comm_info";

const id_goo_name = "id_ed_user_goo_name";
const id_goo_photo = "id_ed_user_goo_photo";
const id_goo_email = "id_ed_user_goo_email";
const id_sibiblia_qr = "id_ed_sibiblia_qr";
const id_sibiblia_link = "id_ed_sibiblia_link";
const id_sibiblia_id = "id_ed_sibiblia_id";
const id_sibiblia_photo = "id_ed_sibiblia_photo";

const id_nequi_number = "id_ed_user_nequi_number";
const id_paypal_email = "id_ed_user_paypal_email";
const id_transfiya_number = "id_ed_user_transfiya_number";
const id_url_photo = "id_ed_user_url_photo";
const id_country = "id_ed_user_country";
const id_citizen_id_lbl = "id_ed_user_citizen_id_lbl";
const id_citizen_id = "id_ed_user_citizen_id";
const id_birth_year = "id_ed_user_birth_year";
const id_birth_month = "id_ed_user_birth_month";
const id_birth_day = "id_ed_user_birth_day";
const id_sex = "id_ed_user_sex";
const id_marital_status = "id_ed_user_marital_status";
const id_name = "id_ed_user_name";
const id_divorce_number = "id_ed_user_divorce_number";
const id_children_number = "id_ed_user_children_number";
const id_website = "id_ed_user_website";
const id_facebook = "id_ed_user_facebook";
const id_instagram = "id_ed_user_instagram";
const id_youtube = "id_ed_user_youtube";

const id_user_sele = "id_user_sele";

/*
function new_user_info(){
	user_info = {};
	user_info.nequi_num = "";
	user_info.paypal_id = "";
	user_info.transfiya_num = "";
	user_info.url_photo = "";
	user_info.country = gvar.glb_all_countries[gvar.glb_def_country];
	user_info.citizen_id = 0;
	user_info.birth_year = 2024;
	user_info.birth_month = 12;
	user_info.birth_day = 31;
	user_info.sex = "";
	user_info.marital_status = gvar.glb_all_marital[gvar.glb_def_marital];
	user_info.name = "";
	user_info.divorce_number = -1;
	user_info.children_number = -1;
	user_info.website = "";
	user_info.facebook = "";
	user_info.instagram = "";
	user_info.youtube = "";
	return user_info;
}*/

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
	const g_col = "span " + snum;
	
	const inp_fld = document.createElement("input");
	inp_fld.id = id;
	inp_fld.type = tp;
	inp_fld.size = sz;
	inp_fld.maxlength = mx_ln;
	inp_fld.value = val;
	inp_fld.classList.add("exam");
	inp_fld.classList.add("grid_item_user");
	inp_fld.style.gridColumnEnd = g_col;
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

function add_user_info_simple_html_line(dv_ed_usr, label, id, htm_str){
	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label(label);
	dv_ed_usr.appendChild(lbl);

	fld = dv_ed_usr.appendChild(document.createElement("div"));
	fld.id = id;
	fld.classList.add("exam");
	fld.classList.add("grid_item_user");
	fld.style.gridColumnEnd = "span 10";
	fld.innerHTML = htm_str;
	dv_ed_usr.appendChild(fld);

	const dv_info = fld;
	
	fld = add_user_info_end_line();
	dv_ed_usr.appendChild(fld);
	
	return dv_info;
}

function add_user_info_select_line(dv_ed_usr, label, id, val, arr_ops){ 
	let lbl = null;
	let fld = null;
	
	lbl = add_user_info_label(label);
	dv_ed_usr.appendChild(lbl);

	fld = dv_ed_usr.appendChild(document.createElement("div"));
	fld.id = id;
	fld.classList.add("exam");
	fld.classList.add("grid_item_user");
	fld.style.gridColumnEnd = "span 10";
	fld.classList.add("is_button");
	fld.innerHTML = val;
	
	const all_ops = arr_ops;
	const inp = fld;
	inp.addEventListener('click', function() {
		const all_vals = Object.values(all_ops);
		toggle_select_option(inp, id_user_sele, all_vals, null);
		scroll_to_top(inp);
		return;
	});
	dv_ed_usr.appendChild(fld);

	fld = add_user_info_end_line();
	dv_ed_usr.appendChild(fld);	
	
}

export function toggle_user_info(fb_usr){
	let lbl = null;
	let fld = null;
	
	const dv_user_sec = document.getElementById("id_user_info_sec");

	let dv_edit_user = null;
	dv_edit_user = get_new_dv_under(dv_user_sec, id_pop_menu_sele);
	if(dv_edit_user == null){
		if(DEBUG_USER_INFO){ console.log("toggle_user_info OFF"); }
		scroll_to_first_not_answered();
		return;
	}
	dv_edit_user.classList.add("exam");

	fld = document.createElement("div");
	fld.id = id_comm_info;
	fld.classList.add("exam");
	dv_edit_user.appendChild(fld);
	
	const dv_logout = dv_edit_user.appendChild(document.createElement("div"));
	dv_logout.classList.add("exam");
	dv_logout.classList.add("grid_item_auto_span_4");
	dv_logout.classList.add("is_logout_button");
	dv_logout.innerHTML = gvar.glb_curr_lang.msg_logout;
	dv_logout.addEventListener('click', function() {		
		dv_edit_user.remove();
		user_logout();
		scroll_to_first_not_answered();
		return;
	});
	
	const dv_ed_usr = document.createElement("div");
	dv_ed_usr.classList.add("exam");
	dv_ed_usr.classList.add("grid_user_info");
	dv_edit_user.appendChild(dv_ed_usr);
	
	let htm_str = "";
	
	// NON EDITABLE INFO
	
	if(fb_usr != null){ htm_str = fb_usr.displayName; }	
	add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_google_name, id_goo_name, htm_str);
	htm_str = "";
	if(fb_usr != null){ htm_str = `<img class="img_observ" src="${fb_usr.photoURL}">`; }	
	add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_google_photo, id_goo_photo, htm_str);
	htm_str = "";
	if(fb_usr != null){ htm_str = fb_usr.email; }	
	add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_google_email, id_goo_email, htm_str);
	htm_str = "";
	const dv_qrcod = add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_sibiblia_qr, id_sibiblia_qr, htm_str);
	dv_qrcod.classList.add("qr_code_img");
	let the_link = "";
	if(fb_usr != null){ 
		const the_qr_maker = new QRCode(dv_qrcod, {
			width : 300,
			height : 300,
		});
		the_link = get_user_href(fb_usr);
		//console.log("LINK for QR code = " + the_link);
		the_qr_maker.makeCode(the_link);
	}

	if(fb_usr != null){ htm_str = the_link; }	
	add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_sibiblia_link, id_sibiblia_link, htm_str);
	htm_str = "";
	if(fb_usr != null){ htm_str = fb_usr.uid; }	
	add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_sibiblia_id, id_sibiblia_id, htm_str);
	htm_str = "";
	add_user_info_simple_html_line(dv_ed_usr, gvar.glb_curr_lang.msg_sibiblia_photo, id_sibiblia_photo, htm_str);
	
	// EDITABLE INFO
	
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_nequi, id_nequi_number, "number", 10, 10, 0);
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_paypal, id_paypal_email, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_transfiya, id_transfiya_number, "number", 10, 10, 0);
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_url_photo, id_url_photo, "text", 150, 150, "");
	
	add_user_info_select_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_country, id_country, gvar.glb_all_countries[gvar.glb_def_country], gvar.glb_all_countries);
	
	lbl = document.createElement("div");
	lbl.id = id_citizen_id_lbl;
	lbl.innerHTML = gvar.glb_all_id_names[gvar.glb_def_country];
	lbl.classList.add("exam", "big_font", "bold_font");
	lbl.classList.add("grid_item_auto_auto");
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(id_citizen_id, "number", 15, 15, 0, 10);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line();
	dv_ed_usr.appendChild(fld);	

	lbl = add_user_info_label(gvar.glb_curr_lang.msg_usr_birth_date);
	dv_ed_usr.appendChild(lbl);

	fld = add_user_info_field(id_birth_year, "number", 4, 4, 2024, 4);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_field(id_birth_month, "number", 2, 2, 12, 3);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_field(id_birth_day, "number", 2, 2, 31, 3);
	dv_ed_usr.appendChild(fld);
	
	fld = add_user_info_end_line();
	dv_ed_usr.appendChild(fld);	
	
	add_user_info_select_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_sex, id_sex, gvar.glb_all_sex["1"], gvar.glb_all_sex);
	
	add_user_info_select_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_marital_status, id_marital_status, 
							  gvar.glb_all_marital[gvar.glb_def_marital], gvar.glb_all_marital);
	
	if(fb_usr != null){ htm_str = fb_usr.displayName; }	
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_name, id_name, "text", 150, 150, htm_str);
	htm_str = "";
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_divorce_num, id_divorce_number, "number", 1, 1, 123);
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_children_num, id_children_number, "number", 2, 2, 123);
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_website, id_website, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_facebook, id_facebook, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_instagram, id_instagram, "text", 150, 150, "");
	add_user_info_simple_line(dv_ed_usr, gvar.glb_curr_lang.msg_usr_youtube, id_youtube, "text", 150, 150, "");
	
	//gvar.glb_all_countries[gvar.glb_def_country]
	//gvar.glb_all_countries[gvar.glb_def_country]

	const dv_ok = dv_edit_user.appendChild(document.createElement("div"));
	dv_ok.classList.add("exam");
	dv_ok.classList.add("grid_item_auto_span_4");
	dv_ok.classList.add("is_button");
	dv_ok.innerHTML = gvar.glb_curr_lang.msg_save;
	dv_ok.addEventListener('click', function() {
		gvar.current_user_info = get_user_info_object();
		//gvar.current_user_info = id_nequi_number;
		write_firebase_user_object((err) => {
			console.error(err);
		}).then((result)  => {
			dv_edit_user.remove();
			scroll_to_first_not_answered();
		});
		
		return;
	});
	
	if(fb_usr != null){
		read_firebase_user_object().then((result) => {
			if(DEBUG_USER_INFO){ 
				console.log("READ=");
				console.log(gvar.current_user_info);
			}
			
		});
	}	

	scroll_to_top(dv_edit_user);
}

function get_user_field(obj, id_fld, get_htm){
	const dv_fld = document.getElementById(id_fld);
	if(dv_fld == null){
		console.log("GET_user_field. No field with id = " + id_fld);
		return;
	}
	if(get_htm){
		obj[id_fld] = dv_fld.innerHTML;
	} else {
		obj[id_fld] = dv_fld.value;
	}
	if(DEBUG_USER_INFO){ 
		console.log("GET_user_field. id = " + id_fld + " = " + obj[id_fld]);
	}
}

function get_user_info_object(){
	const obj = {};
	//get_user_field(obj, id_sibiblia_link, true);
	//get_user_field(obj, id_sibiblia_id, true);
	get_user_field(obj, id_nequi_number);
	get_user_field(obj, id_paypal_email);
	get_user_field(obj, id_transfiya_number);
	get_user_field(obj, id_url_photo);
	get_user_field(obj, id_country, true);
	get_user_field(obj, id_citizen_id);
	get_user_field(obj, id_birth_year);
	get_user_field(obj, id_birth_month);
	get_user_field(obj, id_birth_day);
	get_user_field(obj, id_sex, true);
	get_user_field(obj, id_marital_status, true);
	get_user_field(obj, id_name);
	get_user_field(obj, id_divorce_number);
	get_user_field(obj, id_children_number);
	get_user_field(obj, id_website);
	get_user_field(obj, id_facebook);
	get_user_field(obj, id_instagram);
	get_user_field(obj, id_youtube);
	
	return obj;
}

function set_user_field(obj, id_fld, set_htm){
	const dv_fld = document.getElementById(id_fld);
	if(dv_fld == null){
		console.log("SET_user_field. No field with id = " + id_fld);
		return;
	}
	if(set_htm){
		dv_fld.innerHTML = obj[id_fld];
	} else {
		dv_fld.value = obj[id_fld];
	}
}

function fill_user_info(obj){
	if(obj == null){
		return;
	}
	//set_user_field(obj, id_sibiblia_link, true);
	//set_user_field(obj, id_sibiblia_id, true);
	set_user_field(obj, id_nequi_number);
	set_user_field(obj, id_paypal_email);
	set_user_field(obj, id_transfiya_number);
	set_user_field(obj, id_url_photo);
	set_user_field(obj, id_country, true);
	set_user_field(obj, id_citizen_id_lbl);
	set_user_field(obj, id_citizen_id);
	set_user_field(obj, id_birth_year);
	set_user_field(obj, id_birth_month);
	set_user_field(obj, id_birth_day);
	set_user_field(obj, id_sex, true);
	set_user_field(obj, id_marital_status, true);
	set_user_field(obj, id_name);
	set_user_field(obj, id_divorce_number);
	set_user_field(obj, id_children_number);
	set_user_field(obj, id_website);
	set_user_field(obj, id_facebook);
	set_user_field(obj, id_instagram);
	set_user_field(obj, id_youtube);
}

function write_firebase_user_object(err_fn){
	if(gvar.current_user_info == null){
		return;
	}
	if(fb_mod == null){
		console.log("CANNOT write_firebase_user_object. fb_mod == null");
		const dv_comm_info = document.getElementById(id_comm_info);
		dv_comm_info.innerHTML = gvar.glb_curr_lang.msg_fb_no_internet;
		return;
	}
	if(DEBUG_USER_INFO){ console.log("SAVING in https://todacarne-firebase-default-rtdb.firebaseio.com"); }
	const wr_obj = JSON.parse(JSON.stringify(gvar.current_user_info));
	return fb_mod.firebase_write_object(firebase_user_info_path, wr_obj, err_fn);
}

function read_firebase_user_object(){
	/*if(fb_mod != null){  // this was a test
		const the_app = fb_mod.md_app.initializeApp(fb_mod.firebase_config);
		const the_auth = fb_mod.md_auth.getAuth();
	}*/
	if(fb_mod == null){
		console.log("CANNOT read_firebase_user_object. fb_mod == null");
		const dv_comm_info = document.getElementById(id_comm_info);
		dv_comm_info.innerHTML = gvar.glb_curr_lang.msg_fb_no_internet;
		return;
	}
	if(DEBUG_USER_INFO){ console.log("LOADING from https://todacarne-firebase-default-rtdb.firebaseio.com"); }
	return fb_mod.firebase_read_object(firebase_user_info_path, (snapshot) => {
		if (snapshot.exists()) {
			const rd_obj = snapshot.val();
			gvar.current_user_info = JSON.parse(JSON.stringify(rd_obj));
			if(DEBUG_USER_INFO){ 
				console.log("read_firebase_user_object. FULL_OBJ=");
				console.log(gvar.current_user_info);
			}
			fill_user_info(gvar.current_user_info);
		} else {
			console.log("read_firebase_user_object. No data available");
		}
	});	
}

/* 
{
"id_ed_user_nequi_number":1,
"id_ed_user_paypal_email":1,
"id_ed_user_transfiya_number":1,
"id_ed_user_url_photo":1,
"id_ed_user_country":1,
"id_ed_user_citizen_id":1,
"id_ed_user_birth_year":1,
"id_ed_user_birth_month":1,
"id_ed_user_birth_day":1,
"id_ed_user_sex":1,
"id_ed_user_marital_status":1,
"id_ed_user_name":1,
"id_ed_user_divorce_number":1,
"id_ed_user_children_number":1,
"id_ed_user_website":1,
"id_ed_user_facebook":1,
"id_ed_user_instagram":1,
"id_ed_user_youtube":1
}
​
*/

