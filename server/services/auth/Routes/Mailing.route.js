const express = require('express')
const router = express.Router()
const MailingService = require('../helpers/Mailing.service')

router.get('/confirmation/:token', MailingService.confirmEmail)

module.exports = router;