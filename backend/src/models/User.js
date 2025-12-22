import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema
 * Defines the structure for user documents in MongoDB.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  email: { 
    type: String, 
    unique: true,
    required: [true, "Please add an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true // Automatically manage createdAt and updatedAt
});

/**
 * Pre-save middleware to hash password before saving to database.
 */
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Method to compare entered password with hashed password in database.
 * @param {string} enteredPassword 
 * @returns {boolean}
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
