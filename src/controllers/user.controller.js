import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';
import { User } from '../models/user.model.js';

//* Register new user
const registerUser = asyncHandler(async (req, res, next) => {
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

    const newUser = await User.create({ username, password, name });

    if (!newUser) {
        return next(
            new ApiError(500, 'Something went wrong while creating new user')
        );
    }

    newUser.password = undefined;

    return res.status(200).json(new ApiResponse(200, newUser));
});

export { registerUser };
