
import userService from "../services/user.service.js";
async function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Session expired, please login."
            });
        }

        const user = await userService.getUserByToken(token);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token, please login again."
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication failed. Try again."
        });
    }
}

export default authenticate;