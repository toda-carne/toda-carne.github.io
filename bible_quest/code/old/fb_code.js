


// firebase apiKey access to Identity Toolkit API
// Requests to this API identitytoolkit method google.cloud.identitytoolkit.v1.ProjectConfigService.GetProjectConfig are blocked
// FirebaseAuth.getInstance().MOD_AUTH.signOut();


    MOD_DB.ref.transaction(function(value) {
      return (value || 0) + 1;
    });

-----------------------------------------------------------
    MOD_DB.ref.MOD_DB.set(admin.database.ServerValue.MOD_DB.increment(1));


		firebase.database()
			.MOD_DB.ref('users')
			.child(user_uid)
			.child('searches')
			.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1))
		
		db_ref.transaction(function(value) {
			return (value || 0) + 1;
		});
		
	const db_ref_cntr = MOD_DB.ref(fb_database, firebase_all_users_path + tc_fb_user.uid + "/num_checks")
	db_ref_cntr.MOD_DB.set(admin.database.ServerValue.MOD_DB.increment(1)).catch((error) => { 
		console.error(error); 
	});
		db_ref.MOD_DB.set(firebase.database.ServerValue.MOD_DB.increment(1)).catch((error) => { 
			console.error(error); 
		}
	
	
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
	
	


In Firebase v9+, you need to use serverTimestamp():

import { getDatabase, ref, push, set, onValue, query, orderByChild, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


set(newMessageRef, {
    'name': name.value,
    'message': message.value,
    'createdAt': serverTimestamp()
});

	
	
