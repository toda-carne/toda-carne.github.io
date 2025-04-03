
import { gvar, } from './bq_tools.js';

const DEBUG_REFERRER = true;

const GET_var_referrer = "referrer";
const GET_var_delete_cand_referrer = "DELETE_CAND_REFERRER";

const CAND_REFERRER = "candidate_referref";
const SAVED_REFERRER = "saved_referref";

export function get_user_href(the_usr){
	//const qr_href = window.location.href + "?" + GET_var_referrer + "=" + the_usr.uid;
	//const loc = window.location;
	const loc = document.location;
	const qr_href = loc.origin + loc.pathname + "?" + GET_var_referrer + "=" + the_usr.uid;
	return qr_href;
}

function find_GET_parameter(prm_nm) {
	let result = null,
	tmp = [];
	location.search
		.substr(1)
		.split("&")
		.forEach(function (item) {
			tmp = item.split("=");
			if(tmp[0] === prm_nm){ result = decodeURIComponent(tmp[1]); }
		});
	return result;
}

export function init_loc_cand_referrer(){
	const pm_rf = find_GET_parameter(GET_var_referrer);
	
	if(DEBUG_REFERRER){
		console.log("REFERRER_GET_PM=" + pm_rf);
		
		const delete_referrer = find_GET_parameter(GET_var_delete_cand_referrer);
		if(delete_referrer == "true"){
			console.log("DELETING_CAND_REFERRER");
			window.localStorage.setItem(CAND_REFERRER, null);
		}
	}
	
	const rf1 = window.localStorage.getItem(CAND_REFERRER);
	if((rf1 == "null") && (pm_rf != null)){  // CAREFUL TRICKY FIRST CONDITION. IT IS A STRING !!!
		if(DEBUG_REFERRER){ console.log("SETTING_CAND_REFERRER=" + pm_rf); }
		set_loc_cand_referrer(pm_rf);
	}
}

export function set_loc_cand_referrer(val){
	window.localStorage.setItem(CAND_REFERRER, val);
}

export function set_loc_confirmed_referrer(val){
	window.localStorage.setItem(SAVED_REFERRER, val);
}

export function get_loc_cand_referrer(){
	const rf1 = window.localStorage.getItem(CAND_REFERRER);
	if(rf1 == "null"){  // CAREFUL TRICKY FIRST CONDITION. IT IS A STRING !!!
		return null;
	}
	return rf1;
}

export function get_loc_confirmed_referrer(){
	const rf1 = window.localStorage.getItem(SAVED_REFERRER);
	if(rf1 == "null"){  // CAREFUL TRICKY FIRST CONDITION. IT IS A STRING !!!
		return null;
	}
	return rf1;
}

