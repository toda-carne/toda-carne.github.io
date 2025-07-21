

export function hola(){
	console.log("HOLA MUNDO");
}

export class MiClase {
	constructor(nm){
		this.nom = nm;
	}
	
	saludar(){
		return "HOLA " + this.nom + " !!";
	}
};

/*
module.exports = {
	hola: hola, 
	MiClase: MiClase,
};
*/

//Object.defineProperty(exports, "hola", { value: hola });
//Object.defineProperty(exports, "MiClase", { value: MiClase });
/*
exports.hola = hola;
exports.MiClase = MiClase;
exports.default = MiClase;

*/