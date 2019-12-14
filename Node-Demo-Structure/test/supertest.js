let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../server");
var expect = chai.expect;
//Our parent block

describe("/GET media", () => {
  token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjRjM2M2NDQ0MGRkNjQ4MDA3ZTE3NSIsImlhdCI6MTU3NjMyMjAwNH0.M79f7W3L4Ok3Jy2PshC_2hhzWytXnDh3i93U2caU9yg";
  it("it should get all User", done => {
    chai
      .request(server)
      .get("/dynamic")
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("Login user", done => {
    const user = { email: "ghanshyam@gmail.com", password: "AA@555@aa" };
    chai
      .request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should Delete user", done => {
    chai
      .request(server)
      .delete("/dynamic/delete/5df4c3c64440dd648007e175")
      .set({ Authorization: token })
      .end((err, res) => {
        console.log(res.body);

        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should find user", done => {
    chai
      .request(server)
      .get("/dynamic/5df4c3c64440dd648007e175")
      .set({ Authorization: token })
      .end((err, res) => {
        console.log(res.body);

        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should Create New User", done => {
    newUserDeatils = {
      firstName: "Radheshyam",
      lastName: "Prajapati",
      email: "radhe@gmail.com",
      password: "AA@555@aa"
    };
    chai
      .request(server)
      .post("/dynamic/user/create")
      .send(newUserDeatils)
      .set({ Authorization: token })
      .end((err, res) => {
        // res.should.have.status(200);
        res.body.should.be.a("object");
        expect(200, done);
        done();
      });
  });
});
