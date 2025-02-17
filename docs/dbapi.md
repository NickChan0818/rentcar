# ScooterCar API Documentation

## Users

### Model

| Field      | Type     | Constraints          |
|------------|----------|----------------------|
| id         | number   | pk, auto             |
| name       | string(256)   | required        |
| birthday   | date     | required             |
| phone      | string(32)   |                    |
| email      | string(512)   | required        |
| createdAt  | datetime | required             |
| updatedAt  | datetime | required             |
| isVoid     | boolean  |                      |

### API

#### Get User by ID
- **Path:** `GET /users/:id`
- **Request Parameters:**
  - `id` (string, required)
- **Responses:**
  - `200`: user
  - `404`: notFound
  - `403`: forbidden

#### Create User
- **Path:** `POST /users`
- **Request Body:**
  - `{name: string, birthday: date, phone?: string, email: string}`
- **Responses:**
  - `200`: user
  - `400`: badRequest

#### Update User
- **Path:** `PATCH /users/:id`
- **Request Parameters:**
  - `id` (string)
- **Responses:**
  - `200`: user
  - `400`: badRequest
  - `403`: forbidden
  - `404`: notFound

#### Delete User
- **Path:** `DELETE /users/:id`
- **Request Parameters:**
  - `id`
- **Responses:**
  - `204`
  - `400`: badRequest
  - `403`: forbidden
  - `404`: notFound

#### Login
- **Path:** `POST /users/login`
- **Request Body:**
  - `{email: string, password: string}`
- **Responses:**
  - `200`: token
  - `400`: badRequest, authFailed

## Scooters

### Model

| Field      | Type     | Constraints          |
|------------|----------|----------------------|
| id         | number   | pk, auto             |
| isRenting | boolean  | default: false       |

### API

#### Get Scooter by ID
- **Path:** `GET /scooter/:id`
- **Request Parameters:**
  - `id` (string, required)
- **Responses:**
  - `200`: scooter
  - `404`: notFound

#### Get All Scooters
- **Path:** `GET /scooter`
- **Request Query:**
  - `{isRenting?: boolean}`
- **Responses:**
  - `200`: scooter[]

## Rents

### Model

| Field      | Type     | Constraints          |
|------------|----------|----------------------|
| id         | number   | pk, auto             |
| startTime  | datetime | required             |
| endTime    | datetime |                      |
| user       | number   | fk, required         |
| scooter    | number   | fk, required         |
| createdAt  | datetime | required             |
| updatedAt  | datetime | required             |

### API

#### Get Rent by ID
- **Path:** `GET /rent/:id`
- **Request Parameters:**
  - `id` (string, required)
- **Responses:**
  - `200`: rent
  - `403`: forbidden
  - `404`: notFound

#### Get All Rents
- **Path:** `GET /rent`
- **Responses:**
  - `200`: rent[] (self-data)

#### Create Rent
- **Path:** `POST /rent`
- **Request Body:**
  - `{scooterId: number}`
- **Responses:**
  - `200`: rent
  - `400`: badRequest, notFoundScooterId, userIsRenting, scooterIsRenting

#### Close Rent
- **Path:** `POST /rent/closeRent/:id`
- **Request Parameters:**
  - `id` (string, required)
- **Responses:**
  - `200`: rent
  - `400`: badRequest, rentClosed
  - `404`: notFound