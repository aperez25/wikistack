const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const nunjucks = require('nunjucks');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');

router.get('/', function(req, res, next) {
  User.findAll()
  .then(function(users){
    console.log(users);
    res.render('../views/users', { users });
  })
  .catch(next);
});

router.get('/:userId', function(req, res, next) {

  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('../views/userpage', { user: user, pages: pages });
  })
  .catch(next);

});

module.exports = router;
