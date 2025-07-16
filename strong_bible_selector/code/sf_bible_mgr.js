
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

