import React, { useState } from "react"
import "../RaiseSupportAdmin.scss"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

const Filter = ({ selectedValue, setSelectedValue }: any) => {
  // Define a function to handle changes in the select element
  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value)
  }

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
        <option value="bug">Bug</option>
        <option value="feature">Feature</option>
        <option value="other">Other</option>
      </select>
    </div>
  )
}

export default Filter
