const service = require('../services/ordenService');
async function create(req,res){
  try{
    const orden = req.body.orden;
    const items = req.body.items || [];
    const r = await service.createOrden(orden, items);
    res.status(201).json(r);
  }catch(err){ console.error(err); res.status(500).json({error: err.message}); }
}
module.exports = { create };
