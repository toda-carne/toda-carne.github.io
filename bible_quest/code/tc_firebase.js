
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

const firebase_users_path = 'users/';
const firebase_users_list_path = firebase_users_path + 'list/';
const firebase_ck_admin_path = 'ck_admin/';

//let analytics = getAnalytics(tc_fb_app);
let tc_fb_app = null;
let tc_fb_auth = null;
let tc_fb_user = null;
let tc_fb_is_admin = false;

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
		
		console.log('token=' + fb_token);
		console.log('user=' + JSON.stringify(tc_fb_user));
		console.log('User_id=' + tc_fb_user.uid);
		console.log('User_name=' + tc_fb_user.displayName);
		console.log("User_email=" + tc_fb_user.email);
		console.log("User_emailVerified=" + tc_fb_user.emailVerified);
		console.log("User_photoURL=" + tc_fb_user.photoURL);
		console.log('finished_login');
		
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

export function firebase_check_user(callbk){
	init_mod_vars();
	try {
		if(tc_fb_app == null){ tc_fb_app = MOD_APP.initializeApp(firebase_config); }
		if(tc_fb_auth == null){ tc_fb_auth = MOD_AUTH.getAuth(); }
		const db = MOD_DB.getDatabase(tc_fb_app);
		if(db == null){ return; }
		const cn_ref = MOD_DB.ref(db, ".info/connected");
		if(cn_ref == null){ return; }
		MOD_DB.onValue(cn_ref, (snap) => {
			if (snap.val() === true) {
				console.log("WAS CONNECTED TO FIREBASE !!!");				
			} else {
				console.log("WAS NOT connected to firebase !!!");
			}
		});
		MOD_AUTH.onAuthStateChanged(tc_fb_auth, (user) => {
			if (user) {
				tc_fb_user = user;
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				console.log('User_id=' + tc_fb_user.uid);
				console.log('User_name=' + tc_fb_user.displayName);
				console.log("User_email=" + tc_fb_user.email);
				console.log("User_emailVerified=" + tc_fb_user.emailVerified);
				console.log("User_photoURL=" + tc_fb_user.photoURL);
				
				firebase_write_user_id();
				
				if(callbk != null){ callbk(tc_fb_user); }
				// ...
			} else {
				tc_fb_user = null;
				
				console.log("User is signed out");
				// User is signed out
				// ...
				if(callbk != null){ callbk(tc_fb_user); }
			}
		});			
	} catch(error){
		console.error(error);
	}
}

export function firebase_user_is_admin(){
	return tc_fb_is_admin;
}

function get_date_and_time(){ 
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
			console.log("IT IS ADMIN");
		} else {
			console.log("NOT ADMIN");
		}
	}).catch((error) => {
		tc_fb_is_admin = false;
		console.error(error);
		console.log("NOT ADMIN");
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
		MOD_DB.onValue(db_ref, callbak_func).catch((error) => {
			console.error(error);
		});
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

export function firebase_get_user(){
	return tc_fb_user;
}


// firebase apiKey access to Identity Toolkit API
// Requests to this API identitytoolkit method google.cloud.identitytoolkit.v1.ProjectConfigService.GetProjectConfig are blocked
// FirebaseAuth.getInstance().MOD_AUTH.signOut();

/*

    MOD_DB.ref.transaction(function(value) {
      return (value || 0) + 1;
    });

-----------------------------------------------------------
    MOD_DB.ref.MOD_DB.set(admin.database.ServerValue.MOD_DB.increment(1));

*/

		/*firebase.database()
			.MOD_DB.ref('users')
			.child(user_uid)
			.child('searches')
			.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1))*/
		
		/*db_ref.transaction(function(value) {
			return (value || 0) + 1;
		});*/
		
	/*const db_ref_cntr = MOD_DB.ref(fb_database, firebase_all_users_path + tc_fb_user.uid + "/num_checks")
	db_ref_cntr.MOD_DB.set(admin.database.ServerValue.MOD_DB.increment(1)).catch((error) => { 
		console.error(error); 
	});
		db_ref.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1)).catch((error) => { 
			console.error(error); 
		}
	*/
	/*
	try {
		const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
		//fb_database.child(path_cntr).MOD_DB.set(ServerValue.MOD_DB.increment(1));
		
		const db_ref = MOD_DB.ref(fb_database, path_cntr);
		
		//db_ref.push({startedAt: firebase.database.ServerValue.TIMESTAMP});
		
		//db_ref.MOD_DB.set(fb_database.ServerValue.MOD_DB.increment(1));
		//db_ref.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1));
		//db_ref.MOD_DB.set(database.ServerValue.MOD_DB.increment(1));
		//db_ref.MOD_DB.set(ServerValue.MOD_DB.increment(1));
		MOD_DB.set(db_ref, MOD_DB.increment(1));
		
	} catch (error) {
		console.error(error); 
	}  
	*/
/*
 function MOD_DB.runTransaction(e, t, n) {
 
 
 try {
    await db.MOD_DB.runTransaction(async (t) => {
      const doc = await t.MOD_DB.get(studentRef);
      const isPresent = doc.data().present;
      t.MOD_DB.update(studentRef, {population: true});
    });

    console.log('Transaction success!');
  } catch (e) {
    console.log('Transaction failure:', e);
  }
 
MOD_DB.runTransaction(
	
function addStar(uid, key) {
  import { MOD_DB.getDatabase, MOD_DB.increment, MOD_DB.ref, MOD_DB.update } from "firebase/database";
  const dbRef = MOD_DB.ref(MOD_DB.getDatabase());

  const updates = {};
  updates[`posts/${key}/stars/${uid}`] = true;
  updates[`posts/${key}/starCount`] = MOD_DB.increment(1);
  updates[`user-posts/${key}/stars/${uid}`] = true;
  updates[`user-posts/${key}/starCount`] = MOD_DB.increment(1);
  MOD_DB.update(dbRef, updates);
}	
	
 **/		
	/*
	 * 
	// THIS IS RECURSIVE BECAUSE MOD_DB.onValue MOD_DB.get called every time the value changes and MOD_DB.set changes the value
	MOD_DB.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 0).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	const db_ref = MOD_DB.ref(fb_database, path_cntr);
	MOD_DB.set(db_ref, MOD_DB.increment(1)).catch((error) => { 
		console.error(error); 
	});
	*/
	
	/*

import { MOD_DB.getDatabase, MOD_DB.ref, MOD_DB.runTransaction } from "firebase/database";

function toggleStar(uid) {
  const db = MOD_DB.getDatabase();
  const postRef = MOD_DB.ref(db, '/posts/foo-bar-123');

  MOD_DB.runTransaction(postRef, (post) => {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}	

import { MOD_DB.getDatabase, MOD_DB.ref, child, MOD_DB.get } from "firebase/database";

const dbRef = MOD_DB.ref(MOD_DB.getDatabase());
MOD_DB.get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


	MOD_DB.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 0).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}, { onlyOnce: true} ).catch((error) => {
		console.error(error);
	});
	

import { MOD_DB.getDatabase, MOD_DB.ref, MOD_DB.onValue } from "firebase/database";
import { MOD_AUTH.getAuth } from "firebase/auth";

const db = MOD_DB.getDatabase();
const auth = MOD_AUTH.getAuth();

const userId = auth.currentUser.uid;
return MOD_DB.onValue(MOD_DB.ref(db, '/users/' + userId), (snapshot) => {
  const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
}, {
  onlyOnce: true
});	
*/
	
		/*  
	let inc_once = false;
	MOD_DB.onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log("First time. No data before.");
			const ii = num + 1;
			if(! inc_once){
				inc_once = true;
				MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
			}
		} else {
			MOD_DB.set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	});
	//}, { onlyOnce: true} );
	
	.catch((error) => {
		console.error(error);
	})
	
	//RUNS BUT ALWAYS IS FIRST TIME
	MOD_DB.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log(path_cntr + " WAS " + num);
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	//RUNS BUT ALWAYS NAN
	MOD_DB.runTransaction(db_ref, (post) => {
		if (post) {
			console.log(path_cntr + "=");
			console.log(post);
			const num = Number(post.num_checks);	
			if(isNaN(num)){
				console.log(path_cntr + " WAS NaN !!!!");
				post.num_checks = 1;
			} else {
				const add1 = num + 1;
				post.num_checks = add1;
			}
		}
		return post;
	});
	
	//RUNS BUT IT DOES NOT DO ANYTHING
	
	const db_ref = MOD_DB.ref(fb_database);
	const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
	//const path_cntr = firebase_all_users_path + "${uid}/num_checks";
	
	const updates = {};
	updates[path_cntr] = MOD_DB.increment(1);
	MOD_DB.update(db_ref, updates);
	*/
	
	/*
	MOD_DB.get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log(path_cntr + " WAS " + num);
			const ii = num + 1;
			MOD_DB.set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			MOD_DB.set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	*/
