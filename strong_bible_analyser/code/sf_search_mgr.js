

import { get_bib_verse, bib_obj_to_txt } from '../../bible_quest/code/bq_bible_mgr.js';
import { get_strocode_verses, } from './sf_strong_mgr.js';

/*
const book_names = {
	"1":"genesis",
	"2":"exodus",
	"3":"leviticus",
	"4":"numbers",
	"5":"deuteronomy",
	"6":"joshua",
	"7":"judges",
	"8":"ruth",
	"9":"1_samuel",
	"10":"2_samuel",
	"11":"1_kings",
	"12":"2_kings",
	"13":"1_chronicles",
	"14":"2_chronicles",
	"15":"ezra",
	"16":"nehemiah",
	"17":"esther",
	"18":"job",
	"19":"psalms",
	"20":"proverbs",
	"21":"ecclesiastes",
	"22":"songs",
	"23":"isaiah",
	"24":"jeremiah",
	"25":"lamentations",
	"26":"ezekiel",
	"27":"daniel",
	"28":"hosea",
	"29":"joel",
	"30":"amos",
	"31":"obadiah",
	"32":"jonah",
	"33":"micah",
	"34":"nahum",
	"35":"habakkuk",
	"36":"zephaniah",
	"37":"haggai",
	"38":"zechariah",
	"39":"malachi",
	"40":"matthew",
	"41":"mark",
	"42":"luke",
	"43":"john",
	"44":"acts",
	"45":"romans",
	"46":"1_corinthians",
	"47":"2_corinthians",
	"48":"galatians",
	"49":"ephesians",
	"50":"philippians",
	"51":"colossians",
	"52":"1_thessalonians",
	"53":"2_thessalonians",
	"54":"1_timothy",
	"55":"2_timothy",
	"56":"titus",
	"57":"philemon",
	"58":"hebrews",
	"59":"james",
	"60":"1_peter",
	"61":"2_peter",
	"62":"1_john",
	"63":"2_john",
	"64":"3_john",
	"65":"jude",
	"66":"revelation",
};
*/

/*
id_search
id_old_test
id_new_test
id_version
id_select
id_find
*/

export let gvar = {};


export async function start_srch_mgr(curr_lang){
	const dv_version = document.getElementById("id_version");
	dv_version.innerHTML = "LA VERSION";

	const dv_select = document.getElementById("id_select");
	/*get_bib_verse("SBLM", "revelation", 21, 10).then((resp) => {
		dv_select.innerHTML = resp;
	});*/
	get_strocode_verses("WLC", "H_4083").then((resp) => {
		const all_v = JSON.stringify(resp, null, "  ");
		dv_select.innerHTML = all_v;
		fill_verses("SBLM", resp);
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
		
		bib_obj_to_txt(bibobj, id_ver).then((vs_txt) => {
			dv_ver.innerHTML = vs_txt;
		});
	}
}