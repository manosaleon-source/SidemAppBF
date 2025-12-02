const router = require('express').Router();
const ctrl = require('../controllers/proveedorController');
const jwt = require('../middlewares/jwt');
router.get('/', ctrl.all); // public for demo
router.get('/:id', jwt, ctrl.get);
router.post('/', jwt, ctrl.create);
router.put('/:id', jwt, ctrl.update);
router.delete('/:id', jwt, ctrl.remove);
module.exports = router;
