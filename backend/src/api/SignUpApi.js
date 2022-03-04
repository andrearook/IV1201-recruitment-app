'use strict';

const {check, validationResult} = require('express-validator');
const PersonDTO = require('../model/PersonDTO');
const RequestHandler = require('./RequestHandler');
const Authorization = require('./auth/Authorization');

/**
 * This is the REST API for signing up a user.
 */
class SignUpApi extends RequestHandler {
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
        return '/signup';
    }

    /**
     * Registers the functions handling the requests.
     */
    async registerHandler() {
        try {
            await this.getController();

            /**
             * Post request handling signup.
             * 
             * Response with status 200: returns success message.
             *               status 400: if parameters are wrongly formatted,
             *                           an error message is included.
             *               status 409: if username not available.
             *               status 500: if an internal server error occurs.
             */
            this.router.post(
                '/',
                check('name', 'check_name_field')
                    .notEmpty()
                    .isAlpha()
                    .withMessage('check_name_alpha')
                    .isLength({min: 2, max: 30 })
                    .withMessage('check_name_length')
                    .stripLow(true)
                    .escape(),
                check('surname', 'check_surname_field')
                    .notEmpty()
                    .isAlpha()
                    .withMessage('check_surname_alpha')
                    .isLength({min: 2, max: 30 })
                    .withMessage('check_surname_length')
                    .stripLow(true)
                    .escape(),
                check('pnr', 'check_pnr')
                    .notEmpty()
                    .isNumeric()
                    .withMessage('check_numeric')
                    .isLength({min: 10, max: 10})
                    .withMessage('check_pnr_length')
                    .stripLow(true)
                    .escape(),
                check('email', 'check_email')
                    .notEmpty()
                    .isEmail()
                    .isLength({min: 5, max: 50})
                    .withMessage('check_email_length')
                    .stripLow(true)
                    .escape(),
                check('password', 'check_password_field')
                    .notEmpty()
                    .isLength({ min: 5 })
                    .withMessage('check_password_length')
                    .matches(/\d/)
                    .withMessage('check_password_onenumber')
                    .stripLow(true)
                    .escape(),
                check('username', 'check_username_field')
                    .notEmpty()
                    .isAlphanumeric()
                    .withMessage('check_username_alphanum')
                    .isLength({min: 5, max: 30})
                    .withMessage('check_username_length')
                    .stripLow(true)
                    .escape(),
                async (req, res, next) => {
                    try {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            res.status(400).json({ error: req.t('app.signup.' + errors.array()[0].msg) });
                            return;
                        }
                        const availableUsername = await this.contr.isUsernameAvailable(req.body.username);
                        if(!availableUsername){
                            return res.status(409).json({ error: req.t('app.signup.available_username') });
                        }

                        const person = new PersonDTO(
                            undefined,
                            req.body.name,
                            req.body.surname,
                            req.body.pnr,
                            req.body.email,
                            req.body.password,
                            undefined,
                            req.body.username
                        );
                        const createdPerson = await this.contr.createPerson(person);
                        Authorization.setAuthCookie(createdPerson, res);
                        res.status(200).json({ 
                            result: req.t('app.signup.signup_success'),
                            person: {
                                name: createdPerson.name,
                                surname: createdPerson.surname,
                                username: createdPerson.username
                            },
                        });
                    } catch (err) {
                        next(err);
                    }
                });
        } catch (err) {
            console.log('Error in signup registerhandler: ' + err);
        }
    }
}

module.exports = SignUpApi;