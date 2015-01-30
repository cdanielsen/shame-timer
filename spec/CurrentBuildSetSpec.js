
describe("CurrentBuildSet", function() {
	
  describe("#initialize", function() {
  	it("should intialize with an empty list of builds", function() {
      var testBuildSet;
      testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
  		expect(testBuildSet.builds).toEqual([]);
  	});

  	it("should initialize with no default status", function() {
      var testBuildSet;
      testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
      expect(testBuildSet.status).toBe("");
    });
  });

  describe("#getDevBuildNames", function(){
    it("should populate the builds array with the current build names", function(){
      var testBuildSet;
      testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
      testBuildSet.getDevBuildNames();
      expect(testBuildSet.builds).toBeNonEmptyArray();
    });
	});
});