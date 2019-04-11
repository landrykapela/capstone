const Moderator = require('./moderator');

//admin class inherits from moderator
class Admin extends Moderator {
	constructor(data){

	}
	editComment(id){
		alert("Modify Comment with ID: "+id+"?");
	}

}
export default Admin;
