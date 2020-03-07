const ExcelJS = require('exceljs')

let workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('expense.xlsx')
    .then(function () {
        let worksheet = workbook.getWorksheet('excel_template');

        worksheet.getRow(4).getCell(1).value = "Period : 2020.02.01 ~ 2020.02.29";
        worksheet.getRow(43).getCell(3).value = "소인성";
        worksheet.getRow(43).getCell(5).value = "2020.03.06";
        worksheet.getRow(44).getCell(3).value = "이준섭";
        worksheet.getRow(45).getCell(3).value = "남해경";

        worksheet.eachRow({includeEmpty: true}, function (row, rowNumber) {
            // console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
            if(rowNumber >= 7 && rowNumber <= 40){
                worksheet.getRow(rowNumber).getCell(1).value = "2020-01-08T00:00:00.000Z";
                worksheet.getRow(rowNumber).getCell(2).value = "TRANS";
                worksheet.getRow(rowNumber).getCell(3).value = "야근 교통비(24:30 퇴근)";
                worksheet.getRow(rowNumber).getCell(4).value = 32100;
                worksheet.getRow(rowNumber).getCell(5).value = "hunel BU 공통";
                worksheet.getRow(rowNumber).getCell(6).value = "정자-가산\n개인카드사용";
            }

            // row.commit();
            return workbook.xlsx.writeFile('new.xlsx');
        });
    });