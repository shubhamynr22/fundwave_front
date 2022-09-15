import React, { useEffect, useState, useRef } from "react";
// import { Chart } from "chart.js/auto";
import { Chart, registerables } from "chart.js";
import moment from "moment";
Chart.register(...registerables);

const BarChart = ({ data, setData }) => {
  const canavsRef = useRef(null);

  useEffect(() => {
    const month = data.filter((el) => {
      return { month: moment(el.perioddate).month(), data: el.visits };
    });

    let x = month.map((el) => el.month);
    let y = month.map((el) => el.visits);

    const ctx = canavsRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: x,
        datasets: [
          {
            label: "# of Votes",
            data: y,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "auto",
        height: "450px",
      }}
    >
      <canvas ref={canavsRef} id="barGraph" width="300" height="300"></canvas>
    </div>
  );
};

export default BarChart;
