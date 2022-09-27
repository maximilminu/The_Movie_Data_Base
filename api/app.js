const express=require('express')
const app = express();
const routes = require('./routes');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const db = require('./db')
const { User,Favorite } = require('./models')
const bodyParser = require("body-parser")

// parser
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PASSPORT
// cookies
app.use(cookieParser())
app.use(expressSession({ secret: "superTopTMDB" }))

// passport init
app.use(passport.initialize());
app.use(passport.session())

// estrategia local
passport.use(new LocalStrategy({usernameField:'email'}, (email,password,done) => {
  User.findOne({where:{email:email.toLowerCase()}})
  .then(user=>{
    if (!user) done(null,false)
    if (user.validatePassword(password)) done(null,user)
    else done (null, false)
  })
  .catch(err => done(err,false))
}))

// serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
// deserialize
passport.deserializeUser(function(id, done) {
User.findByPk(id)
    .then(user => done(null, user))
});

// routes
app.use('/api', routes);
app.use('/*', (req,res)=>{ res.sendStatus(404) })

db.sync({force: false})
.then(()=>{
  app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
  });
})