# Instructions for REST-API with! Authentication

## Create the Api

1. `npm init`<br> &nbsp;&nbsp; This create the App with a package.json
2. In stall all the packages from the package list section.
3. files to create:<br> &nbsp;&nbsp; - `.gitignore`<br> &nbsp;&nbsp; - `server.js`
4. Create folders:<br> &nbsp;&nbsp; - `_routes`<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">Within this folder create a folder for each of your mongoDB collections. Then inside these folder 3 files 'Controller', 'Model' & 'Routes'</span><br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; create a files called `***-Controller` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">This holds all the HTTP Requests</span><br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; create a files called `***-Model.js` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">This holds all Schema's for the data</span><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:red; font-weight:bold;">**_This is where you declare your collections!!!_**</span><br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; create a files called `***-Routes.js` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">This is where you create the URLs that you connect your controllers to.</span><br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `config`<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">This holds all the connection data</span><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; create a files called `config.env` & `db.js`<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:red; font-weight:bold;">**_This is where you will declare the DataBase URI_**</span><br><br>

&nbsp;&nbsp;&nbsp;&nbsp; - `middleware`<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">Middleware is just code that allows to tidy up the main code and implement actions by express or mongoose.</span><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; create a files called `async.js` & `error.js`<br><br>

&nbsp;&nbsp;&nbsp;&nbsp; - `utils`<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="font-style: italic; color:green">Used to put scripts in that you do not want in your main code.</span><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; create a files called `errorResponse.js`<br><br>

5. Update start in package.json = <br> &nbsp;&nbsp; - `“start”: “NODE_ENV=production & node server”`<br> &nbsp;&nbsp; - `“dev”: “nodemon server”`

## Packages to install

1. Nodemon = `npm install -D nodemon`
2. Express and .env = `npm i express dotenv`
3. Morgan = `npm i morgan`
4. Mongoose = `npm i mongoose`
5. Colors console colors = `npm i colors`
6. This is to help prevent hacker attacks and injection = `npm i express-mongo-sanitize`
7. Helps protect the DNS helmet = `npm i helmet`
8. Helps to protect middleware xss = `npm i xss-clean`
9. helps prevent overloading of the site ratelimit = `npm i express-rate-limit`
10. protects the URL params hpp = `npm i hpp`
11. cross-origin enables cors = `npm install cors`

## Additonal Material

1. There is Authentification.
2. Section 6 has extra material like:<br> &nbsp;&nbsp; - Advanced filtering, select, sorting, uploading photo, params.
3. Section 5 Has information on address and geo locating.
4. Section 8 Has information on how to link data to a user so only they can alter.
