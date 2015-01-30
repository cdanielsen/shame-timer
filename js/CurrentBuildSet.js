
var CurrentBuildSet = {
	initialize : function(baseUrl, resourcePath) {
		this.builds = [];
		this.status = "";
    this.baseUrl = baseUrl;
    this.resourcePath = resourcePath;
	},
	getDevBuildNames : function() {
    var that = this;
    var superNewRequest = Object.create(AsyncGetRequest);
    superNewRequest.initialize(this.baseUrl, this.resourcePath);
    superNewRequest.execute();
    var currentDevInfo = superNewRequest.response;
    currentDevInfo.buildTypes.buildType.forEach(function(build) {
      that.builds.push(build.id);
    });
	}
}