
//const cheerio = require('cheerio');

// BEFORE RUNNING THIS. Create a link to global cheerio using:
// npm link cheerio

//import * as cheerio from "cheerio";
import * as filesys from "node:fs";
//import * as path from 'node:path';
import * as readline from 'node:readline';


async function proc_file(){
	if (process.argv.length < 4) {
		console.log('Usage: node ' + process.argv[1] + ' <ifile_name> <ofilename>');
		process.exit(1);
	}

	//const lngu = process.argv[2];
	const fnam = process.argv[2];
	const f_out_nm = process.argv[3];

	const f_stm = filesys.createReadStream(fnam);
	const rl = readline.createInterface({
		input: f_stm,
		crlfDelay: Infinity
	});
	
	/*if((lngu != 'es') && (lngu != 'en')){
		console.log('Usage: node ' + process.argv[1] + ' (es|en) <ifile_name> <ofilename>');
		process.exit(1);
	}*/

	const id1 = 'footnotes';

	const wstm = filesys.createWriteStream(f_out_nm);

	let skipping = false;
	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		let matches = null;
		let rest = null;

		if(line.includes(`id="${id1}"`)){
			console.log("FOUNS INI=" + line);
			if(! skipping){
				skipping = true;
			}
		}
		
		if(! skipping){
			wstm.write(line + "\n");
		} 
	}
		
	
	//const ph = cheerio.load(html, {decodeEntities:false, xmlMode:false, }, false);
	//ph(id1).nextUntil(id2).remove();

	wstm.end();
	console.log("WROTE FILE=" + f_out_nm);
}

await proc_file();

