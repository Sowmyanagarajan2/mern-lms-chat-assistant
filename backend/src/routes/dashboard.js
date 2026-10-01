import express from 'express';
import Course from '../models/Course.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, async (req,res) => { const courses=await Course.find({ students:req.user._id }).select('title code lessons assignments announcements'); const completed=courses.reduce((n,c)=>n+c.lessons.filter(l=>l.completedBy.some(x=>String(x)===String(req.user._id))).length,0); const total=courses.reduce((n,c)=>n+c.lessons.length,0); res.json({ stats:{courses:courses.length,completed,progress:total?Math.round(completed/total*100):0,pending:courses.reduce((n,c)=>n+c.assignments.length,0)}, courses }); });
export default router;
