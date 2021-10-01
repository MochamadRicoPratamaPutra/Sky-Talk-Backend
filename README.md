<h1 align="center">ExpressJS - #backend-SkyTalk RESTfull API</h1>

SkyTalk, web aplication for chatting based from telegram and whatsapp.
<p align="center">
    <a href="https://skytalk.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/MochamadRicoPratamaPutra/Sky-Talk-Backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/MochamadRicoPratamaPutra/Sky-Talk-Backend/pulls">Request Feature</a>
  </p>

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

    DB_HOST
    DB_USER
    DB_NAME
    DB_PASS
    DB_PORT
    PORT
    BASE_URL = ('your backend url')
    TARGET_URL = ('your frontend url')
    SECRET_KEY = ('secret key for JWT')
    EMAIL_HOST = ('smtp google')
    EMAIL_PORT
    EMAIL_SECURE = TRUE
    EMAIL_MAILER
    EMAIL_PASSWORD
    CLOUD_NAME = ('your cloudinary cloud name')
    CLOUDINARY_API_KEY
    CLOUDINARY_API_SECRET

## Contact

My Email : mricopratamaputra@gmail.com

Project Related:
- [Frontend](https://github.com/MochamadRicoPratamaPutra/Sky-Talk-Frontend)
- [Backend](https://github.com/MochamadRicoPratamaPutra/Sky-Talk-Backend)
