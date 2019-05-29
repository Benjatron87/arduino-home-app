const router = require('express').Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', {
    // what we want to retrieve see if need more than profile
    scope: ['profile']
}))

// router.get('/login/google', (req, res) => {
//     console.log('login route')
//     // res.json({name: 'hello'})
//     passport.authenticate('google', {
//         scope: ['profile']
//     })
//     res.send(req.body)
// })
// might not be working because on localhost
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

router.get('/login/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
    failureRedirect: '/login' }));

router.get('/google/redirect', passport.authenticate('google', (req, res) => {
    // this is what we want to save to state
    console.log('hello there')
    res.redirect('http://localhost:3000')
    // this is where we redirect too but see what needs to be done with react
}))

router.get('/login/facebook', (req,res) => {
    console.log('facebook')
    // passport.authenticate(''))
})
// not sure what needs to be done with this route
router.get('/auth/twitter',
  passport.authenticate('twitter'));


  router.route('/auth/twitter/callback')
  .post(function(req, res) {
    // figure out what to do here
    // request.post({
    //   url: 'https://api.twitter.com/oauth/request_token',
    //   oauth: {
    //     oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
    //     consumer_key: 'KEY',
    //     consumer_secret: 'SECRET'
    //   }
    // }, function (err, r, body) {
    //   if (err) {
    //     return res.send(500, { message: err.message });
    //   }


    //   var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    //   res.send(JSON.parse(jsonStr));
    // });
  });


module.exports = router
