const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de Tienda Online');
});

const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const authRouter = require('./routes/auth');

app.use('/usuarios', usuariosRouter);
app.use('/productos', productosRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
