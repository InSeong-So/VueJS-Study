const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connect_history_api_fallback = require('connect-history-api-fallback');
const logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql');

const db_config = require('./src/db/config');
const data_config = require('./src/data/date');
const ex_config = require('./src/ex/excelWrite');
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

app.route('/api/loadCurrentInfo')
    .post((req, res) => {
        let result = {success: true}
        try {
            const username = req.body.username;
            const ud = req.body.ud;

            const sql1 = db_config.query1;
            const sql1s = mysql.format(sql1, [username, ud]);

            const sql2 = db_config.query2;
            const sql2s = mysql.format(sql2, [username, ud]);

            connection.query(sql1s + sql2s, (err, rows) => {
                result.data1 = rows[0];
                result.data2 = rows[1];
                res.send(result);
            });
        } catch (err) {
            res.send(err);
        }
    });

app.route('/api/submitExpense')
    .post((req, res) => {
        console.log(req.body.objectData)
        const username = req.body.objectData.username;
        const grade = req.body.objectData.gradesSelected;
        const project = req.body.objectData.projectsSelected;
        const ud = req.body.objectData.data_config.past_month;
        const submitted = req.body.objectData.submitted;
        const reviewed = req.body.objectData.reviewed;
        const approved = req.body.objectData.approved;
        const userDetails = req.body.objectData.userDetails;
        const dbSave = req.body.objectData.save_info;
        // DB에 저장
        // if (dbSave) {
        //     connection.query(db_config.query3, [username, grade, project, ud, submitted, reviewed, approved], (err, result) => {
        //
        //     });
        //
        //     userDetails.forEach((item, index) => {
        //         connection.query(db_config.query4, [username, ud, item.dates, item.codesSelected, item.description, item.amount, item.projectsSelected, item.notes], (err, result) => {
        //
        //         })
        //         console.log(item);
        //         console.log(index);
        //     })
        //
        // } else { // 엑셀에 바로 저장
        //
        // }

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

app.route('/download')
    .get((req, res) => {
        const file = `${__dirname}/src/ex/expense.xlsx`;
        res.download(file);
    });

app.listen(8226, (req, res) => {
    console.log("Server has been started");
});
