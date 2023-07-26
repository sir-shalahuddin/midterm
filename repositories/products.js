import mongoose from 'mongoose';
import Product from '../models/products.js';
import ClientError from '../helpers/exception/ClientError.js';

async function findAllProductsByVideoId(id) {
    if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ClientError('Invalid Video Id');
    }
    return Product.find({ videoId: new mongoose.Types.ObjectId(id) }).exec();
}

export default findAllProductsByVideoId;
