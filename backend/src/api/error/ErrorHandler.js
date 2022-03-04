'use strict'

/**
 * This class is the error handler for the application.
 * It contains a handler for sending an error message.
 */
class ErrorHandler {

    /**
     * The path this error handler will handle.
     * 
     * @return {String} the URL path this will handle.
     */
    get path() {
        return '/';
    }

    /**
     * Registers the function handling errors.
     * 
     * @param {Application} app The express application holding the handlers.
     */
    registerHandler(app) {
        app.use(this.path, (err, req, res, next) => {
            if(res.headersSent) {
                return next(err);
            }
            res.status(500).send({error: req.t('app.errors.error')});
        });
    }
}

module.exports = ErrorHandler;