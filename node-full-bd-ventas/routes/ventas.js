const router = require('express').Router();
const ctrl = require('../controllers/ventaController');
const jwt = require('../middlewares/jwt');
router.get('/', jwt, ctrl.all);
router.post('/', jwt, ctrl.create);
module.exports = router;
