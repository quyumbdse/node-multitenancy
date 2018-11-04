
const { transaction } = require('objection');
const Tenant = require('../models/Tenant');

const getAllTenants = async(req, res) => {


    const tenants = await Tenant.query()
    .skipUndefined()
    .eager('shops')
    res.send(tenants);
}

const postTenant = async (req, res) => {
    const graph = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedGraph = await transaction(Tenant.knex(), trx => {
      //  console.log("test1: " + Tenant.query(trx));
      return (
        Tenant.query(trx)
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

const updateTenant = async(req, res) => {
    const tenant = await Tenant.query().patchAndFetchById(req.params.id, req.body);

    res.send(tenant);
}

const deleteTenant = async (req, res) => {
    await Tenant.query().deleteById(req.params.id);
   res.send({});
 }

module.exports = {getAllTenants,
                  postTenant,
                  getSingleTenant,
                  updateTenant,
                  deleteTenant
                 }