
var jsdom = require("jsdom");
var fs = require('fs');

const { JSDOM } = jsdom;

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME [from_depth]');
  process.exit(1);
}

var file = process.argv[2];
var from_depth = 3;
if(process.argv.length > 3){
    from_depth = process.argv[3];
}

JSDOM.fromFile(file).then(dom => {
    fix_file(dom);
});

function get_ancestors(elem) {
    const MAX_LEVELS_SIDE_NAV = 100;
    const all_ancestors = [];
    var ii = 0;
    var pp = elem;
    for (ii = 0; ii < MAX_LEVELS_SIDE_NAV; ii++) {
        if(pp === null){
            break;
        }
        pp = pp.parentElement;
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

function get_depth(elem) {
    return get_ancestors(elem).length;
}

function fix_file(dom){
    const SUB_NAV_ICON = '<i class="fa fa-caret-down"></i>';
    
    const document = dom.window.document;
    const all_li = document.getElementsByTagName("li");
    var ii;

    for (ii = 0; ii < all_li.length; ii++) {
        let jj = all_li[ii];
        
        var first_ul = jj.querySelector("ul");
        var dpth = get_depth(first_ul);
        if(! (first_ul === null) && (dpth > from_depth)){
            first_ul.classList.toggle("nested");
            var first_a = jj.querySelector("a");
            if(! (first_a === null)){
                first_a.classList.toggle("cl_sub_nav");
                first_a.innerHTML = first_a.innerHTML + SUB_NAV_ICON;
            }
        }
    }

    var first_nav = document.querySelector("ul");
    if(! (first_nav === null)){
        console.log(first_nav.innerHTML);
    } else {
        console.log("<!-- FILE WITHOTH LISTS !!! -->");
    }
}


