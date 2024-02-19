"use strict";

var EXAM_LANGUAGE = "en";
var ALL_BOOKS = num2book_en;
var ALL_BIBLES = bibles_en;
var BOOKS_NUMS = book2num_en;

var SUF_ID_POS = "_pos";
var SUF_ID_MSG = "_msg";
var SUF_ID_BIBREF = "_bibref";
var SUF_ID_POS_MIN = "_pos_min";
var SUF_ID_POS_MAX = "_pos_max";
var SUF_ID_POS_SET_MIN = "_pos_set_min";
var SUF_ID_POS_SET_MAX = "_pos_set_max";
var SUF_ID_POS_SHOW = "_pos_show";
var SUF_ID_POS_OK = "_pos_ok";
var SUF_ID_INTER = "_inter";
var SUF_ID_VERSES = "_verses";
var SUF_ID_SCODES = "_scodes";
var SUF_ID_LINKS = "_links";

var SUF_ID_LAST_ADDED_CITATION = "_last_added_citation";
var SUF_ID_LAST_ADDED_STRONG = "_last_added_strong";
var SUF_ID_LAST_ADDED_LINK = "_last_added_link";

var DEFAULT_BOOK = "BOOK";
var DEFAULT_CHAPTER = 0;
var DEFAULT_VERSE = 0;
var DEFAULT_LAST_VERSE = 0;
var DEFAULT_BIBLES_SITE = "biblegateway";
var DEFAULT_BIB_VER = "BIB";

var DEFAULT_STRONG = "STRONG_CODE";
var DEFAULT_LINK_NAME = "WEB LINK";
var DEFAULT_LINK_HREF = "https://www.biblehub.com";

var MSG_ADD_VERSE = "ADD VERSE";
var MSG_ADD_STRONG = "ADD STRONG CODE";
var MSG_ADD_LINK = "ADD WEB LINK";

var CIT_BOOK_IDX = 0;
var CIT_CHAPTER_IDX = 1;
var CIT_VERSE_IDX = 3;
var CIT_SEP_RANGE_IDX = 4;
var CIT_LAST_VERSE_IDX = 5;
var CIT_SITE_IDX = 6;
var CIT_BIB_VER_IDX = 7;

var LNK_NAME_IDX = 0;
var LNK_HREF_IDX = 1;

var MSG_OK = "OK";
var MSG_DEL = "DEL";
var MSG_RANGE = "RANGE";
var MSG_ANY = "ANY";

const MIN_DATE = -7000;
const MAX_DATE = -5000;

function set_exam_language(lang){
	if(lang == "es"){
		EXAM_LANGUAGE = "es";
		ALL_BOOKS = num2book_es;
		ALL_BIBLES = bibles_es;
		BOOKS_NUMS = book2num_es;
		return;
	} 
	EXAM_LANGUAGE = "en";
	ALL_BOOKS = num2book_en;
	ALL_BIBLES = bibles_en;
	BOOKS_NUMS = book2num_en;
	return;
}

function is_in_viewport(elem) {	
	var rect = elem.getBoundingClientRect();
	
	var dv_content = document.getElementById("id_exam_content");
	var rect2 = dv_content.getBoundingClientRect();
	return (
		(rect.top >= rect2.top) &&
		(rect.bottom <= rect2.bottom)
	);
	/*
	return (
		(rect.top >= 0) &&
		(rect.left >= 0) &&
		(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) && 
		(rect.right <= (window.innerWidth || document.documentElement.clientWidth)) 
	);*/
}

function add_question(qid, quest){
	const htm_stm = quest.htm_stm;
	const bibref = quest.bibref;
	const v_min = quest.v_min;
	const v_max = quest.v_max;
	
	var dv1 = document.getElementById("id_exam_statements");
	const dv_full_stm = dv1.appendChild(document.createElement("div"));
	dv_full_stm.setAttribute('id', qid);
	dv_full_stm.classList.toggle("exam");
	dv_full_stm.classList.toggle("border");
	
	const dv_stm = dv_full_stm.appendChild(document.createElement("div"));
	dv_stm.classList.toggle("exam");
	dv_stm.classList.toggle("stm");
	
	//if((bibref != null) || (v_min != null)){
		const dv_pos = dv_stm.appendChild(document.createElement("div"));
		dv_pos.classList.toggle("exam");
		dv_pos.classList.toggle("pos");
		dv_pos.classList.toggle("is_button");
		dv_pos.addEventListener('click', function() {
			toggle_pos_interaction(qid);
		});
	//}

	if(bibref != null){
		const dv_bibref = dv_pos.appendChild(document.createElement("div"));
		dv_bibref.id = qid + SUF_ID_BIBREF;
		dv_bibref.classList.toggle("exam");
		dv_bibref.classList.toggle("is_block");
		dv_bibref.innerHTML = bibref;
	}
	
	if(v_min != null){
		const dv_min = dv_pos.appendChild(document.createElement("div"));
		dv_min.id = qid + SUF_ID_POS_MIN;
		dv_min.classList.toggle("exam");
		dv_min.classList.toggle("is_block");
		dv_min.innerHTML = v_min;

		if(v_max != null){
			const dv_max = dv_pos.appendChild(document.createElement("div"));
			dv_max.id = qid + SUF_ID_POS_MAX;
			dv_max.classList.toggle("exam");
			dv_max.classList.toggle("is_block");
			dv_max.innerHTML = v_max;
		}
	}
	
	const dv_msg = dv_stm.appendChild(document.createElement("div"));
	dv_msg.setAttribute('id', qid + SUF_ID_MSG);
	dv_msg.classList.toggle("exam");
	dv_msg.classList.toggle("msg");
	if(v_min != null){
		dv_msg.addEventListener('click', function() {
			dv_msg.classList.toggle("selected");
			//dv_msg.classList.toggle("contradiction");
		});
	}
	dv_msg.innerHTML = htm_stm;

	var id_dv_verses = qid + SUF_ID_VERSES;
	var dv_verses = dv_full_stm.appendChild(document.createElement("div"));
	dv_verses.setAttribute('id', id_dv_verses);	
	dv_verses.classList.toggle("exam");
	dv_verses.classList.toggle("is_block");		
	
	if(! is_in_viewport(dv_stm)){
		dv_stm.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
	
	return dv_stm;
}

function toggle_pos_interaction(qid){
	var id_dv_verses = qid + SUF_ID_VERSES;
	const dv_verses = document.getElementById(id_dv_verses);
	const dv_stm = document.getElementById(qid);
	
	//var id_dv_inter = qid + SUF_ID_INTER;
	var id_dv_inter = "id_interac_ed";
	var dv_inter = document.getElementById(id_dv_inter);
	if(dv_inter != null){
		var prv = dv_inter.previousSibling;
		if(prv != null){
			var old_id_dv_verses = prv.id + SUF_ID_VERSES;
			const old_dv_verses = document.getElementById(old_id_dv_verses);
			old_dv_verses.classList.toggle("ed_verses");
		}
		var was_mine = (dv_stm.nextSibling == dv_inter);
		dv_inter.remove();
		if(was_mine){
			return;
		}
	}
	dv_verses.classList.toggle("ed_verses");
	
	dv_inter = get_new_dv_under(dv_stm, id_dv_inter);
	//dv_inter = dv_stm.appendChild(document.createElement("div"));
	dv_inter.setAttribute('id', id_dv_inter);
	
	dv_inter.classList.toggle("exam");
	dv_inter.classList.toggle("pos_inter");
	
	const nd_min = document.getElementById(qid + SUF_ID_POS_MIN);
	const nd_max = document.getElementById(qid + SUF_ID_POS_MAX);
	if(nd_min != null){
		var v_min = nd_min.innerHTML;
		var id_set_min = qid + SUF_ID_POS_SET_MIN;
		add_input_interaction(dv_inter, id_set_min, "Year begins", v_min);
		
		if(nd_max != null){
			var v_max = nd_max.innerHTML;
			var id_set_max = qid + SUF_ID_POS_SET_MAX;
			add_input_interaction(dv_inter, id_set_max, "Year ends", v_max);
		}
	}
	
	
	const dv_ok = dv_inter.appendChild(document.createElement("div"));
	dv_ok.classList.toggle("exam");
	dv_ok.classList.toggle("is_block");
	dv_ok.classList.toggle("is_button");
	dv_ok.innerHTML = MSG_OK;
	dv_ok.addEventListener('click', function() {
		if(nd_min != null){
			nd_min.innerHTML = document.getElementById(qid + SUF_ID_POS_SET_MIN).value;
			if(nd_max != null){
				nd_max.innerHTML = document.getElementById(qid + SUF_ID_POS_SET_MAX).value;
			}
		}
		dv_verses.classList.toggle("ed_verses");
		dv_inter.remove();

		if(! is_in_viewport(dv_stm)){
			dv_stm.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    
	
	const dv_add_cit = dv_inter.appendChild(document.createElement("div"));
	dv_add_cit.classList.toggle("exam");
	dv_add_cit.classList.toggle("is_block");
	dv_add_cit.classList.toggle("is_button");
	dv_add_cit.innerHTML = MSG_ADD_VERSE;
	dv_add_cit.addEventListener('click', function() {
		add_citation(qid);
		return;
	});
	
	const dv_add_strong = dv_inter.appendChild(document.createElement("div"));
	dv_add_strong.classList.toggle("exam");
	dv_add_strong.classList.toggle("is_block");
	dv_add_strong.classList.toggle("is_button");
	dv_add_strong.innerHTML = MSG_ADD_STRONG;
	dv_add_strong.addEventListener('click', function() {
		add_strong(qid);
		return;
	});
	
	const dv_add_link = dv_inter.appendChild(document.createElement("div"));
	dv_add_link.classList.toggle("exam");
	dv_add_link.classList.toggle("is_block");
	dv_add_link.classList.toggle("is_button");
	dv_add_link.innerHTML = MSG_ADD_LINK;
	dv_add_link.addEventListener('click', function() {
		add_link(qid);
		return;
	});
	
	if(! is_in_viewport(dv_inter)){
		dv_inter.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
	
}

function is_last_added_citation_ok(id_dv_last_cit){
	const dv_last_cit = document.getElementById(id_dv_last_cit);
	if(dv_last_cit == null){
		return true;
	}
	if(dv_last_cit != null){
		var chls = dv_last_cit.childNodes;
		var ck1 = (chls[CIT_BOOK_IDX].innerHTML != DEFAULT_BOOK);
		var ck2 = (chls[CIT_CHAPTER_IDX].innerHTML != DEFAULT_CHAPTER);
		var ck3 = (chls[CIT_VERSE_IDX].innerHTML != DEFAULT_VERSE);
		if(ck1 && ck2 && ck3){ 
			dv_last_cit.removeAttribute('id');
			return true;		
		}
	}
	return false;
}

function add_citation(qid){
	const id_dv_verses = qid + SUF_ID_VERSES;
	const dv_verses = document.getElementById(id_dv_verses);

	const id_dv_last_cit = qid + SUF_ID_LAST_ADDED_CITATION;
	if(! is_last_added_citation_ok(id_dv_last_cit)){
		return;
	}
	
	const dv_citation = dv_verses.appendChild(document.createElement("div"));
	dv_citation.setAttribute('id', id_dv_last_cit);
	dv_citation.classList.toggle("exam");
	dv_citation.classList.toggle("is_citation");
	dv_citation.classList.toggle("is_option");
	
	const dv_book = dv_citation.appendChild(document.createElement("div"));
	dv_book.classList.toggle("exam");
	dv_book.classList.toggle("is_citation");
	dv_book.innerHTML = DEFAULT_BOOK;
	
	const dv_chapter = dv_citation.appendChild(document.createElement("div"));
	dv_chapter.classList.toggle("exam");
	dv_chapter.classList.toggle("is_citation");
	dv_chapter.innerHTML = DEFAULT_CHAPTER;

	const sep1 = dv_citation.appendChild(document.createElement("div"));
	sep1.classList.toggle("exam");
	sep1.classList.toggle("is_citation");
	sep1.innerHTML = " : ";
		
	const dv_verse = dv_citation.appendChild(document.createElement("div"));
	dv_verse.classList.toggle("exam");
	dv_verse.classList.toggle("is_citation");
	dv_verse.innerHTML = DEFAULT_VERSE;

	const sep2 = dv_citation.appendChild(document.createElement("div"));
	sep2.classList.toggle("exam");
	sep2.classList.toggle("is_citation");
	sep2.classList.toggle("is_hidden");
	sep2.innerHTML = " - ";
	
	const dv_last_verse = dv_citation.appendChild(document.createElement("div"));
	dv_last_verse.classList.toggle("exam");
	dv_last_verse.classList.toggle("is_citation");
	dv_last_verse.classList.toggle("is_hidden");
	dv_last_verse.innerHTML = DEFAULT_VERSE;

	const dv_site = dv_citation.appendChild(document.createElement("div"));
	dv_site.classList.toggle("exam");
	dv_site.classList.toggle("is_citation");
	dv_site.classList.toggle("is_hidden");
	dv_site.innerHTML = DEFAULT_BIBLES_SITE;

	const bibs = ALL_BIBLES[DEFAULT_BIBLES_SITE];
	var bib_ver = DEFAULT_BIB_VER;
	if(bibs.length > 0){ bib_ver = bibs[0]; }
	
	const dv_bib_ver = dv_citation.appendChild(document.createElement("div"));
	dv_bib_ver.classList.toggle("exam");
	dv_bib_ver.classList.toggle("is_citation");
	dv_bib_ver.innerHTML = bib_ver;

	dv_citation.addEventListener('click', function() {
		if(dv_verses.classList.contains("ed_verses")){
			toggle_citation_ed(dv_citation);
		} else {
			const cit_json_2 = get_citation_json(dv_citation);
			const tg = make_bible_ref(cit_json_2);
			//console.log("going to: " + tg);
			window.open(tg, '_blank');
			//window.location.href = dv_href.innerHTML;
		}
		return;
	});

	if(! is_in_viewport(dv_citation)){
		dv_citation.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
	}
}

function get_citation_json(dv_citation){
	const cit_json = {};
	if(dv_citation != null){
		var chls = dv_citation.childNodes;
		cit_json.book = chls[CIT_BOOK_IDX].innerHTML;
		cit_json.chapter = chls[CIT_CHAPTER_IDX].innerHTML;
		cit_json.verse = chls[CIT_VERSE_IDX].innerHTML;
		cit_json.last_verse = chls[CIT_LAST_VERSE_IDX].innerHTML;
		cit_json.site = chls[CIT_SITE_IDX].innerHTML;
		cit_json.bib_ver = chls[CIT_BIB_VER_IDX].innerHTML;
	}
	return cit_json;
}

function citation_to_en(cit_json){
	var num_b = BOOKS_NUMS[cit_json.book];
	cit_json.abbr = num2abbr[num_b];
	if(EXAM_LANGUAGE != "en"){
		cit_json.book = num2book_en[num_b];
	}
	return cit_json;
}

function make_bible_ref(cit_json_orig){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	const cit_json = citation_to_en(cit_json_orig);
	var bibref = null;
	if(cit_json.site == "blueletterbible"){
		bibref = "https://www.blueletterbible.org/" + cit_json.bib_ver + "/" + cit_json.abbr + "/" + cit_json.chapter + "/" + cit_json.verse;
		return bibref;
		//https://www.blueletterbible.org/kjv/mat/3/4/
	}
	if(cit_json.site == "biblehub"){
		if(cit_json.bib_ver == "text"){
			bibref = "https://www.biblehub.com/text/" + cit_json.book + "/" + cit_json.chapter + "-" + cit_json.verse + ".htm";
			return bibref;
		} else {
			bibref = "https://www.biblehub.com/" + cit_json.bib_ver + "/" + cit_json.book + "/" + cit_json.chapter + ".htm";
			return bibref;
		}
	}
	if(cit_json.site == "bibliaparalela"){
		// https://bibliaparalela.com/nblh/genesis/1.htm
		bibref = "https://bibliaparalela.com/" + cit_json.bib_ver + "/" + cit_json.book + "/" + cit_json.chapter + ".htm";
		return bibref;
	}
	if(cit_json.site == "biblegateway"){
		bibref = "https://www.biblegateway.com/passage/?search=" + cit_json.book + "+" + cit_json.chapter + ":" + cit_json.verse;
		if(! (cit_json.last_verse == DEFAULT_LAST_VERSE)){
			bibref += "-" + cit_json.last_verse;
		}
		bibref += "&version=" + cit_json.bib_ver;
		return bibref;
	}
	
}

function toggle_citation_ed(dv_citation){
	var id_dv_citation_ed = "id_citation_ed";
	var dv_ed_cit = get_new_dv_under(dv_citation, id_dv_citation_ed);
	dv_ed_cit.classList.toggle("exam");
	dv_ed_cit.classList.toggle("is_block");
	
	const cit_json = get_citation_json(dv_citation);	
	//const cit_json = {chapter:"543",verse:"123"};

	var id_ed_book = "id_ed_book";
	const inp_book = dv_ed_cit.appendChild(document.createElement("div"));
	inp_book.setAttribute('id', id_ed_book);
	inp_book.classList.toggle("exam");
	inp_book.classList.toggle("is_ed_verse");
	inp_book.classList.toggle("is_button");
	inp_book.innerHTML = cit_json.book;
	inp_book.addEventListener('click', function() {
		const books_arr = Object.values(ALL_BOOKS);
		toggle_select_option(inp_book, books_arr, null);
		return;
	});
	
	var id_ed_chapter = "id_ed_chapter";
	const inp_chapter = dv_ed_cit.appendChild(document.createElement("input"));
	inp_chapter.setAttribute('id', id_ed_chapter);
	inp_chapter.setAttribute('value', cit_json.chapter);
	inp_chapter.setAttribute('type', "number");
	inp_chapter.setAttribute('size', 3);
	inp_chapter.classList.toggle("exam");
	inp_chapter.classList.toggle("is_ed_verse");

	const sep1 = dv_ed_cit.appendChild(document.createElement("div"));
	sep1.classList.toggle("exam");
	sep1.classList.toggle("is_ed_verse");
	sep1.innerHTML = " : ";
	
	var id_ed_verse = "id_ed_verse";
	const inp_verse = dv_ed_cit.appendChild(document.createElement("input"));
	inp_verse.setAttribute('id', id_ed_verse);
	inp_verse.setAttribute('value', cit_json.verse);
	inp_verse.setAttribute('type', "number");
	inp_verse.setAttribute('size', 3);
	inp_verse.classList.toggle("exam");
	inp_verse.classList.toggle("is_ed_verse");

	const sep2 = dv_ed_cit.appendChild(document.createElement("div"));
	sep2.classList.toggle("exam");
	sep2.classList.toggle("is_ed_verse");
	sep2.innerHTML = " - ";
	
	var id_ed_last_verse = "id_ed_last_verse";
	const inp_last_verse = dv_ed_cit.appendChild(document.createElement("input"));
	inp_last_verse.setAttribute('id', id_ed_last_verse);
	inp_last_verse.setAttribute('value', cit_json.last_verse);
	inp_last_verse.setAttribute('type', "number");
	inp_last_verse.setAttribute('size', 3);
	inp_last_verse.classList.toggle("exam");
	inp_last_verse.classList.toggle("is_ed_verse");
	
	if(cit_json.last_verse == DEFAULT_LAST_VERSE){
		sep2.classList.toggle("is_hidden");
		inp_last_verse.classList.toggle("is_hidden");
	}
	
	var id_ed_site = "id_ed_site";
	const inp_site = dv_ed_cit.appendChild(document.createElement("div"));
	inp_site.setAttribute('id', id_ed_site);
	inp_site.classList.toggle("exam");
	inp_site.classList.toggle("is_ed_verse");
	inp_site.classList.toggle("is_button");
	inp_site.innerHTML = cit_json.site;
	
	var id_ed_bib_ver_sel = "id_ed_bib_ver_sel";
	const inp_bib_ver_sel = dv_ed_cit.appendChild(document.createElement("div"));
	inp_bib_ver_sel.setAttribute('id', id_ed_bib_ver_sel);
	inp_bib_ver_sel.classList.toggle("exam");
	inp_bib_ver_sel.classList.toggle("is_ed_verse");
	inp_bib_ver_sel.classList.toggle("is_button");
	inp_bib_ver_sel.innerHTML = cit_json.bib_ver;
	
	
	inp_site.addEventListener('click', function() {
		const all_sites_arr = Object.keys(ALL_BIBLES);
		toggle_select_option(inp_site, all_sites_arr, function(value){
			const bibs = ALL_BIBLES[value];
			if(bibs.length > 0){ inp_bib_ver_sel.innerHTML = bibs[0]; }
		});
		return;
	});
		
	
	inp_bib_ver_sel.addEventListener('click', function() {
		const all_bibs_arr = ALL_BIBLES[inp_site.innerHTML];
		toggle_select_option(inp_bib_ver_sel, all_bibs_arr, null);
		return;
	});
	
	var id_ed_bib_ver_txt = "id_ed_bib_ver_txt";
	const inp_bib_ver_txt = dv_ed_cit.appendChild(document.createElement("input"));
	inp_bib_ver_txt.setAttribute('id', id_ed_bib_ver_txt);
	inp_bib_ver_txt.setAttribute('value', cit_json.bib_ver);
	inp_bib_ver_txt.setAttribute('type', "text");
	inp_bib_ver_txt.setAttribute('size', 6);
	inp_bib_ver_txt.classList.toggle("exam");
	inp_bib_ver_txt.classList.toggle("is_ed_verse");
	inp_bib_ver_txt.classList.toggle("is_hidden");
		
	const dv_ok = dv_ed_cit.appendChild(document.createElement("div"));
	dv_ok.classList.toggle("exam");
	dv_ok.classList.toggle("is_button");
	dv_ok.classList.toggle("is_ed_verse");
	dv_ok.innerHTML = MSG_OK;
	dv_ok.addEventListener('click', function() {
		//const all_chd = dv_citation.childNodes;
		dv_citation.childNodes[CIT_BOOK_IDX].innerHTML = inp_book.innerHTML;
		dv_citation.childNodes[CIT_CHAPTER_IDX].innerHTML = inp_chapter.value;
		dv_citation.childNodes[CIT_VERSE_IDX].innerHTML = inp_verse.value;
		
		var sep_range = dv_citation.childNodes[CIT_SEP_RANGE_IDX];
		var lst_Verse = dv_citation.childNodes[CIT_LAST_VERSE_IDX];
		if(! inp_last_verse.classList.contains("is_hidden") && (inp_last_verse.value != DEFAULT_LAST_VERSE)){			
			if(sep_range.classList.contains("is_hidden")){ sep_range.classList.toggle("is_hidden"); }
			if(lst_Verse.classList.contains("is_hidden")){ lst_Verse.classList.toggle("is_hidden"); }
			lst_Verse.innerHTML = inp_last_verse.value;
		} else {
			if(! sep_range.classList.contains("is_hidden")){ sep_range.classList.toggle("is_hidden"); }
			if(! lst_Verse.classList.contains("is_hidden")){ lst_Verse.classList.toggle("is_hidden"); }
			lst_Verse.innerHTML = DEFAULT_LAST_VERSE;
		}
		
		dv_citation.childNodes[CIT_SITE_IDX].innerHTML = inp_site.innerHTML;
		
		if(inp_bib_ver_sel.classList.contains("is_hidden")){
			dv_citation.childNodes[CIT_BIB_VER_IDX].innerHTML = inp_bib_ver_txt.value;
		} else {
			dv_citation.childNodes[CIT_BIB_VER_IDX].innerHTML = inp_bib_ver_sel.innerHTML;
		}
		
		dv_ed_cit.remove();
		
		if(! is_in_viewport(dv_citation)){
			dv_citation.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	const dv_del = dv_ed_cit.appendChild(document.createElement("div"));
	dv_del.classList.toggle("exam");
	dv_del.classList.toggle("is_button");
	dv_del.classList.toggle("is_ed_verse");
	dv_del.innerHTML = MSG_DEL;
	dv_del.addEventListener('click', function() {
		dv_citation.remove();
		dv_ed_cit.remove();
		return;
	});    
	
	const dv_range = dv_ed_cit.appendChild(document.createElement("div"));
	dv_range.classList.toggle("exam");
	dv_range.classList.toggle("is_button");
	dv_range.classList.toggle("is_ed_verse");
	dv_range.innerHTML = MSG_RANGE;
	dv_range.addEventListener('click', function() {
		sep2.classList.toggle("is_hidden");
		inp_last_verse.classList.toggle("is_hidden");
		return;
	});    

	const dv_any = dv_ed_cit.appendChild(document.createElement("div"));
	dv_any.classList.toggle("exam");
	dv_any.classList.toggle("is_button");
	dv_any.classList.toggle("is_ed_verse");
	dv_any.innerHTML = MSG_ANY;
	dv_any.addEventListener('click', function() {
		if(inp_bib_ver_sel.classList.contains("is_hidden")){
			inp_bib_ver_sel.innerHTML = inp_bib_ver_txt.value;
		} else {
			inp_bib_ver_txt.value = inp_bib_ver_sel.innerHTML;
		}
		inp_bib_ver_sel.classList.toggle("is_hidden");
		inp_bib_ver_txt.classList.toggle("is_hidden");
		return;
	});    
	
	if(! is_in_viewport(dv_ed_cit)){
		dv_ed_cit.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

function get_new_dv_under(dv_pop_up, id_dv){
	var dv_parent = dv_pop_up.parentNode;
	var dv_options = document.getElementById(id_dv);
	if(dv_options != null){
		var was_mine = (dv_pop_up.nextSibling == dv_options);
		dv_options.remove();
		if(was_mine){
			return;
		}
	}
	if(dv_pop_up.nextSibling == null){
		dv_options = dv_parent.appendChild(document.createElement("div"));
	} else {
		dv_options = dv_parent.insertBefore(document.createElement("div"), dv_pop_up.nextSibling);
	}	
	dv_options.setAttribute('id', id_dv);
	return dv_options;
}

function toggle_select_option(dv_return, all_options_arr, on_click_fn){
	var id_dv_sel_option = "id_dv_sel_option";
	var dv_options = get_new_dv_under(dv_return, id_dv_sel_option);
	dv_options.classList.toggle("exam");
	dv_options.classList.toggle("is_block");
	
	//for (const [key, value] of Object.entries(all_options)) {
	all_options_arr.forEach((value) => {
		const dv_opt = add_option(dv_options, null, value, null);
		dv_opt.addEventListener('click', function() {
			if(on_click_fn != null){
				on_click_fn(value);
			}
			dv_return.innerHTML = value;
			dv_options.remove();
		});
	});
}

function add_option(dv_parent, id_option, label, handler){
	const dv_opt = dv_parent.appendChild(document.createElement("div"));
	if(id_option != null){
		dv_opt.setAttribute('id', id_option);
	}
	dv_opt.classList.toggle("exam");
	dv_opt.classList.toggle("is_option");
	dv_opt.innerHTML = label;
	if(handler != null){
		dv_opt.addEventListener('click', handler);
	}
	return dv_opt; 
}

function add_input_interaction(dv_inter, id_input, label, curr_val){
	const lab_1 = dv_inter.appendChild(document.createElement("div"));
	lab_1.classList.toggle("exam");
	lab_1.classList.toggle("is_block");
	lab_1.innerHTML = label;
	
	
	const full_inp = dv_inter.appendChild(document.createElement("div"));
	full_inp.classList.toggle("is_block");
	if(is_mobile_browser()){
		const dv_neg = full_inp.appendChild(document.createElement("div"));
		dv_neg.classList.toggle("exam");
		dv_neg.classList.toggle("is_inline_input");
		dv_neg.classList.toggle("is_button");
		dv_neg.innerHTML = "neg";
		dv_neg.addEventListener('click', function() {
			document.getElementById(id_input).value = -document.getElementById(id_input).value;
			return;
		});
		
	}
	const inp_1 = full_inp.appendChild(document.createElement("input"));
	inp_1.setAttribute('id', id_input);
	inp_1.setAttribute('value', curr_val);
	inp_1.setAttribute('type', "number");
	inp_1.setAttribute('size', 5);
	inp_1.classList.toggle("exam");
	inp_1.classList.toggle("is_inline_input");
}

function is_mobile_browser() {
	const m_list = [
		/Android/i,
		/webOS/i,
		/iPhone/i,
		/iPad/i,
		/iPod/i,
		/BlackBerry/i,
		/Windows Phone/i
	];
	
	return m_list.some((m_item) => {
		return navigator.userAgent.match(m_item);
	});
}

function get_id_pos_array(dv_elem){
	if(dv_elem.tagName != "DIV"){
		return ["INVALID_ID", MIN_DATE];
	}
	const id_min = dv_elem.id + SUF_ID_POS_MIN;
	const dv_min = document.getElementById(id_min);
	
	var val_min = MIN_DATE;
	if(dv_min != null){
		val_min = parseInt(dv_min.innerHTML);
	}

	const id_pos_pair = [dv_elem.id, val_min];
	return id_pos_pair;
}

function get_all_id_pos_array(){
	const dv1 = document.getElementById("id_exam_statements");
	const all_pairs = [];
	for (const child of dv1.children) {
		all_pairs.push(get_id_pos_array(child));
		//console.log(child.tagName);
		//console.log(child.id);
	}
	return all_pairs;
}

function sort_button_handler(){
	const all_pairs = get_all_id_pos_array();
	const sorted_pairs = all_pairs.sort((p1, p2) => p1[1] - p2[1]);
	//console.log(sorted_pairs);
	//console.log("PRESSED_SORT_BUTTON");
	
	const dv_all_stm = document.getElementById("id_exam_statements");
	sorted_pairs.forEach((pair) => {
		const qid = pair[0];
		const dv_stm = document.getElementById(qid);
		dv_stm.remove();
		dv_all_stm.appendChild(dv_stm);
	});
	
}


function make_strong_ref(scode){
	// https://www.biblegateway.com/passage/?search=exodus+1%3A4-7&version=RVR1960
	if((scode.length < 2) || ((scode[0] != "G") && (scode[0] != "H"))){
		return "https://www.biblehub.com";
	}
	var bibref = null;
	const the_code = scode.substring(1);
	if(scode[0] == "H"){
		bibref = "https://www.biblehub.com/hebrew/" + the_code + ".htm";
	}
	if(scode[0] == "G"){
		bibref = "https://www.biblehub.com/greek/" + the_code + ".htm";
	}
	return bibref;
}

function is_last_added_strong_ok(id_dv_last_strong){
	const dv_last_strong = document.getElementById(id_dv_last_strong);
	if(dv_last_strong == null){
		return true;
	}
	if(dv_last_strong != null){
		var ck1 = (dv_last_strong.innerHTML != DEFAULT_STRONG);
		if(ck1){ 
			dv_last_strong.removeAttribute('id');
			return true;		
		}
	}
	return false;
}

function add_strong(qid){
	//console.log("ENTRA a add_strong");
	const id_dv_verses = qid + SUF_ID_VERSES;
	const dv_verses = document.getElementById(id_dv_verses);

	const id_dv_last_strong = qid + SUF_ID_LAST_ADDED_STRONG;
	if(! is_last_added_strong_ok(id_dv_last_strong)){
		return;
	}
	
	const dv_code = dv_verses.appendChild(document.createElement("div"));
	dv_code.setAttribute('id', id_dv_last_strong);
	dv_code.classList.toggle("exam");
	dv_code.classList.toggle("is_citation");
	dv_code.classList.toggle("is_option");
	dv_code.innerHTML = DEFAULT_STRONG;
	
	dv_code.addEventListener('click', function() {
		if(dv_verses.classList.contains("ed_verses")){
			toggle_strong_ed(dv_code);
		} else {
			const tg = make_strong_ref(dv_code.innerHTML);
			//console.log("going to: " + tg);
			window.open(tg, '_blank');
			//window.location.href = dv_href.innerHTML;
		}
		return;
	});

	if(! is_in_viewport(dv_code)){
		dv_code.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
	}
}

function toggle_strong_ed(dv_code){
	var id_dv_code_ed = "id_strong_ed";
	var dv_ed_strong = get_new_dv_under(dv_code, id_dv_code_ed);
	dv_ed_strong.classList.toggle("exam");
	dv_ed_strong.classList.toggle("is_block");

	var strong_lang = "H";
	var strong_num = "0";
	const scode = dv_code.innerHTML;
	if((scode != DEFAULT_STRONG) && (scode.length > 1)){
		strong_lang = scode[0];
		strong_num = scode.substring(1);
	}

	//console.log("IN toggle_strong_ed " + strong_lang + strong_num);
	
	const inp_slang = dv_ed_strong.appendChild(document.createElement("div"));
	inp_slang.classList.toggle("exam");
	inp_slang.classList.toggle("is_ed_verse");
	inp_slang.classList.toggle("is_button");
	inp_slang.innerHTML = strong_lang;
	inp_slang.addEventListener('click', function() {
		const lang_arr = ["H", "G"];
		toggle_select_option(inp_slang, lang_arr, null);
		return;
	});
	
	const inp_snum = dv_ed_strong.appendChild(document.createElement("input"));
	inp_snum.setAttribute('value', strong_num);
	inp_snum.setAttribute('type', "number");
	inp_snum.setAttribute('size', 4);
	inp_snum.classList.toggle("exam");
	inp_snum.classList.toggle("is_ed_verse");

	const dv_ok = dv_ed_strong.appendChild(document.createElement("div"));
	dv_ok.classList.toggle("exam");
	dv_ok.classList.toggle("is_button");
	dv_ok.classList.toggle("is_ed_verse");
	dv_ok.innerHTML = MSG_OK;
	dv_ok.addEventListener('click', function() {
		//const all_chd = dv_code.childNodes;
		dv_code.innerHTML = inp_slang.innerHTML + inp_snum.value;
		dv_ed_strong.remove();
		
		if(! is_in_viewport(dv_code)){
			dv_code.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	const dv_del = dv_ed_strong.appendChild(document.createElement("div"));
	dv_del.classList.toggle("exam");
	dv_del.classList.toggle("is_button");
	dv_del.classList.toggle("is_ed_verse");
	dv_del.innerHTML = MSG_DEL;
	dv_del.addEventListener('click', function() {
		dv_code.remove();
		dv_ed_strong.remove();
		return;
	});    
	
	if(! is_in_viewport(dv_ed_strong)){
		dv_ed_strong.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

function init_exam_buttons(){
	const id_sort_butt = "id_exam_sort_button"; // this must be the same to the id in the HTML page.
	const dv_sort_butt = document.getElementById(id_sort_butt);
	dv_sort_butt.addEventListener('click', sort_button_handler);
	
}

function is_last_added_link_ok(id_dv_last_link){
	const dv_last_link = document.getElementById(id_dv_last_link);
	if(dv_last_link == null){
		return true;
	}
	if(dv_last_link != null){
		var chls = dv_last_link.childNodes;
		var ck1 = (chls[LNK_NAME_IDX].innerHTML != DEFAULT_LINK_NAME);
		if(ck1){ 
			dv_last_link.removeAttribute('id');
			return true;		
		}
	}
	return false;
}

function add_link(qid){
	//console.log("ENTRA a add_link");
	const id_dv_verses = qid + SUF_ID_VERSES;
	const dv_verses = document.getElementById(id_dv_verses);

	const id_dv_last_link = qid + SUF_ID_LAST_ADDED_LINK;
	if(! is_last_added_link_ok(id_dv_last_link)){
		return;
	}
	
	const dv_link = dv_verses.appendChild(document.createElement("div"));
	dv_link.setAttribute('id', id_dv_last_link);
	dv_link.classList.toggle("exam");
	dv_link.classList.toggle("is_citation");
	dv_link.classList.toggle("is_option");
	
	const dv_name = dv_link.appendChild(document.createElement("div"));
	dv_name.classList.toggle("exam");
	dv_name.classList.toggle("is_citation");
	dv_name.innerHTML = DEFAULT_LINK_NAME;
	
	const dv_href = dv_link.appendChild(document.createElement("a"));
	dv_href.classList.toggle("is_hidden");
	dv_href.setAttribute('href', DEFAULT_LINK_HREF);

	dv_link.addEventListener('click', function() {
		if(dv_verses.classList.contains("ed_verses")){
			toggle_link_ed(dv_link);
		} else {
			const tg = dv_href.href;
			//console.log("going to: " + tg);
			window.open(tg, '_blank');
			//window.location.href = dv_href.innerHTML;
		}
		return;
	});

	if(! is_in_viewport(dv_link)){
		dv_link.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
	}
}

function toggle_link_ed(dv_link){
	var id_dv_link_ed = "id_link_ed";
	var dv_ed_link = get_new_dv_under(dv_link, id_dv_link_ed);
	dv_ed_link.classList.toggle("exam");
	dv_ed_link.classList.toggle("is_block");

	const chls = dv_link.childNodes;
	var link_name = chls[LNK_NAME_IDX].innerHTML;
	var link_href = chls[LNK_HREF_IDX].href;

	//console.log("IN toggle_link_ed " + link_lang + link_num);
	
	const inp_name = dv_ed_link.appendChild(document.createElement("input"));
	inp_name.setAttribute('value', link_name);
	inp_name.setAttribute('type', "text");
	inp_name.setAttribute('size', 10);
	inp_name.classList.toggle("exam");
	inp_name.classList.toggle("is_ed_verse");
	
	const inp_href = dv_ed_link.appendChild(document.createElement("input"));
	inp_href.setAttribute('value', link_href);
	inp_href.setAttribute('type', "text");
	inp_href.setAttribute('size', 20);
	inp_href.classList.toggle("exam");
	inp_href.classList.toggle("is_ed_verse");

	const dv_ok = dv_ed_link.appendChild(document.createElement("div"));
	dv_ok.classList.toggle("exam");
	dv_ok.classList.toggle("is_button");
	dv_ok.classList.toggle("is_ed_verse");
	dv_ok.innerHTML = MSG_OK;
	dv_ok.addEventListener('click', function() {
		const all_chd = dv_link.childNodes;
		all_chd[LNK_NAME_IDX].innerHTML = inp_name.value;
		all_chd[LNK_HREF_IDX].href = inp_href.value;
		dv_ed_link.remove();
		
		if(! is_in_viewport(dv_link)){
			dv_link.scrollIntoView({
				behavior: 'auto',
				block: 'start',
				inline: 'center'
			});	
		}
		
		return;
	});    

	const dv_del = dv_ed_link.appendChild(document.createElement("div"));
	dv_del.classList.toggle("exam");
	dv_del.classList.toggle("is_button");
	dv_del.classList.toggle("is_ed_verse");
	dv_del.innerHTML = MSG_DEL;
	dv_del.addEventListener('click', function() {
		dv_link.remove();
		dv_ed_link.remove();
		return;
	});    
	
	if(! is_in_viewport(dv_ed_link)){
		dv_ed_link.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});
	}
}

function dbg_init_pru_stms(){
	var msg_001 = `Este es un mensaje que se toma varias lineas porque se supone que es largo y dice varias cosas en varios parrafos para ver que sucede con el display en el momento de desplegarlo en la table, en el computador y en el celular. Si se pega a los lados o no. Si se ve todo. Si se ve demasiado raro o no. Y varias posibilidades de desplegarlo o de mostrarlo. Es solo un ejemplo y no pretende ser ningun tipo de mensaje que se vaya a mostrar en la aplicacion final.
	`;
	
	var st1 = add_question("id001", { htm_stm:"<h1>HOLA PABLO</h1>", v_min:-4310, v_max:-1876 });
	var st2 = add_question("id002", { htm_stm:msg_001, v_min:1234, v_max:7654 });
	var st3 = add_question("id003", { htm_stm:"HOLA JOSE", v_min:5430 });
	add_question("id004", { htm_stm:"HOLA JOSE 2", v_min:45 });
	add_question("id005", { htm_stm:"HOLA JOSE 3", v_min:52 });
	add_question("id006", { htm_stm:"HOLA JOSE 4", v_min:23 });
	add_question("id007", { htm_stm:"HOLA JOSE 5", v_min:22 });
	add_question("id008", { htm_stm:"HOLA JOSE 6", v_min:35 });
	add_question("id009", { htm_stm:"HOLA JOSE 7", bibref:"AD", v_min:11 });
	add_question("id010", { htm_stm:"HOLA JOSE 8", v_min:9 });
	add_question("id011", { htm_stm:"HOLA JOSE 9", v_min:67 });
	add_question("id012", { htm_stm:"HOLA JOSE 10", v_min:5 });
	add_question("id013", { htm_stm:"HOLA JOSE 11", v_min:25 });
	add_question("id014", { htm_stm:"HOLA JOSE 12", v_min:61 });
	add_question("id015", { htm_stm:"HOLA JOSE 13", v_min:98 });
	add_question("id016", { htm_stm:"HOLA JOSE 14", v_min:3 });
	add_question("id017", { htm_stm:"HOLA JOSE 15", v_min:7 });
	add_question("id018", { htm_stm:"HOLA JOSE 16", v_min:44 });
	
	
	/*st3.addEventListener('click', function(event) {
		var elem1 = document.getElementById("id001");
		elem1.remove();
	});	*/
	//var st4 = add_question("id_4", "Cuarto mensaje", null, null, null);

	console.log("FIRST_MESSAGE_TEST");
	const fst_msg = db_nodes_exam["STARTING_EXAM_MESSAGE"];
	console.log(JSON.stringify(db_nodes_exam[get_msg_id(fst_msg)], null, "  "));
	console.log(msg2id[msg_there_is_no_creator]);
	console.log(msg2id[msg_i_do_not_know_if_there_is_creator]);

};

function add_exam_question(qid){
	const nd = db_nodes_exam[qid];
	add_question(qid, nd);
};

function init_page_exam(){
	init_exam_buttons();
	set_exam_language("es");
	dbg_init_pru_stms();
	
	const fst_msg = db_nodes_exam["STARTING_EXAM_MESSAGE"];
	const fst_id = msg2id[fst_msg];
	add_exam_question(fst_id);	
};


init_page_exam();


