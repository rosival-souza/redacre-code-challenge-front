=========================================================================
# Build Serve a React App with nginx, Docker, Tailwind CSS
=========================================================================

## Getting Starting

Install on your docker application machine and docker compose

This appliation depends on the back-end that is in this repository: https://github.com/rosival-souza/redacre-code-challenge-back

## Build application and database with Docker Compose

```bash
docker-compose -f docker-compose.yml up --build
```

##  Alternative using npm

Install dependences

```bash
npm install
```
## Starting application

```bash
npm start
```

Access your React App: http://localhost:3000
