import mongoose from 'mongoose';
const schema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, messages: [{ role: String, content: String, createdAt: { type: Date, default: Date.now } }] }, { timestamps: true });
export default mongoose.model('ChatSession', schema);
