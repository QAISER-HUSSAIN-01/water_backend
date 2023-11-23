import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import supplyRoutes from './routes/supply.js';
import dashboardRoutes from './routes/dashboard.js';
const app = express();

// app.use(express.static('static'));
// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'static','index.html'));
// });

dotenv.config();
// Connect to MongoDB using Mongoose

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const PORT = process.env.PORT || 8000;
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
app.use('/api/supply', supplyRoutes);
app.use('/api/dashboard', dashboardRoutes);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, you can throw the error or handle it here
});



