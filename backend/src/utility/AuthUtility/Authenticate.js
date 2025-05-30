import jwt from 'jsonwebtoken'
import User from '../../models/user.model.js';
import Responder from '../../models/responder.model.js';
export const ValidateUserSignature = async (req, res, next) => {
  const token = req.cookies["cira_auth_token"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next(); // move to the next middleware/controller
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const ValidateResponderSignature = async (req, res, next) => {
    const token = req.cookies["cira_auth_token"];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.responder = decoded;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
};

export const validateToken = async (req, res) => {
  try {
    const token = req.cookies["cira_auth_token"];
    if (!token) return res.status(401).json({ isValid: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, userType } = decoded;
    console.log(id, userType)
    let user;
    if (userType === "user") {
      user = await User.findById(id);
    } else if (userType === "responder") {
      user = await Responder.findById(id);
    }

    if (!user) return res.status(401).json({ isValid: false });

    return res.status(200).json({ isValid: true, userType, id });
  } catch (err) {
    return res.status(401).json({ isValid: false });
  }
};
