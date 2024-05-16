// CardValuation.jsx

import React from "react";

const styles = {
  Card: {
    marginTop: "5px",
    width: "100%",
    height: "60%", // Keeping the original height
    backgroundColor: "#f0f0f0",
    borderRadius: "26px",
    border: "1px solid #030303",
    boxSizing: "border-box",
    gap: "20px",
    display: "flex",
    flexDirection: "row",
    fontSize: "1.0vw",
    justifyContent: "center",
    alignItems: "center",
    overflow: "auto",
  },
  column: {
    width: "25%",
    height: "100%",
    paddingTop: "10px",
  },
  firstColumn: {
    width: "25%",
    // Add margin right for space between columns
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  innerCard: {
    width: "100%", // Adjust width of the inner card as needed
    height: "100%", // Adjust height of the inner card as needed
    backgroundColor: "#cddef2",
    borderRadius: "26px",
    border: "1px solid #030303",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: 600,
    padding: "5px",
  },
  headerText: {
    fontWeight: "bold",
    marginBottom: "5px",
    textAlign: "center",
  },
  text: {
    color: "#030303",

    fontFamily: "Poppins",
    fontWeight: 500,
    lineHeight: "23px",

    whiteSpace: "nowrap",
  },
};

const CardValuation = ({ projectDetails }) => {
  // Initialize total
  let suggestedRCVTotal = 0;

  // Iterate through each item in spreadsheetData
  projectDetails.project.spreadsheetData.forEach((item) => {
    // Parse RCV High, RCV Low, and Quantity from the current item
    const RCVHigh = parseFloat(item["RCV High"]).toFixed(2);
    const RCVLow = parseFloat(item["RCV Low"]).toFixed(2);
    const quantity = parseFloat(item["Quantity"]);

    // Calculate RCV (ext) for the current item using the provided formula
    const RCVExt = ((parseFloat(RCVHigh) + parseFloat(RCVLow)) / 2) * quantity;

    // Add RCV (ext) to total
    suggestedRCVTotal += RCVExt;
  });

  // Initialize total RCV tax
  let totalRCVTax = 0;

  // Iterate through each item in spreadsheetData
  projectDetails.project.spreadsheetData.forEach((item) => {
    // Parse RCV High, RCV Low, and Quantity from the current item
    const RCVHigh = parseFloat(item["RCV High"]);
    const RCVLow = parseFloat(item["RCV Low"]);
    const quantity = parseFloat(item["Quantity"]);

    // Calculate RCV (ext) for the current item using the provided formula
    const RCVExt = ((RCVHigh + RCVLow) / 2) * quantity;

    // Round RCVExt to two decimal places to minimize rounding errors
    const roundedRCVExt = parseFloat(RCVExt.toFixed(2));

    // Calculate RCV tax for the current item and add it to the total
    const RCVTax = roundedRCVExt * (projectDetails.project.salesTax / 100);

    // Round RCVTax to two decimal places before adding to totalRCVTax
    const roundedRCVTax = parseFloat(RCVTax.toFixed(2));

    // Add rounded RCVTax to totalRCVTax
    totalRCVTax += roundedRCVTax;
  });

  // Round the total RCV tax to two decimal places
  totalRCVTax = roundToTwoDecimalPlaces(totalRCVTax);

  // Output the total RCV tax
  console.log(totalRCVTax);

  // Function to round a number to two decimal places
  function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
  }

  // Calculate RCV with tax total
  const rcvWithTaxTotal = suggestedRCVTotal + totalRCVTax;

  let suggestedACVTotal = 0; // Initialize total ACV

  // Iterate over each item in the spreadsheet data
  projectDetails.project.spreadsheetData.forEach((item) => {
    // Parse RCV High, RCV Low, Quantity, and Depreciation from the current item
    const RCVHigh = parseFloat(item["RCV High"]);
    const RCVLow = parseFloat(item["RCV Low"]);
    const quantity = parseFloat(item["Quantity"]);
    const depreciation = parseFloat(item["Depreciation"]);

    // Calculate ACV for the current item using the provided formula
    const ACV1 = ((RCVHigh + RCVLow) / 2) * quantity;

    let depreciationFactor =
      depreciation * 100 * projectDetails.project.depreciationRange;

    // Ensure that the depreciation factor does not exceed 100
    depreciationFactor = Math.min(depreciationFactor, 100);

    const depreciationAmount = ACV1 * (depreciationFactor / 100);

    let ACV2 = ACV1 - depreciationAmount;

    // Add ACV to total
    suggestedACVTotal += ACV2;
  });

  // Calculate total ACV tax by multiplying total ACV by the sales tax rate
  const totalACVTax =
    suggestedACVTotal * (projectDetails.project.salesTax / 100);

  // Calculate ACV with tax total by adding total ACV and total ACV tax
  const acvWithTaxTotal = suggestedACVTotal;

  let totalDepreciation = 0 + totalRCVTax; // Initialize total depreciation

  // Iterate over each item in the spreadsheet data
  projectDetails.project.spreadsheetData.forEach((item) => {
    // Parse RCV High, Quantity, and Depreciation from the current item
    const RCVHigh = parseFloat(item["RCV High"]);
    const RCVLow = parseFloat(item["RCV Low"]);
    const quantity = parseFloat(item["Quantity"]);
    const depreciation = parseFloat(item["Depreciation"]);

    // Calculate depreciation amount for the current item using the provided formula
    const ACV1 = ((RCVHigh + RCVLow) / 2) * quantity;

    let depreciationFactor =
      depreciation * 100 * projectDetails.project.depreciationRange;

    // Ensure that the depreciation factor does not exceed 100
    depreciationFactor = Math.min(depreciationFactor, 100);

    const depreciationAmount = ACV1 * (depreciationFactor / 100);

    // Add depreciation amount to total
    totalDepreciation += depreciationAmount;
  });

  // Now you have the total depreciation amount
  let depreciationRange;
  switch (projectDetails.project.depreciationRange) {
    case 2:
      depreciationRange = "0 - 3 years";
      break;
    case 5:
      depreciationRange = "4 - 6 years";
      break;
    case 8:
      depreciationRange = "7 - 9 years";
      break;
    case 10:
      depreciationRange = "10+ years";
      break;
    default:
      depreciationRange = "N/A";
      break;
  }

  return (
    <div className="cardValuation">
      <div className="numItem">
        Number Of Items:
        {projectDetails.project.numberOfLines}
      </div>
      <div className="calcProject">
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="calcProjectHeader">RCV</div>
          <div>
            Suggested RCV Total: $
            {suggestedRCVTotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div>Tax Rate: {projectDetails.project.salesTax}%</div>
          <div>
            Total RCV Tax: $
            {totalRCVTax.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <hr
            style={{
              backgroundColor: "white",
              height: "1px",
              width: "100%",
              margin: "5px 0",
            }}
            align="left"
          />
          <div>
            RCV with Tax Total: $
            {rcvWithTaxTotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="calcProjectHeader">ACV</div>
          <div>
            RCV with Tax Total: $
            {rcvWithTaxTotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div>
            Total Depreciation: ($
            {totalDepreciation.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            )
          </div>
          <hr
            style={{
              backgroundColor: "white",
              height: "1px",
              width: "100%",
              margin: "5px 0",
            }}
            align="left"
          />{" "}
          {/* Updated line here */}
          <div>
            ACV Total: $
            {acvWithTaxTotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="calcProjectHeader">DEPRECIATION</div>

          <div>Depreciating Years: {depreciationRange}</div>
          <div>
            Total Depreciation: $
            {totalDepreciation.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardValuation;
