import React, { useState, useEffect } from 'react';
import ManagerSidebar from '../../components/ManagerSidebar/ManagerSidebar.js';
import '../../styles/Manager/ManagerStatistic.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { AllCurrentProduct, GetSoldCategory, TotalValue, TotalOrders,TotalCustomers } from '../../services/ManagerService/ManagerStatisticService.js';

const ManagerStatitic = () => {
  const budget = 24000;
  const taskProgress = 75.5;
  const totalProfit = 15000;
  const [allCatePercentages, setAllCatePercentages] = useState([]);
  const [totalProduct, setTotalProduct] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCustomers,setTotalCustomers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProduct = await AllCurrentProduct();
        setTotalProduct(allProduct);
        const customers = await TotalCustomers();
        setTotalCustomers(customers);
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

      // Reset the data when year changes
      setAllCatePercentages([]);
      setTotalOrders(null);
      setTotalValue(null);
      setLoading(true);

      try {
        const categoryPercentages = await GetSoldCategory(startMonth, endMonth);
        setAllCatePercentages(categoryPercentages.length > 0 ? categoryPercentages : []);
        
        const soldOrders = await TotalOrders(year);
        setTotalOrders(soldOrders.length > 0 ? soldOrders : Array(12).fill(0));
        
        const soldValue = await TotalValue(year);
        setTotalValue(soldValue.length > 0 ? soldValue : Array(12).fill(0));
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalOrders(Array(12).fill(0));
        setTotalValue(Array(12).fill(0));
      } finally {
        setLoading(false);
      }
    }
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Value',
        type: 'bar',
        data: totalValue || Array(12).fill(0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Orders',
        type: 'line',
        data: totalOrders || Array(12).fill(0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y-axis-2',
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
          text: 'Value',
        },
      },
      'y-axis-2': {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Orders',
        },
      },
    },
  };

  const trafficSourceData = {
    labels: allCatePercentages.map(item => item.category),
    datasets: [
      {
        data: allCatePercentages.map(item => item.percentage),
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#36e873', '#FFA500', '#800080', '#FF4500'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#36e873', '#FFA500', '#800080', '#FF4500'],
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
              <p style={{ fontSize: '24px', color: 'green' }}>{totalCustomers}</p>
              <p style={{ color: 'red' }}></p>
            </div>
            <div style={{ textAlign: 'center', flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Task Progress</h3>
              <p style={{ fontSize: '24px' }}>{taskProgress}%</p>
            </div>
            <div style={{ textAlign: 'center', flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Total Products</h3>
              <p style={{ fontSize: '24px',color: 'green' }}>{totalProduct}</p>
            </div>
          </div>
          <div>
            <i className="fas fa-filter"></i>
            <select id='listYear' name='year' required onChange={handleYearChange}>
              <option value="">Year</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '2', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Sales</h3>
              {loading ? (
                <p>Loading...</p>
              ) : totalValue && totalOrders ? (
                <Bar data={data} options={options} />
              ) : (
                <p>No data available for the selected year</p>
              )}
            </div>
            <div style={{ flex: '1', margin: '10px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <h3>Category Sold</h3>
              {allCatePercentages.length > 0 ? (
                <Doughnut data={trafficSourceData} />
              ) : (
                <p>Please choose the year to see report</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerStatitic;
