/**
 * BucketController
 *
 * @description :: Server-side logic for managing buckets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res, next) {
        var url = req.body.url;
        var description = req.body.description;
        var title = req.body.title;

        Bucket.create({url: url, description: description, title: title}, function(err, buck) {
            if (err) return next(err);

            var response = {
                status: true,
                bucket: buck
            }

            return res.json(response);
        })
    }
};

