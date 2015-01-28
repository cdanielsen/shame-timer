

describe("CurrentBuildSet", function() {
	
  describe("#initialize", function() {
    var testBuildSet;

  	beforeEach(function() {
  		testBuildSet = Object.create(CurrentBuildSet);
      testBuildSet.initialize();
  	});

  	it("should intialize with an empty list of builds", function() {
  		expect(testBuildSet.builds).toEqual([]);
  	});

  	it("should initialize with no default status", function() {
      expect(testBuildSet.status).toBe("");
    });

	});
});