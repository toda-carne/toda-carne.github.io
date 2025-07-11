
const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' <file_name> [<version>]');
	process.exit(1);
}

const file_nm = process.argv[2];
let bib_version = "bib";
if(process.argv.length > 3){
    bib_version = process.argv[3];
}

const max_verses = 4500;
const js_ext = ".js";

function create_path(the_path) {
	if (!fs.existsSync(the_path)){
		fs.mkdirSync(the_path, { recursive: true });
	}	
}

async function read_file_by_lines(file_nm) {
	const f_stm = fs.createReadStream(file_nm);
	
	const rl = readline.createInterface({
		input: f_stm,
		crlfDelay: Infinity
	});
	// Note: we use the crlfDelay option to recognize all instances of CR LF
	// ('\r\n') in input.txt as a single line break.

	const full_idx = {};
	
	let curr_scode = null;
	let full_scode = {};
	let num_chap_verses = 0;
	let file_cnt = 0;
	let full_file = {};
	let num_file_verses = 0;
	//for await (const line of rl) {
	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		const by_vs = line.split('|');
		const stcod = by_vs[0];
		const vid = by_vs[1];
		
		if(curr_scode == null){ curr_scode = stcod; }

		const set_nw = (stcod != curr_scode);
		if(set_nw){
			const stc_vs = Object.keys(full_scode);
			const sum1 = (num_file_verses + stc_vs.length);
			const is_fl_full = (sum1 > max_verses);
			if(is_fl_full){
				const hlf_chp = (stc_vs.length / 2);
				const is_chp_in_fl = (sum1 < (max_verses + hlf_chp));
				if(is_chp_in_fl){
					add_to_file(full_file, curr_scode, full_scode);
					add_to_idx(full_idx, curr_scode, file_cnt);
					num_file_verses = num_file_verses + num_chap_verses;
					full_scode = null;
				}
				write_file(file_cnt, full_file);
				file_cnt++;
				num_file_verses = 0;
				full_file = {};
			}
			
			if(full_scode != null){ 
				add_to_file(full_file, curr_scode, full_scode);
				add_to_idx(full_idx, curr_scode, file_cnt);
				num_file_verses = num_file_verses + num_chap_verses;
			}
			
			curr_scode = stcod;
			
			full_scode = {};
			num_chap_verses = 0;
		}
		
		full_scode[vid] = 1;
		num_chap_verses++;
	}
	
	add_to_file(full_file, curr_scode, full_scode);
	add_to_idx(full_idx, curr_scode, file_cnt);
	
	write_file(file_cnt, full_file);
	write_index(full_idx);
}

function add_to_file(full_file, curr_scode, full_scode){
	full_file[curr_scode] = full_scode;
}

function add_to_idx(full_idx, curr_scode, file_cnt){
	full_idx[curr_scode] = file_cnt;
}

function write_file(file_cnt, full_file){
	const all_verses = JSON.stringify(full_file, null, "  ");
	const pth = "./" + bib_version;
	
	create_path(pth);

	const f_nam = pth + "/" + get_codsfile_name(file_cnt);
	
	const file_str = `
	
export const scode_verses = ${all_verses};

`;

	fs.writeFileSync(f_nam, file_str);
	console.log("WROTE FILE=" + f_nam);
}

function write_index(full_idx){
	const the_idx = JSON.stringify(full_idx, null, "  ");
	const pth = "./" + bib_version;
	
	create_path(pth);

	const f_nam = pth + "/index_of_" + bib_version + js_ext;
	
	const file_str = `

export function get_${bib_version}_codsfile_name(file_cnt){
	const nm = "scodes_part_" + file_cnt + js_ext;
	return nm;
}
	
export const bib_version = "${bib_version}";
export const bib_index = ${the_idx};

`;

	fs.writeFileSync(f_nam, file_str);
	console.log("WROTE FILE=" + f_nam);
}

function get_codsfile_name(file_cnt){
	const nm = "scodes_part_" + file_cnt + js_ext;
	return nm;
}

read_file_by_lines(file_nm);


/*
function the_main_prg(file_nm) {
	read_file_by_lines(file_nm).then(
		(result) => { console.log("TERMINE !!");}
	);
}

function resolveAfter(how_long, nom_func) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('resolved ' + nom_func);
		}, how_long);
	});
}

async function func1() {
	console.log('calling func1');
	const result = await resolveAfter(2000, "func1");
	console.log(result);
	// Expected output: "resolved"
}

async function func2() {
	console.log('calling func2');
	const result = await resolveAfter(5000, "func2");
	console.log(result);
	// Expected output: "resolved"
}

async function func3() {
	console.log('calling func3');
	await func2();
	await func1();
}

func2();
func1();
*/

//func3();

//the_main_prg(file_nm);

/*
 * 
 * function write_file(){
 *	fs.writeFile("./test1", "HLA JOSE 1", function(err) {
 *		if(err) {
 *			return console.log(err);
 *		}
 *		console.log("The file was saved!");
 *	}); 
 *	
 *	// Or
 *	fs.writeFileSync('./test2', 'JOSE LUIS 2');
 * }
 * 
 * console.log("version=" + bib_version);
 * console.log("chapter=" + curr_scode);
 * console.log(JSON.stringify(full_scode, null, "  "));
 */

/*


function init_exam_fb(){
	const mod_nm = "./tc_firebase.js";
	import(mod_nm)
	.then((module) => {
		if(module != null) { fb_mod = module; }
		
		if(fb_mod != null){ 
			fb_mod.firebase_check_user((user) => {
				fill_div_user();
			}); 
		}
	})
	.catch((err) => {
		console.log("Could NOT import '${mod_nm}' err:" + err.message);
	});
}

const all_answ = Object.entries(quest.answers);
for (const [anid, an_answ] of all_answ) {
for(const qid of all_qids){


*/