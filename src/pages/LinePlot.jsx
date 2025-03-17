import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";
import "../css/chart.css";

const LinePlot = () => {
  const { data, theme } = useSelector((state) => state.covidData);
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [covidData, setCovidData] = useState([]);

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return;

    const transformedData = data
      .filter((d) => d.death !== undefined && d.positive !== undefined)
      .map((d) => ({
        death: d.death,
        positive: d.positive,
      }))
      .sort((a, b) => a.positive - b.positive);

    setCovidData(transformedData);
  }, [data]);

  useEffect(() => {
    if (!covidData || covidData.length === 0) return;

    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 100, bottom: 70, left: 80 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "auto");

    svg.selectAll("*").remove();

    // tooltip Feature

    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ddd")
      .style("padding", "8px")
      .style("border-radius", "4px")
      .style("box-shadow", "rgba(0,0,0,0.2)")
      .style("opacity", 0)
      .style("pointer-events", "none");

    // X-axis: Positive Cases
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(covidData, (d) => d.positive)])
      .nice()
      .range([margin.left, width - margin.right]);

    // Y-axis: Death Cases
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(covidData, (d) => d.death)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Line Generator
    const line = d3
      .line()
      .x((d) => x(d.positive))
      .y((d) => y(d.death))
      .curve(d3.curveBasis);
    //   .curve(d3.curveStep)
    //   .curve(d3.curveLinear)
    //   .curve(d3.curveMonotoneX);

    // Append Line
    svg
      .append("path")
      .datum(covidData)
      .attr("fill", "none")
      .attr("stroke", theme === "light" ? "steelblue" : "#ffcc00")
      .attr("stroke-width", 2)
      .attr("d", line);

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format(".2s")));

    // Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(6).tickFormat(d3.format(".2s")));

    // X-axis Label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .style("text-anchor", "middle")
      .text("Positive Cases");

    // Y-axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .text("Death Cases");

    // Append Circles for Data Points
    svg
      .selectAll(".circle-positive")
      .data(covidData)
      .enter()
      .append("circle")
      .attr("class", "circle-positive")
      .attr("cx", (d) => x(d.positive))
      .attr("cy", (d) => y(d.death))
      .attr("r", 4)
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(
            `Positive Cases: ${d.positive} <br /> Death Cases: <strong>${d.death}</strong>`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });
  }, [covidData, theme]);

  return (
    <div className="chart-container">
      <h1
        className="chart-title"
        style={{ color: theme === "dark" ? "#FFF" : "" }}
      >
        COVID-19 Death vs Positive Cases Line Graph (2021)
      </h1>
      <div className="chart-wrapper">
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef} className="tooltip"></div>
      </div>
      <p>The graph shows death cases vs positive cases.</p>
    </div>
  );
};

export default LinePlot;
