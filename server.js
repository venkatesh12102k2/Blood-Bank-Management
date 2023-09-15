const express = require('express');

const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path')
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use('/api/v1/test', require('./routes/testRoute'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));


//Static Folder
app.use(express.static(path.join(__dirname, './client/build')));

//Static Routes
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const PORT = process.env.PORT || 4147;

app.listen(PORT, () => {
    console.log(`Node Server is Running in ${process.env.DEV_MODE} ON Port ${process.env.PORT || 4147}`.bgBlue.white);
});