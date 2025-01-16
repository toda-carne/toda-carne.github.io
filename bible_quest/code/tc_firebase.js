
"use strict";

// CDN COntent D Network (gstatic)
/*
import { initializeApp } 
	from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
	from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } 
	from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
*/

import { initializeApp } 
	from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } 
	from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, get, set, onValue, increment, update, runTransaction, } 
	from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

const firebase_users_path = 'users/';
const firebase_all_users_path = firebase_users_path + 'list/';

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
export function firebase_check_login(err_fn){
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
		
		firebase_write_user_id();
		
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

function firebase_inc_user_checks(){ 
	if(tc_fb_app == null){ console.log("firebase_write_user_id. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_write_user_id. tc_fb_user is NULL!!"); return; }
	const fb_database = getDatabase(tc_fb_app);

	const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
	//const path_cntr = firebase_all_users_path + tc_fb_user.uid;
	const db_ref = ref(fb_database, path_cntr);

	set(db_ref, increment(1)).catch((error) => { console.error(error); });	
}

function firebase_write_user_id(){ 
	if(tc_fb_app == null){ console.log("firebase_write_user_id. tc_fb_app is NULL!!"); return; }
	if(tc_fb_user == null){ console.log("firebase_write_user_id. tc_fb_user is NULL!!"); return; }
	const fb_database = getDatabase(tc_fb_app);
	const db_ref = ref(fb_database, firebase_all_users_path + tc_fb_user.uid + "/last_check"); // THIS obj MUST FIT firebase rules
	console.log("firebase_write_user_id. db_ref = " + db_ref);
	const dt = get_date_and_time();  
	set(db_ref, dt).catch((error) => { 
		console.error(error); 
	});
	
	firebase_inc_user_checks();
}

export const firebase_write_object = (sub_ref, obj, err_fn) => {  //sub_ref MUST start with '/' or be empty
	return firebase_check_login(err_fn).then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = getDatabase(tc_fb_app);
		const db_ref = ref(fb_database, firebase_users_path + tc_fb_user.uid + sub_ref)
		console.log("firebase_write_object. db_ref = " + db_ref);
		set(db_ref, obj).catch((error) => { 
			console.error(error); 
			if(err_fn != null){ err_fn(error); }
		});
	});
};

export const firebase_read_object = (sub_ref, callbak_func) => { //sub_ref MUST start with '/' or be empty
	return firebase_check_login().then((result) => {
		if(tc_fb_app == null){ console.error("No firebase app in firebase_write_object !!");  return; }
		const fb_database = getDatabase(tc_fb_app);
		const db_ref = ref(fb_database, firebase_users_path + tc_fb_user.uid + sub_ref)
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

/*

    ref.transaction(function(value) {
      return (value || 0) + 1;
    });

-----------------------------------------------------------
    ref.set(admin.database.ServerValue.increment(1));

*/

		/*firebase.database()
			.ref('users')
			.child(user_uid)
			.child('searches')
			.set(firebase.database.ServerValue.increment(1))*/
		
		/*db_ref.transaction(function(value) {
			return (value || 0) + 1;
		});*/
		
	/*const db_ref_cntr = ref(fb_database, firebase_all_users_path + tc_fb_user.uid + "/num_checks")
	db_ref_cntr.set(admin.database.ServerValue.increment(1)).catch((error) => { 
		console.error(error); 
	});
		db_ref.set(firebase.database.ServerValue.increment(1)).catch((error) => { 
			console.error(error); 
		}
	*/
	/*
	try {
		const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
		//fb_database.child(path_cntr).set(ServerValue.increment(1));
		
		const db_ref = ref(fb_database, path_cntr);
		
		//db_ref.push({startedAt: firebase.database.ServerValue.TIMESTAMP});
		
		//db_ref.set(fb_database.ServerValue.increment(1));
		//db_ref.set(firebase.database.ServerValue.increment(1));
		//db_ref.set(database.ServerValue.increment(1));
		//db_ref.set(ServerValue.increment(1));
		set(db_ref, increment(1));
		
	} catch (error) {
		console.error(error); 
	}  
	*/
/*
 function runTransaction(e, t, n) {
 
 
 try {
    await db.runTransaction(async (t) => {
      const doc = await t.get(studentRef);
      const isPresent = doc.data().present;
      t.update(studentRef, {population: true});
    });

    console.log('Transaction success!');
  } catch (e) {
    console.log('Transaction failure:', e);
  }
 
runTransaction(
	
function addStar(uid, key) {
  import { getDatabase, increment, ref, update } from "firebase/database";
  const dbRef = ref(getDatabase());

  const updates = {};
  updates[`posts/${key}/stars/${uid}`] = true;
  updates[`posts/${key}/starCount`] = increment(1);
  updates[`user-posts/${key}/stars/${uid}`] = true;
  updates[`user-posts/${key}/starCount`] = increment(1);
  update(dbRef, updates);
}	
	
 **/		
	/*
	 * 
	// THIS IS RECURSIVE BECAUSE onValue get called every time the value changes and set changes the value
	onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			const ii = num + 1;
			set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			set(db_ref, 0).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	const db_ref = ref(fb_database, path_cntr);
	set(db_ref, increment(1)).catch((error) => { 
		console.error(error); 
	});
	*/
	
	/*

import { getDatabase, ref, runTransaction } from "firebase/database";

function toggleStar(uid) {
  const db = getDatabase();
  const postRef = ref(db, '/posts/foo-bar-123');

  runTransaction(postRef, (post) => {
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

import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


	onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			const ii = num + 1;
			set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			set(db_ref, 0).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}, { onlyOnce: true} ).catch((error) => {
		console.error(error);
	});
	

import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const db = getDatabase();
const auth = getAuth();

const userId = auth.currentUser.uid;
return onValue(ref(db, '/users/' + userId), (snapshot) => {
  const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
}, {
  onlyOnce: true
});	
*/
	
		/*  
	let inc_once = false;
	onValue(db_ref, (snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log("First time. No data before.");
			const ii = num + 1;
			if(! inc_once){
				inc_once = true;
				set(db_ref, ii).catch((error) => { console.error(error); });
			}
		} else {
			set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	});
	//}, { onlyOnce: true} );
	
	.catch((error) => {
		console.error(error);
	})
	
	//RUNS BUT ALWAYS IS FIRST TIME
	get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log(path_cntr + " WAS " + num);
			const ii = num + 1;
			set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	
	//RUNS BUT ALWAYS NAN
	runTransaction(db_ref, (post) => {
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
	
	const db_ref = ref(fb_database);
	const path_cntr = firebase_all_users_path + tc_fb_user.uid + "/num_checks";
	//const path_cntr = firebase_all_users_path + "${uid}/num_checks";
	
	const updates = {};
	updates[path_cntr] = increment(1);
	update(db_ref, updates);
	*/
	
	/*
	get(db_ref).then((snapshot) => {
		if (snapshot.exists()) {
			const num = snapshot.val();
			console.log(path_cntr + " WAS " + num);
			const ii = num + 1;
			set(db_ref, ii).catch((error) => { console.error(error); });
		} else {
			set(db_ref, 1).catch((error) => { console.error(error); });
			console.log("First time. No data before.");
		}
	}).catch((error) => {
		console.error(error);
	});
	*/
