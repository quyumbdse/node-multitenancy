const User = require('../models/User');
const { transaction } = require('objection');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSignup = async(req, res) => {
    const graph = req.body;
    
    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(User.knex(), trx => {
      User.query(trx)
      .where({ email: req.body.email })
        .then(user => {
          if(user.length >= 1) {
            return res.status(409).json({
              message: 'Mail exist'
            })
          }
        })
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
          message: "user not found"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
       if(result) {
        const token = jwt.sign(
           {
             email: user[0].email,
             userId: user[0].id,
             isAdmin: this.isAdmin
           },
           process.env.JWT_KEY,
           {
             expiresIn: '1h'
           }
         )
        return res.status(200).json({
          message: "Auth successful",
          Token: token
        });
       }
       return res.status(401).json({
        message: "password doesn\'t match"
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