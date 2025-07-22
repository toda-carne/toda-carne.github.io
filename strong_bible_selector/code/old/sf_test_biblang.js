

import { init_biblang, eval_biblang_command } from './sf_biblang_mgr.js'
import { gvar, } from './sf_search_mgr.js';
import { init_lang, } from './sf_lang_mgr.js';

async function main_selector(){
	if (process.argv.length < 3) {
		console.log('Usage: node ' + process.argv[1] + '<command>');
		process.exit(1);
	}

	const command = process.argv[2];
	
	gvar.dbg_biblang = true;

	init_lang('es');
	init_biblang('es');
	
	const sorvers = await eval_biblang_command(command);
	
	console.log("FINAL_RESULT");
	console.log(sorvers);	
}


main_selector();
