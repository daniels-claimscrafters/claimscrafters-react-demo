import React, { useState } from "react";
import { Card, CardContent, Typography, Divider, IconButton, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import the expand icon

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#000", // Set background to black
  color: "#fff", // Set text color to white for contrast
  borderRadius: "16px",
  border: `1px solid ${theme.palette.grey[700]}`,
  marginTop: "1px",
  width: "100%",
  height: "auto",
  padding: "1px",
  boxSizing: "border-box",
  overflow: "auto",
}));

const HeaderWrapper = styled('div')({
  backgroundColor: '#0D1B45', // Dark blue background
  padding: '10px',
  borderRadius: '8px',
  marginBottom: '10px',
});

const HeaderText = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "5px",
  textAlign: "center",
  fontSize: "18px",
});

const Text = styled(Typography)({
  color: "#fff", // Ensure text is readable against black background
  fontFamily: "Poppins",
  fontWeight: 500,
  lineHeight: "23px",
});

const Column = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
  textAlign: 'center',
});

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  color: "#fff", // Set the icon color to white
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardValuation = ({ projectDetails, filteredData }) => {
  console.log('Filtered Data:', filteredData);

  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Initialize totals and calculations
  let suggestedRCVTotal = 0;
  let totalRCVTax = 0;
  let suggestedACVTotal = 0;
  let totalDepreciation = 0;

  filteredData.forEach((item) => {
    const RCVHigh = parseFloat(item["RCV High"]) || 0;
    const RCVLow = parseFloat(item["RCV Low"]) || 0;
    const quantity = parseFloat(item["Quantity"]) || 0;
    const depreciation = parseFloat(item["Depreciation"]) || 0;

    let RCVExt = (((RCVHigh + RCVLow) / 2) * quantity).toFixed(2);
    RCVExt = parseFloat(RCVExt);
    suggestedRCVTotal += RCVExt;

    const RCVTax = RCVExt * (projectDetails.project.salesTax / 100);
    totalRCVTax += parseFloat(RCVTax.toFixed(2));

    const ACV1 = parseFloat((((RCVHigh + RCVLow) / 2) * quantity).toFixed(2));
    let depreciationFactor = depreciation * 100 * projectDetails.project.depreciationRange;
    depreciationFactor = Math.min(depreciationFactor, 100);
    const depreciationAmount = ACV1 * (depreciationFactor / 100);
    const formattedDepreciationAmount = parseFloat(depreciationAmount.toFixed(2));
    let ACV2 = ACV1 - formattedDepreciationAmount;
    suggestedACVTotal += ACV2;

    totalDepreciation += formattedDepreciationAmount;
  });

  totalRCVTax = roundToTwoDecimalPlaces(totalRCVTax);
  const rcvWithTaxTotal = suggestedRCVTotal + totalRCVTax;
  const acvWithTaxTotal = suggestedACVTotal;
  
  function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
  }

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
    <StyledCard>
      <CardContent>
        <HeaderText variant="h5" align="center" gutterBottom>
          Valuation
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </HeaderText>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body1" align="center" gutterBottom>
            Number Of Items: {projectDetails.project.numberOfLines}
          </Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <Column>
              <HeaderWrapper>
                <HeaderText variant="h6">RCV</HeaderText>
              </HeaderWrapper>
              <Text>
                Suggested RCV Total: $
                {suggestedRCVTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text>Tax Rate: {projectDetails.project.salesTax}%</Text>
              <Text>
                Total RCV Tax: $
                {totalRCVTax.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Divider style={{ backgroundColor: "#fff", margin: "10px 0" }} />
              <Text>
                RCV with Tax Total: $
                {rcvWithTaxTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Column>
            <Column>
              <HeaderWrapper>
                <HeaderText variant="h6">ACV</HeaderText>
              </HeaderWrapper>
              <Text>
                RCV with Tax Total: $
                {rcvWithTaxTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
              <Text>
                Total Depreciation: ($
                {totalDepreciation.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                )
              </Text>
              <Divider style={{ backgroundColor: "#fff", margin: "10px 0" }} />
              <Text>
                ACV Total: $
                {acvWithTaxTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Column>
            <Column>
              <HeaderWrapper>
                <HeaderText variant="h6">DEPRECIATION</HeaderText>
              </HeaderWrapper>
              <Text>Depreciating Years: {depreciationRange}</Text>
              <Text>
                Total Depreciation: $
                {totalDepreciation.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Column>
          </div>
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default CardValuation;