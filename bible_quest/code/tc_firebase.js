
"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
	apiKey: "AIzaSyCc0og3bSe6mKvsBIFsoxYOCEmONmEF4P0",
	authDomain: "todacarne-firebase.firebaseapp.com",
	databaseURL: "https://todacarne-firebase-default-rtdb.firebaseio.com",
	projectId: "todacarne-firebase",
	storageBucket: "todacarne-firebase.appspot.com",
	messagingSenderId: "313540425147",
	appId: "1:313540425147:web:08947128762713d577009e",
	measurementId: "G-GL4NXH7Q2R"
};

let tc_fb_app = null;
//let analytics = getAnalytics(tc_fb_app);
let tc_fb_auth = null;
let tc_fb_user = null;

/*
 *      In order to work from toda-carne.github.io
 *      
 *      I MUST add the domain to
 *      
 *      firebase console > Athentication > Settings > Authorized Domains
 *      google console > APIs & Services > Credentials > API Keys > Browser Key
 */
function check_login(err_fn){
	if(tc_fb_user != null){
		return new Promise((resolve, reject) => {
			resolve('database != null');
		});
	}
	// Initialize Firebase
	if(tc_fb_app == null){ tc_fb_app = initializeApp(firebaseConfig); }
	//const analytics = getAnalytics(tc_fb_app);
	
	const fb_provider = new GoogleAuthProvider();
	
	fb_provider.setCustomParameters({
		prompt: "select_account"
	});
	
	if(tc_fb_auth == null){ tc_fb_auth = getAuth(); }
	
	return signInWithPopup(tc_fb_auth, fb_provider).then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const fb_credential = GoogleAuthProvider.credentialFromResult(result);
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
		
	}).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.customData.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		
		console.log('errorCode=' + errorCode);
		console.log('errorMessage=' + errorMessage);
		console.log('credential=' + credential);
		
		if(err_fn != null){ err_fn(error); }
	});      
	
}

export function firebase_check_user(callbk){
	try {
		if(tc_fb_app == null){ tc_fb_app = initializeApp(firebaseConfig); }
		if(tc_fb_auth == null){ tc_fb_auth = getAuth(); }
		const db = getDatabase(tc_fb_app);
		if(db == null){ return; }
		const cn_ref = ref(db, ".info/connected");
		if(cn_ref == null){ return; }
		onValue(cn_ref, (snap) => {
			if (snap.val() === true) {
				console.log("WAS CONNECTED TO FIREBASE !!!");				
			} else {
				console.log("WAS NOT connected to firebase !!!");
			}
		});
		onAuthStateChanged(tc_fb_auth, (user) => {
			if (user) {
				tc_fb_user = user;
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/auth.user
				console.log('User_id=' + tc_fb_user.uid);
				console.log('User_name=' + tc_fb_user.displayName);
				console.log("User_email=" + tc_fb_user.email);
				console.log("User_emailVerified=" + tc_fb_user.emailVerified);
				console.log("User_photoURL=" + tc_fb_user.photoURL);
				
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

export const firebase_write_object = (sub_ref, obj, err_fn) => {  //sub_ref MUST start with '/' or be empty
	return check_login(err_fn).then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = getDatabase(tc_fb_app);
		const db_ref = ref(fb_database, 'users/' + tc_fb_user.uid + sub_ref)
		console.log("firebase_write_object. db_ref = " + db_ref);
		set(db_ref, obj).catch((error) => { 
			console.error(error); 
			if(err_fn != null){ err_fn(error); }
		});
	});
};

export const firebase_read_object = (sub_ref, callbak_func) => { //sub_ref MUST start with '/' or be empty
	return check_login().then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = getDatabase(tc_fb_app);
		const db_ref = ref(fb_database, 'users/' + tc_fb_user.uid + sub_ref)
		console.log("firebase_read_object. db_ref = " + db_ref);
		onValue(db_ref, callbak_func).catch((error) => {
			console.error(error);
		});
	});
}

export const firebase_sign_out = () => {
	if(tc_fb_user == null){ return; }
	if(tc_fb_app == null){ tc_fb_app = initializeApp(firebaseConfig); }
	if(tc_fb_auth == null){ tc_fb_auth = getAuth(); }
	
	tc_fb_user = null;
	//const tc_fb_auth = getAuth();
	signOut(tc_fb_auth);
	console.log('signed out');
}

export function firebase_get_user(){
	return tc_fb_user;
}


// firebase apiKey access to Identity Toolkit API
// Requests to this API identitytoolkit method google.cloud.identitytoolkit.v1.ProjectConfigService.GetProjectConfig are blocked
// FirebaseAuth.getInstance().signOut();

