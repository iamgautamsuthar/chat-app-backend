# Chat App Backend

This is the backend service for a simple chat application. It provides API endpoints for user authentication and real-time messaging.

## Features

-   User authentication (sign-up, login, logout)
-   Real-time messaging using WebSockets
-   User management
-   RESTful API for managing users and messages

## Tech Stack

-   **Backend Framework:** Node.js with Express
-   **Database:** MongoDB (Mongoose ORM)
-   **Real-time Communication:** Socket.io
-   **Authentication:** JWT (JSON Web Token)
-   **Password Hashing:** bcrypt
-   **Environment Variables:** dotenv

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/iamgautamsuthar/chat-app-backend.git
    cd simple-chat-app-backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT
    MONGODB_URL
    CORS_ORIGIN
    ACCESS_TOKEN_SECRET
    ACCESS_TOKEN_EXPIRE
    ```
4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### Authentication

-   `POST /api/v1/user/register` - Register a new user
-   `POST /api/v1/user/login` - Login user and get JWT token
-   `POST /api/v1/user/logout` - Logout user (Requires JWT verification)
-   `POST /api/v1/user/delete` - Delete user (Requires JWT verification)
-   `POST /api/v1/user/change-password` - Change user password (Requires JWT verification)
-   `POST /api/v1/user/update` - Update user details (Requires JWT verification)

### Messages

-   `POST /api/v1/message/get` - Get messages
-   `POST /api/v1/message/delete` - Delete a message
-   `POST /api/v1/message/edit` - Edit a message

### Users

-   `GET /api/v1/user/users` - Get all users

## Contributing

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any issues or contributions, please open an issue on [GitHub](https://github.com/iamgautamsuthar/chat-app-backend).
