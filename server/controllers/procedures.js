const express = require('express')
const router = express.Router()
const pageHelper = require('../helpers/page')
const _ = require('lodash')
const CleanCSS = require('clean-css')
const moment = require('moment')

/* global WIKI */

const tmplCreateRegex = /^[0-9]+(,[0-9]+)?$/

/**
 * Procedures
 */
router.get('/procedures', (req, res, next) => {
  res.type('text/plain')
  if (_.includes(WIKI.config.seo.robots, 'noindex')) {
    res.send('User-agent: *\nDisallow: /')
  } else {
    res.status(200).end()
  }
})

module.exports = router
