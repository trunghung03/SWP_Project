import React, { useState } from 'react';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar.js';
import '../../styles/Manager/ManagerStatistic.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect } from 'react';
import { AllCurrentProduct, GetSoldCategory } from '../../services/ManagerService/ManagerStatisticService.js';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
const ManagerStatitic = () => {
  const budget = 24000;
  const totalCustomers = 1600;
  const taskProgress = 75.5;
  const totalProfit = 15000;
  const [allCatePercentages, setAllCatePercentages] = useState([]);
  const [totalProduct, setTotalProduct] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProduct = await AllCurrentProduct();
        setTotalProduct(allProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = async (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (year) {
      const startMonth = `01-${year}`;
      const endMonth = `12-${year}`;
      const categoryPercentages = await GetSoldCategory(startMonth, endMonth); // Recursive call
      setAllCatePercentages(categoryPercentages);
    }
  };




  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        type: 'bar',
        data: [30, 50, 40, 60, 80, 70, 90, 100, 50, 60, 80, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-1', // Link to first y-axis
      },
      {
        label: 'Orders',
        type: 'line',
        data: [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y-axis-2', // Link to second y-axis
      },
    ],
  };

  const options = {
    scales: {
      'y-axis-1': {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Website Blog',
        },
      },
      'y-axis-2': {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
        title: {
          display: true,
          text: 'Social Media',
        },
      },
    },
  };
  const trafficSourceData = {
    labels: ['Ring', 'Earrings', 'Bracelets', 'Necklaces'],
    datasets: [
      {
        data: ,
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#36e873'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
      },
    ],
  };

  return (
    <div className="manager_statitic_all_container">
      <div className="manager_statitic_sidebar">
        <ManagerSidebar currentPage="manager_statitic" />
      </div>
      <div className="manager_statitic_content">

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Budget</h3>
              <p style={{ fontSize: '24px' }}>${budget.toLocaleString()}</p>
              <p style={{ color: 'green' }}>↑ 12% Since last month</p>
            </div>
            <div style={{ textAlign: 'center', flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Total Customers</h3>
              <p style={{ fontSize: '24px' }}>{totalCustomers.toLocaleString()}</p>
              <p style={{ color: 'red' }}>↓ 16% Since last month</p>
            </div>
            <div style={{ textAlign: 'center', flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Task Progress</h3>
              <p style={{ fontSize: '24px' }}>{taskProgress}%</p>
            </div>
            <div style={{ textAlign: 'center', flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Total Products</h3>
              <p style={{ fontSize: '24px' }}>{totalProduct}</p>
            </div>
          </div>
          <div>
            <i class="fas fa-filter"></i>
            <select id='listYear' name='year' required onChange={handleYearChange}>
              <option value="">Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '2', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Sales</h3>
              <Bar data={data} options={options} />
            </div>
            <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Category Sold</h3>
              <Doughnut data={trafficSourceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManagerStatitic;
