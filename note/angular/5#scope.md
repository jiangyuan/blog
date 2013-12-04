#scope

[scope](http://docs.angularjs.org/guide/scope)

## what are scopes ?
* scope is an object that refers to the application `model`.
* it's an execution context for expressions.
* scopes are arranged in hierarchical structure which mimic the DOM structure of the application.
* scopes can watch expressions and propagete events.


## Scope characteristics
* provides APIs($watch) to observe model mutations.


## Scope as Data-Model
* Scope is the glue between application `controller` and the `view`.
* Both controllers and directives have reference to the scope, but not to each other.


## Scope Hierarchies
* Each Angular application has exactly one `root scope`, but may hav several child scopes.
* Some `directives` create new child scopes
* creats a tree stucture which parallels the dom
* prototypical inheritance properties
* angular automatically places `ng-scope` class on elements where scopes has attached


## retrieving scopes from the dom
* scopes are attached to the dom as `$scope` data property
* root scope is attached to the dom is defined by the location of `ng-app` directive

## scope events propagation
* scope can propagate events in similar fashion to DOM events
* broadcasted to the scope child and emitted to scope parents


## scope life cycle

* `$apply`, `$watch`, `$digest`

* creation

* Watcher registration

* Model mutation

* Mutation observation

* 
