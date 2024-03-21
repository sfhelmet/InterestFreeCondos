import Center from "../../components/utils/Center";
import "./FinancialPage.css";
import CSVDownloader from "./Download.js";

const FinancialPage = () => {
  return (
    <Center>
      <h1>Generate Financial Report</h1>
      <div className="export">
        <div className="units">
          <label for="units">Select Unit: </label>
          <select name="units" id="units">
            <option value="volvo">101</option>
            <option value="saab">102</option>
            <option value="opel">103</option>
            <option value="audi">104</option>
          </select>
        </div>
        <div className="years">
          <label for="years">Choose Year: </label>
          <select name="years" id="years">z
            <option value="volvo">2024</option>
            <option value="saab">2023</option>
            <option value="opel">2022</option>
            <option value="audi">2021</option>
          </select>
        </div>
        <CSVDownloader buttonText="Download Financial Report" />
      </div>

    </Center>
  );
}

export default FinancialPage;