
import { book2num_en, all_en_poll_txt, num2book_en, DEFAULT_BOOK_NAME, init_en_module, } from '../quest_conf/bq_lang_en.js';

"use strict";

// ENGLISH IS THE DEFAULT LANGUAGE.
// SO THIS FILE WORKS TOGETHER WITH '../quest_conf/bq_lang_en.js';

const INVALID_MESSAGE = "INVALID_MESSAGE";
const SUF_QID = "__";

export let gvar = {};

export const abbr2num = {};

export function fill_reversed_object(orig, reverse){
	for (const [key, value] of Object.entries(orig)) {
		reverse[value] = key;
		//console.log(`${key} = ${value}`);
	}  
}

export function is_mobile_browser() {
	const m_list = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
	
	return m_list.some((m_item) => {
		return navigator.userAgent.match(m_item);
	});
}

export const bib_defaults = {
	BOOK: -1,
	CHAPTER: 0,
	VERSE: 0,
	LAST_VERSE: 0,
	BIBLES_SITE: "biblegateway",
	BIB_VER: "BIB",
};


export const num2abbr = {
	"-1":DEFAULT_BOOK_NAME,
	"1":"Gen",
	"2":"Exo",
	"3":"Lev",
	"4":"Num",
	"5":"Deu",
	"6":"Jos",
	"7":"Jdg",
	"8":"Rth",
	"9":"1Sa",
	"10":"2Sa",
	"11":"1Ki",
	"12":"2Ki",
	"13":"1Ch",
	"14":"2Ch",
	"15":"Ezr",
	"16":"Neh",
	"17":"Est",
	"18":"Job",
	"19":"Psa",
	"20":"Pro",
	"21":"Ecc",
	"22":"Sng",
	"23":"Isa",
	"24":"Jer",
	"25":"Lam",
	"26":"Eze",
	"27":"Dan",
	"28":"Hos",
	"29":"Joe",
	"30":"Amo",
	"31":"Oba",
	"32":"Jon",
	"33":"Mic",
	"34":"Nah",
	"35":"Hab",
	"36":"Zep",
	"37":"Hag",
	"38":"Zec",
	"39":"Mal",
	"40":"Mat",
	"41":"Mar",
	"42":"Luk",
	"43":"Jhn",
	"44":"Act",
	"45":"Rom",
	"46":"1Co",
	"47":"2Co",
	"48":"Gal",
	"49":"Eph",
	"50":"Phl",
	"51":"Col",
	"52":"1Th",
	"53":"2Th",
	"54":"1Ti",
	"55":"2Ti",
	"56":"Tit",
	"57":"Phm",
	"58":"Heb",
	"59":"Jas",
	"60":"1Pe",
	"61":"2Pe",
	"62":"1Jo",
	"63":"2Jo",
	"64":"3Jo",
	"65":"Jde",
	"66":"Rev",
};

export const refs_ids = {
	in_favor_side: "_in_favor",
	against_side: "_against",
	added_pfx: "added_",
	verse_kind: "vrs_kind",
	strong_kind: "stg_kind",
	link_kind: "lnk_kind",
	qid_kind: "qid_kind",
};

// QREF HANDLING

export function is_observation(quest){
	if(quest == null){ return false; }
	const has_answers = (quest.answers != null);
	const has_activate = (quest.activated_if != null);
	return (! has_answers && has_activate);
}

const qref_prefix = "QREF_";

function qref_to_qid(qrf){
	return qrf.slice(qref_prefix.length);
}

export function qid_to_qhref(qid, consec){
	const quest = gvar.glb_poll_db[qid];
	if(quest == null){
		const bad_qhrf = "<a class='exam_ref' href='#" + qid + "'>invalid question " + qid + "</a>";
		return bad_qhrf;
	}
	let num_quest = gvar.glb_curr_lang.msg_qref_question_num + " " + quest.pos_page;
	if(is_observation(quest)){
		if(consec == null){ consec = "???"; }
		num_quest = gvar.glb_curr_lang.msg_qref_observation_num + " " + consec;
	}
	const qhrf = "<a class='exam_ref' href='#" + qid + "'>" + num_quest + "</a>";
	return qhrf;
}

export function replace_all_qrefs(str){
	const words = str.split(' ');
	words.forEach((wrd, idx, arr) => {
		if(wrd.startsWith(qref_prefix)){
			arr[idx] = qid_to_qhref(qref_to_qid(wrd)); 
		}
	});
	
	const nwstr = words.join(' ');
	return nwstr;
}

// BIBREF HANDLING

// Example. BIBREF_Gen_1:3-5

const bibref_prefix = "BIBREF_";

function bibref_to_bibcit(brf){
	return brf.slice(bibref_prefix.length);
}

function bibcit_to_bibobj(bcit){
	const re = /([A-Za-z]*)_(\d*):(\d*)-*(\d*)/;
	const vcit = bcit.split(re);
	const obj = {};
	obj.book = vcit[1];
	obj.chapter = vcit[2];
	obj.verse = vcit[3];
	obj.last_verse = vcit[4];
	return obj;
}

function bibcit_to_bibtxt(bcit){
	const bibobj = bibcit_to_bibobj(bcit);
	console.log(bibobj);
	return bibobj.book + "/" + bibobj.chapter + "/" + bibobj.verse + "/" + bibobj.last_verse;
}

function replace_all_bibrefs(str){
	const words = str.split(' ');
	words.forEach((wrd, idx, arr) => {
		if(wrd.startsWith(bibref_prefix)){
			arr[idx] = bibcit_to_bibtxt(bibref_to_bibcit(wrd)); 
		}
	});
	
	const nwstr = words.join(' ');
	return nwstr;
}

// TRADUCTION HANDLING

function get_traduced_message(trad_msg, nom_msg){
	if(trad_msg == null){ return INVALID_MESSAGE; }
	if(nom_msg == null){ return INVALID_MESSAGE; }
	let tr_mg = trad_msg[nom_msg];
	if(tr_mg == null){ tr_mg = all_en_poll_txt[nom_msg]; }
	if(tr_mg == null){ tr_mg = nom_msg; }
	if((gvar.has_qrefs != null) && gvar.has_qrefs[nom_msg]){ tr_mg = replace_all_qrefs(tr_mg); }
	if((gvar.has_bibrefs != null) && gvar.has_bibrefs[nom_msg]){ tr_mg = replace_all_bibrefs(tr_mg); }
	
	return tr_mg;
}

export let get_msg = null;

export function init_get_msg(lang_msgs){
	get_msg = function (nom_msg){
		return get_traduced_message(lang_msgs, nom_msg);
	};
}

export function init_glb_vars(all_vars){
	gvar = all_vars;
}

export function init_poll_glb(polldb){
	if(polldb == null){ console.error("init_poll_glb FAILED!!!"); return; }
	gvar.glb_poll_db = polldb;
	const db = gvar.glb_poll_db;
	if(db.qmodu_state == null){ db.qmodu_state = {}; }
	db.qmodu_state.qmonam = gvar.current_qmonam;
	console.log("Called init_poll_glb");
}

export function get_new_dv_under(dv_pop_up, id_dv){
	let dv_options = document.getElementById(id_dv);
	if(dv_options != null){
		var was_mine = (dv_pop_up.nextSibling == dv_options);
		dv_options.remove();
		if(was_mine){
			//console.log("get_new_dv_under RETURNS NOTHING !!!!!");
			return null;
		}
	}
	dv_options = document.createElement("div");
	dv_pop_up.after(dv_options);
	
	dv_options.id = id_dv;
	return dv_options;
}

export function fill_all_strongrefs_href(){
	for (const [key, value] of Object.entries(all_strongrefs)) {
		const ob_sufx = "_cod";
		if(key.endsWith(ob_sufx)){
			const prefx = key.slice(0, key.length - ob_sufx.length);
			const href_attr = prefx + "_href";
			const href_val = make_strong_ref(value);
			all_strongrefs[href_attr] = href_val;
			//console.log(`${hb.href_attr} = ${hb.href_val}`);
		}
	}  	
}

export function fill_bibrefs_href(all_rfs){
	for (const [key, bib_obj] of Object.entries(all_rfs)) {
		const ob_sufx = "_obj";
		if(key.endsWith(ob_sufx)){
			const prefx = key.slice(0, key.length - ob_sufx.length);
			const href_attr = prefx + "_href";
			const href_val = make_bible_ref(bib_obj);
			all_rfs[href_attr] = href_val;
			//console.log(`${hb.href_attr} = ${hb.href_val}`);
		}
	}  
	
}

export function uppercase_words_in_string(the_str, to_up_arr){
	const words = the_str.split(' ');
	//console.log(JSON.stringify(words, null, "  "));
	const nw_words = [];
	words.forEach((word) => {
		if(to_up_arr.includes(word)){
			word = word.toUpperCase();
		} 
		nw_words.push(word);
	});	
	const nwstr = nw_words.join(' ');
	return nwstr;
}

function get_book_nam(book){
	let book_nam = book; 
	if(isNaN(book)){ // bibrefs references
		book_nam = book;
	} else { // normal references
		let num = Number(book);
		book_nam =  num2book_en[num];
	}
	return book_nam;
}

function get_loc_book_nam(book){
	let num = -1;
	if(isNaN(book)){ // bibrefs references
		num = book2num_en[book];
	} else { // normal references
		num = Number(book);
	}
	let book_nam =  gvar.glb_all_books[num];  
	return book_nam;
}

function get_verse_key(cit_obj, with_lang){
	if(cit_obj.book == null){
		console.log("Internal error. get_verse_cit_key. cit_obj= " + JSON.stringify(cit_obj, null, "  "));
		return "invalid_verse_cit_key";
	}
	const book_nam =  get_book_nam(cit_obj.book);
	let kk = "bib_";
	if(with_lang){
		kk = kk + cit_obj.site + "_" + cit_obj.bib_ver + "_";
	}
	kk = kk + book_nam + "_" + cit_obj.chapter + "_" + cit_obj.verse;
	if(cit_obj.last_verse != bib_defaults.LAST_VERSE){
		kk = kk + "_" + cit_obj.last_verse;
	}
	return kk;
}

export function get_verse_cit_key(cit_obj){
	return get_verse_key(cit_obj, true);
}

export function get_verse_cit_txt(cit_obj){
	const kk = get_verse_cit_key(cit_obj) + "_str";
	return gvar.glb_all_bibrefs[kk];
}

export function make_bible_ref(cit_obj){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	const book_nam =  get_book_nam(cit_obj.book);
	//console.log("make_bible_ref. cit_obj= " + JSON.stringify(cit_obj, null, "  ") + "\nbook_nam=" + book_nam);
	let bibref = null;
	if(cit_obj.site == "blueletterbible"){
		bibref = "https://www.blueletterbible.org/" + cit_obj.bib_ver + "/" + cit_obj.abbr + "/" + cit_obj.chapter + "/" + cit_obj.verse;
		return bibref;
		//https://www.blueletterbible.org/kjv/mat/3/4/
	}
	if(cit_obj.site == "biblehub"){
		if(cit_obj.bib_ver == "text"){
			bibref = "https://www.biblehub.com/text/" + book_nam + "/" + cit_obj.chapter + "-" + cit_obj.verse + ".htm";
			return bibref;
		} else {
			bibref = "https://www.biblehub.com/" + cit_obj.bib_ver + "/" + book_nam + "/" + cit_obj.chapter + ".htm";
			return bibref;
		}
	}
	if(cit_obj.site == "bibliaparalela"){
		// https://bibliaparalela.com/nblh/genesis/1.htm
		bibref = "https://bibliaparalela.com/" + cit_obj.bib_ver + "/" + book_nam + "/" + cit_obj.chapter + ".htm";
		return bibref;
	}
	if(cit_obj.site == "biblegateway"){
		bibref = "https://www.biblegateway.com/passage/?search=" + book_nam + "+" + cit_obj.chapter + ":" + cit_obj.verse;
		if(! (cit_obj.last_verse == bib_defaults.LAST_VERSE)){
			bibref += "-" + cit_obj.last_verse;
		}
		bibref += "&version=" + cit_obj.bib_ver;
		return bibref;
	}
	
}

export function bib_obj_to_txt(bib_obj){
	const loc_book_nam =  get_loc_book_nam(bib_obj.book);
	//console.log("loc_book_nam=" + loc_book_nam);
	let cit_txt = loc_book_nam + " " + bib_obj.chapter + ":" + bib_obj.verse;
	if(! (bib_obj.last_verse == bib_defaults.LAST_VERSE)){
		cit_txt += " - " + bib_obj.last_verse;
	}
	cit_txt += " (" + bib_obj.bib_ver + ")";
	return cit_txt;
}

export function bib_obj_to_cit_obj(bib_obj){
	const cit_obj = JSON.parse(JSON.stringify(bib_obj));
	cit_obj.book = book2num_en[bib_obj.book];
	cit_obj.kind = refs_ids.verse_kind;
	cit_obj.rclk_href = make_bible_ref(bib_obj);
	return cit_obj;
}

export function make_strong_ref(scode){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	if((scode.length < 2) || ((scode[0] != "G") && (scode[0] != "H"))){
		return "https://www.biblehub.com";
	}
	var bibref = null;
	const the_code = scode.substring(1);
	if(scode[0] == "H"){
		bibref = "https://www.biblehub.com/hebrew/" + the_code + ".htm";
	}
	if(scode[0] == "G"){
		bibref = "https://www.biblehub.com/greek/" + the_code + ".htm";
	}
	return bibref;
}

export function get_verse_reponse_name(qid, cit_obj){
	const kk = get_verse_cit_key(cit_obj);
	const r_nam = qid + "reponse_" + kk;
	return r_nam;
}

function get_range(cit_obj){
	//const book_nam = get_book_nam(cit_obj.book);
	const range = [cit_obj.verse, cit_obj.verse];
	if(cit_obj.last_verse > cit_obj.verse){
		range[1] = cit_obj.last_verse;
	}
	return range;
}

function val_in_range(val, range){
	return ((val >= range[0]) || (val <= range[1]));
}

function cit_in_range(cit_obj, range){
	//console.log("cit_in_range. cit_obj=" + JSON.stringify(cit_obj, null, "  "));
	//console.log("cit_in_range. range=" + JSON.stringify(range, null, "  "));
	return (val_in_range(cit_obj.verse, range) || val_in_range(cit_obj.last_verse, range));
}

export function get_verse_match(cit_adding, with_resp){
	const book_nam_1 = get_book_nam(cit_adding.book);
	let found = null;
	with_resp.forEach((cit_obj) => {
		const book_nam_2 = get_book_nam(cit_obj.book);
		if(book_nam_1 != book_nam_2){ return; } // continue
		if(cit_adding.chapter != cit_obj.chapter){ return; } // continue
		const range = get_range(cit_adding);
		if(cit_in_range(cit_obj, range)){
			found = cit_obj;
			return;
		}
	});
	return found;
}

export function get_qid_base(qid){
	if(qid.endsWith(SUF_QID)){
		return qid.slice(0, - SUF_QID.length);
	}
	return null;
}

export function get_answer_key(qid, cit_obj){
	const kk = get_verse_key(cit_obj, false);
	const bb = get_qid_base(qid);
	const rqid = bb + "_answ_" + kk;
	return rqid;	
}

export function add_response_observation(qid, cit_obj){
	const rnam = get_verse_reponse_name(qid, cit_obj);
	const ans_key = get_answer_key(qid, cit_obj);
	const obj_resp = { 
		htm_stm: rnam, 
		activated_if: {	c1: {}, },
	};
	const conj1 = obj_resp.activated_if.c1;
	conj1[qid] = {};
	conj1[qid][ans_key] = "on";
	
	return obj_resp;
}

export const all_strongrefs = {
	H1004_cod: "H1004",
	H5782_cod: "H5782",
}

export function init_default_lang(all_vars){
	fill_reversed_object(num2abbr, abbr2num);
	init_en_module(all_vars);
}

export function get_resp_for(qid, cit_obj){
	const resp = {};
	resp.rnam = get_verse_reponse_name(qid, cit_obj);
	resp.cit_kk = get_verse_cit_key(cit_obj);
	resp.cit_ref = bib_obj_to_txt(cit_obj);
	return resp;
}

