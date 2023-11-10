import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
const app = express();

dotenv.config();
// Connect to MongoDB using Mongoose

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Middleware
app.use(cors({
  origin: ['https://water-managment.netlify.app','http://localhost:3001','http://localhost:3000','http://localhost:8000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use(express.static('build'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, you can throw the error or handle it here
});



