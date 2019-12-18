let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require("../../server");
var expect = chai.expect;
const userData = require("../../app/Http/controller/userDataClass");
const data =  new userData();
//Our parent block

describe("/GET media", () => {
  token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjRjM2M2NDQ0MGRkNjQ4MDA3ZTE3NSIsImlhdCI6MTU3NjMyMjAwNH0.M79f7W3L4Ok3Jy2PshC_2hhzWytXnDh3i93U2caU9yg";
  it("it should test case",done => {
    done();
  });
});
