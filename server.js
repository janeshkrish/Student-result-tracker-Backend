require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const connectdb = require('./config/db');

const app = express();
connectdb();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('./api/students',studentRoutes);

app.get('/',(req,res) => {
    res.json({
        message : 'Student Result Tracker',
        version : '1.0.0',
        endpoints : {
            auth : './api/auth',
            students : './api/students'
        }
    })
});

app.use((req,res) => {
    res.status(404).json({
        message : `Route ${req.method} ${req.url} not found`
    })
})

app.use((err,req,res,next)=>{
    console.error('Stack',err.stack);
    res.status(err.status || 500).json({
        message : err.message || 'Something went wrong in server side',
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment : ${process.env.NODE_ENV} || development`); 
});
