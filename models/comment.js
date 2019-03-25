//class definition for comments
class Comment{
	constructor(data){
		var _id = data.commentId;
		var message = data.message;
		var author = data.author;
		var timestamp = data.timestamp;
		var parent = data.parent;
		// var editor = data.editor

		this.isReply = this.isReply.bind(this);
	}

	isReply(){
		if(this.parent){
			return true;
		}
	}
}
export default Comment;