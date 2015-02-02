var LastBuildWithOtherStatus = {
	initialize : function(currentBuildSetObject) {
     this.lastBuildWithOtherStatus = {};
     this.timeStamp = "";
     this.buildHistoryCounter = 1;
     this.currentBuildSetObject = currentBuildSetObject;
	},
  getLastBuildWithOtherStatus : function() {
    console.log(this.buildHistoryCounter);
    var that = this;
    var baseUrl = "http://teamcity:8080/guestAuth/app/rest/builds/?locator=buildType:";
    this.currentBuildSetObject.buildNames.forEach(function(buildName) {
      var newRequest = Object.create(AsyncGetRequest);
      newRequest.initialize(baseUrl, buildName);
      newRequest.execute();
      if (newRequest.response.build[that.buildHistoryCounter].status !== that.currentBuildSetObject.status) {
        that.lastBuildWithOtherStatus = newRequest.response.build[that.buildHistoryCounter];
      }
    });
    if (Object.keys(this.lastBuildWithOtherStatus).length === 0) {
      this.buildHistoryCounter = this.buildHistoryCounter + 1;
      this.getLastBuildWithOtherStatus();
    }
  }
}