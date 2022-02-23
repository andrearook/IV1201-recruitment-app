'use strict';

const {check, validationResult} = require('express-validator');
const PersonDTO = require('../model/PersonDTO');
const RequestHandler = require('./RequestHandler');

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
             * Response with status 200 returns success message
             * Error return response status 400 if parameters are wrongly
             * formatted, an error message is included.
             * Returns status 500 if an internal server error occurs.
             */
            this.router.post(
                '/', 
                check('name', 'Fill in the name field using letters.')
                    .notEmpty()
                    .isAlpha()
                    .withMessage('The name should only consist of letters.')
                    .isLength({min: 2, max: 30 })
                    .withMessage('The name should be between 2 and 30 letters.')
                    .stripLow(true)
                    .escape(),
                check('surname', 'Fill in the surname field using letters.')
                    .notEmpty()
                    .isAlpha()
                    .withMessage('The surname should only consist of letters.')
                    .isLength({min: 2, max: 30 })
                    .withMessage('The surname should be between 2 and 30 letters.')
                    .stripLow(true)
                    .escape(),
                check('pnr', 'Fill in the personal number field.')
                    .notEmpty()
                    .isNumeric()
                    .withMessage('The personal number should consist of numbers.')
                    .isLength({min: 10, max: 10})
                    .withMessage('The personal number should be given as 10 numbers.')
                    .stripLow(true)
                    .escape(),
                check('email', 'The email should have the format example@something.com')
                    .notEmpty()
                    .isEmail()
                    .isLength({min: 5, max: 50})
                    .withMessage('The email should be min 5 and max 50 characters.')
                    .stripLow(true)
                    .escape(),
                check('password', 'Fill in the password field.')
                    .notEmpty()
                    .isLength({ min: 5 })
                    .withMessage('The password must be at least 5 characters.')
                    .matches(/\d/)
                    .withMessage('The password must contain at least one number.')
                    .stripLow(true)
                    .escape(),
                check('username', 'Fill in the username field.')
                    .notEmpty()
                    .isAlphanumeric()
                    .withMessage('The username should be letters and/or numbers.')
                    .isLength({min: 5, max: 30})
                    .withMessage('The username should be between 5 and 30 characters.')
                    .stripLow(true)
                    .escape(),
                async (req, res, next) => {
                    try {
                        const errors = validationResult(req);
                        if(!errors.isEmpty()) {
                            res.status(400).json({ error: errors.array()[0].msg });
                            return;
                        }
                        const availableUsername = await this.contr.isUsernameAvailable(req.body.username);
                        if(!availableUsername){
                            return res.status(409).json({ error: "Username already in use" });
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
                        console.log(createdPerson);
                        res.status(200).json({ 
                            result: 'Successfull signup',
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