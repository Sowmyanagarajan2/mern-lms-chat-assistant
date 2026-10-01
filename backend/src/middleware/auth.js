import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req, res, next) { try { const token = req.headers.authorization?.split(' ')[1]; if (!token) return res.status(401).json({ message: 'Authentication required' }); const data = jwt.verify(token, process.env.JWT_SECRET); req.user = await User.findById(data.id).select('-password'); if (!req.user) return res.status(401).json({ message: 'User not found' }); next(); } catch { res.status(401).json({ message: 'Invalid token' }); } }
