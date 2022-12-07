import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: 'string',
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: 'string',
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
        min: 6,
    },
    picturePath: {
        type: 'string',
        default: ""
    },
    friends: {
        type: 'array',
        default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, { timeStamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
