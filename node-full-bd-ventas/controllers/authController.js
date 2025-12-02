const service = require('../services/authService');
async function login(req,res){
  try{
    const {username,password} = req.body;
    const r = await service.login(username,password);
    res.json(r);
  }catch(err){ res.status(401).json({error: err.message}); }
}
async function me(req,res){
  if(!req.user) return res.status(401).json({error:'No token'});
  res.json({ id: req.user.id, username: req.user.username });
}
module.exports = { login, me };
