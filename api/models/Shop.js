const { Model } = require('objection');
const Product = require('../models/Product');

class Shop extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'shops';
  }

  static get isTenantSpecific() {
    return true;
  }
  static get jsonSchema () {
    return {
        properties: {
            required: 'tenantId',
            id: {type: 'integer'},
            name: {type: 'string'},
            tenantId: {type: 'string'}
    }
   }
  }

 


   // This object defines the relations to other models.
  static get relationMappings() {
    return {
      products: {
        relation:  Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'shops.id',
           // ManyToMany relation needs the `through` object to describe the join table.
           through: {
            from: 'shops_products.shopId',
            to: 'shops_products.productId'
          },
          to: 'products.id'
        }
      }
    };
  }
  
}

module.exports = Shop