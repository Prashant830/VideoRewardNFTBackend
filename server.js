const express = require('express');
const app = express();
const loginRout = require('./src/routes/loginRout');
const errorHandler = require('./src/middleware/errorHandler');
const { client } = require('./src/utils/mongoClient'); // Import the flag

app.use(express.json());

app.use('/user', loginRout);

app.use(errorHandler);

const PORT = require('./src/config/config').PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
