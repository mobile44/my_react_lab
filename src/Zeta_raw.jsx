import React, {useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import "d3-time-format";
import "./Zeta.css";
//import globalBrand from "./data/global_brands.csv";

const parseTime = d3.timeParse("%d-%b-%y");
const format = d3.timeFormat("%d-%b-%y");

const lineData = [
  {x:10,y:20},
  {x:20,y:50},
  {x:80,y:90}
]
/*
const drawChart = async(props)=>{
  let data = await d3.csv(require("./data/linedata.csv"));
  const margin = {top: 10, right: 40, bottom: 30, left: 30},
      width = props.winWidth - margin.left - margin.right,
      height = props.winWidth - margin.top - margin.bottom;
  
  const svgContainer = d3
    .select("#area4")
    .append("svg")
    .attr("width",width + margin.left + margin.right)
    .attr("height",height + margin.top + margin.bottom)
    .append("g")
    .style("color","blue")
    .attr("transform",`translate(${margin.left},${margin.top})`)

  const tooltip = d3
    .select('#area4')
    .append('div')
    .attr('class','tooltip')
    .style('opacity',0);

  svgContainer
    .append("text")
    .attr("class",'tooltip_text');
  
  const text = d3.select('.tooltip_text');

  const xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
  svgContainer
      .append("g")
      .attr("transform",`translate(0,${height})`)
      .call(d3.axisBottom(xScale));
  const yScale = d3.scaleLinear().domain([0,100]).range([height,0]);
  svgContainer.append("g").call(d3.axisLeft(yScale));

  const valueLine = d3.line()
    .x((d)=>{return xScale(d.x);})
    .y((d)=>{return yScale(d.y);})

  svgContainer
    .append("path")
    .data([data])
    .attr("class","line")
    .attr("d",valueLine);

  let i = 0;
  data.forEach((d)=>{
    svgContainer
      .append("circle")
      .data(data)
      .attr("cx",xScale(d.x))
      .attr("cy",yScale(d.y))
      .attr("r",7)
      .attr("class",`zetaDot${i}`)
      .on('mouseout',()=>{
        text
          .style('opacity',0);
        tooltip
          .style('opacity',0);
      })
      .on('mousehover',()=>{
        text
          .style('opacity',1);
        tooltip
          .style('opacity',1);
      })
      .on('mousemove',mousemove);
    
    i++;
  });

  

  function mousemove(event) {
    const bisect = d3.bisector(d=>d.y).left;
    const xPos = d3.pointer(event,this)[0];
    const x0 = bisect(data, xScale.invert(xPos));
    const d0 = data[x0];
    text
      .style('opacity',1)
      .style('font-weight','bold')
      .attr('transform',`translate(${xScale(d0.x)+20},${yScale(d0.y)})`)
      .html(d0.x+`,`+d0.y);
    tooltip
      .style('opacity',1);
    tooltip
      .text('hello') //`${d0.x}<br>${d0.y}`
      .attr(
        'transform',
        `translate(${xScale(d0.x) + 30},${yScale(d0.y) - 30})`,
      );
  };
};
*/
const createGraph = async(screenWidth)=>{
  let data = await d3.csv(require("./data/line_data.csv"));
  data.forEach((d)=>{
    d.date = parseTime(d.date);
    d.close = +d.close;
  });
  data = data.sort((a,b)=>+a.date - +b.date);
  const margin={top:20,right:20,bottom:50,left:70},
      width = screenWidth - margin.left - margin.right,
      height = screenWidth - margin.top - margin.bottom;
  const svgContainer = d3
    .select("#area3")
    .append("svg")
    .attr("width",width+margin.left+margin.right)
    .attr("height",height+margin.top+margin.bottom)
    .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleTime().range([0,width]);
  xScale.domain(d3.extent(data,(d)=>{return d.date;}));
  
  svgContainer
    .append("g")
    .attr("transform",`translate(0,${height})`)
    .call(d3.axisBottom(xScale));
  
  const yScale = d3.scaleLinear().range([height,0]);
  yScale.domain([0,d3.max(data,(d)=>{return d.close;})]);
  
  svgContainer
    .append("g")
    .call(d3.axisLeft(yScale));
  /*
  svg3
    .append("text")
    .attr("class","tooltip_text");

  const text = d3.select(".tooltip_text");
  
  const valueLine = d3.line()
    .x((d)=>{return x2(d.date);})
    .y((d)=>{return y2(d.close);})
  svg3
    .append("path")
    .data([data2])
    .attr("class","line")
    .attr("d",valueLine);

  const tooltip = svg3
    //.select("#area3")
    .append('div')
    .attr('class','tooltip')
    .style('opacity',0)
    .style("border","solid")
    .style("border-width","2px")
    .style("border-radius","5px")
    .style("padding", "5px");

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
      tooltip.style("opacity",1);
    },mousemove)
    .on('mouseout',()=>{
      tooltip
        .transition()
        .duration(300)
        .style('opacity',0);
      text
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
    text
      .style('opacity',1)
      .style('font-weight','bold')
      .attr('transform',`translate(${x2(d0.date)+20},${y2(d0.close)})`)
      .text(d0.close + " " + format(d0.date));
    tooltip
      .transition()
      .duration(300)
      .style('opacity',0.9);
    tooltip
      .html("hello") //(d0.tooltipContent || d0.date)
      .style(
        'transform',
        `translate(${x2(d0.date)+30},${y2(d0.close)-30})`,
      );
    
  }*/
};

function Zeta() {
  const [screen, setScreen] = useState(window.innerWidth);
  //const [loading, setLoading] = useState(true);
  //const [data, setData] = useState([]);
  useEffect(()=>{
    const changeWidth = () => {
      setScreen(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth);

    return () => {
      window.removeEventListener('resize', changeWidth);
    }
    console.log(screen);
  },[])
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
    */
    /*
    
    const margin = {top: 10, right: 40, bottom: 30, left: 30},
      width = props.winWidth - margin.left - margin.right,
      height = props.winWidth - margin.top - margin.bottom;
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
    if (screen>=900) {
      createGraph(screen-250);
    } else {
      createGraph(screen);
    }
    
    
    /*
    drawChart(props);
    */
  },[]);
  /*useEffect(()=>{
    const svgGhost = d3.select("#area3");
    svgGhost.selectAll('*').remove();
  })*/
  /*
  useEffect(()=>{
    setScreen(props.winWidth);
    
    const fetchData = async()=>{
      await d3.csv(require("./data/line_data.csv")).then((d)=>{
        setData(d);
        setLoading(false);
      });
    };
    fetchData();
    data.forEach((d)=>{
      d.date = parseTime(d.date);
      d.close = +d.close;
    });
    setData(data.sort((a,b)=>+a.date - +b.date));
    const margin={top:10,right:30,bottom:50,left:30},
      width = props.winWidth - margin.left - margin.right,
      height = props.winWidth - margin.top - margin.bottom;
    const svgContainer = d3
      .select("#area3")
      .append("svg")
      .attr("width",width+margin.left+margin.right)
      .attr("height",height+margin.top+margin.bottom)
      .append("g")
      .style("color","blue")
      .attr("transform",`translate(${margin.left},${margin.top})`);
    const xScale = d3.scaleTime().range([0,width]);
    xScale.domain(d3.extent(data,(d)=>{return d.date;}));
    svgContainer
    .append("g")
    .attr("transform",`translate(0,${height})`)
    .call(d3.axisBottom(xScale));
    
  });*/


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
      */}
      {/*
      {(props.winWidth>=900) && (
        <svg id="area2" height={screen} width={screen-200}></svg>
      )}
      {(props.winWidth<900) && (
        <svg id="area2" height={screen} width={screen}></svg>
      )}
      */}
      {/*
      {loading &&
        <div>Loading...</div>
      }
      */}
      {/*
      {!loading &&
        <div>{data.length}</div>
      }
      */}
      {(screen>=900) && (
          <svg id="area3" height={screen} width={screen-250}></svg>
      )}
      {(screen<900) && (
          <svg id="area3" height={screen} width={screen}></svg>
      )}
      {/*
      {(props.winWidth>=900) && (
        <svg id="area4" height={screen} width={screen-200}></svg>
      )}
      {(props.winWidth<900) && (
        <svg id="area4" height={screen} width={screen}></svg>
      )}
      */}
    </div>
  )
}
export default Zeta;