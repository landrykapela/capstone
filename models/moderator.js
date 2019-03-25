const User = require('./user');

//moderator class inherits from main user
class Moderator extends User {
	constructor(data){
	super(data);
		
		this.canEditComment = this.canEditComment.bind(this);
		
	}
	canEditComment(){
		return true;
	}

}
export default Moderator;