import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from'./routes/api.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/akshit';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((error) => console.log('MongoDB connection error:', error.message));
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'akshit AI API is running.' });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
