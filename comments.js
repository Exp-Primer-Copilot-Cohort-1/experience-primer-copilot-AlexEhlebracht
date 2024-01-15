// create web server

// load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// load models
var Comments = require('../models/comments');

// create router
var commentRouter = express.Router();

// use body-parser
commentRouter.use(bodyParser.json());

// configure router
commentRouter.route('/')
    .get(function(req, res, next) {
        Comments.find({}, function(err, comments) {
            if (err) throw err;
            res.json(comments);
        });
    })

    .post(function(req, res, next) {
        Comments.create(req.body, function(err, comment) {
            if (err) throw err;
            console.log('Comment created!');
            var id = comment._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the comment with id: ' + id);
        });
    })

    .delete(function(req, res, next) {
        Comments.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

commentRouter.route('/:commentId')
    .get(function(req, res, next) {
        Comments.findById(req.params.commentId, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })

    .put(function(req, res, next) {
        Comments.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, {
            new: true
        }, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })

    .delete(function(req, res, next) {
        Comments.findByIdAndRemove(req.params.commentId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

// export module
module.exports = commentRouter;