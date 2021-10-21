const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

// enable cors
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
