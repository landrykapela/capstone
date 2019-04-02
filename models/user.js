//main class definition for user
class User {
	constructor(data){
		this._id = data.id;
		this.email = data.email;
		this.role  = data.role;
		this.password = data.password;
		this.lastLoggedInAt = data.lastLoggedInAt;

		//bind methods to object context
		// this.getEmail = this.getEmail.bind(this);
		// this.setEmail = this.setEmail.bind(this);
		// this.getRole = this.getRole.bind(this);
		// this.setRole = this.setRole.bind(this);
		// this.getPassword = this.getPassword.bind(this);
		// this.setPassword = this.setPassword.bind(this);
		// this.setLastLoggedInAt = this.setLastLoggedInAt.bind(this);
		// this.getLastLoggedInAt = this.getLastLoggedInAt.bind(this);
	}
	login(){
		this.setLastLoggedInAt(+ new Date());
	}
	logout(){
		console.log("User just logged out");
	}
	getUserId(){
		return this._id;
	}
	setUserId(id){
		this._id = id;
	}
	getEmail(){
		return this.email;
	}
	setEmail(email){
		this.email = email;
	}

	getRole(){
		return this.role;
	}
	setrole(role){
		this.role = role;
	}

	getPassword(){
		return this.password;
	}
	setPassword(password){
		this.password = password;
	}

	setLastLoggedInAt(timestamp){
		this.lastLoggedInAt = timestamp;
	}
	getLastLoggedInAt(){
		return this.lastLoggedInAt;
	}

}
module.exports = User;
