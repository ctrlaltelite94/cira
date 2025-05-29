import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const GenerateSignature = async (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const passwordCompare = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};