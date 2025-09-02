import React from "react";
import "./style.css";

function FilterSection({
  filterMember,
  setFilterMember,
  filterFrequency,
  setFilterFrequency,
  familyMembers,
  frequencies,
}) {
  return (
    <div className="filter-section">
      <select value={filterMember} onChange={(e) => setFilterMember(e.target.value)}>
        <option value="">All members</option>
        {familyMembers.map((member) => (
          <option key={member} value={member}>
            {member}
          </option>
        ))}
      </select>

      <select value={filterFrequency} onChange={(e) => setFilterFrequency(e.target.value)}>
        <option value="">All frequencies</option>
        {frequencies.map((freq) => (
          <option key={freq} value={freq}>
            {freq}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSection;