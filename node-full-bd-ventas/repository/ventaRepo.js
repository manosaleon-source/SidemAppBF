const pool = require('../config/conexionbd');

async function createVenta(cabecera, items){
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query(
      'INSERT INTO ventas_cabecera (codigo, fecha_emision, descripcion, precio_neto, igv, precio_total, cliente_id, tipo_documento_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [cabecera.codigo, cabecera.fecha_emision, cabecera.descripcion, cabecera.precio_neto, cabecera.igv, cabecera.precio_total, cabecera.cliente_id, cabecera.tipo_documento_id, cabecera.usuario_id]
    );
    const ventaId = res.insertId;
    for(const it of items){
      await conn.query('INSERT INTO detalle_ventas (precio_unitario, cantidad, precio_total, ventas_cabecera_id, productos_id) VALUES (?, ?, ?, ?, ?)',
        [it.precio_unitario, it.cantidad, it.precio_total, ventaId, it.productos_id]);
      await conn.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [it.cantidad, it.productos_id]);
    }
    await conn.commit();
    return { id: ventaId };
  } catch(err){
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { createVenta };
