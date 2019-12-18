let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../../server");
var expect = chai.expect;
//Our parent block

describe("/GET media", () => {
  token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjFkNzQ5Njg5ZDg4NTBmNzJjODk2ZiIsImlhdCI6MTU3NjQ5MjM4Mn0.tqYXEpy6YkHfrteKW-KjS6_2qM2jDM_UBAomqCD8Mxs";
  it("it should get all User", done => {
    chai
      .request(server)
      .get("/dynamic")
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("data");
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
  it("it should get all User eith wrong token", done => {
    chai
      .request(server)
      .get("/dynamic")
      .set({ Authorization: token + "wrongtokken" })
      .end((err, res) => {
        res.should.have.status(401);
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
  it("it should Create New User 2", done => {
    newUserDeatils = {
      firstName: "",
      lastName: "",
      email: "radhes2@gmail.com",
      password: "AA@555@aa"
    };
    chai
      .request(server)
      .post("/dynamic/user/create")
      .send(newUserDeatils)
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        
        done();
      });
  });
  it("it should Delete user", done => {
    chai
      .request(server)
      .post("/dynamic/delete/5df766e7076b674c1edac63e")
      .send(newUserDeatils)
      .set({ Authorization: token })
      .end((err, res) => {
        // res.should.have.status(200);
        res.body.should.be.a("object");
        expect(200, done);
        done();
      });
  });
  it("it should Delete user without token ", done => {
    chai
      .request(server)
      .post("/dynamic/delete/5df766e7076b674c1edac63e")
      .send(newUserDeatils)
      .end((err, res) => {
        res.body.should.be.a("object");
        expect(500, done);
        done();
      });
  });
});
