import { User } from '../models/user.model.js';
import { asyncHandler, ApiError } from '../utils/index.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, _, next) => {
    const accessToken = req?.cookies?.accessToken;

    if (!accessToken) {
        return next(new ApiError(401, 'Unauthorized'));
    }

    const decodedTOKEN = await jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
    );

    const user = User.findById(decodedTOKEN?._id).select('-password');

    if (!user) {
        return next(new ApiError(401, 'Unauthorized'));
    }

    req.user = user;

    next();
});

export { verifyJWT };
