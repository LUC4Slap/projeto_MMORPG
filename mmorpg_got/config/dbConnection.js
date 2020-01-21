let mongo = require("mongodb");

let connMongoDb = () => {
  console.log("Entrou na função de conexão");
  let db = new mongo.Db("got", new mongo.Server("localhost", 27017, {}), {});
  return db;
};
module.exports = function(){
  return connMongoDb;
}
