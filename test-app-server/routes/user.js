var express = require('express');
var router = express.Router();
var userMasterController = require('../controller/userMasterController');

router.post('/addUser', userMasterController.add);
router.get('/list', userMasterController.list);
router.get('/edit/:id', userMasterController.edit);
router.get('/delete/:id', userMasterController.delete);


module.exports = router;