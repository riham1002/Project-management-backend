const pg = require("pg");
const dotenv = require("dotenv");

// load environment variables from the ".env" file
dotenv.config();
console.log("url is: ", process.env.DATABASE_URL);
// grab the URL for our local database
const connectionString = process.env.DATABASE_URL;

console.log("url is: ", connectionString);
// create a pool of available connections
// we can use this to query our database
const db = new pg.Pool({
  connectionString,
});

// export the pool for use elsewhere on our server
module.exports = db;
