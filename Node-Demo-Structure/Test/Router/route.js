let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../../server");
var expect = chai.expect;
//Our parent block

describe("/Api testing", () => {
  token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjFkNzQ5Njg5ZDg4NTBmNzJjODk2ZiIsImlhdCI6MTU3NjM4MTA0NX0.qnvT435AAG21wHYCxuEvIpFj3KnG4wj2edyQEIqQQ_U";
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
  it("it should get all User withut token", done => {
    chai
      .request(server)
      .get("/dynamic")
      .end((err, res) => {
        res.should.have.status(500);
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
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should Create New User", done => {
    newUserDeatils = {
      firstName: "kajal",
      lastName: "Prajapati",
      email: "kajalaaa@gmail.com",
      password: "AA@555@aa"
    };
    chai
      .request(server)
      .post("/dynamic/user/create")
      .send(newUserDeatils)
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should Delete user", done => {
    chai
      .request(server)
      .delete("/dynamic/delete/5df7261a16fa1165a37d8d3a")
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
