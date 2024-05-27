import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Typography, useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Legend,
  ChartDataLabels
);

const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   display: true,
    //   position: 'top' as const,
    // },
    title: {
      display: false,
      text: '',
    },
    datalabels: {
      display: true,
      color: 'black',
      align: 'end' as const,
      anchor: 'end' as const
    },
  },
};

export default function CustomLineChart( graphData: any ) {

  const theme = useTheme();

  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Users',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
      tension: 0.1,
    }]
  };

  return (
    <>
      <Line options={options} data={data} />
      {/* { graphData.graphData 
          ? (<Pie options={options} data={data} width={300} />)
          : ( <Typography variant='labelsm'>Loading...</Typography> )
      } */}
    </>
    
  );
}
