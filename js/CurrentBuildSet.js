
var CurrentBuildSet = {
	initialize : function(baseUrl, resourcePath) {
		this.builds = [];
		this.buildNames = [];
    this.status = "";
    this.baseUrl = baseUrl;
    this.resourcePath = resourcePath;
	},

	getDevBuildNames : function() {
    var that = this;
    var newRequest = Object.create(AsyncGetRequest);
    newRequest.initialize(this.baseUrl, this.resourcePath);
    newRequest.execute();
    var currentDevInfo = newRequest.response;
    currentDevInfo.buildTypes.buildType.forEach(function(build) {
      that.buildNames.push(build.id);
    });
	},

  getDevBuildObjects : function() {
    var that = this;
    var baseUrl = 'http://teamcity:8080/guestAuth/app/rest/builds/buildType:'
    this.buildNames.forEach(function(buildName) {
      var newRequest = Object.create(AsyncGetRequest);
      newRequest.initialize(baseUrl, buildName);
      newRequest.execute();
      that.builds.push(newRequest.response)
    });    
  },

  setBuildSetStatus : function() {
    var that = this;
    this.builds.forEach(function(build) {
      if (build.status === "SUCCESS") {
        that.status = "SUCCESS";
      } else {
        that.status = "FAILURE";
      }
    });
  }
}