
//const cheerio = require('cheerio');

// BEFORE RUNNING THIS. Create a link to global cheerio using:
// npm link cheerio

import * as filesys from "node:fs";
import * as readline from 'node:readline';


async function proc_file(){
	if (process.argv.length < 6) {
		console.log('Usage: node ' + process.argv[1] + ' (es|en) <ifile_name> <ofnam_content> <ofnam_footnotes>');
		process.exit(1);
	}

	const lngu = process.argv[2];
	const fnam = process.argv[3];
	const f_out_nm1 = process.argv[4];
	const f_out_nm2 = process.argv[5];

	if((lngu != 'es') && (lngu != 'en')){
		console.log('Usage: node ' + process.argv[1] + ' (es|en) <ifile_name> <ofnam_content> <ofnam_footnotes>');
		process.exit(1);
	}

	const f_stm = filesys.createReadStream(fnam);
	const rl = readline.createInterface({
		input: f_stm,
		crlfDelay: Infinity
	});
		
	const id1 = 'todacarne.com';
	let id2 = 'tabla-de-contenido.';
	let rev = "Revisión número:";
	if(lngu == 'en'){
		id2 = 'table-of-contents.';
		rev = "Revision number:";
	}	
	const id3 = 'footnotes';

	//const rx1 = /<[^>]*id\s*=([^>]*)>/;
	const wstm1 = filesys.createWriteStream(f_out_nm1);
	const wstm2 = filesys.createWriteStream(f_out_nm2);

	let start_skipping = false;
	let skipping = false;
	let in_footnotes = false;
	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		let matches = null;

		if(line.includes(`id="${id1}"`)){
			console.log("FOUND INI=" + line);
			if(! start_skipping){
				start_skipping = true;
			}
		}

		if(line.includes(`id="${id2}"`)){
			console.log("FOUND END=" + line);
			skipping = false;
		}
				
		if(line.includes(`id="${id3}"`)){
			console.log("FOUND FOOTNOTES=" + line);
			if(! skipping){
				skipping = true;
				in_footnotes = true;
			}
		}
						
		if(! skipping){
			wstm1.write(line + "\n");
		} else {
			if(line.includes(rev)){
				wstm1.write(line + "\n");
			} else if(in_footnotes){
				wstm2.write(line + "\n");
			}
		}
		if(start_skipping){
			skipping = true;
			start_skipping = false;
		}
	}
		
	wstm1.end();
	wstm2.end();
	console.log("WROTE FILE=" + f_out_nm1);
	console.log("WROTE FILE=" + f_out_nm2);
}

await proc_file();

