const express = require('express');
const router = express.Router();
const passport = require('passport');

// refers to auth/google
// scope => permission to share
router.get('/google', passport.authenticate('google', {scope: ['profile','email']}));

// callback from passport-google-oauth20 github page:
// note : get rid of /auth , must be only /google/callback as we are in auth file
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
});

// to verify google auth was Successful
router.get('/verify', (req, res) => {
  if(req.user){
    console.log(req.user);
  }else {
    console.log('not Auth');
  }
});
// vitsit http://localhost:3000/auth/verify
//logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
