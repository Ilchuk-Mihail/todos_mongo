# TODO project
---
## Requirements

To run project locally ,you need to install:
- NodeJS and npm
- Git
- Docker and Docker-compose (to run project using Docker)
- Mongo DB 

## Install (Git)

    $ git clone https://github.com/vasylkushnir/todos_mongo.git
    $ cd todos_mongo
    $ npm install

## Install (download file from GitHub)
- go to https://github.com/vasylkushnir/todos_mongo
- download and unpack to folder
- open this folder in terminal 
- run npm install

## Running the project
- run Mongo DB on you computer
### To start server on your computer:

    $ npm run dev

###To run tests:

    $ npm run test

###To run tests (with coverage report)

    $ npm run coverage

- report will be generated and could be found in coverage folder -> index.html

## Documentation
### after starting server you can open a page with documentation

   
    $ http://localhost:3000/api-docs/#/

## Running the project in Docker
- run Docker-compose on your computer
### To start server

    $ npm run docker

###To run tests:

    $ npm run docker:test

###To run debug

    $ npm run docker:debug
