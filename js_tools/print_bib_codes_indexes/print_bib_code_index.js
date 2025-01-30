
const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' <file_name> (S|W|A)');
	process.exit(1);
}

const file_nm = process.argv[2];
let code_kind = "code";
if(process.argv.length > 3){
	const kk = process.argv[3];
	if(kk == "S"){
		code_kind = "strong_code";
	} else if(kk == "W"){
		code_kind = "word_code";
	} else if(kk == "A"){
		code_kind = "ascii_code";
	}
}

function create_path(the_path) {
	if (!fs.existsSync(the_path)){
		fs.mkdirSync(the_path, { recursive: true });
	}	
}

const INVALID_CODE = "INVALID_CODE";

async function read_file_by_lines(file_nm) {
	const f_stm = fs.createReadStream(file_nm);
	
	const rl = readline.createInterface({
		input: f_stm,
		crlfDelay: Infinity
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	let curr_code = INVALID_CODE;
	let full_code = {};
	//for await (const line of rl) {
	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		const by_vs = line.split('|');
		const vs_code = by_vs[0];
		const vs_book = by_vs[1];
		const vs_chapter = by_vs[2];
		const vs_verse = by_vs[3];
		
		const set_nw = (vs_code != curr_code);
		if(set_nw){
			write_code(curr_code, full_code);
			curr_code = vs_code;
			full_code = {};
		}
		
		const vs_id = "" + vs_book + "|" + vs_chapter + "|" + vs_verse;
		
		full_code[vs_id] = 1;
	}
	
	write_code(curr_code, full_code);
}

function write_code(curr_code, full_code){
	if(curr_code == INVALID_CODE){ return; }
	
	const all_verses = JSON.stringify(full_code, null, "  ");
	
	const pth = "./" + code_kind;
	
	create_path(pth);
	
	const file_nm = pth + "/" + curr_code + ".mjs";
	
	const file_str = `
	
export const code_kind = "${code_kind}";
export const code = "${curr_code}";
export const verses = ${all_verses};
	
`;

	fs.writeFileSync(file_nm, file_str);
	console.log("WROTE FILE=" + file_nm);
	//console.log("FILE=" + file_str);
	//fs.appendFile(file_nm, 'export const ', (err) => { if(err){ console.log(err); } });
	
}

read_file_by_lines(file_nm);

