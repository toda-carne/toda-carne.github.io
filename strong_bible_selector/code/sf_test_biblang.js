

import { init_biblang, eval_biblang_command, } from './sf_biblang_mgr.js'
import { gvar, } from './sf_search_mgr.js';
import { init_lang, } from './sf_lang_mgr.js';
import { diffSequence } from './sf_diff_sequence.js';
import { distance, closest,  } from './sf_word_dist.js';

import { get_bible_verse, find_ana, get_text_analysis, } from './sf_bible_mgr.js';

async function main_selector(){
	if (process.argv.length < 3) {
		console.log('Usage: node ' + process.argv[1] + ' <command>');
		process.exit(1);
	}

	const command = process.argv[2];
	
	gvar.dbg_biblang = true;

	init_lang('es');
	init_biblang('es');
	
	const sorvers = await eval_biblang_command(command);
	
	console.log("FINAL_RESULT");
	console.log(sorvers);	
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
		console.log('Usage: node ' + process.argv[1] + ' <verse1>');
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
	
	/*
	const asc = await get_bible_verse(bib, n2b[book], chapter, verse);
	const loc = await get_bible_verse(lbib, n2b[book], chapter, verse);

	console.log(asc);
	console.log(loc);

	const vasc = asc.split(" ");
	const vtmp = loc.split(" ");
	
	const ana = vtmp.map((tok) => { 
		const arr = tok.split(":");
		return { id: arr[0], idtra: arr[1], };
	});
	
	const vloc = vtmp.map((tok) => { 
		const arr = tok.split(":");
		return arr[0];
	});

	console.log("vasc");
	console.log(vasc);
	console.log("vloc");
	console.log(vloc);
	
	const comm = find_ana(vasc, vloc, ana);
	console.log(comm);
	*/
	console.log(JSON.stringify(ana, null, " "));
	
}

	//const comm = find_lcs(vasc, vloc);
	//console.log(comm);
	
	//console.log(JSON.stringify(ana, null, " "));

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

