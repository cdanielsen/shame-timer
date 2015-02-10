
var CurrentBuildSet = {
	initialize : function(baseUrl, resourcePath) {
		this.builds = [];
		this.buildNames = [];
    this.status = "SUCCESS";
    this.baseUrl = baseUrl;
    this.resourcePath = resourcePath;
    this.getDevBuildNames();
    this.getDevBuildObjects();
    this.setBuildSetStatus();
	},

	getDevBuildNames : function() {
    var that = this;
    var newRequest = Object.create(SyncGetRequest);
    newRequest.initialize(this.baseUrl, this.resourcePath);
    newRequest.execute();
    var currentDevInfo = newRequest.response;
    currentDevInfo.buildTypes.buildType.forEach(function(build) {
      if (build.id !== "Dev_5DevCodeCoverageNightly" &&
          build.id !== "Dev_UiAutomationTests") { //exclusion list for builds that are run irregularly
        that.buildNames.push(build.id);
        console.log(that.buildNames);
      }
    });
	},

  getDevBuildObjects : function() {
    var that = this;
    var baseUrl = 'http://teamcity:8080/guestAuth/app/rest/builds/buildType:'
    this.buildNames.forEach(function(buildName) {
      var newRequest = Object.create(SyncGetRequest);
      newRequest.initialize(baseUrl, buildName);
      newRequest.execute();
      that.builds.push(newRequest.response)
    });    
  },

  setBuildSetStatus : function() {
    var that = this;
    this.builds.forEach(function(build) {
      if (build.status === "FAILURE") { that.status = "FAILURE" };
    });
  }
}