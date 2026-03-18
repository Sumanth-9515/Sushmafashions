import express from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.js'; // <--- THIS LINE IS CRITICAL

const router = express.Router();

// @desc    Admin Login
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login attempt for:", email);

        // 1. Find the admin by email
        // This is where it was failing because 'Admin' wasn't imported
        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log("Admin not found in database");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 2. Compare the hashed password from your DB with the plain text from the form
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            console.log("Password does not match");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 3. Success response
        console.log("Login successful!");
        res.status(200).json({
            message: "Login successful",
            admin: {
                id: admin._id,
                email: admin.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});

export default router;