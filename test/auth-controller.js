const express = require("express");

const app = express();

const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function() {
  it("should throw an error with code 500 if accessing the database fails", async function() {
    this.timeout(20000);
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "tester"
      }
    };

    await AuthController.login(req, {}, () => {}).then(result => {
      //   console.log(result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
    });

    User.findOne.restore();
  });
});
