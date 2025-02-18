

import { init_exam_database, } from './cont_db.js';
import { gvar, get_qid_base, } from '../../code/bq_tools.js';
import { add_to_pending, get_pending_qid, init_all_context, } from '../../code/bq_contexts.js';

function pru_temas(){
	init_exam_database();
	
	const db = gvar.glb_poll_db;
	
	let qid = null;
	
	//console.log("FULL_DB=" + JSON.stringify(db, null, "  "));

	init_all_context();
	
	const pp = db.module_state.pending_qids;	
	console.log("ALL_PENDING=" + JSON.stringify(pp, null, "  "));
	
	qid = get_pending_qid();
	qid = get_pending_qid();
	qid = get_pending_qid();

	console.log("ALL_PENDING=" + JSON.stringify(pp, null, "  "));
	
	while(qid != null){
		qid = get_pending_qid();
	}

	console.log("ALL_PENDING=" + JSON.stringify(pp, null, "  "));
	
}


pru_temas();

