import express from 'express';
import {register, login, getUser} from '../controllers/userController.js';
import emailHandler from '../middlewares/emailHandler.js';
import verifyJWT from '../middlewares/verifyJWT.js';
const UserRouter = express.Router()

UserRouter.route("/register").post(emailHandler,register)
UserRouter.route("/login").post(login)
UserRouter.route("/profile").get(verifyJWT, getUser)

export default UserRouter