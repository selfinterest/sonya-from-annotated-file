/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 2:06 PM
 */

describe("from annotated file", function(){
    var baProvider;
    beforeEach(function(){
       baProvider = require("../../lib/from-annotated-file.js");
    });
    it("should exist", function(){
       expect(typeof baProvider).toBe("function");
    });
});