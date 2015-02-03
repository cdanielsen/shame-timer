var LastBuildWithOtherStatus = {
	initialize : function(currentBuildSetObject) {
     this.lastBuildWithOtherStatus = {};
     this.timeStamp = {};
     this.buildHistoryCounter = 1;
     this.currentBuildSetObject = currentBuildSetObject;
     this.getLastBuildWithOtherStatus();
     this.setTimestamp();
	},
  getLastBuildWithOtherStatus : function() {
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
  },
  setTimestamp : function() {
    var teamCityTime = this.lastBuildWithOtherStatus.startDate
    var year = teamCityTime.slice(0, 4);
    var month = teamCityTime.slice(4, 6);
    var day = teamCityTime.slice(6, 8);
    var hour = teamCityTime.slice(9, 11);
    var min = teamCityTime.slice(11, 13);
    var sec = teamCityTime.slice(13, 15);
    this.timeStamp = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
  }
}