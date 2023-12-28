const express = require("express");

const app = express();

const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const statusController = require("../controllers/status");

describe("Status Controller - Get Status", function() {
  before(function() {
    mongoose
      .connect(
        "mongodb+srv://ibekweemmanuel007:(STARtrek1999)@cluster0.5aiiow7.mongodb.net/test-messages"
      )
      .then(result => {
        const user = new User({
          email: "test@test.com",
          password: "password",
          name: "Test",
          posts: [],
          _id: "5c0f66b979af55031b34728a"
        });
        return user.save();
      });
  });

  it("should send  message with a valid user status for an existing user", async function() {
    const req = { userId: "5c0f66b979af55031b34728a" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.userStatus = data.status;
      }
    };
    statusController
      .getStatus(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.userStatus).to.be.equal("I am new!");
      });
  });

  after(function() {
    User.deleteMany({}).then(() => {
      mongoose.disconnect().then(() => {});
    });
  });

  // beforeEach(function() {});
  // afterEach(function() {});
});
