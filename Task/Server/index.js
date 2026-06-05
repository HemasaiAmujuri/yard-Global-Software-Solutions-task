const express = require('express');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/routes');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', routes);


app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});