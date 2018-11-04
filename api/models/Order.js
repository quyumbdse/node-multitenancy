
const { Model } = require('objection');
const Product = require('../models/Product');

class Order extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'orders';
  }

  static get isTenantSpecific() {
    return true;
  }
  
  static get relationMappings() {
    return {
      products: {
        relation:  Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'orders.id',
           // ManyToMany relation needs the `through` object to describe the join table.
           through: {
            from: 'orders_products.orderId',
            to: 'orders_products.productId'
          },
          to: 'products.id'
        }
      }
    };
  }
} 

module.exports = Order