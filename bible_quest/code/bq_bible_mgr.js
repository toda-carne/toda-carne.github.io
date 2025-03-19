
import { gvar, } from './bq_tools.js';
import * as MOD_BIB_WEB from "../bibles/WEB/index_of_WEB.js";
import * as MOD_BIB_SBLM from "../bibles/SBLM/index_of_SBLM.js";
import * as MOD_BIB_RVA from "../bibles/RVA/index_of_RVA.js";
import * as MOD_BIB_KJV from "../bibles/KJV/index_of_KJV.js";

function init_all_bibles(){
	gvar.all_bibles = {}; 
	const all_bib = gvar.all_bibles;
	
	all_bib.WEB = {};
	all_bib.WEB.bib_index = MOD_BIB_WEB.bib_index;
	all_bib.WEB.bib_parts = {};

	all_bib.SBLM = {};
	all_bib.SBLM.bib_index = MOD_BIB_SBLM.bib_index;
	all_bib.SBLM.bib_parts = {};

	all_bib.RVA = {};
	all_bib.RVA.bib_index = MOD_BIB_RVA.bib_index;
	all_bib.RVA.bib_parts = {};
	
	all_bib.KJV = {};
	all_bib.KJV.bib_index = MOD_BIB_KJV.bib_index;
	all_bib.KJV.bib_parts = {};
	
}

const bibles_dir = "../bibles/";

async function import_bible_part(bib_cod, fl_part){
	const part_fn = bibles_dir + bib_cod + "/" + fl_part;
	const resp = import(part_fn);
	return resp;
}

export async function get_bib_verse(bib_cod, book, chapter, verse){
	if(gvar.all_bibles == null){
		init_all_bibles();
	}
	
	const all_bib = gvar.all_bibles;
	if(all_bib[bib_cod] == null){ return null; }
	
	const bib_dat = all_bib[bib_cod];
	if(bib_dat.bib_index[book] == null){ return null; }
	
	const fl_part = bib_dat.bib_index[book][chapter];
	if(fl_part == null){ return null; }
	
	if(bib_dat.bib_parts[fl_part] == null){
		const md_part = await import_bible_part(bib_cod, fl_part);
		bib_dat.bib_parts[fl_part] = md_part.bib_verses;
	}
	const part = bib_dat.bib_parts[fl_part];
	
	return part[book][chapter][verse];
}


