const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const nunjucks = require('nunjucks');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  Page.findAll()
    .then(function(allPages) {
      res.render('../views/index', { allPages: allPages });
    })
});

router.post('/', function(req, res, next) {
  console.log(req.body)
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

router.get('/search', function(req, res, next) {
  var tag = req.query.status
  res.render('../views/searchtags');
  if (tag) {

  }
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then(function(foundPage){
    res.render('../views/wikipage', { foundPage: foundPage } );
  })
  .catch(next);

});

module.exports = router;
