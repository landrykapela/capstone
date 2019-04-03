const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
	console.log("Checking auth token...");
	const bp = require('body-parser');
	// req.body = bp.json(req.body);
	try {
		// console.log("getting the headers...");
		let token = req.headers.authorization.split(" ")[1];
		console.log(token);
		let decodedToken = jwt.verify(token, 'secret_random');
		// console.log("verifying token...");
		// console.log(decodedToken);
		let userId = decodedToken.userId;


		if(req.body.userId && req.body.userId !== userId){
			let error = new Error("Invalid User ID");
			console.error(error);
			res.status(401).json({error:error});
		}
		else{
			next();
		}

	}
	catch{
		console.log("Braaaaapt");
		let error = "Invalid Request";
		res.status(401).json({error: error});
	}
};
