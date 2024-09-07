"use client"
import { Line, Bar, Pie} from 'react-chartjs-2';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useState, useEffect } from 'react';
import CandleChart from "react-apexcharts";
import styles from './page.module.css'; 

// Registering the components - some might not be needed..
Chart.register(
  CategoryScale,    // For the x-axis type 'category'
  LinearScale,      // For the y-axis
  BarElement,       // For Bar charts
  PointElement,     // For Line chart points
  LineElement,      // For Line chart lines
  Title,            // For chart titles
  Tooltip,          // For tooltips
  Legend,           // For legends
  ArcElement        // For Pie charts
);  

const Dashboard = () => {
  const [candlestickData, setCandlestickData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    // Fetch data from the Django API
    const fetchData = async () => {
      try {

        const lineRes = await axios.get('http://localhost:8000/api/line-chart-data/');
        setLineData({
          labels: lineRes.data.labels,
          datasets: [
            {
              label: 'Line Chart',
              data: lineRes.data.data,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });

        const barRes = await axios.get('http://localhost:8000/api/bar-chart-data/');
        setBarData({
          labels: barRes.data.labels,
          datasets: [
            {
              label: 'Bar Chart',
              data: barRes.data.data,
              backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(75,192,192,0.6)'],
            },
          ],
        });

        const candlestickRes = await axios.get('http://localhost:8000/api/candlestick-data/');
        setCandlestickData({
          series: [{
            data: candlestickRes.data.data.map(item => {
              return {
                x: new Date(item.x),
                y: [item.open, item.high, item.low, item.close],
              };
            })
          }],
          options: {
            chart: {
              type: 'candlestick',
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }
        });

        const pieRes = await axios.get('http://localhost:8000/api/pie-chart-data/');
        setPieData({
          labels: pieRes.data.labels,
          datasets: [
            {
              label: 'Pie Chart',
              data: pieRes.data.data,
              backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)'],
            },
          ],
        })
        console.log('pieRes', pieRes);
        ;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };
    
    fetchData();
  }, []);

  if (!lineData || !barData || !pieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
    <div>
      <h2>Candlestick Chart</h2>
      <CandleChart options={candlestickData.options} series={candlestickData.series} type="candlestick" height={350} />
    </div>
    <div>
      <h2>Line Chart</h2>
      <Line data={lineData} />
    </div>
    <div>
      <h2>Bar Chart</h2>
      <Bar data={barData} />
    </div>
    <div>
      <h2>Pie Chart</h2>
      <Pie data={pieData} />
    </div>
  </div>   
  );
};

export default Dashboard;
