/*

const mm = require("./pru_funcs.js");

mm.hola();

const cls = mm.MiClase;

const obj = new mm.MiClase("JOSE");

console.log(obj.saludar());

*/

import {hola, MiClase} from "./pru_funcs.js";


const obj = new MiClase("JOSE");

console.log(obj.saludar());

hola();