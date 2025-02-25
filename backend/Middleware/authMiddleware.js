import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // Step 1: Token ko cookies se uthana
    const token = req.cookies.token;

    // Step 2: Agar token nahi hai, toh Unauthorized response bhejna
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    // Step 3: Token verify karna
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Token ko decode karo
        req.user = decoded;  // Decoded data ko request object me store karo
        next();  // Agar token valid hai, toh request ko next middleware/route handler tak bhej do
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });  // Agar token invalid hai
    }
};

export default authMiddleware;
