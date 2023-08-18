const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: emailRegex
//     },
//     password: { type: String, required: true },
//     accountType: {
//         type: String,
//         enum: ['Researcher', 'Admin', 'Participant'],
//         required: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     }
// });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
