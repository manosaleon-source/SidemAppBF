const service = require('../services/authService');
async function login(req,res){
  try{
    const {username,password} = req.body;
    const r = await service.login(username,password);
    res.json(r);
  }catch(err){ res.status(401).json({error: err.message}); }
}
module.exports = { login };
