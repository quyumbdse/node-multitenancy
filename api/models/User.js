const { Model } = require('objection');
const Password = require('objection-password')();

class User extends Password(Model) {

  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  static get isTenantSpecific() {
    return true;
  }
  static get jsonSchema () {
    return {
        properties: {
            required: 'tenantId',
            id: {type: 'integer'},
            email: {type: 'string'},
            password: {type: 'string'},
            tenantId: {type: 'string'}
    }
   }
  }

 


   // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: __dirname + '/Tenant',
        join: {
          from: 'users.tanentId',
          to: 'tenants.id'
        }
      }
    };
  }
  
}

module.exports = User