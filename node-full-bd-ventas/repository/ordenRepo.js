const pool = require('../config/conexionbd');

async function createOrden(orden, items){
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query('INSERT INTO orden_compra (codigo, proveedor_id, fecha_emision, total, observacion) VALUES (?, ?, ?, ?, ?)',
      [orden.codigo, orden.proveedor_id, orden.fecha_emision, orden.total, orden.observacion]);
    const ordenId = res.insertId;
    for(const it of items){
      await conn.query('INSERT INTO orden_compra_detalle (orden_compra_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
        [ordenId, it.producto_id, it.cantidad, it.precio_unitario, it.subtotal]);
      await conn.query('UPDATE productos SET stock = stock + ? WHERE id = ?', [it.cantidad, it.producto_id]);
    }
    await conn.commit();
    return { id: ordenId };
  } catch(err){
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { createOrden };
