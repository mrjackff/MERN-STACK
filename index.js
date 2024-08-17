const http = require('http');
const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const express = require('express');
let app = express();
const router = require('./routes/api-route');
var bodyParser = require('body-parser');

require('./config/database')();

app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use('/api', router.route);

const server = http.createServer(app);

server.listen(process.env.PORT, function(err){
    if(err) throw err;
    console.log(`Server is runing on port: ${process.env.PORT}`)
});


/*
POST: http://localhost:8080/api/user/update

{
    "user_name": "Mark Test",
    "email": "mark.test@yopmail.com",
    "password": "123456",
    "user_phone": "985455555555",
    "id": "66b9a9fc9d10abb9ade7f677"
}

GET: http://localhost:8080/api/user/delete/66b9a9fc9d10abb9ade7f677
GET: http://localhost:8080/api/user/info/66b9a9fc9d10abb9ade7f677
*/