# ADR decision for quality assurance

Date: 15.12.2021

## Introduction

* Summary
* Discussion (context)
* Decision
* Effects

## Specifications

### Summary
In the context of **Code Quality Assurance** considering **test procedure** we chose **Jest** to achieve **more stable code quality**.

### Discussion (Context)
Unit Tests:
* We want to ensure the quality of our code and prevent bugs. For this we want to use unit tests.
* Possible libraries are: Jasmine, Ava, Karma, Mocha/Chai or Jest.
* Testing frameworks in Vue.js ecosystem are: Jest and Mocha/chai

Component Tests:
* We would like to test the Vue Components holistically.
* Vue offers its own test library for this purpose, which pays attention to accessibility and facilitates refactoring: Vue-Testing-Library

Integration Tests:
* To ensure that the backend communicates correctly with the frontend, we will write integration tests.
* Again, we will use Jest.

UI Tests:
* First the UI will be tested manually because we cannot yet determine which UI elements need to be tested regularly and automated UI tests are very time consuming.

### Decision
* We chose Jest because the test syntax is easy to read.
* We would also like to practice Test Driven Development in the development of new features whenever possible.

### Effects
* pending.
