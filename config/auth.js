const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.serializeUser((user, next) =>{
        next(null, user);
    }); 

    passport.deserializeUser((id, next) => {
        User.findById(id, (err, user) =>{
            next(err, user)
        });
    });

    const localLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true

    }, 
    (req, email, password, next) => {
        User.findOne({email: email}, (err, user) =>{
            if (err){
                return next(err);
            }
    
            if (user == null){
                return next(new Error('User Not Found'));
            }

            if (bcrypt.compareSync(password, user.password) == false){
                return next(new Error('Password and/or email do not match.'));
            }
    
            return next(null, user);
        });
    });
    
    passport.use('localLogin', localLogin);

    const localRegister = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, next) =>{
        User.findOne({email: email}, (err, user) =>{
            if (err){
                return next(err);
            }
    
            if (user != null){
                return next(new Error('User already exists, please use login form.'));
            }

            const hashedPw = bcrypt.hashSync(password, 10);
            let isAdmin = false;
            if (email.indexOf('@managermail.com') != -1){
                isAdmin = true;
            }
            User.create({email: email, password: hashedPw, isAdmin: isAdmin}, (err, user) => {
                if (err){
                    return next(err);
                }
                next(null, user);
            })
        });
    });

    passport.use('localRegister', localRegister);

};