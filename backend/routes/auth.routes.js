const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/');
  }
);

router.get('/user', (req, res) => {
  if(req.user) {
    if(req.user.emails[0].value === process.env.ADMIN_MAIL) {
      res.json({ user: req.user, admin: true });
    } else {
      res.json({ user: req.user});
    }
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

module.exports = router;
