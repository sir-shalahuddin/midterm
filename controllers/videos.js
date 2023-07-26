import getVideoThumbnailsService from '../services/videos.js';

const getVideoThumbnails = async (req, res) => {
    try {
        const thumbnails = await getVideoThumbnailsService();
        return res.status(200).json({
            status: 'success',
            data: thumbnails,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
        return res.status(500).json({
            status: 'fail',
            message: 'something wrong from side',
        });
    }
};

export default getVideoThumbnails;
