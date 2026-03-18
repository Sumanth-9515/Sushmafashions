import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'kishor_boutique', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
});

const upload = multer({ storage });

// @desc    Add Product with Single Image
// @route   POST /api/products
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const product = await Product.create({
            name,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
            imageUrl: req.file.path // This is the Cloudinary URL
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let updateData = { 
            name, 
            description, 
            category, 
            price: Number(price), 
            stock: Number(stock) 
        };

        if (req.file) {
            updateData.imageUrl = req.file.path; // Update image if a new one is uploaded
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );
        
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;