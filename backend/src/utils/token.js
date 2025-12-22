import jwt from "jsonwebtoken";

/**
 * Generates a short-lived JWT access token.
 * @param {string} userId - The user's ID
 * @returns {string} JWT Access Token
 */
export const generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  });

/**
 * Generates a long-lived JWT refresh token.
 * @param {string} userId - The user's ID
 * @returns {string} JWT Refresh Token
 */
export const generateRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  });
