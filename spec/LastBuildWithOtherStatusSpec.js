describe("LastBuildWithOtherStatus", function() {
	
  var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
  var resourcePath = "projects/Dev";
  beforeEach(function(){
    currentBuildSet = Object.create(CurrentBuildSet);
    currentBuildSet.initialize(baseUrl, resourcePath);
    lastDifferentBuild = Object.create(LastBuildWithOtherStatus);
    lastDifferentBuild.initialize(currentBuildSet);
  })

  describe("#initialize", function() {
		it("should set the timestamp and currentBuildSet properties", function() {
      expect(lastDifferentBuild.timeStamp).toBeObject();
      expect(lastDifferentBuild.currentBuildSetObject).toBeObject();
    });
	});

  describe("#getLastBuildWithOtherStatus", function() {
    it("should find the last build with the opposite status of the currentBuildSet", function() {
      expect(lastDifferentBuild.lastBuildWithOtherStatus).toBeObject();
    });
  });

  describe("#setTimestamp", function() {
    it("should set the timestamp of the object", function() {
      expect(lastDifferentBuild.timeStamp).toBeObject();
    });
  });

});