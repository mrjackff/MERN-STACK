const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.get('/user/list',apiController.getUser);
router.get('/user/add',apiController.addUser);


// router.get('/user/list',function(req,res){
//     let userData = [
//         {
//         name : "ABC",
//         email : "abc@mail.com"
//         },
//         {
//             name : "ABC1",
//             email : "abc@mail.com"
//         },
//         {
//             name : "ABC2",
//             email : "abc@mail.com"
//         },
//         {
//             name : "ABC3",
//             email : "abc@mail.com"
//         }
//     ]
//     res.send({
//         data:userData,
//         status : "Success"
//     })
// });
module.exports = {
    route: router
}