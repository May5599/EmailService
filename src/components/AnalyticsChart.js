import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AnalyticsChart() {
  const [chartData, setChartData] = useState({
    labels: ['Open Rate', 'Click-Through Rate'],
    datasets: [
      {
        label: 'Email Performance',
        data: [0, 0], // Placeholder
        backgroundColor: ['#3b82f6', '#10b981'],
        borderRadius: 8,
        borderColor: ['#1e40af', '#064e3b'], // Dark borders to contrast
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    // Simulate fetching data with random values
    function fakeData() {
      const openRate = Math.floor(Math.random() * 100); // Random open rate between 0-100
      const clickRate = Math.floor(Math.random() * 100); // Random click rate between 0-100

      setChartData({
        labels: ['Open Rate', 'Click-Through Rate'],
        datasets: [
          {
            label: 'Email Performance',
            data: [openRate, clickRate],
            backgroundColor: ['#3b82f6', '#10b981'],
            borderRadius: 8,
            borderColor: ['#1e40af', '#064e3b'],
            borderWidth: 2,
          },
        ],
      });
    }

    fakeData();

    // Update data periodically for a more dynamic effect (optional)
    const interval = setInterval(fakeData, 5000); // Update every 5 seconds for example
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-screen-xl p-4">
        {/* Chart component */}
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Email Analytics',
                color: '#fff', // Title text color
              },
              tooltip: {
                backgroundColor: '#333', // Tooltip background color
                titleColor: '#fff', // Tooltip title color
                bodyColor: '#fff', // Tooltip body color
              },
            },
            scales: {
              x: {
                ticks: {
                  color: '#fff', // X-axis labels color
                },
                grid: {
                  color: '#444', // X-axis grid lines color
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 10,
                  max: 100,
                  color: '#fff', // Y-axis labels color
                },
                grid: {
                  color: '#444', // Y-axis grid lines color
                },
              },
            },
            layout: {
              padding: 20,
            },
          }}
        />
      </div>
    </div>
  );
}
