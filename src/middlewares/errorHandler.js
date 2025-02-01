import { ApiError } from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            error: err.error || [],
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
            error: [],
        });
    }
};

export { errorHandler };
