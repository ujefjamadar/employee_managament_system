const express = require('express');
const router = express.Router();
const empService = require('../Services/employee')



router
    .post('/list',empService.get)
    .post('/distinct',empService.get1)
    .post('/create',empService.create)
    .put('/update/:id',empService.updateById)
    .put('/update1',empService.update)
    
    

    module.exports = router;