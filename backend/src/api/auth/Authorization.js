'use strict';

const jwt = require('jsonwebtoken');

/**
 * This class contains methods for JSON Web Token authorization
 * 
 */
class Authorization {

    /**
     * Returns the name of the cookie
     */
    static get AUTH_COOKIE_NAME() {
        return 'personAuth';
    }

    /**
     * Sets the JSON Web Token as a cookie and its options.
     */
    static setAuthCookie(person, res) {
        const onlyAccessibleFromHttp = {httpOnly: true};
        const isSessionCookie = {expires: 0};
        
        const jwtToken = jwt.sign(
            {username: person.username,
            role: person.role_id},
            process.env.JWT_SECRET,
            {
                expiresIn: '30 minutes',
            },
        );
        const cookieOptions = {
            ...onlyAccessibleFromHttp,
            ...isSessionCookie,
        };
        res.cookie(this.AUTH_COOKIE_NAME, jwtToken, cookieOptions);
    }

    /**
     * Verifies if a person is signed in by checking the auth cookie.
     * Sets and sends the error message of the response if not signed in.
     * 
     * @param {Controller} contr The controller of the application.
     * @param {int} allowedRoleId The role id that is allowed to acces the API.
     * @param {Request} req The Express Request Object.
     * @param {Response} res The Express Response Object.
     * @returns {Boolean} True if person is logged in and false if not logged in.
     */
    static async isSignedIn(contr, allowedRoleId, req, res) {
        const authCookie = req.cookies.personAuth;
        if(!authCookie) {
            res.status(401).json({
                error: 'Unauthorized. No auth token'
            });
            return false;
        }
        try {
            const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET);
            const personDoesNotExist = await contr.isUsernameAvailable(JWTPayload.username);
            const roleId = JWTPayload.role;

            if(personDoesNotExist || (roleId !== allowedRoleId)) {
                res.clearCookie(this.AUTH_COOKIE_NAME);
                res.status(401).json({
                    error: 'Unauthorized. Invalid auth token'
                });
                return false;
            }
            return true;
        } catch (err) {
            res.clearCookie(this.AUTH_COOKIE_NAME);
            res.status(401).json({
                error: 'Unauthorized. Invalid auth token'
            });
            return false;
        }
    }

    /**
     * This method gets the username from the JWT. This method does not verify
     * that the user is signed in, that is done by the method isSignedIn. 
     * isSignedIn should always be called before this method is used. 
     * 
     * @param {Request} req The Express Request Object.
     * @returns {String} The username from the JWT.
     */
    static async getJWTUsername(req) {
        const authCookie = req.cookies.personAuth;
        const JWTPayload = jwt.verify(authCookie, process.env.JWT_SECRET); 
        
        return JWTPayload.username;
    }
}

module.exports = Authorization;