// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as d3 from "d3";
// import "../css/chart.css";

// const BarGraph = () => {
//   // creating a valid dataset for bargraph.
//   const [stateCases, setStateCase] = useState([]);
//   const { data } = useSelector((state) => state.covidData);

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const transformedData = data.map((ele) => ({
//       state: ele.state,
//       positive: ele.positive,
//     }));

//     setStateCase(transformedData);
//   }, [data]);

//   // console.log(stateCases);

//   // creating graph component.

//   const svgRef = useRef();

//   useEffect(() => {
//     if (!stateCases || stateCases.length == 0) return;

//     // setting up dimentions
//     const width = 928;
//     const height = 600;
//     const margin = { top: 20, right: 30, bottom: 50, left: 60 };

//     // creating svg container
//     const svg = d3
//       .select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height)
//       .style("background", "#f5f5f5");

//     const x = d3
//       .scaleBand()
//       .domain(d3.sort(stateCases, d => -d.positive).map(d => d.state))
//       .range([margin.left, width - margin.right])
//       .padding(0.1);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(data, (d) => d.positive)])
//       .nice()
//       .range([height - margin.bottom, margin.top]);

//     // Clear previous SVG elements
//     svg.selectAll("*").remove();

//     // Append X Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0, ${height - margin.bottom})`)
//       .call(d3.axisBottom(x))
//       .selectAll("text")
//       .attr("transform", "rotate(-45)")
//       .style("text-anchor", "end");

//     // Append Y Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(${margin.left}, 0)`)
//       .call(d3.axisLeft(y));

//     // Append bars
//     svg
//       .selectAll(".bar")
//       .data(stateCases)
//       .enter()
//       .append("rect")
//       .attr("class", "bar")
//       .attr("x", (d) => x(d.state))
//       .attr("y", (d) => y(d.positive))
//       .attr("width", x.bandwidth())
//       .attr("height", (d) => height - margin.bottom - y(d.positive))
//       .attr("fill", "steelblue")
//       .on("mouseover", function (event, d) {
//         d3.select(this).attr("fill", "orange");
//       })
//       .on("mouseout", function (event, d) {
//         d3.select(this).attr("fill", "steelblue");
//       });
//   }, [stateCases]);

//   return (
//     <div className="chart-container">
//       <h1 className="chart-title">COVID-19 Cases by State (2021)</h1>
//       <div className="chart-wrapper">
//         <svg ref={svgRef} width={800} height={400}></svg>
//       </div>
//     </div>
//   );
// };

// export default BarGraph;

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import "../css/chart.css";

const BarGraph = () => {
  const [stateCases, setStateCase] = useState([]);
  const { data } = useSelector((state) => state.covidData);
  const svgRef = useRef();
  const tooltipRef = useRef();
  const legendData = [{ label: "Positive Cases", color: "steelblue" }];

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return;

    const transformedData = data
      .filter((ele) => ele.state && ele.positive !== undefined)
      .map((ele) => ({
        state: ele.state,
        positive: ele.positive,
      }));

    setStateCase(transformedData);
  }, [data]);

  useEffect(() => {
    if (!stateCases || stateCases.length === 0) return;

    const width = 1000;
    const height = 600;
    const margin = { top: 20, right: 30, bottom: 70, left: 60 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .call(zoom);

    // Tooltip Feature
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("background", "#FFF")
      .style("border", "1px solid #ddd")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("box-shadow", "2px 2px 6px rgba(0,0,0,0.2)")
      .style("opacity", 0)
      .style("pointer-events", "none");

    const x = d3
      .scaleBand()
      .domain(d3.sort(data, (d) => -d.positive).map((d) => d.state))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stateCases, (d) => d.positive) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Append Bars
    const bars = g
      .append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(stateCases)
      .join("rect")
      .attr("x", (d) => x(d.state))
      .attr("y", (d) => y(d.positive))
      .attr("height", (d) => height - margin.bottom - y(d.positive))
      .attr("width", x.bandwidth())
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", "orange");
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.state}</strong><br>Positive Cases: ${d.positive}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "steelblue");
        tooltip.style("opacity", 0);
      });

    // Added data above each bar
    const labels = g
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(stateCases)
      .join("text")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d) => `${Math.floor(d.positive / 100000)}L`)
      .attr("x", (d) => x(d.state) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.positive) - 5);

    // Legend Container
    const legend = g
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${width - margin.right - 100}, ${margin.top})`
      );

    legend
      .selectAll("legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`)
      .each(function (d) {
        d3.select(this)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", d.color);

        d3.select(this)
          .append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("font-size", "14px")
          .text(d.label);
      });

    // Append X Axis
    const xAxis = g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Append Y Axis (Remains Fixed)
    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Zoom Function (Only X-axis scales, Y-axis remains fixed)
    function zoom(svg) {
      const extent = [
        [margin.left, margin.top],
        [width - margin.right, height - margin.top],
      ];

      svg.call(
        d3
          .zoom()
          .scaleExtent([1, 5])
          // .translateExtent(extent)
          .extent(extent)
          .on("zoom", zoomed)
      );

      function zoomed(event) {
        const transform = event.transform;

        x.range(
          [margin.left, width - margin.right].map((d) => transform.applyX(d))
        );

        bars.attr("x", (d) => x(d.state)).attr("width", x.bandwidth());

        // Move labels with bars
        labels
          .attr("x", (d) => x(d.state) + x.bandwidth() / 2)
          .attr("y", (d) => y(d.positive) - 5);

        svg.select(".x-axis").call(d3.axisBottom(x));
      }

      function zoom(svg) {
        const extent = [
          [margin.left, margin.top],
          [width - margin.right, height - margin.top],
        ];

        svg.call(
          d3
            .zoom()
            .scaleExtent([1, 5]) // Zoom range: 1x to 5x
            .translateExtent(extent) // Allow panning only within the chart bounds
            .extent(extent)
            .on("zoom", zoomed) // Now zoomed is defined before usage
        );
      }
    }
  }, [stateCases]);

  return (
    <div className="chart-container">
      <h1 className="chart-title">COVID-19 Cases by State (2021)</h1>
      <div className="chart-wrapper">
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} className="tooltip"></div>
      </div>
    </div>
  );
};

export default BarGraph;
