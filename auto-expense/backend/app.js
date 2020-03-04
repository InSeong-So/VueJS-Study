const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express()

app.use(require('connect-history-api-fallback')());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', indexRouter);

app.route('/api/expense')
    .get(async (req, res) => {
        const result = {success: true}
        try {
            const json = require('./data')
            result.data = json
        } catch (err) {
            result.success = false
            result.err = err
        }
        res.json(result)
    })

app.listen(8226, () => {
    console.log("Server has been started")
})

module.exports = app;