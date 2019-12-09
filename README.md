
#

#### Table of Contents  

- [How to run 🚀](#How-to-run-)  
- [Backend 🔙](#Backend-) 
	- [User endpoints](#USER)

- [Frontend 👁‍🗨](#Frontend-)  

#



<br>

# ¿Qué es? 🌌

Es...

- Frontend: 🧧 React 
- Backend: 🔸 NodeJS + Express
- DB: 🍃 mongoDB 

Durante el desarrollo he usado [este tablón de Trello](https://trello.com).


<br>

# How to run 🚀

- Download [backend repo](https://github.com/).
- Download [frontend repo](https://github.com/).
- On the backend run:
	- `npm run dev`
- On the frontend run:
	- `npm start`
- It should open on http://localhost:4200/


<br>

# Backend 🔙

## **Endpoints** 📃

## USER

- Register
	- **POST** /user/register
```json
{
	"username":  "Username",
	"email": "asd@asd.com",
	"password":  "1234",
	"phone": "647123456",
	"address": "c/ Falsa, 123",
	"billing": {
		"cardNumber": 123456789,
		"cardOwner": "Name Name Name",
		"cardExpireDate": [6, 22]
	}
}
```

- Login
	- **POST** /user/login
```json
{
	"username":  "Icaruk",
	"password":  "1234"
}
```

- Logout
	- **GET** user/logout?token={token}
	
- Get user data
	- **GET** user/{userId}?token={token}

- Delete user
	- **DELETE** user/delete/{userId}?token={token}

#

<br>

# Frontend 👁‍🗨

## Features 📃

- Homepage with...
- Search by title.
- Users.


## Preview 🔍

- Home
> ![](https://i.gyazo.com/519f71b33bde9428c3fabd660d43aa1c.jpg)


<br>

# [🡅 TOP 🡅](#Table-of-Contents)  
