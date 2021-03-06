const express = require('express');
const cors = require('cors');
const { application } = require('express');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');

const PORT = process.env.PORT || 5000;

const app = express();

// rate limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // limit each IP to 5 requests per windowMs
});
app.use(limiter);
app.set('trust proxy', 1); // trust first proxy

// routes
app.use('/api', require('./routes'));

// static files
app.use(express.static('public'));

// custom error handler middleware
app.use(errorHandler);

// enable cors
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
