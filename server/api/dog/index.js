const express = require('express');
const controller = require('./dog.controller');
const upload = require('../../config/multer');

var router = express.Router();
console.log("he llegado aqui a los perros");
router.post('/', upload.single('file'), controller.createDog);
router.get('/', controller.readDogs);
router.get('/user/:id', controller.readDogByIdUser);
router.get('/:id', controller.readDogById);
//router.put('/:id', controller.editDog);
//router.delete('/:id', controller.deleteDog);

module.exports = router;
