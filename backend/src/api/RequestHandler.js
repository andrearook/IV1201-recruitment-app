'use strict';

const express = require('express');
const Controller = require('../controller/Controller');

/**
 * A superclass for all the request handlers in this application.
 */
class RequestHandler {
    /**
     * Creates an instanse and a router for use subclasses of this class.
     */
    constructor() {
        this.router = express.Router();
    }

    /** 
     * The URL prefix.
     * Not currently in use. This will be needed later when linking resources.
     */
    static get URL_PREFIX() {
        return 'http://';
    }

    /**
     * Creation of the controller, which the subclasses need.
     */
    async getController() {
        this.contr = await Controller.createController();
    }
}

module.exports = RequestHandler;