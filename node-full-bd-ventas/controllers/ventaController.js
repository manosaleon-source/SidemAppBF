const service = require('../services/ventaService');
async function all(req,res){ res.json(await service.all()); }
async function create(req,res){
  try{
    const cab = req.body.cabecera;
    const items = req.body.items || [];
    const r = await service.createVenta(cab, items);
    res.status(201).json(r);
  }catch(err){ console.error(err); res.status(500).json({error: err.message}); }
}
module.exports = { create, all };
