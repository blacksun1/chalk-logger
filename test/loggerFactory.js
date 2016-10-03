"use strict";

// Imports

const Lab = require("lab");
const Code = require("code");
const Sut = require("../dist/loggerFactory");


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


// Tests

describe("loggerFactory", () => {

    it("should return a logger object", (done) => {

        // Act
        const actual = Sut();

        // Assert
        expect(actual).to.be.an.object();
        expect(actual.log).to.be.a.function();

        return done();
    });

    it("should return a logger named object", (done) => {

        // Act
        const actual = Sut("test");

        // Assert
        expect(actual).to.be.an.object();
        expect(actual.log).to.be.a.function();

        return done();
    });
});
