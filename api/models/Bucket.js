/**
 * Bucket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        url: {
            required: true,
            type: 'string'
        },
        description: {
            type: 'longtext'
        },
        title: {
            type: 'string'
        },
        views: {
            type: 'integer',
            defaultsTo: 0
        }

    }
};
