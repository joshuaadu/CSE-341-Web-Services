const mongodb = require("./db");
const { PORT } = require("./utils/config");
const app = require("./app");

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(`Connected to DB and listening on ${PORT}`);
  }
});
