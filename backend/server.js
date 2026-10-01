import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import dashboardRoutes from './src/routes/dashboard.js';
import courseRoutes from './src/routes/courses.js';
import chatRoutes from './src/routes/chat.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/chat', chatRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => app.listen(process.env.PORT || 5000, () => console.log('API running'))).catch(console.error);
