

describe("CurrentBuildSet", function() {
	it("should intialize with an empty array of builds", function() {
		testBuildSet = Object.create(CurrentBuildSet);
		testBuildSet.initialize();
		expect(testBuildSet.builds).toEqual([]);
	});
});