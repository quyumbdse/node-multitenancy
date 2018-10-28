const User = require('../models/User');
const bcrypt = require('bcrypt');
const { transaction } = require('objection');


const userSignup = async(req, res) => {
    const graph = req.body;
    // bcrypt.hash(req.body.email, 10, (err, hash) =>{
    //         if(err) {
    //             return res.status(500).json({
    //                 error: err
    //             })
    //         } else {

    //         }
    // })
    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(User.knex(), trx => {
        
      return (
        User.query(trx)
          // For security reasons, limit the relations that can be inserted.
         // .allowInsert('[pets, children.[pets, movies], movies, parent]')
          .insertGraph(graph)
      );
    });

    res.send(insertedGraph);
}

module.exports = {
                    userSignup
                }