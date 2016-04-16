var cors = require('cors'),
    express = require('express'),
    populationRouter = express.Router(),        
    mysql = require('mysql');

var connection = mysql.createConnection({
 connectionLimit : 1, //important 
'host' : '10.0.0.7',
'port' : '3306',
'user' : 'root',
'password' : 'Semrina77',
'database' : 'd3nodeexpressmysql'
});
 
populationRouter.all('*', cors());

var getPopulations = function(){
    
    populationRouter.route('/')    
    .get(function(req,res){
        connection.query('SELECT * from population', req.params.id, function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            }
            
            res.send(rows);
        }); 
    });
    
    return populationRouter;
        
};


module.exports = {
  getPopulations: getPopulations
};