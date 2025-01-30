
const fs = require('fs');

if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' <file_name>');
	process.exit(1);
}

const file_nm = process.argv[2];


function test_import(fnam){
	const mod_nm = fnam;
	
	//import(mod_nm, { with: { type: "module" } })
	//import(mod_nm, { with: { "resolution-mode": "require"} })
	//import(mod_nm, { with: { type: "ES" } })
	import(mod_nm)
	.then((module) => {
		if(module != null) { 
			console.log("imported bib_version: " + module.bib_version);
			console.log("imported book: " + module.book);
			console.log("imported chapter: " + module.chapter);
			console.log("imported verses: " + JSON.stringify(module.verses, null, "  "));
		}
		
	})
	.catch((err) => {
		console.log(`Could NOT import ${mod_nm} err:` + err.message);
	});
}

test_import(file_nm);