const ExcelJS = require('exceljs');
const path = require('path');

module.exports = {
    excelWrite: async function (data) {
        try {
            let datafile = path.join(__dirname, '/expense.xlsx');
            let workbook = new ExcelJS.Workbook();
            console.log(datafile);
            await workbook.xlsx.readFile(datafile)
                .then(function () {
                    let worksheet = workbook.getWorksheet('excel_template');

                    worksheet.getRow(4).getCell(1).value = "Period : " + data.period;
                    worksheet.getRow(43).getCell(3).value = data.submitted;
                    worksheet.getRow(43).getCell(5).value = data.writeDay;
                    worksheet.getRow(44).getCell(3).value = data.reviewed;
                    worksheet.getRow(45).getCell(3).value = data.approved;

                    let count = 0;

                    worksheet.eachRow({includeEmpty: true}, function (row, rowNumber) {
                        if (rowNumber >= 7 && rowNumber <= 40) {
                            if (data.descriptions[count]) {
                                // console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
                                worksheet.getRow(rowNumber).getCell(1).value = "2020-01-08";
                                worksheet.getRow(rowNumber).getCell(2).value = data.descriptions[count][3];
                                worksheet.getRow(rowNumber).getCell(3).value = data.descriptions[count][4];
                                worksheet.getRow(rowNumber).getCell(4).value = data.descriptions[count][5] * 1;
                                worksheet.getRow(rowNumber).getCell(5).value = data.descriptions[count][6];
                                worksheet.getRow(rowNumber).getCell(6).value = data.descriptions[count][7];
                                row.commit();
                                count++;
                                return true;
                            }
                        }
                    });
                    return workbook.xlsx.writeFile(data.filename + '.xlsx');
                });
        } catch (err) {
            console.error(err);
        }
    }
}