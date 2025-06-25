const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();

// =======================
// BASE DE DATOS Y MODELOS
// =======================
const sequelize = require('./database/db');
const Usuario = require('./models/usuario');
const Cuestionario = require('./models/cuestionario');
const usuariosRoutes = require('./routes/usuarios');

// PARA LA INFORMACIÖN DE LAS LEUCEMIAS
const TipoLeucemia = require('./models/tipoLeucemia');
const SubtipoLeucemia = require('./models/subtipoLeucemia');
const leucemiaEspecifica = require('./models/leucemiaEspecifica');

const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// MIDDLEWARE
// =======================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// =======================
// RUTAS ESTÁTICAS (HTML)
// =======================

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')));
app.get('/iniciar-sesion', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'login.html')));
app.get('/registro', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'registro.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'panel-admin.html')));
app.get('/docente', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'panel-docente.html')));
app.get('/estudiante', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'panel-estudiante.html')));
app.get('/admin-login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'admin-login.html')));

// LOGIN NORMAL
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.send('Usuario no encontrado');

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.send('Contraseña incorrecta');

    return usuario.rol === 'profesor'
      ? res.redirect('/docente')
      : res.redirect('/estudiante');
  } catch (error) {
    console.error('Error en login:', error);
    res.send('Error al iniciar sesión');
  }
});

// LOGIN ADMIN (desde botón especial)
app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email, rol: 'profesor' } });
    if (!usuario) return res.send('Usuario no autorizado.');
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.send('Contraseña incorrecta.');

    res.redirect('/admin');
  } catch (err) {
    console.error('Error en ingreso admin:', err);
    res.send('Error al intentar ingresar.');
  }
});

app.post('/registro', async (req, res) => {
  const { email, password, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.send('Ya existe un usuario con ese email.');

    const hashedPassword = await bcrypt.hash(password, 10);
    await Usuario.create({ email, password: hashedPassword, rol });

    res.redirect('/login');
  } catch (error) {
    console.error('Error al registrar:', error);
    res.send('Error al registrar el usuario.');
  }
});

app.post('/crear-cuestionario', async (req, res) => {
  const { titulo, descripcion } = req.body;

  try {
    await Cuestionario.create({ titulo, descripcion });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error al crear cuestionario:', error);
    res.send('Error al guardar el cuestionario.');
  }
});

app.get('/cuestionarios', async (req, res) => {
  try {
    const lista = await Cuestionario.findAll({ order: [['createdAt', 'DESC']] });
    res.json(lista);
  } catch (error) {
    console.error('Error al obtener cuestionarios:', error);
    res.status(500).json({ error: 'Error al obtener los cuestionarios' });
  }
});

//INFORMACIÓN PARA LAS LEUCEMIAS
app.post('/leucemia', async (req, res) => {
  const { tipo, subtipo, descripcion, imagen } = req.body;

  try {
    let tipoLeucemia = await TipoLeucemia.findOrCreate({
      where: { nombre: tipo }
    });

    let subtipoLeucemia = await SubtipoLeucemia.findOrCreate({
      where: {
        nombre: subtipo,
        tipoLeucemiaId: tipoLeucemia[0].id
      }
    });

    await leucemiaEspecifica.create({
      descripcion,
      imagen,
      subtipoLeucemiaId: subtipoLeucemia[0].id
    });

    res.send("Información guardada correctamente.");
  } catch (error) {
    console.error("Error al guardar info:", error);
    res.status(500).send("Error al guardar la información.");
  }
});


app.use('/api/usuarios', usuariosRoutes);


sequelize.sync({ force: false })
  .then(() => {
    console.log('🧠 Conexión exitosa a la base de datos.');

    (async () => {
      const adminExists = await Usuario.findOne({ where: { email: 'admin@quizlab.com' } });
      if (!adminExists) {
        const hashed = await bcrypt.hash('Delgado@2023', 10);
        await Usuario.create({
          email: 'admin@quizlab.com',
          password: hashed,
          rol: 'profesor'
        });
        console.log('✅ Usuario admin creado: admin@quizlab.com / Delgado@2023');
      } else {
        console.log('ℹ️ El usuario admin ya existe.');
      }
    })();

    app.listen(PORT, () => {
      console.log(`🚀 QuizLab corriendo en: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
  });
