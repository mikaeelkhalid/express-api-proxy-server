const express = require('express');
const cors = require('cors');
const { application } = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// routes
app.use('/api', require('./routes'));

// enable cors
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
