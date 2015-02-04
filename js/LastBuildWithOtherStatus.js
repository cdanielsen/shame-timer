var LastBuildWithOtherStatus = {
	initialize : function(currentBuildSetObject) {
     console.log("***Build Set List Status History***");
     this.buildHistories = {};
     this.lastBuildWithOtherStatus = {};
     this.timeStamp = {};
     this.buildHistoryCounter = 1;
     this.currentBuildSetObject = currentBuildSetObject;
     this.getBuildHistories();
     this.getLastBuildWithOtherStatus();
     this.setTimestamp();
     console.log(this.timeStamp);
	},
  getBuildHistories : function() {
    var that = this;
    var baseUrl = "http://teamcity:8080/guestAuth/app/rest/builds/?locator=buildType:";
    this.currentBuildSetObject.buildNames.forEach(function(buildName) {
      var newRequest = Object.create(AsyncGetRequest);
      newRequest.initialize(baseUrl, buildName);
      newRequest.execute();
      that.buildHistories[buildName] = newRequest.response.build;
    });
  },
  getLastBuildWithOtherStatus : function() {
    var that = this;
    var currentSet = [];
    for (var buildHistory in this.buildHistories) {
      currentSet.push(this.buildHistories[buildHistory][this.buildHistoryCounter].status);
    };
    console.log(currentSet);
    if (this.currentBuildSetObject.status === "SUCCESS") {
      if (currentSet.indexOf("FAILURE") !== -1) {
        this.lastBuildWithOtherStatus = Object.keys(this.buildHistories)[0][that.buildHistoryCounter];
      } else {
        this.buildHistoryCounter = this.buildHistoryCounter + 1;
        getLastBuildWithOtherStatus();
      }

    } else { //"FAILURE"
      if (currentSet.indexOf("FAILURE") === -1) {
        this.lastBuildWithOtherStatus = this.buildHistories["Dev_Build"][that.buildHistoryCounter];
      } else {
        this.buildHistoryCounter = this.buildHistoryCounter + 1;
        this.getLastBuildWithOtherStatus();
      }
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
    console.log(year, month, day, hour, min, sec);
    this.timeStamp = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
  }
}