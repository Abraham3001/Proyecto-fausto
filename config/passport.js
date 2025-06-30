const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/usuario');

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await Usuario.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Usuario.findOne({ where: { email: profile.emails[0].value } });

      if (user) {
        return done(null, user);
      } else {
        user = await Usuario.create({
          nombre: profile.displayName,
          email: profile.emails[0].value,
          password: null, // IMPORTANTE: acepta NULL en tu modelo
          rol: 'estudiante'
        });
        return done(null, user);
      }
    } catch (err) {
      console.error('Error en GoogleStrategy:', err);
      return done(err, null);
    }
  }));
};
module.exports = passport;
