var assert = require("assert")
var supertest = require("supertest")
var should = require("should")

var server = supertest.agent("http://localhost:3001/api")

//Unit Test begin
describe("Mocha Test cases", function () {
    //User Login
    it("should login user and return success message", function (done) {
        server
            .post("/user/login")
            .send({
                email: "user1@gmail.com",
                password: "user1",
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status)
                res.status.should.equal(200)
                done()
            })
    })

    //get orders
    it("should signup user and return success message", function (done) {
        server
            .post("/user/signup")
            .send({
                firstname : "John",
                lastname : "Hark",
                email: "john@gmail.com",
                password: "john",
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status)
                res.status.should.equal(200)
                done()
            })
    })

    //get a selected restaurant details
    it("should get a selected restaurant by user and return success message", function (done) {
        server
            .post("/restaurant/getSelectedRestaurantData")
            .send({
                userid : "6187102ef8cd3ee7c7bc31f9"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status)
                res.status.should.equal(200)
                done()
            })
    })

    //get all restaurant details to display on home page
    it("should all restaurant details and return success message", function (done) {
        server
            .post("/restaurant/getAllRestaurants")
            .send({
                userid : "6187102ef8cd3ee7c7bc31f9"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status)
                res.status.should.equal(200)
                done()
            })
    })

    //Restaurant Login
    it("should login restaurant and return success message", function (done) {
        server
            .post("/restaurant/restaurantLogin")
            .send({
                email: "popeyes@gmail.com",
                password: "popeyes",
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status)
                res.status.should.equal(200)
                done()
            })
    })

})