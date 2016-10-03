const Chalk = require("chalk");
const Logger = require("./logger");


exports = module.exports = function(container) {

    container.register("chalk", Chalk, "singleton");
    container.register("console", console, "singleton");
    container.register("logger", Logger);

    return;
};
