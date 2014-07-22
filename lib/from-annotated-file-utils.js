/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 3:03 PM
 */


var AnnotatedFile = require("./lib/annotated-file.js");

exports.getOptions = function(filenameOrOptionsObject, DEFAULTS){
    var options = {};
    if(!DEFAULTS) DEFAULTS = {};

    options = this.getOptionsFromString(filenameOrOptionsObject, DEFAULTS);
    if(!options) options = this.getOptionsFromObject(filenameOrOptionsObject, DEFAULTS);

    return options;
}

exports.getOptionsFromString = function(optionString, DEFAULTS){
    var options;
    if(typeof optionString !== "string") return null;
    options = DEFAULTS || {};
    options.filename = optionString;
    return options;
}

exports.getOptionsFromObject = function(options, DEFAULTS){
    if(!options) throw new Error("Filename option must be specified.");
    if(!options.filename) throw new Error("Filename option must be specified.");
    if(!DEFAULTS) DEFAULTS = {};
    for(var opt in DEFAULTS){
        options[opt] = options[opt] || DEFAULTS[opt];
    }
    return options;
}


exports.processFile = function(filename){

    var annotatedFile = AnnotatedFile(filename);
    return annotatedFile;
    /*var file = this.readFile(filename);

    var parsedFile = this.parseFileContentsIntoMap(file);
    var parsedBody = this.convertMapOfJavaScriptFileToArray(parsedFile)*/
}

exports.parseFileContentsIntoMap = function(fileContents){
    var acorn = require("acorn");
    return acorn.parse(fileContents, {locations: true, ranges: true, onComment: this.interpretComment});
}

exports.readFile = function(filename){
    var fileContents = fs.readFileSync(filename, {encoding: "utf8"});
}

exports.convertMapOfJavaScriptFileToArray = function(javaScriptMap){
    if(!javaScriptMap) throw new Error("Map must have a body property.");
    if(!javaScriptMap.body) throw new Error("Map must have a body property.");

    var body = javaScriptMap.body;
    console.log(body);
}

exports.interpretComment = function(block, text, start, end, line, column){

}