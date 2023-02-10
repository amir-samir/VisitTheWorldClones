//require express router, passport
const router = require('express').Router();
const passport = require('passport');

//User Model
const User = require('../models/User');

//create passport Local strategy
passport.use(User.createStrategy());

//Serialize and deserialize user
passport.serializeUser(function(user, done){
   done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
});

//register user in db
router.post("/auth/register", async (req, res)=>{
    try{
        //register user
        const registerUser = await User.register({firstName: req.body.firstname, lastName: req.body.lastname, phoneNumber: req.body.phoneno, email: req.body.email, username: req.body.username}, req.body.password);
        if(registerUser){
            passport.authenticate("local")(req, res, function(){
                res.redirect('/');
            });

        }else{
            res.redirect('/register');
        }
    }catch(err){
       res.redirect('/register');
       console.log(err);
    }
});

// Login User
router.post("/auth/login", (req, res)=>{
   //create new user object
   const user = new User({
    username: req.body.username,
    password: req.body.password
   });

   //using passport login method we will check if user credentials are correct or not
   req.login(user, (err)=>{
    if(err){
        console.log(err)
    }else{
        passport.authenticate("local")(req, res, function(){
            res.redirect('/');
        });
    }
   });
});

//logout user
router.get("/logout", (req, res)=> {
    //use passport logout method
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    console.log("loged out");
    //res.redirect("/")
});

//export router
module.exports = router;