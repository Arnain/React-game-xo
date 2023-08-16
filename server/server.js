
var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'gamexo'
});
app.use(cors())
app.post('/insert',jsonParser, function (req, res, next) {
    var win=req.body.win
    connection.query(
        'INSERT INTO tb_status(win) VALUES(?)',[req.body.win],
        function(err, results, fields) {
            if(err){
                res.json({status : 'err',message:err})
                return
            }
            res.json({status :'ok'})
        }
    );
})

app.get('/select', function (req, res, next) {
    connection.query(
    'SELECT * FROM `tb_status`',
    function(err, results, fields) {
        console.log(results);
        res.json({results:results}) 
    }
    );
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})