const express = require('express');
const router = express.Router();

const { DB_Connection, queryImagePolygons, insertNewRow } = require('./database/postgres.js');
const { generateStreetViewUrl } = require('./generate_link.js');

router.post('/connect', DB_Connection);

router.post('/populate', generateStreetViewUrl, queryImagePolygons);

router.post('/push', insertNewRow);

module.exports = router;
