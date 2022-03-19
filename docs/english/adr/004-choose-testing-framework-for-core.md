# Decision on the test framework for the core functionalities

Date: 23.02.2022

## Introduction

* Summary
* Discussion (context)
* Decision
* Effects

## Specifications

### Summary
In the context of **Code Quality Assurance** in consideration of **test frameworks** we decided on **Deno Tests** to achieve **higher code quality**.

### Discussion (Context)
* We want to ensure the quality of our code especially for the core functionalities and prevent bugs. For this we want to use unit tests.
* Possible libraries are: Jasmine, Ava, Karma, Mocha/Chai, Jest, Deno.
* Since we are not in the Vue.js ecosystem for the core functions, frameworks external to the ecosystem can also be used.

### Decision
* Because the test syntax is easy to read (similar to Jest), we decided to use Deno Tests.
* Jest would require a node project, which would fill the core directory with redundant files and folders accordingly.
* Deno tests are built on top of the JS/TS runtime environment Deno. You completely do without a project-internal dependency folder. This keeps the core directory very tidy.

### Effects
* Automated tests can be implemented for all core functions.
* These tests can be run alongside the Vue component's Jest tests through GitHub workflows to maintain high branch quality.
* In addition, Deno allows an easy way of verifying test coverage of our core functionalities