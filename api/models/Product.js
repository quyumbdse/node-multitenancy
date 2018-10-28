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
 
}

module.exports = Product