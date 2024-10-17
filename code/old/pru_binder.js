
import { init_binder, bind_to_my_right, bind_to_my_left, all_to_array, check_all, calc_size, 
} from './tc_binder.js';

let	obj1 = { nam: "obj1"};
let	obj2 = { nam: "obj2"};
let	obj3 = { nam: "obj3"};
let	obj4 = { nam: "obj4"};
let	obj5 = { nam: "obj5"};
let	obj6 = { nam: "obj6"};
let	obj7 = { nam: "obj7"};

init_binder(obj1, "bn1");
init_binder(obj2, "bn1");
init_binder(obj3, "bn1");
init_binder(obj4, "bn1");
init_binder(obj5, "bn1");
init_binder(obj6, "bn1");
init_binder(obj7, "bn1");

bind_to_my_right(obj1, "bn1", obj2);
bind_to_my_right(obj1, "bn1", obj3);
bind_to_my_right(obj1, "bn1", obj4);
bind_to_my_left(obj1, "bn1", obj5);
bind_to_my_left(obj1, "bn1", obj6);
bind_to_my_left(obj1, "bn1", obj7);

const arr1 = all_to_array(obj1, "bn1");
const ok1 = check_all(obj1, "bn1");
const sz1 = calc_size(obj1, "bn1");

console.log("ok1 = " + ok1);
console.log("sz1 = " + sz1);
console.log(JSON.stringify(arr1, null, "  "));

/*
console.log("obj1=");
console.log(obj1);
console.log("obj1['bn1'].right=");
console.log(obj1["bn1"].right());
console.log("obj1['bn1'].left=");
console.log(obj1["bn1"].left());
console.log("obj2=");
console.log(obj2);
console.log("obj2['bn1'].right=");
console.log(obj2["bn1"].right());
console.log("obj2['bn1'].left=");
console.log(obj2["bn1"].left());
*/