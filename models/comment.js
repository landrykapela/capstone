//class definition for comments
class Comment{
	constructor(data){
		this.id = data.commentId;
		this.message = data.message;
		this.author = data.author;
		this.timestamp = data.timestamp;
		this.parent = data.parent;

	}

	isReply(){
		if(this.parent){
			return true;
		}
	}
}
module.exports = Comment;
