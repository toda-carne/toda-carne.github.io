
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

const hebrew_chars = {
ALEF:'\u05D0',
BET:'\u05D1',
GIMEL:'\u05D2',
DALET:'\u05D3',
HE:'\u05D4',
VAV:'\u05D5',
ZAYIN:'\u05D6',
HET:'\u05D7',
TET:'\u05D8',
YOD:'\u05D9',
F_KAF:'\u05DA',
KAF:'\u05DB',
LAMED:'\u05DC',
F_MEM:'\u05DD',
MEM:'\u05DE',
F_NUN:'\u05DF',
NUN:'\u05E0',
SAMEKH:'\u05E1',
AYIN:'\u05E2',
F_PE:'\u05E3',
PE:'\u05E4',
F_TSADI:'\u05E5',
TSADI:'\u05E6',
KUF:'\u05E7',
RESH:'\u05E8',
SHIN:'\u05E9',
TAV:'\u05EA',
};

const ascii_heb_finals = {
'c':1,
'm':1,
'n':1,
'f':1,
'z':1,
}

const ascii_to_hebrew = {
'e':hebrew_chars.ALEF,
'b':hebrew_chars.BET,
'g':hebrew_chars.GIMEL,
'd':hebrew_chars.DALET,
'h':hebrew_chars.HE,
'v':hebrew_chars.VAV,
'x':hebrew_chars.ZAYIN,
'k':hebrew_chars.HET,
'p':hebrew_chars.TET,
'i':hebrew_chars.YOD,
'cf':hebrew_chars.F_KAF,
'c':hebrew_chars.KAF,
'l':hebrew_chars.LAMED,
'mf':hebrew_chars.F_MEM,
'm':hebrew_chars.MEM,
'nf':hebrew_chars.F_NUN,
'n':hebrew_chars.NUN,
's':hebrew_chars.SAMEKH,
'a':hebrew_chars.AYIN,
'ff':hebrew_chars.F_PE,
'f':hebrew_chars.PE,
'zf':hebrew_chars.F_TSADI,
'z':hebrew_chars.TSADI,
'q':hebrew_chars.KUF,
'r':hebrew_chars.RESH,
'w':hebrew_chars.SHIN,
't':hebrew_chars.TAV,
};

const ascii_to_min_greek = {
'a':'α',
'b':'β',
'g':'γ',
'd':'δ',
'e':'ε',
'F':'ϝ',
'N':'ͷ',
'S':'ϛ',
'z':'ζ',
'H':'ͱ',
'h':'η',
'q':'θ',
'i':'ι',
'j':'ϳ',
'k':'κ',
'l':'λ',
'm':'μ',
'n':'ν',
'x':'ξ',
'o':'ο',
'p':'π',
'M':'ϻ',
'K':'ϟ',
'Q':'ϙ',
'r':'ρ',
's':'ς',
's':'σ',
'Z':'ͼ',
't':'τ',
'u':'υ',
'f':'φ',
'c':'χ',
'y':'ψ',
'w':'ω',
};

const ascii_to_may_greek = {
'a':'Α',
'b':'Β',
'g':'Γ',
'd':'Δ',
'e':'Ε',
'F':'Ϝ',
'N':'Ͷ',
'S':'Ϛ',
'z':'Ζ',
'H':'Ͱ',
'h':'Η',
'q':'Θ',
'i':'Ι',
'j':'Ϳ',
'k':'Κ',
'l':'Λ',
'm':'Μ',
'n':'Ν',
'x':'Ξ',
'o':'Ο',
'p':'Π',
'M':'Ϻ',
'K':'Ϟ',
'Q':'Ϙ',
'r':'Ρ',
's':'Σ',
's':'Σ',
'Z':'ͼ',
't':'Τ',
'u':'Υ',
'f':'Φ',
'c':'Χ',
'y':'Ψ',
'w':'Ω',
};


export async function get_text_analysis(bib, book, chapter, verse){
	const asc = await get_bible_verse(bib, book, chapter, verse);
	const sbib = bib + "_S";
	const sco = await get_bible_verse(sbib, book, chapter, verse);
	let lpref = "HEB";
	const num_book = gvar.book2num_en[book];
	if(num_book > 39){
		lpref = "GRE";
	}
	const lbib = lpref + "_LOC";
	console.log("" + lbib + " " + book + "_" + chapter + ":" + verse);
	const loc = await get_bible_verse(lbib, book, chapter, verse);

	const ana = get_obj_analysis(asc, sco, loc);
	
	const ltra = lpref + "_" + gvar.lang.toUpperCase();
	await fill_translation(ltra, ana);
	
	const txt_ana = {
		tasc: asc,
		tsco: sco,
		tloc: loc,
		ana: ana,
	};
	
	return txt_ana;
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
	const comm = find_ana(vasc, vloc, ana);
	
	fill_scodes(ana, vsco, vasc);
	// [ { id: "asc", sco: "sco"; txt: "g/h"; tra: "tra"; idtra: "idtra"; is_cri: "T/F" } , ... ]
	return ana;
}

function fill_scodes(ana, vsco, vasc){
	let ii = 0;
	for(; ii < ana.length; ii++){
		const obj = ana[ii];
		if(obj.idx1 != null){
			const idx1 = obj.idx1;
			if(! obj.comm){
				console.err("FALSE idx1");
			}
			if(vasc[idx1] != obj.id){
				console.err("FALSE idx1 (case 2)");
			}
			obj.sco = vsco[idx1];
		} else if(obj.added != null){
			fill_added_scodes(obj.added, vsco, vasc);
		}
		//obj.sco = vsco[]:;
	}
}

function fill_added_scodes(added, vsco, vasc){
	let ii = 0;
	for(; ii < added.length; ii++){
		const obj = added[ii];
		if(obj.idx1 != null){
			const idx1 = obj.idx1;
			if(vasc[idx1] != obj.id){
				console.err("FALSE idx1 (case 2)");
			}
			obj.sco = vsco[idx1];
		} 
	}
}

function add_common(rr, s1, nc, ii1){
	for (; nc > 0; nc -= 1, ii1 += 1) {
		rr.push(s1[ii1]);
	}
}

function mark_common(ana2, nc, idx2, idx1){
	for (; nc > 0; nc -= 1, idx2 += 1, idx1 += 1) {
		ana2[idx2].comm = true;
		ana2[idx2].idx1 = idx1;
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
		obj2.added.push({id: wd1, idx1: ii1});
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
			obj2.added.push({id: wd1, idx1: ii1});
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
			mark_common(ana2, n_comm, idx2, idx1);
			add_not_common(ana2, prv2, idx2, s1, prv1, idx1);
			prv1 = idx1 + n_comm - 1;
			prv2 = idx2 + n_comm - 1;
		},
	);
	add_not_common(ana2, prv2, s2.length, s1, prv1, s1.length);
	return rr;
}

async function fill_translation(ltra, ana){
	let ii = 0;
	for(; ii < ana.length; ii++){
		const obj = ana[ii];
		const tra = await get_local_text(ltra, obj.idtra);
		obj.tra = tra;
	}
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

function word_to_min_greek(word){
	const letras = word.split('');
	let gre = letras.map(ll => ascii_to_min_greek[ll]);
	return gre.join('');
}

export function verse_to_min_greek(verse){
	const all_ww = verse.split(' ');
	let gre = all_ww.map(ww => word_to_min_greek(ww));
	return gre.join(' ');
}

function word_to_may_greek(word){
	const letras = word.split('');
	let gre = letras.map(ll => ascii_to_may_greek[ll]);
	return gre.join('');
}

export function verse_to_may_greek(verse){
	const all_ww = verse.split(' ');
	let gre = all_ww.map(ww => word_to_may_greek(ww));
	return gre.join(' ');
}

function word_to_hebrew(word){
	const letras = word.split('');
	const last = letras[letras.length - 1];
	if(ascii_heb_finals[last] != null){
		letras[letras.length - 1] = last + 'f';
	}
	let heb = letras.map(ll => ascii_to_hebrew[ll]);
	return heb.join('');
}

export function verse_to_hebrew(verse){
	const all_ww = verse.split(' ');
	let heb = all_ww.map(ww => word_to_hebrew(ww));
	return heb.join(' ');
}

