import express from 'express';
import dotenv from 'dotenv';
import router from './routes/contactRoutes.js';
import errorHandler from './middlewares/errorhandler.js';
dotenv.config({
    path : '/.env'
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.use('/api', router); // When an error occurs in a route handler, it can be passed to the next function, triggering the error-handling middleware.
app.use(errorHandler); // Now using middleware errorhandler then it goes to the brower as response
app.listen(port, () => {
    console.log('server is connected on port',process.env.PORT || 8000)
})
