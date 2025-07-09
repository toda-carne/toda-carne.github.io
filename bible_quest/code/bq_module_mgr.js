
import { gvar, init_glb_vars, get_qid_base, init_default_lang, } from './bq_tools.js';
import { init_page_buttons, init_firebase_mgr, fb_mod, fill_div_user, init_page_exam, start_qmodu, update_qmodu_title, add_last_module_ending, 
	write_exam_object, read_exam_object, 
} from './bq_quest_mgr.js';

import { init_loc_cand_referrer, 
} from './bq_referrer_mgr.js';

import { init_qmodu_info, } from '../quest_conf/bq_modules.js';

const PERSISTANT_STATE = true;
const DEBUG_LOADER = true;

const INVALID_MONAM = "INVALID_MONAM";
const INVALID_TITLE = "INVALID_TITLE";

let site_lang = "en";
let local_conf_qmodus = null;
let bq_st_user_finished_qmodules = null;

const STORAGE_FINI_QMODUS_ID = "STORAGE_FINI_QMODUS_ID";
const STORAGE_CURRENT_QMONAM = "STORAGE_CURRENT_QMONAM";
const FINISHED_QMONAM = "FINISHED_QMONAM";

function read_storage_fini_qmodus(){
	let all_fini_str = window.localStorage.getItem(STORAGE_FINI_QMODUS_ID);
	let all_fini = {};
	if(all_fini_str != null){
		all_fini = JSON.parse(all_fini_str);
	}
	return all_fini;
}

export function write_storage_fini_qmodus(all_fini){
	const prev = read_storage_fini_qmodus();
	const are_eq = objs_eq(prev, all_fini);
	if(! are_eq){
		window.localStorage.setItem(STORAGE_FINI_QMODUS_ID, JSON.stringify(all_fini));
	}
	return are_eq;
}

function objs_eq(obj1, obj2){
	const s1 = JSON.stringify(obj1);
	const s2 = JSON.stringify(obj2);
	return (s1 == s2);
}

export function set_fini_qmodu(qmonam){
	const all_fini = get_fini_qmodus();
	all_fini[qmonam] = 1;
	write_storage_fini_qmodus(all_fini);
}

export function is_fini_qmodu(qmonam){
	const all_fini = get_fini_qmodus();
	return all_fini[qmonam];
}

function get_fini_qmodus(){
	let all_fini = null;
	if((fb_mod != null) && (fb_mod.bq_fb_user_finished_qmodules != null)){ 
		all_fini = fb_mod.bq_fb_user_finished_qmodules;		
	} else if(bq_st_user_finished_qmodules != null){ 
		all_fini = bq_st_user_finished_qmodules;
	} else {
		bq_st_user_finished_qmodules = read_storage_fini_qmodus();
		all_fini = bq_st_user_finished_qmodules;
	}
	return all_fini;
}

function init_conf_qmodus(){
	if(local_conf_qmodus == null){ 
		const loc_vars = {};
		init_qmodu_info(loc_vars);
		local_conf_qmodus = loc_vars.conf_qmodus;
	}
	if(gvar.conf_qmodus == null){ 
		gvar.conf_qmodus = local_conf_qmodus;
	}
}

function get_nxt_qmonam(){
	if(gvar.conf_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus == null."); return null; }
	if(gvar.conf_qmodus.all_qmodus == null){ console.error("get_nxt_qmonam. gvar.conf_qmodus.all_qmodus == null."); return null; }
	const all_qmonams = Object.keys(gvar.conf_qmodus.all_qmodus);
	const all_fini = get_fini_qmodus();
	for(const qmonam of all_qmonams){
		if(! is_qmodu_dnf_sat(qmonam, all_fini)){
			continue;
		}
		if(all_fini[qmonam] == null){
			return qmonam;
		}
	}
	if(all_qmonams.length > 0){
		const fst_qmonam = all_qmonams[0];
		if(all_fini[fst_qmonam] == null){
			return fst_qmonam;
		}
	}
	return null;
}

let md_lang = null;
let md_txt = null;
let md_cont_db = null;

async function import_file(mod_nm){
	if(mod_nm == null){ return null; }
	const resp = import(mod_nm);
	return resp;
}

function init_all_jsmod_handles(){
	//md_lang = null;  // old lang mng
	md_txt = null;
	md_cont_db = null;
}

async function import_qmodu_files(qmonam){
	if(gvar.conf_qmodus == null){ console.error("import_qmodu_files. gvar.conf_qmodus == null."); return; }
	
	init_all_jsmod_handles();

	let txt_fn = null;
	let db_fn = null;

	if(qmonam != null){
		const txt_fnams = gvar.conf_qmodus.all_qmodus[qmonam].text_lang;
		txt_fn = "../" + txt_fnams[site_lang];
		db_fn = "../" + gvar.conf_qmodus.all_qmodus[qmonam].quest_file;
	}
	const results = await Promise.all([
		import_file(txt_fn),
		import_file(db_fn),
	]);
	
	md_txt = results[0];
	md_cont_db = results[1];
}

function get_title(){
	if(gvar.current_qmonam == null){ console.error("write_firebase_qmodu_results. gvar.current_qmonam == null."); return INVALID_TITLE; }
	if(gvar.conf_qmodus == null){ return INVALID_TITLE; }
	const cf_qmodu = gvar.conf_qmodus.all_qmodus[gvar.current_qmonam];
	let title = gvar.current_qmonam;
	let d_nam = null;
	if(cf_qmodu.display_name != null){ d_nam = cf_qmodu.display_name[gvar.site_lang]; }
	if(d_nam != null){ title = d_nam; }
	
	return title;
}

export async function load_qmodu(qmonam, st_qmodu){
	init_all_jsmod_handles();
	const all_vars = {};
	init_default_lang(all_vars);
	md_lang.init_lang_module(all_vars);
	
	all_vars.site_img_dir = "../img/";
	all_vars.qmodu_img_dir = "../img/"
	all_vars.site_lang = site_lang;
	all_vars.qmodule_title = INVALID_TITLE;
	init_glb_vars(all_vars);	
	init_conf_qmodus();
	
	if(qmonam != null){ 
		console.log("CURRENT MODULE NAME:" + qmonam);	
		gvar.current_qmonam = qmonam;
		gvar.qmodule_title = get_title();
	}
	init_page_exam();
	
	await import_qmodu_files(qmonam);	

	update_qmodu_title();
	
	if(gvar.conf_qmodus.image_dir != null){ gvar.site_img_dir = "../" + gvar.conf_qmodus.image_dir + "/"; }
	
	if(qmonam != null){ 
		const cf_qmodu = gvar.conf_qmodus.all_qmodus[qmonam];	
		if(cf_qmodu.image_dir != null){ gvar.qmodu_img_dir = "../" + cf_qmodu.image_dir + "/"; }
	}	
	
	if(md_txt != null){
		md_txt.init_module_text();
	}

	if(md_cont_db != null){
		if(gvar.current_qmonam == null){ console.error("gvar.current_qmonam == null"); }
		gvar.init_qmodu_db = md_cont_db.init_exam_database;
		if(st_qmodu){ 
			if(PERSISTANT_STATE && (st_qmodu == 2)){ 
				read_exam_object(get_save_name()); 					
			} else {
				start_qmodu();
			}
		}
	}

	if(qmonam == null){
		add_last_module_ending();
	}
}

export async function load_next_qmodu(st_qmodu = 2){
	const qmonam = get_nxt_qmonam();
	console.log("load_next_qmodu. qmonam = " + qmonam);
	await load_qmodu(qmonam, st_qmodu);
}

function get_storage_current_qmonam(){
	let qmonam = null;
	if(PERSISTANT_STATE){ qmonam = window.localStorage.getItem(STORAGE_CURRENT_QMONAM); }
	if((qmonam == null) || (qmonam == "null")){  // CAREFUL TRICKY CONDITION. IT IS A STRING !!!
		window.localStorage.setItem(STORAGE_CURRENT_QMONAM, "null");
		qmonam = get_nxt_qmonam();
	}
	if(qmonam == FINISHED_QMONAM){
		window.localStorage.setItem(STORAGE_CURRENT_QMONAM, "null");
		qmonam = null;
	}
	return qmonam;
}

function get_save_name(){
	if(gvar.current_qmonam == null){ console.error("get_save_name.(gvar.current_qmonam == null)"); return null; }
	if(gvar.conf_qmodus == null){ console.error("get_save_name.(gvar.conf_qmodus == null)"); return null; }
	const cf_qmodu = gvar.conf_qmodus.all_qmodus[gvar.current_qmonam];
	let d_nam = null;
	if(cf_qmodu.save_name != null){ d_nam = cf_qmodu.save_name[gvar.site_lang]; }
	return d_nam;
}

async function init_current_qmodu(){
	const qmonam = get_storage_current_qmonam();
	console.log("init_current_qmodu. qmonam = " + qmonam);
	await load_qmodu(qmonam, 2);
	fill_div_user();
}

export async function start_module_mgr(lang_md, curr_lang){	
	md_lang = lang_md;
	site_lang = curr_lang;
	if(PERSISTANT_STATE){ window.addEventListener('beforeunload', save_current_qmodu_hdlr); }
	init_page_buttons();
	init_conf_qmodus();
	init_loc_cand_referrer();
	try {
		await init_firebase_mgr();
		await init_current_qmodu();
	} catch(err) {
		console.error("start_module_mgr. init_firebase_mgr FAILED. " + err.message);
		await init_current_qmodu();
	}
	//check_google();
}

function save_current_qmodu_hdlr(){
	if(gvar.current_qmonam != null){
		window.localStorage.setItem(STORAGE_CURRENT_QMONAM, gvar.current_qmonam);
		if(PERSISTANT_STATE){ write_exam_object(get_save_name()); }
	} else {
		window.localStorage.setItem(STORAGE_CURRENT_QMONAM, FINISHED_QMONAM);
	}
}

function is_qmodu_dnf_sat(monam, all_fini){
	if(monam == null){ return false; }
	const qmodu = gvar.conf_qmodus.all_qmodus[monam];
	if(qmodu == null){ return false; }
	if(qmodu.debug){ console.log("Called is_qmodu_dnf_sat. monam=" + monam); }
	//if
	qmodu.last_sat_conj = null;
	
	if(qmodu.pre_req == null){ 
		return true;
	}
	
	const act_if = Object.entries(qmodu.pre_req);
	for (const [conj_id, conj_obj] of act_if) {
		if(conj_obj == null){ continue; }
		const conj = Object.entries(conj_obj);
		let conj_act = true;
		
		//console.log(" | monam=" + monam + " | conj_id=" + conj_id + " conj_obj=" + JSON.stringify(conj_obj, null, "  "));
		for (const [cond_monam, resps_obj] of conj) {
			if(all_fini[cond_monam] != resps_obj){
				conj_act = false; break; 
			}
		}
		if(conj_act){
			if(qmodu.debug){ console.log("is_qmodu_dnf_sat. monam=" + monam + " IS_SAT"); }
			qmodu.last_sat_conj = conj_id;
			return true;
		}
	}
	if(qmodu.debug){ console.log("is_qmodu_dnf_sat. monam=" + monam + " NOT_sat"); }
	qmodu.last_sat_conj = null;
	return false;
}

/*
function user_has_google_id(){
  const cookies = document.cookie.split(';');
  let ii = 0;
  for(ii = 0; ii < cookies.length; ii++){
    const cookie = cookies[ii].trim();
	console.log('user_has_google_id. cookie=' + cookie);
    if(cookie.startsWith('__Secure-3PAPISID=') || cookie.startsWith('__Secure-3PSID=') || cookie.startsWith('APISID=')) {
		console.log('user_has_google_id. TIENE sesion.');
		return true;
    }
  }
  console.log('user_has_google_id. SIN sesion.');
  return false;	
}
function check_google(){
	console.log('CALLING check_google.');
	try{
		gapi.load('auth2', (pm) => {
			console.log('check_google. FINNISHED load.');
			gapi.auth2.init({ client_id: "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com" }).then((pm2) => {
				console.log('check_google. FINNISHED init.');
				const inst_auth = gapi.auth2.getAuthInstance();
				const is_sgin = inst_auth.isSignedIn.get();
				if(is_sgin){
					console.log('ESTA_LOGEADO_EN_GOOGLE');
				} else {
					console.log('no_esta_logeado_en_google');
				}
			});
		});
	} catch(error) {
		console.error(error);
	}
}

function check_google(){
	console.log('CALLING check_google.');
	try{
		google.accounts.id.initialize({
			//client_id: "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com",
			client_id: "313540425147-g2070bfjvbgvtjjefjd7r43s3vj8vlmu.apps.googleusercontent.com",
			callback: handle_ini_ok,
			error_callback: handle_ini_bad,
		});
		google.accounts.id.getStatus({
			callback: (status) => {
				if (status.signedIn) {
					console.log('User is already signed in.');
					// You can optionally retrieve more user details here
					google.accounts.id.getProfile()
					.then(profile => {
						console.log('User profile:', profile);
					})
					.catch(error => {
						console.error('Error getting user profile:', error);
					});
				} else {
					console.log('User is not signed in.');
				}
			}
		});
		//google.accounts.id.prompt();
		//handle_ini_ok();
		console.log('AFTER initialize.');
	} catch(error) {
		console.error(error);
	}
}

function handle_ini_ok(resp){
	console.log('CALLING handle_ini_ok.');
	console.log(resp);
	google.accounts.id.getStatus().then((status) => {
		if(status === google.accounts.id.SignInStatus.SESSION_ALIVE){
			console.log('TIENE SESION.');
		} else {
			console.log('no tiene sesion.');
		}
	});
}

function handle_ini_bad(resp){
	console.log('CALLING handle_ini_bad.');
	console.log(resp);
}

function check_google(){
	console.log('CALLING check_google.');
	if(fb_mod == null){
		console.log('check_google. (fb_mod == null)');
		return;
	}
	fb_mod.firebase_has_current_user();
}

//const APP_CLIENT_ID = "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com";
const APP_CLIENT_ID = "313540425147-g2070bfjvbgvtjjefjd7r43s3vj8vlmu.apps.googleusercontent.com";

function check_google(){
	console.log('CALLING check_google.');
	try{
		google.accounts.id.initialize({
			client_id: APP_CLIENT_ID,
			//cookiepolicy: 'single_host_origin',
			callback: handle_ini_ok,
			error_callback: handle_ini_bad,
		});
		//google.accounts.id.prompt();
		//handle_ini_ok();
		console.log('AFTER initialize.');
	} catch(error) {
		console.error(error);
	}
}

function handle_ini_ok(resp){
	console.log('CALLING handle_ini_ok.');
	console.log(resp);
	google.accounts.getTokens({
		client_id: APP_CLIENT_ID,
		callback: (response) => {
			if (response.accessToken) {
				console.log('handle_ini_ok. Sesión de Google INICIADA');
			} else {
				console.log('handle_ini_ok. Sesión de Google NO iniciada');
			}
		}
	});
}

function handle_ini_bad(resp){
	console.log('CALLING handle_ini_bad.');
	console.log(resp);
}


*/

