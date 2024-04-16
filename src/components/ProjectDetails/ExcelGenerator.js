// ExcelGenerator.js
import ExcelJS from 'exceljs';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const generateSummary = async (projectDetails) => {
    let suggestedRCVTotal = 0;

    // Iterate through each item in spreadsheetData
    projectDetails.project.spreadsheetData.forEach(item => {
        // Parse RCV High, RCV Low, and Quantity from the current item
        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const quantity = parseFloat(item['Quantity']);
        
        // Calculate RCV (ext) for the current item using the provided formula
        const RCVExt = (RCVHigh + RCVLow) / 2 * quantity;
        
        // Add RCV (ext) to total
        suggestedRCVTotal += RCVExt;
    });

    // Calculate total RCV tax
    const totalRCVTax = suggestedRCVTotal * (projectDetails.project.salesTax / 100);

    // Calculate RCV with tax total
    const rcvWithTaxTotal = suggestedRCVTotal + totalRCVTax;

    let suggestedACVTotal = 0; // Initialize total ACV

    // Iterate over each item in the spreadsheet data
    projectDetails.project.spreadsheetData.forEach(item => {
        // Parse RCV High, RCV Low, Quantity, and Depreciation from the current item
        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const quantity = parseFloat(item['Quantity']);
        const depreciation = parseFloat(item['Depreciation']);
        
        // Calculate ACV for the current item using the provided formula
        const ACV = ((RCVHigh + RCVLow) / 2 * quantity);
        // Add ACV to total
        suggestedACVTotal += ACV;
    });

    // Calculate total ACV tax by multiplying total ACV by the sales tax rate
    const totalACVTax = suggestedACVTotal * (projectDetails.project.salesTax / 100);

    // Calculate ACV with tax total by adding total ACV and total ACV tax
    const acvWithTaxTotal = suggestedACVTotal + totalACVTax;

    let totalDepreciation = 0 + totalRCVTax; // Initialize total depreciation

    // Iterate over each item in the spreadsheet data
    projectDetails.project.spreadsheetData.forEach(item => {
        // Parse RCV High, Quantity, and Depreciation from the current item
        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const quantity = parseFloat(item['Quantity']);
        const depreciation = parseFloat(item['Depreciation']);
        
        // Calculate depreciation amount for the current item using the provided formula
        const rcvTotal = ((RCVHigh + RCVLow) / 2 * quantity);
        let depreciationFactor = (depreciation * 100) * projectDetails.project.depreciationRange;
        depreciationFactor = Math.min(depreciationFactor, 100);
        const depreciationAmount = rcvTotal * (depreciationFactor / 100);

        
        // Add depreciation amount to total
        totalDepreciation += depreciationAmount;
    });

    const headers = {
        'ngrok-skip-browser-warning': '69420'
    };

// Fetch the Excel template file
const response = await axios.get(`${API_URL}/npc/get-excel`, {
            headers: headers,
            responseType: 'arraybuffer' // Specify response type as array buffer
        });

console.log('response: ', response);

const arrayBuffer = response.data;
console.log(arrayBuffer);

// Create a new workbook
const workbook = new ExcelJS.Workbook();

console.log('workbook', workbook);

await workbook.xlsx.load(arrayBuffer);
console.log('workbook2', workbook);
console.log('2');

// Remove the second and third worksheets
workbook.removeWorksheet(4);
workbook.removeWorksheet(3);
workbook.removeWorksheet(2); // After the second one is removed, the next one will take its position as index 2


// Log the number of worksheets in the workbook
console.log("Number of Worksheets:", workbook.worksheets.length);

// Get the first worksheet
const worksheet = workbook.worksheets[0];


          // Get the cell E18 and set its value to suggestedRCVTotal
    const cellD18 = worksheet.getCell('D18');
    cellD18.value = suggestedRCVTotal;

    // Get the cell E19 and set its value to totalRCVTax
    const cellD19 = worksheet.getCell('D19');
    cellD19.value = totalRCVTax;

    const cellI21 = worksheet.getCell('I21');
    cellI21.value = totalDepreciation;

    

    // Get the cell reference for any cell within the merged range, for example D4
const cellD4 = worksheet.getCell('D4');

// Set the value for the cell D4, which will apply to the entire merged range D4:F5
cellD4.value = projectDetails.project.claimNumber;
console.log(projectDetails.project.claimNumber)

// Get the cell reference for any cell within the merged range, for example D6
const cellD6 = worksheet.getCell('D6');

// Set the value for the cell D6, which will apply to the entire merged range D6:F6
cellD6.value = projectDetails.project.carrier;

// Get the cell reference for any cell within the merged range, for example D8
const cellD8 = worksheet.getCell('D8');

// Parse the dateOfLoss and format it to mm/dd/yyyy
const formattedDateOfLoss = new Date(projectDetails.project.dateOfLoss).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
});

// Set the value for the cell D8, which will apply to the entire merged range D8:F8
cellD8.value = formattedDateOfLoss;

// Get the cell reference for any cell within the merged range, for example D10
const cellD10 = worksheet.getCell('D10');

// Set the value for the cell D10, which will apply to the entire merged range D10:F10
cellD10.value = projectDetails.project.lossType;

// Concatenate insuredFirstName and insuredLastName
const insuredFullName = projectDetails.project.insuredFirstName + ' ' + projectDetails.project.insuredLastName;

// Get the cell reference for any cell within the merged range, for example D12
const cellD12 = worksheet.getCell('D12');

// Set the value for the cell D12, which will apply to the entire merged range D12:F12
cellD12.value = insuredFullName;

// Get the cell reference for any cell within the merged range, for example D14
const cellD14 = worksheet.getCell('D14');

// Concatenate the address attributes to create a formatted address string
const fullAddress = `${projectDetails.project.lossAddress}, ${projectDetails.project.lossCity}, ${projectDetails.project.lossState} ${projectDetails.project.lossPostalCode}`;

// Set the value for the cell D14, which will apply to the entire merged range D14:F14
cellD14.value = fullAddress;

// Concatenate adjusterFirstName and adjusterLastName
const adjusterFullName = projectDetails.project.adjusterFirstName + ' ' + projectDetails.project.adjusterLastName;

// Get the cell reference for cell H4
const cellH4 = worksheet.getCell('H4');

// Set the value of cell H4 to the concatenated full name
cellH4.value = adjusterFullName;

// Get the cell reference for cell H5
const cellH5 = worksheet.getCell('H5');

// Set the value of cell H5 to the adjuster's phone number
cellH5.value = projectDetails.project.adjusterPhone;

// Get the cell reference for cell H6
const cellH6 = worksheet.getCell('H6');

// Set the value of cell H6 to the adjuster's email address
cellH6.value = projectDetails.project.adjusterEmail;

// Get the cell reference for cell H9
const cellH9 = worksheet.getCell('H9');

// Set the value of cell H9 to the sales tax rate
cellH9.value = projectDetails.project.salesTax;

let depreciationRange;
switch (projectDetails.project.depreciationRange) {
  case 2:
    depreciationRange = "0 - 3 years";
    break;
  case 5:
    depreciationRange = '4 - 6 years';
    break;
  case 8:
    depreciationRange = '7 - 9 years';
    break;
  case 10:
    depreciationRange = '10+ years';
    break;
  default:
    depreciationRange = 'N/A';
    break;
}

// Get the cell reference for cell H10
const cellH10 = worksheet.getCell('H10');

// Set the value of cell H10 to the depreciation range
cellH10.value = depreciationRange;

const modifiedExcelData = await workbook.xlsx.writeBuffer();

console.log('mm', modifiedExcelData);

return { modifiedExcelData }; 
    }

    const generateDetail = async (projectDetails) => {
        const headers = {
            'ngrok-skip-browser-warning': '69420'
        };
    
        // Fetch the Excel template file
        const response = await axios.get(`${API_URL}/npc/get-excel`, {
            headers: headers,
            responseType: 'arraybuffer' // Specify response type as array buffer
        });
    
        console.log('response: ', response);
    
        const arrayBuffer = response.data;
        console.log(arrayBuffer);
    
        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
    
        console.log('workbook', workbook);
    
        await workbook.xlsx.load(arrayBuffer);
        console.log('workbook2', workbook);
        console.log('2');
        
        workbook.removeWorksheet(4);
        workbook.removeWorksheet(3);
        workbook.removeWorksheet(1);
    
        // Get the second worksheet
        const worksheet = workbook.getWorksheet(2); // Change 2 to the appropriate index of the second worksheet
    
        // Iterate over projectDetails and replace cells starting from A13
        projectDetails.project.spreadsheetData.forEach((item, index) => {
            const rowNumber = index + 13; // Start from row 13
    
            // Set values for each cell in the row
            worksheet.getCell(`A${rowNumber}`).value = index + 1; // Auto-incrementing Line number
            worksheet.getCell(`B${rowNumber}`).value = item.Room;
            worksheet.getCell(`C${rowNumber}`).value = item.Item;
            worksheet.getCell(`D${rowNumber}`).value = item.Description;
            worksheet.getCell(`E${rowNumber}`).value = item.Quantity;
    
            const RCVHigh = parseFloat(item['RCV High']);
            const RCVLow = parseFloat(item['RCV Low']);
            const RCVAvg = (RCVHigh + RCVLow) / 2;
            const RCVExt = RCVAvg * item.Quantity;
            const salesTaxAmount = (projectDetails.project.salesTax / 100) * RCVExt;
            const RCVTotal = RCVExt + salesTaxAmount;
            let depreciationFactor = (item.Depreciation * 100) * projectDetails.project.depreciationRange;
            depreciationFactor = Math.min(depreciationFactor, 100);
            const depreciationAmount = RCVExt * (depreciationFactor / 100);
            const ACVTotal = (RCVExt - depreciationAmount);
    
            worksheet.getCell(`F${rowNumber}`).value = RCVHigh.toFixed(2); // RCV High
            worksheet.getCell(`G${rowNumber}`).value = RCVLow.toFixed(2); // RCV Low
            worksheet.getCell(`H${rowNumber}`).value = RCVAvg.toFixed(2); // RCV Avg (ea)
            worksheet.getCell(`I${rowNumber}`).value = parseFloat(RCVExt.toFixed(2)); // RCV (ext) as integer

            worksheet.getCell(`J${rowNumber}`).value = `${projectDetails.project.salesTax}%`; // Sales Tax
            worksheet.getCell(`K${rowNumber}`).value = parseFloat(salesTaxAmount.toFixed(2)); // Sales Tax Amount as integer
            worksheet.getCell(`L${rowNumber}`).value = RCVTotal.toFixed(2); // RCV Total
            worksheet.getCell(`M${rowNumber}`).value = item.Depreciation; // Depreciation
            worksheet.getCell(`N${rowNumber}`).value = projectDetails.project.depreciationRange; // Dep Years
            worksheet.getCell(`O${rowNumber}`).value = parseFloat((depreciationAmount + salesTaxAmount).toFixed(2)); // Dep Amount
            worksheet.getCell(`P${rowNumber}`).value = ACVTotal.toFixed(2); // ACV Total
            worksheet.getCell(`Q${rowNumber}`).value = item.Subclass;
            worksheet.getCell(`R${rowNumber}`).value = item.Class;
        });
           
    
        const modifiedExcelData2 = await workbook.xlsx.writeBuffer();
    
        console.log('mm', modifiedExcelData2);
    
        return { modifiedExcelData2 };
    };

const generateRawData = async (projectDetails) => {
    const headers = {
        'ngrok-skip-browser-warning': '69420'
    };

    try {
        // Fetch the Excel template file
        const response = await axios.get(`${API_URL}/npc/get-excel`, {
            headers: headers,
            responseType: 'arraybuffer' // Specify response type as array buffer
        });

        const arrayBuffer = response.data;

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();

        // Load the workbook from the array buffer
        await workbook.xlsx.load(arrayBuffer);
        
        workbook.removeWorksheet(4);
        workbook.removeWorksheet(2);
workbook.removeWorksheet(1);

        // Get the third worksheet
        const worksheet = workbook.getWorksheet(3);
        console.log('pjd ', projectDetails);
        // Iterate over projectDetails and replace cells starting from A2
        projectDetails.project.spreadsheetData.forEach((item, index) => {
            const rowNumber = index + 2; // Start from row 2

            // Set values for each cell in the row
            worksheet.getCell(`A${rowNumber}`).value = index + 1; // Auto-incrementing Line number
            worksheet.getCell(`B${rowNumber}`).value = item.Room;
            worksheet.getCell(`C${rowNumber}`).value = item.Item;
            worksheet.getCell(`D${rowNumber}`).value = item.Description;
            worksheet.getCell(`E${rowNumber}`).value = item.Quantity;

            const RCVHigh = parseFloat(item['RCV High']);
            const RCVLow = parseFloat(item['RCV Low']);
            const RCVAvg = (RCVHigh + RCVLow) / 2;
            const RCVExt = RCVAvg * item.Quantity;
            const salesTaxAmount = projectDetails.project.salesTax / 100 * RCVExt;
            const RCVTotal = RCVExt + salesTaxAmount;
            let depreciationFactor = (item.Depreciation * 100) * projectDetails.project.depreciationRange;
            depreciationFactor = Math.min(depreciationFactor, 100);
            const depreciationAmount = RCVExt * (depreciationFactor / 100);
            const ACVTotal = RCVExt - depreciationAmount;

            worksheet.getCell(`F${rowNumber}`).value = `$${RCVHigh.toFixed(2)}`; // RCV High
            worksheet.getCell(`G${rowNumber}`).value = `$${RCVLow.toFixed(2)}`; // RCV Low
            worksheet.getCell(`H${rowNumber}`).value = `$${RCVAvg.toFixed(2)}`; // RCV Avg (ea)
            worksheet.getCell(`I${rowNumber}`).value = `$${RCVExt.toFixed(2)}`; // RCV (ext)
            worksheet.getCell(`J${rowNumber}`).value = `${projectDetails.project.salesTax}%`; // Sales Tax
            worksheet.getCell(`K${rowNumber}`).value = `$${salesTaxAmount.toFixed(2)}`; // Sales Tax Amount
            worksheet.getCell(`L${rowNumber}`).value = `$${RCVTotal.toFixed(2)}`; // RCV Total
            worksheet.getCell(`M${rowNumber}`).value = item.Depreciation * 100;
            worksheet.getCell(`N${rowNumber}`).value = projectDetails.project.depreciationRange; // Dep Years
            worksheet.getCell(`O${rowNumber}`).value = `$${(depreciationAmount + salesTaxAmount).toFixed(2)}`; // Dep Amount
            worksheet.getCell(`P${rowNumber}`).value = `$${ACVTotal.toFixed(2)}`; // ACV Total
            worksheet.getCell(`Q${rowNumber}`).value = item.Subclass;
            worksheet.getCell(`R${rowNumber}`).value = item.Class;
        });

        // Write the modified Excel data to a buffer
        const modifiedExcelData = await workbook.xlsx.writeBuffer();

        // Return the modified Excel data
        return { modifiedExcelData };
    } catch (error) {
        console.error('Error generating raw data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

const generateAll = async (projectDetails) => {
    try {
        const headers = {
            'ngrok-skip-browser-warning': '69420'
        };

        // Fetch the Excel template file
        const response = await axios.get(`${API_URL}/npc/get-excel`, {
            headers: headers,
            responseType: 'arraybuffer'
        });

        const arrayBuffer = response.data;

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);

        // Generate Summary
        const summaryWorksheet = workbook.getWorksheet(1);
        await generateSummaryWorksheet(summaryWorksheet, projectDetails);

        // Generate Detail
        const detailWorksheet = workbook.getWorksheet(2);
        await generateDetailWorksheet(detailWorksheet, projectDetails);

        // Generate Raw Data
        const rawDataWorksheet = workbook.getWorksheet(3);
        await generateRawDataWorksheet(rawDataWorksheet, projectDetails);

        // Write the modified Excel data to a buffer
        const modifiedExcelData = await workbook.xlsx.writeBuffer();

        return { modifiedExcelData };
    } catch (error) {
        console.error('Error generating all data:', error);
        throw error;
    }
};

const generateSummaryWorksheet = async (worksheet, projectDetails) => {
    let suggestedRCVTotal = 0;

    // Iterate through each item in spreadsheetData
    projectDetails.project.spreadsheetData.forEach(item => {
        // Parse RCV High, RCV Low, and Quantity from the current item
        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const quantity = parseFloat(item['Quantity']);
        
        // Calculate RCV (ext) for the current item using the provided formula
        const RCVExt = (RCVHigh + RCVLow) / 2 * quantity;
        
        // Add RCV (ext) to total
        suggestedRCVTotal += RCVExt;
    });

    // Calculate total RCV tax
    const totalRCVTax = suggestedRCVTotal * (projectDetails.project.salesTax / 100);

    // Calculate RCV with tax total
    const rcvWithTaxTotal = suggestedRCVTotal + totalRCVTax;

    // Calculate total ACV
    let suggestedACVTotal = 0;
    projectDetails.project.spreadsheetData.forEach(item => {
        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const quantity = parseFloat(item['Quantity']);
        
        // Calculate ACV for the current item using the provided formula
        const ACV = ((RCVHigh + RCVLow) / 2 * quantity);
        // Add ACV to total
        suggestedACVTotal += ACV;
    });

    // Calculate total ACV tax by multiplying total ACV by the sales tax rate
    const totalACVTax = suggestedACVTotal * (projectDetails.project.salesTax / 100);

    // Calculate ACV with tax total by adding total ACV and total ACV tax
    const acvWithTaxTotal = suggestedACVTotal + totalACVTax;

    let totalDepreciation = 0 + totalRCVTax; // Initialize total depreciation

    // Iterate over each item in the spreadsheet data
    projectDetails.project.spreadsheetData.forEach(item => {
        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const quantity = parseFloat(item['Quantity']);
        const depreciation = parseFloat(item['Depreciation']);
        
        // Calculate depreciation amount for the current item using the provided formula
        const rcvTotal = ((RCVHigh + RCVLow) / 2 * quantity);
        let depreciationFactor = (depreciation * 100) * projectDetails.project.depreciationRange;
        depreciationFactor = Math.min(depreciationFactor, 100);
        const depreciationAmount = rcvTotal * (depreciationFactor / 100);
        
        // Add depreciation amount to total
        totalDepreciation += depreciationAmount;
    });

    // Get the cell references and set their values accordingly
    const cellD18 = worksheet.getCell('D18');
    cellD18.value = suggestedRCVTotal;

    const cellD19 = worksheet.getCell('D19');
    cellD19.value = totalRCVTax;

    const cellI21 = worksheet.getCell('I21');
    cellI21.value = totalDepreciation;

    // Update other cells as needed...

};

const generateDetailWorksheet = async (worksheet, projectDetails) => {
    // Iterate over projectDetails and replace cells starting from A13
    projectDetails.project.spreadsheetData.forEach((item, index) => {
        const rowNumber = index + 13; // Start from row 13
    
        // Set values for each cell in the row
        worksheet.getCell(`A${rowNumber}`).value = index + 1; // Auto-incrementing Line number
        worksheet.getCell(`B${rowNumber}`).value = item.Room;
        worksheet.getCell(`C${rowNumber}`).value = item.Item;
        worksheet.getCell(`D${rowNumber}`).value = item.Description;
        worksheet.getCell(`E${rowNumber}`).value = item.Quantity;

        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const RCVAvg = (RCVHigh + RCVLow) / 2;
        const RCVExt = RCVAvg * item.Quantity;
        const salesTaxAmount = (projectDetails.project.salesTax / 100) * RCVExt;
        const RCVTotal = RCVExt + salesTaxAmount;
        let depreciationFactor = (item.Depreciation * 100) * projectDetails.project.depreciationRange;
        depreciationFactor = Math.min(depreciationFactor, 100);
        const depreciationAmount = RCVExt * (depreciationFactor / 100);
        const ACVTotal = (RCVExt - depreciationAmount);

        worksheet.getCell(`F${rowNumber}`).value = RCVHigh.toFixed(2); // RCV High
        worksheet.getCell(`G${rowNumber}`).value = RCVLow.toFixed(2); // RCV Low
        worksheet.getCell(`H${rowNumber}`).value = RCVAvg.toFixed(2); // RCV Avg (ea)
        worksheet.getCell(`I${rowNumber}`).value = parseFloat(RCVExt.toFixed(2)); // RCV (ext) as integer
        worksheet.getCell(`J${rowNumber}`).value = `${projectDetails.project.salesTax}%`; // Sales Tax
        worksheet.getCell(`K${rowNumber}`).value = parseFloat(salesTaxAmount.toFixed(2)); // Sales Tax Amount as integer
        worksheet.getCell(`L${rowNumber}`).value = RCVTotal.toFixed(2); // RCV Total
        worksheet.getCell(`M${rowNumber}`).value = item.Depreciation; // Depreciation
        worksheet.getCell(`N${rowNumber}`).value = projectDetails.project.depreciationRange; // Dep Years
        worksheet.getCell(`O${rowNumber}`).value = parseFloat((depreciationAmount + salesTaxAmount).toFixed(2)); // Dep Amount
        worksheet.getCell(`P${rowNumber}`).value = ACVTotal.toFixed(2); // ACV Total
        worksheet.getCell(`Q${rowNumber}`).value = item.Subclass;
        worksheet.getCell(`R${rowNumber}`).value = item.Class;
    });
};


const generateRawDataWorksheet = async (worksheet, projectDetails) => {
    // Iterate over projectDetails and replace cells starting from A2
    projectDetails.project.spreadsheetData.forEach((item, index) => {
        const rowNumber = index + 2; // Start from row 2

        // Set values for each cell in the row
        worksheet.getCell(`A${rowNumber}`).value = index + 1; // Auto-incrementing Line number
        worksheet.getCell(`B${rowNumber}`).value = item.Room;
        worksheet.getCell(`C${rowNumber}`).value = item.Item;
        worksheet.getCell(`D${rowNumber}`).value = item.Description;
        worksheet.getCell(`E${rowNumber}`).value = item.Quantity;

        const RCVHigh = parseFloat(item['RCV High']);
        const RCVLow = parseFloat(item['RCV Low']);
        const RCVAvg = (RCVHigh + RCVLow) / 2;
        const RCVExt = RCVAvg * item.Quantity;
        const salesTaxAmount = projectDetails.project.salesTax / 100 * RCVExt;
        const RCVTotal = RCVExt + salesTaxAmount;
        let depreciationFactor = (item.Depreciation * 100) * projectDetails.project.depreciationRange;
        depreciationFactor = Math.min(depreciationFactor, 100);
        const depreciationAmount = RCVExt * (depreciationFactor / 100);
        const ACVTotal = RCVExt - depreciationAmount;

        worksheet.getCell(`F${rowNumber}`).value = `$${RCVHigh.toFixed(2)}`; // RCV High
        worksheet.getCell(`G${rowNumber}`).value = `$${RCVLow.toFixed(2)}`; // RCV Low
        worksheet.getCell(`H${rowNumber}`).value = `$${RCVAvg.toFixed(2)}`; // RCV Avg (ea)
        worksheet.getCell(`I${rowNumber}`).value = `$${RCVExt.toFixed(2)}`; // RCV (ext)
        worksheet.getCell(`J${rowNumber}`).value = `${projectDetails.project.salesTax}%`; // Sales Tax
        worksheet.getCell(`K${rowNumber}`).value = `$${salesTaxAmount.toFixed(2)}`; // Sales Tax Amount
        worksheet.getCell(`L${rowNumber}`).value = `$${RCVTotal.toFixed(2)}`; // RCV Total
        worksheet.getCell(`M${rowNumber}`).value = item.Depreciation * 100;
        worksheet.getCell(`N${rowNumber}`).value = projectDetails.project.depreciationRange; // Dep Years
        worksheet.getCell(`O${rowNumber}`).value = `$${(depreciationAmount + salesTaxAmount).toFixed(2)}`; // Dep Amount
        worksheet.getCell(`P${rowNumber}`).value = `$${ACVTotal.toFixed(2)}`; // ACV Total
        worksheet.getCell(`Q${rowNumber}`).value = item.Subclass;
        worksheet.getCell(`R${rowNumber}`).value = item.Class;
    });
};

export { generateSummary, generateDetail, generateRawData, generateAll };

    