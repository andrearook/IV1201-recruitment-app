'use strict';

const Authorization = require('./auth/Authorization');
const RequestHandler = require('./RequestHandler');

/**
 * This is the REST API for the applicant.
 */
class ApplicantApi extends RequestHandler {

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
        return '/applicant';
    }

    /**
     * Registers the functions handling the requests.
     */
    async registerHandler() {
        try {
            await this.getController();

            /**
             * Get request handling competences.
             * Response with status 200: returns an array with competences.
             *               status 401: if not authorized.
             *               status 500: if an internal server error occurs.
             */
            this.router.get(
                '/',
                async (req, res, next) => {
                    try {

                        if( !(await Authorization.isSignedIn(this.contr, req, res)) ) {
                            // The Authorization isSignedIn will send an error response
                            return;
                        }
                        const competences = await this.contr.getAllCompetences();
                        res.status(200).json({
                            competences: competences,
                        });
                    } catch(err) {
                        next(err);
                    }
                }
            )
            /**
             * Get request handling applicant.
             * Response with status 200: returns success message.
             *               status 401: if not authorized.
             *               status 500: if an internal server error occurs.
             */
            this.router.get(
                '/apply', 
                async (req, res, next) => {
                    try {
                        if( !(await Authorization.isSignedIn(this.contr, req, res)) ) {
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
            console.log('Error in applicant registerhandler: ' + err);
        }
    }
}

module.exports = ApplicantApi;