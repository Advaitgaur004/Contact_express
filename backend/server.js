import express from 'express';
import dotenv from 'dotenv';
import router from './routes/contactRoutes.js';
import UserRouter from './routes/userrRoutes.js';
import errorHandler from './middlewares/errorhandler.js';
import connectDB from './config/connectDB.js';

if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: "config.env" });
}

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.use('/api', router); 
app.use('/user', UserRouter);

app.use(errorHandler); 

app.listen(port, () => {
    console.log('server is connected on port', port);
});
