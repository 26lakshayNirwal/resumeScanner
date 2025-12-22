import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, message: "User registered successfully", data: user });
};

// @desc    Login user & get tokens
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.matchPassword(req.body.password)))
    return res.status(401).json({ success: false, message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({ success: true, message: "Login successful", data: { accessToken, refreshToken } });
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user, { refreshToken: null });
  res.json({ success: true, message: "Logged out successfully" });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const me = async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json({ success: true, data: user });
};
