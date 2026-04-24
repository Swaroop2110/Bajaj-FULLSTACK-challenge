const express = require('express');
const cors = require('cors');
const bfhlRouter = require('./src/routes/bfhl.route');
const { errorLogger } = require('./src/utils/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bfhlRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'HierarchyAPI is running. Use POST /bfhl with hierarchical relationships.'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  errorLogger(err.message || 'Unknown error');
  res.status(500).json({
    error: 'Internal server error. Please check input and try again.'
  });
});

module.exports = app;
