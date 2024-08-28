// helpFunctions.js

export const calculateRCVAvg = (high, low) => {
    const avg = (Number(high) + Number(low)) / 2;
    return avg.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  
  export const calculateRCVExt = (high, low, quantity) => {
    const avg = (Number(high) + Number(low)) / 2;
    const ext = avg * quantity;
    return ext.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  
  export const calculateSalesTaxAmount = (salesTax, high, low, quantity) => {
    const avg = (Number(high) + Number(low)) / 2;
    const ext = avg * quantity;
    const taxAmount = (salesTax / 100) * ext;
    return taxAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  
  export const calculateRCVTotal = (salesTax, high, low, quantity) => {
    const avg = (Number(high) + Number(low)) / 2;
    const ext = avg * quantity;
    const taxAmount = (salesTax / 100) * ext;
    const total = ext + taxAmount;
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  
  export const calculateDepreciationAmount = (item, projectDetails) => {
    const rcvTotal = ((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) * item.Quantity;
    let depreciationFactor = item.Depreciation * 100 * projectDetails.project.depreciationRange;
    depreciationFactor = Math.min(depreciationFactor, 100);
    const salesTaxAmount = (projectDetails.project.salesTax / 100) * rcvTotal;
    return ((rcvTotal + salesTaxAmount) * (depreciationFactor / 100)).toFixed(2);
  };
  
  export const calculateACVTotal = (item, projectDetails) => {
    const rcvTotal = ((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) * item.Quantity;
    let depreciationFactor = item.Depreciation * 100 * projectDetails.project.depreciationRange;
    depreciationFactor = Math.min(depreciationFactor, 100);
    const salesTaxAmount = (projectDetails.project.salesTax / 100) * rcvTotal;
    const depreciationAmount = (rcvTotal + salesTaxAmount) * (depreciationFactor / 100);
    return ((rcvTotal + salesTaxAmount) - depreciationAmount).toFixed(2);
  };
  
  // Handle field changes
  export const handleFieldChange = (projectDetails, setProjectDetails, originalIndex, fieldName, value, setDataChanged) => {
    const updatedProjectDetails = { ...projectDetails };
    updatedProjectDetails.project.spreadsheetData[originalIndex][fieldName] = value;
    setProjectDetails(updatedProjectDetails);
    setDataChanged(true);
  };
  
  export const handleRCVChange = (projectDetails, setProjectDetails, index, fieldName, value, setDataChanged) => {
    if (/^(?:\d+)?(?:\.\d{0,2})?$/.test(value) || value === "") {
      const updatedProjectDetails = { ...projectDetails };
      updatedProjectDetails.project.spreadsheetData[index][fieldName] = value;
      setProjectDetails(updatedProjectDetails);
      setDataChanged(true);
    }
  };
  
  export const handleQuantityChange = (projectDetails, setProjectDetails, index, value, setDataChanged) => {
    if (/^\d+$/.test(value) || value === "") {
      const updatedProjectDetails = { ...projectDetails };
      updatedProjectDetails.project.spreadsheetData[index]["Quantity"] = value;
      setProjectDetails(updatedProjectDetails);
      setDataChanged(true);
    }
  };
  
  export const handleDepreciationInputChange = (projectDetails, setProjectDetails, index, value, setDataChanged) => {
    const updatedProjectDetails = { ...projectDetails };
    updatedProjectDetails.project.spreadsheetData[index]["DepreciationDisplay"] = value;
    const newDepreciation = parseFloat(value) / 100;
    updatedProjectDetails.project.spreadsheetData[index]["Depreciation"] = newDepreciation;
    setProjectDetails(updatedProjectDetails);
    setDataChanged(true);
  };
  
  // Handle file download
  export const downloadExcel = (data, filename) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  