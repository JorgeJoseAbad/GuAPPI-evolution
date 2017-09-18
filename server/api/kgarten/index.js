
const express = require('express');
const controller = require('./kgarten.controller');
const upload = require('../../config/multer');

var router = express.Router();

router.post('/', controller.enterDog);
router.get('/',controller.listkgarten);
//router.get('/:id', controller.readKgarten);
router.put('/:id', controller.editKgarten);  //falta pasar un body
//router.delete('/:id', controller.removeKgarten);

module.exports = router;
