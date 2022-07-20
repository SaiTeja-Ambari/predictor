const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

app.use(cors())
app.use(bodyparser.json())
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database : "rank"
  });

db.connect( (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('mysql connected');
        }
});

//fetch all ranks
app.get('/', (req,res) => {
    var sql = "SELECT * FROM verify";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("fetched all records");
        res.send(result);
      });
});

//store current rank
app.post('/', (req,res) => {
    let name = req.body.name;
    let eamcet = Number(req.body.eamcet);
    let ip = Number(req.body.ip);
    let expectedRank=0;
    var sql = `INSERT INTO verify(name,eamcet,ip,expectedRank) values('${name}', ${eamcet}, ${ip},${expectedRank})`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record posted");
        res.send(result);
      });
});

app.delete('/:id',(req,res) =>{
    let id = req.params.id;
    var sql = `DELETE FROM verify where id=${id}`;
    console.log(id);
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("record deleted");
        res.send(result);
      });
});
app.listen('3000', () =>{
    console.log('server started');
});