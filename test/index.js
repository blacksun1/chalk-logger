"use strict";

// Imports
const Lab = require("lab");
const Code = require("code");
const Sut = require("../");


// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


// Tests
describe("index", () => {

    it("should include service and module", (done) => {

        // Assert
        expect(Sut).to.be.an.object().and.include(["logger", "loggerFactory", "registrationModule"]);

        return done();
    });
});
