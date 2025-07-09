
import { gvar, } from './sf_search_mgr.js';
import * as MOD_IDX_WLC from "../data/scod_indexes/WLC/index_of_WLC.js";
import * as MOD_IDX_NES from "../data/scod_indexes/NES/index_of_NES.js";
import * as MOD_IDX_BYZ from "../data/scod_indexes/BYZ/index_of_BYZ.js";
import * as MOD_IDX_TR from "../data/scod_indexes/TR/index_of_TR.js";
import * as MOD_IDX_WH from "../data/scod_indexes/WH/index_of_WH.js";

function init_all_scod_idx(){
	gvar.all_scod_idx = {}; 
	const all_scidx = gvar.all_scod_idx;
	
	all_scidx.WLC = {};
	all_scidx.WLC.scodes = MOD_IDX_WLC.bib_index;
	all_scidx.WLC.scodes_parts = {};
	
	all_scidx.NES = {};
	all_scidx.NES.scodes = MOD_IDX_NES.bib_index;
	all_scidx.NES.scodes_parts = {};
	
	all_scidx.BYZ = {};
	all_scidx.BYZ.scodes = MOD_IDX_BYZ.bib_index;
	all_scidx.BYZ.scodes_parts = {};
	
	all_scidx.TR = {};
	all_scidx.TR.scodes = MOD_IDX_TR.bib_index;
	all_scidx.TR.scodes_parts = {};
	
	all_scidx.WH = {};
	all_scidx.WH.scodes = MOD_IDX_WH.bib_index;
	all_scidx.WH.scodes_parts = {};	
}

const scod_idx_dir = "../data/scod_indexes/";
const js_ext = ".js";

async function import_bible_part(bib_cod, fl_part){
	const part_fn = scod_idx_dir + bib_cod + "/scodes_part_" + fl_part + js_ext;
	const resp = import(part_fn);
	return resp;
}

export async function get_strocode_verses(bib_cod, strocode){
	if(gvar.all_scod_idx == null){
		init_all_scod_idx();
	}
		
	const all_scidx = gvar.all_scod_idx;
	if(all_scidx[bib_cod] == null){ return null; }
	
	const scidx_dat = all_scidx[bib_cod];
	if(scidx_dat.scodes[strocode] == null){ return null; }
	
	const fl_part = scidx_dat.scodes[strocode];
	if(fl_part == null){ return null; }

	const nm_part = "p_" + fl_part;
	if(scidx_dat.scodes_parts[nm_part] == null){
		const md_part = await import_bible_part(bib_cod, fl_part);
		scidx_dat.scodes_parts[nm_part] = md_part.scode_verses;
	}
	const part = scidx_dat.scodes_parts[nm_part];
	
	return part[strocode];
}


