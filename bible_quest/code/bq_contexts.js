
import { gvar, get_qid_base, } from './bq_tools.js';

const DEBUG_PENDING = false;

function get_new_context(){ 
	const ctx = {
		qids: [],
		tot : 0,
		sub_ctx : {},
	};
	return ctx;
}

function init_pending_qids(){ 
	const db = gvar.glb_poll_db;
	let stt = db.qmodu_state;
	if(stt == null){ db.qmodu_state = {}; stt = db.qmodu_state; }
	let curr_ctx = stt.pending_qids;
	if(curr_ctx == null){ stt.pending_qids = get_new_context(); curr_ctx = stt.pending_qids; }
}

function init_context(qid){ 
	const db = gvar.glb_poll_db;
	let curr_ctx = db.qmodu_state.pending_qids;
	
	if(get_qid_base(qid) == null){ return; }
	
	const quest = db[qid];
	if(quest == null){ return; }
	
	const arr_context = quest.context;
	if(arr_context == null){ return; }
	for(const ctx of arr_context){
		if(ctx == null){ continue; }
		if(curr_ctx.sub_ctx[ctx] == null){ 
			curr_ctx.sub_ctx[ctx] = get_new_context();
		}
		curr_ctx = curr_ctx.sub_ctx[ctx];
	}
}

function get_qid_contexts(qid){ 
	const all_ctx = [];
	if(get_qid_base(qid) == null){
		return all_ctx; // it is not a qid
	}
	const db = gvar.glb_poll_db;
	
	const quest = db[qid];
	if(quest == null){ return all_ctx; }

	let curr_ctx = db.qmodu_state.pending_qids;
	all_ctx.push(curr_ctx);
	
	const arr_context = quest.context;
	if(arr_context == null){
		return all_ctx;
	}

	for(const ctx of arr_context){
		if(ctx == null){ continue; }
		curr_ctx = curr_ctx.sub_ctx[ctx];
		all_ctx.push(curr_ctx);
	}
	return all_ctx;
}

function dec_parents(all_ctx){ 
	while(all_ctx.length > 0){
		const ctx = all_ctx.pop();
		ctx.tot--;
	}
}

function shift_first_pending(ctx, all_parent){ 
	if(ctx.tot == 0){
		return null;
	}
	const all_to_dec = all_parent.concat([ctx]);
	if(ctx.qids.length > 0){
		const qid = ctx.qids.shift();
		dec_parents(all_to_dec);
		return qid;
	}
	const all_chd = Object.entries(ctx.sub_ctx);
	for (const [chd_nam, chd_ctx] of all_chd) {
		const qid = shift_first_pending(chd_ctx, all_to_dec);
		if(qid != null){
			return qid;
		}
	}
	return null;
}

function init_pending(qid){
	if(get_qid_base(qid) == null){
		return; // it is not a qid
	}
	
	const quest = gvar.glb_poll_db[qid];
	if(quest == null){ return; }
	
	quest.qid = qid;

	if(quest.activated_if == null){ 
		add_to_pending(qid, false);
		return;
	}	
}

export function add_to_pending(qid, is_undo){ 
	const all_ctx = get_qid_contexts(qid);
	if(all_ctx.length == 0){
		return false;
	}
	const lst = all_ctx.pop();
	if(is_undo){
		lst.qids.unshift(qid);
	} else {
		lst.qids.push(qid);
	}
	lst.tot++;
	while(all_ctx.length > 0){
		const ctx = all_ctx.pop();
		ctx.tot++;
	}
	return true;
}

export function get_pending_qid(){ 
	const curr_ctx = gvar.glb_poll_db.qmodu_state.pending_qids;
	const all_pnt = [];
	const qid = shift_first_pending(curr_ctx, all_pnt);
	if(DEBUG_PENDING){ console.log("get_pending_qid. qid = " + qid); };
	return qid;
}

export function init_all_context(){  
	init_pending_qids();
	
	const db = gvar.glb_poll_db;
	const all_qids = Object.keys(db);
	for(const qid of all_qids){		
		init_context(qid);
	}

	if(DEBUG_PENDING){ console.log("pending_qids=" + JSON.stringify(db.qmodu_state.pending_qids, null, "  ")); }
	
	for(const qid of all_qids){		
		init_pending(qid);
	}
}

