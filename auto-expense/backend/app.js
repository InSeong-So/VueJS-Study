const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connect_history_api_fallback = require('connect-history-api-fallback');
const logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql');

const db_config = require('./src/db/config');
const connection = mysql.createConnection(db_config);

const app = express();

app.use(connect_history_api_fallback());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

let combo = {
    grades_txt: [],
    grades_comment: [],
    projects_txt: [],
    projects_comment: [],
    codes_txt: [],
    codes_comment: []
}

app.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.route('/api/dbs')
    .get(async (req, res) => {
        try {
            console.log("진입")
            connection.query('SELECT * FROM EXPENSE_COMBO', (err, rows, field) => {
                for (let i in rows) {
                    if (rows[i].GUBUN == 'grades') {
                        combo.grades_txt.push(rows[i]['TXT_VAL']);
                        // combo.grades_comment.push(rows[i]['TXT_COMMENT']);
                    }
                    if (rows[i].GUBUN == 'projects') {
                        combo.projects_txt.push(rows[i]['TXT_VAL']);
                        // combo.projects_comment.push(rows[i]['TXT_COMMENT']);
                    }
                    if (rows[i].GUBUN == 'codes') {
                        combo.codes_txt.push(rows[i]['TXT_VAL']);
                        // combo.codes_comment.push(rows[i]['TXT_COMMENT']);
                    }
                }
                res.json(combo);
            });
        } catch (err) {
            res.send(err);
        } finally {
            console.log("종료")
            connection.end();
        }
    });

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
        await res.json(result);
    });

app.listen(8226, (req, res) => {
    console.log("Server has been started");
});
