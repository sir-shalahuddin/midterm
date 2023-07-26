import express from 'express';
import getVideoThumbnails from '../controllers/videos.js';
import getProductsByVideoId from '../controllers/products.js';
import {
    getCommentsByVideoId,
    postCommentsByVideoId,
} from '../controllers/comments.js';
import {
    getUsers,
    loginController,
    registerController,
    updateProfilePictureController,
} from '../controllers/users.js';
import authMiddleware from '../middlewares/authMiddlewares.js';
import uploadImageMiddleware from '../middlewares/uploadImage.js';

const router = express.Router();

// user
router.post('/login', loginController);
router.post('/register', registerController);

// video
router.get('/videos', getVideoThumbnails);
router.get('/videos/:id/products', getProductsByVideoId);
router.get('/videos/:id/comments', getCommentsByVideoId);

// protected Route
// comment
router.post('/videos/:id/comments', authMiddleware, postCommentsByVideoId);

// users
router.put('/users/profile-pictures', uploadImageMiddleware, authMiddleware, updateProfilePictureController);
router.get('/users', authMiddleware, getUsers);

export default router;
