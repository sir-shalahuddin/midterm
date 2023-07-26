export default class AuthenticationError extends Error {
    constructor(message, statusCode = 401) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AuthenticationError';
    }
}
