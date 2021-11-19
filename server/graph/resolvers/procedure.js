const _ = require('lodash')
const sanitize = require('sanitize-filename')
const graphHelper = require('../../helpers/graph')
const assetHelper = require('../../helpers/procedure')

/* global WIKI */

module.exports = {
  Query: {
    async procedures() { return {} }
  },
  Mutation: {
    async procedures() { return {} }
  },
  ProcedureQuery: {
    async list (obj, args, context) {
      const procedures = await WIKI.models.procedures.query()
      return procedures
    },

  },
  ProcedureMutation: {
    /**
     * Create New Asset Folder
     */
    async createProcedure(obj, args, context) {
      try {
        const folderSlug = sanitize(args.slug).toLowerCase()
        const parentFolderId = args.parentFolderId === 0 ? null : args.parentFolderId
        const result = await WIKI.models.assetFolders.query().where({
          parentId: parentFolderId,
          slug: folderSlug
        }).first()
        if (!result) {
          await WIKI.models.assetFolders.query().insert({
            slug: folderSlug,
            name: folderSlug,
            parentId: parentFolderId
          })
          return {
            responseResult: graphHelper.generateSuccess('procedure has been created successfully.')
          }
        } else {
          throw new WIKI.Error.AssetFolderExists()
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },

  }

}
