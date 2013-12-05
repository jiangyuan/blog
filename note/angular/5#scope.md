#scope

[scope](http://docs.angularjs.org/guide/scope)

## what are scopes ?
* scope is an `object` that `refers` to the application `model`.
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

* Creation
  The `root scope` is created during the application bootstrap by the `$injector`. During template
  linking, some directives create new scopes.

* Watcher registration
  During template linking directives register `watches` on the scope. These watches will be used to propagate
  model values to the DOM.

* Model mutation
  For mutation to be properly observed, you should make them only within the `scope.$apply()`.

* Mutation observation
  At the end `$apply`, Angular performs a `$digest` cycle on the root scope, which then propagates throughout
  all child scopes.

* Scope destruction
  `scope.$destroy`

### scopes and directives
* observing directives
* listener directives

### directives that create scopes
`ng-controller`, `ng-repeat`

### controllers and scopes
* controllers user scopes to expose controller methods to templates
* controllers define methods (behavior) that can mutate the model (properties on the scope)
* controllers may register `watches` on the model. These watches execute immediately after the controller behavior execute.

### scope $watch performance consideration

## integration with the browser event loop
* browser event loop
* javascript execution context and Angular execution context
* `scope.$apply()`, `$digest`, `$watch`, `$evalAsync`

