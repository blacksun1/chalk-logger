const Intravenous = require("intravenous");
const LoggerModule = require("./loggerModule");


exports = module.exports = function loggerFactory(name) {

    const container = Intravenous.create();

    LoggerModule(container);

    if (name) {
        return container.get("logger", name);
    }

    return container.get("logger");
};
