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
        "INSERT INTO EXPENSE_MASTER (\n" +
        "username,gradesSelected,projectsSelected,\n" +
        "userdetails,\n" +
        "submitted,reviewed,approved)\n" +
        "VALUES (\n" +
        "?,?,?,\n" +
        "?\n," +
        "?,?,?);",
    query4:
        "INSERT INTO EXPENSE_DETAILS (\n" +
        "username,userdetails,\n" +
        "dates,codes,description,amount,projectsSelected,notes)\n" +
        " VALUES (\n" +
        " ?,?,\n" +
        " ?,?,?,?,?,?);",
};