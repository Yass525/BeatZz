# Backend

## Stack
We’ll use a simple NodeJS service with a MongoDB for our backend.

* NodeJS

* MongoDB

* Docker

## Microservices

* Auth Service

* User Service

* Streaming Service

## Service structure

Every service will have a **index.js** entry point

The service will also contain the following folders:

- api/               for our routes
- config/          for configurations
- repository/    for db queries and abstractions
- server/           for server setup and start code
