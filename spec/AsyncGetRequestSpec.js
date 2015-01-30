
describe("AsyncGetRequest", function() {

  describe("#initialize", function() {
    it("should set the base url and resource path properties", function() {
      var newRequest = Object.create(AsyncGetRequest);
      newRequest.initialize("http://www.yo.com/", "Stuff");
      expect(newRequest.baseUrl).toEqual("http://www.yo.com/");
      expect(newRequest.resourcePath).toBe("Stuff");
    });
  }); //end #intialize

  describe("#execute", function() {
    it("should successfully open and send a request", function() {
      var newRequest = Object.create(AsyncGetRequest);
      var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
      var resourcePath = "projects/Dev";
      newRequest.initialize(baseUrl, resourcePath);
      newRequest.execute();
      expect(newRequest.status).toBe(200);
    });

    it("should set the response to the object's response property", function() {
      var newRequest = Object.create(AsyncGetRequest);
      var baseUrl = "http://teamcity:8080/guestAuth/app/rest/";
      var resourcePath = "projects/Dev";
      newRequest.initialize(baseUrl, resourcePath);
      newRequest.execute();
      expect(typeof(newRequest.response)).toBe("object"); //not the best assertion...
    })
  }); //end #execute

});