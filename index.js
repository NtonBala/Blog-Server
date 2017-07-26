var express = require('express'),
    app = express(),
    cors = require('cors'),
    blogItems = require('./data').blogItems,
    _ = require('lodash');

app.use(cors());

var port = process.env.PORT || 3001;

var router = express.Router();

router.route('/posts')
    .get(function (req, res) {
        res.json(blogItems);
});

router.route('/posts/:post_id')
    .get(function (req, res) {
        res.json(_.find(
            blogItems,
            {_id: req.params.post_id})
        );
    });

router.route('/metainfo/:post_id')
    .get(function (req, res) {
        const blogItem = _.find(blogItems, {_id: req.params.post_id});
        blogItem.metaInfo.likes = ++blogItem.metaInfo.likes;
        res.json(blogItem.metaInfo);
    });

app.use('/', router);

app.listen(port, function () {
    console.log('Server listening on port', port);
});
