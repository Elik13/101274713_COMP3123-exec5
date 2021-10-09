const express = require('express');
const app = express();
const router = express.Router();
const userDetails = require('./user.json')
const path = require('path');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/home.html'));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  res.send(JSON.stringify(userDetails));
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  
  if (userDetails.username === username && userDetails.password === password) {
    const response = {
      status: true,
      message: "User Is valid"
    };
    res.send(response);
    res.end();
  } else if (userDetails.username !== username) {
    const response = {
      status: false,
      message: "User Name is invalid"
    };
    res.send(response);
    res.end();
  } else if (userDetails.password !== password) {
    const response = {
      status: false,
      message: "Password is invalid"
    };
    res.send(response);
    res.end();
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const username = req.query.username ?? 'user';
  res.send(`<b>${username} successfully logout.<b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));