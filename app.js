const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
require('dotenv').config();
const sequelize = require('./database/db');
const Usuario = require('./models/usuario');
const Cuestionario = require('./models/cuestionario');
const TipoLeucemia = require('./models/tipoLeucemia');
const SubtipoLeucemia = require('./models/subtipoLeucemia');
const leucemiaEspecifica = require('./models/leucemiaEspecifica');
const Contenido = require('./models/contenido');
const Pregunta = require('./models/pregunta');

const passport = require('passport');  // ✅ aquí usamos passport de la librería
const configurePassport = require('./config/passport'); // ✅ traemos la función de configuración
configurePassport();  // ✅ configuramos las estrategias de Google

// Rutas
const usuariosRoutes = require('./routes/usuarios');
const apiRoutes = require('./routes/api');

// Asociaciones
TipoLeucemia.hasMany(SubtipoLeucemia, { foreignKey: 'tipoLeucemiaId', as: 'subtipos' });
SubtipoLeucemia.belongsTo(TipoLeucemia, { foreignKey: 'tipoLeucemiaId', as: 'tipo' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'super_secreto_único_123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 2
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Aquí sigue todo tu código exactamente igual
// Middleware de autenticación
function requiereLogin(req, res, next) {
  if (!req.session.usuarioId) {
    return res.redirect('/iniciar-sesion');
  }
  next();
}

function requiereRol(rol) {
  return (req, res, next) => {
    if (!req.session.usuarioId) {
      return res.redirect('/iniciar-sesion');
    }
    if (req.session.rol !== rol) {
      return res.status(403).sendFile(path.join(__dirname, 'public', 'html', '403.html'));
    }
    next();
  };
}

function redirigirSiAutenticado(req, res, next) {
  if (req.session.usuarioId) {
    if (req.session.rol === 'profesor') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/estudiante');
    }
  }
  next();
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });
// Rutas HTML públicas
app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'index.html')));
app.get('/iniciar-sesion', (_, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'login.html')));
app.get('/registro', (_, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'registro.html')));
app.get('/admin-login', (_, res) => res.sendFile(path.join(__dirname, 'public', 'html', 'admin-login.html')));

// Rutas HTML protegidas
app.get('/iniciar-sesion', redirigirSiAutenticado, (_, res) => 
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'))
);
app.get('/registro', redirigirSiAutenticado, (_, res) => 
  res.sendFile(path.join(__dirname, 'public', 'html', 'registro.html'))
);
app.get('/admin-login', redirigirSiAutenticado, (_, res) => 
  res.sendFile(path.join(__dirname, 'public', 'html', 'admin-login.html'))
);
app.get('/admin', requiereRol('profesor'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'panel-admin.html'))
);
app.get('/admin/tipo', requiereRol('profesor'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'admin-tipos.html'))
);
app.get('/admin/contenido', requiereRol('profesor'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'agregar-contenido.html'))
);
app.get('/admin/agregar-contenido', requiereRol('profesor'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'admin-agregar-contenido.html'))
);
app.get('/docente', requiereRol('profesor'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'panel-docente.html'))
);
app.get('/editar-cuestionario/:id', requiereRol('profesor'), (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'editar-cuestionario.html'))
);
app.get('/lista-cuestionarios', requiereRol('profesor'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'lista-cuestionarios.html'))
);
app.get('/estudiante', requiereRol('estudiante'), (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'panel-estudiante.html'))
);
app.get('/contenido', requiereLogin, (_, res) =>
  res.sendFile(path.join(__dirname, 'public', 'html', 'contenido.html'))
);

// Rutas API
app.use('/api', apiRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion');
  });
});

// Guardar contenido
app.post('/admin/contenido', requiereRol('profesor'), upload.single('imagen'), async (req, res) => {
  const { titulo, subtitulo, descripcion, alt } = req.body;
  const imagenPath = req.file ? '/uploads/' + req.file.filename : '';
  try {
    await Contenido.create({ titulo, subtitulo, descripcion, imagen: imagenPath, alt });
    res.redirect('/admin');
  } catch (error) {
    console.error('Error al guardar contenido:', error);
    res.status(500).send('Error al guardar el contenido.');
  }
});

// Login usuario
// Login usuario
app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email = email.trim().toLowerCase();
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
      const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    req.session.usuarioId = usuario.id;
    req.session.rol = usuario.rol;
    return res.json({
      success: true,
      rol: usuario.rol
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.send('Error al iniciar sesión');
  }
});


// Login admin
app.post('/admin-login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email, rol: 'profesor' } });
    if (!usuario) return res.send('Usuario no autorizado.');
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.send('Contraseña incorrecta.');
    req.session.usuarioId = usuario.id;
    req.session.rol = usuario.rol;
    res.redirect('/admin');
  } catch (err) {
    console.error('Error en ingreso admin:', err);
    res.send('Error al intentar ingresar.');
  }
});
// Registro usuario con login automático
app.post('/registro', async (req, res) => {
  const { nombre, password, confirmPassword } = req.body;
  const email = req.body.email.trim().toLowerCase();
  if (!nombre || !email || !password || !confirmPassword) {
    return res.send('Por favor completa todos los campos.');
  }

  if (password !== confirmPassword) {
    return res.send('Las contraseñas no coinciden.');
  }

  if (password.length < 8) {
    return res.send('La contraseña debe tener al menos 8 caracteres.');
  }

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.send('Ya existe un usuario con ese correo.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol: 'estudiante'
    });

    // Iniciar sesión automáticamente
    req.session.usuarioId = nuevoUsuario.id;
    req.session.rol = nuevoUsuario.rol;

    // Redirigir al panel
    res.redirect('/estudiante');
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).send('Ocurrió un error al registrar el usuario.');
  }
});

// Crear cuestionario
app.post('/crear-cuestionario', requiereRol('profesor'), async (req, res) => {
  const { titulo, descripcion, texto, respuesta } = req.body;
  try {
    const nuevoCuestionario = await Cuestionario.create({ titulo, descripcion });
    if (Array.isArray(texto) && texto.length > 0) {
      for (let i = 0; i < texto.length; i++) {
        if (texto[i].trim() !== '' && respuesta[i].trim() !== '') {
          await Pregunta.create({
            texto: texto[i],
            respuesta: respuesta[i],
            cuestionarioId: nuevoCuestionario.id
          });
        }
      }
    }
    res.redirect('/lista-cuestionarios');
  } catch (error) {
    console.error('Error al crear cuestionario:', error);
    res.status(500).send('Error al guardar el cuestionario.');
  }
});

// Obtener cuestionarios
app.get('/cuestionarios', async (_, res) => {
  try {
    const lista = await Cuestionario.findAll({ order: [['createdAt', 'DESC']] });
    res.json(lista);
  } catch (error) {
    console.error('Error al obtener cuestionarios:', error);
    res.status(500).json({ error: 'Error al obtener los cuestionarios' });
  }
});

app.get('/api/sesion', async (req, res) => {
  if (!req.session.usuarioId) {
    return res.json({ autenticado: false });
  }

  const usuario = await Usuario.findByPk(req.session.usuarioId);

  res.json({
    autenticado: true,
    usuarioId: usuario.id,
    rol: usuario.rol,
    email: usuario.email,
    nombre: usuario.nombre
  });
});


// Guardar información de leucemia
app.post('/leucemia', requiereRol('profesor'), async (req, res) => {
  const { tipo, subtipo, descripcion, imagen } = req.body;
  try {
    const [tipoLeucemia] = await TipoLeucemia.findOrCreate({ where: { nombre: tipo } });
    const [subtipoLeucemia] = await SubtipoLeucemia.findOrCreate({
      where: { nombre: subtipo, tipoLeucemiaId: tipoLeucemia.id }
    });
    await leucemiaEspecifica.create({
      descripcion,
      imagen,
      subtipoLeucemiaId: subtipoLeucemia.id
    });
    res.send("Información guardada correctamente.");
  } catch (error) {
    console.error("Error al guardar info:", error);
    res.status(500).send("Error al guardar la información.");
  }
});

// Obtener contenido por ID
app.get('/api/contenido/:id', async (req, res) => {
  try {
    const contenido = await Contenido.findByPk(req.params.id);
    if (!contenido) return res.status(404).send('Contenido no encontrado');
    res.json(contenido);
  } catch (err) {
    console.error('Error al obtener contenido por ID:', err);
    res.status(500).send('Error al obtener el contenido');
  }
});

// Editar contenido existente
app.put('/api/contenido/:id', requiereRol('profesor'), async (req, res) => {
  const { titulo, subtitulo, descripcion, alt } = req.body;
  try {
    const contenido = await Contenido.findByPk(req.params.id);
    if (!contenido) return res.status(404).send('Contenido no encontrado');
    await contenido.update({ titulo, subtitulo, descripcion, alt });
    res.send('Contenido actualizado exitosamente');
  } catch (err) {
    console.error('Error al actualizar contenido:', err);
    res.status(500).send('Error al actualizar el contenido');
  }
});

// Iniciar sesión con Google
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/iniciar-sesion' }),
  (req, res) => {
    // AQUÍ SE GUARDA EN TU SESIÓN DE EXPRESS
    req.session.usuarioId = req.user.id;
    req.session.rol = req.user.rol;
    res.redirect('/estudiante');
  }
);


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'html', '404.html'));
});

// Inicializar
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
    (async () => {
      const adminExists = await Usuario.findOne({ where: { email: 'admin@quizlab.com' } });
      if (!adminExists) {
        const hashed = await bcrypt.hash('Delgado@2023', 10);
        await Usuario.create({
          nombre: 'Admin',
          email: 'admin@quizlab.com',
          password: hashed,
          rol: 'profesor'
        });
        console.log('Usuario admin creado: admin@quizlab.com / Delgado@2023');
      } else {
        console.log('El usuario admin ya existe.');
      }
    })();
    app.listen(PORT, () => {
      console.log(`QuizLab corriendo en: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

