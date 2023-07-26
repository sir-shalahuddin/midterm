import mongoose from 'mongoose';
import Video from '../models/videos.js';

export async function findAllVideoThumbnail() {
    return Video.find();
}

export async function findVideoById(id) {
    return Video.findOne({
        _id: new mongoose.Types.ObjectId(id),
    });
}
