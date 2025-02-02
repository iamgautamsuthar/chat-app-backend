import { asyncHandler, ApiError, ApiResponse } from '../utils/index.js';
import { Message } from '../models/message.model.js';

const getMessages = asyncHandler(async (req, res, next) => {
    const sender = req.user._id;
    const receiver = req.body;

    if (!sender || !receiver) {
        return next(new ApiError(400, 'Please provide sender and receiver'));
    }

    const messages = await Message.find({
        $or: [
            { sender, receiver },
            { sender: receiver, receiver: sender },
        ],
    }).sort({ createdAt: 1 });

    if (!messages) {
        return res
            .status(200)
            .json(new ApiResponse(200, [], 'No messages found'));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { messages }, 'Messages fetched successfully')
        );
});

const deleteMessage = asyncHandler(async (req, res, next) => {
    const { messageId } = req.body;

    if (!messageId) {
        return next(new ApiError(400, 'Please provide messageId'));
    }

    await Message.findByIdAndDelete(messageId);

    return res
        .status(200)
        .json(new ApiResponse(200, [], 'Message deleted successfully'));
});

const editMessage = asyncHandler(async (req, res, next) => {
    const { messageId, message } = req.body;

    if (!messageId || !message) {
        return next(new ApiError(400, 'Please provide messageId and message'));
    }

    await Message.findByIdAndUpdate(messageId, { message });

    return res
        .status(200)
        .json(new ApiResponse(200, [], 'Message updated successfully'));
});

export { getMessages, deleteMessage, editMessage };
