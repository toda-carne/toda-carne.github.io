
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

const max_verses = 500;
const js_ext = ".js";

const book_names = {
	"1":"genesis",
	"2":"exodus",
	"3":"leviticus",
	"4":"numbers",
	"5":"deuteronomy",
	"6":"joshua",
	"7":"judges",
	"8":"ruth",
	"9":"1_samuel",
	"10":"2_samuel",
	"11":"1_kings",
	"12":"2_kings",
	"13":"1_chronicles",
	"14":"2_chronicles",
	"15":"ezra",
	"16":"nehemiah",
	"17":"esther",
	"18":"job",
	"19":"psalms",
	"20":"proverbs",
	"21":"ecclesiastes",
	"22":"songs",
	"23":"isaiah",
	"24":"jeremiah",
	"25":"lamentations",
	"26":"ezekiel",
	"27":"daniel",
	"28":"hosea",
	"29":"joel",
	"30":"amos",
	"31":"obadiah",
	"32":"jonah",
	"33":"micah",
	"34":"nahum",
	"35":"habakkuk",
	"36":"zephaniah",
	"37":"haggai",
	"38":"zechariah",
	"39":"malachi",
	"40":"matthew",
	"41":"mark",
	"42":"luke",
	"43":"john",
	"44":"acts",
	"45":"romans",
	"46":"1_corinthians",
	"47":"2_corinthians",
	"48":"galatians",
	"49":"ephesians",
	"50":"philippians",
	"51":"colossians",
	"52":"1_thessalonians",
	"53":"2_thessalonians",
	"54":"1_timothy",
	"55":"2_timothy",
	"56":"titus",
	"57":"philemon",
	"58":"hebrews",
	"59":"james",
	"60":"1_peter",
	"61":"2_peter",
	"62":"1_john",
	"63":"2_john",
	"64":"3_john",
	"65":"jude",
	"66":"revelation",
};

const dir = './tmp/but/then/nested';

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
	
	let curr_book = 1;
	let curr_chapter = 1;
	let full_chapter = {};
	let num_chap_verses = 0;
	let file_cnt = 0;
	let full_file = {};
	let num_file_verses = 0;
	//for await (const line of rl) {
	for await (const line of rl) {
		// Each line in input.txt will be successively available here as `line`.
		const by_vs = line.split('|');
		const vs_book = by_vs[0];
		const vs_chapter = by_vs[1];
		const vs_verse = by_vs[2];
		const vs_content = by_vs[3];

		const set_nw = ((vs_book != curr_book) || (vs_chapter != curr_chapter));
		if(set_nw){
			const chap_str = curr_chapter;
			
			const chp_vs = Object.keys(full_chapter);
			const sum1 = (num_file_verses + chp_vs.length);
			const is_fl_full = (sum1 > max_verses);
			if(is_fl_full){
				const hlf_chp = (chp_vs.length / 2);
				const is_chp_in_fl = (sum1 < (max_verses + hlf_chp));
				if(is_chp_in_fl){
					add__to_file(full_file, curr_book, curr_chapter, full_chapter);
					add__to_idx(full_idx, curr_book, curr_chapter, file_cnt);
					num_file_verses = num_file_verses + num_chap_verses;
					full_chapter = null;
				}
				write_file(file_cnt, full_file);
				file_cnt++;
				num_file_verses = 0;
				full_file = {};
			}
			
			if(full_chapter != null){ 
				add__to_file(full_file, curr_book, curr_chapter, full_chapter);
				add__to_idx(full_idx, curr_book, curr_chapter, file_cnt);
				num_file_verses = num_file_verses + num_chap_verses;
			}
			
			curr_book = vs_book;
			curr_chapter = vs_chapter;
			
			full_chapter = {};
			num_chap_verses = 0;
		}
		
		const cnt = vs_content.replace(/"/g, "'");
		full_chapter[vs_verse] = cnt;
		num_chap_verses++;
	}
	
	add__to_file(full_file, curr_book, curr_chapter, full_chapter);
	add__to_idx(full_idx, curr_book, curr_chapter, file_cnt);
	
	write_file(file_cnt, full_file);
	write_index(full_idx);
}

function get_bibfile_name(file_cnt){
	const nm = "bib_part_" + file_cnt + js_ext;
	return nm;
}

function add__to_file(full_file, curr_book, curr_chapter, full_chapter){
	const bk_nm = book_names[curr_book];
	if(full_file[bk_nm] == null){ full_file[bk_nm] = {}; };
	const the_book = full_file[bk_nm];
	the_book[curr_chapter] = full_chapter;
}

function add__to_idx(full_idx, curr_book, curr_chapter, file_cnt){
	const bk_nm = book_names[curr_book];
	if(full_idx[bk_nm] == null){ full_idx[bk_nm] = {}; };
	const idx_book = full_idx[bk_nm];
	idx_book[curr_chapter] = get_bibfile_name(file_cnt);
}

function write_file(file_cnt, full_file){
	const all_verses = JSON.stringify(full_file, null, "  ");
	const pth = "./" + bib_version;
	
	create_path(pth);

	const f_nam = pth + "/" + get_bibfile_name(file_cnt);
	
	const file_str = `
	
export const bib_verses = ${all_verses};

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
	
export const bib_version = "${bib_version}";
export const bib_index = ${the_idx};

`;

	fs.writeFileSync(f_nam, file_str);
	console.log("WROTE FILE=" + f_nam);
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
 * console.log("book_name=" + book_names[curr_book]);
 * console.log("chapter=" + curr_chapter);
 * console.log(JSON.stringify(full_chapter, null, "  "));
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