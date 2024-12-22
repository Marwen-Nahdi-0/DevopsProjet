const express = require('express')
const authenticate = require('../middleware/authenticate')
const SalleController = require('../Controller/salle')
const router = express.Router();

router.get('/user/:token' ,authenticate,SalleController.findAllClient);
router.get('/reserve/:id/:token', SalleController.SelectDate);
router.get('/:token', authenticate,SalleController.findAll);
router.get('/:id/:token', SalleController.findOne);
router.post('/create/:token', SalleController.create);
router.post('/:id/:token',SalleController.update);
router.get('/delete/:id/:token',SalleController.destroy);
module.exports = router