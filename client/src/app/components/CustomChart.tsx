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
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

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

export default function CustomLineChart({ graphData, isLoading }: any ) {
  const keys = graphData ? Object.keys(graphData) : [];
  const values = graphData ? Object.values(graphData) : [];
  const theme = useTheme();

  const labels = keys;
  const data = {
    labels: labels,
    datasets: [{
      label: 'Users',
      data: values,
      fill: false,
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
      tension: 0.1,
    }]
  };

  return (
    <>
      {!isLoading ? (
        <Line options={options} data={data} />
      ) : (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
            <CircularProgress />
        </Box>
      )}
    </>
    
  );
}
