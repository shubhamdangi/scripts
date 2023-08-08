const XLSX = require("xlsx");
const fs = require("fs");

// Load the Excel file
const workbook = XLSX.readFile("path/to/your/excel/file.xlsx");

// Assuming the data is in the first sheet, you can access it like this
const sheetName = workbook.SheetNames[0];
const excelSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Faced an issue where i was getting the time value as random decimals, later found that excel stores time values as fractions of a day, where 1 represents 24 hours
// So below function to convert excel time to the desired format (HH:mm AM/PM)
function convertExcelTimeTo12HourFormat(excelTime) {
  const hours = Math.floor(excelTime * 24);
  const minutes = Math.round((excelTime * 24 - hours) * 60);
  const period = hours >= 12 ? "PM" : "AM";
  const hourIn12HourFormat = hours % 12 || 12;
  return `${hourIn12HourFormat.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
}

// Create a new array of objects with the desired format
const TOURNAMENT_TABLE_DATA = excelSheetData.map((data) => ({
  tournamentTime: convertExcelTimeTo12HourFormat(data["Time"]),
  tournamentName: data["Tournament Name"],
  prizePool: data["Prize Pool"],
}));

// Convert the data to a string format
const fileContent = `const TOURNAMENT_TABLE_DATA = ${JSON.stringify(
  TOURNAMENT_TABLE_DATA,
  null,
  2
)};`;

// Write the data to jsonResult.js file
fs.writeFile("jsonResult.js", fileContent, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("Done!\nData has been written to jsonResult.js");
  }
});

