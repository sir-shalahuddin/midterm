import mongoose from 'mongoose';
import Video from '../models/videos.js';
import ClientError from '../helpers/exception/ClientError.js';

export async function findAllVideoThumbnail() {
    return Video.find();
}

export async function findVideoById(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ClientError('Invalid Video Id');
    }
    return Video.findOne({
        _id: new mongoose.Types.ObjectId(id),
    });
}
