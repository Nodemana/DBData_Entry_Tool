const express = require('express');
const router = express.Router();

const { DB_Connection } = require('./database/postgres.js');

router.post('/connect', DB_Connection);

router.post('/populate', generate_link);

router.post('/push', DB_Push)

module.exports = router;
