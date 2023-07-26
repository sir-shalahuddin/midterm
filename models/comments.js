import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000),
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos',
    },
});
const Comment = mongoose.model('comments', commentSchema);
export default Comment;
