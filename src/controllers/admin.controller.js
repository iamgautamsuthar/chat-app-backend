import { asyncHandler, ApiError, ApiResponse } from '../utils/index.js';
import { User } from '../models/user.model.js';

//* Get all users

const getAllUsers = asyncHandler(async (req, res, next) => {
    console.log('GET: /api/v1/admin/users');

    const users = await User.find().select('-password');

    if (!users) {
        return next(new ApiError(404, 'Users not found'));
    }

    return res.status(200).json(new ApiResponse(200, users, 'Users found'));
});

export { getAllUsers };
