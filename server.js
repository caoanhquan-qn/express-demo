const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB)
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(
    `App server is running on port ${port} on ${process.env.NODE_ENV} env`
  );
});
