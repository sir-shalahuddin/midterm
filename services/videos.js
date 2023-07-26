import { findAllVideoThumbnail } from '../repositories/videos.js';

const getVideoThumbnailsService = async () => {
    const data = await findAllVideoThumbnail();
    const thumbnail = data.map((obj) => ({
        // eslint-disable-next-line no-underscore-dangle
        video_id: obj._id,
        url_image_thumbnail: obj.urlThumbnail,
    }));
    return thumbnail;
};
export default getVideoThumbnailsService;
