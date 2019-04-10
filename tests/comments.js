const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

process.env.NODE_ENV = "test";


/**
* Test to check comments authenticated route
*
**/
//

let user = {email: 'user@capstone.com',id:2};
before((done)=>{
  user.lastLoggedInAt = + new Date();
  //expect()
  done();
});

//first test api to get all comments
describe('GET ALL COMMENTS', (done)=>{

      it('should return 200 OK with an array of comments', (done)=>{
        request(app)
          .get('/api/comments')
          .expect(200,done);
      });
});

//second test api to get single comment using id
describe('GET SINGLE COMMENT BY ID', (done)=>{
  let id = 3;
  it('should return 200 OK with a comments object with comment id='+id, (done)=>{
    request(app)
      .get('/api/comments/'+id)
      .end((err,res)=>{
        let r = JSON.parse(res.text);
        console.log(r);
        expect(r.comment[0].id).to.equal(id);
        expect(res.statusCode).to.equal(200);
      });
      done();
  });

});

//third test api to edit single comment
describe('EDIT SINGLE COMMENT', (done)=>{
  let comment_id = 3;
  let data = {message :"'Updated comment message here'"};
  it('should return a 201 OK with message object',(done)=>{
    request(app)
    .put('/api/comments/'+comment_id)
    .send(data)
    .end((err,res)=>{
      let r = JSON.parse(res.text);

      expect(res.statusCode).to.equal(201);
      expect(r.message).not.to.equal(null);
    });
    done();
  });
});

//fourth test api to delete single comment
describe('DELETE SINGLE COMMENT', (done)=>{
  let comment_id = 2;
  let message = "Record successfully deleted";
  it('should return a 201 OK with message '+message,(done)=>{
    request(app)
    .delete('/api/comments/'+comment_id)
    .end((err,res)=>{
      let r = JSON.parse(res.text);

      expect(res.statusCode).to.equal(201);
      expect(r.message).to.equal(message);
    });
    done();
  });
});

//fith test api to create new comment
describe('CREATE NEW COMMENT', (done)=>{
  let user = {email: 'user@capstone.com',id:2};
  let timestamp = new Date().getTime();
  let comment = {userId:user.id,message:"This is a test comment",parent:-1};
  let res_msg = "Comment was successfully posted";
  it('should return 201 OK with message '+res_msg, (done)=>{
    request(app)
    .post('/api/comments')
    .send(comment)
    .end((err,res)=>{
      expect(res.statusCode).to.equal(201);
      expect(JSON.parse(res.text).message).to.equal(res_msg);
    });
    done();
  });
});
