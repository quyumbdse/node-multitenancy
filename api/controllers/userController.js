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

const loginController = (req, res, next) => {
  
}

module.exports = {
                    userSignup,
                    loginController
                }