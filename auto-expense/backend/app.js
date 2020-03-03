const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express()

app.use(require('connect-history-api-fallback')());
app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', indexRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

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