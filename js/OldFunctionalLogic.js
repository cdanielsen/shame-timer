    
      var currentPassingDevBuilds = [];
      var currentFailingDevBuilds = [];

      function getDevBuildNames(){
        var devBuildNames = [];
        var newRequest = new XMLHttpRequest();

        newRequest.open("GET", 'http://teamcity:8080/guestAuth/app/rest/projects/Dev', false); //false = synchronous request
        newRequest.setRequestHeader('Accept', 'application/json');
        // newRequest.setRequestHeader('Authorization', 'Basic YXBpdXNlcjp0ZXN0')
        newRequest.send();
        var currentDevInfo = JSON.parse(newRequest.response);
        
        currentDevInfo.buildTypes.buildType.forEach(function(build){
          devBuildNames.push(build.id);
        });
        return devBuildNames;
      }

      function seperateBuildObjects(){
        var baseUrl = 'http://teamcity:8080/guestAuth/app/rest/builds/buildType:'
        var newRequest = new XMLHttpRequest;
        var devBuildNames = getDevBuildNames();

        devBuildNames.forEach(function(buildName){
          newRequest.open("GET", baseUrl + buildName, false);
          newRequest.setRequestHeader('Accept', 'application/json');
          newRequest.send();
          var currentBuild = JSON.parse(newRequest.response);
          
          if (currentBuild.status === "SUCCESS") {
            currentPassingDevBuilds.push(currentBuild);
          } else {
            currentFailingDevBuilds.push(currentBuild);
          }
        });
      };

      function sortSetOfBuilds(buildArray){
        buildArray.sort(function(a,b){
          var aTimeStamp = createTimeStamp(a);
          var bTimeStamp = createTimeStamp(b);
          return aTimeStamp - bTimeStamp;
        });
        return buildArray;
      };

      function createTimeStamp(teamCityTime){
        var year = teamCityTime.finishDate.slice(0, 4);
        var month = teamCityTime.finishDate.slice(4, 6);
        var day = teamCityTime.finishDate.slice(6, 8);
        var hour = teamCityTime.finishDate.slice(9, 11);
        var min = teamCityTime.finishDate.slice(11, 13);
        var sec = teamCityTime.finishDate.slice(13, 15);
        return new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec);
      }

      //Begin function calls to find get current builds and sort them into passing/failing

      getDevBuildNames();
      seperateBuildObjects();
      if ( currentPassingDevBuilds != [] ) { var mostRecentPassingBuild = sortSetOfBuilds(currentPassingDevBuilds).reverse()[0]; }
      if ( currentFailingDevBuilds != [] ) { var mostRecentFailingBuild = sortSetOfBuilds(currentFailingDevBuilds).reverse()[0]; }

      //End function calls