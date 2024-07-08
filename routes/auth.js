const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const authMiddleware = require('../middleware/auth');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  const { nombre, email, password, direccion, rol } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await Usuario.create({ nombre, email, password: hashedPassword, direccion, rol });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    }

    const esCorrecta = await bcrypt.compare(password, usuario.password);

    if (!esCorrecta) {
      return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario.id }, jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

router.post('/refresh-token', authMiddleware, (req, res) => {
  const usuarioId = req.usuario.id;

  const newToken = jwt.sign({ id: usuarioId }, jwtSecret, { expiresIn: '1h' });

  res.json({ token: newToken });
});

module.exports = router;
