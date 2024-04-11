import React, { useEffect, useState } from 'react';
import Center from "../../components/Utils/Center";
import "./FinancialPage.css";
import CSVDownloader from "./Download.js";
import { getPaymentYears, getPaymentCondos } from "./FinancialPageService";
const FinancialPage = () => {
  const [years, setYears] = useState([]);
  const [condos, setCondos] = useState([]);
  const [curUnit, setCurUnit] = useState("");
  const [curYear, setCurYear] = useState("");
  
  useEffect(() => {
    getPaymentYears().then((data) => {
      setYears([...data]);
      if(data.size > 0) setCurYear([...data][0]);
    });
    getPaymentCondos(1).then((data) => {
      setCondos([...data]);
      if(data.size > 0) setCurUnit([...data][0]);
    }); 
  }, []);

  return (
    <Center>
      <h1>Generate Financial Report</h1>
      <div className="export">
        <div className="units">
          <label htmlFor="units">Select Unit: </label>
          <select name="units" id="units" onChange={(e) => setCurUnit(e.target.value)} value={curUnit}>
            {condos.map((condo, idx) => (
              <option key={idx}>{condo}</option>
            ))}
          </select>
        </div>
        <div className="years">
          <label htmlFor="years">Choose Year: </label>
          <select name="years" id="years" onChange={(e) => setCurYear(e.target.value)} value={curYear}>
            {years.map((year, idx) => (
              <option key={idx}>{year}</option>
            ))}
          </select>
        </div>
        <CSVDownloader 
          buttonText="Download Financial Report" 
          propertyId={1} 
          unit={curUnit} 
          year={curYear} 
        />
      </div>

    </Center>
  );
}

export default FinancialPage;