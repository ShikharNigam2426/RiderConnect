import pool from "../database/db.js";
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        await pool.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)',
            [username, email, hash]);

        res.status(200).send('User successfully added');
    } catch (error) {
        console.error("Error in user registration:", error.message);
        res.status(500).send('An error occurred while inserting the user');
    }
};

export default registerUser;
