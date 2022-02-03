import React, { useState } from "react";
import Linechart from "./hooks/Linechart";
import { lineChartData } from "./data/Datad3";
import "./Delta.css";

function Delta() {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");
  const lineGroupunique = lineChartData.map((obj)=>{return obj.group}).filter((item, index,arr)=>{return arr.indexOf(item)===index});
  /*
  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }35 4
  */
  return (
    <div className="deltaPage">
      <div className="deltaLine">
        {lineGroupunique && lineGroupunique.map((k,i)=>(
          <label className="deltaRadio" key={i}>{k}
            <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
            <span className="deltaLabel"></span>
          </label>
        ))}
        <svg viewBox="-2 0 100 100" preserveAspectRatio="xMidYMid meet">
          <Linechart
            positionX={10}
            positionY={10}
            selectedGroup={selectedGroup}
            lineColour={groupColour}
          />
        </svg>
      </div>
      
    </div>

  )

}
export default Delta;