/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var jwToken = require('../policies/jwtAuth');

module.exports = {

    'new': function (req, res) {
        res.view();
    },

    create: function(req, res, next) {
        User.create(req.params.all(), function(err, user) {
            if (err) return next(err);
            res.json(user);
        });
    },

    signup: function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;
        var firstname = req.body.firstname;

        if (!email || !password || !username || !firstname) {
            return res.json(401, {err: 'Please fill in all the fields'});
        }

        User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            })
            .exec(function (err, user) {
                if (err) {
                    res.json(err.status, {err: err});
                    return;
                }
                if (user) {
                    res.json(200, {user: user, token: jwToken.issue({id: user.id})});
                    // res.json({success: true, message: "User Registered successfully. Please, go ahead and login"});
                }
            });
    },

    login: function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var user = {
            sub: 'User detail',
            email: email
        };

        var token = jwt.sign(user, sails.config.session.secret, {expiresIn: "24h"});

        if (!email || !password) {
            return res.json(401, {err: 'username and password required'});
        }

        User
            .findOneByEmail(email, function (err, user) {
                if (!user) {
                    return res.json(401, {err: 'Invalid email. User does not exist'});
                }

                bcrypt.compare(password, user.password, function(err, valid) {
                    if (err) return next(err);

                    if (!valid) {
                        var response = {
                            err: 'Invalid username and password combinations.',
                            status: false
                        }

                        res.json(401, response);
                        return;
                    }

                    res.json({
                        status: true,
                        token: token,
                        user: user
                    });
                    return;
                });
            })
    }

};

