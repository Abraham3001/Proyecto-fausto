const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/usuario');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();
        let usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
          usuario = await Usuario.create({
            nombre: profile.displayName || 'Sin nombre',
            email,
            password: '-', // no necesitamos contraseña local
            rol: 'estudiante'
          });
        }
        return done(null, usuario);
      } catch (error) {
        console.error('Error en Google Strategy:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findByPk(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
