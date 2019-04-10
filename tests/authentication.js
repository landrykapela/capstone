const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

process.env.NODE_ENV = "test";

//getting user request object

let credentials = {email: 'user@capstone.com',password:'nopassword'};
let w = {email: 'user@capstone.com',password:'nopasswordss'};
//let credentials = {email: 'user@capstone.com',password:'nopassword'};
let correct = true;
/**
* Testing user authentication
*
**/
describe('USER LOGIN',function(done){
  if(credentials.password === w.password) correct = false;
  let authenticatedUser = request.agent(app);
  if(correct){
    it('should respond with a json object result containing userId of 2', (done)=>{
      authenticatedUser
      .post('/api/auth/login')
      .send(credentials)
      .end((error,response)=>{
        let res = JSON.parse(response.text);
        if(res.result){
          expect(response.statusCode).to.equal(200);
          expect(res.result.userId).to.equal(2);

        }
      });
      done();
    });
  }
  it('should respond with a json object error containing error message', (done)=>{
    authenticatedUser
    .post('/api/auth/login')
    .send(credentials)
    .end((error,response)=>{
      let res = JSON.parse(response.text);
      if(res.error){
        expect(response.statusCode).to.equal(400);
        expect(res.error).to.equal("Incorrect password");
      }

    });
    done();
  });
});

/**
* Test to create new newser
*
**/
describe('USER SIGNUP', (done)=>{
  it('should return a 201 Created', (done)=>{
    let userData = {email:'testUser4@capstone.com',password:'testpassword'};
    request(app)
    .post('/api/auth/signup')
    .send(userData)
    .end((err,res)=>{
      console.log(JSON.parse(res.text));
      expect(res.statusCode).to.equal(201);
      expect(JSON.parse(res.text).result).not.to.equal(null);
    })
    done();
  });
});

/**
* Test to update user data
**/

describe('UPDATE USER', (done)=>{
  let user_id = 4;
  let data = {role:1,email:'testUser2@capstone.com'};
  it('should return 201 created', (done)=>{
    request(app)
    .put('/api/auth/'+user_id)
    .send(data)
    .end((err,res)=>{
      console.log(JSON.parse(res.text));
      expect(res.statusCode).to.equal(201);
    });
  done();
  });
});
