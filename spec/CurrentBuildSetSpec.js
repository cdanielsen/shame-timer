
describe("CurrentBuildSet", function() {
	
  describe("#initialize", function() {
  	it("should set build and build names properties to be a empty arrays", function() {
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
  		expect(testBuildSet.builds).toEqual([]);
      expect(testBuildSet.buildNames).toEqual([]);
  	});

  	it("should set status to be an empty string", function() {
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
      expect(testBuildSet.status).toBe("");
    });

    it("should set the baseUrl and resourcePath properties based on input", function() {
      var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
      var resourcePath = "projects/Dev";
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize(baseUrl, resourcePath);
      expect(testBuildSet.baseUrl).toBe(baseUrl);
      expect(testBuildSet.resourcePath).toBe(resourcePath);
    })
  });  //end #initialize

  describe("#getDevBuildNames", function(){
    it("should populate the build names array with the current build names", function(){
      var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
      var resourcePath = "projects/Dev";
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize(baseUrl, resourcePath);
      testBuildSet.getDevBuildNames();
      expect(testBuildSet.buildNames).toBeNonEmptyArray();
    });
	}); //end #getDevBuildNames

  describe("#getDevBuildObjects", function() {
    it("should populate the builds array with the current build objects", function(){
      var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
      var resourcePath = "projects/Dev";
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize(baseUrl, resourcePath);
      testBuildSet.getDevBuildNames();
      testBuildSet.getDevBuildObjects();
      expect(testBuildSet.builds).toBeNonEmptyArray();
    });
  });
});