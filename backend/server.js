import express from 'express';
import dotenv from 'dotenv';
import router from './routes/contactRoutes.js';
import UserRouter from './routes/userrRoutes.js';
import errorHandler from './middlewares/errorhandler.js';
import connectDB from './config/connectDB.js';

dotenv.config({
    path: '../backend/.env'
});

// console.log('Port:', process.env.PORT);
// console.log('MONGODB_URI:', process.env.CONNECTION_STRING);

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.use('/api', router); // When an error occurs in a route handler, it can be passed to the next function, triggering the error-handling middleware.
app.use('/user', UserRouter);

app.use(errorHandler); // Now using middleware errorhandler then it goes to the browser as a response

app.listen(port, () => {
    console.log('server is connected on port', port);
});
