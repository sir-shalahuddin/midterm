import {
    getUserService, loginService, registerService, updateUrlProfilPictureService,
} from '../services/users.js';

function isValidEmail(email) {
    // Define a regular expression for a simple email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Use the test() method to check if the email matches the pattern
    return emailRegex.test(email);
}

function isValidPassword(password) {
    const minLength = 8;
    const maxLength = 16;

    return password.length >= minLength && password.length <= maxLength;
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid payload',
            });
        }
        const result = await loginService(req.body);
        return res.status(200).json({
            status: 'success',
            token: result,
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

export const registerController = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid payload',
            });
        }

        if (!(isValidEmail(email))) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid email format',
            });
        }

        if (!(isValidPassword(password))) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid password length',
            });
        }

        await registerService(req.body);
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

export const updateProfilePictureController = async (req, res) => {
    try {
        const { _id } = req.body.tokenData;
        const url = req.file?.location;
        if (!url) {
            return res.status(400).json({
                status: 'fail',
                message: 'invalid payload',
            });
        }
        const result = await updateUrlProfilPictureService(url, _id);
        return res.status(200).json({
            status: 'success',
            data: result,
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

export const getUsers = async (req, res) => {
    try {
        const { _id } = req.body.tokenData;
        const result = await getUserService(_id);
        return res.status(200).json({
            status: 'success',
            data: result,
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
