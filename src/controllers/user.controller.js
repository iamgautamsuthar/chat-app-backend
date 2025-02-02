import {
    ApiError,
    ApiResponse,
    asyncHandler,
    options,
} from '../utils/index.js';
import { User } from '../models/user.model.js';

//* Register new user
const registerUser = asyncHandler(async (req, res, next) => {
    console.log('POST: /api/v1/user/register');
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
    console.log('POST: /api/v1/user/login');
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
    console.log('POST: /api/v1/user/logout');
    return res
        .status(200)
        .clearCookie('accessToken', options)
        .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

//* Delete user
const deleteUser = asyncHandler(async (req, res, next) => {
    console.log('POST: /api/v1/user/deleteUser');
    const user = req.user;

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    await User.findByIdAndDelete(user._id);

    return res.status(200).json(new ApiResponse(200, {}, 'User deleted'));
});

//* Change password
const changePassword = asyncHandler(async (req, res, next) => {
    console.log('POST: /api/v1/user/change-password');
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    if (!oldPassword || !newPassword) {
        return next(
            new ApiError(400, 'Please provide old password and new password')
        );
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        return next(new ApiError(401, 'Incorrect password'));
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, 'Password changed'));
});

//* Update user
const updateUser = asyncHandler(async (req, res, next) => {
    console.log('POST: /api/v1/user/update');

    const user = req.user;
    const { username, name } = req.body;

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    if (!username || !name) {
        return next(new ApiError(400, 'Please provide username, name'));
    }

    const newUser = await User.findByIdAndUpdate(
        user._id,
        {
            username,
            name,
        },
        { new: true }
    ).select('-password');

    if (!newUser) {
        return next(
            new ApiError(500, 'Something went wrong while updating user')
        );
    }

    return res.status(200).json(new ApiResponse(200, newUser, 'User updated'));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    changePassword,
    updateUser,
};
