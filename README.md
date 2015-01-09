~~ ShameTimer ~~
=====================================

##Description:

An AngularJS script to display a dynamic view of how long a build from TeamCity has been down (or up!)

##Author:

* [Christian Danielsen] (https://github.com/cdanielsen)

##Local Implementation:
- Load html file in IE and login with TeamCity authentication when prompted 

##Known Bugs
- Does not work in Chrome (rejects data request from TeamCity as illegal XHR cross-origin request)

##WIP/Desired features
- Time only reflects distance from LATEST build, not the EARLIEST with that same status
- Currently only checks one suite of tests on the build (integration). Should probably check if any of them are failing
- Improved styling?
	-- Superior font
	-- Change color of {{build status}} text based on... status (congrats green vs scary red?)
