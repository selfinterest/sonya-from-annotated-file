/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 1:24 PM
 */

//This module must be required BEFORE sonya

var Provide = require("sonya/lib/provide");

Provide.constructor.prototype.types.fromAnnotatedFile = require("./from-annotated-file.js");

Provide.createProviderTypes();