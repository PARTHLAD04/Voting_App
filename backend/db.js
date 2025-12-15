const mongoose = require('mongoose');
const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('MongoDB connected successfully');
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

module.exports = db;
    
