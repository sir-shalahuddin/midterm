import { verifyToken } from '../helpers/jwt-auth.js';

const authMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
        const token = auth.slice(7);

        try {
            const tokenData = await verifyToken(token);
            req.body.tokenData = tokenData;
        } catch (error) {
            return res.status(401).json({
                status: 'fail',
                message: 'Unauthenticated',
            });
        }
    } else {
        return res.status(401).json({
            status: 'fail',
            message: 'Malformed or Missing token',
        });
    }
    return next();
};

export default authMiddleware;
