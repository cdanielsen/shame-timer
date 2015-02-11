~~ ShameTimer ~~
=====================================

##Description:

An AngularJS script to display a dynamic view of how long a project from TeamCity has been down (or up!)

##Author:

* [Christian Danielsen] (https://github.com/cdanielsen)

##Local Implementation:
- In shametimer.html, adjust the baseURL and projectResourcePath to your local team city settings and project name, respectively.
- On load (Chrome or Firefox only!), console should show the build set history: a list of arrays FROM the build set before the current one TO the first build set with a different overall status (!)

## Dependencies
- AngularJS (loaded with CDN script by default)
- MomentJS: A JS time manipulation library (loaded with CDN script by default)
- Moment-Duration-Format: a MomentJS plugin that allows for easy formatting (must be installed locally via (http://github.com/jsmreese/moment-duration-format)
- A Google Font (Oswald)

##Known Bugs/Workarounds/Hacks
- Does not currently work with IE =/
- Currently populates historical "build sets" to check by ensuring that each individual build clear a threshold number of build attempts. This is to prevent builds that don't get triggered very often from contaminating the timestamp...

##WIP/Desired Features
-Improved unit tests
