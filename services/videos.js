import {
    findAllVideoThumbnail,
    findVideoById,
    findVideosByCategory,
    findVideosByQueries,
} from '../repositories/videos.js';

export const getVideoThumbnailsService = async ({ category, q }) => {
    let data;
    if (q) {
        data = await findVideosByQueries(q);
    } else if (category) {
        data = await findVideosByCategory(category);
    } else {
        data = await findAllVideoThumbnail();
    }
    const video = data.map((obj) => ({
        // eslint-disable-next-line no-underscore-dangle
        video_id: obj._id,
        url_image_thumbnail: obj.urlThumbnail,
        description: obj.description,
        seller: obj.seller,
    }));
    return video;
};

export const getVideoByIdService = async (id) => {
    const data = await findVideoById(id);
    const video = {
        // eslint-disable-next-line no-underscore-dangle
        video_id: data._id,
        video_src: data.urlVideo,
    };
    return video;
};
