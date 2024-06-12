import asyncHandler from "express-async-handler" // asycnHandler is a middleware that takes an async function and returns a function that can be used as a route handler. So two things can occur either 
import User from "../models/UserModel.js"; // 1. The async function throws an error, which will be caught and passed to the next function. 2. The async function returns a value, which will be passed to the next function.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }

    const existed_email = await User.findOne({ email : email });
    if (existed_email){
        res.status(400);
        throw new Error("Email already exists");
    }
    const existed_username = await User.findOne({ username: username.toLowerCase() });
    if (existed_username){
        res.status(400);
        throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword)
    const user_created = await User.create({username, email, password : hashedPassword});

    if (!user_created){
        res.status(400);
        throw new Error("User not created");
    }

    res.status(200).json(user_created);
});


const login = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if (!email || !password){
        console.log('f')
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({//payload
            username : user.username,
            email : user.email,
            id : user._id,
        }
        , 'secret' , //SecretKey
        {expiresIn : "20m"} //expiry time
    )
        res.status(200).json({accessToken}) //sending the token to the user
    }

    else{
    res.status(400);
    throw new Error("Invalid Credentials");
    }

});

const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});


export { register, login, getUser}