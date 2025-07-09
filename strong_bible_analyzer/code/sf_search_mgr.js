

import { get_bib_verse, bibobj_to_bibhtm } from '../../bible_quest/code/bq_bible_mgr.js';
import { get_strocode_verses, } from './sf_strong_mgr.js';
import { init_lang, } from './sf_lang_mgr.js';


/*
id_search
id_old_test
id_new_test
id_version
id_select
id_find
*/

export let gvar = {};


const old_crit_txt = {
	"1": "WM Leningrad Codex (WLC)",
	"2": "Aleppo (ALE)",
	"3": "Tanakh (TKH)",
	"4": "Septuagint (LXX)",
};

const new_crit_txt = {
	"1": "Byzantine Text (BYZ)",
	"2": "Textus Receptus Text (TR)",
	"3": "Wescott and Hort Text (WH)",
	"4": "Nestle 1904 Text (NES)",
};

const bib_version = {
	"1": "Reina-Valera 1909 (RVA)",
	"2": "King James Bible (KJB)",
	"3": "Sagrada Biblia Libre Mundial (SBLM)",
	"4": "World Estandard Bible (WEB)",
	"5": "Critical Text (CRI)",
};


export async function start_srch_mgr(curr_lang){
	init_lang(curr_lang);

	const dv_old_tes = document.getElementById("id_old_test");
	const oldt = dv_old_tes.innerHTML.trim();
	const dv_new_tes = document.getElementById("id_new_test");
	const newt = dv_new_tes.innerHTML.trim();
	const dv_version = document.getElementById("id_version");
	const bib = dv_version.innerHTML.trim();
	const dv_select = document.getElementById("id_select");
	/*get_bib_verse("SBLM", "revelation", 21, 10).then((resp) => {
		dv_select.innerHTML = resp;
	});*/
	console.log("oldt=" + oldt);
	console.log("newt=" + newt);
	console.log("bib=" + bib);
	get_strocode_verses(oldt, "H_4083").then((resp) => {
		const all_v = JSON.stringify(resp, null, "  ");
		dv_select.innerHTML = all_v;
		fill_verses(bib, resp);
	});

}

function fill_verses(bib_cod, all_found){
	const dv_verses = document.getElementById("id_verses");
	const all_vrs = Object.keys(all_found);
	let ii = 0;
	for(ii = 0; ii < all_vrs.length; ii++){
		const cod_ver = all_vrs[ii].split(':');
		const id_ver = cod_ver.join('_');
		const dv_ver = document.createElement("div");
		dv_ver.id = id_ver;
		dv_ver.innerHTML = id_ver;
		dv_verses.appendChild(dv_ver);
		
		const bibobj = {};
		bibobj.bible = bib_cod;
		bibobj.book = cod_ver[0];
		bibobj.chapter = cod_ver[1];
		bibobj.verse = cod_ver[2];
		
		bibobj_to_bibhtm(bibobj, id_ver, gvar.book_names).then((vs_txt) => {
			dv_ver.innerHTML = vs_txt;
		});
	}
}

