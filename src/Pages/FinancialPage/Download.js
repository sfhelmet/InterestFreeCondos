import React from 'react';

class CSVDownloader extends React.Component {
  downloadCSV() {
    const csvData = 'Name,Age\nJohn,30\nDoe,25'; // Example CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', 'financial_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (
      <button onClick={this.downloadCSV}>
        {this.props.buttonText || 'Download CSV'}
      </button>
    );
  }
}

export default CSVDownloader;