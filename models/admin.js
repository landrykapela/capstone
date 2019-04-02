const Moderator = require('./moderator');

//admin class inherits from moderator
class Admin extends Moderator {
	constructor(data){
	super(data);

		this.canEditAnyComment = this.canEditAnyComment.bind(this);

	}
	canEditAnyComment(){
		return true;
	}

}
export default Admin;
