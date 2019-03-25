const db = require('mysql');

//initiate connection to mysql database
exports.connect = () =>{
	return con = db.createConnection({host: "localhost", user: "root", password: "root", database: "capstone_db", port: 8889});
	
};
exports.createTable = (con,data) =>{
	con.connect(function(error){
		if(error) throw error;
		let tableName = data.tableName;
		let fields = data.fields;
		let sql = "CREATE TABLE IF NOT EXISTS " + tableName + "(id int(10) auto_increment primary key, ";
		for(let i=0; i< fields.length; i++){
			let length = (fields[i].field_size !== undefined) ? "("+fields[i].field_size +")" : "" ;
			let required = (fields[i].required === true) ? " NOT NULL" : "";
			let unique  = (fields[i].unique !== undefined) ? ", UNIQUE KEY unique_" + fields[i].name+"("+fields[i].name+")" : "";
			let field = fields[i].name + " " + fields[i].type + length + required + unique;
			if(i < fields.length -1) field += ",";
			sql += field;
		}
		sql += ")";
		console.log("Query: "+sql);
		con.query(sql,(error, result)=>{
			if(error){
				throw error;
			}
			console.log(result);
		});
	});
	
};
exports.findSingleRecord = (con,options,model) =>{
	// options: {conditions:[{variable: "email", operation: "=", value: "landry@gmail.com"}]}
	con.connect(function(error){
		// if(error) throw error;
		let table = model;
		let conditions = options.conditions;

		let sql = "SELECT * FROM " +table+" WHERE ";
		for(let i=0; i< conditions.length; i++){
			let cond = "(" + conditions[i].variable + conditions[i].operation + (typeof conditions[i].value === 'string' ? "'"+conditions[i].value+"'" : conditions[i].value) + ")";
			let next = conditions[i+1];
			if(next){
					console.log(next);
				if(next.required){
					if(i == 0) cond += " AND ";
					else cond = " AND " + cond
				}
				else {
					if( i== 0) cond += " OR ";
					else cond = " OR " + cond;
				}
			}
			sql += cond;
		}
		sql += " LIMIT 1";
		console.log("find sql: "+sql);
		con.query(sql,(error,result,fields)=>{
			// if(error) throw error;
			console.log(result);
			// return result;
		});
	});
};

exports.insertSingleRecord = (con,table,data) =>{
	con.connect((error)=>{
		let availableFields = Object.keys(data);
		let availableValues = Object.values(data);
		let values = " (";
		let fields = " (";
		for(let i=0; i< availableFields.length; i++){
			fields += availableFields[i];
			values += typeof availableValues[i] === 'string' ? "'"+ availableValues[i] + "'" : availableValues[i];
			if(i < (availableFields.length - 1)){
				fields += ",";
				values += ",";
			}
			else {
				fields += ") ";
				values += ") ";
			}
		}
		let sql = "INSERT INTO " + table + fields + "VALUES " + values;
		console.log("insert: "+ sql);
		con.query(sql,(result)=>{
		console.log(result);
			return result;
		});
	});
};
