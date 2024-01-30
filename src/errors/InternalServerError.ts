/**
 * An error that is thrown when an internal server error occurs.
 * e.g. a database error.
 * 
 * @param {string} msg - the error message
 */
export default class InternalServerError extends Error {
    constructor(message: string | undefined) {
        super(message);
    }
}