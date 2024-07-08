// routes/productos.js
const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const authMiddleware = require('../middleware/auth');

// Obtener todos los productos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Crear un nuevo producto
router.post('/', authMiddleware, async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Editar un producto existente
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, productimage1, productimage2, productimage3, categoria_id, stock } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Actualizar los campos del producto
    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.productimage1 = productimage1 || producto.productimage1;
    producto.productimage2 = productimage2 || producto.productimage2;
    producto.productimage3 = productimage3 || producto.productimage3;

    producto.categoria_id = categoria_id || producto.categoria_id;
    producto.stock = stock || producto.stock;

    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el producto' });
  }
});

module.exports = router;
