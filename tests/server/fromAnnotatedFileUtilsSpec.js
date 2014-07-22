/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 4:00 PM
 */
var rewire = require("rewire");

describe("fromAnnotatedFileUtilsSpec", function(){
    var utils;

    beforeEach(function(){
       utils = rewire("../../lib/from-annotated-file-utils.js");

    });

    describe("getOptionsFromString", function(){
        it("should be able to get options from a string", function(){
            var result = utils.getOptionsFromString("test.js", {});
            expect(result.filename).toBe("test.js");
        });
        it("should be able to get options from a string with defaults passed", function(){
           var result = utils.getOptionsFromString("test.js", {someOption: true});
            expect(result.someOption).toBe(true);
        });
    });

    describe("getOptionsFromObject", function(){
        it("should be able to get options from an object", function(){
            var result = utils.getOptionsFromObject({filename: "test"});
            expect(result.filename).toBe("test");
        });

        it("should throw an error if filename option isn't set", function(){
           expect(function(){
            var result = utils.getOptionsFromObject({blah: "blah"});
           }).toThrow();
        });

        it("should be able to get options from an object with defaults", function(){
           var result = utils.getOptionsFromObject({filename: "test", someOption: true});
           expect(result.someOption).toBe(true);
           expect(result.filename).toBe("test");
        });
    });

    describe("getOptions", function(){
       it("should be able to get options from a string", function(){
          var result = utils.getOptions("test.js");
          expect(result.filename).toBe("test.js");
       });

       it("should be able to get options from an object", function(){
          var result = utils.getOptions({filename: "test.js"});
          expect(result.filename).toBe("test.js");
       });

       it("should throw an error if no filename is specified", function(){
          expect(function(){
              utils.getOptions();
          }).toThrow();
       });

       it("should throw an error if no filename property is specified", function(){
          expect(function(){
              utils.getOptions({blah: "blah"});
          }).toThrow();
       });

       it("should be able to get options from an object with defaults", function(){
          var result = utils.getOptions({filename: "test.js", blah: "notblah"}, {blah: "blah"});
          expect(result.filename).toBe("test.js");
          expect(result.blah).toBe("notblah");
       });

       it("should be able to get options from a string with defaults", function(){
          var result = utils.getOptions("test.js", {blah: "blah"});
           expect(result.filename).toBe("test.js");
           expect(result.blah).toBe("blah");
       });
    });

    xdescribe("readFile", function(){
        var fsMock, revert;
        beforeEach(function(){
           fsMock = {
               readFileSync: function(){
                   return "something";
               }
           }
           revert = utils.__set__("fs", fsMock);
        });

        afterEach(function(){
            utils.options = {};
            revert();
        });

        it("should read the file specified in options", function(){
            var spy = spyOn(fsMock, "readFileSync").andCallThrough();
            var result = utils.readFile("test.js");
            expect(spy).toHaveBeenCalledWith("test.js", {encoding: "utf8"});
            expect(result).toBe("something");
        });
    });

    xdescribe("JavaScript file parsing", function(){
        var fileContents, fs = require("fs");

        beforeEach(function(){
            fileContents = fs.readFileSync("./tests/server/fixtures/someModule.js");
        });

        describe("parseFileContentsIntoMap", function(){
            it("should be able to turn file contents into a map", function(){
                var result = utils.parseFileContentsIntoMap(fileContents);
                expect(Array.isArray(result.body)).toBe(true);
                expect(result.body.length).toBe(3);
            });
        });


        describe("convertMapOfJavaScriptFileToArray", function(){
            var parsedFile;
            beforeEach(function(){
                var acorn = require("acorn");
                parsedFile = acorn.parse(fileContents);
            });

            it("should throw an error if given something without a body property", function(){
                expect(function(){
                    utils.convertMapOfJavaScriptFileToArray();
                }).toThrow("Map must have a body property.");

                expect(function(){
                   utils.convertMapOfJavaScriptFileToArray({test: "test"});
                }).toThrow("Map must have a body property.");
            });

            it("should be able to do something with the result body", function(){
                var result = utils.convertMapOfJavaScriptFileToArray(parsedFile);
            });

        });

    });



});