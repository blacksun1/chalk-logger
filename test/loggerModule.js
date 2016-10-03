"use strict";

// Imports

const Lab = require("lab");
const Code = require("code");
const Sinon = require("sinon");
const Sut = require("../dist/loggerModule");


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


// Tests

describe("loggerModule", () => {

    it("should register only console and logger", (done) => {

        // Arrange
        const container = {
            register: Sinon.spy()
        };

        // Act
        Sut(container);

        // Assert
        expect(container.register.callCount).to.equal(3);
        expect(container.register.calledWith(Sinon.match("chalk"))).to.be.true();
        expect(container.register.calledWith(Sinon.match("console"))).to.be.true();
        expect(container.register.calledWith(Sinon.match("logger"))).to.be.true();

        return done();
    });
});
