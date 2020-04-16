var express = require('express');
var router = express.Router();
var db=require('../db');

router.get('/', function(req, res, next) {
    var query='select * from jobs';
    db.query(query,function(err,rows,feilds){
        if(err) throw err;
        //res.json(rows);
        res.render('jobs', { title: 'Jobs',jobs:rows });
    });
  
});
router.get('/create-form', function(req, res, next) {
    res.render('createform', {title: 'Create Job'});
  });

  router.post('/create', function(req, res, next) {
    var position = req.body.position;
    var company = req.body.company;
    var sql = `INSERT INTO jobs (position,company) VALUES ("${position}", "${company}")`;
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('/jobs');
    });
  });

  router.get('/edit-form/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = `SELECT * FROM jobs WHERE id=${id}`;
    db.query(sql, function(err, rows, fields) {
        res.render('editform', {title: 'Edit Job', job : rows[0]})
    })
  })
router.post('/edit/:id', function(req, res, next) {
    var position = req.body.position;
    var company = req.body.company; 
    var id = req.params.id;
    var sql = `UPDATE jobs SET position="${position}", company="${company}" WHERE id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record updated!');
      res.redirect('/jobs');
    });
  });
  router.get('/delete/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    var sql = `DELETE FROM jobs WHERE id=${id}`;
  
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record deleted!');
      res.redirect('/jobs');
    });
  });

module.exports = router;
