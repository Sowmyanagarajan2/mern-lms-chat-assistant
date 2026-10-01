import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, unique: true, lowercase: true }, password: String, role: { type: String, enum: ['student','teacher','admin'], default: 'student' }, enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] }, { timestamps: true });
export default mongoose.model('User', schema);
