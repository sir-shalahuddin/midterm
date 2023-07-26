import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function generateAuthToken(user) {
    const token = jwt.sign({
    // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
        email: user.email,
        username: user.username,
    }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return token;
}

export async function verifyToken(token) {
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        return tokenData;
    } catch (e) {
        throw new Error('Unauthenticated');
    }
}
