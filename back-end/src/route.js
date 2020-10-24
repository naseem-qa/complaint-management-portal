'use strict';

const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();

const User = require('./auth/user.js');
const modelFinder = require('./middleware/model-finder.js');
const authMiddlware = require('./auth/auth-middleware.js');

router.param('model', modelFinder.loadFile);
router.get('/', test);

function test(req, res){
    res.status(200).send('working')
}

router.get('/api/v1/:model', findAll);
router.get('/api/v1/:model/:_id', findById);
router.post('/api/v1/:model', createOne);
router.post('/api/v1/:model/mine', getMyComplaints)
router.put('/api/v1/:model/:_id', updateOne);
router.delete('/api/v1/:model/:_id',deleteOne );

router.post('/signup', signup);
router.post('/signin', authMiddlware, signin);
router.use(methodOverride(middleware));


function findAll(req, res, next){
    req.model.read()
    .then(
        data =>{
            res.json({data})
        })
        .catch(next);
}

function findById(req, res, next){
    let _id = req.params._id;
    req.model.read(_id)
        .then(data =>{
            res.json(data)
        })
}

function createOne(req, res, next){
  console.log('payload', req.body)
    let complaint = req.body;
    req.model.create(complaint)
        .then(data =>{
            res.json(data)
        })
        .catch(console.log('error'));
}

function getMyComplaints(req,res,next) {
  console.log('reqqq',req.body)
  req.model.findByUserName(req.body.username)
  .then(data=> res.send(data))
}


function updateOne(req, res, next) {
    let _id = req.params._id;
    let complaint = req.body;
  console.log('id',_id)
  console.log('complaint',complaint)
    req.model.update(_id, complaint)
        .then(data => {
            res.json(data)
        })
        .catch(next)
}

function deleteOne(req, res, next) {
    let _id = req.params._id
    req.model.delete(_id)
        .then(
            res.send('DELETED')
        )
        .catch(next)
}

function signup(req, res, next) {
    let validUser = req.body.username;
    User.findOne({ 'username': `${validUser}` })
      .then(existUser => {
        if (validUser === existUser.username) {
          res.status(200).send('already exist');
        }
      })
      .catch(() => {
        let user = new User(req.body);
        user.save()
          .then(oneUser => {
            req.token = oneUser.signupTokenGenerator(oneUser);
            req.user = oneUser;
            res.status(200).send(req.token);
          });
      });
  }

  function signin(req, res, next) {
    res.status(200).send(req.token);
  }


  function middleware(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  }

  
  

module.exports = router;
