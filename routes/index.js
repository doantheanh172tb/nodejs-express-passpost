const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Index' });
});

/* GET Login page. */
router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login'});
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

/* GET Private page. */
router.get('/private', (req, res, next) => {
  // console.log(req);
    if(req.isAuthenticated()){
        res.send('Wellcome to Private page!');
    }else{
        res.redirect('/login');
    }
})

/* GET register page. */
// router.get('/register', (req, res) => {
//     res.render('register', { title: 'Register', user: req.user });
// });
// router.post('/register', function(req, res) {
//     userController.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//             return res.render('register', { account : account });
//         }
//
//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/');
//         });
//     });
// });

module.exports = router;
