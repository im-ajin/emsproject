import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import employeeRoutes from './routes/employee.route.js';
import cors from 'cors'

const app = express()

dotenv.config();
app.use(cors());

app.use(express.json());


app.use('/auth/login', authRoutes);
app.use('/employee', employeeRoutes);
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
    console.log('server is runing in 3000');
})

