const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('teste')
})

router.get('/admin/login', (req, res) => {
    res.status(200).send('login')
})

module.exports = router