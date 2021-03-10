const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route for adding providers to a client's favorites
 */
router.post('/', (req, res) => {
  console.log(req.body)
});

module.exports = router;
