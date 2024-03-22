import React from 'react';
import { fetchPaymentsByYearAndCondo } from "./FinancialPageService";

class CSVDownloader extends React.Component {
  downloadCSV(propertyId, unit, year) { 
    function arrayToCSV(data) {
      const type = ["Condo", "Parking", "Locker"]
      const csvRows = [];
      csvRows.push("type,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec");
      let i = 0
      for (const row of data) {
        csvRows.push(type[i] + "," + row.join(','));
        i ++; 
      }
      return csvRows.join('\n');
    }
    fetchPaymentsByYearAndCondo(propertyId, unit, year).then((data) => {
      const csvData = arrayToCSV(data)
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', 'financial_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  render() {
    return (
      <button onClick={() => this.downloadCSV(this.props.propertyId, this.props.unit, this.props.year)}>
        {this.props.buttonText || 'Download CSV'}
      </button>
    );
  }
}

export default CSVDownloader;