const { Model } = require('objection');

class Product extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'products';
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
  static get relationMappings() {
    return {

      shops: {
        relation:  Model.ManyToManyRelation,
        modelClass: `${__dirname}/Shop`,
        join: {
          from: 'products.id',
           // ManyToMany relation needs the `through` object to describe the join table.
           through: {
            from: 'shops_products.productId',
            to: 'shops_products.shopId'
          },
          to: 'shops.id'
        }
      }
    };
  }
}

module.exports = Product