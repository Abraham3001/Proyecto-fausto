const express = require('express');
const router = express.Router();

// ====================
// Importación de modelos
// ====================
const TipoLeucemia = require('../models/tipoLeucemia');
const SubtipoLeucemia = require('../models/subtipoLeucemia');
const Contenido = require('../models/contenido');
const Cuestionario = require('../models/cuestionario');
const Pregunta = require('../models/pregunta');

// ==============================
// RUTAS DE LEUCEMIAS
// ==============================

// Obtener todos los tipos de leucemia
router.get('/tipos', async (req, res) => {
  try {
    const tipos = await TipoLeucemia.findAll();
    res.json(tipos);
  } catch (err) {
    console.error('Error al obtener tipos:', err);
    res.status(500).send('Error al obtener tipos');
  }
});

// Crear un nuevo tipo de leucemia
router.post('/tipos', async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevo = await TipoLeucemia.create({ nombre });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('Error al guardar tipo:', err);
    res.status(500).send('Error al guardar tipo');
  }
});

// Obtener subtipos por ID de tipo
router.get('/subtipos/:tipoId', async (req, res) => {
  try {
    const subtipos = await SubtipoLeucemia.findAll({
      where: { tipoLeucemiaId: req.params.tipoId }
    });
    res.json(subtipos);
  } catch (err) {
    console.error('Error al obtener subtipos:', err);
    res.status(500).send('Error al obtener subtipos');
  }
});

// Crear un nuevo subtipo
router.post('/subtipos', async (req, res) => {
  const { nombre, tipoLeucemiaId } = req.body;
  try {
    const subtipo = await SubtipoLeucemia.create({ nombre, tipoLeucemiaId });
    res.status(201).json(subtipo);
  } catch (err) {
    console.error('Error al guardar subtipo:', err);
    res.status(500).send('Error al guardar subtipo');
  }
});

// ==============================
// RUTAS DE CONTENIDO
// ==============================

router.get('/contenido', async (req, res) => {
  try {
    const contenido = await Contenido.findAll({ order: [['id', 'ASC']] });
    res.json(contenido);
  } catch (err) {
    console.error('Error al obtener contenido:', err);
    res.status(500).send('Error al obtener contenido');
  }
});

// ==============================
// RUTAS DE CUESTIONARIOS Y PREGUNTAS
// ==============================

// Obtener todos los cuestionarios
router.get('/cuestionarios', async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.findAll({
      include: { model: Pregunta, as: 'preguntas' }
    });
    res.json(cuestionarios);
  } catch (err) {
    console.error('Error al obtener cuestionarios:', err);
    res.status(500).json({ error: 'Error al obtener cuestionarios' });
  }
});

// Obtener un cuestionario por ID
router.get('/cuestionarios/:id', async (req, res) => {
  try {
    const cuestionario = await Cuestionario.findByPk(req.params.id, {
      include: { model: Pregunta, as: 'preguntas' }
    });
    if (!cuestionario) return res.status(404).json({ error: 'No encontrado' });
    res.json(cuestionario);
  } catch (err) {
    console.error('Error al obtener cuestionario:', err);
    res.status(500).json({ error: 'Error al obtener cuestionario' });
  }
});

// Crear un nuevo cuestionario
router.post('/cuestionarios', async (req, res) => {
  const { titulo, descripcion, preguntas } = req.body;
  try {
    const nuevoCuestionario = await Cuestionario.create({ titulo, descripcion });

    if (Array.isArray(preguntas)) {
      for (const pregunta of preguntas) {
        await Pregunta.create({
          texto: pregunta.texto,
          respuesta: pregunta.respuesta,
          cuestionarioId: nuevoCuestionario.id
        });
      }
    }

    res.status(201).json({ mensaje: 'Cuestionario creado', cuestionario: nuevoCuestionario });
  } catch (err) {
    console.error('Error al crear cuestionario:', err);
    res.status(500).json({ error: 'Error al crear cuestionario' });
  }
});

// Editar cuestionario
router.put('/cuestionarios/:id', async (req, res) => {
  const { titulo, descripcion } = req.body;
  try {
    const cuestionario = await Cuestionario.findByPk(req.params.id);
    if (!cuestionario) return res.status(404).json({ error: 'No encontrado' });

    await cuestionario.update({ titulo, descripcion });
    res.json(cuestionario);
  } catch (err) {
    console.error('Error al actualizar cuestionario:', err);
    res.status(500).json({ error: 'Error al actualizar cuestionario' });
  }
});

// Eliminar cuestionario y sus preguntas
router.delete('/cuestionarios/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Verificar si existe
    const cuestionario = await Cuestionario.findByPk(id);
    if (!cuestionario) {
      return res.status(404).json({ error: 'Cuestionario no encontrado' });
    }

    // Eliminar preguntas relacionadas
    await Pregunta.destroy({ where: { cuestionarioId: id } });

    // Eliminar el cuestionario
    await Cuestionario.destroy({ where: { id } });

    res.json({ mensaje: 'Cuestionario eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar cuestionario:', err);
    res.status(500).json({ error: 'Error al eliminar cuestionario' });
  }
});

// Agregar pregunta
router.post('/cuestionarios/:id/preguntas', async (req, res) => {
  const { texto, respuesta } = req.body;
  try {
    const cuestionario = await Cuestionario.findByPk(req.params.id);
    if (!cuestionario) return res.status(404).json({ error: 'Cuestionario no encontrado' });

    const nueva = await Pregunta.create({
      texto,
      respuesta,
      cuestionarioId: cuestionario.id
    });

    res.status(201).json(nueva);
  } catch (err) {
    console.error('Error al agregar pregunta:', err);
    res.status(500).json({ error: 'Error al agregar pregunta' });
  }
});

// Editar pregunta
router.put('/preguntas/:id', async (req, res) => {
  const { texto, respuesta } = req.body;
  try {
    const pregunta = await Pregunta.findByPk(req.params.id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });

    await pregunta.update({ texto, respuesta });
    res.json(pregunta);
  } catch (err) {
    console.error('Error al editar pregunta:', err);
    res.status(500).json({ error: 'Error al editar pregunta' });
  }
});

// Eliminar pregunta
router.delete('/preguntas/:id', async (req, res) => {
  try {
    const pregunta = await Pregunta.findByPk(req.params.id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });

    await pregunta.destroy();
    res.json({ mensaje: 'Pregunta eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar pregunta:', err);
    res.status(500).json({ error: 'Error al eliminar pregunta' });
  }
});

module.exports = router;
