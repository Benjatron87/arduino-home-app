const router = require('express').Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', {
    // what we want to retrieve see if need more than profile
    scope: ['profile']
}))

router.get('/login/google',
  passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

router.get('/login/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

router.get('/google/redirect', passport.authenticate('google', (req, res) => {
    // this is what we want to save to state
    console.log('hello there')
    res.redirect('http://localhost:3000' || "https://my-bedroom-controller.herokuapp.com/")
    // this is where we redirect too but see what needs to be done with react
}))

router.get('/login/facebook', (req,res) => {
    console.log('facebook')
    // passport.authenticate(''))
})

module.exports = router
