import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for authentication.
 * @param {Object} user - The user object containing at least an ID.
 * @param {string} expiresIn - Token expiration time (default: '1h').
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (user, expiresIn = '1h') => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn,
  });
};
