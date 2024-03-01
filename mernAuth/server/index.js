const express = require('express');
const { PORT } = require('./config');
const { connect } = require('./config/connect');
const router = require('./routes/userRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
connect();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser())
app.use(express.json())
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});