import { comparePassword, passwordHash } from '../helpers/passwordHash.js';
import { generateAuthToken } from '../helpers/jwt-auth.js';
import {
    createUsers, getUsers, getUsersByEmail, updateUrlProfilPicture,
} from '../repositories/users.js';
import AuthenticationError from '../helpers/exception/UnauthenticateError.js';
import ClientError from '../helpers/exception/ClientError.js';

export const registerService = async ({ email, password, username }) => {
    const userExists = await getUsersByEmail(email);
    if (userExists) {
        throw new ClientError('email already registered');
    }
    const hash = await passwordHash(password);
    const newUser = {
        email,
        username,
        password: hash,
    };
    const result = await createUsers(newUser);
    return result;
};

export const loginService = async ({ email, password }) => {
    try {
        const userExists = await getUsersByEmail(email);
        await comparePassword(password, userExists.password);
        return generateAuthToken(userExists);
    } catch (error) {
        throw new AuthenticationError('Wrong email or password');
    }
};

export const updateUrlProfilPictureService = async (url, id) => updateUrlProfilPicture(url, id);

export const getUserService = async (id) => {
    const { email, username, urlProfilePicture } = await getUsers(id);
    const newData = {
        email,
        username,
        url_profile_picture: urlProfilePicture,
    };
    return newData;
};
