module.exports = {
    // host: '101.235.203.94',
    host: '192.168.0.14',
    user: 'sis_user',
    password: 'sis_user1!',
    port: 3105,
    database: 'SIS_EMPLOYMENT',
    multipleStatements: true,
    combo0:
        "SELECT *\n" +
        "  FROM EXPENSE_COMBO;",
    query1:
        "  SELECT T1.*\n" +
        "    FROM EXPENSE_MASTER T1\n" +
        "   WHERE 1=1\n" +
        "     AND T1.username = ?\n" +
        "     AND T1.userdetails = ?;",
    query2:
        "  SELECT T2.*\n" +
        "    FROM EXPENSE_MASTER T1, EXPENSE_DETAILS T2\n" +
        "   WHERE 1=1\n" +
        "     AND T1.username = ?\n" +
        "     AND T1.userdetails = ?\n" +
        "     AND T2.username = T1.username\n" +
        "     AND T2.userdetails = T1.userdetails\n" +
        "ORDER BY dates ASC;",
    query3:
        "REPLACE INTO EXPENSE_MASTER \n" +
        "VALUES (?, ?, ?, ?, ?, ?, ?);",
    query4:
        "INSERT INTO EXPENSE_DETAILS (\n" +
        "username,userdetails,\n" +
        "dates,codesSelected,description,amount,projectsSelected,notes)\n" +
        " VALUES ?;",
    query5:
        "SELECT T1.*\n" +
        "FROM EXPENSE_MASTER T1\n" +
        "WHERE T1.username = ?;",
    query6:
        "DELETE FROM EXPENSE_DETAILS WHERE username = ? AND userdetails = ?;"
};