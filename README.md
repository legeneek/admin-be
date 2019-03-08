# admin backend
node.js admin backend template with authorization and csrf xss protect

# have a try
- make sure you have already start a mongodb in localhost
- have pm2 installed 
```
pm2 start
```

# api

name | payload | describe
------ | ------ | ------
register | {username: '', password: '', roles: []} | register a new user
login | {username: '', password: ''} | login
users |  | get all users

# authorization
- use auth middleware to enable auth. 
- two token created in cookie after user login. jwt token is http only, csrf token is not.
- csrf token need to be send in the request header 'x-csrf-token'
- jwt token need to be send in cookie