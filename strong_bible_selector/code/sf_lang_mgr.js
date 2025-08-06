
import { gvar, } from './sf_search_mgr.js';

const DEFAULT_BOOK_NAME = "INVALID_BOOK_NAME";
const INVALID_BOOK_ABBR = "INVALID_BOOK_ABBR";

const msg_es = {
	loading: "BAJANDO ",
	in_cache: "(EN CACHE)",
	finding: "Encontrando",
	scod_search: "Codigos Strong en:",
	text_search: "Texto:",
	ranges_search: "En los rangos:",
	no_verses: "No hay vertsiculos con la configuracion dada",
};

const msg_en = {
	loading: "LOADING ",
	in_cache: "(IN CACHE)",
	finding: "Finding",
	scod_search: "Strong Codes in:",
	text_search: "Text:",
	ranges_search: "In the ranges:",
	no_verses: "There are no verses with the configuration given",
};

const tok_ops_asc_id_es = ["exacto", "parcial", "adicionar"];
const tok_ops_asc_id_en = ["exact", "partial", "add"];
const tok_ops_scod_es = ["encuentra", "adicionar", "bibhub"];
const tok_ops_scod_en = ["find", "add", "bibhub"];

const ops_def_scod_es = ["ant", "sig", "raices", "mutuos", "bibhub"];
const ops_def_scod_en = ["prv", "nxt", "roots", "mutual", "bibhub"];

export const num2book_en = {
	"-1":DEFAULT_BOOK_NAME,
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

const num2book_es = {
	"-1":DEFAULT_BOOK_NAME,
	"1":"génesis",
	"2":"éxodo",
	"3":"levítico",
	"4":"números",
	"5":"deuteronomio",
	"6":"josué",
	"7":"jueces",
	"8":"rut",
	"9":"1_samuel",
	"10":"2_samuel",
	"11":"1_reyes",
	"12":"2_reyes",
	"13":"1_crónicas",
	"14":"2_crónicas",
	"15":"esdras",
	"16":"nehemías",
	"17":"ester",
	"18":"job",
	"19":"salmos",
	"20":"proverbios",
	"21":"eclesiastés",
	"22":"cantares",
	"23":"isaías",
	"24":"jeremías",
	"25":"lamentaciones",
	"26":"ezequiel",
	"27":"daniel",
	"28":"oseas",
	"29":"joel",
	"30":"amós",
	"31":"abdías",
	"32":"jonás",
	"33":"miqueas",
	"34":"nahúm",
	"35":"habacuc",
	"36":"sofonías",
	"37":"hageo",
	"38":"zacarías",
	"39":"malaquías",
	"40":"mateo",
	"41":"marcos",
	"42":"lucas",
	"43":"juan",
	"44":"hechos",
	"45":"romanos",
	"46":"1_corintios",
	"47":"2_corintios",
	"48":"gálatas",
	"49":"efesios",
	"50":"filipenses",
	"51":"colosenses",
	"52":"1_tesalonicenses",
	"53":"2_tesalonicenses",
	"54":"1_timoteo",
	"55":"2_timoteo",
	"56":"tito",
	"57":"filemón",
	"58":"hebreos",
	"59":"santiago",
	"60":"1_pedro",
	"61":"2_pedro",
	"62":"1_juan",
	"63":"2_juan",
	"64":"3_juan",
	"65":"judas",
	"66":"apocalipsis",
};

export const num2abbr = {
	"-1":INVALID_BOOK_ABBR,
	"1":"gen",
	"2":"exo",
	"3":"lev",
	"4":"num",
	"5":"deu",
	"6":"jos",
	"7":"jdg",
	"8":"rth",
	"9":"1sa",
	"10":"2sa",
	"11":"1ki",
	"12":"2ki",
	"13":"1ch",
	"14":"2ch",
	"15":"ezr",
	"16":"neh",
	"17":"est",
	"18":"job",
	"19":"psa",
	"20":"pro",
	"21":"ecc",
	"22":"sng",
	"23":"isa",
	"24":"jer",
	"25":"lam",
	"26":"eze",
	"27":"dan",
	"28":"hos",
	"29":"joe",
	"30":"amo",
	"31":"oba",
	"32":"jon",
	"33":"mic",
	"34":"nah",
	"35":"hab",
	"36":"zep",
	"37":"hag",
	"38":"zec",
	"39":"mal",
	"40":"mat",
	"41":"mar",
	"42":"luk",
	"43":"jhn",
	"44":"act",
	"45":"rom",
	"46":"1co",
	"47":"2co",
	"48":"gal",
	"49":"eph",
	"50":"phl",
	"51":"col",
	"52":"1th",
	"53":"2th",
	"54":"1ti",
	"55":"2Ti",
	"56":"tit",
	"57":"phm",
	"58":"heb",
	"59":"jas",
	"60":"1pe",
	"61":"2pe",
	"62":"1jo",
	"63":"2jo",
	"64":"3jo",
	"65":"jde",
	"66":"rev",
};

const old_crit_txt_en = {
	"1": "W. Leningrad Codex (WLC)",
	"2": "Aleppo (ALE)",
	"3": "Tanakh (TKH)",
	"4": "Septuagint (LXX)",
};

const old_crit_txt_es = {
	"1": "Codex Leningrado W. (WLC)",
	"2": "Aleppo (ALE)",
	"3": "Tanakh (TKH)",
	"4": "Septuaginta (LXX)",
};

const new_crit_txt_en = {
	"1": "Byzantine Text (BYZ)",
	"2": "Textus Receptus (TR)",
	"3": "Wescott and Hort Text (WH)",
	"4": "Nestle 1904 Text (NES)",
};

const new_crit_txt_es = {
	"1": "Texto Bisantino (BYZ)",
	"2": "Textus Receptus (TR)",
	"3": "Texto Wescott and Hort (WH)",
	"4": "Texto Nestle 1904 (NES)",
};

const loc_bible_en = {
	"1": "Reina-Valera 1909 (RVA)",
	"2": "King James Bible (KJV)",
	"3": "Sagrada Biblia Libre para el Mundo (SBLM)",
	"4": "World Estandard Bible (WEB)",
};

const tgt_rx_en = {
	"1": "Use Old Tes. (OT) = ",
	"2": "Use New Tes. (NT) = ",
	"3": "Use Local bible (LOC) = ",
};

const tgt_rx_es = {
	"1": "Use Antiguo Tes. (OT) = ",
	"2": "Use Nuevo Tes. (NT) = ",
	"3": "Use Biblia Local (LOC) = ",
};

const out_txt_en = {
	"1": "Show in minuscule (MIN)",
	"2": "Show in mayuscule (MAY)",
	"3": "Show in ASCII (ASC)",
};

const out_txt_es = {
	"1": "Muestre en minusculas (MIN)",
	"2": "Muestre en mayusculas (MAY)",
	"3": "Muestre en ASCII (ASC)",
};


export function init_lang(nm_lang){
	if(nm_lang == "es"){
		init_es();
		return;
	} 
	init_en();
}

function fill_reversed_object(orig, reverse){
	for (const [key, value] of Object.entries(orig)) {
		reverse[value] = key;
		//console.log(`${key} = ${value}`);
	}  
}

function fill_inbook2num(orig, inbook2num){
	for (const [num, book] of Object.entries(orig)) {
		const inbook = book2inbook(book);
		inbook2num[inbook] = num;
		//console.log(`${key} = ${value}`);
	}  
}

function book2inbook(bb){
	let s1 = bb.replace(/_/g, "").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
	return s1;
}

const book2num_en = {};
const book2num_es = {};
const inbook2num_es = {};
const abbr2num = {};

function init_common(){
	fill_reversed_object(num2abbr, abbr2num);
	fill_reversed_object(num2book_es, book2num_es);
	fill_reversed_object(num2book_en, book2num_en);
	fill_inbook2num(num2book_es, inbook2num_es);
	gvar.num2abbr = num2abbr;
	gvar.abbr2num = abbr2num;
	gvar.num2book_es = num2book_es;
	gvar.book2num_es = book2num_es;
	gvar.inbook2num_es = inbook2num_es;
	gvar.num2book_en = num2book_en;
	gvar.book2num_en = book2num_en;
	gvar.inbook2num_en = book2num_en;
}

function init_es(){
	init_common();
	gvar.lang = 'es';
	gvar.book_names = num2book_es;
	gvar.glb_all_books = num2book_es;
	gvar.num2book = num2book_es;
	gvar.book2num = book2num_es;
	gvar.inbook2num = inbook2num_es;
	gvar.all_msg = msg_es;
	
	gvar.old_crit_txt = old_crit_txt_es;
	gvar.new_crit_txt = new_crit_txt_es;
	gvar.loc_bible = loc_bible_en;
	gvar.tgt_rx = tgt_rx_es;
	gvar.out_txt = out_txt_es;
	
	gvar.tok_ops_asc_id = tok_ops_asc_id_es;
	gvar.tok_ops_scod = tok_ops_scod_es;
	gvar.ops_def_scod = ops_def_scod_es;
}

function init_en(){
	init_common();
	gvar.lang = 'en';
	gvar.book_names = num2book_en;
	gvar.glb_all_books = num2book_en;
	gvar.num2book = num2book_en;
	gvar.book2num = book2num_en;
	gvar.inbook2num = book2num_en;
	gvar.all_msg = msg_en;

	gvar.old_crit_txt = old_crit_txt_en;
	gvar.new_crit_txt = new_crit_txt_en;
	gvar.loc_bible = loc_bible_en;
	gvar.tgt_rx = tgt_rx_en;
	gvar.out_txt = out_txt_en;

	gvar.tok_ops_asc_id = tok_ops_asc_id_en;
	gvar.tok_ops_scod = tok_ops_scod_en;
	gvar.ops_def_scod = ops_def_scod_en;
}

