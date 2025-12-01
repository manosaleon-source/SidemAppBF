const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // agregado
require('dotenv').config();
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight
app.use(bodyParser.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/proveedores', require('./routes/proveedores'));
app.use('/api/ventas', require('./routes/ventas'));
app.use('/api/ordenes', require('./routes/ordenes'));

const PORT = process.env.PORT || 3033;
app.listen(PORT, ()=>console.log('Server running on', PORT));
