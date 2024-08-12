const http = require('http');
const path = require('path');
const dotEnv = require('dotenv');
dotEnv.config();
const express = require('express');
const arr = []
let app = express();

require('./config/database')();
const router = require('./routes/api-route');

// console.log(__dirname)

app.use(express.static(path.join(__dirname, "public")))

app.use('/api', router.route)

// router.get('/user/list', function (req, res) {
//     let userData = [
//         {
//             name: "John",
//             email: "test@mailinator.com"
//         },
//         {
//             name: "John",
//             email: "test@mailinator.com"
//         },
//         {
//             name: "John",
//             email: "test@mailinator.com"
//         }
//     ]
//     res.send({
//         data: userData,
//         status: "success"
//     })
// })
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


console.log("HELLO WORLD");
console.log("HELLO WORLD");