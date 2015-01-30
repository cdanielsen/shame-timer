
var CurrentBuildSet = {
	initialize : function() {
		this.builds = [];
		this.status = "";
	},
	getDevBuildNames : function() {
    var that = this;
    var superNewRequest = new XMLHttpRequest();
    superNewRequest.open("GET", 'http://teamcity:8080/guestAuth/app/rest/projects/Dev', false); //false = synchronous request
    superNewRequest.setRequestHeader('Accept', 'application/json');
    superNewRequest.send();
    var currentDevInfo = JSON.parse(superNewRequest.response);
    currentDevInfo.buildTypes.buildType.forEach(function(build) {
      that.builds.push(build.id);
    });
	}
}