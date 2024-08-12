const http = require('http');
const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const express = require('express');
const arr = []
let app = express();

require('./config/database')();
const router = require('./routes/api-route');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")))
app.use('/api', router.route)

app.get('/user', (req, res) => {
    res.send({
        data: [],
        message: "Success"
    })
})

const server = http.createServer(app);
server.listen(process.env.PORT, function (err) {
    if (err) throw err;
    console.log(`Server is runing on port: ${process.env.PORT}`)
});
