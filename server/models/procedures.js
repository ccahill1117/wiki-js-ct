/* global WIKI */

const Model = require('objection').Model
const moment = require('moment')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const assetHelper = require('../helpers/asset')
const Promise = require('bluebird')

module.exports = class Procedure extends Model {
  static get tableName() { return 'procedures' }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        filename: {type: 'string'},
        pageId: {type: 'integer'},
        createdBy: {type: 'integer'},

        createdAt: {type: 'string'},
        updatedAt: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./pages'),
        join: {
          from: 'procedures.pageId',
          to: 'pages.id'
        }
      },
      procedureSteps: {
        relation: Model.HasManyRelation,
        modelClass: require('./procedureSteps'),
        join: {
          from: 'procedures.id',
          to: 'procedureSteps.procedureId'
        }
      },

    }
  }

}
