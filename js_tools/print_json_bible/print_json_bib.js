
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

	let curr_book = -1;
	let curr_chapter = -1;
	let full_chapter = {};
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
			write_chapter(curr_book, curr_chapter, full_chapter);
			curr_book = vs_book;
			curr_chapter = vs_chapter;
			full_chapter = {};
		}
		
		const cnt = vs_content.replace(/"/g, "'");

		full_chapter[vs_verse] = cnt;		
	}
	
	write_chapter(curr_book, curr_chapter, full_chapter);
}

function write_chapter(curr_book, curr_chapter, full_chapter){
	if(curr_book == -1){ return; }
	
	const bk_nm = book_names[curr_book];
	const chp_nm = "chapter_" + curr_chapter;
	const all_verses = JSON.stringify(full_chapter, null, "  ");
	
	const pth = "./" + bib_version + "/" + bk_nm;
	
	create_path(pth);
	
	const file_nm = pth + "/" + chp_nm + ".mjs";
	
	const file_str = `
	
export const bib_version = "${bib_version}";
export const book = "${bk_nm}";
export const chapter = "${chp_nm}";
export const verses = ${all_verses};
	
`;

	fs.writeFileSync(file_nm, file_str);
	console.log("WROTE FILE=" + file_nm);
	//console.log("FILE=" + file_str);
	//fs.appendFile(file_nm, 'export const ', (err) => { if(err){ console.log(err); } });
	
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


*/