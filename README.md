# admin backend
node.js admin backend template with authorization and csrf xss protect

# have a try
- make sure you have already start a mongodb in localhost
- have pm2 installed 
```
pm2 start
```

# api

path | method | payload | describe
------ | ------ | ------ | ------
/register | POST | {username: '', password: '', roles: []} | register a new user
/login | POST | {username: '', password: ''} | login
/users | GET | | get all users
/userinfo | GET | | get current logined user info

# authorization
- two token created in cookie after user login. jwt token is https only, csrf token is not.
- csrf token need to be send in the request header 'x-csrf-token'.
- jwt token need to be send in cookie.
- use koa-jwt and auth middleware to make authorization work. koa-jwt middleware check the jwt token, auth middleware check the csrf token.