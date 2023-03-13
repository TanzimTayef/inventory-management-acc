const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      // validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match!",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "store-manager", "admin"],
      default: "buyer"
    },
    firstName: {
      type: String,
      required: [true, "please provide a first name!"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },

    lastName: {
      type: String,
      required: [true, "please provide a last name!"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    contactNumber: {
      type: String,
      // validate: [
      //   validator.isMobilePhone,
      //   "Please provide a valid contact number",
      // ],
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      // validate: [validator.URL, "Please provide  valid image url."],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Before save password chage to passwrod hash:
userSchema.pre("save", function (next) {
    const password = this.password;
   
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    
    next();
})

userSchema.methods.comparePassword = function (password, hesh) {
   const isPasswordValid = bcrypt.compareSync(password, hesh)
   return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
