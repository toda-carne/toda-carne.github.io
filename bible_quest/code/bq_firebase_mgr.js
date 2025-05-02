
import { get_date_and_time, } from './bq_tools.js';

import { write_storage_fini_qmodus, load_next_qmodu, } from './bq_module_mgr.js';

import { get_loc_cand_referrer, get_loc_confirmed_referrer, set_loc_confirmed_referrer, set_loc_cand_referrer, 
} from './bq_referrer_mgr.js';


"use strict";

// CDN COntent D Network (gstatic)
/*
const fb_app_js = "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
const fb_auth_js = "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
const fb_database_js = "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
*/

//import * as MOD_GSI from "https://cdn.jsdelivr.net/npm/google-sign-in@latest/dist/google-sign-in.js";
//import * as MOD_GSI from "https://apis.google.com/js/platform.js";
//import * as MOD_GSI from "https://apis.google.com/js/google-sign-in.js";
//import * as MOD_GAPI from "https://apis.google.com/js/api:client.js";
//import { load } from "https://apis.google.com/js/api:client.js";

import * as MOD_APP from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import * as MOD_AUTH from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import * as MOD_DB from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const DEBUG_FB_LOGIN = false;
const DEBUG_FB_CHECK = false;
const DEBUG_FB_ADMIN = true;
const DEBUG_FB_finished_qmodu = false;

export let md_app = null;
export let md_auth = null;
export let md_db = null;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebase_config = {
	apiKey: "AIzaSyCc0og3bSe6mKvsBIFsoxYOCEmONmEF4P0",
	authDomain: "todacarne-firebase.firebaseapp.com",
	databaseURL: "https://todacarne-firebase-default-rtdb.firebaseio.com",
	projectId: "todacarne-firebase",
	storageBucket: "todacarne-firebase.appspot.com",
	messagingSenderId: "313540425147",
	appId: "1:313540425147:web:08947128762713d577009e",
	measurementId: "G-GL4NXH7Q2R"
};

export const firebase_bib_quest_path = 'bib_quest/';
export const firebase_users_path = firebase_bib_quest_path + 'users/';
export const firebase_users_list_path = firebase_users_path + 'list/';
export const firebase_ck_admin_path = firebase_bib_quest_path + 'ck_admin/';

//let analytics = getAnalytics(tc_fb_app);
export let tc_fb_app = null;
export let tc_fb_auth = null;
export let tc_fb_user = null;
export let tc_fb_is_admin = false;
export let bq_fb_user_finished_qmodules = null;


function init_mod_vars(){
	if(md_app != null){ return; }
	md_app = MOD_APP;
	md_auth = MOD_AUTH;
	md_db = MOD_DB;
}

/*
 *      In order to work from toda-carne.github.io
 *      
 *      I MUST add the domain to
 *      
 *      firebase console > Athentication > Settings > Authorized Domains
 *      google console > APIs & Services > Credentials > API Keys > Browser Key
 */
export function firebase_check_login(err_fn){
	if(DEBUG_FB_LOGIN){ 
		console.log("firebase_check_login. CALLED. "); 
	}
	init_mod_vars();
	if(tc_fb_user != null){
		return new Promise((resolve, reject) => {
			resolve('database != null');
		});
	}
	// Initialize Firebase
	if(tc_fb_app == null){ tc_fb_app = md_app.initializeApp(firebase_config); }
	//const analytics = getAnalytics(tc_fb_app);
	
	const fb_provider = new md_auth.GoogleAuthProvider();
	
	fb_provider.setCustomParameters({
		prompt: "select_account",
		//button_auto_select: true,
		//auto_select: true,
	});
	
	if(tc_fb_auth == null){ tc_fb_auth = md_auth.getAuth(); }
	
	return md_auth.signInWithPopup(tc_fb_auth, fb_provider).then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const fb_credential = md_auth.GoogleAuthProvider.credentialFromResult(result);
		const fb_token = fb_credential.accessToken;
		// The signed-in user info.
		tc_fb_user = result.user;
		// IdP data available using getAdditionalUserInfo(result)
		
		if(DEBUG_FB_LOGIN){
			console.log('token=' + fb_token);
			console.log('user=' + JSON.stringify(tc_fb_user));
			console.log('User_id=' + tc_fb_user.uid);
			console.log('User_name=' + tc_fb_user.displayName);
			console.log("User_email=" + tc_fb_user.email);
			console.log("User_emailVerified=" + tc_fb_user.emailVerified);
			console.log("User_photoURL=" + tc_fb_user.photoURL);
			console.log('finished_login');
		}
		
		firebase_write_user_id();
		
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = md_auth.GoogleAuthProvider.credentialFromError(error);
		
		console.log('errorCode=' + errorCode);
		console.log('errorMessage=' + errorMessage);
		console.log('credential=' + credential);
		
		if(err_fn != null){ err_fn(error); }
	});      
	
}

export function firebase_get_user_path(the_uid){
	if(tc_fb_user == null){ return "INVALID_USER_PATH";}
	if(the_uid == null){ the_uid = tc_fb_user.uid; }
	const path = firebase_users_path + the_uid;
	return path;
}

async function firebase_update_user_referrer(force_it){
	init_mod_vars();
	
	console.log("Called firebase_update_user_referrer.");
	
	const cand = get_loc_cand_referrer();
	const confir = get_loc_confirmed_referrer();
	const norm = (force_it == null);
	if(norm && (cand == null)){ return; }
	if(norm && (confir != null)){ return; }
	
	console.log("Doing firebase_update_user_referrer.");
	
	if(tc_fb_app == null){ console.error("firebase_update_user_referrer. (tc_fb_app == null)");  return; }
	const db = md_db.getDatabase(tc_fb_app);
	
	const upd_path = firebase_bib_quest_path + "to_update/referred_by/" + tc_fb_user.uid;
	const upd_ref = md_db.ref(db, upd_path);
	
	const usr_path = firebase_get_user_path();
	const referrer_path = usr_path + "/referrer_by";
	const db_ref = md_db.ref(db, referrer_path);
	
	const wr_data = {};
	const snapshot = await md_db.get(db_ref);
	if(! snapshot.exists()) {
		if(cand != null){
			wr_data.cand = cand;
			md_db.update(db_ref, wr_data).catch((error) => { console.error("firebase_update_user_referrer. " + error); });	
			md_db.set(upd_ref, 1).catch((error) => { console.error(error); });	
		}
		return;
	} 
	const fb_rf_by = snapshot.val();
	if(fb_rf_by.confirmed != null){
		set_loc_confirmed_referrer(fb_rf_by.confirmed);
		if(confir == null){
			set_loc_cand_referrer(null);
		}
	}
	if((cand == null) && (fb_rf_by.cand != null)){
		set_loc_cand_referrer(fb_rf_by.cand);
	}
	if((cand != null) && force_it){
		wr_data.cand = cand;		
		md_db.update(db_ref, wr_data).catch((error) => { console.error("firebase_update_user_referrer. " + error); });	
		md_db.set(upd_ref, 1).catch((error) => { console.error(error); });	
	}
}

async function firebase_get_user_finished_qmodules(){
	init_mod_vars();
	if(bq_fb_user_finished_qmodules != null){ return; }
	if(tc_fb_app == null){ console.error("firebase_get_user_finished_qmodules. (tc_fb_app == null)");  return; }
	const db = md_db.getDatabase(tc_fb_app);
	
	const usr_path = firebase_get_user_path();
	const finished_path = usr_path + "/finished";
	const db_ref = md_db.ref(db, finished_path);
	
	const snapshot = await md_db.get(db_ref);
	if(! snapshot.exists()) {
		console.log("firebase_get_user_finished_qmodules. No path_found. PATH=" + finished_path);
		bq_fb_user_finished_qmodules = null;
		return;
	}
	bq_fb_user_finished_qmodules = snapshot.val();
	if(DEBUG_FB_finished_qmodu){ console.log(bq_fb_user_finished_qmodules); }
	
	const were_eq = write_storage_fini_qmodus(bq_fb_user_finished_qmodules);
	if(! were_eq){
		console.log("firebase_get_user_finished_qmodules. CALLING load_next_qmodu. DIFFERENT FINISHED MODULES !!!");
		load_next_qmodu();
	}
}

export function firebase_has_current_user(){
	init_mod_vars();
	try {
		if(tc_fb_app == null){ tc_fb_app = md_app.initializeApp(firebase_config); }
		if(tc_fb_auth == null){ tc_fb_auth = md_auth.getAuth(); }
		console.log("firebase_has_current_user. tc_fb_auth=");
		console.log(tc_fb_auth);
		if(tc_fb_auth.currentUser){
			console.log("firebase_has_current_user. tc_fb_auth.currentUser=");
			console.log(tc_fb_auth.currentUser);
		} else {
			console.log("firebase_has_current_user. NO TIENEN USUARIO EN SESION");
		}
	} catch(error){
		console.error("ERROR in firebase_has_current_user.");
		console.error(error);
	}
}

export async function firebase_check_user(callbk){
	init_mod_vars();
	try {
		if(tc_fb_app == null){ tc_fb_app = md_app.initializeApp(firebase_config); }
		if(tc_fb_auth == null){ tc_fb_auth = md_auth.getAuth(); }
		const db = md_db.getDatabase(tc_fb_app);
		if(db == null){ return; }
		
		if(DEBUG_FB_CHECK){
			const cn_ref = md_db.ref(db, ".info/connected");
			if(cn_ref == null){ return; }
			md_db.onValue(cn_ref, (snap) => {
				if (snap.val() === true) {
					console.log("WAS CONNECTED TO FIREBASE !!!");				
				} else {
					console.log("WAS NOT connected to firebase !!!");
				}
			});
		}
		
		md_auth.onAuthStateChanged(tc_fb_auth, (user) => {
			if (user) {
				tc_fb_user = user;
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				if(DEBUG_FB_CHECK){
					console.log('User_id=' + tc_fb_user.uid);
					console.log('User_name=' + tc_fb_user.displayName);
					console.log("User_email=" + tc_fb_user.email);
					console.log("User_emailVerified=" + tc_fb_user.emailVerified);
					console.log("User_photoURL=" + tc_fb_user.photoURL);
				}
				
				firebase_write_user_id();
				firebase_update_user_referrer();
				
				firebase_get_user_finished_qmodules();
				if(callbk != null){ callbk(tc_fb_user); }
			} else {
				tc_fb_user = null;
				if(DEBUG_FB_CHECK){ console.log("User is signed out"); }
				if(callbk != null){ callbk(tc_fb_user); }
			}
		});			
	} catch(error){
		console.error("ERROR in firebase_check_user.");
		console.error(error);
		tc_fb_user = null;
		if(callbk != null){ callbk(tc_fb_user); }
	}
}

function firebase_user_ck_is_admin(){ 
	init_mod_vars();
	if(tc_fb_app == null){ console.log("firebase_inc_user_num_checks. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_inc_user_num_checks. tc_fb_user is NULL!!"); return; }
	const fb_database = md_db.getDatabase(tc_fb_app);

	const path_cntr = firebase_ck_admin_path;
	const db_ref = md_db.ref(fb_database, path_cntr);
	
	tc_fb_is_admin = false;
	md_db.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			if(num == 1){
				tc_fb_is_admin = true;
			}
		}
		if(DEBUG_FB_ADMIN){ if(tc_fb_is_admin){ console.log("IT IS ADMIN"); } else { console.log("NOT ADMIN"); } }
	}).catch((error) => {
		tc_fb_is_admin = false;
		console.error(error);
		if(DEBUG_FB_ADMIN){ console.log("NOT ADMIN (get failed)"); }
	});
}

function firebase_inc_user_num_checks(){ 
	init_mod_vars();
	if(tc_fb_app == null){ console.log("firebase_inc_user_num_checks. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_inc_user_num_checks. tc_fb_user is NULL!!"); return; }
	const fb_database = md_db.getDatabase(tc_fb_app);

	const path_cntr = firebase_users_path + tc_fb_user.uid + "/stats/num_checks";
	const db_ref = md_db.ref(fb_database, path_cntr);

	md_db.set(db_ref, md_db.increment(1)).catch((error) => { console.error(error); });	
}

function firebase_write_user_id_in_list(){ 
	init_mod_vars();
	if(tc_fb_app == null){ console.log("firebase_inc_user_num_checks. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_inc_user_num_checks. tc_fb_user is NULL!!"); return; }
	const fb_database = md_db.getDatabase(tc_fb_app);

	const db_ref = md_db.ref(fb_database, firebase_users_list_path + tc_fb_user.uid);
	console.log("firebase_write_user_id. db_ref = " + db_ref);
	md_db.set(db_ref, 1).catch((error) => { 
		console.error(error); 
	});
}

function firebase_write_user_id(){ 
	console.log("Called firebase_write_user_id.");
	init_mod_vars();
	firebase_user_ck_is_admin();
	firebase_write_user_id_in_list();
	
	if(tc_fb_app == null){ console.log("firebase_write_user_id. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_write_user_id. tc_fb_user is NULL!!"); return; }
	const fb_database = md_db.getDatabase(tc_fb_app);
	const db_ref = md_db.ref(fb_database, firebase_users_path + tc_fb_user.uid + "/stats/last_check"); // THIS obj MUST FIT firebase rules
	console.log("firebase_write_user_id. db_ref = " + db_ref);
	const dt = get_date_and_time();  
	md_db.set(db_ref, dt).catch((error) => { 
		console.error(error); 
	});
	
	firebase_inc_user_num_checks();
}

export const firebase_write_object = (sub_ref, obj, err_fn) => {  //sub_ref MUST start with '/' or be empty
	init_mod_vars();
	return firebase_check_login(err_fn).then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = md_db.getDatabase(tc_fb_app);
		const db_ref = md_db.ref(fb_database, firebase_users_path + tc_fb_user.uid + sub_ref)
		console.log("firebase_write_object. db_ref = " + db_ref);
		md_db.set(db_ref, obj).catch((error) => { 
			console.error(error); 
			if(err_fn != null){ err_fn(error); }
		});
	});
};

export const firebase_read_object = (sub_ref, callbak_func) => { //sub_ref MUST start with '/' or be empty
	init_mod_vars();
	return firebase_check_login().then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = md_db.getDatabase(tc_fb_app);
		const db_ref = md_db.ref(fb_database, firebase_users_path + tc_fb_user.uid + sub_ref)
		console.log("firebase_read_object. db_ref = " + db_ref);
		md_db.onValue(db_ref, callbak_func);
		/*.catch((error) => {
			console.error(error);
		});*/
	});
}

export const firebase_sign_out = () => {
	init_mod_vars();
	if(tc_fb_user == null){ return; }
	if(tc_fb_app == null){ tc_fb_app = md_app.initializeApp(firebase_config); }
	if(tc_fb_auth == null){ tc_fb_auth = md_auth.getAuth(); }
	
	tc_fb_user = null;
	//const tc_fb_auth = md_auth.getAuth();
	md_auth.signOut(tc_fb_auth);
	console.log('signed out');
}

// TO GET KEYS USE: "//" as an ending of the path

