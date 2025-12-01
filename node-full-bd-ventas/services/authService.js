const pool = require('../config/conexionbd');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(username, password) {
  // For demo: check usuario table
  const [rows] = await pool.query('SELECT * FROM usuario WHERE usuario=?', [username]);
  const user = rows[0];
  if(!user) throw new Error('Invalid credentials');
  // assuming passwords are stored plain in demo; in prod use hashed pw
  if(password !== user.password) throw new Error('Invalid credentials');
  const token = jwt.sign({username: user.usuario, id: user.id}, process.env.JWT_SECRET || 'changeit', {expiresIn:'1h'});
  return { token };
}
module.exports = { login };
