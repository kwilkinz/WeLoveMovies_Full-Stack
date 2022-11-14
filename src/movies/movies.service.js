const knex = require("../db/connection");

/* Querying movies using ( KNEX )
 - return AlL movies 
*/
 
function list() {
    return knex("movies").select("*");
}

module.exports = {
    list,
}
