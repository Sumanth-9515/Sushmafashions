import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET all
router.get('/', async (req, res) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE one
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Inquiry not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST (User submission)
router.post('/', async (req, res) => {
    try {
        const newEntry = await Contact.create(req.body);
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;