module.exports = {
    // host: '101.235.203.94',
    host: '192.168.0.14',
    user: 'sis_user',
    password: 'sis_user1!',
    port: 3105,
    database: 'SIS_EMPLOYMENT',
    combo0 :
        "SELECT *\n" +
        "  FROM EXPENSE_COMBO",
    query0 :
    "  SELECT T1.*\n" +
    "    FROM EXPENSE_MASTER T1, EXPENSE_DETAILS T2\n" +
    "   WHERE 1=1\n" +
    "     AND T1.USERNAME = ?\n" +
    "     AND T2.USERNAME = T1.USERNAME\n" +
    "     AND T2.USERDETAILS = T1.USERDETAILS\n" +
    "ORDER BY USERdETAILS DESC\n" +
    "   LIMIT 1",
    query1 :
    "SELECT T1.*\n" +
    "  FROM EXPENSE_MASTER T1, EXPENSE_DETAILS T2\n" +
    " WHERE 1=1\n" +
    "   AND T1.USERNAME = ?\n" +
    "   AND T1.USERDETAILS = ?\n" +
    "   AND T2.USERNAME = T1.USERNAME\n" +
    "   AND T2.USERDETAILS = T1.USERDETAILS",
    query2 :
    "  SELECT T2.*\n" +
    "    FROM EXPENSE_MASTER T1, EXPENSE_DETAILS T2\n" +
    "   WHERE 1=1\n" +
    "     AND T1.USERNAME = ?\n" +
    "     AND T1.USERDETAILS = ?\n" +
    "     AND T2.USERNAME = T1.USERNAME\n" +
    "     AND T2.USERDETAILS = T1.USERDETAILS\n" +
    "ORDER BY DATES ASC",
};