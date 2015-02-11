var LastBuildWithOtherStatus = {
	initialize : function(currentBuildSetObject) {
     console.log("***Build Set Status History***");
     this.buildHistories = {};
     this.lastBuildWithOtherStatus = {};
     this.timeStamp = {};
     this.buildHistoryCounter = 0;
     this.currentBuildSetObject = currentBuildSetObject;

     this.getBuildHistories();
     this.getLastBuildWithOtherStatus();
     this.setTimestamp();
     console.log("Build has been this way since...", this.timeStamp);
     console.log("Latest build in the last build set with the same overall status as the current one:", this.lastBuildWithOtherStatus);
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

  getLastBuildWithOtherStatus : function() {
    var currentBuildSetStatusArray = [];
    this.currentSetObjects = [];

    for (var buildHistory in this.buildHistories) {
      this.currentSetObjects.push(this.buildHistories[buildHistory][this.buildHistoryCounter]);
    };
    this.sortSetOfBuilds();
    
    //this block for logging purposes...
    this.currentSetObjects.forEach(function(build) { currentBuildSetStatusArray.push(build.status) });
    console.log(currentBuildSetStatusArray);
    
    if (this.buildHistoryCounter === 0) { //this block ensures previousSetObject is set in case there is only one build history
      this.previousSetObjects = this.currentSetObjects
      this.buildHistoryCounter = this.buildHistoryCounter + 1;
      this.getLastBuildWithOtherStatus();
    }

    if (this.currentBuildSetObject.status === "SUCCESS") {
      if (this.currentSetObjects.map(function(object) {return object.status;}).indexOf("FAILURE") !== -1) {
        this.lastBuildWithOtherStatus = this.previousSetObjects[0];
      } else {
        this.previousSetObjects = this.currentSetObjects;
        this.buildHistoryCounter = this.buildHistoryCounter + 1;
        this.getLastBuildWithOtherStatus();
      }

    } else { //"FAILURE"
      if (this.currentSetObjects.map(function(object) {return object.status;}).indexOf("FAILURE") === -1) {
        this.lastBuildWithOtherStatus = this.previousSetObjects[0];
      } else {
        this.previousSetObjects = this.currentSetObjects;
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
  },

  sortSetOfBuilds : function(){
    this.currentSetObjects.sort(function(a,b){
      var aTimeStamp = a.startDate.slice(0,8) + a.startDate.slice(9,15);
      var bTimeStamp = b.startDate.slice(0,8) + b.startDate.slice(9,15);
      return aTimeStamp - bTimeStamp;
    });
    this.currentSetObjects.reverse();
  }
}