require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Unable to start', err);
  }
})();
