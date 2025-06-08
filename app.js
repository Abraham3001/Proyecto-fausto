const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Importar modelos
const sequelize = require('./database/db');
const Usuario = require('./models/usuario');
const Cuestionario = require('./models/cuestionario');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas HTML directas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'registro.html'));
});

// Rutas POST
app.get('/cuestionarios', async (req, res) => {
  try {
    const lista = await Cuestionario.findAll({ order: [['createdAt', 'DESC']] });
    res.json(lista);
  } catch (error) {
    console.error('Error al obtener cuestionarios:', error);
    res.status(500).json({ error: 'Error al obtener los cuestionarios' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.send('Usuario no encontrado');
    }

    const match = await bcrypt.compare(password, usuario.password);

    if (!match) {
      return res.send('Contraseña incorrecta');
    }

    if (usuario.rol === 'profesor') {
      return res.redirect('/html/panel-admin.html');
    } else {
      return res.redirect('/html/panel-estudiante.html');
    }

  } catch (error) {
    console.error(error);
    res.send('Error al iniciar sesión');
  }
});

// Registro
app.post('/registro', async (req, res) => {
  const { email, password, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.send('Ya existe un usuario con ese email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Usuario.create({
      email,
      password: hashedPassword,
      rol
    });

    res.redirect('/html/login.html');
  } catch (error) {
    console.error(error);
    res.send('Error al registrar el usuario.');
  }
});

// Crear cuestionario
app.post('/crear-cuestionario', async (req, res) => {
  const { titulo, descripcion } = req.body;

  try {
    await Cuestionario.create({ titulo, descripcion });
    res.redirect('/html/panel-admin.html');
  } catch (error) {
    console.error('Error al crear el cuestionario:', error);
    res.send('Error al guardar el cuestionario.');
  }
});

// Sincronizar y arrancar servidor
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
        console.log(`
           ________
        .-'        '-.
       /            \\
      |              |
      |,  .-.  .-.  ,|
      | )(_o/  \\o_)( |
      |/     /\\     \\|
      (_     ^^     _)
       \\__|IIIIII|__/
        | \\IIIIII/ |
        \\          /
         \`--------\'
`);

        console.log(`Servidor huevocore corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar con la base de datos:', err));
