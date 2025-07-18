
import { gvar, } from './sf_search_mgr.js';

const scodes_dir = "../data/js_scods/";

/*
const local_scods_files = {
	WLC : scodes_dir + "WLC_SCODES.js",
	ALE : scodes_dir + "ALE_SCODES.js",
	TKH : scodes_dir + "TKH_SCODES.js",
	LXX : scodes_dir + "LXX_SCODES.js",
	
	NES : scodes_dir + "NES_SCODES.js",
	BYZ : scodes_dir + "BYZ_SCODES.js",
	TR : scodes_dir + "TR_SCODES.js",
	WH : scodes_dir + "WH_SCODES.js",	
};
*/

const local_scods_files = {
	WLC : scodes_dir + "WLC_SVERSES.js",
	ALE : scodes_dir + "ALE_SVERSES.js",
	TKH : scodes_dir + "TKH_SVERSES.js",
	LXX : scodes_dir + "LXX_SVERSES.js",
	
	NES : scodes_dir + "NES_SVERSES.js",
	BYZ : scodes_dir + "BYZ_SVERSES.js",
	TR : scodes_dir + "TR_SVERSES.js",
	WH : scodes_dir + "WH_SVERSES.js",	
};

export async function get_scode_verses(bib_cod, scode){
	await import_scodes(bib_cod);
	
	return gvar.full_scodes[bib_cod][scode];
}

async function import_file(scod_fl){
	const resp = import(scod_fl);
	return resp;
}

async function import_scodes(bib_cod){
	if(local_scods_files[bib_cod] == null){
		return;
	}
	if(gvar.full_scodes == null){
		gvar.full_scodes = {};
	} 
	if(gvar.full_scodes[bib_cod] != null){
		return;
	}
	const scod_fl = local_scods_files[bib_cod];
	const md_scod = await import_file(scod_fl);
	
	gvar.full_scodes[bib_cod] = md_scod.scode_verses;	
}

