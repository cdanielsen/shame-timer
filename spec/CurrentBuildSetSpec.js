
describe("CurrentBuildSet", function() {
	
  describe("#initialize", function() {
  	it("should set builds property to be an empty array", function() {
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
  		expect(testBuildSet.builds).toEqual([]);
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
    it("should populate the builds array with the current build names", function(){
      var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
      var resourcePath = "projects/Dev";
      var testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize(baseUrl, resourcePath);
      testBuildSet.getDevBuildNames();
      expect(testBuildSet.builds).toBeNonEmptyArray();
    });
	}); //end #getDevBuildNames

});