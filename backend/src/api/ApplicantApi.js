'use strict';

const {check, validationResult} = require('express-validator');
const ApplicationDTO = require('../model/ApplicationDTO');
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
     * @return {int} the role id allowed to access this API.
     * Role id = 1: Recruiter
     *         = 2: Applicant
     */
    get allowedRoleId() {
        return 2;
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
                        if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleId, req, res)) ) {
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
             * Post request handling applications.
             * Response with status 200: returns success message.
             *               status 400: if parameters are wrongly formatted,
             *                           an error message is included.
             *               status 401: if not authorized.
             *               status 500: if an internal server error occurs.
             */
            this.router.post(
                '/apply', 
                check('username', 'Username missing or wrongly formatted.')
                    .notEmpty()
                    .isAlphanumeric()
                    .isLength({min: 5, max: 30})
                    .stripLow(true)
                    .escape(),
                check('competences.*.id', 'Choose a competence.')
                    .notEmpty()
                    .isInt({min: 1})
                    .stripLow(true)
                    .escape(),
                check('competences.*.experience', 'Fill in the experience field.')
                    .notEmpty()
                    .isNumeric({min: 0})
                    .withMessage('Experience should be a number.')
                    .stripLow(true)
                    .escape(),
                check('availabilities.*.from', 'Fill in the \'from\' date field.')
                    .notEmpty()
                    .isISO8601({strict: true})
                    .isDate({format: 'YYYY-MM-DD', strictMode: true})
                    .withMessage('The from date should have format YYYY-MM-DD.')
                    .stripLow(true)
                    .escape(),
                check('availabilities.*.to', 'Fill in the \'to\' date field.')
                    .notEmpty()
                    .isISO8601({strict: true})
                    .isDate({format: 'YYYY-MM-DD', strictMode: true})
                    .withMessage('The to date should have format YYYY-MM-DD.')
                    .stripLow(true)
                    .escape(),
                async (req, res, next) => {
                    try {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            res.status(400).json({ error: errors.array()[0].msg });
                            return;
                        }

                        if( !(await Authorization.isSignedIn(this.contr, this.allowedRoleId, req, res)) ) {
                            // The Authorization isSignedIn will send an error response
                            return;
                        }
                        const application = req.body;

                        const applicationDTO = new ApplicationDTO(
                            application.username, 
                            application.competences,
                            application.availabilities
                        );
                        await this.contr.addApplication(applicationDTO);

                        res.status(200).json({ 
                            result: req.t('app.applicant.application_success'), 
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