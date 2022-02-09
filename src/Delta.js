import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Linechart from "./hooks/Linechart";
import Barchart from "./hooks/Barchart";
import Donutchart from "./hooks/Donutchart";
import { lineChartData} from "./data/Datad3";
import "./Delta.css";

function Delta() {
  gsap.registerPlugin(ScrollTrigger);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [groupColour, setGroupColour] = useState("lightgrey");
  const lineGroupunique = lineChartData.map((obj)=>{return obj.group}).filter((item, index,arr)=>{return arr.indexOf(item)===index});
  /*const barGroupunique = barChartData.map((obj)=>{return obj.group}).filter((item, index,arr)=>{return arr.indexOf(item)===index});*/

  useEffect(()=>{
    gsap.from(".title2", {
      scrollTrigger: {
        trigger: ".title2",
        scrub: true,
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none"
    });
    gsap.from(".title3", {
      scrollTrigger: {
        trigger: ".title3",
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
      <div className="deltaTitle">Charts Demo</div>
      <div className="deltaRadios">
      <button className="deltaBtn" onClick={()=>updateBarChart("All","lightgrey")}>All</button>
        {/*
        {lineGroupunique && lineGroupunique.map((k,i)=>(
          <label className="deltaRadio" key={i}>{k}
            <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
            <span className="deltaLabel"></span>
          </label>
        ))}
        */}
      </div>
      <svg viewBox="0 0 85 85" preserveAspectRatio="xMidYMid meet">
        <Donutchart x={42} y={20} onChangeGroup={updateBarChart} />
        <Linechart
          positionX={20}
          positionY={40}
          selectedGroup={selectedGroup}
          lineColour={groupColour}
        />
        <Barchart
          positionX={21}
          positionY={85}
          width={80}
          height={100}
          selectedGroup={selectedGroup}
          barColour={groupColour}
        />
        </svg>
    </div>
    /*
    <div className="deltaPage">
      <div className="deltaDemo title1">Line Chart Demo</div>
      <div className="deltaSection deltaLine">
        <div className="deltaCol deltaRadios">
          {lineGroupunique && lineGroupunique.map((k,i)=>(
            <label className="deltaRadio" key={i}>{k}
              <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
              <span className="deltaLabel"></span>
            </label>
          ))}
        </div>
        <div className="deltaCol deltaSVG">
          <svg viewBox="0 0 70 70" preserveAspectRatio="xMidYMid meet">
            <Linechart
              positionX={1}
              positionY={7}
              selectedGroup={selectedGroup}
              lineColour={groupColour}
            />
          </svg>
        </div>
      </div>
      <div className="deltaDemo title2">Bar Chart Demo</div>
      <div className="deltaSection deltaBar">
        <div className="deltaCol deltaRadios">
          {barGroupunique && barGroupunique.map((k,i)=>(
            <label className="deltaRadio" key={i}>{k}
              <input key={i} type="radio" value={i} checked={selectedGroup === k} onChange={()=>setSelectedGroup(k)} />
              <span className="deltaLabel"></span>
            </label>
          ))}
        </div>
        <div className="deltaCol deltaSVG">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <Barchart
              positionX={30}
              positionY={40}
              width={80}
              height={100}
              selectedGroup={selectedGroup}
              barColour={groupColour}
            />
          </svg>
        </div>
      </div>
      <div className="deltaDemo title3">Donut Chart Demo</div>
      <div className="deltaSection deltaDonut">
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
    */

  )

}
export default Delta;