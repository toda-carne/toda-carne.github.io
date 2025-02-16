/*
 * var child = document.getElementById('my_element');
var parent = child.parentNode;
// The equivalent of parent.children.indexOf(child)
var index = Array.prototype.indexOf.call(parent.children, child);
*/
/*
async function get_photo_url() {
	try {
		const the_usr = fb_get_user();
		if(the_usr == null){ return; }
		
		const options = {
			//method: 'GET',
			headers: new Headers({'content-type': 'image/jpeg'}),
			mode: 'no-cors'
		};
		const response = await fetch(the_usr.photoURL, options);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		
		//const json = await response.json();
		
		let dv_img = document.getElementById(id_dv_user_image);
		if(dv_img != null){ dv_img.innerHTML = `<img class="img_observ" src="${the_usr.photoURL}">`; }
		
		const dv_img2 = document.getElementById("id_top_user_picture");
		//if(dv_img2 != null){ dv_img2.src = the_usr.photoURL; }	
		
		//console.log(json);
	} catch (error) {
		console.error(error.message);
	}
}
*/

