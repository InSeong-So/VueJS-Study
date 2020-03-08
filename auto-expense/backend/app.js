const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connect_history_api_fallback = require('connect-history-api-fallback');
const logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql');

const db_config = require('./src/db/config');
const data_config = require('./src/data/date');
const connection = mysql.createConnection(db_config);

const app = express();

app.use(connect_history_api_fallback());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

app.route('/api/dbs')
    .get(async (req, res) => {
        try {
            let combo = {
                grades_txt: [],
                grades_comment: [],
                projects_txt: [],
                projects_comment: [],
                codes: [],
                data_config: []
            };
            let codes = [];
            connection.query(db_config.combo0, (err, rows) => {
                for (let i in rows) {
                    if (rows[i].GUBUN == 'grades') {
                        combo.grades_txt.push(rows[i]['TXT_VAL']);
                        combo.grades_comment.push(rows[i]['TXT_COMMENT']);
                    }
                    if (rows[i].GUBUN == 'projects') {
                        combo.projects_txt.push(rows[i]['TXT_VAL']);
                        combo.projects_comment.push(rows[i]['TXT_COMMENT']);
                    }
                    if (rows[i].GUBUN == 'codes') {
                        codes.push({
                            codes_txt: rows[i]['TXT_VAL'],
                            codes_comment: rows[i]['TXT_COMMENT']
                        })
                    }
                }
                combo.data_config.push(data_config);
                combo.codes = codes;
                res.json(combo);
            });
        } catch (err) {
            res.send(err);
        }
    });

app.route('/api/userCheck')
    .get((req, res) => {
        try {
            connection.query(db_config.query1, [req.query.username, req.query.past_month], (err, rows) => {
                res.json(rows);
            });
        } catch
            (err) {
            res.send(err);
        }
    });

app.route('/api/loadCurrentInfo')
    .get((req, res) => {
        try {
            connection.query(db_config.query0, req.query.username, (err, rows) => {
                res.json(rows);
            });
        } catch (err) {
            res.send(err);
        }
    });

app.route('/api/submitExpense')
    .get((req, res) => {
        console.log(req.query.objectData.userDetails)
        const result = {success: true}
        // try {
        //     const json = require('./data')
        //     result.data = json
        // } catch (err) {
        //     result.success = false
        //     result.err = err
        // }
        // await res.json(result);
    });

app.listen(8226, (req, res) => {
    console.log("Server has been started");
});
