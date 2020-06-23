const express = require('express');
const mysql=require('mysql');
const app= express();
const bodyParser = require('body-parser');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'students'
});
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql connected"); 
})
app.get('/createdb',(req,res)=>{
    let sql='select * from details';
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result)
        res.send(result);
    });
})
app.post('/createdb',(req,res)=>{
    var name=req.body.Name;
    var age=req.body.Age;
    var std=req.body.Std;
    console.log(name+age+std);
    let sql=`insert into details values('${name}','${age}','${std}')`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
       
        res.send("Inserted succesfuly");
    });
})
app.delete('/createdb',(req,res)=>{
  
    let sql="delete from details where Name='nandish'";
    db.query(sql,(err,result)=>{
        if(err) throw err;
       
        res.send("Deleted Successfully");
    });
})
app.put('/createdb',(req,res)=>{
  
    let sql="update  details set Name='nandu' where age=80";
    db.query(sql,(err,result)=>{
        if(err) throw err;
       
        res.send("Updated   Successfully");
    });
})
app.listen('5000',()=>{
   console.log('server started at 3000'); 
});