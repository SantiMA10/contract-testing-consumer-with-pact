const { createApp } = require('./app');
const store = require('./store');

const PORT = process.env.PORT || 3000;

store.seedOrder();

const app = createApp();

app.listen(PORT, () => {
  console.log(`orders-api listening on http://localhost:${PORT}`);
});
