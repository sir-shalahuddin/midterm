import { findAllCommentsByVideoId, saveCommentsByVideoId } from '../repositories/comments.js';
import { findVideoById } from '../repositories/videos.js';
import ClientError from '../helpers/exception/ClientError.js';

export const getCommentsByVideoIdService = async (id) => {
    const validVideo = await findVideoById(id);
    if (!validVideo) {
        throw new ClientError('Video tidak ditemukan');
    }
    const data = await findAllCommentsByVideoId(id);

    const comment = data.map((obj) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: obj._id,
        username: obj.username,
        comment: obj.comment,
        created_at: obj.createdAt,
    }));
    return comment;
};

export const postCommentsByVideoIdService = async ({ username, comment, video_id: id }) => {
    const validVideo = await findVideoById(id);
    if (!validVideo) {
        throw new ClientError('Video tidak ditemukan');
    }
    return saveCommentsByVideoId(username, comment, id);
};
