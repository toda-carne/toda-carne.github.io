
// CODE_FOR SELECT FROM ARRAY OF OPTIONS (for example several verses)

export function get_new_dv_under(dv_header, id_dv){
	let dv_options = document.getElementById(id_dv);
	if(dv_options != null){
		var was_mine = (dv_header.nextSibling == dv_options);
		dv_options.remove();
		if(was_mine){
			//console.log("get_new_dv_under RETURNS NOTHING !!!!!");
			return null;
		}
	}
	dv_options = document.createElement("div");
	dv_header.after(dv_options);
	
	dv_options.id = id_dv;
	return dv_options;
}

export function toggle_select_option(dv_return, id_selec_men, all_options_arr, on_click_fn, menu_cls_arr, item_cls_arr){
	var dv_options = get_new_dv_under(dv_return, id_selec_men); // old id_dv_sel_option
	if(dv_options == null){
		return;
	}
	if(menu_cls_arr != null){
		dv_options.classList.add(...menu_cls_arr);
	} else {
		dv_options.classList.add("exam");
		dv_options.classList.add("is_block");
		dv_options.classList.add("grid_item_all_col");
	}
	
	let consec = 0;
	all_options_arr.forEach((value) => {
		const opt_idx = consec;
		consec++;
		const dv_opt = add_option(dv_options, null, value, null, item_cls_arr);
		dv_opt.addEventListener('click', function() {
			if(on_click_fn != null){
				on_click_fn(dv_return, dv_options, value, opt_idx);
			} else {
				dv_return.innerHTML = value;
				dv_return.selected_id = opt_idx;
				dv_options.remove();
			}
		});
	});

	scroll_to_top(dv_options);
}

function add_option(dv_parent, id_option, label, handler, item_cls_arr){
	const dv_opt = dv_parent.appendChild(document.createElement("div"));
	if(id_option != null){
		dv_opt.id = id_option;
	}
	if(item_cls_arr != null){
		dv_opt.classList.add(...item_cls_arr);
	} else {
		dv_opt.classList.add("exam");
		dv_opt.classList.add("is_option");
	}
	dv_opt.innerHTML = label;
	if(handler != null){
		dv_opt.addEventListener('click', handler);
	}
	return dv_opt; 
}

export function scroll_to_top(dv_elem) {
	if(dv_elem == null){ return; }
	const rect = dv_elem.getBoundingClientRect();
	const dv_content = document.getElementById("id_exam_content");
	if(dv_content == null){
		console.error("dv_content == null");
		return;
	}
	const rect2 = dv_content.getBoundingClientRect();
	
	const dist = (rect.top - rect2.top);
	//dv_content.scrollBy(0, dist);
	dv_content.scrollBy({
		top: dist,
		left: 0,
		behavior: "smooth",
	});
}


