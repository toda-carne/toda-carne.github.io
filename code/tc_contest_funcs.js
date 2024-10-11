
import { get_book_nam, get_verse_reponse_name, get_verse_cit_key, refs_ids } from './tc_lang_all.js';

"use strict";

const SUF_QID = "__";

export function add_sections(nxt_sec, secs, answs, ck_val, value, fst_stm){
	let prv_stm = fst_stm;
	//answs.forEach((an_answ) => {
	for (const [aid, an_answ] of Object.entries(answs)) {
		let curr_stm = an_answ.htm_answ;
		if(! ck_val || (an_answ.is_on == value)){
			const fst_qid = secs[curr_stm];
			if(fst_qid != null){
				nxt_sec[prv_stm] = fst_qid;
			} else {
				console.log("add_sections. Could not find " + curr_stm + " in " + JSON.stringify(secs));
			}
			prv_stm = curr_stm;
		}
	}
	//});
		
	return prv_stm;
}

export function set_all_on(quest){
	if(! quest.is_multi){
		return;
	}
	for (const [aid, an_answ] of Object.entries(quest.answers)) {
		if(an_answ == null){ continue; }
		an_answ.is_on = true;
	}
}

export function has_all_next(quest){
	if(quest.all_nxt != null){
		console.log("Already set_reactions for question " + quest.htm_stm);
		return true;
	}
	return false;
}

function get_all_on(quest){
	const all_on = [0, [], 0, []];
	for (const [aid, an_answ] of Object.entries(quest.answers)) {
		if(an_answ == null){ continue; }
		const is_orig = (an_answ.kind == null);
		if(is_orig){ 
			all_on[0]++;
		} else {
			all_on[2]++;
		}
		if(! an_answ.is_on){ continue; }
		if(is_orig){ 
			all_on[1].push(an_answ);		
		} else {
			all_on[3].push(an_answ);		
		}
	}
	return all_on;
}

export function are_only_all_orig_on(quest){
	if(quest.answers == null){
		return true;
	}
	const all_on = get_all_on(quest);
	return ((all_on[0] == all_on[1].length) && (all_on[3].length == 0));
}

function get_range(cit_obj){
	const book_nam = get_book_nam(cit_obj.book);
	const range = [cit_obj.verse, cit_obj.verse];
	if(cit_obj.last_verse > cit_obj.verse){
		range[1] = cit_obj.last_verse;
	}
	return range;
}

function has_added_on(by_kind){
	return (Object.entries(by_kind).length == 0);
}

export function get_added_by_kind(quest){
	const by_kind = {};
	let to_skip = true;
	for (const [aid, an_answ] of Object.entries(quest.answers)) {
		if(an_answ == null){ continue; }
		if(! an_answ.is_on){ continue; }
		if(an_answ.kind == null){ continue; }
		if(by_kind[an_answ.kind] == null){ by_kind[an_answ.kind] = {}; }
		const in_kind = by_kind[an_answ.kind];
		if(an_answ.kind == refs_ids.verse_kind){
			const cit_obj = an_answ;
			//console.log("by_kind. cit_obj=" + JSON.stringify(cit_obj, null, "  "));
			const book_nam = get_book_nam(cit_obj.book);
			//console.log("by_kind. book_nam=" + book_nam);
			if(in_kind[book_nam] == null){ in_kind[book_nam] = {}; }
			const in_book = in_kind[book_nam];
			if(in_book[cit_obj.chapter] == null){ in_book[cit_obj.chapter] = []; }
			const in_chapter = in_book[cit_obj.chapter];
			in_chapter.push(cit_obj);
		}
		if(an_answ.kind == refs_ids.strong_kind){
		}
	}
	return by_kind;
}

function val_in_range(val, range){
	return ((val >= range[0]) || (val <= range[1]));
}

function cit_in_range(cit_obj, range){
	//console.log("cit_in_range. cit_obj=" + JSON.stringify(cit_obj, null, "  "));
	//console.log("cit_in_range. range=" + JSON.stringify(range, null, "  "));
	return (val_in_range(cit_obj.verse, range) || val_in_range(cit_obj.last_verse, range));
}

export function get_verse_matches(in_verse_kind, with_resp){
	const all_matches = [];
	if(in_verse_kind == null){
		return all_matches;
	}
	with_resp.forEach((cit_obj) => {
		const book_nam = get_book_nam(cit_obj.book);
		if(in_verse_kind[book_nam] == null){ return; } // continue
		const in_chapter = in_verse_kind[book_nam][cit_obj.chapter];
		if(in_chapter == null){ return; } // continue
		in_chapter.forEach((cit_added) => {
			const range = get_range(cit_added);
			if(cit_in_range(cit_obj, range)){
				all_matches.push(cit_obj);
			}
		});
	});
	return all_matches;
}

function get_qid_base(qid){
	if(qid.endsWith(SUF_QID)){
		return qid.slice(0, - SUF_QID.length);
	}
	return null;
}

function get_reponse_qid(qid, cit_obj){
	const kk = get_verse_cit_key(cit_obj);
	const bb = get_qid_base(qid);
	const rqid = bb + kk + SUF_QID;
	return rqid;
}

export function add_reponse_questions(db, qid, with_resp){
	with_resp.forEach((cit_obj) => {
		const rqid = get_reponse_qid(qid, cit_obj);
		const rnam = get_verse_reponse_name(qid, cit_obj);
		db[rqid] = { htm_stm: rnam, };
	});
}

export function respond_first_match(quest, qid, all_matches){
	if(all_matches.length == 0){
		return false;
	}
	
	const fst_match = all_matches[0];
	const rqid = get_reponse_qid(qid, fst_match);
	
	quest.all_nxt = [rqid];
	quest.all_contra = [qid];
	
	return true;
}

