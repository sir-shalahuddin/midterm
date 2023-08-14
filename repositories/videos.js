import mongoose from 'mongoose';
import Video from '../models/videos.js';
import ClientError from '../helpers/exception/ClientError.js';

export async function findAllVideoThumbnail() {
    return Video.find();
}

export async function findVideosByCategory(category) {
    return Video.find({ "category": { $elemMatch: { $eq: Number(category) } } });
}

export async function findVideosByQueries(query) {
    return Video.find({
        $or: [
            { seller: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ]
    });
}

export async function findVideoById(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ClientError('Invalid Video Id');
    }
    return Video.findOne({
        _id: new mongoose.Types.ObjectId(id),
    });
}
