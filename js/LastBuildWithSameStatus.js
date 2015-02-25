var LastBuildWithSameStatus = {
	initialize : function(currentBuildSetObject) {
     console.log("***Build Set Status History***");
     this.buildHistories = {};
     this.lastBuildWithSameStatus = {};
     this.timeStamp = {};
     this.buildHistoryCounter = 0;
     this.previousSet = [];
     this.currentSet = [];
     this.currentBuildSetObject = currentBuildSetObject;
     this.getBuildHistories();
     this.getLastBuildWithSameStatus();
     this.setTimestamp();
     // this.setLongestDuration();
     console.log("Build has been this way since...", this.timeStamp);
     console.log("Last(successful)/first(failing) build in the last build set with the same overall status as the current one:", this.lastBuildWithSameStatus);
	},

  getBuildHistories : function() {
    var that = this;
    var baseUrl = "http://teamcity:8080/guestAuth/app/rest/builds/?locator=buildType:";
    this.currentBuildSetObject.buildNames.forEach(function(buildName) {
      var newRequest = Object.create(SyncGetRequest);
      newRequest.initialize(baseUrl, (buildName + ",branch:default:any"));
      newRequest.execute();
      that.buildHistories[buildName] = newRequest.response.build;
    });
  },

  getLastBuildWithSameStatus : function() {
    var currentSetStatusArray = [];
    var firstFailFoundIndex
    this.currentSet = [];

    for (var buildHistory in this.buildHistories) {
      this.currentSet.push(this.buildHistories[buildHistory][this.buildHistoryCounter]);
    };
    // sort currentSet from last completed build to earliest
    this.sortSetOfBuilds();
    
    // this block for logging purposes...
    console.log(this.currentSet.map(function(build) { return build.status }));
    
    // this block ensures previousSetObject is set in case there is only one build history
    if (this.buildHistoryCounter === 0) {
      this.previousSet = this.currentSet;
      this.buildHistoryCounter = this.buildHistoryCounter + 1;
      this.getLastBuildWithSameStatus();
    }

    if (this.currentBuildSetObject.status === "SUCCESS") {
      if (this.currentSet.map(function(object) {return object.status}).indexOf("FAILURE") !== -1) {
        this.lastBuildWithSameStatus = this.previousSet[0];
      } else {
        this.previousSet = this.currentSet;
        this.buildHistoryCounter = this.buildHistoryCounter + 1;
        this.getLastBuildWithSameStatus();
      }

    } else { //"FAILURE"
      if (this.currentSet.map(function(object) {return object.status}).indexOf("FAILURE") === -1) {
        firstFailFoundIndex = this.previousSet.map(function(object) {return object.status}).indexOf("FAILURE");
        this.lastBuildWithSameStatus = this.previousSet[firstFailFoundIndex];
      } else {
        this.previousSet = this.currentSet;
        this.buildHistoryCounter = this.buildHistoryCounter + 1;
        this.getLastBuildWithSameStatus();
      }
    }
  },

  sortSetOfBuilds : function(){
    this.currentSet.sort(function(a,b){
      var aTimeStamp = a.startDate.slice(0,8) + a.startDate.slice(9,15);
      var bTimeStamp = b.startDate.slice(0,8) + b.startDate.slice(9,15);
      return aTimeStamp - bTimeStamp;
    });
    this.currentSet.reverse();
  },

  setTimestamp : function() {
    var teamCityTime = this.lastBuildWithSameStatus.startDate;
    var year = teamCityTime.slice(0, 4);
    var month = teamCityTime.slice(4, 6);
    var day = teamCityTime.slice(6, 8);
    var hour = teamCityTime.slice(9, 11);
    var min = teamCityTime.slice(11, 13);
    var sec = teamCityTime.slice(13, 15);
    var offset = teamCityTime.slice(16, 20);
    this.timeStamp = new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec + "-" + offset);
  }

  // setLongestDuration : function() {
  //   localStorage.longestFail = (Date.now() - this.timeStamp);
  // }
}