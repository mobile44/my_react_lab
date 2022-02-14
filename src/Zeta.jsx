import React, {useEffect } from 'react';
import * as d3 from 'd3';
import "d3-time-format";
import "./Zeta.css";
//import globalBrand from "./data/global_brands.csv";

const parseTime = d3.timeParse("%d-%b-%y");
/*
const lineData = [
  {x:10,y:20},
  {x:20,y:50},
  {x:80,y:90}
]
*/
const createGraph = async()=>{
  d3.select('#area3')
    .select('svg')
    .remove();
  d3.select('#area3')
    .select('.tooltip')
    .remove();

  let data2 = await d3.csv(require("./data/line_data.csv"));
  data2.forEach((d)=>{
    d.date = parseTime(d.date);
    d.close = +d.close;
  });
  data2 = data2.sort((a,b)=>+a.date - +b.date);
  const margin={top:20,right:20,bottom:50,left:70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  const svg3 = d3
    .select("#area3")
    //.append("svg")
    .attr("width",width+margin.left+margin.right)
    .attr("height",height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

  const x2 = d3.scaleTime().range([0,width]);
  x2.domain(d3.extent(data2,(d)=>{return d.date;}));
  
  svg3
    .append("g")
    .attr("transform",`translate(0,${height})`)
    .call(d3.axisBottom(x2));
  
  const y2 = d3.scaleLinear().range([height,0]);
  y2.domain([0,d3.max(data2,(d)=>{return d.close;})]);
  
  svg3
    .append("g")
    .call(d3.axisLeft(y2));
  
  const valueLine = d3.line()
    .x((d)=>{return x2(d.date);})
    .y((d)=>{return y2(d.close);})
  svg3
    .append("path")
    .data([data2])
    .attr("class","line")
    .attr("d",valueLine);

  const tooltip = d3
    .select("#area3")
    .append('div')
    .attr('class','tooltip')
    .style('opacity',0);

  const focus = svg3
    .append('g')
    .attr('class','focus')
    .style('display','none');
  
  focus.append('circle').attr('r',5).attr('class','circle');

  svg3
    .append('rect')
    .attr('class','overlay')
    .attr('width',width)
    .attr('height',height)
    .style('opacity',0)
    .on('mouseover',()=>{
      focus.style('display',null);
    })
    .on('mouseout',()=>{
      tooltip
        .transition()
        .duration(300)
        .style('opacity',0);
    })
    .on('mousemove',mousemove);

  function mousemove(event) {
    const bisect = d3.bisector(d=>d.date).left;
    const xPos = d3.pointer(event,this)[0];
    const x0 = bisect(data2, x2.invert(xPos));
    const d0 = data2[x0];
    
    focus.attr(
      'transform',
      `translate(${x2(d0.date)},${y2(d0.close)})`,
    );
    tooltip
      .transition()
      .duration(300)
      .style('opacity',0.9);
    tooltip
      .html(d0.tooltipContent || d0.date)
      .style(
        'transform',
        `translate(${x2(d0.date)+30}px,${y2(d0.close)-30}px)`
      );
    
  }
}

function Zeta() {
  useEffect(()=>{
    /*
    d3.select("#target").style("stroke-width",5);
    const svg1 = d3.select("#area1");
    svg1
      .append("circle")
      .attr("cx",140)
      .attr("cy",70)
      .attr("r",40)
      .style("fill","red");
    svg1
      .append("circle")
      .attr("cx",300)
      .attr("cy",100)
      .attr("r",40)
      .style("fill","blue");
    
    const margin = {top: 50, right: 40, bottom: 30, left: 50},
      width = 450 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const svg2 = d3
      .select("#area2")
      .append("svg")
      .attr("width",width + margin.left + margin.right)
      .attr("height",height + margin.top + margin.bottom)
      .append("g")
      .style("color","blue")
      .attr("transform",`translate(${margin.left},${margin.top})`);
    const x1 = d3.scaleLinear().domain([0,100]).range([0,width]);
    svg2
      .append("g")
      .attr("transform",`translate(0,${height})`)
      .call(d3.axisBottom(x1));
    const y1 = d3.scaleLinear().domain([0,100]).range([height,0]);
    svg2.append("g").call(d3.axisLeft(y1));
    svg2
      .selectAll("whatever")
      .data(lineData)
      .enter()
      .append("circle")
      .attr("cx",(d)=>x1(d.x))
      .attr("cy",(d)=>y1(d.y))
      .attr("r",7);
    */
    
    createGraph();
  },[]);

  return (
    <div className="zetaPage">
      {/*
      <style>{
        `
        .line {
          fill: none;
          stroke: red;
          stroke-width: 2px;
        }
        `
      }</style>
      
      <svg>
        <circle
          id="target"
          style={{fill: "green"}}
          stroke="black"
          cx={50}
          cy={50}
          r={40}
        ></circle>
      </svg>
      <svg id="area1" height={200} width={400}></svg>
      
      <svg id="area2" height={400} width={500}></svg>
      */}
      <svg id="area3"></svg>
    
    </div>
  )
}
export default Zeta;