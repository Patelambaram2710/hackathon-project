const getDetails = require("../External_Api/rapidapi");
const express = require('express');
const router = express.Router();
var { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DietReccomendation',
    password: 'Smit_2824',
    port: 5432,
});

router.get('/create_dailyDiet', async (req, res) => {
    try {
        const details = await getDetails(req.query.name); // Fetching details asynchronously
        const foodDetails = details.foods[0];
        console.log(foodDetails);

        const { email } = req.query;

        const query = `
            INSERT INTO dailydiet(email, Name, calories, fat, protein, date, carbs, sugar, cholesterol, serving_unit, serving_size)
            VALUES($1, $2, $3, $4, $5, CURRENT_DATE, $6, $7, $8, $9, $10)
        `;

        const values = [
            email,
            foodDetails.food_name,
            foodDetails.nf_calories,
            foodDetails.nf_total_fat,
            foodDetails.nf_protein,
            foodDetails.nf_total_carbohydrate,
            foodDetails.nf_sugars,
            foodDetails.nf_cholesterol,
            foodDetails.serving_unit,
            foodDetails.serving_qty
        ];

        await pool.query(query, values);
        console.log('Data entered successfully');
        res.send('Data entered successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error inserting data');
    }
});

router.get('/update_dailyDiet', async (req, res) => {
    try {
        const details = await getDetails(req.query.name); // Fetching details asynchronously
        const foodDetails = details.foods[0];
        console.log(foodDetails);

        const { email } = req.query;
        const query = `
            UPDATE dailyDiet 
            SET 
                Name = $1, 
                calories = $2, 
                fat = $3, 
                protein = $4, 
                carbs = $5, 
                sugar = $6, 
                cholesterol = $7, 
                serving_unit = $8, 
                serving_size = $9
            WHERE 
                email = $10
        `;

        const values = [
            foodDetails.food_name,
            foodDetails.nf_calories,
            foodDetails.nf_total_fat,
            foodDetails.nf_protein,
            foodDetails.nf_total_carbohydrate,
            foodDetails.nf_sugars,
            foodDetails.nf_cholesterol,
            foodDetails.serving_unit,
            foodDetails.serving_qty,
            email
        ];

        await pool.query(query, values);
        console.log('Data updated successfully');
        res.send('Data updated successfully');
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).send('Error updating data');
    }
});

router.get('/', (req, res) => {
    pool.query('SELECT * FROM dailyDiet', (err, result) => {
        if (err) {
            console.error('Error selecting from dailyDiet:', err);
            res.status(500).send('Error retrieving data');
        } else {
            console.log('Data retrieved successfully');
            res.send(result.rows);
        }
    });
});

router.get('/delete_dailyDiet', async (req, res) => {
    const { email } = req.query;

    const query = `
        DELETE FROM dailyDiet 
        WHERE 
            email = $1
    `;
    
    try {
        await pool.query(query, [email]);
        console.log('Data deleted successfully');
        res.send('Data deleted successfully');
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).send('Error deleting data');
    }
});

module.exports = router;
