
const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' <file_name>');
	process.exit(1);
}

const file_nm = process.argv[2];
let bib_version = "bib";

async function read_file_by_lines(file_nm) {
	const f_stm = fs.createReadStream(file_nm);
	
	const rl = readline.createInterface({
		input: f_stm,
		crlfDelay: Infinity
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		const lw = line.toLowerCase();
		console.log(lw);
	}
	
}

read_file_by_lines(file_nm);

