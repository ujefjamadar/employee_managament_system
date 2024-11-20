const express = require('express');
const router = express.Router();


router
.use('/api/emp', require('./employee'))


module.exports = router;