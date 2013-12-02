module
======
@(angular)[angular]

## what is a module?
Most applications have a main method which instantiates, wires, and bootstraps the application. Angular apps don't have a main method. Instead modules declaratively specify how an application should be bootstrapped. There are several advantages to this approach:
* the process is more declarative whice is easier to understand
* In unit-testing there is no need to load all modules, which may aid in writing unit-tests.
* Additional modules can be loaded in scenario tests, which can override some of the configuration and help end-to-end test the application.
* Third party code can be packaged as reusable modules.
* The modules can be loaded in any/parallel order (due to delayed nature of module execution).

## Recommended Setup

## Module Loading & Dependencies
### configuration block
### run block