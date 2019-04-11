//main class definition for user
class User {
	constructor(data){
		this._id = data.id;
		this.email = data.email;
		this.role  = data.role;
		this.password = data.password;
		this.lastLoggedInAt = data.lastLoggedInAt;
}
}
