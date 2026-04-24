const app = require('./app');
const { PORT } = require('./src/config/env');

app.listen(PORT, () => {
  console.log(`HierarchyAPI server listening on port ${PORT}`);
});
