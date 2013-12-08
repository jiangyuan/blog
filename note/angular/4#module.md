# module

## what is a module?

Most applications have a main method which instantiates, wires, and bootstraps the application. Angular apps don't have a main method. **Instead modules declaratively specify how an application should be bootstrapped.** There are several advantages to this approach:

* the process is more declarative whice is easier to understand
* In unit-testing there is no need to load all modules, which may aid in writing unit-tests.
* Additional modules can be loaded in scenario tests, which can override some of the configuration and help end-to-end test the application.
* Third party code can be packaged as reusable modules.
* The modules can be loaded in any/parallel order (due to delayed nature of module execution).

## Recommended Setup

* a service module
* a directive module
* a filter module
* an application level module which depends on the above module, and which initialization the code.

## Module Loading & Dependencies

 A module is a collection of configuration and run blocks. In its simplest form the module consist of collection of two kinds of blocks:

 ```js
 angular.module('myModule', []).
  config(function(injectables) { // provider-injector
    // This is an example of config block.
    // You can have as many of these as you want.
    // You can only inject Providers (not instances)
    // into the config blocks.
  }).
  run(function(injectables) { // instance-injector
    // This is an example of a run block.
    // You can have as many of these as you want.
    // You can only inject instances (not Providers)
    // into the run blocks
  });
 ```

 * configuration block
 * run blocks

### configuration block

There are some convenience motheds on the module which are equivalent to the config block. For example:

```js
angular.module('myModule', []).
value('a', 123).
factory('a', function() {
  return 123;
}).
directive('directiveName', ...).
filter('filterName', ...);
```

is as same as

```js
angular.module('myModule', []).
  config(function($provide, $compileProvider, $filterProvider) {
    $provide.value('a', 123);
    $provide.factory('a', function() {
      return 123;
    });
    $compileProvider.directive('directiveName', ...);
    $filterProvider.register('filterName',...);
  });
```

The configuration blocks get applied in the order in which they are registered. The only exception to it are constant definitions, which are placed at the beginning of all configuration blocks.


### run blocks


### Dependencies

### Asynchronous Loading

### Creation versus Retrieval
