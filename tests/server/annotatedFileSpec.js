/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 11:16 PM
 */



var rewire = require("rewire"), fs = require("fs"), chaiExpect = require("chai").expect;

describe("Annotatedfile class", function(){

    var AnnotatedFile, annotatedFile, fsMock, pathMock, testFile = "./tests/server/fixtures/someModule.js";

    beforeEach(function(){
        fsMock = {
            readFileSync: function(){
                return fs.readFileSync(testFile, {encoding: "utf8"});
            }
        };

        pathMock = {
            resolve: function(){
                return "/home/terrence/someModule.js"
            },
            basename: function(){
                return "someModule.js"
            }
        }
        AnnotatedFile = rewire("../../lib/lib/annotated-file.js");
        this.revertFs = AnnotatedFile.__set__("fs", fsMock);
        this.revertPath = AnnotatedFile.__set__("path", pathMock);
        annotatedFile = AnnotatedFile("./tests/server/fixtures/someModule.js");
    });

    afterEach(function(){
        this.revertFs();
        this.revertPath();
    })


    it("should have a method that can get path and filename information for a file", function(){
       expect(annotatedFile.filename).toBe("someModule.js");
       expect(annotatedFile.fullFilenameAndPath).toBe("/home/terrence/someModule.js");
    });

    it("should have a method that can read and parse the file", function(){
        expect(Array.isArray(annotatedFile.body)).toBe(true);
        expect(annotatedFile.body.length).toBe(3);
        expect(Array.isArray(annotatedFile.comments)).toBe(true);
        expect(annotatedFile.comments.length).toBe(3);
    });

    it("should have a method that can parse the comments", function(){
       expect(annotatedFile.parsedComments).toBeDefined();
       expect()
       expect(annotatedFile.parsedComments.length).toBe(3);
       expect(annotatedFile.parsedComments[0]).toEqual()
    });



});


