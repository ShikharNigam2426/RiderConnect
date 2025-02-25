import express from 'express';
import dotenv from 'dotenv'
import registerUser from './Controllers/userRegister.js';
import cors from 'cors';
import LoginUser from './Controllers/userLogin.js';
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.post('/register', registerUser);
app.post('/login', LoginUser);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

