import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';
import User from '../models/user.model.js';

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password) {
        return next(
            new ApiError(400, 'Please provide username, password, name')
        );
    }

    const user = await User.findOne({ username });

    if (user) {
        return next(new ApiError(409, 'User already exists'));
    }

    const newUser = await User.create({ username, password, name }).select(
        '-password'
    );

    if (!newUser) {
        return next(
            new ApiError(500, 'Something went wrong while creating new user')
        );
    }

    return res.status(200).json(new ApiResponse(200, newUser));
});
