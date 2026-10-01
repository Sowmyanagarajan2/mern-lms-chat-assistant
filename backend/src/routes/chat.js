import express from 'express';
import OpenAI from 'openai';
import ChatSession from '../models/ChatSession.js';
import Course from '../models/Course.js';
import { protect } from '../middleware/auth.js';
const router=express.Router(); const ai=process.env.OPENAI_API_KEY?new OpenAI({apiKey:process.env.OPENAI_API_KEY}):null;
router.post('/message', protect, async(req,res)=>{ const {message,courseId}=req.body; const course=courseId?await Course.findById(courseId).select('title description lessons assignments announcements'):null; let s=await ChatSession.findOne({user:req.user._id,course:courseId||null})||new ChatSession({user:req.user._id,course:courseId||null}); s.messages.push({role:'user',content:message}); const context=course?JSON.stringify(course):'General LMS question'; let reply=`Demo assistant: I can help with your LMS question: ${message}`; if(ai){const r=await ai.chat.completions.create({model:process.env.OPENAI_MODEL||'gpt-4o-mini',messages:[{role:'system',content:'You are a concise, friendly LMS assistant. Use the course context and never invent deadlines.'},{role:'user',content:`Context: ${context}\nQuestion: ${message}`} ]}); reply=r.choices[0].message.content;} s.messages.push({role:'assistant',content:reply}); await s.save(); res.json({reply}); });
router.get('/sessions',protect,async(req,res)=>res.json(await ChatSession.find({user:req.user._id}).sort('-updatedAt').limit(20)));
export default router;
