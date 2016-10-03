# chalk-logger

[![Build Status](https://travis-ci.org/blacksun1/chalk-logger.svg?branch=master)](https://travis-ci.org/blacksun1/chalk-logger) [![Coverage Status](https://coveralls.io/repos/github/blacksun1/chalk-logger/badge.svg?branch=master)](https://coveralls.io/github/blacksun1/chalk-logger?branch=master)

A pleasant readable logger for humans.

## Usage

First install the package into your application

```bash
npm install --save blacksun1-chalk-logger
```

and then in your code

```js
const LoggerFactory = require("blacksun1-chalk-logger").loggerFactory;
const Package = require("./package.json");

const myLogger = LoggerFactory(Package.name);

myLogger.info("I'm logging!");
```

or if you use Intavenous you can use the registration package to regisiter it and it's required services into your container.

```js
const LoggerModule = require("blacksun1-chalk-logger").registrationModule;
const Package = require("./package.json");
const Intavenous = require("intavenous");

const container = Intavenous.create();
LoggerModule(container);
const myLogger = container.get("logger", Package.name);

myLogger.info("I'm logging!");
```

## API

Exports the following:

* `logger` - The actual logger class. Requires constructor arguments.
* `loggerFactory` - A factory function to create an instance of the logger class. Takes a parameter of `name` to set the name of the logger.
* `registrationModule` - A registration module. See [blacksun1/ioc-test](https://github.com/blacksun1/ioc-test).
