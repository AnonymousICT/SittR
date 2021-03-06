"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, startServer, stopServer } = require("../app/server.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("index page", function() {
    before(() => {
        return startServer;
    });
    after(() => {
        return stopServer;
    });

    it("should exist", function() {
        return chai
            .request(app)
            .get("/")
            .then(function(res) {
                expect(res).to.have.status(200);
            });
    });

    //more testing here
});
