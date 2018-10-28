
const { transaction } = require('objection');
const Tenant = require('../models/Tenant');

const getAllTenants = async(req, res, next) => {
    const tenants = await Tenant.query()
    .skipUndefined()
    
    res.send(tenants);
}

const postTenant = async (req, res) => {
    const graph = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(Tenant.knex(), trx => {
      return (
        Tenant.query(trx)
          // For security reasons, limit the relations that can be inserted.
         // .allowInsert('[pets, children.[pets, movies], movies, parent]')
          .insertGraph(graph)
      );
    });

    res.send(insertedGraph);
  }

  const getSingleTenant =  (req, res, next) => {
    res.status(200).json({
        message: 'tenant details',
        tenantId: req.params.tenantId
    })
}


module.exports = {getAllTenants,
                  postTenant,
                  getSingleTenant

                 }