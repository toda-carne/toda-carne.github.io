
const fs = require('fs');

if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' <file_name>');
	process.exit(1);
}

const file_nm = process.argv[2];


function test_import(fnam){
	const mod_nm = fnam;
	
	import(mod_nm)
	.then((module) => {
		if(module != null) { 
			console.log("imported code_kind: " + module.code_kind);
			console.log("imported code: " + module.code);
			console.log("imported verses: " + JSON.stringify(module.verses, null, "  "));
		}
		
	})
	.catch((err) => {
		console.log(`Could NOT import ${mod_nm} err:` + err.message);
	});
}

test_import(file_nm);