const  Model  = require('objection').Model;
const Shop = require('../models/Shop')
class Tenant extends Model {
  static get tableName() {
    return 'tenants';
  }


  static get jsonSchema() {
    return{
      properties: {
        name: {type: 'string'},
      }
    }
    
  }

  static get relationMappings() {

    return {
      shops: {
        relation: Model.HasManyRelation,
        modelClass: Shop,
        join: {
          from: 'tenants.id',
          to: 'shops.tenantId'
        }
      }
    }
  }
}

module.exports = Tenant;
