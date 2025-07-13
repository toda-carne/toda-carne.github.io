
import { book2num_en, all_en_poll_txt, num2book_en, init_en_module, } from '../quest_conf/bq_lang_en.js';
import { get_bib_verse, } from './bq_bible_mgr.js';

"use strict";

// ENGLISH IS THE DEFAULT LANGUAGE.
// SO THIS FILE WORKS TOGETHER WITH '../quest_conf/bq_lang_en.js';

const DEBUG_REPLACE_BIBREFS = false;

const INVALID_MESSAGE = "INVALID_MESSAGE";
const SUF_QID = "__";
const INVALID_BIBREF = "INVALID_BIBREF";
const UNKNOWN_VERSE = "UNKNOWN_VERSE";
const INVALID_BOOK_ABBR = "INVALID_BOOK_ABBR";

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
	"-1":INVALID_BOOK_ABBR,
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

// Example. BIBREF_Gen_1_3_5 == Gen_1:3-5

const bibref_prefix = "BIBREF_";

const regex_bibref = /\s*BIBREF_(\w*).*/;

export function bibref_to_bibcit(brf){
	const vcit = brf.split(regex_bibref);
	const bcit = vcit[1];
	if((bcit != null) && (bcit != "")){
		return bcit;
	}
	return null;
}

function abbr2book_name(abbr){
	let resp = abbr;
	const num = gvar.abbr2num[resp];
	if(num == null){ return resp; }
	resp = get_book_nam(num);
	return resp;
}

function get_bible_working_version(){
	if(gvar.working_bible == null){
		gvar.working_bible = "WEB";
		if(gvar.glb_exam_language == "es"){
			gvar.working_bible = "SBLM";
		} 
	}
	return gvar.working_bible;
}

function bibcit_to_bibobj(bcit){
	const re = /(\d*[A-Za-z]*)_(\d*)_(\d*)_*(\d*)/;
	const vcit = bcit.split(re);
	const obj = {};
	obj.bible = get_bible_working_version();
	if(abbr2num == {}){ console.error("bibcit_to_bibobj. (abbr2num == {})."); }
	if(vcit.length > 1){ obj.book = abbr2num[vcit[1]]; }
	if(vcit.length > 2){ obj.chapter = vcit[2]; }
	if(vcit.length > 3){ obj.verse = vcit[3]; }
	if(vcit.length > 4){ obj.last_verse = vcit[4]; }
	return obj;
}

function bibobj_to_bibcit(bobj){
	let bcit = num2abbr[bobj.book] + "_" + bobj.chapter + "_" + bobj.verse;
	if(bobj.last_verse != null){ bcit = bcit + "_" + bobj.last_verse; }
	return bcit;
}

export function make_bibref(book_num, chap_num, vers_num){
	const bibref = bibref_prefix + num2abbr[book_num] + "_" + chap_num + "_" + vers_num;
	return bibref
}

export function bibcit_to_citxt(bcit){
	const bibobj = bibcit_to_bibobj(bcit);
	let vcit = bcit;
	if((bibobj.book != null) && (bibobj.chapter != null) && (bibobj.verse != null)){ 
		vcit = get_loc_book_nam(bibobj.book) + " " + bibobj.chapter + ":" + bibobj.verse;
	}
	if((bibobj.last_verse != null) && (bibobj.last_verse != "")){ vcit = vcit + "-" + bibobj.last_verse; }
	return vcit;
}

export async function bibobj_to_bibtxt(bibobj, conv_fn){
	const cit_obj = JSON.parse(JSON.stringify(bibobj));
	cit_obj.bib_ver = "text";
	cit_obj.site = "biblehub";
	const vhref = make_bible_ref(cit_obj);
	
	let vcit = "WAITING_FOR_BIBLE_TEXT";
	let vtxt = "INVALID_BIBLE_TEXT";
	if((bibobj.book != null) && (bibobj.chapter != null) && (bibobj.verse != null)){ 
		vcit = get_loc_book_nam(bibobj.book) + " " + bibobj.chapter + ":" + bibobj.verse;
		vtxt = await get_bib_verse(bibobj.bible, num2book_en[bibobj.book], bibobj.chapter, bibobj.verse);

		if(conv_fn != null){
			vtxt = conv_fn(vtxt);
		}
		/*
		if((stm_id != null) && (gvar.bibrefs_upper != null) && (gvar.bibrefs_upper[stm_id] != null)){ 
			const wds = gvar.bibrefs_upper[stm_id][bcit];
			if(wds != null){ vtxt = uppercase_words_in_string(vtxt, wds); }
		} */
	}
	if((bibobj.last_verse != null) && (bibobj.last_verse != "")){ vcit = vcit + "-" + bibobj.last_verse; }
	const btxt = `<a class='exam_ref' href="${vhref}"> ${vcit} </a><br><b> ${vtxt} </b>`;
	return btxt;
}

async function bibcit_to_bibtxt(bcit, stm_id, cho_bref){
	if(bcit == "CHOSEN"){
		bcit = bibref_to_bibcit(cho_bref);
		if(bcit == null){ return bcit; }
	}
	const bibobj = bibcit_to_bibobj(bcit);
	return bibobj_to_bibtxt(bibobj, (vtxt) => {
		if((stm_id != null) && (gvar.bibrefs_upper != null) && (gvar.bibrefs_upper[stm_id] != null)){ 
			const wds = gvar.bibrefs_upper[stm_id][bcit];
			if(wds != null){ vtxt = uppercase_words_in_string(vtxt, wds); }
		} 
		return vtxt;
	});
}

async function replace_all_bibrefs(str, stm_id, cho_bref){
	if(DEBUG_REPLACE_BIBREFS){ console.error("str=" + str + " stm_id=" + stm_id + " cho_bref=" + cho_bref); }
	const words = str.split(' ');
	if(DEBUG_REPLACE_BIBREFS){ console.error(words); }
	let ii = 0;
	for(ii = 0; ii < words.length; ii++){
		const wrd = words[ii];
		const bcit = bibref_to_bibcit(wrd);
		if(DEBUG_REPLACE_BIBREFS){ console.error("wrd=" + wrd + " bcit=" + bcit); }
		if((bcit != null) && (bcit != "")){
			words[ii] = await bibcit_to_bibtxt(bcit, stm_id, cho_bref);
		}
	}
	
	const nwstr = words.join(' ');
	if(nwstr == ""){
		return str;
	}
	return nwstr;
}

export function set_anchors_target(the_div){
	const all_anchor = the_div.querySelectorAll("a");

	all_anchor.forEach((aa) => {
		const is_local_ref = aa.getAttribute("href").startsWith("#");
		if(! is_local_ref){
			aa.setAttribute('target', '_blank');
		}
	});
}

export function set_bibrefs(dv_txt){
	replace_all_bibrefs(dv_txt.innerHTML, dv_txt.stm_id, dv_txt.cho_bref).then((resp) => {
		if((resp == null) || (resp == "")){
			console.error("set_bibrefs. TRYING TO SET EMPTY innerHTML after replace_all_bibrefs !!!!!. dv_txt.id=" + dv_txt.id);
		}
		if((resp != null) && (resp != "")){
			dv_txt.innerHTML = resp;
		}
		set_anchors_target(dv_txt);
	});
}

// TRADUCTION HANDLING

export function get_msg(nom_msg){
	//const trad_msg = gvar.all_quest_txt;
	const trad_msg = gvar.glb_poll_txt;
	if(trad_msg == null){ return INVALID_MESSAGE; }
	if(nom_msg == null){ return INVALID_MESSAGE; }
	let tr_mg = trad_msg[nom_msg];
	if(tr_mg == null){ tr_mg = all_en_poll_txt[nom_msg]; }
	if(tr_mg == null){ tr_mg = nom_msg; }
	if((gvar.has_qrefs != null) && gvar.has_qrefs[nom_msg]){ 
		tr_mg = replace_all_qrefs(tr_mg); 
	}
	
	return tr_mg;
}

//export let get_msg = null;

export function init_get_msg(lang_msgs){
	gvar.all_quest_txt = lang_msgs;
	/*
	get_msg = function (nom_msg){
		return get_traduced_message(nom_msg);
	};*/
}

export function init_glb_vars(all_vars){
	all_vars.qref_prefix = qref_prefix;
	all_vars.bibref_prefix = bibref_prefix;
	all_vars.qid_sufix = SUF_QID;
	all_vars.INVALID_BIBREF = INVALID_BIBREF;
	all_vars.UNKNOWN_VERSE = UNKNOWN_VERSE;
	if(all_vars.has_qrefs == null){ all_vars.has_qrefs = {}; } 
	if(all_vars.has_bibrefs == null){ all_vars.has_bibrefs = {}; } 
	
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
		console.log("Internal error. get_verse_key. (cit_obj.book == null). cit_obj= " + JSON.stringify(cit_obj, null, "  "));
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

/*
//export function add_response_observation(qid, cit_obj){
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
*/

const ___citation_observation_html = "___citation_observation_html";
const ___citation_observation_name = "___citation_observation_name";

export function get_bibcit_obs(qid, ctx){
	if(gvar.glb_poll_txt[___citation_observation_html] == null){
		gvar.glb_poll_txt[___citation_observation_html] = gvar.glb_curr_lang.msg_citation_obs_html;
	}	
	if(gvar.glb_poll_txt[___citation_observation_name] == null){
		gvar.glb_poll_txt[___citation_observation_name] = gvar.glb_curr_lang.msg_citation_obs_name;
	}	
	const obj_resp = { 
		is_bibcit_observation: true,
		context: ctx,
		htm_stm: ___citation_observation_html,
		htm_nam: ___citation_observation_name,
		activated_if: {	c1: {}, },
		last_sat_conj: "c1",
	};
	const conj1 = obj_resp.activated_if.c1;
	conj1[qid] = {};
	conj1[qid].shown = "on";
	return obj_resp;
}

export function get_bibcit_obs_stm_id(qid, bcit){
	const r_nam = qid + "_reponse_" + bcit;
	return r_nam;
}

export function fill_responses_for(qid, all_bcit, stm, all_to_upper){
	if(all_bcit == null){ return; }
	for (const bcit of all_bcit) {
		fill_response(qid, bcit, stm, all_to_upper);
	}
}

export function set_stm_bibref(stm_id, bref, all_to_upper){
	gvar.glb_poll_txt[stm_id] = bref;
	gvar.has_bibrefs[stm_id] = true;
	if(all_to_upper != null){
		gvar.bibrefs_upper[stm_id] = all_to_upper;
	}
}

export function set_href_bibcit(href_id, bcit, site, bib_ver){
	const bibobj = bibcit_to_bibobj(bcit);
	bibobj.site = gvar.DEFAULT_BIB_HREF_SITE;
	if(site != null){ bibobj.site = site; }
	bibobj.bib_ver = gvar.DEFAULT_BIB_HREF_VERSION;
	if(bib_ver != null){ bibobj.bib_ver = bib_ver; }
	
	const bref = make_bible_ref(bibobj);
		
	gvar.glb_poll_txt[href_id] = bref;
}

export function fill_response(qid, bcit, stm, all_to_upper){
	if(gvar.glb_poll_txt == null){ return; }
	if(gvar.has_bibrefs == null){ return; }
	if(gvar.bibrefs_upper == null){ return; }
	
	let stm2_id = null;
	const bibobj = bibcit_to_bibobj(bcit);
	if(bibobj.verse == null){ return; }
	
	if((bibobj.last_verse == null) || (bibobj.last_verse == "")){
		stm2_id = get_bibcit_obs_stm_id(qid, bcit);
		set_stm_bibref(stm2_id, stm, all_to_upper);
		return;
	}
	
	const bibobj2 = JSON.parse(JSON.stringify(bibobj));
	bibobj2.last_verse = null;
	let bcit2 = null;
	let ii = 0;
	for(ii = bibobj.verse; ii <= bibobj.last_verse; ii++){
		bibobj2.verse = ii;
		bcit2 = bibobj_to_bibcit(bibobj2);
		if(bcit2 == bcit){ continue; }
			
		stm2_id = get_bibcit_obs_stm_id(qid, bcit2);
		set_stm_bibref(stm2_id, stm, all_to_upper);
	}
}

export const all_strongrefs = {
	H1004_cod: "H1004",
	H5782_cod: "H5782",
}

export function init_default_lang(all_vars){
	fill_reversed_object(num2abbr, abbr2num);
	init_en_module(all_vars);
	all_vars.num2abbr = num2abbr;
	all_vars.abbr2num = abbr2num;
}

export function get_resp_for(qid, cit_obj){
	const resp = {};
	resp.rnam = get_verse_reponse_name(qid, cit_obj);
	resp.cit_kk = get_verse_cit_key(cit_obj);
	resp.cit_ref = bib_obj_to_txt(cit_obj);
	return resp;
}

export function get_date_and_time(){ 
	const currentdate = new Date(); 
	const datetime = currentdate.getFullYear() + "/"
					+ (currentdate.getMonth()+1)  + "/"
					+ currentdate.getDate() + "@"
					+ currentdate.getHours() + ":"
					+ currentdate.getMinutes() + ":"
					+ currentdate.getSeconds();
	return datetime;
}

