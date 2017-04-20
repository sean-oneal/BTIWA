# React App

## Table of Contents

1. [Owner](#owner)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
    1. [Tech Stack](#techstack)

## Owner
  - [Sean O'Neal](https://github.com/sean-oneal)
## Usage


## Requirements
- npm
- Node
- MongoDB
- Twitter API Credentials

## Development


### Installing Dependencies

Install NPM modules in the **root** directory

```sh
npm install
```

Install MongoDB to local environment
Go to [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

###Tasks
Go to [Twitter for Developers](https://dev.twitter.com/) and follow the instructions to build a new app.

Use the .sample-env file to guide you as you create a '.env' file.  Place all credentials inside.

A default 'xbox' stream is tracked.  To change the tracked stream, go to line 48 in  '/server/server.js'.

Start the Express server. With this command, Webpack is configured to automatically watch files.

```sh
npm start
```
Run mongod

```sh
mongod
```
The default server will be running on [localhost:8080](localhost:8080)

Refresh the browser to see changes appear.

To Drop the Database
```sh
npm run dropDb
```

### Tech Stack

This application was built using...
- React
- Express
- Socket.io
- Webpack
- Mongoose / MongoDB

