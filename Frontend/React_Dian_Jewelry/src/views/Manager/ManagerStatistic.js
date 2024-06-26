import React, { useState, useEffect } from "react";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar.js";
import "../../styles/Manager/ManagerStatistic.scss";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  AllCurrentProduct,
  GetSoldCategory,
  TotalValue,
  ShowProfitByYear,
  TotalOrders,
  DailyStats,
  TotalCustomers,
  getDateStatistic,
  getTopTen,
} from "../../services/ManagerService/ManagerStatisticService.js";
import { styled } from "@mui/material/styles";
import logo from "../../assets/img/logoN.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// const RenderProfitData = ({ profitData, profitOptions }) => {
//   console.log("RenderProfitData:::", profitData);
//   return <Line data={profitData} options={profitOptions} />;
// };

const ManagerStatitic = () => {
  const formatDate = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  };

  const getCurrentMonthYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Ensure month is 2 digits
    return `${year}-${month}`;
  };

  const taskProgress = 75.5;
  const [allCatePercentages, setAllCatePercentages] = useState([]);
  const [totalProduct, setTotalProduct] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [valueByDate, setValueByDate] = useState([]);
  const [currentMonthStats, setCurrentMonthStats] = useState([]);
  const [profitByYear, setProfitByYear] = useState(null);
  const [topTen, setTopTen] = useState([]);
  const [localDate,setLocalDate]= useState();
  const [monthYear,setMonthYear]= useState();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#f9c6bb",
      color: "1c1c1c",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));


  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toISOString().slice(0, 7);
    setMonthYear(currentMonth);
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setLocalDate(formattedDate);
    console.log("Formatted Date: " + formattedDate);
    const fetchData = async () => {
      try {
        const allProduct = await AllCurrentProduct();
        setTotalProduct(allProduct);
        const customers = await TotalCustomers();
        setTotalCustomers(customers);
        const topProducts = await getTopTen();
        setTopTen(topProducts);
        await handleYearChange({ target: { value: currentYear.toString() } });
        await profitYear({ target: { value: currentYear.toString() } });
        await MonthYearStats({ target: { value: currentMonth } });
        await dailyStats(formattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const MonthYearStats = async (event) => {
    const monthYear = event.target.value;
    const formattedMonthYear = monthYear;
    const response = await getDateStatistic(formattedMonthYear);
    setCurrentMonthStats(response);
  };

  const dailyStats = async (date) => {
    if (date) {
      const dailyValues = await DailyStats(date);
      setValueByDate(dailyValues);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    dailyStats(selectedDate);
  };

  const profitYear = async (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (year) {
      setLoading(true);
      try {
        const profit = await ShowProfitByYear(year);
        setProfitByYear(profit);
        setProfitData({
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Profit",
              data: profit,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setProfitByYear(Array(12).fill(0)); // Default to zero data
      } finally {
        setLoading(false);
      }
    }
  };

  const handleYearChange = async (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    if (year) {
      const startMonth = `01-${year}`;
      const endMonth = `12-${year}`;
      setAllCatePercentages([]);
      setTotalOrders(null);
      setTotalValue(null);
      setLoading(true);
      try {
        const categoryPercentages = await GetSoldCategory(startMonth, endMonth);
        setAllCatePercentages(
          categoryPercentages.length > 0 ? categoryPercentages : []
        );
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
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Value",
        type: "bar",
        data: totalValue || Array(12).fill(0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        yAxisID: "y-axis-1",
      },
      {
        label: "Orders",
        type: "line",
        data: totalOrders || Array(12).fill(0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y-axis-2",
      },
    ],
  };

  const [profitData, setProfitData] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Profit",
        type: "line",
        data: profitByYear || Array(12).fill(0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const profitOptions = {
    scales: {
      y: {
        min: -5500,
        max: 2500,
        stepSize: 500,
      },
      x: {
        // Add customizations for x-axis if needed
      },
    },
  };

  const options = {
    scales: {
      "y-axis-1": {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
      "y-axis-2": {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Orders",
        },
      },
    },
  };

  const trafficSourceData = {
    labels: ["Rings", "Earrings", "Bracelets", "Necklaces"],
    datasets: [
      {
        data: allCatePercentages.map((item) => item.percentage),
        backgroundColor: [
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36e873",
          "#FFA500",
          "#800080",
          "#FF4500",
        ],
        hoverBackgroundColor: [
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36e873",
          "#FFA500",
          "#800080",
          "#FF4500",
        ],
      },
    ],
  };

  return (
    <div className="manager_statitic_all_container">
      <div className="manager_statitic_sidebar">
        <ManagerSidebar currentPage="manager_statistic" />
      </div>
      <div
        className="manager_statitic_content"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
        </div>
        <hr className="manager_header_line"></hr>
        <h3 className="manager_manage_statistic_title">Statistic Report</h3>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <input
            className="manager_statis_input_date"
            type="date"
            value={localDate}
            onChange={handleDateChange}
            style={{ marginLeft: '4.2%' }}
          ></input>
          <div>
            <div
              className="manager_manage_report_div1"
              style={{
                display: "flex",
                padding: "20px",
              }}
            >
              {/* <h3>Today's Report</h3> */}
              <div className="manager_manage_report_div">
                <p style={{ fontSize: "20px" }}>Total Orders:</p>
                <p style={{ textAlign: "center" }}>{valueByDate?.totalOrders !== undefined
                  ? valueByDate.totalOrders
                  : "N/A"}</p>
              </div>
              <div className="manager_manage_report_div">
                <p style={{ fontSize: "20px" }}>Total Customers:</p>
                <p style={{ textAlign: "center" }}> {valueByDate?.totalCustomers !== undefined
                  ? valueByDate.totalCustomers
                  : "N/A"}</p>
              </div>
              <div className="manager_manage_report_div">
                <p style={{ fontSize: "20px" }}>Total Sales Value: </p>
                <p style={{ textAlign: "center" }}>{valueByDate?.totalSales !== undefined
                  ? valueByDate.totalSales
                  : "N/A"}</p>
              </div>
              <div className="manager_manage_report_div">
                <p
                  style={{
                    fontSize: "20px"
                  }}
                >
                  {" "}
                  Profit:{" "}
                </p>
                <p style={{ textAlign: "center", fontSize: "15px", color: valueByDate?.profit > 0 ? "green" : "red" }}>{valueByDate?.profit !== undefined ? valueByDate.profit : "N/A"}</p>
              </div>
              <div className="manager_manage_report_div">
                <p style={{ fontSize: "20px" }}>Prime Cost: </p>
                <p style={{ textAlign: "center" }}>{valueByDate?.primeCost !== undefined
                  ? valueByDate.primeCost
                  : "N/A"}</p>
              </div>
            </div>
            {/* <div
              className="manager_manage_report_div"
              style={{
                textAlign: "center",
                flex: "1",
                margin: "10px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3>Total Customers</h3>
              <p style={{ fontSize: "24px", color: "green" }}>
                {totalCustomers}
              </p>
              <p style={{ color: "red" }}></p>
            </div> */}
            {/* <div
              className="manager_manage_report_div"
              style={{
                textAlign: "center",
                flex: "1",
                margin: "10px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3>Task Progress</h3>
              <p style={{ fontSize: "24px" }}>{taskProgress}%</p>
            </div> */}
            {/* <div
              className="manager_manage_report_div"
              style={{
                textAlign: "center",
                flex: "1",
                margin: "10px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3>Total Products</h3>
              <p style={{ fontSize: "24px", color: "green" }}>{totalProduct}</p>
            </div> */}
          </div>
          <div className="manager_manage_report_filter">
            <i className="fas fa-filter" style={{ paddingTop: 30 }}></i>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="listYear-label">Year</InputLabel>
              <Select
                labelId="listYear-label"
                id="listYear"
                // name="year"
                value={selectedYear}
                onChange={handleYearChange}
                autoWidth
                label="Year"
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              clasName="manager_manage_display_chart"
              style={{
                flex: "2",
                margin: "10px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3>Sales</h3>
              {loading ? (
                <p>Loading...</p>
              ) : totalValue && totalOrders ? (
                <Bar data={data} options={options} />
              ) : (
                <p>No data available for the selected year</p>
              )}
            </div>
            <div
              style={{
                flex: "1",
                margin: "10px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h3>Category Sold</h3>
              {allCatePercentages.length > 0 ? (
                <Doughnut data={trafficSourceData} />
              ) : (
                <p>Please choose the year to see report</p>
              )}
            </div>
          </div>
          <div className="manager_manage_report_filter">
            <i className="fas fa-filter" style={{ paddingTop: 30 }}></i>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="listYear-label">Year</InputLabel>
              <Select
                labelId="listYear-label"
                id="listYear"
                name="year"
                onChange={profitYear}
                autoWidth
                value={selectedYear}
                label="Year"
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              flex: "1",
              margin: "10px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >

            <div>
              <h3>Profit</h3>
              {loading ? (
                <p>Loading...</p>
              ) : profitByYear ? (
                <Line data={profitData} options={profitOptions} />
              ) : (
                <p>No data available for the selected year</p>
              )}
            </div>
          </div>
          <div className="manager_manage_diamond_table_wrapper">
            <h3>Top 10 Selling Products</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Line Total</StyledTableCell>
                    <StyledTableCell align="center">
                      Product Code
                    </StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Items Sold</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topTen.length > 0 ? (
                    topTen.map((item) => (
                      <TableRow
                        className="manager_manage_table_body_row"
                        key={item.productCode}
                      >
                        <TableCell align="center">{item.productCode}</TableCell>
                        <TableCell align="center">{item.name}</TableCell>
                        <TableCell align="center">{item.lineTotal}</TableCell>
                        <TableCell align="center">{item.itemSold}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="9">No data to display</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="manager_manage_diamond_table_wrapper">
            <input
              className="manager_statis_input_date"
              type="month"
              value={monthYear}
              onChange={MonthYearStats}
              style={{ margin: "10px" }}
            ></input>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">
                      Total Sales
                    </StyledTableCell>
                    <StyledTableCell align="center">Prime Cost</StyledTableCell>
                    <StyledTableCell align="center">Profit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentMonthStats.length > 0 ? (
                    currentMonthStats.map((item) => (
                      <TableRow
                        className="manager_manage_table_body_row"
                        key={item.date}
                      >
                        <TableCell align="center">{item.date}</TableCell>
                        <TableCell align="center">{item.totalSales}</TableCell>
                        <TableCell align="center">{item.primeCost}</TableCell>
                        <TableCell align="center">{item.profit}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="9">
                        No Empty Date Statistic found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerStatitic;
