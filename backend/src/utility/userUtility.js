import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const GenerateUserSignature = async (id, userType) => {
    return jwt.sign({ id, userType }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const GenerateResSignature = async (id, userType) => {
    return jwt.sign({ id, userType }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const passwordCompare = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};