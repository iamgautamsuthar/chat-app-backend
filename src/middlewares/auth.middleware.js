import { User } from '../models/user.model.js';
import { asyncHandler, ApiError } from '../utils/index.js';
import jwt from 'jsonwebtoken';

const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const accessToken = req?.cookies?.accessToken;

        if (!accessToken) {
            return next(new ApiError(401, 'Unauthorized - No token provided'));
        }

        const decodedTOKEN = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (!decodedTOKEN?._id) {
            return next(
                new ApiError(401, 'Unauthorized - Invalid token payload')
            );
        }

        const user = await User.findById(decodedTOKEN._id).select('-password');

        if (!user) {
            return next(new ApiError(401, 'Unauthorized - User not found'));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, 'Unauthorized - Invalid token'));
    }
});

export { verifyJWT };
