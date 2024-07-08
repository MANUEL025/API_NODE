// routes/usuarios.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const authMiddleware = require('../middleware/auth');

// Obtener todos los usuarios
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Crear un nuevo usuario
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nombre, email, password, direccion, rol } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      direccion,
      rol
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Editar un usuario existente
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, direccion, rol } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario
    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.password = password ? await bcrypt.hash(password, 10) : usuario.password;
    usuario.direccion = direccion || usuario.direccion;
    usuario.rol = rol || usuario.rol;

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.error(error); // Añadimos este registro de error
    res.status(500).json({ error: 'Error al editar el usuario' });
  }
});

module.exports = router;
