
//const cheerio = require('cheerio');

// BEFORE RUNNING THIS. Create a link to global cheerio using:
// npm link cheerio

import * as cheerio from "cheerio";
import * as filesys from "node:fs";
import { gvar, get_last_href, fill_verses, verse_cod2obj, fill_strong_parts, } from './code/sf_search_mgr.js';
import { init_biblang, eval_biblang_command, parse_citation, 
} from './code/sf_biblang_mgr.js'
import { init_lang, } from './code/sf_lang_mgr.js';


async function proc_file(){
	if (process.argv.length < 5) {
		console.log('Usage: node ' + process.argv[1] + ' (es|en) <ifile_name> <ofilename>');
		process.exit(1);
	}

	// https://biblehub.com/hebrew/8251.htm
	const rx_bhebref = /biblehub.com\/hebrew\/([^.]*).htm/;
	const rx_bgreref = /biblehub.com\/greek\/([^.]*).htm/;
	const rx_btxtref = /biblehub.com\/text\/([^/]*)\/(\d+)-(\d+).htm/;
	const rx_bref = /\?search=([^&]*)\&/;

	const lngu = process.argv[2];
	const file_nm = process.argv[3];
	const f_out_nm = process.argv[4];
	
	if((lngu != 'es') && (lngu != 'en')){
		console.log('Usage: node ' + process.argv[1] + ' (es|en) <ifile_name> <ofilename>');
		process.exit(1);
	}
	
	let pref = "Ver en ";
	if(lngu == 'en'){
		pref = "See in ";
	}

	init_lang(lngu);
	init_biblang(lngu);
	
	gvar.biblang.curr_OT = "WLC";
	gvar.biblang.curr_NT = "BYZ";	
	
	const html = filesys.readFileSync(file_nm, 'utf8');
	//const wrt = filesys.createWriteStream(f_out_nm);
	//	wrt.write(line + '\n');

	const ph = cheerio.load(html, {decodeEntities:false, xmlMode:false, }, false);

	//const REF = ph('a[href]').map((ii, el) => ph(el).attr('href')).get();

	//const ref2 = REF.map((rf) => decodeURIComponent(rf));

	let all_hrf = [];
	ph('a[href]').each((ii, el) => {
		const oo = decodeURIComponent(ph(el).attr('href'));
		if(! oo.startsWith("#")){			
			all_hrf.push(el);
		}
	});
	//console.log(all_hrf);
	
	let ii = 0;
	for(ii = 0; ii < all_hrf.length; ii++){	
		const el = all_hrf[ii];
		const oo = decodeURIComponent(ph(el).attr('href'));
		if(oo.startsWith("#")){
			continue;
		}
		
		let LOC = "SBLM";
		if(lngu == 'en'){ LOC = "WEB"; }
		
		let brf = null;
		let matches = null;
		
		matches = oo.match(rx_bhebref);
		if(matches){
			brf = matches[1];
			brf = "H" + brf;
			LOC = "RVAs";
			if(lngu == 'en'){ LOC = "KJVs"; }
		}
		
		matches = oo.match(rx_bgreref);
		if(matches){
			brf = matches[1];
			brf = "G" + brf;
			LOC = "RVAs";
			if(lngu == 'en'){ LOC = "KJVs"; }
		}
		
		matches = oo.match(rx_btxtref);
		if(matches){
			const book = matches[1];
			const chapter = matches[2];
			const verse = matches[3];
			brf = ".txta ; " + book + "." + chapter + ":" + verse;
		}
		
		//console.log(oo);
		matches = oo.match(rx_bref);
		if(matches){
			brf = matches[1];
			brf = brf.replaceAll("+", " ");
			brf = brf.trim();
			brf = brf.replaceAll(" ", ".");
			if(brf.charAt(1) === '.'){
				brf = brf.substring(0, 1) + brf.substring(2);
			}
			//console.log("FOUND_BIREF=" + brf);
			const is_cit = parse_citation(brf);
			if(! is_cit){
				console.error(oo);
				console.error("############################################################################ ERROR CON cit=" + brf);
				brf = null;
			} 
		}
		
		if(brf != null){
			gvar.biblang.curr_LOC = LOC;
			const bl_obj = await eval_biblang_command(brf);
			const url_serv = "https://SeBiblia.github.io/es/tool.html";
			//const url_serv = "http://localhost/JOSE/sebiblia.github.io/es/tool.html";
			const hrf = get_last_href(url_serv);
			if(hrf != null){
				//console.log(hrf);
				const nn = ph(`${pref}[<a>SeBiblia.github.io</a>] `).attr('href', hrf);
				ph(el).before(nn);				
			}
		}		
	}
	
	const out_htm = ph.html({decodeEntities:false});
	//console.log(out_htm);

	filesys.writeFileSync(f_out_nm, out_htm, 'utf8');
	console.log("WROTE FILE=" + f_out_nm);
	//console.log(ph.html());
}

await proc_file();

