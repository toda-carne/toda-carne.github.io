
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
	
	const rx_bakref = /fnref(\d*)/;

	const lngu = process.argv[2];
	const file_nm = process.argv[3];
	const f_out_nm = process.argv[4];
	
	if((lngu != 'es') && (lngu != 'en')){
		console.log('Usage: node ' + process.argv[1] + ' (es|en) <ifile_name> <ofilename>');
		process.exit(1);
	}

	init_lang(lngu);
	init_biblang(lngu);
	
	gvar.biblang.curr_OT = "WLC";
	gvar.biblang.curr_NT = "BYZ";	
	
	const html = filesys.readFileSync(file_nm, 'utf8');
	const wstm = filesys.createWriteStream(f_out_nm);
	// wstm.end();

	const ph = cheerio.load(html, {decodeEntities:false, xmlMode:false, }, false);

	//const REF = ph('a[href]').map((ii, el) => ph(el).attr('href')).get();

	//const ref2 = REF.map((rf) => decodeURIComponent(rf));

	let all_href = [];
	ph('li').each((ii, el) => {
		const hrefs = ph(el).find('a').map((ii, lnk) => {
			return ph(lnk).attr('href');
		}).get();
		all_href.push(hrefs);
	});
	//console.log(all_href);

	let the_obj = {};
	
	let ii = 0;
	for(ii = 0; ii < all_href.length; ii++){	
		const hrefs = all_href[ii];
		
		if(hrefs.length < 2){
			continue;
		}
		
		const rf1 = hrefs[0];
		const rf2 = hrefs[hrefs.length - 1];
		
		if(! rf2.startsWith("#")){
			console.log("NO BAK_REF IN");
			console.log(hrefs);
			continue;
		}
		
		const oo = decodeURIComponent(rf1);
		if(oo.startsWith("#")){
			console.log("FIRST_REF_IS BAK_REF IN");
			console.log(hrefs);
			continue;
		}
		
		let LOC = "SBLM";
		if(lngu == 'en'){ LOC = "WEB"; }
		
		let brf = null;
		let matches = null;
		let cit = null;
		
		matches = oo.match(rx_btxtref);
		if(matches){
			const book = matches[1];
			const chapter = matches[2];
			const verse = matches[3];
			brf = book + "." + chapter + ":" + verse;
			cit = parse_citation(brf);
			if(! cit){
				console.error(oo);
				console.error("############################################################################ ERROR CON cit=" + brf);
				brf = null;
			} 
		}
		
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
			cit = parse_citation(brf);
			if(! cit){
				console.error(oo);
				console.error("############################################################################ ERROR CON cit=" + brf);
				brf = null;
			} 
		}
		
		if(cit){
			if(cit.length == 0){
				continue;
			}
			const fst = cit[0];
			const vr = fst.split(':');
			const book = Number(vr[0]);
			const chapter = Number(vr[1]);
			//console.log("FOUND_REF");
			//console.log(brf);
			if(the_obj[book] == null){ the_obj[book] = {}; }
			if(the_obj[book][chapter] == null){ the_obj[book][chapter] = []; }
			the_obj[book][chapter].push(rf2);
		}		
	}
	
	let title_refs = "Indice Bíblico";
	if(lngu == 'en'){
		title_refs = "Biblical Index";
	}
	
	wstm.write(`<h1>${title_refs}</h1>\n`);
	const all_books = Object.keys(the_obj).sort((aa, bb) => Number(aa) - Number(bb));
	for(ii = 0; ii < all_books.length; ii++){
		const book = Number(all_books[ii]);
		const obj_book = the_obj[book];
		const all_chapters = Object.keys(obj_book).sort((aa, bb) => Number(aa) - Number(bb));
		let jj = 0;
		for(jj = 0; jj < all_chapters.length; jj++){
			const chapter = Number(all_chapters[jj]);
			const obj_chapter = the_obj[book][chapter];
			const tit_refs = gvar.num2book[book] + "." + chapter;
			//console.log(tit_refs +" ---------");
			//console.log(obj_chapter);

			wstm.write(`<li>${tit_refs} \n`);
			let kk = 0;
			for(kk = 0; kk < obj_chapter.length; kk++){
				const ref = obj_chapter[kk];
				let nref = kk;
				const mmref = ref.match(rx_bakref);
				if(mmref){
					nref = Number(mmref[1]);
				}
				const line = ` <a href="${ref}" class="footnote-back" role="doc-backlink">${nref}</a>`;
				wstm.write(line + '\n');
			}
			wstm.write(`</li>\n`);
		}
	}

	wstm.end();
	//filesys.writeFileSync(f_out_nm, out_htm, 'utf8');
	console.log("WROTE FILE=" + f_out_nm);
}

await proc_file();

