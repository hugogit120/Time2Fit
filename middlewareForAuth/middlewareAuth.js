const loggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect('/private/home');
    }
    next();
};
const notLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/');
    }
    next();
};

module.exports = { loggedIn, notLoggedIn};

