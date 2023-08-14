import { getVideoByIdService, getVideoThumbnailsService } from '../services/videos.js';

export const getVideoThumbnails = async (req, res) => {
    try {
        const thumbnails = await getVideoThumbnailsService(req.query);
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

export const getVideoById = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await getVideoByIdService(id);
        return res.status(200).json({
            status: 'success',
            data: video,
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
