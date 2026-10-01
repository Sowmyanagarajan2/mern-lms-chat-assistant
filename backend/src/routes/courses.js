import express from 'express';
import Course from '../models/Course.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/', protect, async (req,res) => res.json(await Course.find().populate('instructor','name')));
router.get('/:id', protect, async (req,res) => { const c=await Course.findById(req.params.id).populate('instructor','name'); c ? res.json(c) : res.status(404).json({message:'Course not found'}); });
router.post('/:id/enroll', protect, async (req,res) => { const c=await Course.findByIdAndUpdate(req.params.id, {$addToSet:{students:req.user._id}}, {new:true}); await req.user.updateOne({$addToSet:{enrolledCourses:c._id}}); res.json(c); });
router.patch('/:id/lessons/:lessonId/complete', protect, async (req,res) => { const c=await Course.findOneAndUpdate({_id:req.params.id,'lessons._id':req.params.lessonId}, {$addToSet:{'lessons.$.completedBy':req.user._id}}, {new:true}); res.json(c); });
export default router;
