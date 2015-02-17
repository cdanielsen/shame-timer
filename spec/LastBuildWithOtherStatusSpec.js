describe("LastBuildWithOtherStatus", function() {
	
  var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
  var resourcePath = "projects/Dev";
  beforeEach(function(){
    currentBuildSet = Object.create(CurrentBuildSet);
    currentBuildSet.initialize(baseUrl, resourcePath);
    lastSameBuild = Object.create(LastBuildWithSameStatus);
    lastSameBuild.initialize(currentBuildSet);
  })

  describe("#initialize", function() {
		it("should set the currentBuildSet property", function() {
      expect(lastSameBuild.currentBuildSetObject.builds).toBeNonEmptyArray();
    });
	});

  describe("#getLastBuildWithSameStatus", function() {
    it("should find the last build with the same status of the currentBuildSet", function() {
      expect(lastSameBuild.lastBuildWithSameStatus.buildTypeId).toBeNonEmptyString();
    });
  });

  describe("#setTimestamp", function() {
    it("should set the timestamp of the object", function() {
      expect(lastSameBuild.timeStamp).toBeDate();
    });
  });

});