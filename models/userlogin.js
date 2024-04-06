const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

// adminLoginSchema.pre("save", async (next) => {
//   const admin = this;
//   if (!admin.isModified("password")) return next();

//   try {
//     const hashedPassword = await bcrypt.hash(admin.password, 10);
//     admin.password = hashedPassword;
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = mongoose.model("Login", LoginSchema);
