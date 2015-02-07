var LastBuildWithOtherStatus = {
	initialize : function(currentBuildSetObject) {
     console.log("***Build Set Status History***");
     this.buildHistories = {};
     this.lastBuildWithOtherStatus = {};
     this.timeStamp = {};
     this.buildHistoryCounter = 1;
     this.currentBuildSetObject = currentBuildSetObject;
     this.lastBuildName = "";
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
      buildName = buildName + ",branch:default:any";
      newRequest.initialize(baseUrl, buildName);
      newRequest.execute();
      if (newRequest.response.count > 20) { //Ignore builds that don't get compiled regularly
        that.buildHistories[buildName] = newRequest.response.build;
        that.lastBuildName = buildName; 
      }
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
        this.getLastBuildWithOtherStatus();
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
    var teamCityTime = this.lastBuildWithOtherStatus.startDate;
    var year = teamCityTime.slice(0, 4);
    var month = teamCityTime.slice(4, 6);
    var day = teamCityTime.slice(6, 8);
    var hour = teamCityTime.slice(9, 11);
    var min = teamCityTime.slice(11, 13);
    var sec = teamCityTime.slice(13, 15);
    var offset = teamCityTime.slice(16, 20);
    this.timeStamp = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec + "-" + offset);
  }
}