const express = require("express");
const app = express();

const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const io = require("../socket");
const User = require("../models/user");
const FeedController = require("../controllers/feed");

describe("Feed Controller - Get Status", function() {
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

  // beforeEach(function() {});
  // afterEach(function() {});

  it("should add a created post to the posts of the creator", async function() {
    this.timeout(20000);

    sinon.stub(io, "getIO");
    io.getIO.returns({ emit: function() {} });

    const req = {
      body: {
        title: "Test Post",
        content: "A Test Post"
      },
      file: {
        path: "abc\\"
      },
      userId: "5c0f66b979af55031b34728a"
    };

    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };

    await FeedController.createPost(req, res, () => {}).then(savedUser => {
      console.log(savedUser);
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      io.getIO.restore();
    });
    // .catch(error => {
    //   console.log(error);
    // });
  });

  after(function() {
    User.deleteMany({}).then(() => {
      mongoose.disconnect().then(() => {});
    });
  });
});
