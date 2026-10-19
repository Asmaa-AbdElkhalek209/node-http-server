# Node.js HTTP Server — Learning Project

A practical project built while learning Node.js backend fundamentals, before moving to Express.js.

## Overview

This project demonstrates how to build a simple HTTP server and REST API using Node.js's built-in `node:http` module, without Express.js.

## Concepts Practiced

- Creating an HTTP server using `node:http`
- Understanding HTTP requests and responses
- Working with GET and POST methods
- Building basic routes and controllers
- Reading and parsing JSON request bodies
- Returning appropriate HTTP status codes
- Implementing basic middleware concepts
- Handling errors and validating request data
- Understanding request body size limits

## Technologies

- Node.js
- JavaScript
- Built-in `node:http` module
- Git and GitHub

## Getting Started

### Prerequisites

- Node.js installed
- npm installed

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project folder:

```bash
cd node-http-server
```

Install dependencies if needed:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The server runs at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/api/users` | Retrieve users |
| POST   | `/api/users` | Create a user  |

### Example POST Request

Send a JSON body to `/api/users`:

```json
{
  "name": "Asmaa",
  "email": "asmaa@example.com"
}
```

The project currently stores users in memory, so newly created data is lost when the server restarts.

## Learning Goals

The goal is to understand how HTTP servers, routing, request parsing, middleware concepts, and error handling work before using a framework such as Express.js.

## Next Steps

- Improve route handling
- Add PUT, PATCH, and DELETE endpoints
- Organize the application into routes, controllers, and services
- Add automated tests
- Rebuild the API using Express.js

---

**Status:** Learning project — Node.js fundamentals.
