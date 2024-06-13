import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, res, next) => {
    // console.log(req.headers.authorization.split(' ')[1]);
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});

export default verifyJWT