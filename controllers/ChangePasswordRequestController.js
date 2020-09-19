const bcrypt = require("bcryptjs");

const ChangePasswordRequestModel = require("../models/ChangePasswordRequestModel");
const User = require("../models/userModel");

class ChangePasswordRequestController {
  // Generate reset and send code via email
  async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: `A user with email = ${email} does not exist in the system`,
      });
    }

    const forgotPasswordRequest = await ChangePasswordRequestModel.update(
      {
        email: email,
      },
      {
        code: Math.floor(100000 + Math.random() * 900000),
        email: email,
      },
      {
        upsert: true,
      }
    );

    // Send the code via email
    // gmail.send(forgotPasswordRequest.code)

    return res.status(201).json({
      message: "Password Reset Code has been sent to your email",
    });
  }

  // Update with the new password
  async updatePassword(req, res) {
    let { password, repeatPassword, code } = req.body;

    if (password != repeatPassword) {
      return res.status(400).json({
        message: "Repeat password does not match",
      });
    }

    const changePasswordRequestModel = await ChangePasswordRequestModel.findOne(
      {
        code
      }
    );

    if (!changePasswordRequestModel) {
      return res.status(400).json({
        message: "Invalid code",
      });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await User.updateOne(
      { email: changePasswordRequestModel.email },
      {
        password,
      }
    );

    return res.status(201).json({
      message: "Password has been successfully reset!!",
    });
  }
}

module.exports = new ChangePasswordRequestController();
