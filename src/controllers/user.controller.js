import {
    ApiError,
    ApiResponse,
    asyncHandler,
    options,
} from '../utils/index.js';
import { User } from '../models/user.model.js';
import { options } from '../utils/index.js';

//* Register new user
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, password, name } = req.body;

    if (!username || !password || !name) {
        return next(
            new ApiError(400, 'Please provide username, password, name')
        );
    }

    const user = await User.findOne({ username });

    if (user) {
        return next(new ApiError(409, 'User already exists'));
    }

    const newUser = await User.create({ username, password, name });

    if (!newUser) {
        return next(
            new ApiError(500, 'Something went wrong while creating new user')
        );
    }

    newUser.password = undefined;

    return res.status(200).json(new ApiResponse(200, newUser));
});

//* Login user
const loginUser = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new ApiError(400, 'Please provide username, password'));
    }

    const user = await User.findOne({ username });

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return next(new ApiError(401, 'Incorrect password'));
    }

    const accessToken = await user.generateJWT();

    const loggedInUser = await User.findOne({ username }).select('-password');

    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .json(
            new ApiResponse(200, loggedInUser, 'User logged in successfully')
        );
});

//* Logout user
const logoutUser = asyncHandler(async (_, res) => {
    return res
        .status(200)
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

export { registerUser, loginUser, logoutUser };
