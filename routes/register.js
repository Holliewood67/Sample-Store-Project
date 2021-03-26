const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('localRegister', {
    successRedirect: '/account'
}))

// const User = require('../models/user');

// router.post('/', (req, res, next) => {
//     User.create(req.body, (err, User) =>{
//         if (err){
//             res.json({
//                 confirmation: 'Failed',
//                 error: err
//             });
//             return;
//         }

//         res.json({
//             confirmation: 'Success!',
//             user: User
//         });
//     });
// });

module.exports = router;