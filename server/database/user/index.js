import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);

// attachments
UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({user:this._id.toString()},process.env.JWT_SECRET)
};

// helper functions
UserSchema.statics.findByEmailAndPhone = async ({email,phoneNumber}) => {
  const checkUserByEmail = await UserModel.findOne({email});
  const checkUserByPhone = await UserModel.findOne({phoneNumber})

  if(checkUserByEmail || checkUserByPhone){
    throw new Error("User already exist...")
  }
  return false;
};

UserSchema.statics.findByEmailAndPassword = async ({email,password}) => {
  const user = await UserModel.findOne({email});
  if(!user) throw new Error("User doesn't exist.....")

  //Compare password
  const doespasswordMatch = bcrypt.compare(password,user.password);
  if(!doespasswordMatch) throw new Error("Invalid Credentials !!!")

  return user;
};

// Pre-save hook to hash the password
UserSchema.pre("save", async function (next) {
  const user = this;
  // If password is not modified, move to next middleware
  if (!user.isModified("password")) return next();

  try {
    // Generate bcrypt salt
    const salt = await bcrypt.genSalt(8);
    // Hash the password
    const hash = await bcrypt.hash(user.password, salt);
    // Assign hashed password
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model("users", UserSchema);