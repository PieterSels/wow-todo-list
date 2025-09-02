import React from "react";
import "./style.css";

function ClearButtons({ resetCompleted }) {
  return (
    <div className="clear-buttons">
      <button onClick={() => resetCompleted("Daily")}>Clear Daily</button>
      <button onClick={() => resetCompleted("Weekly")}>Clear Weekly</button>
      <button onClick={() => resetCompleted("Monthly")}>Clear Monthly</button>
    </div>
  );
}

export default ClearButtons;