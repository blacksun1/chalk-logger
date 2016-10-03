# chalk-logger

A pleasant readable logger for humans.

# API

Exports the following:

* `logger` - The actual logger class. Requires constructor arguments.
* `loggerFactory` - A factory function to create an instance of the logger class. Takes a parameter of `name` to set the name of the logger.
* `registrationModule` - A registration module. See [blacksun1/ioc-test](https://github.com/blacksun1/ioc-test).
