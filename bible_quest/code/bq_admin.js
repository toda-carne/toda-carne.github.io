
import { get_new_dv_under, gvar, get_qid_base, 
} from './tc_lang_all.js';

import { scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	fb_mod, id_dv_working_popup, close_pop_menu, 
} from './tc_exam.js';

const DEBUG_ADMIN_OPS = true;

const admin_ops = {
	op1:"Update module observations",
	op2:"Update module stats",
	op3:"Show user list",
	op4:"Block user",
	op5:"Unblock user",
};

const id_admin_ops = "id_admin_ops";

export function toggle_admin_opers(fb_usr){
	let lbl = null;
	let fld = null;
	
	
	const dv_upper = document.getElementById("id_admin_ops_sec");
	const all_vals = Object.values(admin_ops);
	toggle_select_option(dv_upper, all_vals, function(dv_ret_w, dv_ops_w, val_sel_w, idx_sel_w){
		if(val_sel_w == admin_ops.op1){
			update_module_observations();
		}
	});

	scroll_to_top(dv_upper);
}

function is_valid_observ(qid){
	if(get_qid_base(qid) == null){ return false; }
	const quest = gvar.glb_poll_db[qid];
	if(! is_observation(quest)){ return false; }
	return true;
}

function get_module_observations_obj(){
	const all_obs = {};
	const all_qids = Object.keys(gvar.glb_poll_db);
	for(const qid of all_qids){
		if(is_valid_observ(qid)){
			all_obs[qid] = 1;
		}
	}
	return all_obs;
}

function update_module_observations(){
	if(fb_mod == null){ console.log("(fb_mod == null) in update_module_observations"); return; }
	if(fb_mod.tc_fb_app == null){ console.error("(fb_mod.tc_fb_app == null) in update_module_observations");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const ref_path = "modules/" + gvar.glb_poll_db.THIS_MODULE_NAME;
	const obj = get_module_observations_obj();
	
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	console.log("update_module_observations. db_ref = " + db_ref);
	fb_mod.md_db.set(db_ref, obj).catch((error) => { 
		console.error(error); 
		if(err_fn != null){ err_fn(error); }
	});
	
	close_pop_menu();
}


/*
	<div id="id_pop_opt_sec"></div>
	<div id="id_user_info_sec"></div>
	<div id="id_admin_ops_sec"></div>
	
		"modules": {
			".read": "root.child('admins').child(auth.uid).exists()",
			".write": "root.child('admins').child(auth.uid).exists()",
			"$module_name": {
				".validate": "newData.isString() && newData.val().length < 100",
				"$observation_qid": {
					".validate": "newData.isString() && newData.val().length < 400",
					"$val": {
						".validate": "newData.isNumber() && (newData.val() === 1)",
					},
				},
			},
		},
	
		"modules": {
			".read": "root.child('admins').child(auth.uid).exists()",
			".write": "root.child('admins').child(auth.uid).exists()",
			".validate": "true",
		},

*/