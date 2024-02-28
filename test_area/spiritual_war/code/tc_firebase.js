
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

let app = null;
//let analytics = getAnalytics(app);
let provider = null;
let auth = null;
let credential = null;
let token = null;
let user = null;
let USER_ID = null;
let database = null;

/*
 *      In order to work from toda-carne.github.io
 *      
 *      I MUST add the domain to
 *      
 *      firebase console > Athentication > Settings > Authorized Domains
 *      google console > APIs & Services > Credentials > API Keys > Browser Key
 */

export function init_firebase_todacarne(){
	// Initialize Firebase
	app = initializeApp(firebaseConfig);
	//const analytics = getAnalytics(app);
	
	provider = new GoogleAuthProvider();
	
	provider.setCustomParameters({
		prompt: "select_account"
	});
	
	auth = getAuth();
	
	signInWithPopup(auth, provider)
	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		credential = GoogleAuthProvider.credentialFromResult(result);
		token = credential.accessToken;
		// The signed-in user info.
		user = result.user;
		// IdP data available using getAdditionalUserInfo(result)
		const json_user = JSON.stringify(user); 
		
		USER_ID = user.uid;
		
		console.log('token=' + token);
		console.log('user=' + json_user);
		console.log('USER_ID=' + USER_ID);
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
	});      
	
	database = getDatabase(app);
	
}

// firebase apiKey access to Identity Toolkit API
// Requests to this API identitytoolkit method google.cloud.identitytoolkit.v1.ProjectConfigService.GetProjectConfig are blocked
// FirebaseAuth.getInstance().signOut();

export const write_jlq = (field, val) => {
	if(database == null){ return; }
	set(ref(database, 'users/' + USER_ID), {
		username: val,
	 email: 'el correo de ' + val,
	}).catch((error) => {
		console.error(error);
	});
};

export const get_out = () => {
	if(database == null){ return; }
	//const auth = getAuth();
	signOut(auth);
	console.log('signed out');
	//database.getInstance().signOut();
}

export const read_jlq = () => {
	if(database == null){ return; }
	const dbRef2 = ref(database, 'users/' + USER_ID + '/username')
	read_fb(dbRef2, "db_read_data");
}

export const read2_jlq = () => {
	if(database == null){ return; }
	const dbRef2 = ref(database, 'users/campo_1')
	read_fb(dbRef2, "db_read_data_2");
}

const read_fb = (dbRef, field) => {
	if(database == null){ return; }
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

