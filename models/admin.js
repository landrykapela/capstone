const Moderator = require('./moderator');

//admin class inherits from moderator
class Admin extends Moderator {
	constructor(data){
		super(data);
	}
	editComment(id){
		alert("Modify Comment with ID: "+id+"?");
	}

}
