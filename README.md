sonya-from-annotated-file
=========================

[Sonya](https://github.com/selfinterest/SonyaDI) dependency injection from annotated files!

The goal is to allow the developer to set of modules and create dependency relationships between them using line comment annotations.

Example
-------

```javascript
  /* Car.js */
  
  //= @service
  function car (engine, driver) {
    this.engine = engine;
    this.driver = driver;
  }

```

This provider would take the file Car.js as an argument, parse the JavaScript file, recognize the `//= @service` annotation, inject the function with the engine and driver dependencies, and then register it as a service.

My hope is that this will make dependency injection -- and Node as a whole -- more declarative and less imperative.
