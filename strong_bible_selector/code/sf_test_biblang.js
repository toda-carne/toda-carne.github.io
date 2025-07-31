
import * as filesys from "fs";

import { init_biblang, eval_biblang_command, } from './sf_biblang_mgr.js'
import { gvar, } from './sf_search_mgr.js';
import { init_lang, num2book_en, } from './sf_lang_mgr.js';
import { diffSequence } from './sf_diff_sequence.js';
import { distance, closest,  } from './sf_word_dist.js';

import { get_bible_verse, find_ana, get_text_analysis, } from './sf_bible_mgr.js';

function file_exists(nm_file){
	console.log("calling file_exists with " + nm_file);
	filesys.access(nm_file, filesys.constants.F_OK, (err) => {
		if(err){
			console.log(nm_file + " NO existe");
		} else {
			console.log(nm_file + " EXISTE");
		}
	});
}

async function main_selector(){
	if (process.argv.length < 3) {
		console.log('Usage: node ' + process.argv[1] + ' <command>');
		process.exit(1);
	}
	
	const command = process.argv[2];
	
	/*
	const n2b = num2book_en;
	const vii = command.split(":");
	const bib = "SBLMi";
	const book = Number(vii[0]);
	const chapter = Number(vii[1]);
	const verse = Number(vii[2]);
	console.log("TRYING get_bible_verse(" + bib + ", " + n2b[book] + ", " + chapter + ", " + verse + ")");
	const vtxt = await get_bible_verse(bib, n2b[book], chapter, verse);
	console.log(vtxt);
	*/
	
	gvar.dbg_biblang = true;

	init_lang('es');
	init_biblang('es');
	
	const robj = await eval_biblang_command(command);
	
	console.log("TEST_RESULT");
	//console.log(robj.lverses);	
}

//main_selector();

/*
const arr1 = [0,1,2,3,4,5,6];
arr1.splice(3, 1, 'A', 'B');
console.log(arr1);

const vr = "brewit:34955 bre:22811 elhim:27486 et:1 hwmim:55270 vet:2281 herz:54788";
const loc = vr.split(" ");

const ana = loc.map((tok) => { 
	const arr = tok.split(":");
	return { id: arr[0], idtra: arr[1], };
});

console.log(ana);
*/

async function main_diff_bib(){
	if (process.argv.length < 3) {
		console.log('Usage: node ' + process.argv[1] + ' "book:chapter:verse"');
		process.exit(1);
	}

	const vr1 = process.argv[2];

	init_lang('es');
	init_biblang('es');

	const n2b = gvar.num2book_en;
	
	const avr = vr1.split(":");
	const book = avr[0];
	const chapter = avr[1];
	const verse = avr[2];

	let bib = "WLC";
	let lpref = "HEB";
	if(book > 39){
		lpref = "GRE";
		bib = "BYZ";
	}
	const lbib = lpref + "_LOC";
	
	console.log("" + bib + ":" + lbib + ":" + book + ":" + chapter + ":" + verse);
	
	const ana = await get_text_analysis(bib, n2b[book], chapter, verse);
	
	console.log(JSON.stringify(ana, null, " "));
	
}

function find_lcs(s1, s2){
	const rr = [];
	diffSequence(
		s1.length,
		s2.length,
		(idx1, idx2) => Object.is(s1[idx1], s2[idx2]),
		(n_comm, idx1, idx2) => {
			for (; n_comm > 0; n_comm -= 1, idx1 += 1) {
				rr.push(s1[idx1]);
			}
		},
	);
	return rr;
}

main_diff_bib();

async function main_distance(){
	if (process.argv.length < 4) {
		console.log('Usage: node ' + process.argv[1] + ' <wrd1> <wrd2> [<wrd3> <wrd4> <wrd5> ...]');
		process.exit(1);
	}

	const wd1 = process.argv[2];
	const wd2 = process.argv[3];
	const rest = process.argv.slice(3);
	
	const dd = distance(wd1, wd2);

	console.log("distance(" + wd1 + "," + wd2 + ")");
	console.log(dd);

	const cc = closest(wd1, rest);
	
	console.log("closest(" + wd1 + "," + JSON.stringify(rest, null, null) + ")");
	console.log(cc);
	
}

//main_distance();

