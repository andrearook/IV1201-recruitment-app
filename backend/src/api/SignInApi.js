'use strict';

const {check, validationResult} = require('express-validator');
const Authorization = require('./auth/Authorization');
const RequestHandler = require('./RequestHandler');

/**
 * This is the REST API for signing in a user.
 */
class SignInApi extends RequestHandler {
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
        return '/signin';
    }

    /**
     * Registers the functions handling the requests.
     */
    async registerHandler() {
        try {
            await this.getController();

            /**
             * Post request handling sign in.
             * Response with status 200: returns success message and the users role id
             *               status 400: if the any parameters are missing,
             *                           returns an error message.
             *               status 403: if the username or password is wrong,
             *                           returns an error message.
             *               status 500: if an internal server error occurs.
             */
            this.router.post(
                '/', 
                check('username', 'check_name_field')
                    .notEmpty()
                    .isAlphanumeric()
                    .withMessage('check_name_alphanum')
                    .stripLow(true)
                    .escape(),
                check('password', 'check_password_field')
                    .notEmpty()
                    .stripLow(true)
                    .escape(),
                async (req, res, next) => {
                    try {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            res.status(400).json({ error: req.t('app.signin.' + errors.array()[0].msg) });
                            return;
                        }

                        const signedInPerson = await this.contr.signin(req.body.username, req.body.password);
                        
                        if(signedInPerson) {
                            const role = (signedInPerson.role_id === 1) ? "recruiter" : "applicant";
                            Authorization.setAuthCookie(signedInPerson, res);
                            res.status(200).json({ 
                                result: req.t('app.signin.signin_success'),
                                person: {
                                    name: signedInPerson.name,
                                    surname: signedInPerson.surname,
                                    username: signedInPerson.username
                                },
                                role: role
                            });
                        } else {
                            res.status(403).json({ error: req.t('app.signin.error_403')});
                        }
                    } catch (err) {
                        next(err);
                    }
                });
        } catch (err) {
            console.log('Error in signin registerhandler: ' + err);
        }
    }
}

module.exports = SignInApi;