import jwt from 'jsonwebtoken'
export const ValidateUserSignature = async (req, res, next) => {
  const token = req.cookies["cira_user_auth_token"];
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
    const token = req.cookies["cira_responder_auth_token"];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.responder = decoded;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
};