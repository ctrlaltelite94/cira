import jwt from 'jsonwebtoken'
export const ValidateUserSignature = async (req) => {
    const token = req.cookies["cira_user_auth_token"];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.admin = decoded;
      return decoded;
    } catch {
      return null;
    }
};

export const ValidateResponderSignature = async (req) => {
    const token = req.cookies["cira_user_auth_token"];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.admin = decoded;
      return decoded;
    } catch {
      return null;
    }
};