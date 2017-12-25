/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    schema: true,

    attributes: {

        firstname: {
            type: 'string',
            defaultsTo: '',
            required: true
        },
        lastname: {
            type: 'string',
            defaultsTo: ''
        },
        title: {
            type: 'string',
            defaultsTo: ''
        },
        email: {
            type: 'string',
            email: true,
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        username: {
            type: 'string',
            required: true,
            unique: true
        },
        setTitle: function() {
            return this.title = this.firstname + ' ' + this.lastname;
        },
        getFullName: function() {
            return this.firstname + ' ' + this.lastname;
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }

    },

    beforeCreate: function(values, next) {
        if (!values.password) {
            return next({err: ['Please provide a password.']});
        }

        bcrypt.hash(values.password, 10, function(err, enycPassword) {
            if (err) return next(err);
            values.password = enycPassword;
            next();
        });
    },

    comparePassword: function (password, user, cb) {
        bcrypt.compare(password, user.password, function (err, match) {
            if (err) 
                cb(err);
            if (match) {
                cb(null, true);
            } else {
                cb(err);
            }
        })
    }
};
