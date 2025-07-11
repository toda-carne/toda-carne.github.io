
import { gvar, bibobj_to_bibtxt, } from './bq_tools.js';
import * as MOD_BIB_WEB from "../bibles/WEB/index_of_WEB.js";
import * as MOD_BIB_SBLM from "../bibles/SBLM/index_of_SBLM.js";
import * as MOD_BIB_RVA from "../bibles/RVA/index_of_RVA.js";
import * as MOD_BIB_KJV from "../bibles/KJV/index_of_KJV.js";

const local_bibles = {
	WEB : MOD_BIB_WEB.bib_index,
	SBLM : MOD_BIB_SBLM.bib_index,
	RVA : MOD_BIB_RVA.bib_index,
	KJV : MOD_BIB_KJV.bib_index,
};

function ck_bib_cod(bib_cod){
	if(local_bibles[bib_cod] != null){
		if(gvar.all_bibles == null){
			init_all_bibles();
		} else if (gvar.all_bibles[bib_cod] == null){
			add_bible(bib_cod, local_bibles[bib_cod]);
		}
	}
}

const bibles_dir = "../bibles/";

export function add_bible(bib_cod, bib_index, url_base){
	if(gvar.all_bibles == null){
		gvar.all_bibles = {}; 
	}
	gvar.all_bibles[bib_cod] = {};
	const bib_dat = gvar.all_bibles[bib_cod];
	bib_dat.url_base = bibles_dir;
	if(url_base != null){
		bib_dat.url_base = url_base;
	}
	bib_dat.bib_index = bib_index;
	bib_dat.bib_parts = {};
}

function init_all_bibles(){
	add_bible("WEB", MOD_BIB_WEB.bib_index);
	add_bible("SBLM", MOD_BIB_SBLM.bib_index);
	add_bible("RVA", MOD_BIB_RVA.bib_index);
	add_bible("KJV", MOD_BIB_KJV.bib_index);
}

async function import_bible_part(url_base, bib_cod, fl_part){
	const part_fn = url_base + bib_cod + "/" + fl_part;
	const resp = import(part_fn);
	return resp;
}

export async function get_bib_verse(bib_cod, book, chapter, verse){
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

export async function bibobj_to_bibhtm(bibobj, bcit, book_nams, conv_fn){
	if(gvar.glb_all_books == null){
		gvar.glb_all_books = book_nams;
	}
	return bibobj_to_bibtxt(bibobj, conv_fn);
}
