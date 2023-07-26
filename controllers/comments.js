import {
    getCommentsByVideoIdService,
    postCommentsByVideoIdService,
} from '../services/comments.js';

export const getCommentsByVideoId = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await getCommentsByVideoIdService(id);
        return res.status(200).json({
            status: 'success',
            data: comments,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
        return res.status(e.statusCode || 500).json({
            status: 'fail',
            message: e.statusCode ? e.message : 'something wrong from side',
        });
    }
};

export const postCommentsByVideoId = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body.tokenData;
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid payload',
            });
        }
        await postCommentsByVideoIdService(username, comment, id);
        return res.status(200).json({
            status: 'success',
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
        return res.status(e.statusCode || 500).json({
            status: 'fail',
            message: e.statusCode ? e.message : 'something wrong from side',
        });
    }
};
