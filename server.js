const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
