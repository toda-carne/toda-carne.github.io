
/*
//import { gvar, bibobj_to_bibtxt, } from './bq_tools.js';
import * as MOD_BIB_WEB from "../data/js_bib/WEB/index_of_WEB.js";
import * as MOD_BIB_SBLM from "../data/js_bib/SBLM/index_of_SBLM.js";
import * as MOD_BIB_RVA from "../data/js_bib/RVA/index_of_RVA.js";
import * as MOD_BIB_KJV from "../data/js_bib/KJV/index_of_KJV.js";

import * as MOD_BIB_WLC from "../data/js_bib/WLC_BIB/index_of_WLC_BIB.js";
import * as MOD_BIB_ALE from "../data/js_bib/ALE_BIB/index_of_ALE_BIB.js";
import * as MOD_BIB_TKH from "../data/js_bib/TKH_BIB/index_of_TKH_BIB.js";
import * as MOD_BIB_LXX from "../data/js_bib/LXX_BIB/index_of_LXX_BIB.js";

import * as MOD_BIB_NES from "../data/js_bib/NES_BIB/index_of_NES_BIB.js";
import * as MOD_BIB_BYZ from "../data/js_bib/BYZ_BIB/index_of_BYZ_BIB.js";
import * as MOD_BIB_TR from "../data/js_bib/TR_BIB/index_of_TR_BIB.js";
import * as MOD_BIB_WH from "../data/js_bib/WH_BIB/index_of_WH_BIB.js";
*/

import { gvar, } from './sf_search_mgr.js';
import { num2book_en, } from './sf_lang_mgr.js';

const bibles_dir = "../data/js_bib/";

const local_bible_files = {
	WLC_BIB : bibles_dir + "WLC_BIB.js",
	ALE_BIB : bibles_dir + "ALE_BIB.js",
	TKH_BIB : bibles_dir + "TKH_BIB.js",
	LXX_BIB : bibles_dir + "LXX_BIB.js",
	
	NES_BIB : bibles_dir + "NES_BIB.js",
	BYZ_BIB : bibles_dir + "BYZ_BIB.js",
	TR_BIB : bibles_dir + "TR_BIB.js",
	WH_BIB : bibles_dir + "WH_BIB.js",
	
	WEB : bibles_dir + "WEB_BIB.js",
	SBLM : bibles_dir + "SBLM_BIB.js",
	RVA : bibles_dir + "RVA_BIB.js",
	KJV : bibles_dir + "KJV_BIB.js",
};

/*
const local_bibles = {
	WLC_BIB : MOD_BIB_WLC.bib_index,
	ALE_BIB : MOD_BIB_ALE.bib_index,
	TKH_BIB : MOD_BIB_TKH.bib_index,
	LXX_BIB : MOD_BIB_LXX.bib_index,
	
	NES_BIB : MOD_BIB_NES.bib_index,
	BYZ_BIB : MOD_BIB_BYZ.bib_index,
	TR_BIB : MOD_BIB_TR.bib_index,
	WH_BIB : MOD_BIB_WH.bib_index,
	
	WEB : MOD_BIB_WEB.bib_index,
	SBLM : MOD_BIB_SBLM.bib_index,
	RVA : MOD_BIB_RVA.bib_index,
	KJV : MOD_BIB_KJV.bib_index,	
};

function ck_bib_cod(bib_cod){
	if(local_bibles[bib_cod] != null){
		if(gvar.all_bibles == null){
			gvar.all_bibles = {};
		} 
		if (gvar.all_bibles[bib_cod] == null){
			add_bible(bib_cod, local_bibles[bib_cod]);
		}
	}
}

function add_bible(bib_cod, bib_index){
	if(gvar.all_bibles == null){
		gvar.all_bibles = {}; 
	}
	gvar.all_bibles[bib_cod] = {};
	const bib_dat = gvar.all_bibles[bib_cod];
	bib_dat.url_base = bibles_dir;
	bib_dat.bib_index = bib_index;
	bib_dat.bib_parts = {};
}

async function import_bible_part(url_base, bib_cod, fl_part){
	const part_fn = url_base + bib_cod + "/" + fl_part;
	const resp = import(part_fn);
	return resp;
}

async function get_bib_verse(bib_cod, book, chapter, verse){
	ck_bib_cod(bib_cod);
	
	const all_bib = gvar.all_bibles;
	if(all_bib[bib_cod] == null){ return null; }
	
	const bib_dat = all_bib[bib_cod];
	if(bib_dat.bib_index[book] == null){ return null; }

	const fl_part = bib_dat.bib_index[book][chapter];
	if(fl_part == null){ return null; }
	
	if(bib_dat.bib_parts[fl_part] == null){
		const md_part = await import_bible_part(bib_dat.url_base, bib_cod, fl_part);
		bib_dat.bib_parts[fl_part] = md_part.bib_verses;
	}
	const part = bib_dat.bib_parts[fl_part];
	
	return part[book][chapter][verse];
}
*/

async function get_bible_verse(bib_cod, book, chapter, verse){
	await import_bible(bib_cod);
	
	return gvar.full_bible[bib_cod][book][chapter][verse];
}

async function import_file(bib_fl){
	const resp = import(bib_fl);
	return resp;
}

async function import_bible(bib_cod){
	if(local_bible_files[bib_cod] == null){
		return;
	}
	if(gvar.full_bible == null){
		gvar.full_bible = {};
	} 
	if(gvar.full_bible[bib_cod] != null){
		return;
	}
	const bib_fl = local_bible_files[bib_cod];
	const md_bib = await import_file(bib_fl);
	
	gvar.full_bible[bib_cod] = md_bib.bib_verses;	
}


/*
async function bibobj_to_bibhtm(bibobj, bcit, book_nams, conv_fn){
	if(gvar.glb_all_books == null){
		gvar.glb_all_books = book_nams;
	}
	return bibobj_to_bibtxt(bibobj, conv_fn);
}*/

export async function bibobj_to_bibtxt(bibobj, conv_fn){
	const cit_obj = JSON.parse(JSON.stringify(bibobj));
	cit_obj.bib_ver = "text";
	cit_obj.site = "biblehub";
	const vhref = make_bible_ref(cit_obj);
	
	let vcit = "WAITING_FOR_BIBLE_TEXT";
	let vtxt = "INVALID_BIBLE_TEXT";
	if((bibobj.book != null) && (bibobj.chapter != null) && (bibobj.verse != null)){ 
		vcit = get_loc_book_nam(bibobj.book) + " " + bibobj.chapter + ":" + bibobj.verse;
		//vtxt = await get_bib_verse(bibobj.bible, num2book_en[bibobj.book], bibobj.chapter, bibobj.verse);
		vtxt = await get_bible_verse(bibobj.bible, num2book_en[bibobj.book], bibobj.chapter, bibobj.verse);

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

function make_bible_ref(cit_obj){
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

