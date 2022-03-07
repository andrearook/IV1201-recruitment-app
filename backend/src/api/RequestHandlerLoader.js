'use strict'

const SignUpApi = require('./SignUpApi');
const SignInApi = require('./SignInApi');
const ApplicantApi = require('./ApplicantApi');
const ErrorHandler = require('./error/ErrorHandler');
const RecruiterApi = require('./RecruiterApi');

/**
 * This class contains all request handlers and error handlers and support
 * for loading them.
 */
class RequestHandlerLoader {

    /**
     * Creates a new instance of the loader.
     */
    constructor() {
        this.requestHandlers = [];
        this.errorHandlers = [];
    }

    /**
     * Will add a new request handler to the list.
     * @param {RequestHandler} requestHandler The handler that shall be added
     */
    addRequestHandler(requestHandler) {
        this.requestHandlers.push(requestHandler);
    }

    /**
     * Will add a new error handler to the list.
     * @param {ErrorHandler} errorHandler 
     */
    addErrorHandler(errorHandler) {
        this.errorHandlers.push(errorHandler);
    }

    /**
     * Will load the request handlers.
     * @param {Application} app The express app that will hold all handlers.
     */
    loadRequestHandlers(app) {
        this.requestHandlers.forEach((requestHandler) => {
            requestHandler.registerHandler();
            app.use(requestHandler.path, requestHandler.router);
        })
    }

    /**
     * Will load the error handlers.
     * @param {Application} app The express app that will hold the error handlers.
     */
    loadErrorHandlers(app) {
        this.errorHandlers.forEach((errorHandler) => {
            errorHandler.registerHandler(app);
        })
    }
}

/**
 * Create the loader and load all handlers.
 */
const loader = new RequestHandlerLoader();
loader.addRequestHandler(new SignUpApi());
loader.addRequestHandler(new SignInApi());
loader.addRequestHandler(new ApplicantApi());
loader.addRequestHandler(new RecruiterApi());
loader.addErrorHandler(new ErrorHandler());
module.exports = loader;