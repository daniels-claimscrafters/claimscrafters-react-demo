import React from "react";

const styles = {
  Text: {
    background: "#132A58",
    color: "white",
    fontSize: "13px",
    fontFamily: "Poppins",
    lineHeight: "18px",
    maxWidth: "95%",
    marginBottom: "10px",
    textAlign: "left",
  },
};

const Text = () => {
  return (
    <div style={styles.Text}>
      <strong>Uploading Excel Data Instructions:</strong>
      <br />
      <strong>1. Data Format:</strong> Make sure your data is organized neatly
      in columns, with each column representing a specific data category or
      attribute (Room, Item, Description and Qty). You can download our excel
      template for ease of use by clicking the button above.
      <br />
      <strong>2. Item Description is Mandatory:</strong> To ensure precise
      pricing through Contents IQ’s Generative AI processing, it is imperative
      to furnish a detailed description for each item uploaded, including its
      corresponding unit of measurement. For example, if several identical items
      are packaged together, kindly specify "case of" to enhance pricing
      accuracy. Also, include additional relevant categories or attributes in
      your description, such as brand, model, model numbers and/or condition, to
      further enhance pricing accuracy. Providing this comprehensive detailed
      information ensures the highest level of precision in pricing results.
      <br />
      <strong>3. Avoid Special Characters: </strong> Avoid using special
      characters and/or symbols in item descriptions, as they may interfere with
      data processing.
      <br />
      <strong>4. Item Quantity Should be Whole Number Values Only:</strong>{" "}
      Please ensure that all corresponding item quantities to be uploaded are of
      whole numeric values only (no .77 or 1.8). This is crucial for accurate
      processing and analysis of the data. Non-numeric entries will result in
      errors and inaccuracies in the pricing information generated.
      <br />
      <strong>5. Remove Any Leading Rows: </strong>Any rows above the actual
      data intended for evaluation should be deleted prior to uploading.
      <br />
      <strong>6. Save as .xls or .xlsx:</strong> Only Excel files in the .xls or
      .xlsx format are compatible for the upload.
      <br />
      <strong>7. Upload:</strong> Once you've prepared your Excel file according
      to the above instructions, proceed to upload it using the button below.
    </div>
  );
};

export default Text;
