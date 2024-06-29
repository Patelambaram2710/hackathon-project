const express = require('express');
const path = require('path');
const app = express();
var cp=require('cookie-parser')
app.use(cp())
// Serve static files from the 'front' directory
const staticPath = path.join(__dirname, '../../front/temp');
app.use(express.static(staticPath));

// Routes for your modules
const User = require('../Database/CRUD_user.js');
const userBodyData = require('../Database/CRUD_bodyData.js');
const dailyDiet = require('../Database/CRUD_dailyDiet.js');

app.use('/user', User);
app.use('/bodyData', userBodyData);
app.use('/dailyDiet', dailyDiet);
// Start the server
const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
