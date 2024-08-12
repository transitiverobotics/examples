
Mini express.js example for providing an API for generating JWTs.

## Install

```sh
npm install
```

## Usage

Start the server:
```
node server.js
```

Make a sample request:
```sh
> curl -H "Content-Type: application/json" -X POST -d '{"device": "d_bot123", "capability": "@transitive-robotics/ros-tool"}' localhost:8000/api/getJWT

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2UiOiJkX2JvdDEyMyIsImNhcGFiaWxpdHkiOiJAdHJhbnNpdGl2ZS1yb2JvdGljcy9yb3MtdG9vbCIsImlkIjoieW91cl90cmFuc2l0aXZlcm9ib3RpY3MuY29tX3VzZXIiLCJ2YWxpZGl0eSI6ODY0MDAsImlhdCI6MTcxOTAwNzY5M30.F95NPf7l8WbY3RC2786dBwpcxZiyqtfXHWCGKfGFIn8"}
```