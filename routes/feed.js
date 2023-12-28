const express = require("express");
const postValidator = require("../middleware/post-validation");

const router = express.Router();
const feedController = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

router.get("/posts", isAuth, feedController.getPosts);

router.post("/post", isAuth, postValidator, feedController.createPost);

router.get("/posts/:postId", isAuth, feedController.getPost);

router.patch("/post/:postId", isAuth, postValidator, feedController.updatePost);

router.delete("/post/:postId", isAuth, feedController.deletePost);


module.exports = router;
