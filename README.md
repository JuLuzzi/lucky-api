# Lucky API

## Description

User authentication API in Nest.js

## Installation

```bash
$ npm install
```

## Running the Postgres DB

```bash
docker run -d -p 5444:5432 --name my-postgres -e POSTGRES_PASSWORD=password postgres
```

## Initializing the DB

```bash
npm run migration:run
```

## Running the app

```bash
npm run start
```

## Endpoints

**1-** Creates a user given (username,password,name,anddres,cityId).

#### URL

http://localhost:8000/api/auth/singup

#### Method

POST

#### Data Params

{
"username": "myName",
"password": "myPassword",
"name": "juli",
"address": "myAddress",
"cityId": 3
}

#### Success Response

Code: 201
Content: None

**2-** Returns a valid JWT token given (username,password).

#### URL

http://localhost:8000/api/auth/singin

#### Method

POST

#### Data Params

{
"username": "myName",
"password": "myPassword",
}

#### Success Response

Code: 201
Content:
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC"
}

**3-** Return a relevant user profile given a valid JWT token in a Authorization header.

#### URL

http://localhost:8000/api/user/:id

#### Method

GET

#### Required header

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

#### Success Response

Code: 200
Content:
{
"id": 1,
"name": "juli",
"address": {
"street": "myAddress",
"city": "Mar del Plata",
"country": "Argentina"
}
}
