const router = require('express').Router();
const ctrl = require('../controllers/authController');
const jwt = require('../middlewares/jwt');
router.post('/login', ctrl.login);
router.get('/me', jwt, ctrl.me);
module.exports = router;
