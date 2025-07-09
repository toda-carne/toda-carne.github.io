
import { get_new_dv_under, scroll_to_top, toggle_select_option, 
} from './bq_select_option_mgr.js';

import { gvar, get_qid_base, bib_defaults, is_observation
} from './bq_tools.js';

import { start_qmodu, 
	fb_mod, close_pop_menu, id_pop_menu_sele, toggle_verse_ed, get_default_verse_obj, get_bibref_in, 
} from './bq_quest_mgr.js';

import { load_qmodu, load_next_qmodu, } from './bq_module_mgr.js';

import { get_bib_verse, } from './bq_bible_mgr.js';

const DEBUG_ADMIN_OPS = false;
const DEBUG_UPDATE_STATS = true;

const admin_ops = {
	up_all:"Update ALL to Update",
	up_referrers:"Update ALL referrers",
	up_stats:"Update ALL stats",
	up_mods:"Update ALL module observations",
	up_qmodu_observ:"Update current module observations",
	up_qmodu_ustats:"Update current module to update user stats",
	show_user_list:"Show user list",
	block_user:"Block user",
	unblock_user:"Unblock user",
	download_db:"Download Database",
	//upload_index_W:`upload_index("W")`,
	//upload_index_S:`upload_index("S")`,
	//upload_index_A:`upload_index("A")`,
	//prt_tots:`print_totals()`,
	//prt_fl_tot:"print_file_totals()",
	//ini_atots:"init_ascii_totals()",
	get_verse:"get bible verse",
	//is_google_user:"Check if google signed-in",
	//show_server_timestamp:"Show server timestamp",
};

const id_admin_ops = "id_admin_ops";

function do_selec(val_sel_w){
	if(val_sel_w == admin_ops.up_referrers){
		update_ALL_referrers();
	}
	if(val_sel_w == admin_ops.up_mods){
		update_ALL_module_observations();
	}
	if(val_sel_w == admin_ops.up_stats){
		update_ALL_stats();
	}
	if(val_sel_w == admin_ops.up_qmodu_observ){
		update_current_module_observations();
	}
	if(val_sel_w == admin_ops.up_qmodu_ustats){
		update_module_stats(gvar.current_qmonam);
	}
	if(val_sel_w == admin_ops.download_db){
		//test_php();
		//sim_download('test_sim_download_jlq.txt', 'HOLA JOSE FUNCIONO!');
		//generate_and_download();
		download_database();
	}
	if(val_sel_w == admin_ops.get_verse){
		test_get_verse();
	}
	if(val_sel_w == admin_ops.upload_index_W){
		upload_index("W");
	}
	if(val_sel_w == admin_ops.upload_index_S){
		upload_index("S");
	}
	if(val_sel_w == admin_ops.upload_index_A){
		upload_index("A");
	}
	if(val_sel_w == admin_ops.prt_tots){
		print_totals();
	}
	if(val_sel_w == admin_ops.prt_fl_tot){
		print_file_totals();
	}
	if(val_sel_w == admin_ops.ini_atots){
		init_ascii_totals();
	}
	if(val_sel_w == admin_ops.show_server_timestamp){
		get_server_timestamp();
	}
}

export function toggle_admin_opers(fb_usr){
	let lbl = null;
	let fld = null;
	
	
	const dv_upper = document.getElementById("id_admin_ops_sec");
	const all_vals = Object.values(admin_ops);
	toggle_select_option(dv_upper, id_pop_menu_sele, all_vals, function(dv_ret_w, dv_ops_w, val_sel_w, idx_sel_w){
		do_selec(val_sel_w);
	});
	
	scroll_to_top(dv_upper);
}

function get_module_observations_obj(){
	const all_obs = gvar.all_observations;
	if(all_obs == null){ console.error("all_obs == null"); }
	return all_obs;
}

function update_current_module_observations(){
	if(gvar.current_qmonam == null){
		console.error("update_current_module_observations. gvar.current_qmonam == null");
		return;
	}
	
	if(fb_mod == null){ console.error("update_current_module_observations. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("update_current_module_observations. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const ref_path = fb_mod.firebase_bib_quest_path + "modules/" + gvar.current_qmonam;
	const obj = get_module_observations_obj();  // THIS ONLY WORKS FOR CURRENT MODULE
	
	if(DEBUG_ADMIN_OPS){ console.log("update_current_module_observations. PATH=" + ref_path + " full_data=\n" + JSON.stringify(obj, null, "  ")); }
	
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	console.log("update_current_module_observations. db_ref = " + db_ref);
	fb_mod.md_db.set(db_ref, obj).catch((error) => { 
		console.error(error); 
	});
	
	close_pop_menu();
}

function update_user_module_in_stats(fb_database, the_uid, qmonam, all_obs){
	const wr_data = {};
	
	const usr_path = fb_mod.firebase_get_user_path(the_uid);
	const old_stat_pth = usr_path + '/stats/to_add/' + qmonam;
	const in_stat_pth = usr_path + '/stats/in_stats/' + qmonam;
	const glb_stat_pth = fb_mod.firebase_bib_quest_path + 'stats/' + qmonam;	
	const to_upd_pth = fb_mod.firebase_bib_quest_path + 'to_update/' + qmonam + '/' + the_uid;
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

function get_user_stats_module_path(the_uid, qmonam){
	if(fb_mod == null){ return ""; }
	if(qmonam == null){ return ""; }
	const path = fb_mod.firebase_users_path + the_uid + '/stats/to_add/' + qmonam + "/";
	return path;
}

function update_user_module_stats(fb_database, the_uid, qmonam){
	if(fb_mod == null){ console.error("update_user_module_stats. fb_mod == null."); return; }
	if(DEBUG_UPDATE_STATS){ console.log("update_user_module_stats. Updating user " + the_uid + " | qmonam " + qmonam); }
	
	let path = null;
	let db_ref = null;
	let obj = null;
	
	const lock_pth = fb_mod.firebase_bib_quest_path + "doing_stats/" + the_uid;
	const lok_ref = fb_mod.md_db.ref(fb_database, lock_pth);
	fb_mod.md_db.set(lok_ref, 1).catch((error) => { console.error(error); });	
	
	path = get_user_stats_module_path(the_uid, qmonam);
	db_ref = fb_mod.md_db.ref(fb_database, path);
	fb_mod.md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const all_obs = snapshot.val();
			update_user_module_in_stats(fb_database, the_uid, qmonam, all_obs);
		} else {
			console.log("update_user_module_stats. No path_found. PATH=" + path);
		}
	}).catch((error) => {
		console.error("update_user_module_stats. get failed. path = " + path);
		console.error(error);
	});
	
	fb_mod.md_db.remove(lok_ref);
}

function update_module_stats(qmonam){	
	if(qmonam == null){
		console.error("CANNOT update_module_stats. qmonam == null");
		return;
	}
	
	if(fb_mod == null){ console.error("update_module_stats. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("update_module_stats. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	//const ref_path = "users/list";
	const ref_path = fb_mod.firebase_bib_quest_path + "to_update/" + qmonam;
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);
	
	fb_mod.md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			if(DEBUG_UPDATE_STATS){ console.log("update_module_stats. Updating all users for " + ref_path); }
			const all_usr = snapshot.val();
			const all_uid = Object.keys(all_usr);
			for(const the_uid of all_uid){
				update_user_module_stats(fb_database, the_uid, qmonam);
			}
		} else {
			console.log("update_module_stats. No user list for " + ref_path);
		}
	}).catch((error) => {
		console.error(error);
	});
	
	close_pop_menu();
}

function test_php(){
	const obj = { 
		campo3: "Este es el campo3",
		campo4: "Este es el campo4",
	};
	const data = { 
		file_name: "mi_nombre_de_archivo",
		content: obj,
	};
	
	const the_obj = JSON.stringify(data, null, "  ");
	const url1 = "../backups/save.php";
	
	fetch(url1, {
		method:"POST",
		headers: {
		   'Content-Type':'application/json',
		},
		body: the_obj,
	}).then((data_recv) => {
		console.log(data_recv);
		data_recv.text().then((txt) => {
			console.log(">>>>>\n" + txt + "\n<<<<<\n");
		});
	});
	
	console.log("Called test_php");
	close_pop_menu();
}

/*
 < *div id="id_pop_opt_sec"></div>
 <div id="id_user_info_sec"></div>
 <div id="id_admin_ops_sec"></div>
 
 */

/*
function sim_download(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);
	
	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	}
	else {
		pom.click();
	}
}

function generate_and_download(){
	const data = [];
	const obj = { 
		campo3: "Este es el campo3",
		campo4: "Este es el campo4",
	};
	const the_str = JSON.stringify(obj);
	data.push(the_str);
	
	const file = new File(data, "bajado.txt", {type: 'application/octet-stream'});
	var url = URL.createObjectURL(file);
	window.open(url);
	URL.revokeObjectURL(url); // This seems to work here.
}
*/

function download_database(){
	if(fb_mod == null){ console.error("download_database. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("download_database. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	const db_ref = fb_mod.md_db.ref(fb_database, fb_mod.firebase_bib_quest_path);
	
	fb_mod.md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const full_db = snapshot.val();
			save_file("FIREBASE_DATABASE_DOWLOADED.txt", full_db);
		} else {
			console.log("download_database. No database object !");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	close_pop_menu();
}

function save_file(nam, obj){
	const data = [];
	const the_str = JSON.stringify(obj, null, "  ");
	data.push(the_str);
	
	const file = new File(data, nam, {type: 'application/octet-stream'});
	var url = URL.createObjectURL(file);
	window.open(url);
	URL.revokeObjectURL(url); // This seems to work here.
}

function upload_index(kk){
	if(fb_mod == null){ console.error("upload_index. fb_mod == null."); return; }
	
	let code_kind = "code";
	if(kk == "S"){
		code_kind = "strong_code";
	} else if(kk == "W"){
		code_kind = "word_code";
	} else if(kk == "A"){
		code_kind = "ascii_code";
	}
	const mod_nm = "../bib_code_indexes/" + code_kind + ".js";
	import(mod_nm)
	.then((module) => {
		let obj = {};
		if(module != null){ 
			if(kk == "S"){
				obj = module.strong_code;
			} else if(kk == "W"){
				obj = module.word_code;
			} else if(kk == "A"){
				obj = module.ascii_code;
			}
			
			const pth = "bib_codes/" + code_kind;
			update_index_in_chunks(pth, obj).then((resp) => {
				console.log(`FINISHED UPLOAD OF ${mod_nm} OK`);
			});
		}
	})
	.catch((err) => {
		console.error(`Could NOT import ${mod_nm} err:` + err.message);
	});
	
	close_pop_menu();	
}

/*
async function update_index(pth, obj){
	if(fb_mod == null){ console.error("update_index. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("update_index. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const db_ref = fb_mod.md_db.ref(fb_database, pth);

	const ctr_pth = pth + "/total";
	const db_cnter = fb_mod.md_db.ref(fb_database, ctr_pth);	
	await fb_mod.md_db.set(db_cnter, 0).catch((error) => { 
		console.error(error); 
	});
	
	const codes = Object.keys(obj);
	for(const cod of codes){
		const wr_data = {};
		wr_data.total = fb_mod.md_db.increment(1);
		wr_data[cod] = obj[cod];
		await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
	}
}
*/

function print_totals(){
	if(fb_mod == null){ console.error("print_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("print_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth1 = "bib_codes/strong_code/total";
	const db_ref1 = fb_mod.md_db.ref(fb_database, pth1);
	fb_mod.md_db.get(db_ref1).then((snapshot) => {
		if (snapshot.exists()) {
			const tot = snapshot.val();
			console.log(pth1 + " = " + tot);
		} else {
			console.log("print_totals. firebase get " + pth1 + " failed. No data.");
		}
	}).catch((error) => {
		console.error("print_totals. firebase get " + pth1 + " failed. Cannot get.");
		console.error(error);
	});

	const pth2 = "bib_codes/word_code/total";
	const db_ref2 = fb_mod.md_db.ref(fb_database, pth2);
	fb_mod.md_db.get(db_ref2).then((snapshot) => {
		if (snapshot.exists()) {
			const tot = snapshot.val();
			console.log(pth2 + " = " + tot);
		} else {
			console.log("print_totals. firebase get " + pth2 + " failed. No data.");
		}
	}).catch((error) => {
		console.error("print_totals. firebase get " + pth2 + " failed. Cannot get.");
		console.error(error);
	});

	const pth3 = "bib_codes/ascii_code/total";
	const db_ref3 = fb_mod.md_db.ref(fb_database, pth3);
	fb_mod.md_db.get(db_ref3).then((snapshot) => {
		if (snapshot.exists()) {
			const tot = snapshot.val();
			console.log(pth3 + " = " + tot);
		} else {
			console.log("firebase get " + pth3 + " failed. No data.");
		}
	}).catch((error) => {
		console.error("print_totals. firebase get " + pth3 + " failed. Cannot get.");
		console.error(error);
	});
	
	close_pop_menu();
}

function init_strong_totals(){
	if(fb_mod == null){ console.error("init_strong_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("init_strong_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth1 = "bib_codes/strong_code/total";
	const db_ref1 = fb_mod.md_db.ref(fb_database, pth1);
	fb_mod.md_db.set(db_ref1, 0).catch((error) => { 
		console.error(error); 
	});

	close_pop_menu();
}

function init_word_totals(){
	if(fb_mod == null){ console.error("init_word_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("init_word_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth2 = "bib_codes/word_code/total";
	const db_ref2 = fb_mod.md_db.ref(fb_database, pth2);
	fb_mod.md_db.set(db_ref2, 0).catch((error) => { 
		console.error(error); 
	});

	close_pop_menu();
}

function init_ascii_totals(){
	if(fb_mod == null){ console.error("init_ascii_totals. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("init_ascii_totals. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const pth3 = "bib_codes/ascii_code/total";
	const db_ref3 = fb_mod.md_db.ref(fb_database, pth3);
	fb_mod.md_db.set(db_ref3, 0).catch((error) => { 
		console.error(error); 
	});
	
	close_pop_menu();
}

function get_file_total(kk){
	let code_kind = "code";
	if(kk == "S"){
		code_kind = "strong_code";
	} else if(kk == "W"){
		code_kind = "word_code";
	} else if(kk == "A"){
		code_kind = "ascii_code";
	}
	const mod_nm = "../bib_code_indexes/" + code_kind + ".js";
	import(mod_nm)
	.then((module) => {
		let obj = {};
		if(module != null){ 
			if(kk == "S"){
				obj = module.strong_code;
			} else if(kk == "W"){
				obj = module.word_code;
			} else if(kk == "A"){
				obj = module.ascii_code;
			}
			
			const all_keys = Object.keys(obj);
			console.log(`TOTAL KEYS IN ${mod_nm} =` + all_keys.length);
		}
	})
	.catch((err) => {
		console.error(`get_file_total. Could NOT import ${mod_nm} err:` + err.message);
	});
	
	close_pop_menu();	
}

function print_file_totals(){
	get_file_total("W");
	get_file_total("S");
	get_file_total("A");
}

async function update_index_in_chunks(pth, obj){
	if(fb_mod == null){ console.error("update_index_in_chunks. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("update_index_in_chunks. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	const db_ref = fb_mod.md_db.ref(fb_database, pth);

	const ctr_pth = pth + "/total";
	const db_cnter = fb_mod.md_db.ref(fb_database, ctr_pth);	
	await fb_mod.md_db.set(db_cnter, 0).catch((error) => { 
		console.error(error); 
	});
	
	const min_sz = 5000;
	
	const codes = Object.keys(obj);
	let wr_data = {};
	let chunk_sz = 0;
	for(const cod of codes){
		if(chunk_sz == min_sz){
			wr_data.total = fb_mod.md_db.increment(chunk_sz);
			await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
			console.log("UPDATED " + pth); 
			wr_data = {};
			chunk_sz = 0;
		}
		wr_data[cod] = obj[cod];
		chunk_sz++;
	}
	if(chunk_sz > 0){
		wr_data.total = fb_mod.md_db.increment(chunk_sz);
		await fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
		console.log("UPDATED " + pth); 
	}
}

async function update_ALL_module_observations(){
	if(gvar.conf_qmodus == null){ console.error("update_ALL_modules. gvar.conf_qmodus == null."); return; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	for(const qmonam of all_qmonams){
		await load_qmodu(qmonam);
		if(gvar.init_qmodu_db != null){
			start_qmodu(true);
		}
		update_current_module_observations();
	}
	await load_next_qmodu();
}

function update_ALL_stats(){
	if(gvar.conf_qmodus == null){ console.error("update_ALL_stats. gvar.conf_qmodus == null."); return; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	for(const qmonam of all_qmonams){
		update_module_stats(qmonam);
	}
}

function test_get_verse(){
	const dv_ops = document.getElementById("id_pop_opt_sec");
	/*
	if(dv_ops.tc_cit_obj == null){
		dv_ops.tc_cit_obj = get_default_verse_obj();
	}
	
	toggle_verse_ed(dv_ops);
	*/
	
	//get_bibref_in(dv_ops);
	
	get_bib_verse("SBLM", "revelation", 22, 20).then((resp) => {
		dv_ops.innerHTML = resp;
	});
}

async function update_ALL_referrers(){	
	console.log("Called update_ALL_referrers.");
	close_pop_menu();
	
	if(fb_mod == null){ console.error("update_module_stats. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("update_module_stats. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);
	
	//const ref_path = "users/list";
	const ref_path = fb_mod.firebase_bib_quest_path + "to_update/referred_by";
	const db_ref = fb_mod.md_db.ref(fb_database, ref_path);

	const snapshot = await fb_mod.md_db.get(db_ref).catch((error) => { console.error("update_ALL_referrers. get failed." + error); });
	if(! snapshot.exists()) {
		console.log("update_ALL_referrers. Nothing to update.");
		return;
	}
	
	const all_usr = snapshot.val();
	const all_uid = Object.keys(all_usr);
	for(const the_uid of all_uid){
		update_user_referrer(fb_database, the_uid);
	}
	
}

async function update_user_referrer(fb_database, the_uid){
	const db = fb_database;
	const upd_path = fb_mod.firebase_bib_quest_path + "to_update/referred_by/" + the_uid;
	
	const usr_path = fb_mod.firebase_get_user_path(the_uid);
	const rf_by_path = usr_path + "/referrer_by";
	const cand_path = rf_by_path + "/cand";
	const confir_path = rf_by_path + "/confirmed";

	const db_base_ref = fb_mod.md_db.ref(db);
	const wr_data = {};
	wr_data[upd_path] = {};
	
	let rf_by = null;
	let usr2_path = null;
	let rf_of_path = null;
	
	const db_rf_by = fb_mod.md_db.ref(db, rf_by_path);
	const snapshot = await fb_mod.md_db.get(db_rf_by);
	if(snapshot.exists()) {
		rf_by = snapshot.val();
	} 
	
	if((rf_by != null) && (rf_by.cand != null)){
		wr_data[cand_path] = {};
		wr_data[confir_path] = rf_by.cand;
		usr2_path = fb_mod.firebase_get_user_path(rf_by.confirmed);
		rf_of_path = usr2_path + "/referrer_of/" + the_uid;
		wr_data[rf_of_path] = 1;
	}
	if((rf_by != null) && (rf_by.confirmed != null)){
		usr2_path = fb_mod.firebase_get_user_path(rf_by.confirmed);
		rf_of_path = usr2_path + "/referrer_of/" + the_uid;
		wr_data[rf_of_path] = {};
	}
	
	fb_mod.md_db.update(db_base_ref, wr_data).catch((error) => { console.error(error); });	
}

function get_server_timestamp(){
	if(fb_mod == null){ console.error("get_server_timestamp. fb_mod == null."); return; }
	if(fb_mod.tc_fb_app == null){ console.error("get_server_timestamp. fb_mod.tc_fb_app == null.");  return; }
	const fb_database = fb_mod.md_db.getDatabase(fb_mod.tc_fb_app);

	//console.log(fb_mod.md_db);
	//fb_mod.md_db.serverTimestamp();

	const wr_data = {};
	
	const ref_path = fb_mod.firebase_bib_quest_path + "test_area/";
	
	wr_data[ref_path + 'timestamp_jlq'] = fb_mod.md_db.serverTimestamp();
	
	const db_ref = fb_mod.md_db.ref(fb_database);
	fb_mod.md_db.update(db_ref, wr_data).catch((error) => { console.error(error); });	
	
	// 1746139712609
	// 2025/05/1 5:48 pm aprox
}

