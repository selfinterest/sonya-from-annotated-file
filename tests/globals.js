/**
 * Created by: Terrence C. Watson
 * Date: 7/22/14
 * Time: 3:23 PM
 */

/*
    This file is included in all tests. It globalizes the assertion library (and anything else.)
 */

var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

//Chai expectations
global.expect = require("chai").expect;

//Sinon for spying
global.sinon = require("sinon");

//Rewire for mocking and such
global.rewire = require("rewire");

