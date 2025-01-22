
import { get_new_dv_under, gvar, 
} from './tc_lang_all.js';

import { scroll_to_first_not_answered, scroll_to_top, toggle_select_option, get_user_href, 
	fb_mod, 
} from './tc_exam.js';

const DEBUG_ADMIN_OPS = true;

const admin_ops = {
	"1":"Update module observations",
	"2":"Update module stats",
	"3":"Show user list",
	"4":"Block user",
	"5":"Unblock user",
};

const id_admin_ops = "id_admin_ops";

export function toggle_user_info(fb_usr){
	let lbl = null;
	let fld = null;
	
	const dv_exam_top = document.getElementById("id_exam_top_content");

	let dv_edit_user = null;
	dv_edit_user = get_new_dv_under(dv_exam_top, id_ed_user_info);
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

/*
	<div id="id_pop_opt_sec"></div>
	<div id="id_user_info_sec"></div>
	<div id="id_admin_ops_sec"></div>

*/