const express = require("express");
const bodyparser = require("body-parser");
const pg =require("pg");
const app = express();
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));

const db =new pg.Client({
    user:"postgres",
    host:"localhost",
    database : "world",
    password:"12345",
    port:"5432",
});

db.connect();








app.get("/",(req,res)=>{
    res.render("lists");
});


app.post("/",async(req,res)=>{
    const e =req.body.email;
    const p =req.body.password;
   try{
    await db.query("insert into login (email,passwords) values ($1,$2)",[e,p]);
    console.log("reurned")
   }
   catch(err){
    console.log(err);
   }
});



app.listen(3000,()=>{
    console.log("started at 3000---------------->>");
});