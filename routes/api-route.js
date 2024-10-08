const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.get('/user/list', apiController.getUser);
router.post('/user/add', apiController.addUser);
router.get('/user/info/:id', apiController.getSingleUser);
router.post('/user/update', apiController.updateUser);
router.get('/user/delete/:id', apiController.deleteUser);
router.post('/login', apiController.login);
router.post('/signup', apiController.signup);

module.exports = {
    route: router
}