describe("LastBuildWithOtherStatus", function() {
	
  var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
  var resourcePath = "projects/Dev";
  beforeEach(function(){
    currentBuildSet = Object.create(CurrentBuildSet);
    currentBuildSet.initialize(baseUrl, resourcePath);
  })

  describe("#initialize", function() {
		it("should set the timestamp and currentBuildSet properties", function() {
      lastDifferentBuild = Object.create(LastBuildWithOtherStatus);
      lastDifferentBuild.initialize(currentBuildSet);
      expect(lastDifferentBuild.timeStamp).toBe("");
      expect(lastDifferentBuild.currentBuildSetObject).toBeObject();
    });
	});

  describe("#getLastBuildWithOtherStatus", function() {
    it("should find the last build with the opposite status of the currentBuildSet", function() {
      lastDifferentBuild.initialize(baseUrl, resourcePath);
      lastDifferentBuild = Object.create(LastBuildWithOtherStatus);
      lastDifferentBuild.initialize(currentBuildSet);
      lastDifferentBuild.getLastBuildWithOtherStatus();
      expect(lastDifferentBuild.lastBuildWithOtherStatus).toBeObject();
    });
  });

});