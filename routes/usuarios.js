const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'email', 'rol'] });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

router.put('/:id/rol', async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  if (!['profesor', 'estudiante'].includes(rol)) {
    return res.status(400).json({ error: 'Rol no válido' });
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.rol = rol;
    await usuario.save();

    res.json({ mensaje: 'Rol actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizando rol:', error);
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
});

module.exports = router;
