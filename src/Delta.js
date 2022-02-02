import React, { useState } from "react";
import Linechart from "./hooks/Linechart";

function Delta() {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");
  /*
  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }35 4
  */
  return (
    <div className="deltaPage">
      <svg viewBox="-2 0 100 100" preserveAspectRatio="xMidYMid meet">
        <Linechart
          positionX={10}
          positionY={10}
          selectedGroup={selectedGroup}
          lineColour={groupColour}
        />
      </svg>
    </div>

  )

}
export default Delta;