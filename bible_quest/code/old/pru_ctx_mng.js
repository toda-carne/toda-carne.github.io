

import { init_exam_database, } from './cont_db.js';
import { glb_poll_db, get_qid_base, } from '../../code/tc_lang_all.js';

const id_ctx_pend = "ctx_pend";
//const glb_poll_db = { all_pending: {} };

function get_context(arr_context, as_first){
	const db = glb_poll_db;
	let prv_ctx = null;
	let prv_nm = null;
	let curr_ctx = db.all_pending;
	if(arr_context != null){
		for(const ctx of arr_context){
			if(ctx == null){ continue; }
			//curr_nm = ctx;
			if(ctx == id_ctx_pend){ continue; }
			if(curr_ctx[ctx] == null){ 
				if(! as_first){
					curr_ctx[ctx] = {}; 
					curr_ctx[ctx][id_ctx_pend] = []; 
				} else {
					// UNDO CASE
					const undu_ctx = {};
					undu_ctx[ctx] = {};
					undu_ctx[ctx][id_ctx_pend] = []; 
					
					if(prv_ctx != null){
						prv_ctx[prv_nm] = Object.assign(undu_ctx, curr_ctx);
						curr_ctx = prv_ctx[prv_nm];
					} else {
						const nw_pend = Object.assign(undu_ctx, db.all_pending);
						db.all_pending = nw_pend;
						curr_ctx = db.all_pending;
					}
				}
			}
			prv_ctx = curr_ctx;
			prv_nm = ctx;
			curr_ctx = curr_ctx[ctx];
		}
	}
	if(curr_ctx[id_ctx_pend] == null){ curr_ctx[id_ctx_pend] = []; }
	return curr_ctx[id_ctx_pend];
}

function get_first_context(){
	let ctx_pair = get_first_open_context();
	let parent = ctx_pair[0];
	let ctx_nam = ctx_pair[1];
	let curr_ctx = parent[ctx_nam];
	while((ctx_nam != null) && (curr_ctx[id_ctx_pend].length == 0)){
		delete parent[ctx_nam];
		
		ctx_pair = get_first_open_context();
		parent = ctx_pair[0];
		ctx_nam = ctx_pair[1];
		curr_ctx = parent[ctx_nam];
	}
	if(ctx_nam != null){
		return curr_ctx[id_ctx_pend];
	}
	return parent[id_ctx_pend];
}

function get_first_ctx_name(keys){
	for(const ctx of keys){
		if(ctx != id_ctx_pend){ return ctx; }
	}
	return null;
}

function get_first_open_context(){
	const db = glb_poll_db;
	let parent = db.all_pending;
	let curr_ctx = db.all_pending;
	let ctx_nam = null;
	let curr_keys = Object.keys(curr_ctx);
	while(curr_keys.length > 1){
		const fst_key = get_first_ctx_name(curr_keys);
		if(fst_key == null){ break; }
		
		parent = curr_ctx;
		ctx_nam = fst_key;
		curr_ctx = curr_ctx[ctx_nam];
		curr_keys = Object.keys(curr_ctx);
	}
	return [parent, ctx_nam];
}

function is_question(quest){
	if(quest == null){ return false; }
	const has_answers = (quest.answers != null);
	return has_answers;
}

function add_pend(qid){
	console.log("PRU add_pend(" + qid + ")"); 
	
	const quest = glb_poll_db[qid];
	if(quest == null){ return false; }
	if(! is_question(quest)){ return false; }
	
	//const dv_qid = document.getElementById(qid);
	//const is_shown = (dv_qid != null);
	if(quest.in_pending){
		return false;
	}
	
	const pending = get_context(quest.context);
	pending.push(qid);
	quest.in_pending = true;
	return true;
}

function undo_pending(qid){
	console.log("PRU undo_pending(" + qid + ")"); 
	
	const quest = glb_poll_db[qid];
	if(quest == null){ return false; }
	if(! is_question(quest)){ return false; }
	
	const dv_qid = document.getElementById(qid);
	const is_shown = (dv_qid != null);
	if(is_shown || quest.in_pending){
		return false;
	}
	
	const pending = get_context(quest.context, true);
	pending.unshift(qid);
	quest.in_pending = true;
	return true;
}

function get_pending(){
	//const pending = glb_poll_db.all_pending;
	const pending = get_first_context();
	if(pending.length == 0){
		console.log("PRU get_pending() returned NULL"); 
		return null;
	}
	const qid = pending.shift();
	const quest = glb_poll_db[qid];
	quest.in_pending = false;

	console.log("PRU get_pending() returned qid=" + qid); 
	return qid;
}

function init_DAG_func(){
	if(glb_poll_db.all_pending == null){
		glb_poll_db.all_pending = {};
		get_context();
	}
	
	const all_qids = Object.keys(glb_poll_db);
	for(const qid of all_qids){		
		ini_signals_for(qid);
	}
}

function ini_signals_for(qid){
	if(get_qid_base(qid) == null){
		return; // it is not a qid
	}
	
	const quest = glb_poll_db[qid];
	if(quest == null){ return; }
	
	if(quest.signals_inited){ return; }
	quest.signals_inited = true;
	
	quest.qid = qid;  // very convinient self ref

	if(quest.activated_if == null){ 
		add_pend(qid);
		return;
	}	
}

function pru_temas(){
	init_exam_database();
	init_DAG_func();
	
	const db = glb_poll_db;
	const pp = db.all_pending;	
	
	console.log("FULL_DB=" + JSON.stringify(db, null, "  "));
	console.log("ALL_CTX=" + JSON.stringify(pp, null, "  "));

	get_pending();
	get_pending();
	add_pend("q_six_days__");
	get_pending();
	get_pending(); // returns logic
	
	
	add_pend("q_language__");
	add_pend("q_business__");
	add_pend("q_technology__");
	get_pending(); // returned qid=q_language__ tc_exam.js:2323:10
	
	undo_pend("q_language__");
	undo_pend("q_logic__");
	get_pending(); // returned qid=q_language__ tc_exam.js:2323:10
	
	
	/*
	console.log("AFTER get_first_context"));
	console.log("ALL_CTX=" + JSON.stringify(pp, null, "  "));
	
	ctx = get_first_context();
	console.log("FIRST_CTX=");
	console.log(ctx);
	//ctx.pop();
	
	console.log("AFTER get_first_context"));
	console.log("ALL_CTX=" + JSON.stringify(pp, null, "  "));
	
	//console.log(Object.keys(db));
	*/
}


pru_temas();

