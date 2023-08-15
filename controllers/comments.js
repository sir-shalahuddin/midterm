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

const clients = [];

export const handleWebSocketConnection = async (ws) => {
    clients.push(ws);

    ws.on('message', async (message) => {
        try {
            const obj = JSON.parse(message);
            await postCommentsByVideoIdService(obj);
            ws.send(message);
            clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(obj.message);
                }
            });
        } catch (error) {
            ws.send(JSON.stringify({ error: 'Invalid request' }));
            // eslint-disable-next-line no-console
            console.error('An error occurred:', error);
        }
    });

    ws.on('close', () => {
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
};
