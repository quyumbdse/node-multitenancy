const User = require('../models/User');
const { transaction } = require('objection');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSignup = async(req, res) => {
    const graph = req.body;
    
    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(User.knex(), trx => {
      return (
        User.query(trx)
          .insertGraph(graph)
      );
    });

    res.send(insertedGraph);
}

const loginController = async(req, res, next) => {
  
       await User.query().where({ email: req.body.email })
      
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
       if(result) {
        return res.status(200).json({
          message: "Auth successful"
        });
       }
       return res.status(401).json({
        message: "Auth failed"
      });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

  }


module.exports = {
                    userSignup,
                    loginController
                }