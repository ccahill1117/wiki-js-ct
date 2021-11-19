/* global WIKI */

const Model = require('objection').Model
const moment = require('moment')
const path = require('path')
const fs = require('fs-extra')
const _ = require('lodash')
const assetHelper = require('../helpers/asset')
const Promise = require('bluebird')

/**
 * Users model
 */
module.exports = class Procedure extends Model {
  static get tableName() { return 'procedures' }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        filename: {type: 'string'},
        pageId: {type: 'integer'},
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

    }
  }

  async $beforeUpdate(opt, context) {
    await super.$beforeUpdate(opt, context)

    this.updatedAt = moment.utc().toISOString()
  }
  async $beforeInsert(context) {
    await super.$beforeInsert(context)

    this.createdAt = moment.utc().toISOString()
    this.updatedAt = moment.utc().toISOString()
  }

  static async getAsset(assetPath, res) {
    try {
      const fileHash = assetHelper.generateHash(assetPath)
      const cachePath = path.resolve(WIKI.ROOTPATH, WIKI.config.dataPath, `cache/${fileHash}.dat`)
      if (await WIKI.models.assets.getAssetFromCache(assetPath, cachePath, res)) {
        return
      }
      if (await WIKI.models.assets.getAssetFromStorage(assetPath, res)) {
        return
      }
      await WIKI.models.assets.getAssetFromDb(assetPath, fileHash, cachePath, res)
    } catch (err) {
      if (err.code === `ECONNABORTED` || err.code === `EPIPE`) {
        return
      }
      WIKI.logger.error(err)
      res.sendStatus(500)
    }
  }

  static async getAssetFromCache(assetPath, cachePath, res) {
    try {
      await fs.access(cachePath, fs.constants.R_OK)
    } catch (err) {
      return false
    }
    const sendFile = Promise.promisify(res.sendFile, {context: res})
    res.type(path.extname(assetPath))
    await sendFile(cachePath, { dotfiles: 'deny' })
    return true
  }

  static async getAssetFromStorage(assetPath, res) {
    const localLocations = await WIKI.models.storage.getLocalLocations({
      asset: {
        path: assetPath
      }
    })
    for (let location of _.filter(localLocations, location => Boolean(location.path))) {
      const assetExists = await WIKI.models.assets.getAssetFromCache(assetPath, location.path, res)
      if (assetExists) {
        return true
      }
    }
    return false
  }

  static async getAssetFromDb(assetPath, fileHash, cachePath, res) {
    const asset = await WIKI.models.procedures.query()
    if (asset) {
      const assetData = await WIKI.models.knex('assetData').where('id', asset.id).first()
      res.type(asset.ext)
      res.send(assetData.data)
      await fs.outputFile(cachePath, assetData.data)
    } else {
      res.sendStatus(404)
    }
  }

  static async flushTempUploads() {
    return fs.emptyDir(path.resolve(WIKI.ROOTPATH, WIKI.config.dataPath, `uploads`))
  }
}
