var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbContext = mongoose.connect('mongodb://localhost:27017/test');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')
var cronOption = {
    origin : "http://localhost:4200"
}

app.use(cors(cronOption))

app.get('/', function(req,res){
res.json({msg:"test"})
});

require('./routes/route')(app);


app.listen(3000, function () {
    console.log('server is running on 3000')
})