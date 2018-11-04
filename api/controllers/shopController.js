
const { transaction } = require('objection');
const Shop = require('../models/Shop');

const getAllShops = async(req, res, next) => {
    const  {tenantId}  = req.query;
    const shops = await Shop.query()
    //.where(tenantId )
    .context({ 
        onBuild: builder => { 
            if (Shop.isTenantSpecific){
                builder.where({tenantId})
            }
        }
    })
    .skipUndefined()
    //.eager(req.query.eager)
    .eager('products')
    res.send(shops);
}

const createShop = async (req, res) => {
    const shop = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedShop = await transaction(Shop.knex(), trx => {
      return (
        Shop.query(trx)
          // For security reasons, limit the relations that can be inserted.
         // .allowInsert('[pets, children.[pets, movies], movies, parent]')
          .insertGraph(shop)
      );
    });

    res.send(insertedShop);
}

const getSingleShop = async(req, res) => {
    const person = await Shop.query().findById(req.params.id);
    res.send(person);
} 

const updateShop = async(req, res) => {
    const product = await Shop.query().patchAndFetchById(req.params.id, req.body);

    res.send(product);
}

const deleteShop = async (req, res) => {
    await Shop.query().deleteById(req.params.id);
   res.send({});
 }

module.exports = {
                 getAllShops,
                 createShop,
                 getSingleShop,
                 updateShop,
                 deleteShop
                }