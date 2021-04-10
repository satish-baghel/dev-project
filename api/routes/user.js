const express = require('express')
const router = express.Router()
const Controller = require('../controller/user')

router.post('/signup', Controller.add)
router.post('/login', Controller.login)

module.exports = router
