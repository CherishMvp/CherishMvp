

const express = require('express');
const router = express.Router();
const api = require('./api');
 
router.get('/login', (req, res, next) => {
  api.login(req, res, next);
});
router.get('/add', (req, res, next) => {
  api.add(req, res, next);
});
 
module.exports = router;

