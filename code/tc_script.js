"use strict";

init_page();

function toggle_top_menu() {
    var mm = document.querySelector(".cl_top_nav");
    mm.classList.toggle("show_menu");
    //document.getElementById(id_menu).classList.toggle("show_menu");
}

function close_top_menu() {
    //var mm = document.getElementById(id_menu);
    var mm = document.querySelector(".cl_top_nav");
    if (mm.classList.contains("show_menu")){
        mm.classList.toggle("show_menu");
    }
}

function scroll_to_selected() {
    var last_id_sel = sessionStorage.getItem("side_nav_selected_id");
    if(last_id_sel){
        var lst_sel = document.getElementById(last_id_sel);
        if(lst_sel.classList.contains("selected")){
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
    if (mm1.classList.contains("show_menu")){
        if(! mm1.contains(event.target)){
            mm1.classList.toggle("show_menu");
        }
    }
    var mm2 = document.getElementById("id_side_nav");
    if (mm2.classList.contains("show_menu")){
        var mm3 = document.getElementById("id_side_menu");
        if(! mm2.contains(event.target) && ! mm3.contains(event.target)){
            mm2.classList.toggle("show_menu");
        }
    }
}

function sub_nav_onclick_handler() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("open");
}

function init_side_nav() {
    var all_sub = document.getElementsByClassName("cl_sub_nav");
    var ii;

    for (ii = 0; ii < all_sub.length; ii++) {
        all_sub[ii].addEventListener("click", sub_nav_onclick_handler);
    }
}

function get_ancestors(li_elem) {
    const MAX_LEVELS_SIDE_NAV = 100;
    const all_ancestors = [];
    var ii = 0;
    var pp = li_elem;
    for (ii = 0; ii < MAX_LEVELS_SIDE_NAV; ii++) {
        pp = pp.parentElement;
        if(pp === null){
            break;
        }
        if(pp.id === "id_side_nav"){
            break;
        }
        let nm = "" + pp.nodeName;
        if(nm === "BODY"){
            break;
        }
        if(nm === "UL"){
            let ancest = pp;
            all_ancestors.push(ancest);
        }
    }
    return all_ancestors;
}

function toggle_selected(li_elem) {
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
    //debug_msg("SELECTING=" + li_elem.id);
}

function close_side_li(id_menu, li_elem) {
    toggle_selected(li_elem);

    var all_ancestors = all_ancestors = get_ancestors(li_elem);

    var all_sub = document.getElementsByClassName("cl_sub_nav");
    var ii;

    for (ii = 0; ii < all_sub.length; ii++) {
        var jj = all_sub[ii];
        if(jj.classList.contains("open")){
            var fst = jj.parentElement.querySelector(".nested");
            if(! all_ancestors.includes(fst)){
                fst.classList.toggle("active");
                jj.classList.toggle("open");
            }
        }
    }

    var mm = document.getElementById(id_menu);
    if (mm.classList.contains("show_menu")){
        mm.classList.toggle("show_menu");
    }

}

function add_closer(ii, jj) {
    jj.addEventListener("click", function() {
        close_side_li('id_side_nav', jj);
    });
    jj.id = "id_side_li_" + ii;
}

function init_side_nav_closers() {
    const sd_nv = document.getElementById("id_side_nav");
    const all_li = sd_nv.getElementsByTagName("li");
    var ii;

    for (ii = 0; ii < all_li.length; ii++) {
        let jj = all_li[ii];
        
        var first_li = jj.querySelector("li");
        if(first_li === null){
            add_closer(ii, jj);
        }
        let nm = "" + jj.firstElementChild.nodeName;
        if(nm === "A"){
            add_closer(ii, jj);
        }
    }


    var curr_nm = document.getElementById("id_side_nav_name").innerHTML;
    var last_nm = sessionStorage.getItem("side_nav_name");
    var is_same = (curr_nm == last_nm);
    if(! is_same){
        sessionStorage.setItem("side_nav_name", curr_nm);
        sessionStorage.setItem("side_nav_selected_id", null);
        return;
    }

    var last_id_sel = sessionStorage.getItem("side_nav_selected_id");
    if(last_id_sel){
        var lst_sel = document.getElementById(last_id_sel);
        if(lst_sel != null){
            debug_msg("HAS_SELECTED=" + last_id_sel);
            dbg_add_li_html(lst_sel);

            init_side_nav_selected('id_side_nav', lst_sel);
        } else {
            sessionStorage.setItem("side_nav_selected_id", null);
        }
    }

}

function init_side_nav_selected(id_menu, li_elem) {
    toggle_selected(li_elem);

    var all_ancestors = all_ancestors = get_ancestors(li_elem);

    var all_sub = document.getElementsByClassName("cl_sub_nav");
    var ii;

    for (ii = 0; ii < all_sub.length; ii++) {
        var jj = all_sub[ii];
        var fst = jj.parentElement.querySelector(".nested");
        if(all_ancestors.includes(fst)){
            fst.classList.toggle("active");
            jj.classList.toggle("open");
        }
    }
}

function init_side_menu() {
    var mm1 = document.getElementById("id_side_menu");
    var mm2 = document.getElementById("id_side_nav");
    if(! (mm2 === null)){
        mm1.classList.toggle("has_side_nav");
    }
}

function init_page() {
    window.onclick = window_onclick_handler;
    init_side_nav();
    init_side_nav_closers();
    init_side_menu();
}

function debug_msg(text) {
    //var old = document.getElementById('DEBUG').innerHTML;
    //document.getElementById('DEBUG').innerHTML = old + '<br>' + text;
}

function dbg_add_li_html(li_elem){
    if(li_elem.firstElementChild === null){
        debug_msg(li_elem.nodeName + ": " + li_elem.innerHTML);
    } else {
        debug_msg(li_elem.nodeName + ": " + li_elem.firstElementChild.innerHTML);
    }
}


/*
    debug_msg("window.onclick " + event.target);

        if(! nn.contains(event.target)){
            document.getElementsByTagName("BODY")[0].style.backgroundColor = "yellow";

document.getElementById('myID').scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
        });

*/
