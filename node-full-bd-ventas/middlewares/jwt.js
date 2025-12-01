const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const header = req.headers['authorization'];
  if(!header) return res.status(401).json({error:'No token'});
  const parts = header.split(' ');
  if(parts.length !== 2) return res.status(401).json({error:'Token error'});
  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET || 'changeit', (err, decoded)=>{
    if(err) return res.status(401).json({error:'Token invalid'});
    req.user = decoded;
    next();
  });
};
