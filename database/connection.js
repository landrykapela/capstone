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
		con.query("DROP TABLE IF EXISTS "+tableName,(error,result)=>{
			con.query(sql,(error, result)=>{
				if(error){
					throw error;
				}
				console.log(result);
			});
		});

	});

};
exports.findSingleRecord = (con,options,model) =>{
	// options: {conditions:[{variable: "email", operation: "=", value: "landry@gmail.com"}]}

		return new Promise((resolve,reject)=>{
			con.connect(function(error){
				if(error){
					reject(error);
				}
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
					 if(error) reject(error);
					 console.log(result);
					 resolve(result);
				});
			});
		});
		// if(error) throw error;

};

exports.insertSingleRecord = (con,table,data) =>{
	return new Promise((resolve,reject)=>{
		con.connect((error)=>{
			if(error){
				reject(error);
			}
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

			con.query(sql,(result)=>{
			resolve(result);
			});
		});
	});

};

exports.updateRecord = (con, table,data,condition) =>{
	return new Promise((resolve,reject)=>{
		con.connect((error)=>{
			if(error) reject(error);
			let sql = "UPDATE " + table + " SET ";
			//values to set
			let x = "";
			//condition
			let y = "";
			let keys = Object.keys(data);
			let values = Object.values(data);
			for(let k=0; k<keys.length;k++){
				if(k < keys.length -1) {
					 x += keys[k] + "=" + values[k] + ",";
				}
				else {
					 x += keys[k] + "=" + values[k];
				}
			}
			let condition_keys = Object.keys(condition[0]);
			let condition_values = Object.values(condition[0]);
			let operations = condition[1];
			let logics = condition[2];
			for(let p=0; p < condition_keys.length;p++){
				if(p == 0){
					y += condition_keys[p] + operations[p] + condition_values[p];
				}
				else if (p > 0) {
					y += " " + logics[p] + " " + condition_keys[p] + operations[p] + condition_values[p];
				}
			}
			sql += x;
			sql += " WHERE " + y;
			con.query(sql,(result)=>{

				resolve(result);
			})
		});
	});
}
