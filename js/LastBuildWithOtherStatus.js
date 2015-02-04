var LastBuildWithOtherStatus = {
	initialize : function(currentBuildSetObject) {
     console.log("***Build Set Status History***");
     this.buildHistories = {};
     this.lastBuildWithOtherStatus = {};
     this.timeStamp = {};
     this.buildHistoryCounter = 1;
     this.currentBuildSetObject = currentBuildSetObject;
     this.lastBuildName = this.currentBuildSetObject.buildNames[this.currentBuildSetObject.buildNames.length - 1];
     this.getBuildHistories();
     this.getLastBuildWithOtherStatus();
     this.setTimestamp();
     console.log("Last build in a previous set with same overall status as current:", this.timeStamp, this.lastBuildWithOtherStatus);
	},
  getBuildHistories : function() {
    var that = this;
    var baseUrl = "http://teamcity:8080/guestAuth/app/rest/builds/?locator=buildType:";
    this.currentBuildSetObject.buildNames.forEach(function(buildName) {
      var newRequest = Object.create(SyncGetRequest);
      newRequest.initialize(baseUrl, buildName);
      newRequest.execute();
      that.buildHistories[buildName] = newRequest.response.build;
    });
  },
  getLastBuildWithOtherStatus : function() {
    var currentSet = [];
    for (var buildHistory in this.buildHistories) {
      currentSet.push(this.buildHistories[buildHistory][this.buildHistoryCounter].status);
    };
    console.log(currentSet);
    if (this.currentBuildSetObject.status === "SUCCESS") {
      if (currentSet.indexOf("FAILURE") !== -1) {
        this.lastBuildWithOtherStatus = this.buildHistories[this.lastBuildName][this.buildHistoryCounter - 1];
      } else {
        this.buildHistoryCounter = this.buildHistoryCounter + 1;
        getLastBuildWithOtherStatus();
      }

    } else { //"FAILURE"
      if (currentSet.indexOf("FAILURE") === -1) {
        this.lastBuildWithOtherStatus = this.buildHistories[this.lastBuildName][this.buildHistoryCounter - 1];
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
    var hour = parseInt(teamCityTime.slice(9, 11)) + 8; //Offset for GMT
    hour = hour.toString();
    var min = teamCityTime.slice(11, 13);
    var sec = teamCityTime.slice(13, 15);
    this.timeStamp = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
  }
}