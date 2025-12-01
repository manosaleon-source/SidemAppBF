const pool = require('../config/conexionbd');
async function all(){ const [rows]=await pool.query('SELECT * FROM productos'); return rows; }
async function find(id){ const [rows]=await pool.query('SELECT * FROM productos WHERE id=?',[id]); return rows[0]; }
async function create(data){ const [r]=await pool.query('INSERT INTO productos (descripcion,precio_compra,precio_vender,stock,categoria_id,proveedor_id,estado) VALUES (?,?,?,?,?,?,?)',
  [data.descripcion,data.precio_compra,data.precio_vender,data.stock,data.categoria_id,data.proveedor_id,data.estado||1]); return {id:r.insertId,...data}; }
async function update(id,data){ const fields=Object.keys(data).map(k=>`${k}=?`).join(','); const params=Object.values(data); params.push(id); await pool.query(`UPDATE productos SET ${fields} WHERE id=?`,params); return await find(id); }
async function remove(id){ await pool.query('DELETE FROM productos WHERE id=?',[id]); }
module.exports={all,find,create,update,remove};
