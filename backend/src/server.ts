import app from './app';

import database from './database';

database.sync();
console.log('Database running at port 3306!');

app.listen(3001, () => {
  console.log('Server started at port 3001!');
});