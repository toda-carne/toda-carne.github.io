
import { gvar, } from './sf_search_mgr.js';
import { num2book_en, } from './sf_lang_mgr.js';
import { diffSequence } from './sf_diff_sequence.js';
import { distance, closest,  } from './sf_word_dist.js';

const bibles_dir = "../data/js_bib/";
const strongs_dir = "../data/js_sbib/";
const loc_dir = "../data/js_loc/";

const local_bible_files = {
	WLC : bibles_dir + "WLC_BIB.js",
	ALE : bibles_dir + "ALE_BIB.js",
	TKH : bibles_dir + "TKH_BIB.js",
	LXX : bibles_dir + "LXX_BIB.js",
	
	NES : bibles_dir + "NES_BIB.js",
	BYZ : bibles_dir + "BYZ_BIB.js",
	TR : bibles_dir + "TR_BIB.js",
	WH : bibles_dir + "WH_BIB.js",
	
	WEB : bibles_dir + "WEB_BIB.js",
	KJV : bibles_dir + "KJV_BIB.js",
	SBLM : bibles_dir + "SBLM_BIB.js",
	SBLMi : bibles_dir + "SBLMi_BIB.js",
	RVA : bibles_dir + "RVA_BIB.js",
	RVAi : bibles_dir + "RVAi_BIB.js",
	
	WLC_S : strongs_dir + "WLC_SBIB.js",
	ALE_S : strongs_dir + "ALE_SBIB.js",
	TKH_S : strongs_dir + "TKH_SBIB.js",
	LXX_S : strongs_dir + "LXX_SBIB.js",
	
	NES_S : strongs_dir + "NES_SBIB.js",
	BYZ_S : strongs_dir + "BYZ_SBIB.js",
	TR_S : strongs_dir + "TR_SBIB.js",
	WH_S : strongs_dir + "WH_SBIB.js",
	
	HEB_LOC : loc_dir + "HEB_TRA.js",
	GRE_LOC : loc_dir + "GRE_TRA.js",
};

const local_text_files = {
	HEB_EN : loc_dir + "HEB_EN.js",
	HEB_ES : loc_dir + "HEB_ES.js",
	GRE_EN : loc_dir + "GRE_EN.js",
	GRE_ES : loc_dir + "GRE_ES.js",
};

export async function get_text_analysis(bib_cod, book, chapter, verse){
	const asc = await get_bible_verse(bib_cod, book, chapter, verse);
	const sbib = bib + "_S";
	const sco = await get_bible_verse(sbib, book, chapter, verse);
	let lpref = "HEB";
	if(book > 39){
		lpref = "GRE";
	}
	const lbib = lpref + "_LOC";
	const loc = await get_bible_verse(lbib, book, chapter, verse);

	const ana = get_obj_analysis(asc, sco, loc);
	
	const ltra = lpref + "_" + gvar.lang.toUpperCase();
	await fill_translation(ltra, ana);
}

function get_obj_analysis(asc, sco, loc){
	const vasc = asc.split(" ");
	const vsco = sco.split(" ");
	const vtmp = loc.split(" ");
	const vloc = vtmp.map((tok) => { 
		const arr = tok.split(":");
		return arr[0];
	});
	const ana = vtmp.map((tok) => { 
		const arr = tok.split(":");
		return { id: arr[0], idtra: arr[1], };
	});
	const cri = vasc.map((idval, ii) => {
		return { id: idval, sco: vsco[ii], idx: ii, };
	});
	const comm = find_ana(vasc, vloc, ana);
	
	// [ { id: "asc", sco: "sco"; txt: "g/h"; tra: "tra"; idtra: "idtra"; is_cri: "T/F" } , ... ]
	return ana;
}

function add_common(rr, s1, nc, ii1){
	for (; nc > 0; nc -= 1, ii1 += 1) {
		rr.push(s1[ii1]);
	}
}

function mark_common(ana2, nc, idx){
	for (; nc > 0; nc -= 1, idx += 1) {
		ana2[idx].comm = true;
	}
}

function add_not_common(ana2, prv2, idx2, s1, prv1, idx1){
	if(prv2 >= idx2){
		console.err("FALSE INDEX");
	}
	if(prv1 >= idx1){
		console.err("FALSE INDEX");
	}
	const fst1 = prv1 + 1;
	let ii1 = fst1;
	const not_comm1 = s1.slice(fst1, idx1);
	//console.log("not_comm1 [" + fst1 + "," + idx1 + ")");
	//console.log(not_comm1);
	let ii2 = prv2;
	while(not_comm1.length > 0){
		const fst2 = ii2 + 1;
		if(fst2 >= idx2){
			break;
		}
		const wd1 = not_comm1.shift();
		const not_comm2 = ana2.slice(fst2, idx2).map(oo => oo.id);
		//console.log("not_comm2");
		//console.log(not_comm2);
		const wd2 = closest(wd1, not_comm2);
		const iwd2 = not_comm2.findIndex(ee => (ee === wd2));
		const aii2 = fst2 + iwd2;
		
		const obj2 = ana2[aii2];
		if(obj2.id != wd2){
			console.err("FALSE FIND");
		}
		if(obj2.added == null){ obj2.added = []; };
		if(s1[ii1] != wd1){
			console.err("FALSE ii1");
		}
		obj2.added.push({id: wd1, idx:ii1});
		ii2 = aii2;
		ii1++;
	}
	if(not_comm1.length > 0){
		//console.log("ENTRA=======================================");
		//console.log(not_comm1);
		const obj2 = ana2[ii2];
		if(obj2.added == null){ obj2.added = []; };
		while(not_comm1.length > 0){
			const wd1 = not_comm1.shift();
			if(s1[ii1] != wd1){
				console.err("FALSE ii1 (case 2)");
			}			
			obj2.added.push({id: wd1, idx:ii1});
			ii1++;
		}
	}
}

export function find_ana(s1, s2, ana2){
	const rr = [];
	let prv1 = -1;
	let prv2 = -1;
	diffSequence(
		s1.length,
		s2.length,
		(idx1, idx2) => Object.is(s1[idx1], s2[idx2]),
		(n_comm, idx1, idx2) => {
			add_common(rr, s1, n_comm, idx1);
			mark_common(ana2, n_comm, idx2);
			add_not_common(ana2, prv2, idx2, s1, prv1, idx1);
			prv1 = idx1 + n_comm - 1;
			prv2 = idx2 + n_comm - 1;
		},
	);
	add_not_common(ana2, prv2, s2.length, s1, prv1, s1.length);
	return rr;
}

async function fill_translation(ltra, ana){
	const tra = {};
	return tra;
}

export async function get_local_text(locid, idtxt){
	await import_local_text(locid);
	
	return gvar.full_local_text[locid][idtxt];
}

async function import_local_text(locid){
	if(local_text_files[locid] == null){
		return;
	}
	if(gvar.full_local_text == null){
		gvar.full_local_text = {};
	} 
	if(gvar.full_local_text[locid] != null){
		return;
	}
	const loc_fl = local_text_files[locid];
	const md_loc = await import_file(loc_fl);
	
	gvar.full_local_text[locid] = md_loc.loc_txt;
}

export async function get_bible_verse(bib_cod, book, chapter, verse){
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

