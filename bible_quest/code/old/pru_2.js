

const id_ctx_pend = "ctx_pend";
const glb_poll_db = { all_pending: {} };

/*
function get_context(arr_context){
	const db = glb_poll_db;
	let curr_ctx = db.all_pending;
	if(arr_context != null){
		for(const ctx of arr_context){
			if(ctx == null){ continue; }
			if(ctx == id_ctx_pend){ continue; }
			if(curr_ctx[ctx] == null){ 
				curr_ctx[ctx] = {}; 
				curr_ctx[ctx][id_ctx_pend] = []; 
			}
			curr_ctx = curr_ctx[ctx];
		}
	}
	if(curr_ctx[id_ctx_pend] == null){ curr_ctx[id_ctx_pend] = []; }
	return curr_ctx[id_ctx_pend];
}
*/

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
	//console.log("curr_ctx=" + JSON.stringify(curr_ctx, null, "  "));
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

function pru_temas(){
	const db = glb_poll_db;
	const pp = db.all_pending;
	let ctx = null;
	ctx = get_context(null);
	ctx = get_context(["t1", "t1_1", "t1_1_1"]);
	ctx = get_context(["t1", "t1_1", "t1_1_2"]);
	ctx = get_context(["t1", "t1_2"]);
	ctx.push("q001__");
	ctx = get_context(["t2", "t2_1"]);
	ctx = get_context(["t2", "t2_2"]);
	ctx.push("q002__");
	ctx = get_context(["t2"]);
	ctx.push("q003__");
	
	console.log("ALL_CTX=" + JSON.stringify(pp, null, "  "));
	
	ctx = get_first_context();
	console.log("FIRST_CTX=");
	console.log(ctx);
	ctx.pop();
	
	console.log("AFTER get_first_context");
	console.log("ALL_CTX=" + JSON.stringify(pp, null, "  "));
	
	ctx = get_context(["t1", "t1_1", "t1_1_1"], true);
	ctx.push("q001__");
	
	console.log(`AFTER get_context(["t1", "t1_1", "t1_1_1"], true)`);
	console.log("ALL_CTX=" + JSON.stringify(pp, null, "  "));
	
	ctx = get_first_context();
	console.log("FIRST_CTX=");
	console.log(ctx);
	ctx.pop();
	
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

