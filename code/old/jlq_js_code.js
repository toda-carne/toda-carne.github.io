
// enum.js

/*
export function Enum(baseEnum) {  
	return new Proxy(baseEnum, {
		get(target, name) {
			if (!baseEnum.hasOwnProperty(name)) {
				throw new Error(`"${name}" value does not exist in the enum`)
			}
			return baseEnum[name]
		},
		set(target, name, value) {
			throw new Error('Cannot add a new value to the enum')
		}
	})
}

const Choice = Enum({
  single: 0,
  multiple: 1,
})

const get_name = (nombre, apellido) => {
	return `Mi nombre completo es ${nombre} ${apellido}`;
};
*/
 
