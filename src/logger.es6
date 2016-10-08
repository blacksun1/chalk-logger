const Assert = require("assert");


const internals = {};

internals.jsonReplacer = function jsonReplacer(key, value) {

    if (typeof value === "function") {

        return "<function>";
    }

    return value;
};


exports = module.exports = class ConsoleLogger {

    constructor(chalk, console, name) {

        Assert(chalk, "chalk is a required argument");
        Assert(console, "console is a required argument");

        this.chalk_ = chalk;
        this.console_ = console;
        this.name_ = name || "logger";
    }

    log(message, data) {

        this.writeMessage_("log", this.chalk_.green, message, data);
    }

    trace(message, data) {

        return this.writeMessage_("trace", this.chalk_.grey, message, data);
    }

    debug(message, data) {

        return this.writeMessage_("debug", this.chalk_.grey, message, data);
    }

    info(message, data) {

        return this.writeMessage_("info", this.chalk_.green, message, data);
    }

    warn(message, data) {

        return this.writeMessage_("warn", this.chalk_.yellow, message, data);
    }

    error(message, data) {

        return this.writeMessage_("error", this.chalk_.red, message, data);
    }

    fatal(message, data) {

        return this.writeMessage_("fatal", this.chalk_.red, message, data);
    }

    writeMessage_(status, color, message, data) {

        let message_ = message;
        let data_ = data;

        // if (typeof message_ === "function") {
        //     try {
        //         const results = message.call(null);
        //         if (Array.isArray(results) && results.length === 2 && typeof data_ === "undefined") {
        //             [message_, data_] = results;
        //         } else {
        //             message_ = results;
        //         }
        //     } catch (err) {
        //         message_ = "message function threw an error";
        //         data_ = err;
        //     }
        // }

        this.console_.log(`${this.chalk_.grey((new Date).toISOString())} ${color(this.name_)}: ${this.chalk_.blue(message_)}`);

        const dataType = typeof data_;
        if (dataType === "undefined") {

            return;
        }

        if (dataType === "object") {

            if (data_ instanceof Error) {
                this.console_.log(`${this.chalk_.grey(data_.stack)}`);

                return;
            }

            if (data_ instanceof Date) {
                this.console_.log(`${this.chalk_.grey(data_.toISOString())}`);

                return;
            }

            let serialisedData;
            try {
                serialisedData = JSON.stringify(data_, internals.jsonReplacer, 2);
            } catch(err) {
                serialisedData = data_.toString();
            }

            this.console_.log(`${this.chalk_.grey(serialisedData.toString())}`);

            return;
        }

        this.console_.log(`${this.chalk_.grey(data_)}`);
    }

    static get $inject() {

        return ["chalk", "console"];
    }
};
