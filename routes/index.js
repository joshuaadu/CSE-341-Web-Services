const router = require('express').Router();

const baseController = require('../controllers');

router.get('/', baseController.getName);
router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));

module.exports = router;
