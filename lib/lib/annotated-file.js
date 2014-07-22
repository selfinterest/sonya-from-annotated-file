/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 10:11 PM
 */

"use strict";

var path = require("path")
  , fs = require("fs")
  ;




function AnnotatedFile(filename){

    if(this instanceof AnnotatedFile){
        this.setFileLocations(filename);
        this.readFile();
        //this.loadAsModule();
        this.parseFile();
        //this.parseBody();
        this.parseComments();

    } else {
        return new AnnotatedFile(filename);
    }
}


AnnotatedFile.prototype.setFileLocations = function(filename){
    this.fullFilenameAndPath = path.resolve(filename);
    this.filename = path.basename(this.fullFilenameAndPath);
}

AnnotatedFile.prototype.readFile = function(){
    try {
        this.raw = fs.readFileSync(this.fullFilenameAndPath, {encoding: "utf8"});
    } catch (e){
        throw e;
    }
}

AnnotatedFile.prototype.loadAsModule = function(){
    this.module = require(this.fullFilenameAndPath);
}

AnnotatedFile.prototype.parseFile = function () {
    var esprima = require("esprima");
    if(!this.raw) this.readFile();
    try {
        var content = esprima.parse(this.raw, {loc: true, range: true, tolerant: true, raw: true, comment: true});
        this.body = content.body;
        this.comments = content.comments.filter(function(comment){
            return comment.type === "Line";
        });
    } catch (e){
        throw e;
    }

}

AnnotatedFile.prototype.parseBody  = function(){

}

AnnotatedFile.prototype.parseComments = function () {

    this.parsedComments = this.comments.map(function(comment){
        return {
            text: comment.value,
            range: comment.range,
            lines: {
                start: comment.loc.start.line,
                end: comment.loc.end.line
            }
        }
    }.bind(this));
}


module.exports = AnnotatedFile;