const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/index');

//Controller Imports
const userController = require('./controllers/userController');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret : "secret",
    saveUninitialized: true,
    resave: true,
    // cookie: { //timeAge for cookie
    //     maxAge: 1000*60*0.5 //mini seconds
    // }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// passport config
passport.use(new LocalStrategy(
    (userName, password, done) => {
        console.log('LocalStrategy');
        console.log('userName',userName);
        console.log('password', password);
        userController.authenticate(userName, password)
            .then((res)=> {
                console.log('res', JSON.stringify(res));
                if(res.data){
                    return done(null, res.data);
                }else{
                    return done(null, false, { message: 'Incorrect userName and password' });
                }
            })
            .catch((err)=>{
                console.log('err', JSON.stringify(err));
                return done(err);
            });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.userName);
});

passport.deserializeUser((userName, done) => {
    userController.deserializeUser(userName)
        .then((res)=> {
            console.log('res', JSON.stringify(res));
            if(res.data){
                return done(null, res.data);
            }else{
                return done(null, false);
            }
        })
        .catch((err)=>{
            console.log('err', JSON.stringify(err));
            return done(err);
        });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
