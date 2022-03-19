# ADR choice of package management system

Date: 25.11.2021

## Introduction

* Summary
* Discussion (context)
* Decision
* Effects

## Specifications ##

* Summary
     * In the context of the **Release of the component** to make the component **easy to find and install** we decided to use **npm** since **VUE itself works better with npm** accepting **a longer installation of the dependencies**.
     
* Discussion (context)
   * We looked at Yarn and npm and concluded that they are very similar.
   * Apart from that, we looked at other popular package management systems like pnpm and homebrew.
   * VUE themselves recommend **npm** for their framework installation.
   
* Decision
   * We chose npm because it is **recommended for VUE and very common**.
