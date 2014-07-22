/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 11:16 PM
 */



var rewire = require("rewire"), fs = require("fs");

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
       expect(annotatedFile.filename).to.equal("someModule.js");
       expect(annotatedFile.fullFilenameAndPath).to.equal("/home/terrence/someModule.js");
    });

    it("should have a method that can read and parse the file", function(){
        expect(Array.isArray(annotatedFile.body)).to.be.true;
        expect(annotatedFile.body.length).to.equal(3);
        expect(Array.isArray(annotatedFile.comments)).to.be.true;
        expect(annotatedFile.comments.length).to.equal(3);
    });

    it("should have a method that can parse the comments", function(){
       expect(annotatedFile.parsedComments).to.be.an("array");
       expect(annotatedFile.parsedComments.length).to.equal(3);
       expect(annotatedFile.parsedComments[0]).to.contain.keys("text", "range", "lines");
    });



});


