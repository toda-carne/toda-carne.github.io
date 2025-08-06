
import * as filesys from "fs";

import { init_biblang, eval_biblang_command, get_txt_matches, verse_disp, range_to_intervals, 
	conf_to_mini, mini_to_conf, encode_mini, decode_mini, 
} from './sf_biblang_mgr.js'
import { gvar, } from './sf_search_mgr.js';
import { init_lang, num2book_en, } from './sf_lang_mgr.js';
import { diffSequence } from './sf_diff_sequence.js';
import { distance, closest,  } from './sf_word_dist.js';

import { get_bible_verse, find_ana, get_text_analysis, calc_prev_scode, calc_next_scode, 
	get_next_scode, get_prev_scode, 
} from './sf_bible_mgr.js';


const OT_bibs = {
	"WLC":1,
	"ALE":1,
	"TKH":1,
	"LXX":1,		// CAREFUL. if you change this, then also file "LXX" occurences.
};

const NT_bibs = {
	"BYZ":1,
	"TR":1,
	"WH":1,
	"NES":1,
};


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
	
	gvar.dbg_biblang = true;

	init_lang('es');
	init_biblang('es');
	
	const robj = await eval_biblang_command(command);
	
	
	const his = gvar.biblang.history;
	if((his != null) && (his.length > 0)){
		console.log("LAST_HISTO");
		const last = his[his.length - 1];
		/*
		const conf = JSON.stringify(last.conf);
		console.log(conf);
		console.log(last.expr);
		*/
		
		console.log(last.conf);
		const mm = conf_to_mini(last.conf);
		const cc = mini_to_conf(mm);
		console.log(mm);
		console.log(cc);

		const mm2 = encode_mini(mm);
		const cc2 = decode_mini(mm2);
		console.log(mm2);
		console.log(cc2);
		
		const enc_conf = encodeURIComponent(mm2);
		const enc_expr = encodeURIComponent(last.expr);
		console.log(enc_conf);
		console.log(enc_expr);
		
	}
	
	//console.log(robj.lverses);	
}

async function main_diff_bib(){
	const num_arg = process.argv.length;
	if(num_arg < 3) {
		console.log('Usage: node ' + process.argv[1] + ' "book:chapter:verse" <cri>');
		process.exit(1);
	}

	const vr1 = process.argv[2];
	let pm2 = "";
	if(num_arg >= 4){
		pm2 = process.argv[3];
	}

	init_lang('es');
	init_biblang('es');

	const n2b = gvar.num2book_en;
	
	const avr = vr1.split(":");
	const book = avr[0];
	const chapter = avr[1];
	const verse = avr[2];

	let bib = "WLC";
	let lpref = "HEB";
	if(OT_bibs[pm2] != null){
		bib = pm2;
	}
	if(book > 39){
		lpref = "GRE";
		bib = "BYZ";
		if(NT_bibs[pm2] != null){
			bib = pm2;
		}
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

async function main_test_scode_next_and_prev(){
	const num_arg = process.argv.length;
	if(num_arg < 3) {
		console.log('Usage: node ' + process.argv[1] + ' "book:chapter:verse" <cri>');
		process.exit(1);
	}

	const scod = process.argv[2];
	const prv = await get_prev_scode(scod);
	const nxt = await get_next_scode(scod);
	console.log(prv);
	console.log(nxt);
}

function main_test_inc_dec(){
	const num_arg = process.argv.length;
	if(num_arg < 4) {
		console.log('Usage: node ' + process.argv[1] + ' "book:chapter:verse" disp');
		process.exit(1);
	}

	gvar.dbg_biblang = true;

	init_lang('es');
	init_biblang('es');
	
	const verse = process.argv[2];
	const disp = Number(process.argv[3]);
	
	const vr = verse.split(":");
	const prv = verse_disp(vr, -disp);
	const nxt = verse_disp(vr, disp);
	console.log(prv);
	console.log(nxt);
}

async function main_test_matches(){
	const num_arg = process.argv.length;
	if(num_arg < 2) {
		console.log('Usage: node ' + process.argv[1] + ' "book:chapter:verse" <cri>');
		process.exit(1);
	}

	//const scod = process.argv[2];
	
	const vtxt = `Y habló Caín á su hermano Abel: y aconteció que estando ellos en el campo, Caín se levantó contra su hermano Abel, y le mató.`;
	console.log(vtxt);
	
	let mm = get_txt_matches(vtxt, /herm/gi);
	console.log(mm);
	mm = get_txt_matches(vtxt, /mano/gi);
	console.log(mm);
}



main_selector();
//main_diff_bib();
//main_distance();
//main_test_scode_next_and_prev();
//main_test_matches();
//main_test_inc_dec();