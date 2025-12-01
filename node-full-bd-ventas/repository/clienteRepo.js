const pool = require('../config/conexionbd');
async function all(){ const [rows]=await pool.query('SELECT * FROM cliente'); return rows; }
async function find(id){ const [rows]=await pool.query('SELECT * FROM cliente WHERE id=?',[id]); return rows[0]; }
async function create(data){ const [r]=await pool.query('INSERT INTO cliente (documento,nombres,apellidos,telefono,correo,direccion,tipo_documento_entidad_id) VALUES (?,?,?,?,?,?,?)',
  [data.documento,data.nombres,data.apellidos,data.telefono,data.correo,data.direccion,data.tipo_documento_entidad_id]); return {id:r.insertId,...data}; }
async function update(id,data){ const fields=Object.keys(data).map(k=>`${k}=?`).join(','); const params=Object.values(data); params.push(id); await pool.query(`UPDATE cliente SET ${fields} WHERE id=?`,params); return await find(id); }
async function remove(id){ await pool.query('DELETE FROM cliente WHERE id=?',[id]); }
module.exports={all,find,create,update,remove};
