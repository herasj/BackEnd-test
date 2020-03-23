# BackEnd - Test

## Install dependencies

    npm install

## Run API

    npm run dev
    
## Routes

### Create new user
>POST  /users

    Send Json through body
    "name": "",
	"lastname": "",
	"birthday": "",
	"email": ".",
	"password": "",
	"phone":""

*Return: 201 Status Code and a random cat fact*

### Authorization
> POST /authorization

    Body
    "email": "",
	"password": ""

*Return 200 Status Code, JWT Access token and a random cat fact*

### Update user
> PUT /users/:id

Send the new parameters through body

*Return: 200 Status Code and a random cat fact*

### Delete user
> DELETE /users/:id

*Return: 200 Status Code and a random cat fact*

### Upload image
> PATCH /users/:id/set/image

Send **file** through body (form-data)
<br>
*Return: 200 Status Code and a random cat fact*

### Set active
> PATCH  /users/:id/set/status/active/:active

*Return: 200 Status Code and a random cat fact*

### Set visible 
> PATCH /users/:id/set/status/visible/:visible

*Return: 200 Status Code and a random cat fact*

### Get user
> GET /users/:id

*Return: 200 Status Code, user data and a random cat fact*

### Delete Token
>  GET /authorization

Send ID through query parameter
<br>
*Return: 200 Status Code and a random cat fact*

### Send message
> POST /messages/send

Send message through body
<br>
*Return: 200 Status Code and a random cat fact*

### Get messages
> GET /messages

*Return: 200 Status Code, list of messages and a random cat fact*