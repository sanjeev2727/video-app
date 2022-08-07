import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import videoRouter from './routes/videos.js';

const app = express();
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log('Connected to Mongo DB!');
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/videos', videoRouter);

//Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!, please try again.';

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  connectDB();
  console.log(`Server running at port: ${process.env.SERVER_PORT}`);
});
