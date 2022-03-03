'use strict';

const Authorization = require('./auth/Authorization');
const RequestHandler = require('./RequestHandler');

/**
 * This is the REST API for the recruiter.
 */
class RecruiterApi extends RequestHandler {

    /**
     * Creates a new instance of the class.
     */
    constructor() {
        super();
    }

    /**
     * @return {String} the URL path this will handle.
     */
    get path() {
        return '/recruiter';
    }

    /**
     * @return {int} the role id allowed to access this API.
     * Role id = 1: Recruiter
     *         = 2: Applicant
     */
    get allowedRoleId() {
        return 1;
    }

    /**
     * Registers the functions handling the requests.
     */
    async registerHandler() {
        try {
            await this.getController();

            /**
             * Get request handling applicant.
             * Response with status 200: returns success message.
             *               status 401: if not authorized.
             *               status 500: if an internal server error occurs.
             */
            this.router.get(
                '/', 
                async (req, res, next) => {
                    try {
                        if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleId, req, res)) ) {
                            // The Authorization isSignedIn will send an error response
                            return;
                        }
                        res.status(200).json({ 
                            result: 'Successfull authorization', 
                        });
                    } catch (err) {
                        next(err);
                    }
                });
        } catch (err) {
            console.log('Error in recruiter registerhandler: ' + err);
        }
    }
}

module.exports = RecruiterApi;