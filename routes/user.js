const express = require('express')
const UserController = require('../Controller/user')
const authenticate = require('../middleware/authenticate')
const router = express.Router();
router.get('/:token',authenticate,UserController.findAll);
router.get('/:id/:token' ,authenticate,UserController.findOne);
router.post('//:token',authenticate, UserController.create);
router.patch('/:id/:token',authenticate, UserController.update);
router.post('/delete/:id/:token',authenticate, UserController.destroy);
module.exports = router