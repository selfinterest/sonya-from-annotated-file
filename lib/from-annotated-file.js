/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 2:05 PM
 */
"use strict";

var fromAnnotatedFileProvider = (function(){
    var provider = require("./from-annotated-file-utils.js");


    provider.fn = function(filenameOrOptionsObject){

        var DEFAULT_OPTIONS = {

        };

        this.options = this.getOptions(filenameOrOptionsObject, DEFAULT_OPTIONS);
        this.processFile(this.options.filename);

    }.bind(provider);

    return provider.fn;
})();


module.exports = fromAnnotatedFileProvider;