var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/images/snoopy222.jpg', function(req, res, next) {
  console.log("estoy en users.js bucando la foto de snoopy");
  res.send('respond with a resource');
});

module.exports = router;
