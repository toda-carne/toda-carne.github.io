
"use strict";

function set_left(obj, bdr, lft){
	// is a func so that there are no cicles and the JSON func can be used with structures containing the obj
	obj[bdr].left = () => { return lft; };
}

function set_right(obj, bdr, rgt){
	// is a func so that there are no cicles and the JSON func can be used with structures containing the obj
	obj[bdr].right = () => { return rgt; };
}

export function init_binder(obj, bdr){
	if(obj[bdr] != null){ return; }
	obj[bdr] = {};
	set_left(obj, bdr, obj);
	set_right(obj, bdr, obj);
}

export function is_alone(obj, bdr){
	return ((obj[bdr].left() == obj) && (obj[bdr].right() == obj));
}

export function let_go(obj, bdr){
	const lft = obj[bdr].left();
	if(lft != null){
		set_right(lft, bdr, obj[bdr].right());
	}
	const rgt = obj[bdr].right();
	if(rgt != null){
		set_left(rgt, bdr, obj[bdr].left());
	}
	set_left(obj, bdr, null);
	set_right(obj, bdr, null);
}

export function ck_binder(obj, bdr){
	let ck1 = true;
	const rgt = obj[bdr].right();
	if(rgt != null){
		ck1 = (rgt[bdr].left() == obj);
	}
	let ck2 = true;
	const lft = obj[bdr].left();
	if(lft != null){
		ck2 = (lft[bdr].right() == obj);
	}
	return (ck1 && ck2);
}

export function check_all(obj, bdr){
	let lst = obj;
	const ok0 = ck_binder(obj, bdr);
	if(! ok0){ return false; }
	
	let rgt = obj[bdr].right();
	while(rgt != lst){
		const ok = ck_binder(rgt, bdr);
		if(! ok){ return false; }
		rgt = rgt[bdr].right();
	}
	return true;
}

export function bind_to_my_right(obj, bdr, rgt){
	// rgt MUST be alone
	if(! is_alone(rgt, bdr)){ return; }
	set_right(rgt, bdr, obj[bdr].right());
	set_left(rgt, bdr, obj);
	const ob_rgt = obj[bdr].right();
	if(ob_rgt != null){
		set_left(ob_rgt, bdr, rgt);
	}
	set_right(obj, bdr, rgt);
}

export function bind_to_my_left(obj, bdr, lft){
	// lft MUST be alone
	if(! is_alone(lft, bdr)){ return; }
	set_left(lft, bdr, obj[bdr].left());
	set_right(lft, bdr, obj);
	const ob_lft = obj[bdr].left();
	if(ob_lft != null){
		set_right(ob_lft, bdr, lft);
	}
	obj[bdr].left = lft;
	set_left(obj, bdr, lft);
}

export function let_all_go(obj, bdr){
	let lst = obj;
	let rgt = obj[bdr].right();
	while(rgt != lst){
		let_go(rgt, bdr);
		rgt = rgt[bdr].right();
	}
}

export function calc_size(obj, bdr){
	const lst = obj;
	let sz = 0;

	let fst = obj[bdr].right();
	let wrk = null;
	for(wrk = fst; wrk != lst; wrk = wrk[bdr].right()){
		sz++;
	}
	return sz;
}

export function is_single(obj, bdr){
	const lst = obj;
	let rgt = obj[bdr].right();
	if(rgt == lst){ return false; }
	rgt = rgt[bdr].right();
	if(rgt == lst){ return true; }
	return false;
}

export function is_multiple(obj, bdr){
	const lst = obj;
	let rgt = obj[bdr].right();
	if(rgt == lst){ return false; }
	rgt = rgt[bdr].right();
	if(rgt == lst){ return false; }
	return true;
}

export function all_to_array(obj, bdr){
	const lst = obj;
	const all_rgt = [];
	let rgt = obj[bdr].right();
	while(rgt != lst){
		all_rgt.push(rgt);
		rgt = rgt[bdr].right();
	}
	return all_rgt;
}


/*
class mc_aligned binder {
public:
	mck_sptr_t	bn_left;
	mck_sptr_t	bn_right;

	binder(){
		init_binder();
	}

	~binder(){
	}

	mc_opt_sz_fn
	void		init_binder(){
		binder* loc_ths = (binder*)mck_as_loc_pt(this);
		bn_left = loc_ths;
		bn_right = loc_ths;
	}

	mc_opt_sz_fn
	bool	is_alone(){
		binder* loc_ths = (binder*)mck_as_loc_pt(this);
		return ((bn_left == loc_ths) && (bn_right == loc_ths));
	}

	mc_opt_sz_fn //virtual // mem expensive
	void	let_go(){
		binder* loc_ths = (binder*)mck_as_loc_pt(this);
		bn_left->bn_right = bn_right;
		bn_right->bn_left = bn_left;
		bn_left = loc_ths;
		bn_right = loc_ths;
	}

	mc_opt_sz_fn
	bool	ck_binder(){
		PTD_CODE(binder* loc_ths = (binder*)mck_as_loc_pt(this));
		BINDER_CK(bn_right->bn_left == loc_ths);
		BINDER_CK(bn_left->bn_right == loc_ths);
		return true;
	}

	mc_opt_sz_fn
	binder&	get_right(){
		return *bn_right;
	}

	mc_opt_sz_fn
	binder&	get_left(){
		return *bn_left;
	}

	mc_opt_sz_fn
	binder*	get_right_pt(){
		return bn_right;
	}

	mc_opt_sz_fn
	binder*	get_left_pt(){
		return bn_left;
	}

	mc_opt_sz_fn
	void	bind_to_my_right(binder& the_rgt){
		binder* loc_ths = (binder*)mck_as_loc_pt(this);
		BINDER_CK(the_rgt.is_alone());
		BINDER_CK(ck_binder());

		the_rgt.bn_right = bn_right;
		the_rgt.bn_left = loc_ths;
		bn_right->bn_left = &the_rgt;
		bn_right = &the_rgt;

		BINDER_CK(the_rgt.ck_binder());
		BINDER_CK(ck_binder());
	}

	mc_opt_sz_fn
	void	bind_to_my_left(binder& the_lft){
		binder* loc_ths = (binder*)mck_as_loc_pt(this);
		BINDER_CK(the_lft.is_alone());
		BINDER_CK(ck_binder());

		the_lft.bn_left = bn_left;
		the_lft.bn_right = loc_ths;
		bn_left->bn_right = &the_lft;
		bn_left = &the_lft;

		BINDER_CK(the_lft.ck_binder());
		BINDER_CK(ck_binder());
	}

	mc_opt_sz_fn
	bool	is_single(){
		return (! is_alone() && (bn_left == bn_right));
	}

	mc_opt_sz_fn
	bool	is_multiple(){
		return (! is_alone() && ! is_single());
	}

	mc_opt_sz_fn
	void	move_all_to_my_right(binder& grp){
		if(grp.is_alone()){
			return;
		}
		binder* loc_ths = (binder*)mck_as_loc_pt(this);

		BINDER_CK(ck_binder());

		binder* new_rgt = grp.bn_right;
		binder* new_mid = grp.bn_left;
		binder* old_rgt = bn_right;

		grp.bn_right = &grp;
		grp.bn_left = &grp;

		bn_right = new_rgt;
		bn_right->bn_left = loc_ths;

		new_mid->bn_right = old_rgt;
		new_mid->bn_right->bn_left = new_mid;

		BINDER_CK(grp.is_alone());
		BINDER_CK(new_rgt->ck_binder());
		BINDER_CK(new_mid->ck_binder());
		BINDER_CK(old_rgt->ck_binder());
		BINDER_CK(ck_binder());
	}

	mc_opt_sz_fn
	void	move_all_to_my_left(binder& grp){
		if(grp.is_alone()){
			return;
		}
		binder* loc_ths = (binder*)mck_as_loc_pt(this);

		BINDER_CK(ck_binder());

		binder* new_lft = grp.bn_left;
		binder* new_mid = grp.bn_right;
		binder* old_lft = bn_left;

		grp.bn_right = &grp;
		grp.bn_left = &grp;

		bn_left = new_lft;
		bn_left->bn_right = loc_ths;

		new_mid->bn_left = old_lft;
		new_mid->bn_left->bn_right = new_mid;

		BINDER_CK(grp.is_alone());
		BINDER_CK(new_lft->ck_binder());
		BINDER_CK(new_mid->ck_binder());
		BINDER_CK(old_lft->ck_binder());
		BINDER_CK(ck_binder());
	}

	mc_opt_sz_fn
	void 	let_all_go(){
		while(! is_alone()){
			bn_right->let_go();
		}
	}

	mc_size_t	calc_size() mc_external_code_ram;
};

mc_size_t
binder::calc_size(){
	// for debug purposes (it only work on local binders)
	binder* loc_ths = (binder*)mck_as_loc_pt(this);
	binder * fst, * lst, * wrk;
	mc_size_t sz = 0;

	fst = loc_ths->bn_right;
	lst = loc_ths;
	for(wrk = fst; wrk != lst; wrk = wrk->bn_right){
		sz++;
	}
	return sz;
}

*/

