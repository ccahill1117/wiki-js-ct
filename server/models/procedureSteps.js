/* global WIKI */

const Model = require('objection').Model
const moment = require('moment')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const assetHelper = require('../helpers/asset')
const Promise = require('bluebird')

module.exports = class ProcedureSteps extends Model {
  static get tableName() { return 'procedureSteps' }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        stepNumber: {type: 'integer'},
        instructions: {type: 'string'},
        procedureId: {type: 'integer'},
        createdBy: {type: 'integer'},
        completedBy: {type: 'integer'},

        createdAt: {type: 'string'},
        updatedAt: {type: 'string'}
      }
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./procedures'),
        join: {
          from: 'procedures.pageId',
          to: 'pages.id'
        }
      },
    }
  }
}
