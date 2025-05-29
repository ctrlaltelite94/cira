import { ValidateUserSignature } from "../utility/AuthUtility/Authenticate.js"

export const Authenticate = async (req, res, next) => {
    const validate = await ValidateUserSignature(req);

    if (!validate) return res.status(400).json({ message: "User not authorized" });
    next();
}