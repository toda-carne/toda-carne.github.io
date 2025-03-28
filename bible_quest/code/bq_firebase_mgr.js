
import { write_storage_fini_qmodus, load_next_qmodu, } from './bq_module_mgr.js';

"use strict";

// CDN COntent D Network (gstatic)
/*
const fb_app_js = "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
const fb_auth_js = "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
const fb_database_js = "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
*/

import * as MOD_APP from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import * as MOD_AUTH from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import * as MOD_DB from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const DEBUG_FB_LOGIN = false;
const DEBUG_FB_CHECK = false;
const DEBUG_FB_ADMIN = true;

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
	if(tc_fb_app == null){ tc_fb_app = MOD_APP.initializeApp(firebase_config); }
	//const analytics = getAnalytics(tc_fb_app);
	
	const fb_provider = new MOD_AUTH.GoogleAuthProvider();
	
	fb_provider.setCustomParameters({
		prompt: "select_account"
	});
	
	if(tc_fb_auth == null){ tc_fb_auth = MOD_AUTH.getAuth(); }
	
	return MOD_AUTH.signInWithPopup(tc_fb_auth, fb_provider).then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const fb_credential = MOD_AUTH.GoogleAuthProvider.credentialFromResult(result);
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
		const credential = MOD_AUTH.GoogleAuthProvider.credentialFromError(error);
		
		console.log('errorCode=' + errorCode);
		console.log('errorMessage=' + errorMessage);
		console.log('credential=' + credential);
		
		if(err_fn != null){ err_fn(error); }
	});      
	
}

export function firebase_get_user_path(){
	if(tc_fb_user == null){ return "INVALID_USER_PATH";}
	const path = firebase_users_path + tc_fb_user.uid;
	return path;
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
	
	const were_eq = write_storage_fini_qmodus(bq_fb_user_finished_qmodules);
	if(! were_eq){
		console.log("firebase_get_user_finished_qmodules. CALLING load_next_qmodu. DIFFERENT FINISHED MODULES !!!");
		load_next_qmodu();
	}
}

export function firebase_check_user(callbk){
	init_mod_vars();
	try {
		if(tc_fb_app == null){ tc_fb_app = MOD_APP.initializeApp(firebase_config); }
		if(tc_fb_auth == null){ tc_fb_auth = MOD_AUTH.getAuth(); }
		const db = MOD_DB.getDatabase(tc_fb_app);
		if(db == null){ return; }
		
		if(DEBUG_FB_CHECK){
			const cn_ref = MOD_DB.ref(db, ".info/connected");
			if(cn_ref == null){ return; }
			MOD_DB.onValue(cn_ref, (snap) => {
				if (snap.val() === true) {
					console.log("WAS CONNECTED TO FIREBASE !!!");				
				} else {
					console.log("WAS NOT connected to firebase !!!");
				}
			});
		}
		
		MOD_AUTH.onAuthStateChanged(tc_fb_auth, (user) => {
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
				
				firebase_get_user_finished_qmodules();
				if(callbk != null){ callbk(tc_fb_user); }
				/*firebase_get_user_finished_qmodules().then((result) => {
					if(callbk != null){ callbk(tc_fb_user); }
				});*/
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

export function get_date_and_time(){ 
	const currentdate = new Date(); 
	const datetime = currentdate.getFullYear() + "/"
					+ (currentdate.getMonth()+1)  + "/"
					+ currentdate.getDate() + "@"
					+ currentdate.getHours() + ":"
					+ currentdate.getMinutes() + ":"
					+ currentdate.getSeconds();
	return datetime;
}

function firebase_user_ck_is_admin(){ 
	init_mod_vars();
	if(tc_fb_app == null){ console.log("firebase_inc_user_num_checks. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_inc_user_num_checks. tc_fb_user is NULL!!"); return; }
	const fb_database = MOD_DB.getDatabase(tc_fb_app);

	const path_cntr = firebase_ck_admin_path;
	const db_ref = MOD_DB.ref(fb_database, path_cntr);
	
	tc_fb_is_admin = false;
	MOD_DB.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			if(num == 1){
				tc_fb_is_admin = true;
			}
		}
		if(tc_fb_is_admin){
			if(DEBUG_FB_ADMIN){ console.log("IT IS ADMIN"); }
		} else {
			if(DEBUG_FB_ADMIN){ console.log("NOT ADMIN"); }
		}
	}).catch((error) => {
		tc_fb_is_admin = false;
		console.error(error);
		if(DEBUG_FB_ADMIN){ console.log("NOT ADMIN"); }
	});
}

function firebase_inc_user_num_checks(){ 
	init_mod_vars();
	if(tc_fb_app == null){ console.log("firebase_inc_user_num_checks. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_inc_user_num_checks. tc_fb_user is NULL!!"); return; }
	const fb_database = MOD_DB.getDatabase(tc_fb_app);

	const path_cntr = firebase_users_path + tc_fb_user.uid + "/stats/num_checks";
	const db_ref = MOD_DB.ref(fb_database, path_cntr);

	MOD_DB.set(db_ref, MOD_DB.increment(1)).catch((error) => { console.error(error); });	
}

function firebase_write_user_id_in_list(){ 
	init_mod_vars();
	if(tc_fb_app == null){ console.log("firebase_inc_user_num_checks. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_inc_user_num_checks. tc_fb_user is NULL!!"); return; }
	const fb_database = MOD_DB.getDatabase(tc_fb_app);

	const db_ref = MOD_DB.ref(fb_database, firebase_users_list_path + tc_fb_user.uid);
	console.log("firebase_write_user_id. db_ref = " + db_ref);
	MOD_DB.set(db_ref, 1).catch((error) => { 
		console.error(error); 
	});
}

function firebase_write_user_id(){ 
	init_mod_vars();
	firebase_user_ck_is_admin();
	firebase_write_user_id_in_list();
	
	if(tc_fb_app == null){ console.log("firebase_write_user_id. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_write_user_id. tc_fb_user is NULL!!"); return; }
	const fb_database = MOD_DB.getDatabase(tc_fb_app);
	const db_ref = MOD_DB.ref(fb_database, firebase_users_path + tc_fb_user.uid + "/stats/last_check"); // THIS obj MUST FIT firebase rules
	console.log("firebase_write_user_id. db_ref = " + db_ref);
	const dt = get_date_and_time();  
	MOD_DB.set(db_ref, dt).catch((error) => { 
		console.error(error); 
	});
	
	firebase_inc_user_num_checks();
}

export const firebase_write_object = (sub_ref, obj, err_fn) => {  //sub_ref MUST start with '/' or be empty
	init_mod_vars();
	return firebase_check_login(err_fn).then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = MOD_DB.getDatabase(tc_fb_app);
		const db_ref = MOD_DB.ref(fb_database, firebase_users_path + tc_fb_user.uid + sub_ref)
		console.log("firebase_write_object. db_ref = " + db_ref);
		MOD_DB.set(db_ref, obj).catch((error) => { 
			console.error(error); 
			if(err_fn != null){ err_fn(error); }
		});
	});
};

export const firebase_read_object = (sub_ref, callbak_func) => { //sub_ref MUST start with '/' or be empty
	init_mod_vars();
	return firebase_check_login().then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = MOD_DB.getDatabase(tc_fb_app);
		const db_ref = MOD_DB.ref(fb_database, firebase_users_path + tc_fb_user.uid + sub_ref)
		console.log("firebase_read_object. db_ref = " + db_ref);
		MOD_DB.onValue(db_ref, callbak_func);
		/*.catch((error) => {
			console.error(error);
		});*/
	});
}

export const firebase_sign_out = () => {
	init_mod_vars();
	if(tc_fb_user == null){ return; }
	if(tc_fb_app == null){ tc_fb_app = MOD_APP.initializeApp(firebase_config); }
	if(tc_fb_auth == null){ tc_fb_auth = MOD_AUTH.getAuth(); }
	
	tc_fb_user = null;
	//const tc_fb_auth = MOD_AUTH.getAuth();
	MOD_AUTH.signOut(tc_fb_auth);
	console.log('signed out');
}

// TO GET KEYS USE: "//" as an ending of the path