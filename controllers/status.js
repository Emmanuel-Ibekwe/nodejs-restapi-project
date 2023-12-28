const User = require("../models/user");

exports.getStatus = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      const error = new Error("invalid user.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  const userId = req.userId;
  const status = req.body.status;
  try {
    const user = User.findById(userId);
    if (!user) {
      const error = new Error("invalid user.");
      error.statusCode = 404;
      throw error;
    }

    user.status = status;
    console.log(status);
    const result = await user.save();
    res.status(200).json({ message: "Status updated successfully." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
