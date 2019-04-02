const User = require('./user');

//moderator class inherits from main user
class Moderator extends User {
	constructor(data){
	super(data);

		this.canDeleteAnyComment = this.canDeleteAnyComment.bind(this);

	}
	canDeleteAnyComment(){
		return true;
	}

}
module.exports = Moderator;
