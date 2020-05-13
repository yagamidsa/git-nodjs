const express = require('express');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn, isNotLoggeIn} = require('../lib/auth');


//rendireccionar a la vista signup
router.get('/signup', isNotLoggeIn, (req, res) => {
    res.render('auth/signup');
});

//post recibe los datos de ese formulario
router.post('/signup', isNotLoggeIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));


//vista signin
router.get('/signin', isNotLoggeIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggeIn, passport.authenticate('local.signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}))

//crear vista profile
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});


router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;