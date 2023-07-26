import mongoose from 'mongoose';
import User from '../models/users.js';

export async function getUsersByEmail(email) {
    return User.findOne({ email });
}

export async function createUsers({ email, password, username }) {
    const newUser = new User({
        email,
        password,
        username,
    });
    return newUser.save();
}

export async function updateUrlProfilPicture(url, id) {
    return User.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(id),
        },
        { $set: { urlProfilePicture: url } },
        { new: true },
    );
}

export async function getUsers(id) {
    return User.findOne({
        _id: new mongoose.Types.ObjectId(id),
    }, {
        _id: 0, email: 1, username: 1, urlProfilePicture: 1,
    });
}
