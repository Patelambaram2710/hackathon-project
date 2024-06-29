var express = require('express')
var router = express.Router()
var { Pool } = require('pg');
var bp=require('body-parser')
url=bp.urlencoded({extended:false})
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DietReccomendation',
    password: 'Smit_2824',
    port: 5432,
})
router.get('/', (req, res) => {
    pool.query('SELECT * FROM bodydata', (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        else {
            console.log('send');
            res.send(result.rows);
        }
    })
})
router.post('/create_bodyData', url,(req, res) => {
    var temp=false
    if(req.body.gender=='true'){
        temp=true
    }else{
        temp=false
    }
    pool.query(`insert into bodydata values('${req.cookies.user.email}','${req.body.height}',${req.body.weight},${req.body.age},${temp},CURRENT_DATE)`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
        var json1=req.cookies.user
            json1['height']=req.body.height
            json1['weight']=req.body.weight
            json1['age']=req.body.age
            json1['gender']=temp
            res.cookie('user',json1)
            res.send('Data entered successfully')
        }
    })
})
router.get('/update_bodyData', (req, res) => {
    const { email, height, weight, age, gender } = req.query;
    const query = `
        UPDATE bodydata
        SET 
            height = '${height}', 
            weight = '${weight}', 
            age = '${age}', 
            gender = '${gender}',
            lastupdated=CURRENT_DATE
        WHERE 
            email = '${email}'
    `;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to update data');
        } else {
            res.send('Data updated successfully');
        }
    });
});
router.get('/delete_bodyData', (req, res) => {
    const { email } = req.query;
    const query = `
        DELETE FROM bodydata
        WHERE email = '${email}'
    `;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to delete data');
        } else {
            res.send('Data deleted successfully');
        }
    });
});

module.exports = router