import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const router = express.Router();
const token = u => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
router.post('/register', async (req,res) => { try { const { name, email, password, role='student' } = req.body; if (await User.findOne({ email })) return res.status(409).json({ message: 'Email already registered' }); const u = await User.create({ name, email, password: await bcrypt.hash(password, 10), role }); res.status(201).json({ token: token(u), user: { id:u._id, name:u.name, email:u.email, role:u.role } }); } catch(e) { res.status(400).json({ message:e.message }); } });
router.post('/login', async (req,res) => { const u = await User.findOne({ email:req.body.email }); if (!u || !(await bcrypt.compare(req.body.password, u.password))) return res.status(401).json({ message:'Invalid credentials' }); res.json({ token:token(u), user:{ id:u._id, name:u.name, email:u.email, role:u.role } }); });
export default router;
