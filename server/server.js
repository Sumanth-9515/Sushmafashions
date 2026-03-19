import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();

// 1. HELMET SETUP (Security)
app.use(helmet({
    crossOriginResourcePolicy: false, // Allows images to load from external sources like Cloudinary
})); 

// 2. CORS SETUP (The Fix)
// This tells the server to allow requests specifically from your frontend port (8080)
app.use(cors({
    origin: ["http://localhost:8080", "http://localhost:5173","https://sushmafashions.netlify.app/"], // Add your local ports here
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// 3. BODY PARSER
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Error:', err));

// 4. ROUTES (Must come after CORS and JSON parser)
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));