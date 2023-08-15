import mongoose from 'mongoose';
import Comment from '../models/comments.js';
import ClientError from '../helpers/exception/ClientError.js';

export async function findAllCommentsByVideoId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ClientError('Invalid Video Id');
    }
    return Comment.find({ videoId: new mongoose.Types.ObjectId(id) }).exec();
}

export async function saveCommentsByVideoId(username, comment, id) {
    const payload = new Comment({
        username,
        comment,
        videoId: id,
    });

    const savedComment = await payload.save();
    return savedComment;
}
