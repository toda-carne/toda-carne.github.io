
"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
let tc_fb_provider = null;
let tc_fb_auth = null;
let tc_fb_credential = null;
let tc_fb_token = null;
let tc_fb_user = null;
let tc_fb_user_id = null;
let tc_fb_database = null;

/*
 *      In order to work from toda-carne.github.io
 *      
 *      I MUST add the domain to
 *      
 *      firebase console > Athentication > Settings > Authorized Domains
 *      google console > APIs & Services > Credentials > API Keys > Browser Key
 */
function get_database(err_fn){
	if(tc_fb_database != null){
		return new Promise((resolve, reject) => {
			resolve('database != null');
		});
	}
	// Initialize Firebase
	tc_fb_app = initializeApp(firebaseConfig);
	//const analytics = getAnalytics(tc_fb_app);
	
	tc_fb_provider = new GoogleAuthProvider();
	
	tc_fb_provider.setCustomParameters({
		prompt: "select_account"
	});
	
	tc_fb_auth = getAuth();
	
	return signInWithPopup(tc_fb_auth, tc_fb_provider).then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		tc_fb_credential = GoogleAuthProvider.credentialFromResult(result);
		tc_fb_token = tc_fb_credential.accessToken;
		// The signed-in user info.
		tc_fb_user = result.user;
		// IdP data available using getAdditionalUserInfo(result)
		const json_user = JSON.stringify(tc_fb_user); 
		
		tc_fb_user_id = tc_fb_user.uid;
		
		console.log('token=' + tc_fb_token);
		console.log('user=' + json_user);
		console.log('user_id=' + tc_fb_user_id);
		console.log('finished_login');
		
		tc_fb_database = getDatabase(tc_fb_app);
		if(tc_fb_database == null){
			console.error("NO database !!");
		} else {
			console.log("database OK");
		}
		
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

export const firebase_write_object = (sub_ref, obj, err_fn) => {  //sub_ref MUST start with '/' or be empty
	return get_database(err_fn).then((result) => {
		const db_ref = ref(tc_fb_database, 'users/' + tc_fb_user_id + sub_ref)
		console.log("firebase_write_object. db_ref = " + db_ref);
		set(db_ref, obj).catch((error) => { 
			console.error(error); 
			if(err_fn != null){ err_fn(error); }
		});
	});
};

export const firebase_read_object = (sub_ref, callbak_func) => { //sub_ref MUST start with '/' or be empty
	return get_database().then((result) => {
		const db_ref = ref(tc_fb_database, 'users/' + tc_fb_user_id + sub_ref)
		console.log("firebase_read_object. db_ref = " + db_ref);
		onValue(db_ref, callbak_func).catch((error) => {
			console.error(error);
		});
	});
}

export const firebase_sign_out = () => {
	if(tc_fb_database == null){ return; }
	//const tc_fb_auth = getAuth();
	signOut(tc_fb_auth);
	console.log('signed out');
	//tc_fb_database.getInstance().signOut();
}


// firebase apiKey access to Identity Toolkit API
// Requests to this API identitytoolkit method google.cloud.identitytoolkit.v1.ProjectConfigService.GetProjectConfig are blocked
// FirebaseAuth.getInstance().signOut();

/*
const write_jlq = (field, val) => {
	firebase_write_object('', {
		username: val,
		email: 'el correo de ' + val,
	});
};

const read_jlq = () => {
	firebase_read_object('/username', (snapshot) => {
		if (snapshot.exists()) {
			var the_val = snapshot.val();
			document.getElementById("db_read_data").innerText = "THE_VAL=" + the_val;
			console.log('read_fireabase= ' + the_val);
		} else {
			console.log("No data available");
		}
	});
}

const read2_jlq = () => {
	if(tc_fb_database == null){ return; }
	const dbRef2 = ref(tc_fb_database, 'users/campo_1')
	read_fb(dbRef2, "db_read_data_2");
}

const read3_jlq = () => {
	firebase_read_object('', (snapshot) => {
		if (snapshot.exists()) {
			var the_val = snapshot.val();
			console.log('read_fireabase= ' + JSON.stringify(the_val, null, "  "));
		} else {
			console.log("No data available");
		}
	});
}

const read_fb = (dbRef, field) => {
	if(tc_fb_database == null){ return; }
	onValue(dbRef, (snapshot) => {
		if (snapshot.exists()) {
			//console.log(snapshot.val());
			var the_val = snapshot.val();
			document.getElementById(field).innerText = "THE_VAL=" + the_val;
			console.log('read_fireabase= ' + the_val);
		} else {
			document.getElementById(field).innerText = "No data available";
			console.log("No data available");
		}
	}).catch((error) => {
		console.error(error);
	});        
	
};

*/

