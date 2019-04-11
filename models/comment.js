//class definition for comments
class Comment{
	constructor(data){
		this.data = data;
	}
	getId(){
		return this.data.commentId;
	}
	getMessage(){
		return this.data.message;
	}
	getAuthor(){
		return this.data.author;
	}
	getTimestamp(){
		return this.data.timestamp;
	}
	getParent(){
		return (!this.data.parent || this.data.parent === -1) ? -1 : this.data.parent;
	}
	isReply(){
		if(this.parent && this.parent != -1){
			return true;
		}
		else{
			return false;
		}
	}
}
module.exports = Comment;
