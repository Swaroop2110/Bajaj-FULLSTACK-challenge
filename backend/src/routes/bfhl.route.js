const express = require('express');
const { processHierarchy } = require('../controllers/bfhl.controller');

const router = express.Router();

router.post('/bfhl', processHierarchy);

module.exports = router;
