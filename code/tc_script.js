"use strict";

init_page();

function init_page() {
	window.onclick = window_onclick_handler;
	init_side_nav();
}

function toggle_top_menu() {
	var mm = document.querySelector(".cl_top_nav");
	mm.classList.toggle("show_menu");
}

function close_top_menu() {
	var mm = document.querySelector(".cl_top_nav");
	if (mm.classList.contains("show_menu")){
		mm.classList.toggle("show_menu");
	}
}

function scroll_to_selected() {
	var last_id_sel = sessionStorage.getItem("side_nav_selected_id");
	if(last_id_sel){
		var lst_sel = document.getElementById(last_id_sel);
		if(! (lst_sel === null) && lst_sel.classList.contains("selected")){
			lst_sel.scrollIntoView({
				behavior: 'auto',
				block: 'center',
				inline: 'center'
			});
		}
	}
}

function toggle_side_menu(id_menu) {
	document.getElementById(id_menu).classList.toggle("show_menu");
	scroll_to_selected();
}

function window_onclick_handler(event) {
	var mm1 = document.querySelector(".cl_top_nav");
	if (mm1 && mm1.classList.contains("show_menu")){
		if(! mm1.contains(event.target)){
			mm1.classList.toggle("show_menu");
		}
	}
	var mm2 = document.getElementById("id_side_nav");
	if (mm2 && mm2.classList.contains("show_menu")){
		var mm3 = document.getElementById("id_side_menu");
		if(! mm2.contains(event.target) && ! mm3.contains(event.target)){
			mm2.classList.toggle("show_menu");
		}
	}
}

function nav_clk_1(id_a, id_li) {
	var mm = document.getElementById("id_side_nav");
	if (mm.classList.contains("show_menu")){
		mm.classList.toggle("show_menu");
	}    
}

function nav_clk_2(id_a, id_li) {
	var mm = document.getElementById("id_side_nav");
	if (mm.classList.contains("show_menu")){
		mm.classList.toggle("show_menu");
	}
	
	let a_elem = document.getElementById(id_a);
	a_elem.classList.toggle("open");
	a_elem.parentElement.querySelector(".nested").classList.toggle("active");
	
	let li_elem = document.getElementById(id_li);    
	toggle_selected(li_elem);
}

function toggle_selected(li_elem) {
	let nm = "" + li_elem.nodeName;
	if(nm != "LI"){
		return;
	}
	var last_id_sel = sessionStorage.getItem("side_nav_selected_id");
	if(last_id_sel){
		var lst_sel = document.getElementById(last_id_sel);
		if(lst_sel){
			if(lst_sel.classList.contains("selected")){
				lst_sel.classList.toggle("selected");
			}
		}
	}
	li_elem.classList.toggle("selected");
	sessionStorage.setItem("side_nav_selected_id", li_elem.id);
}

function init_side_nav() {
	const sd_nv = document.getElementById("id_side_nav");
	if(sd_nv === null){
		sessionStorage.setItem("side_nav_name", false);
		sessionStorage.setItem("side_nav_selected_id", false);
		return;
	}
	let sd_menu = document.getElementById("id_side_menu");
	sd_menu.classList.toggle("has_side_nav");
	
	var curr_nm = document.getElementById("id_side_nav_name").innerHTML;
	var last_nm = sessionStorage.getItem("side_nav_name");
	var is_same = (curr_nm == last_nm);
	if(! is_same){
		sessionStorage.setItem("side_nav_name", curr_nm);
		sessionStorage.setItem("side_nav_selected_id", false);
	}
	
	var last_id_sel = sessionStorage.getItem("side_nav_selected_id");
	if(last_id_sel){
		var lst_sel = document.getElementById(last_id_sel);
		if(lst_sel != null){
			toggle_selected(lst_sel);
		} else {
			sessionStorage.setItem("side_nav_selected_id", false);
		}
	}
}


/*
 *        if(! nn.contains(event.target)){
 *            document.getElementsByTagName("BODY")[0].style.backgroundColor = "yellow";
 * 
 *    for (ii = 0; ii < all_sub.length; ii++) {
 *        all_sub[ii].addEventListener("click", sub_nav_onclick_handler);
 */
