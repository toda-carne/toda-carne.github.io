
import { is_observation, } from '../code/bq_quest_mgr.js';
import { get_qid_base, glb_poll_db, } from '../code/bq_tools.js';

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' <MODULE_FILENAME>');
  process.exit(1);
}

const bq_module = process.argv[2];

console.log("PROCESSING MODULE=" + bq_module);
init_module_db();

function init_module_db(){
	import(bq_module)
	.then((module) => {
		console.log("Calling init_exam_database of " + bq_module);
		module.init_exam_database();
		print_all_observation_qids();
	})
	.catch((err) => {
		console.log("Could NOT import '${mod_nm}' err:" + err.message);
	});	
}

function can_print_qid(qid){
	if(get_qid_base(qid) == null){ return false; }
	const quest = glb_poll_db[qid];
	if(! is_observation(quest)){ return false; }
	if(quest.keep_score == false){ return false; }
	return true;
}

function print_all_observation_qids(){
	const all_qids = Object.keys(glb_poll_db);
	for(const qid of all_qids){
		if(can_print_qid(qid)){
			console.log(qid);
		}
	}
}
