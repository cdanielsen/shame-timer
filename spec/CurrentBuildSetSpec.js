
describe("CurrentBuildSet", function() {
  var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
  var resourcePath = "projects/Dev";
  var testBuildSet = Object.create(CurrentBuildSet);

  beforeEach(function(){
    testBuildSet.initialize(baseUrl, resourcePath);
  });

  describe("#initialize", function() {
    it("should set the baseUrl and resourcePath properties based on arguments", function() {
      expect(testBuildSet.baseUrl).toBe(baseUrl);
      expect(testBuildSet.resourcePath).toBe(resourcePath);
    });

    it("should set build names, builds and status properties", function() {
      expect(testBuildSet.buildNames).toBeNonEmptyArray();
      expect(testBuildSet.builds).toBeNonEmptyArray();
      expect(testBuildSet.status).toBeNonEmptyString();
    });
  });  //end #initialize

  describe("#getDevBuildNames", function(){

    it("should populate the build names array with the current build names", function(){
      expect(testBuildSet.buildNames).toBeNonEmptyArray();
    });
	}); //end #getDevBuildNames

  describe("#getDevBuildObjects", function() {
    it("should populate the builds array with the current build objects", function(){
      expect(testBuildSet.builds).toBeNonEmptyArray();
    });
  }); //end #getDevBuildObjects

  describe("#setBuildSetStatus", function() {
    it("should loop through the current build set to find any failing builds", function() {
      expect(testBuildSet.status).toBeNonEmptyString();
    });
  }); //end #setBuildSetStatus
  
});