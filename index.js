var express = require('express'),
    app = express(),
    cors = require('cors'),
    blogItems = require('./data').blogItems,
    _ = require('lodash'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    update = require('immutability-helper');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;
var router = express.Router();

//ROUTES FOR API
//POSTS PAGE
router.route('/posts')
    .get(function (req, res) {
        fs.readFile('./data.json', 'utf-8', function (err, data) {
            if (err) {
                res.send(err);
            } else {
                var items = JSON.parse(data);
                res.json(items);
            }
        });
    });

//POST PAGE
router.route('/posts/:post_id')
    .get(function (req, res) {
        fs.readFile('./data.json', 'utf-8', function (err, data) {
            if (err) {
                res.send(err);
            } else {
                var items = JSON.parse(data),
                    id = req.params.post_id;

                res.json(_.find(items, {_id: id}));
            }
        });
    })
    .put(function (req, res) {
        fs.readFile('./data.json', 'utf-8', function (err, data) {
            if (err) {
                res.send(err);
            } else {
                var items = JSON.parse(data),
                    id = req.params.post_id;

                var newItems = _.map(items, function (item) {
                    if (item._id === id) {
                        return update(item, {
                            metaInfo: {
                                likes: {$apply: function (count) {return count + 1}}
                            }
                        });
                    } else {
                        return item;
                    }
                });

                fs.writeFile('data.json', JSON.stringify(newItems), function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'Likes incremented'});
                    }
                });
            }
        });
    });

app.use('/', router);

app.listen(port, function () {
    console.log('Server listening on port', port);
});
