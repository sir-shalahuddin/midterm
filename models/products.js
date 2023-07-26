import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'videos',
    },
});
const product = mongoose.model('products', productSchema);
export default product;
