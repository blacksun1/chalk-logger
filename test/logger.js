"use strict";

// Imports
const Lab = require("lab");
const Code = require("code");
const Sinon = require("sinon");
const Intravenous = require("intravenous");
const Sut = require("../dist/logger");


// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;
const expect = Code.expect;


// Tests
describe("Logger", () => {

    let container;

    it("Should not allow itself to be called without new", (done) => {

        // Act
        const act = () => Sut();

        // Assert
        expect(act).to.throw(TypeError, /Cannot call a class as a function/);

        return done();
    });

    beforeEach((done) => {

        container = Intravenous.create();
        container.register("sut", Sut);
        container.register("console", {
            log: Sinon.spy()
        }, "singleton");
        container.register("chalk", {
            blue: Sinon.stub().returnsArg(0),
            green: Sinon.stub().returnsArg(0),
            grey: Sinon.stub().returnsArg(0),
            red: Sinon.stub().returnsArg(0),
            yellow: Sinon.stub().returnsArg(0)
        }, "singleton");

        return done();
    });

    afterEach((done) => {

        container.dispose();

        return done();
    });

    it("should have a static $inject property", (done) => {

        expect(Sut.$inject).to.be.an.array();

        return done();
    });

    [
        { name: "trace", color: "grey" },
        { name: "debug", color: "grey" },
        { name: "log", color: "green" },
        { name: "info", color: "green"  },
        { name: "warn", color: "yellow" },
        { name: "error", color: "red" },
        { name: "fatal", color: "red" }
    ].forEach((method) => {

        describe(`${method.name} method`, () => {

            it("should log with console object", (done) => {

                // Arrange
                const sut = container.get("sut");

                // Act
                sut[method.name]("my message");

                // Assert
                const console = container.get("console");
                expect(console.log.calledOnce).to.be.true();
                expect(console.log.calledWith(Sinon.match(/logger: my message/))).to.be.true();

                return done();
            });

            it("should log with console object with custom name", (done) => {

                // Arrange
                const sut = container.get("sut", "my custom logger");

                // Act
                sut[method.name]("my message");

                // Assert
                const console = container.get("console");
                expect(console.log.calledOnce).to.be.true();
                expect(console.log.calledWith(Sinon.match(/my custom logger: my message/))).to.be.true();

                return done();
            });

            it("should log with colour", (done) => {

                // Arrange
                const sut = container.get("sut");

                // Act
                sut[method.name]("my message");

                // Assert
                const chalk = container.get("chalk");
                expect(chalk.grey.called).to.be.true();
                expect(chalk[method.color].called).to.be.true();
                expect(chalk.blue.called).to.be.true();

                return done();
            });

            it("should log string data", (done) => {

                // Arrange
                const sut = container.get("sut");

                // Act
                sut[method.name]("my message", "my data");

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(chalk.grey.lastCall.args[0]).to.equal("my data");
                expect(console_.log.lastCall.args[0]).to.equal("my data");

                return done();
            });

            it("should log number data", (done) => {

                // Arrange
                const sut = container.get("sut");

                // Act
                sut[method.name]("my message", 3);

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(chalk.grey.lastCall.args[0], "check chalk").to.equal(3);
                expect(console_.log.lastCall.args[0], "check console").to.equal("3");

                return done();
            });

            it("should log date data", (done) => {

                // Arrange
                const sut = container.get("sut");
                const testDate = new Date();
                const expectedDateString = testDate.toISOString();

                // Act
                sut[method.name]("my message", testDate);

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(chalk.grey.lastCall.args[0], "check chalk").to.equal(expectedDateString);
                expect(console_.log.lastCall.args[0], "check console").to.equal(expectedDateString);

                return done();
            });

            it("should log error data", (done) => {

                // Arrange
                const sut = container.get("sut");
                const testError = new Error("CAKE!");
                const expectedErrorString = testError.stack;

                // Act
                sut[method.name]("my message", testError);

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(chalk.grey.lastCall.args[0], "check chalk").to.equal(expectedErrorString);
                expect(console_.log.lastCall.args[0], "check console").to.equal(expectedErrorString);

                return done();
            });

            it("should log object data", (done) => {

                // Arrange
                const sut = container.get("sut");
                const testObject = { "cake": "chocolate" };
                const expectedObject = { "cake": "chocolate" };

                // Act
                sut[method.name]("my message", testObject);

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(JSON.parse(chalk.grey.lastCall.args[0]), "check chalk").to.equal(expectedObject);
                expect(JSON.parse(console_.log.lastCall.args[0]), "check console").to.equal(expectedObject);

                return done();
            });

            it("should log object data with a function", (done) => {

                // Arrange
                const sut = container.get("sut");
                const testObject = { cake: "chocolate", eatCake: function() {} };
                const expectedObject = { cake: "chocolate", eatCake: "<function>" };

                // Act
                sut[method.name]("my message", testObject);

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(JSON.parse(chalk.grey.lastCall.args[0]), "check chalk").to.equal(expectedObject);
                expect(JSON.parse(console_.log.secondCall.args[0]), "check console").to.equal(expectedObject);

                return done();
            });

            it("should log object data and handle cyclic dependencies", (done) => {

                // Arrange
                const sut = container.get("sut");
                const testObject = { cake: "chocolate", eatCake: function() {} };
                testObject.testObject = testObject;
                const expected = testObject.toString();

                // Act
                sut[method.name]("my message", testObject);

                // Assert
                const chalk = container.get("chalk");
                const console_ = container.get("console");
                expect(chalk.grey.lastCall.args[0], "check chalk").to.equal(expected);
                expect(console_.log.secondCall.args[0], "check console").to.equal(expected);

                return done();
            });

            it("should log message if it is a function");
        });
    });
});
