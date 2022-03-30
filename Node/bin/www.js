const app = require('../index');
const syncDb = require('./sync-db');
const port = 3000;

syncDb().then(() => {
  console.log('Sync db');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
