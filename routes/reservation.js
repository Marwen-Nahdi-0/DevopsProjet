const express = require('express')
const authenticate = require('../middleware/authenticate')
const reservationController = require('../Controller/reservation')
const router = express.Router();

router.get('/:token' ,authenticate,reservationController.findAll);
router.get('/:id/:token',authenticate, reservationController.findOne);
router.get('/user/r/:token',authenticate, reservationController.findAllbyUser);
router.post('/:salleId/:clientId/:token',authenticate, reservationController.createMailAdd);
router.post('/:salleId/:clientId', reservationController.create);
router.patch('/:id/:token',authenticate,reservationController.update);
router.get('/delete/:id/:token',authenticate,reservationController.destroy);
module.exports = router