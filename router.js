const express = require('express');
const Router = express.Router;

const router = new Router();
const defaultController = require('./controller/default');

router.post('/default', defaultController.sendMail)

module.exports = router;