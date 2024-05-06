import React from "react";

const styles = {
  Card: {
    top: "502px",
    left: "24px",
    width: "100%",
    height: "300px",
    backgroundColor: "#132A58",
    borderRadius: "12px",
    border: "1px solid #030303",
    boxSizing: "border-box",
    boxShadow: "0px 1px 12px rgba(3,3,3,0.08)",
    marginTop: "20px",
    padding: "5px",
    fontFamily: "Poppins",
  },
  Table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  TableHeader: {
    backgroundColor: "#132A58",
    borderBottom: "1px solid #dddddd",
    height: "40px",
  },
  TableCell: {
    borderBottom: "1px solid #dddddd",
    padding: "7px",
  },
  TableCellLast: {
    padding: "10px",
  },
};

const CardPriceBreakdown = () => {
  return (
    <div style={styles.Card}>
      <table style={styles.Table}>
        <thead>
          <tr style={styles.TableHeader}>
            <th>Volume</th>
            <th>Price</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.TableCell}>1-100 Lines</td>
            <td style={styles.TableCell}>$250.00</td>
            <td style={styles.TableCell}>Baseline</td>
          </tr>
          <tr>
            <td style={styles.TableCell}>101-300 Lines</td>
            <td style={styles.TableCell}>$2.25 / line</td>
          </tr>
          <tr>
            <td style={styles.TableCell}>301-500 Lines</td>
            <td style={styles.TableCell}>$2.00 / line</td>
          </tr>
          <tr>
            <td style={styles.TableCell}>501-700 Lines</td>
            <td style={styles.TableCell}>1.75 / line</td>
          </tr>
          <tr>
            <td style={styles.TableCell}>701-900 Lines</td>
            <td style={styles.TableCell}>$1.50 / line</td>
          </tr>
          <tr>
            <td style={styles.TableCellLast}>1000+ Lines</td>
            <td style={styles.TableCellLast}>$1.25 / line</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default CardPriceBreakdown;
