
import { gvar, } from './sf_search_mgr.js';
import * as MOD_IDX_WLC from "../data/js_scods/WLC/index_of_WLC.js";
import * as MOD_IDX_ALE from "../data/js_scods/ALE/index_of_ALE.js";
import * as MOD_IDX_TKH from "../data/js_scods/TKH/index_of_TKH.js";
import * as MOD_IDX_LXX from "../data/js_scods/LXX/index_of_LXX.js";

import * as MOD_IDX_NES from "../data/js_scods/NES/index_of_NES.js";
import * as MOD_IDX_BYZ from "../data/js_scods/BYZ/index_of_BYZ.js";
import * as MOD_IDX_TR from "../data/js_scods/TR/index_of_TR.js";
import * as MOD_IDX_WH from "../data/js_scods/WH/index_of_WH.js";

const local_scods = {
	WLC : MOD_IDX_WLC.bib_index,
	ALE : MOD_IDX_ALE.bib_index,
	TKH : MOD_IDX_TKH.bib_index,
	LXX : MOD_IDX_LXX.bib_index,
	
	NES : MOD_IDX_NES.bib_index,
	BYZ : MOD_IDX_BYZ.bib_index,
	TR : MOD_IDX_TR.bib_index,
	WH : MOD_IDX_WH.bib_index,
};


function add_scod(strocod, stro_index){
	if(gvar.all_scod_idx == null){
		gvar.all_scod_idx = {}; 
	}
	gvar.all_scod_idx[strocod] = {};
	const dat = gvar.all_scod_idx[strocod];
	dat.scodes = stro_index;
	dat.scodes_parts = {};
}


function init_all_scod_idx(){
	add_scod("WLC", MOD_IDX_WLC.bib_index);
	add_scod("ALE", MOD_IDX_ALE.bib_index);
	add_scod("TKH", MOD_IDX_TKH.bib_index);
	add_scod("LXX", MOD_IDX_LXX.bib_index);
	
	add_scod("NES", MOD_IDX_NES.bib_index);
	add_scod("BYZ", MOD_IDX_BYZ.bib_index);
	add_scod("TR", MOD_IDX_TR.bib_index);
	add_scod("WH", MOD_IDX_WH.bib_index);
}

const scod_idx_dir = "../data/js_scods/";
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


