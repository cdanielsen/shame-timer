~~ ShameTimer ~~
=====================================

##Description:

A small AngularJS app to display a dynamic view of how long a project from TeamCity has been down (or up!)

##Author:

* [Christian Danielsen] (https://github.com/cdanielsen)

##Local Implementation:
- In shametimer.html, adjust the baseURL and projectResourcePath to your local team city settings and project name, respectively.
- In CurrentBuildSet, add any build names to the && expression which should NOT be included in calculating the timestamp
- In a browser window, run the following script in the console (this sets needed local storage variables)
```
localStorage.longestFailDuration = 0;localStorage.longestSuccessDuration = 0;localStorage.longestFailDate = new Date;localStorage.longestSuccessDate = new Date;
```
- On load (Chrome or Firefox only!), console should show the build set history: a list of arrays FROM the build set before the current one TO the first build set with a different overall status (!)

## Dependencies
- localStorage
- AngularJS (loaded with CDN script by default)
- MomentJS: A JS time manipulation library (loaded with CDN script by default)
- Moment-Duration-Format: a MomentJS plugin that allows for easy formatting (must be installed locally via (http://github.com/jsmreese/moment-duration-format)
- A Google Font (Oswald)

##Known Bugs/Workarounds/Hacks
- Does not currently work with IE =/
- Currently filters/populates historical "build sets" with a hardcoded exclusion list. This is to prevent builds that don't get triggered very often from contaminating the  calculated timestamp...
- localStorage variables will persist between browser sessions/loads but will be reset if the cache is cleared!

##WIP/Desired Features
