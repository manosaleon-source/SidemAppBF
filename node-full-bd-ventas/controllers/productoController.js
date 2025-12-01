const service = require('../services/productoService');
async function all(req,res){ res.json(await service.all()); }
async function get(req,res){ const r = await service.find(req.params.id); if(!r) return res.status(404).json({}); res.json(r); }
async function create(req,res){ const r = await service.create(req.body); res.status(201).json(r); }
async function update(req,res){ const r = await service.update(req.params.id, req.body); res.json(r); }
async function remove(req,res){ await service.remove(req.params.id); res.status(204).send(); }
module.exports = { all, get, create, update, remove };
