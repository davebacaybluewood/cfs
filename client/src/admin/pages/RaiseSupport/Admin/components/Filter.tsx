import FilterAltIcon from "@mui/icons-material/FilterAlt";
// constants
import { SUPPORT_TYPE } from "constants/constants";

const Filter = ({ selectedValue, setSelectedValue }: any) => {
  // Define a function to handle changes in the select element
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="filter-component">
      <label htmlFor="filter-select">
        <FilterAltIcon />
        Filter by type:{" "}
      </label>
      <select
        id="filter-select"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="">All</option>
        <option value={SUPPORT_TYPE.BUG}>Bug</option>
        <option value={SUPPORT_TYPE.FEATURE}>Feature</option>
        <option value={SUPPORT_TYPE.OTHER}>Other</option>
      </select>
    </div>
  );
};

export default Filter;
