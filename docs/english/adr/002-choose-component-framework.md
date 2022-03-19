# Choosing a component-aware framework for the first release

Date: 08.12.2021

## Introduction

* Summary
* Discussion (context)
* Decision
* Effects

## Specifications

* Summary
  * In the context of the release of our component  considering the possible web frameworks with component structure we decided to start with Vue to make the component available to all Vue users without much effort accepting that other frameworks will not be supported for the time being.
  
* Discussion (context)
  * There are several ways to publish our component. As...
    * Vue component
    * React component
    * Angular component
    * Svelte component
    * Web Component (Vanilla JS Web Components)
  * The goal is to implement the component for as many common frameworks / technologies as possible.

* Decision
  * Vue was chosen because the team already has expertise and the original implementation from Project 2 was also developed in Vue.
  * In the future, thanks to the open source approach, everyone should be able to participate in the implementation of other technology stacks.
* Effects
  * For the time being, the focus is exclusively on the implementation in Vue.
  * Implementation as a web component (cross-technology) will only be sought afterwards.
