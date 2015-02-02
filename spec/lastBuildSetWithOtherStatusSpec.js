describe("LastBuildSetWithOtherStatus", function() {
	
  describe("#initialize", function() {
		it("should set the builds and timestamp properties", function() {
      lastBuildSet = Object.create(LastBuildSetWithOtherStatus);
      lastBuildSet.initialize();
      expect(lastBuildSet.builds).toEqual([]);
      expect(lastBuildSet.timeStamp).toBe("");
    });
	});
});