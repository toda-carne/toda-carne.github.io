
import { get_new_dv_under, gvar, get_qid_base, 
} from './tc_lang_all.js';

import { scroll_to_first_not_answered, scroll_to_top, toggle_select_option, is_observation, 
	fb_mod, id_dv_working_popup, close_pop_menu, get_user_path, 
} from './tc_exam.js';

const DEBUG_ADMIN_OPS = true;

const admin_ops = {
	op1:"Update module observations",
	op2:"Update module stats",
	op2:"Update all to update stats",
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
		if(val_sel_w == admin_ops.op2){
			update_module_stats();
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
	if(gvar.glb_poll_db.THIS_MODULE_NAME == null){
		console.log("CANNOT update_module_observations. gvar.glb_poll_db.THIS_MODULE_NAME == null");
		return;
	}
	
	if(fb_mod == null){ console.log("(fb_mod == null) in update_module_observations"); return; }
	if(fb_mod.tc_fb_app == null){ console.error("(fb_mod.tc_fb_app == null) in update_module_observations");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const ref_path = "modules/" + gvar.glb_poll_db.THIS_MODULE_NAME;
	const obj = get_module_observations_obj();
	
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	console.log("update_module_observations. db_ref = " + db_ref);
	fb_mod.md_db.set(db_ref, obj).catch((error) => { 
		console.error(error); 
	});
	
	close_pop_menu();
}

function update_user_module_in_stats(fb_database, the_uid, all_obs){
	const wr_data = {};

	const usr_path = get_user_path(the_uid);
	const old_stat_pth = usr_path + '/stats/' + gvar.glb_poll_db.THIS_MODULE_NAME;
	const in_stat_pth = usr_path + '/stats/in_stats/' + gvar.glb_poll_db.THIS_MODULE_NAME;
	const glb_stat_pth = 'stats/' + gvar.glb_poll_db.THIS_MODULE_NAME;	
	const to_upd_pth = 'to_update/' + gvar.glb_poll_db.THIS_MODULE_NAME + '/' + the_uid;
	const old_last_ck = all_obs.last_check;
	const old_num_ck = all_obs.num_checks;
	
	const all_qids = Object.keys(all_obs);
	for(const qid of all_qids){
		if(qid == "num_checks"){ continue; }
		if(qid == "last_check"){ continue; }
		
		const inc_val = all_obs[qid];
		wr_data[in_stat_pth + '/' + qid] = fb_mod.md_db.increment(inc_val);
		wr_data[glb_stat_pth + '/' + qid] = fb_mod.md_db.increment(inc_val);
	}
	
	//wr_data[in_stat_pth + '/last_check'] = old_last_ck;	
	wr_data[in_stat_pth + '/num_checks'] = fb_mod.md_db.increment(old_num_ck);
	//wr_data[glb_stat_pth + '/last_check'] = old_last_ck;	
	wr_data[glb_stat_pth + '/num_checks'] = fb_mod.md_db.increment(old_num_ck);

	wr_data[old_stat_pth] = {};
	
	wr_data[to_upd_pth] = {};
	
	if(DEBUG_ADMIN_OPS){ console.log("update_user_module_in_stats. full_data=" + JSON.stringify(wr_data, null, "  ")); }
	
	const db_ref = fb_mod.md_db.ref(fb_database);
	fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
}

function get_user_stats_module_path(the_uid){
	if(fb_mod == null){ return ""; }
	if(gvar.glb_poll_db.THIS_MODULE_NAME == null){ return ""; }
	const path = fb_mod.firebase_users_path + the_uid + '/stats/' + gvar.glb_poll_db.THIS_MODULE_NAME + "/";
	return path;
}

function update_user_module_stats(fb_database, the_uid){
	if(fb_mod == null){ console.log("(fb_mod == null) in update_module_observations"); return; }
	
	let path = null;
	let db_ref = null;
	let obj = null;
	
	const lock_pth = "doing_stats/" + the_uid;
	const lok_ref = fb_mod.md_db.ref(fb_database, lock_pth);
	fb_mod.md_db.set(lok_ref, 1).catch((error) => { console.error(error); });	
	
	path = get_user_stats_module_path(the_uid);
	db_ref = fb_mod.md_db.ref(fb_database, path);
	fb_mod.md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const all_obs = snapshot.val();
			update_user_module_in_stats(fb_database, the_uid, all_obs);
		} else {
			console.log("update_user_module_stats, No path_found. PATH=" + path);
		}
	}).catch((error) => {
		console.log("get failed. path = " + path);
		console.error(error);
	});
	
	fb_mod.md_db.remove(lok_ref);	
}

function update_module_stats(){	
	if(gvar.glb_poll_db.THIS_MODULE_NAME == null){
		console.log("CANNOT update_module_stats. gvar.glb_poll_db.THIS_MODULE_NAME == null");
		return;
	}
	
	if(fb_mod == null){ console.log("(fb_mod == null) in update_module_observations"); return; }
	if(fb_mod.tc_fb_app == null){ console.error("(fb_mod.tc_fb_app == null) in update_module_observations");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	//const ref_path = "users/list";
	const ref_path = "to_update/" + gvar.glb_poll_db.THIS_MODULE_NAME;
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	
	fb_mod.md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const all_usr = snapshot.val();
			const all_uid = Object.keys(all_usr);
			for(const the_uid of all_uid){
				update_user_module_stats(fb_database, the_uid);
			}
		} else {
			console.log("No user list !!! in update_module_stats");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	close_pop_menu();
}


/*
	<div id="id_pop_opt_sec"></div>
	<div id="id_user_info_sec"></div>
	<div id="id_admin_ops_sec"></div>
	
*/