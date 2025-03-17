// import React, { useEffect, useState, useRef } from "react";
// import * as d3 from 'd3';

// const Practice = () => {

//     const [barData, setBarData] = useState([10,20,30,50,40]);

//     const barData1 = [
//         {
//             name:'A',
//             age:25
//         },
//         {
//             name:'B',
//             age:14
//         },
//         {
//             name:'C',
//             age:36
//         },
//         {
//             name:'D',
//             age:55
//         },
//         {
//             name:'E',
//             age:63
//         },
//     ]

//     const maxAge = d3.max(barData1, d => d.age)

//     const width = 50;
//     const maxHeight = 100;
//     const maxHeight1 = maxAge + 50;

//     const margin = {
//         top:10,
//         right:90,
//         left:20,
//         bottom:90
//     }

//     const myElementRef = useRef(null)

//     useEffect(()=>{
//         // const svg = d3.select(myElementRef.current).select('rect').datum(barData);

//         // // console.log(allRect)

//         // const allRectData = d3.select(myElementRef.current).selectAll('rect').data(barData)

//         // console.log(allRectData)

//         // const svg = d3.select(myElementRef.current);

//         // const allRectData = svg.selectAll('rect').data(barData);

//         // console.log(allRectData)

//         // allRectData
//         //     .attr('width', width)
//         //     .attr('height', d => {return d})
//         //     .attr('stroke-width', 3)
//         //     .attr('stroke-dasharay', '5 5')
//         //     .attr('stroke','black')
//         //     .attr('x', (d, i) =>{ return i*width})
//         //     .attr('y', (d, i) =>{ return maxHeight - d })
//         //     .attr('fill', 'pink')

//         // In this we dynamically allot all the bar data and its
//         const svg = d3.select(myElementRef.current);
//         const rect = svg.selectAll('rect').data(barData1).enter().append('rect')

//         rect
//             .attr('x', (d,i) => {
//                 return i*width + margin.left;
//             })
//             .attr('width', width)
//             .attr('height', d => {return d.age})
//             .attr('stroke', 'gray')
//             .attr('y', (d, i) => {
//                 return maxHeight1 - d.age + margin.top
//             })
//             .attr('stroke-width', 2)
//             .attr('stroke-dasharrya', '5 5')
//             .attr('fill', 'pink')

//         svg.append('line')
//             .attr('x1', margin.left)
//             .attr('y1', margin.top + 110)
//             .attr('x2', margin.left + (width*barData1.length) + width/2)
//             .attr('y2', margin.top + maxHeight1)
//             .attr('stroke', 'black')
//             .attr('stroke-width', 2)

//     },[])

//   return (
//     <>
//         <div>
//             <h3>Bar Graph</h3>
//             <svg
//             ref={myElementRef}
//             height={maxHeight1 + margin.top }
//             style={{border:'1px dashed'}}
//             >
//                 {/* <rect />
//                 <rect />
//                 <rect />
//                 <rect />
//                 <rect /> */}
//             </svg>
//         </div>
//     </>

//   );
// };

// export default Practice;

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function LinePlot({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  const gx = useRef();
  const gy = useRef();

  // Define scales
  const x = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);
  const y = d3
    .scaleLinear()
    .domain(d3.extent(data))
    .range([height - marginBottom, marginTop]);

  // Define line generator
  const line = d3
    .line()
    .x((d, i) => x(i))
    .y((d) => y(d));

  // Render X-Axis
  useEffect(() => {
    d3.select(gx.current).call(d3.axisBottom(x));
  }, [x]);

  // Render Y-Axis
  useEffect(() => {
    d3.select(gy.current).call(d3.axisLeft(y));
  }, [y]);

  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (
          <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
}
