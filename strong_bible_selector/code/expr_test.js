

//import { init, formula } from 'expressionparser'
//const ep = require('expressionparser');

//const ep = require('./ExpressionParser.js');

import { isArgumentsArray, ExpressionParser } from './ExpressionParser.js'

import { get_scode_verses, } from './sf_strong_mgr.js';

/*
const parser = ep.init(ep.formula, (term) => {
	if (term === "MY_VARIABLE") {
		return 42;
	} else {
		throw new Error(`Invalid term: ${term}`);
	}
});

 const vv = parser.expressionToValue("POW(2,3) + 40"); // true
 
 console.log(vv);
 */
 
 const arithmeticLanguage = {
	 INFIX_OPS: {
		 "+": (a, b) => a() + b(),
		 "-": (a, b) => a() - b(),
		 "*": (a, b) => a() * b(),
		 "/": (a, b) => a() / b(),
		 ",": (a, b) => [a()] + b(),
	 },
	 PREFIX_OPS: {
		 //SQRT: (arg) => Math.sqrt(arg),
		 "NEG": (arg) => -arg(),
		 POW: (base, exponent) => {
			 const baseVal = base();
			 //const expVal = exponent();
			 console.log(exponent);
			 return Math.pow(baseVal, exponent);
		 },
	 },
	 PRECEDENCE: [['SQRT', 'POW', 'NEG'], ['*', '/'], ['+', '-'], [',']],
	 GROUP_OPEN: '(',
	 GROUP_CLOSE: ')',
	 SEPARATORS: [','],
	 WHITESPACE_CHARS: [" "],
	 SYMBOLS: ['(', ')', '+', '-', '*', '/', ','],
	 AMBIGUOUS: {},
	 
	 termDelegate: function(term) {
		 return parseInt(term);
	 },
	 descriptions: [
            {
                op: "POW",
                fix: "prefix",
                sig: ["base: Number", "exponent: Number", "Number"],
                text: "Returns the result of raising the base to the exponent: POW(base, exponent).",
            },
	 ],
 };
 
const par = new ExpressionParser(arithmeticLanguage);
//const expr = 'pow(1 + 1 * 2 - (10 / 2) + sqrt(16), 2)'.toUpperCase();
//const expr = 'SQRT(16)'.toUpperCase();
//const expr = '(3*(5+3)/2-1)';
const expr = '(1+3)*2';
 /*
const result = new ep.ExpressionParser(arithmeticLanguage).expressionToValue(expr);
*/

//console.log(par.tokenize(expr));

const result = par.expressionToValue(expr);
console.log(result);

// const resul = par.evaluateTokens(['1', '+', '1']);

get_scode_verses("TR", "G66").then((all_vss) => {
	console.log(all_vss);
});




