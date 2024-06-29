var express=require('express')
var router=express.Router()
var {Pool}=require('pg');

var bp=require('body-parser');
const { log } = require('console');
var urlencodedParser=bp.urlencoded({extended:false})
const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:'DietReccomendation',
    password:'Smit_2824',
    port:5432,
})
router.get('/',(req,res)=>{
    pool.query('SELECT * FROM User', (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else{
            console.log('send');
            res.send(result.rows);
        }
    })
})

router.post('/create_user',urlencodedParser,(req,res)=>{
    pool.query(`insert into "User" values('${req.body.name}','${req.body.email}','${req.body.password}')`,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.cookie('user',{'email':req.body.email,'password':req.body.password})
            res.send('Data entered successfully')

        }
    })
})
router.get('/update_user',(req,res)=>{
    pool.query(`update "User" set Name='${req.query.name}', email='${req.query.email}',password='${req.query.password}' where email='${req.query.oldEmail}'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send('Data updated successfully')
        }
    })
})
router.get('/delete_user',(req,res)=>{
    pool.query(`delete from "User" where email='${req.query.email}'`,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Data deleted successfully')
        }
    })
})
router.post('/check', urlencodedParser, (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM "User" WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            if (result.rows.length === 0) {
                res.send('Invalid Login');
            } else {
                console.log(email + " " + password);
                console.log(result.rows);
                res.redirect('/')// Example response, adjust as needed
            }
        }
    });
});

module.exports=router