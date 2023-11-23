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

var DEFAULT_BOOK = "BOOK";
var DEFAULT_CHAPTER = 0;
var DEFAULT_VERSE = 0;
var DEFAULT_LAST_VERSE = 0;
var DEFAULT_BIBLES_SITE = "biblegateway";
var DEFAULT_BIB_VER = "BIB";

var MSG_ADD_VERSE = "ADD VERSE";

var CIT_BOOK_IDX = 0;
var CIT_CHAPTER_IDX = 1;
var CIT_VERSE_IDX = 3;
var CIT_SEP_RANGE_IDX = 4;
var CIT_LAST_VERSE_IDX = 5;
var CIT_SITE_IDX = 6;
var CIT_BIB_VER_IDX = 7;

var MSG_OK = "OK";
var MSG_DEL = "DEL";
var MSG_RANGE = "RANGE";
var MSG_ANY = "ANY";

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

function add_statement(id_stm, htm_stm, bibref, v_min, v_max){
	var dv1 = document.getElementById("id_exam");
	const dv_full_stm = dv1.appendChild(document.createElement("div"));
	dv_full_stm.setAttribute('id', id_stm);
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
			toggle_pos_interaction(id_stm);
		});
	//}

	if(bibref != null){
		const dv_bibref = dv_pos.appendChild(document.createElement("div"));
		dv_bibref.id = id_stm + SUF_ID_BIBREF;
		dv_bibref.classList.toggle("exam");
		dv_bibref.classList.toggle("is_block");
		dv_bibref.innerHTML = bibref;
	}
	
	if(v_min != null){
		const dv_min = dv_pos.appendChild(document.createElement("div"));
		dv_min.id = id_stm + SUF_ID_POS_MIN;
		dv_min.classList.toggle("exam");
		dv_min.classList.toggle("is_block");
		dv_min.innerHTML = v_min;

		if(v_max != null){
			const dv_max = dv_pos.appendChild(document.createElement("div"));
			dv_max.id = id_stm + SUF_ID_POS_MAX;
			dv_max.classList.toggle("exam");
			dv_max.classList.toggle("is_block");
			dv_max.innerHTML = v_max;
		}
	}
	
	const dv_msg = dv_stm.appendChild(document.createElement("div"));
	dv_msg.setAttribute('id', id_stm + SUF_ID_MSG);
	dv_msg.classList.toggle("exam");
	dv_msg.classList.toggle("msg");
	dv_msg.addEventListener('click', function() {
		dv_msg.classList.toggle("selected");
	});
	dv_msg.innerHTML = htm_stm;

	var id_dv_verses = id_stm + SUF_ID_VERSES;
	var dv_verses = dv_full_stm.appendChild(document.createElement("div"));
	dv_verses.setAttribute('id', id_dv_verses);	
	dv_verses.classList.toggle("exam");
	dv_verses.classList.toggle("is_block");
	
	dv_stm.scrollIntoView({
		behavior: 'auto',
		block: 'start',
		inline: 'center'
	});
	
	return dv_stm;
}

function toggle_pos_interaction(id_stm){
	var id_dv_verses = id_stm + SUF_ID_VERSES;
	const dv_verses = document.getElementById(id_dv_verses);
	const dv_stm = document.getElementById(id_stm);
	
	//var id_dv_inter = id_stm + SUF_ID_INTER;
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
	
	const nd_min = document.getElementById(id_stm + SUF_ID_POS_MIN);
	const nd_max = document.getElementById(id_stm + SUF_ID_POS_MAX);
	if(nd_min != null){
		var v_min = nd_min.innerHTML;
		var id_set_min = id_stm + SUF_ID_POS_SET_MIN;
		add_input_interaction(dv_inter, id_set_min, "Year begins", v_min);
		
		if(nd_max != null){
			var v_max = nd_max.innerHTML;
			var id_set_max = id_stm + SUF_ID_POS_SET_MAX;
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
			nd_min.innerHTML = document.getElementById(id_stm + SUF_ID_POS_SET_MIN).value;
			if(nd_max != null){
				nd_max.innerHTML = document.getElementById(id_stm + SUF_ID_POS_SET_MAX).value;
			}
		}
		dv_verses.classList.toggle("ed_verses");
		dv_inter.remove();

		dv_stm.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
		
		return;
	});    
	
	const dv_add_cit = dv_inter.appendChild(document.createElement("div"));
	dv_add_cit.classList.toggle("exam");
	dv_add_cit.classList.toggle("is_block");
	dv_add_cit.classList.toggle("is_button");
	dv_add_cit.innerHTML = MSG_ADD_VERSE;
	dv_add_cit.addEventListener('click', function() {
		add_citation(id_dv_verses);
		return;
	});
	
	dv_inter.scrollIntoView({
		behavior: 'auto',
		block: 'start',
		inline: 'center'
	});
	
}

function is_last_verse_default(dv_verses){
	var last_Verse = dv_verses.lastChild;
	if(last_Verse != null){
		var chls = last_Verse.childNodes;
		var ck1 = (chls[CIT_BOOK_IDX].innerHTML == DEFAULT_BOOK);
		var ck2 = (chls[CIT_CHAPTER_IDX].innerHTML == DEFAULT_CHAPTER);
		var ck3 = (chls[CIT_VERSE_IDX].innerHTML == DEFAULT_VERSE);
		if(ck1 || ck2 || ck3){ return true; }
	}
	return false;
}

function add_citation(id_dv_verses){
	const dv_verses = document.getElementById(id_dv_verses);
	if(is_last_verse_default(dv_verses)){
		return;
	}
	
	const dv_citation = dv_verses.appendChild(document.createElement("a"));
	dv_citation.classList.toggle("exam");
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

	dv_citation.scrollIntoView({
		behavior: 'auto',
		block: 'start',
		inline: 'center'
	});	
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
		
		dv_citation.scrollIntoView({
			behavior: 'auto',
			block: 'start',
			inline: 'center'
		});	
		
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
	
	dv_ed_cit.scrollIntoView({
		behavior: 'auto',
		block: 'start',
		inline: 'center'
	});
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
		dv_neg.classList.toggle("is_inline_block");
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
	inp_1.classList.toggle("is_inline_block");
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

function init_page_exam(){
	var msg_001 = `Este es un mensaje que se toma varias lineas porque se supone que es largo y dice varias cosas en varios parrafos para ver que sucede con el display en el momento de desplegarlo en la table, en el computador y en el celular. Si se pega a los lados o no. Si se ve todo. Si se ve demasiado raro o no. Y varias posibilidades de desplegarlo o de mostrarlo. Es solo un ejemplo y no pretende ser ningun tipo de mensaje que se vaya a mostrar en la aplicacion final.
	`;
	
	var st1 = add_statement("id001", "<h1>HOLA PABLO</h1>", null, -4310, -1876);
	var st2 = add_statement("id002", msg_001, null, 1234, 7654);
	var st3 = add_statement("id003", "HOLA JOSE", null, 5430, null);
	add_statement("id004", "HOLA JOSE 2", null, 5430, null);
	add_statement("id005", "HOLA JOSE 3", null, 5430, null);
	add_statement("id006", "HOLA JOSE 4", null, 5430, null);
	add_statement("id007", "HOLA JOSE 5", null, 5430, null);
	add_statement("id008", "HOLA JOSE 6", null, 5430, null);
	add_statement("id009", "HOLA JOSE 7", null, 5430, null);
	add_statement("id010", "HOLA JOSE 8", null, 5430, null);
	add_statement("id011", "HOLA JOSE 9", null, 5430, null);
	add_statement("id012", "HOLA JOSE 10", null, 5430, null);
	add_statement("id013", "HOLA JOSE 11", null, 5430, null);
	add_statement("id014", "HOLA JOSE 12", null, 5430, null);
	add_statement("id015", "HOLA JOSE 13", null, 5430, null);
	add_statement("id016", "HOLA JOSE 14", null, 5430, null);
	add_statement("id017", "HOLA JOSE 15", null, 5430, null);
	add_statement("id018", "HOLA JOSE 16", null, 5430, null);
	/*st3.addEventListener('click', function(event) {
		var elem1 = document.getElementById("id001");
		elem1.remove();
	});	*/
	var st4 = add_statement("id004", "Cuarto mensaje", null, null, null);

	set_exam_language("es");
};

init_page_exam();


