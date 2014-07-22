/**
 * Created by: Terrence C. Watson
 * Date: 7/21/14
 * Time: 2:14 PM
 */
describe("from annotated file main module", function(){
   var sonya;
   beforeEach(function(){
      require("../../lib/main.js");
      sonya = require("sonya");
   });

   it("should have added a provider to sonya", function(){
      expect(sonya.Provide.fromAnnotatedFile).to.not.be.undefined;
   });
});