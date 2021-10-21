const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = require('url');
const apicache = require('apicache');

// env variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// cache
const cache = apicache.middleware;

router.get('/', cache('5 minutes'), async (req, res) => {
  try {
    //console.log(url.parse(req.url, true).query);

    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const response = await axios.get(`${API_BASE_URL}?${params}`);
    const data = response.data;

    // log the request
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Request: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
