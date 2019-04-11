const User = require('./user');

//moderator class inherits from main user
class Moderator extends User {
	constructor(data){
	super(data);
	}
	deleteComment(id){
		alert("This will delete comment with ID: "+id);
	}

}
