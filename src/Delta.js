import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Linechart from "./hooks/Linechart";
import Barchart from "./hooks/Barchart";
import Donutchart from "./hooks/Donutchart";
import { lineChartData,barChartData } from "./data/Datad3";
import "./Delta.css";

function Delta() {
  gsap.registerPlugin(ScrollTrigger);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");
  const lineGroupunique = lineChartData.map((obj)=>{return obj.group}).filter((item, index,arr)=>{return arr.indexOf(item)===index});
  const barGroupunique = barChartData.map((obj)=>{return obj.group}).filter((item, index,arr)=>{return arr.indexOf(item)===index});

  useEffect(()=>{
    gsap.from(".line2", {
      scrollTrigger: {
        trigger: ".line2",
        scrub: true,
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none"
    });
    gsap.from(".line3", {
      scrollTrigger: {
        trigger: ".line3",
        scrub: true,
      },
      duration: 1,
      backgroundColor: "#D2691E",
      ease: "none"
    });
  },[]);

  function updateBarChart(group, colour) {
    setSelectedGroup(group);
    setGroupColour(colour);
  }
  return (
    <div className="deltaPage">
      <div className="deltaDemo line1"><p><span>Line Chart Demo</span></p></div>
      <div className="deltaLine">
        {lineGroupunique && lineGroupunique.map((k,i)=>(
          <label className="deltaRadio" key={i}>{k}
            <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
            <span className="deltaLabel"></span>
          </label>
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <Linechart
            positionX={20}
            positionY={5}
            selectedGroup={selectedGroup}
            lineColour={groupColour}
          />
        </svg>
      </div>
      <div className="deltaDemo line2"><p><span>Bar Chart Demo</span></p></div>
      <div className="deltaBar">
        {barGroupunique && barGroupunique.map((k,i)=>(
          <label className="deltaRadio" key={i}>{k}
            <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
            <span className="deltaLabel"></span>
          </label>
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <Barchart
            positionX={20}
            positionY={40}
            width={80}
            height={100}
            selectedGroup={selectedGroup}
            barColour={groupColour}
          />
        </svg>
      </div>
      <div className="deltaDemo line3"><p><span>Donut Chart Demo</span></p></div>
      <div className="deltaDonut">{/* 
        {barGroupunique && barGroupunique.map((k,i)=>(
          <label className="deltaRadio" key={i}>{k}
            <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
            <span className="deltaLabel"></span>
          </label>
        ))}*/}
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <Donutchart x={15} y={20} onChangeGroup={updateBarChart} />
        <Barchart
          positionX={35}
          positionY={50}
          width={80}
          height={100}
          selectedGroup={selectedGroup}
          barColour={groupColour}
        />
        <Linechart
          positionX={35}
          positionY={4}
          selectedGroup={selectedGroup}
          lineColour={groupColour}
        />
        </svg>
      </div>
    </div>

  )

}
export default Delta;