Cube Workshop Project
==================

Register a user, login, and create cubes and accessories!

Protected routes, login failure redirect with message, only able to edit/delete/attach-to cubes your user has created.

Installation:
------------

 1. `npm install` to download dependencies
 2. Create a `.env` file with these contents, filling out your own mongodb information:  

`DB_URI = mongodb+srv://clusterName........net`    
`DB_NAME = <-name for your app database->`    
`DB_USER = <-database username->`    
`DB_PASS = <-database password->`    
`EXP_SESSION_SECRET = <-server-side secret to encrypt passwords->`    

 3. Be sure that `.env` file is in the same directory as `app.js` and is saved, then run `npm start` in the terminal
 4. Go to a browser and head to `localhost:3000` (this can be changed in the `.bin` file)

 Now you're connected!
 -------------------
 - Start off by registering a user and logging in so you have access to creating cubes
 - While logged in, you should have full access to all the pages, `edit, add an accessory, attach accessory, delete cube`
 - When logged out, you should be able to `browse, search, and see details` of cubes.

 That's it!
 ---------