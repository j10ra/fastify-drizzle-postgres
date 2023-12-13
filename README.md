# Build a Rest API with Fastify and Drizzle

This is a Fastify API project with automatic Swagger documentation and request schema validation. It uses Drizzle ORM for database operations and PostgreSQL as the database written in typescript.

## Features

- Basic Authentication
- Automatic Swagger Documentation
- Request Schema Validation

## Built with

- Fastify
- Drizzle ORM
- PostgreSQL

## Prerequisite

- Node 18
- Docker

### Getting Started

1. Clone the repository

```
git clone <repository-url>
```

2. Install the dependencies:

```
npm install
```

3. Build the project:

```
npm run build
```

4. Start the server

```
npm run start
```

#### Start development mode

1. Initialize Postgres DB

```
docker-compose up -d
```

2. Start development

```
npm run dev
```

## License

this project is license under the MIT License
