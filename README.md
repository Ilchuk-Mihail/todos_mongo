# TODO project
API for TODO list
---
## Content:
  - [Tech stack](#tech-stack)
  - [Requirements](#requirements)
  - [Install project](#install-project)
  - [Running the project](#running-the-project)
    - [Start server](#to-start-server-on-your-computer)
    - [Run tests](#to-run-tests)
    - [Run tests with coverage](#to-run-tests-with-coverage-report)
  - [Documentation - OPEN API(Swagger)](#documentation)
  - [Running the project in Docker](#running-the-project-in-docker)
    - [Start server](#to-start-server)
    - [Run tests](#to-run-test)
    - [Run debug](#to-run-debug)
  - [Scripts](#scripts)

## Tech stack
- NodeJS (Express)
- Typescript
- Mongo DB
- Docker

## Requirements

To run project locally ,you need to install:
- NodeJS and npm
- Git
- Docker and Docker-compose (to run project using Docker)
- Mongo DB 

## Install project

    $ git clone https://github.com/vasylkushnir/todos_mongo.git
    $ cd todos_mongo
    $ npm install

## Running the project
- run Mongo DB on you computer
### To start server on your computer:

    $ npm run dev

### To run tests:

    $ npm run test

### To run tests with coverage report

    $ npm run coverage

- report will be generated and could be found in coverage folder -> index.html

## Documentation
- run server and open URL:
   
    $ http://localhost:3000/api-docs/#/

## Running the project in Docker
- run Docker-compose on your computer
### To start server

    $ npm run docker

### To run tests:

    $ npm run docker:test

### To run debug

    $ npm run docker:debug

## Scripts

    "dev": "Runs app locally",
    "docker": "Runs app in docker",
    "docker:build": "Builds docker containers",
    "docker:test": "Runs test in docker container",
    "docker:debug": "Runs docker in debug mode",
    "lint": "Runs linter",
    "test": "Runs test",
    "coverage": "Runs test and generate a index.html document with information about coverage"
    

