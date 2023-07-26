import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    urlThumbnail: {
        type: String,
        required: true,
    },
});
const Video = mongoose.model('videos', videoSchema);
export default Video;
