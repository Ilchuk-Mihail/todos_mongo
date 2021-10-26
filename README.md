# TODO

[![javascript style guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![example workflow](https://github.com/vasylkushnir/todos_mongo/actions/workflows/node.js.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/vasylkushnir/todos_mongo/badge.svg?branch=master)](https://coveralls.io/github/vasylkushnir/todos_mongo?branch=master)

* [Overview](#overview)
* [Installation](#installation)
* [Dev dependencies](#dev-dependencies)
* [How do I startup?](#how-do-i-startup)
* [How do I test?](#how-do-i-test)
* [Scripts](#scripts)
* [Code style](#code-style)
* [Config](#config)
* [Endpoints](#openapi-documentation)

<a name="overview"></a>
## Overview
Simple todo list implementation. TBD.

### Tech stack
- NodeJS (Express)
- Typescript
- Mongo DB
- Docker

## Installation
Simply clone the repo and verify that you have satisfied the [dev dependencies](#dev-dependencies).

```bash
git clone https://github.com/vasylkushnir/todos_mongo.git
cd todos_mongo
npm install
npm i
```

<a name="dev-dependencies"></a>
## Dev dependencies

### Docker

All local development is containerized, so all you need is [Docker Desktop](https://www.docker.com/products/docker-desktop) to get going.

### Node.js
Recommended so you can [lint](https://eslint.org) on your host machine and run project without docker if you need.

```bash
brew update
brew install node@16
node -v
```

<a name="how-do-i-startup"></a>
## How do I startup?

Make sure you have all the [dev dependencies](#dev-dependencies) installed and running. Any code changes you make to your local repo will be reflected within the container itself. This does **NOT** include changes to dependencies. Code changes cause the service to be auto-restarted (utilizes [nodemon](https://nodemon.io) within the container).

```bash
npm run docker
```

If you've modified any dependencies or the service `Dockerfile`, make sure you run the build command and recreate your service containers.

```bash
npm run docker:build
npm run docker
```

<a name="how-do-i-test"></a>
## How do I test?

To run the test suite, first install the dependencies, then:

```bash
npm run docker:test
```

It will monitor file changes and re-run the test suites on every save using *nodemon*.


```bash
npm run docker:test:cov
```

That will run the test suite and also give you detailed info about **code coverage**.


## Scripts

Available package scripts and the operatives they execute on:

- `build` - Compiles typescript files
- `dev` - Runs project locally
- `docker` - Runs project within docker container with all dependencies
- `docker:build` - Builds docker containers
- `docker:test` -  Runs tests within docker container in file watch mode
- `docker:test:cov` - Runs the npm test command within docker container and outputs a code coverage report
- `lint` - Using eslint, verify files are syntactically formatted correct
- `style-fix` - Automation to resolve most all syntax formatting issues
- `test:watch` - Run tests locally in file watch mode
- `test` - Run an instance of this projects entire testing framework including code coverage output


## Code style
This project follows [StandardJS](https://standardjs.com) coding style. I uses eslint to enforce standard style. Use `lint` and `style-fix` commands to check/fix project codebase.

<a name="config"></a>
## Config
There are various configuration settings predefined in the `./src/config` folder.

## OpenAPI documentation

Service documented with [OpenAPI Specification](https://swagger.io/docs/specification/about/) (formerly Swagger Specification) is an API description format for REST APIs.

To check the endpoints run the project and follow the link:
```
http://localhost:3000/api-docs
```
