import pool from "../database/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT name, password FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(500).send('No user found');
        }
        else {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(404).send('Wrong email or password');
            }

            // jwt token generation
            const token = jwt.sign({ ...user }, process.env.JWT_SECRET, { expiresIn: "1h" })
            console.log(token);
            res.cookie("token", token);
            return res.status(200).send(token);
        }
    } catch (error) {
        console.error("Login k catch mein error aayi h : " + error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export default LoginUser;