import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const GenerateUserSignature = async (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const GenerateResSignature = async (responderId) => {
    return jwt.sign({ responderId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const passwordCompare = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};