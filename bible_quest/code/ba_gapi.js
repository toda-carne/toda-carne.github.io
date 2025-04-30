
//import { load } from "gapi";

async function check_googe_sign_in(){
	const inst_auth = gapi.auth2.getAuthInstance();
	const is_sgin = inst_auth.isSignedIn.get();
	if(is_sgin){
		console.log('check_googe_sign_in. HAS GOOGLE SIGNED IN');
	} else {
		console.log('check_googe_sign_in. no google signed in');
	}
}

export function load_and_check_googe_sign_in(){
	console.log('Calling check_googe_sign_in.');
	try{
		gapi.load('auth2', (pm) => {
			gapi.auth2.init({ client_id: "313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com" }).then((pm2) => {
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


// 313540425147-sgtmrf9uav4q7qs8ghmg4pce3n8sl28k.apps.googleusercontent.com
//load_and_check_googe_sign_in();

