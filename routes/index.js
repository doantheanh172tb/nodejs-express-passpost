const express = require('express');
const passport = require('passport');
const router = express.Router();

// file:app/authentication/middleware.js
function authenticationMiddleware () {
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log('authenticationMiddleware True');
            return next()
        }
        console.log('authenticationMiddleware False');
        res.redirect('/login')
    }
}

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/',(req, res) => {
  res.render('index', { title: 'Index' });
});

/* GET Login page. */
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login'});
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

/* GET Private page. */
router.get('/private', authenticationMiddleware(),(req, res) => {
        res.send('Wellcome to Private page!');
    }
);

module.exports = router;
