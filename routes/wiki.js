const express = require('express');
const app = express();
const router = express.Router();
var models = require('../models');
const nunjucks = require('nunjucks');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  Page.findAll()
    .then(function(allPages) {
      res.render('../views/index', { allPages: allPages });
    })
});

router.post('/', function(req, res, next) {
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function(values) {
    var user = values[0];
      return Page.create(req.body).then(function (page) {
      return page.setAuthor(user);
    })
  })
  .then(function(savedPage) {
      res.redirect(savedPage.route)
})
.catch(next);
});

router.get('/add', function(req, res, next) {
  res.render('../views/addpage');
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('../views/wikipage', { foundPage: foundPage } );
  })
  .catch(next);

});

module.exports = router;
