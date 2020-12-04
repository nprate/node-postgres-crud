const express = require('express');
const router = express.Router();

const pool = require('../../config/db');

//API @GET ALL USERS 
//TEST
router.get('/', function(req, res, next) {
 
  pool.query(`
        SELECT id,first_name,last_name FROM users
        `,(err,data) => {
            if(err) throw err;
            console.log(JSON.stringify(data.rows));
            res.json(data.rows);
        }
  )
});

//API @GET SPECIFIC USERS /api/v1/users/:id
router.get('/:id', function(req, res, next) {
    console.log(`get users by id = ${req.params.id}`);
    pool.query(`
          SELECT id,first_name,last_name 
          FROM users
          WHERE id = $1
          `,[req.params.id]
           ,(err,data) => {
              if(err) throw err;
              
              if(data.rows.length == 0) {
                res.status(400).send("Users not found !");
              } else {
                console.log(JSON.stringify(data.rows));
                res.json(data.rows);
              }
          }
    )
  });


//API @POST USERS /api/v1/users/
router.post('/', function(req, res, next) {
    console.log(`POST users `);
   
    pool.query(`
          INSERT INTO users(id, first_name, last_name)
          VALUES (DEFAULT,$1,$2)
          RETURNING id
          `,[req.body.first_name,req.body.last_name]
           ,(err,data) => {
              if(err) throw err;
               
              console.log(`NEW USER CREATED !`);
              res.status(200).send("NEW USER CREATED !");
              res.json(data.rows[0]).id;
          }
    )
  });
  

//API @UPDATE USERS /api/v1/users/:id
router.put('/:id', function(req, res, next) {
    console.log(`UPDATE users by id = ${req.params.id}`);
   
    pool.query(`
          UPDATE users
          SET first_name = $1, last_name = $2
          WHERE id = $3
          `,[req.body.first_name,req.body.last_name,req.params.id]
           ,(err,data) => {
              if(err) throw err;
              
              if(data.rowCount == 0) {
                res.status(400).send("Users not found !");
              } else {
                console.log(`Update Complete !`);
                res.status(200).send("Update Complete !");
              }
          }
    )
  });

 //API @DELETE USERS /api/v1/users/:id
router.delete('/:id', function(req, res, next) {
    console.log(`DELETE users by id  = ${req.params.id}`);
   
    pool.query(`
          DELETE FROM users 
          WHERE id = $1 
          `,[req.params.id]
           ,(err,data) => {
              if(err) throw err;

              if(data.rowCount == 0){
                res.status(400).send("Users not found !");
              } else {
                 console.log(`USER DELETED !`);
                 res.status(200).send("USER DELETED !");
              }
          }
    )
  });
   

module.exports = router;