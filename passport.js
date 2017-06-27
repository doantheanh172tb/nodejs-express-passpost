const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//Controller Imports
const userController = require('./controllers/userController');

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

module.exports = passport;