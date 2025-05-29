import jwt from 'jsonwebtoken';
export const GenerateSignature = async (adminId) => {
    return jwt.sign({ adminId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};