import React from "react";
import Chart from "react-apexcharts";

const RadarChart = ({ data, labels }) => {
  const chartOptions = {
    chart: {
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: labels, // Dynamic labels (skills)
      labels: {
        style: {
          colors: "#1E1E1E", // Dark gray skill labels
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
    fill: {
      opacity: 0.3,
    },
    stroke: {
      width: 2,
      colors: ["#007BFF", "#7B7BFF"], // Colors for lines
    },
    markers: {
      size: 4,
    },
    legend: {
      show: false,
      position: "bottom",
      labels: {
        colors: "#374151", // Dark gray legend text
      },
    },
    colors: ["#007BFF", "#7B7BFF"], // Colors for datasets
  };

  const chartSeries = [
    {
      name: "Skill Level 1",
      data: data[0], // Dynamic dataset 1
    },
    {
      name: "Skill Level 2",
      data: data[1], // Dynamic dataset 2
    },
  ];

  return (
    <div className="p-8 bg-white rounded-3xl shadow-[0px_0px_4px_0px_#00000040] h-[420px]">
      <h3 className="text-[24px] font-semibold text-gray-800 ">Sub-skills</h3>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default RadarChart;
