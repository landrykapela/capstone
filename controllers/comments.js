
const db = require('../database/connection');

exports.postComment = (req,res,next)=>{
  let author = req.body.userId;
  let message= req.body.message;
  let timestamp = new Date().getTime();
  let parent = (!req.body.parent) ? -1 : req.body.parent;
  let commentObj = {commentId:null,author:author,message:message,timestamp: timestamp,parent:parent};
  let con = db.connect();

  let tableName = "comments";
  db.tableExists(con,tableName)
    .then((result)=>{
      db.insertSingleRecord(con,tableName,commentObj)
      .then(()=>{
        let msg = "Comment was successfully posted";
          console.log(msg);
          res.status(201).json({message:msg});
      })
      .catch((error)=>{
        console.error(error);
        res.status(400).json({error:error});
      });
     })
     .catch((error)=>{
       if(error.code){
         console.error(error);
         let err = "An error occurred, please report to the site administrator";
         res.status(400).json({error:err});
       }
       else{
         db.createTable(con,{tableName: tableName,fields:[{name:"message",type: "varchar",field_size: 1024,required: true},{name:"author",type: "int",field_size:10,required: true},{name: "parent",type: "int",field_size: 10,default:-1},{name: "timestamp",type: "bigint"}]})
         .then((result)=>{
           db.insertSingleRecord(con,tableName,commentObj)
           .then(()=>{
               console.log("Query was successful");
               res.status(201).json({message:"Query was successful"});
           })
           .catch((error)=>{
             console.error(error);
             let err = "An error occurred while creating new record";
             res.status(400).json({error:err});
           });
         })
         .catch((error)=>{
           console.error(error);
           let err = "An error occurred while creating table comments";
           res.status(400).json({error:err});
         });
       }
     });
}

//conroller function to get comment using specified id;
exports.getCommentById = (req, res, next) =>{
  let comment_id = req.params.id;
  let con = db.connect();
  let conditions = [{variable:"id",value:comment_id,operation:"="}];
  //retrieve single record
  db.findSingleRecord(con,"comments",conditions)
  .then((comment)=>{
    db.findManyRecords(con,"comments",[],{order_by:"timestamp",order:"asc"},[{variable:"parent",operation:"=",value:comment_id}])
    .then((result)=>{
      if(result.length == 1) result = result[0];
      let jsonString = JSON.stringify(result);
      let jsonObject = JSON.parse(jsonString);
      console.log(jsonObject);
      comment[0].replies = jsonObject;
      res.status(200).json({comment:comment});
    })
    .catch(()=>{
      let err = "Could not retrieve comment replies";
      comment[0].replies = err;
      res.status(200).json({comment:comment});
    });
  })
  .catch((error)=>{
    console.error(error);
    let err = "Could not retrieve comment with id: "+comment_id;
    res.status(400).json({error:err});
  });
}

//edit comment with given id;
exports.editComment = (req,res,next)=>{
  let comment_id = req.params.id;
  let message = req.body.message;
  let con = db.connect();
  db.updateRecord(con,"comments",{message:message},[{variable:"id",operation:"=",value:comment_id}])
  .then((result)=>{
    console.log(result);
    res.status(201).json({message:result});
  })
  .catch((error)=>{
    console.error(error);
    let err = "Could not update comment";
    res.status(400).json({error:err});
  });
}

exports.deleteComment = (req,res,next)=>{
  let comment_id = req.params.id;
  let con = db.connect();
  db.deleteOneRecord(con,"comments",[{variable:"id",operation:"=",value:comment_id}])
  .then((result)=>{
    console.log(result);
    res.status(201).json({message:"Record successfully deleted"});
  })
  .catch((error)=>{
    console.error(error);
    let err = "Could not delete record!";
    res.status(400).json({error:err});
  });
}
//controller for getting all comments
exports.getAllComments = (req,res,next)=>{
  let con = db.connect();
  db.findManyRecords(con,"comments",[],{order_by:"timestamp",order:"desc"},[{variable:"parent",operation:"=",value:"-1"}])
    .then((result)=>{
      // console.log(result);
      if(result.length == 1) result = result[0];
      let jsonString = JSON.stringify(result);
      let jsonObject = JSON.parse(jsonString);
      console.log(jsonObject);

      res.status(200).json({result:jsonObject});
    })
    .catch((error)=>{
      console.error(error);
      let err = "An error occurred while retrieving comments";
      res.status(400).json({error:err});
    });
}
