import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    urlThumbnail: {
        type: String,
        required: true,
    },
    urlVideo: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
    },
    description: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    }
});
const Video = mongoose.model('videos', videoSchema);
export default Video;
