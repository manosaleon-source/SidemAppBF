Node.js full project
- Configure .env (see .env.example)
- npm install
- npm start

Auth:
- POST /api/auth/login {username, password} -> {token}

Protected:
- POST /api/ventas {cabecera, items} (requires Authorization: Bearer <token>)
- POST /api/ordenes {orden, items} (requires token)
- CRUD clientes/productos/proveedores (some protected)
