const express = require('express');
const app = express();
const router = express.Router();
const models = require('../models');
const nunjucks = require('nunjucks');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res) {
  User.findAll()
  .then(function(users){
    console.log(users);
    res.render('../views/users', { users });
  });
});

router.get('/:id', function(req, res) {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(user){
    res.render('../views/userpage', { user: user } );
  })
  .catch();
})


module.exports = router;
