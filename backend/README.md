# How to run
* Install app: `npm install`
* Run app: `npm run`


# API Documentation and mock API
This is the blueprint of the API for sprint 2.
[API Documentation and Mock API](https://app.swaggerhub.com/apis/sammulto/DogDates/1.0.0#/)

# About protected API endpoints
Call to protected API endpoints required a token attached to the request header.   
The request header should include:   
* Authorization: <token>   


# Current Supported API Calls

## Unprotected End point: /api/signup 

### `POST /api/signup` 
Create user
Parameters:
* email
* password
* ownerName
* dogName
* city
* description
* picture

## Unprotected End point: /api/auth/login

### `POST /api/auth/login` 
User log in
Parameters:
* email
* password

## Protected End point: /api/users

### `GET /api/users/` 
Get the list of users.   

### `GET /api/users/:id` 
Get the user by id.   

### `PATCH /api/users/:id` 
Update user's info by id.   
Parameters:
* email
* dogName
* city

### `DELETE /api/users/:id` 
Delete user's info by id.   


-------------------------
# To Be Implemented API Calls

## Protected End point: /api/like

### `GET /api/like/:id` 
Get the list of the user's liked users

### `PATCH /api/users/:id`
update the user's list
Parameters:
* Liked User's id

## Protected End point: /api/match

### `GET /api/match/:id` 
Get the list of user's matched users

### `PATCH /api/match/:id`
Update a user's matched list
Parameters:
* Matched user's id


# How to test this API
You can use [postman](https://www.postman.com/) to test the API, please install the desktop agent from postman if you're testing the API locally. The default address for this API is http://localhost:5000 .