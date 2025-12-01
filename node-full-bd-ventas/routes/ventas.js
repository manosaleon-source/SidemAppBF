const router = require('express').Router();
const ctrl = require('../controllers/ventaController');
const jwt = require('../middlewares/jwt');
router.post('/', jwt, ctrl.create);
module.exports = router;
