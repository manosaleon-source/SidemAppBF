const router = require('express').Router();
const ctrl = require('../controllers/clienteController');
const jwt = require('../middlewares/jwt');
router.get('/', jwt, ctrl.all);
router.get('/:id', jwt, ctrl.get);
router.post('/', jwt, ctrl.create);
router.put('/:id', jwt, ctrl.update);
router.delete('/:id', jwt, ctrl.remove);
module.exports = router;
