const { transaction } = require('objection');
const Product = require('../models/Product');

const getAllProducts = async(req, res, next) => {
    const  {tenantId}  = req.query;
    const products = await Product.query()
    //.where(tenantId )
    .context({ 
        onBuild: builder => { 
            if (Product.isTenantSpecific){
                builder.where({tenantId})}
        }
    })
    .skipUndefined()
    
    res.send(products);
}

const createProduct = async (req, res) => {
    const product = req.body;

    // It's a good idea to wrap `insertGraph` call in a transaction since it
    // may create multiple queries.
    const insertedProduct = await transaction(Product.knex(), tranx => {
      return (
        Product.query(tranx)
          // For security reasons, limit the relations that can be inserted.
         // .allowInsert('[pets, children.[pets, movies], movies, parent]')
          .insertGraph(product)
      );
    });

    res.send(insertedProduct);
}

const getSingleProduct = async(req, res) => {
    const person = await Product.query().findById(req.params.id);
    res.send(person);
} 

const updateProduct = async(req, res) => {
    const product = await Product.query().patchAndFetchById(req.params.id, req.body);

    res.send(product);
}

const deleteProduct = async (req, res) => {
    await Product.query().deleteById(req.params.id);
   res.send({});
 }


module.exports = {
                  getAllProducts,
                  createProduct,
                  getSingleProduct,
                  updateProduct,
                  deleteProduct
                }