
var SyncGetRequest = {
  initialize: function(baseUrl, resourcePath) {
    this.baseUrl = baseUrl;
    this.resourcePath = resourcePath;
  },
  execute: function() {
    var response;
    var newRequest = new XMLHttpRequest();
    newRequest.open("GET", this.baseUrl + this.resourcePath, false);
    newRequest.setRequestHeader('Accept', 'application/json');
    newRequest.send();
    newRequest.status === 200 ? this.status = 200 : this.status = null;
    this.response = JSON.parse(newRequest.response);
  }
}