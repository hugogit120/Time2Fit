//!!!!!!!!MIDDLEWARE logeado o no!!!!!!!!!!!!!!!

//si usario no esta logeado, lo lleva a posts
const LoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect("/private/home");
    }
    next(); //si no...pasamos a lo que siguiente en auth.js
  };

  //si usario no esta logeado, vuelve al index:
  const NotLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
      return res.redirect("/");
    }
    next();
  };
  /* const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
      return res.redirect("/");
    }
    next();
  }; */
  
  module.exports = { LoggedIn, NotLoggedIn };