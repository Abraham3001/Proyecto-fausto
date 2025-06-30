const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/usuario');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let usuario = await Usuario.findOne({ where: { googleId: profile.id } });
    if (!usuario) {
      usuario = await Usuario.create({
        nombre: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        rol: 'estudiante'
      });
    }
    return done(null, usuario);
  } catch (err) {
    console.error("Error en login con Google:", err);
    return done(err, null);
  }
}));

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
