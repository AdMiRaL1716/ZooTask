var connection = require('../config/config.js');

module.exports = function (app) {
  app.get("/animals", function (req, res) {
    connection.query("SELECT * FROM animals", function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json({
        data: results,
      });
    });
  });
  app.get("/animals/:number/slots", function (req, res) {
    connection.query("SELECT slots.id, slots.start_time, slots.end_time, slots.id_animal, slots.date FROM slots LEFT JOIN books ON slots.id=books.id_slot WHERE books.id_slot IS NULL AND slots.date <= CURRENT_DATE - interval -5 day AND DATE_ADD(NOW(), INTERVAL 3 HOUR) < slots.start_time AND slots.start_time >= CAST('09:00:00' AS time) AND slots.end_time <= CAST('18:00:00' AS time) AND slots.id_animal=" + req.params.number + "", function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json({
        data: results,
      });
    });
  });
  app.get("/animals/:number/slots/:time/book", function (req, res) {
    connection.query("SELECT * FROM slots WHERE slots.id_animal=" + req.params.number + " AND slots.id=" + req.params.time + "", function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.json({
        data: results,
      });
    });
  });
  app.post("/animals/:number/slots/:time/book", function (req, res) {
    var book = req.body;
    connection.query("INSERT INTO books SET ?", book, function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      res.send(req.params.number + ' ' + req.params.time);
    });
  });
};