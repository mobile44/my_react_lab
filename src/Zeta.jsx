import React, {useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "d3-time-format";
import "./Zeta.css";

const parseTime = d3.timeParse("%d-%b-%y");
const format = d3.timeFormat("%d-%b-%y");

function Zeta(props) {
  const [screen, setScreen] = useState(props.winWidth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(()=>{
    setScreen(props.winWidth);
    console.log("Props: ", props.winWidth);
  },[props]);

  async function LoadData() {
    const csv = await d3.csv(require("./data/line_data.csv"));
    csv.forEach((d)=>{
      d.date = parseTime(d.date);
      d.close = +d.close;
    });
    setData(csv.sort((a,b)=>+a.date - +b.date));
    setLoading(false);
  };

  useEffect(()=>{
    LoadData();
  },[]);

  useEffect(()=>{
    console.log("Data: ",data.length);
  },[data]);

  function DrawGraph() {
    let virtscreen = screen;
    if (screen>=900) {
      virtscreen = screen - 250;
    }
    const margin={top:50,right:70,bottom:50,left:70},
      width = virtscreen - margin.left - margin.right,
      height = virtscreen - margin.top - margin.bottom;
    console.log("Width: ", width);
    console.log("Height: ", height);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data,(d)=>{return d.date;}))
      .range([0,width]);

    const yScale = d3
      .scaleLinear()
      .domain([0,d3.max(data,(d)=>{return d.close;})])
      .range([height,0]);

    const svgContainer = d3
      .select("#area3")
      .append("svg")
      .attr("width",width+margin.left+margin.right)
      .attr("height",height+margin.top+margin.bottom);

    svgContainer
      .append("g")
      .attr("transform",`translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale));

    svgContainer
      .append("g")
      .attr("transform",`translate(${margin.left},${height+margin.top})`)
      .call(d3.axisBottom(xScale));

    const valueLine = d3.line()
      .x((d)=>{return xScale(d.date);})
      .y((d)=>{return yScale(d.close);});
  
    console.log("Data Check: ", data.length);
    svgContainer
      .append("path")
      .data([data])
      .attr("class","line")
      .attr("d",valueLine)
      .attr("transform",`translate(${margin.left},${margin.top})`);
    
    svgContainer
      .append("text")
      .attr("class",'tooltip_text');
    
    const text = d3.select('.tooltip_text');

    let i = 0;
    data.forEach((d)=>{
      svgContainer
        .append("circle")
        .data(data)
        .attr("cx",xScale(d.date))
        .attr("cy",yScale(d.close))
        .attr("r",7)
        .style("fill", "red")
        //.attr("class",`zetaDot${i}`)
        .attr("transform",`translate(${margin.left},${margin.top})`)
        .on('mouseout',()=>{
          text
            .style('opacity',0);
        })
        /*
        .on('mousehover',()=>{
          text
            .style('opacity',1);
        })
        */
        .on('mousemove',mousemove);
      i++;
    });

    function mousemove(event) {
      const bisect = d3.bisector(d=>d.date).left;
      const xPos = d3.pointer(event,this)[0];
      const x0 = bisect(data, xScale.invert(xPos-10));
      if (x0>=0 && x0<data.length) {
      const d0 = data[x0];
      text
        .style('opacity',1)
        .style('font-weight','bold')
        .attr('transform',`translate(${xScale(d0.date)},${yScale(d0.close)+100})`)
        .html(format(d0.date)+`,`+d0.close);
      }
    };
  }

  
  useEffect(()=>{
    const svgOld = d3.select("#area3");
    svgOld.selectAll('*').remove();
    DrawGraph();
  })
  
  return (
    <div className="zetaPage">
      {loading && <div>Loading...</div>}
      {/*{screen && <div>{screen}</div>}
      {data && <div>{data.length}</div>}*/}
      {(screen>=900) && (
          <svg id="area3" height={screen} width={screen-250}></svg>
      )}
      {(screen<900) && (
          <svg id="area3" height={screen} width={screen}></svg>
      )}
      
    </div>
  )
}
export default Zeta;