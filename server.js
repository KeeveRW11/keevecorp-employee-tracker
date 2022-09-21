const db = require('./db/connection');
const express = require('express');
//const inputCheck = require('./utils/inputCheck');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});