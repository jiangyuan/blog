# Dependency Injection

Dependency Injection(DI) is a software design pattern that deals with how code gets hold of its dependencies.

To manage the responsibility of dependency creation, each Augular application has an `injector`. The `injector` is a
`service locator` that is reponsible for construction and lookup of dependencies.

Here is a example of using the injector service:

```js
// Provide the wiring information in a module
angular.module('myModule', []).

// Teach the injector how to build a 'greeter'
// Notice that greeter itself is denpendent on '$window'
factory('greet', function($window) {
  return {

    // This is a factory function, and is responsible for creating the 'greet' service.
    greet: function(text) {
      $window.alert(text);
    }
  };
});

// New injector is created from the module
// (This is usually donw automatically by angular bootstrap)
var injector = angular.injector(['myModule', 'ng']);


// Request any denpendency from the injector
var greeter = injector.get('greeter');
```
Asking for dependencies solves the issue of `hard coding`, but is also means that the injecor needs to be
passed throughout the appliction. Passing the injector breaks the `Law of Demeter`. To remedy this, we turn 
the dependency lookup responsiblity to the injector by declaring the dependencies as in this example:
```html
<!-- Give this html -->
<div ng-controller="MyController">
  <button ng-click="sayHello()">Hello</button>
</div>
```
```js
// And this controller definition
function MyController($scope, greeter) {
  $scope.sayHello = function() {
    greeter.greet('hello world!');
  };
}

// The 'ng-controller' directive does this behind the scenes
injector.instantiate(MyController);
```

Notice that by having the `ng-controller` instantiate the class, it can satisfy all of the dependencies of `MyController`
without the controller ever knowing about the `injector`. The application simply ask for the dependencied it needs,
without having to deal with the injector. This setup does not break the `Lay of Demeter`.

## Dependency Annotation

**How does the injector know what service needs to be injector?**

The developer needs to provide annotation information that the injector uses in order to resolve the denpendencies.

### Inferring Dependencies (联想)

The simplest way to get hold of denpendencies, is to assume that the function parameter names are the names of the dependencies.

```js
function($scope, greeter) {
  ...
}
```

直观，简单，不利于压缩。

### $inject Annotation
```js
var MyController = function(renamed$scope, renamedGreeter) {};
MyController.$injector = ['$scope', 'greet'];
```
可以重命名参数，也就是意味着可以压缩。

两处的 `dependencies` 必须保持一致。

这样写总是怪怪的。


### inline Annotation

Sometimes using `$injector` annotation style is not convenient such as when annatating `directives`.

For example:
```js
someModule.factory('greeter', function($window) {
  ...
});
```

Results in code bloat due to needing a temporary variable:

(代码总是会被一个临时的变量打断，变得臃肿。原来如此。)

```js
var greeterFactory = function(renamed$windwow) {
  ...
};

greeterFactory.$inject = [$window];

someModule.factory('greeter', greeterFactory);
```

For the reason the third annotation style is provided as well.
```js
  someModule.factory('greet', ['$window', function($w) {
    ...
  }]);
```

## Where can i use DI ?

DI is prevasive throughout Angular. It is typically used in `controllers` and `factory method`.

### DI in controllers

Controllers are classes which are responsible for application behavior. The recommanded way of declaring controllers is useing
the array annotation:

```js
someModule.controller('MyController', ['$scope', 'dep1', 'dep2', function($s, d1, d2) {
  ...
  $s.aMethod = function() {
    ...
  };
}]);
```

This avoids the creation of global functions for controllers and also protects against minifaction.

### Factory methods
Factory method are responsible for creating most objects in angular. Examples are directives, services, and filters.
The factory methods are registered with the module, and the recommended way of declaring factories is:

```js
angular.module('myModule', []).
  config(['depProvider', function(depProvider){
    ...
  }]).
  factory('serviceId', ['depService', function(depService) {
    ...
  }]).
  directive('directiveName', ['depService', function(depService) {
    ...
  }]).
  filter('filterName', ['depService', function(depService) {
    ...
  }]).
  run(['depService', function(depService) {
    ...
  }]);
```


