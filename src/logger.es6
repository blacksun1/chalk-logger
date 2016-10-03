/* eslint-disable no-console */

exports = module.exports = class ConsoleLogger {

    constructor(chalk, console, name) {

        this.chalk = chalk;
        this.console = console;
        this.name = name || "logger";
    }

    log(message) {

        this.writeMessage_("log", this.chalk.green, message);
    }

    writeMessage_(status, color, message) {

        this.console.log(`${this.chalk.grey((new Date).toISOString())} ${color(this.name)}: ${this.chalk.blue(message)}`);
    }

    trace(message) {

        this.writeMessage_("trace", this.chalk.grey, message);
    }

    debug(message) {

        this.writeMessage_("debug", this.chalk.grey, message);
    }

    info(message) {

        this.writeMessage_("info", this.chalk.green, message);
    }

    warn(message) {

        this.writeMessage_("warn", this.chalk.yellow, message);
    }

    error(message) {

        this.writeMessage_("error", this.chalk.red, message);
    }

    fatal(message) {

        this.writeMessage_("fatal", this.chalk.red, message);
    }

    static get $inject() {

        return ["chalk", "console"];
    }
};
