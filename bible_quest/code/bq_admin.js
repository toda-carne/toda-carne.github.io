
import { get_new_dv_under, gvar, 
} from './tc_lang_all.js';

import { scroll_to_first_not_answered, scroll_to_top, toggle_select_option, 
	fb_mod, id_dv_working_popup, 
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

export function toggle_admin_opers(fb_usr){
	let lbl = null;
	let fld = null;
	
	
	const dv_upper = document.getElementById("id_admin_ops_sec");
	const all_vals = Object.values(admin_ops);
	toggle_select_option(dv_upper, all_vals, null);

	scroll_to_top(dv_upper);
}

/*
	<div id="id_pop_opt_sec"></div>
	<div id="id_user_info_sec"></div>
	<div id="id_admin_ops_sec"></div>

*/