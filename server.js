const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(
    `App server is running on port ${port} on ${process.env.NODE_ENV} env`
  );
});
