import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import logo from "../../assets/img/logoN.png";
import ManagerSidebar from "../../components/ManagerSidebar/ManagerSidebar.js";
import {
  AllCurrentProduct,
  DailyStats,
  GetSoldCategory,
  ShowProfitByYear,
  TotalCustomers,
  TotalOrders,
  TotalValue,
  getDateStatistic,
  getTopTen,
} from "../../services/ManagerService/ManagerStatisticService.js";
import "../../styles/Manager/ManagerStatistic.scss";
import { toast } from "sonner";

const ManagerStatitic = () => {
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const getCurrentMonthYear = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is 2 digits
    return `${year}-${month}`;
  };

  const taskProgress = 75.5;
  const [allCatePercentages, setAllCatePercentages] = useState([]);
  const [totalProduct, setTotalProduct] = useState(null);
  const [selectedYearForSale, setSelectedYearForSale] = useState("");
  const [selectedYearForProfit, setSelectedYearForProfit] = useState("");
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalValue, setTotalValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [valueByDate, setValueByDate] = useState([]);
  const [currentMonthStats, setCurrentMonthStats] = useState([]);
  const [profitByYear, setProfitByYear] = useState(null);
  const [topTen, setTopTen] = useState([]);
  const [localDate, setLocalDate] = useState();
  const [monthYear, setMonthYear] = useState();
  const [minProfit, setMinProfit] = useState();
  const [chosenDate, setChosenDate] = useState();
  const [chosenMonth, setChosenMonth] = useState();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#faecec",
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
        setChosenMonth(currentMonth);
        setChosenDate(formattedDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const MonthYearStats = async (event) => {
    const monthYear = event.target.value;
    const formattedMonthYear = monthYear;
    toast.promise(getDateStatistic(formattedMonthYear), {
      loading: "Loading...",
      success: (res) => {
        setCurrentMonthStats(res);
        return "Data loaded successfully";
      },
      error: "Failed to load data",
    });
    setChosenMonth(monthYear);
  };

  const dailyStats = async (date) => {
    if (date) {
      const dailyValues = await DailyStats(date);
      toast.promise(DailyStats(date), {
        loading: "Loading...",
        success: (res) => {
          setValueByDate(res);
          return "Data loaded successfully";
        },
        error: "Failed to load data",
      });

      // setValueByDate(dailyValues);
      setChosenDate(date);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    dailyStats(selectedDate);
  };

  const profitYear = async (event) => {
    const year = event.target.value;
    setSelectedYearForProfit(year);
    if (year) {
      setLoading(true);
      try {
        const profit = await ShowProfitByYear(year);
        setMinProfit(Math.min(profit));
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
    setSelectedYearForSale(year);
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
        min: minProfit,
        max: 80500,
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
      <div className="manager_statitic_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
        </div>
        <hr className="manager_header_line"></hr>
        <h3
          className="manager_manage_statistic_title"
          style={{ fontFamily: "serif", color: "#292727" }}
        >
          Statistic Report
        </h3>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          Date:
          <input
            className="manager_statis_input_date"
            type="date"
            value={chosenDate}
            onChange={handleDateChange}
            style={{ margin: "10px" }}
          />
          <div className="manager_manage_report_div1_wrapper">
            <div
              className="manager_manage_report_div1"
              style={{
                display: "flex",
                // padding: "20px",
                marginTop: "10px",
                marginBottom: "50px",
                justifyContent: "center",
              }}
            >
              {/* <h3>Today's Report</h3> */}
              <div
                className="manager_manage_report_div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center", // Ensures vertical centering if needed
                }}
              >
                <i
                  className="fa fa-shopping-cart manager_icon_style"
                  style={{
                    color: "#2985fb",
                    marginBottom: "4.3%",
                    marginTop: "1.8%",
                  }}
                  aria-hidden="true"
                ></i>{" "}
                {/* Icon for Total Orders */}
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Total Orders:
                </p>
                <p style={{ textAlign: "center" }}>
                  {valueByDate?.totalOrders !== undefined
                    ? valueByDate.totalOrders
                    : "N/A"}
                </p>
              </div>
              <div
                className="manager_manage_report_div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center", // Ensures vertical centering if needed
                }}
              >
                <i
                  className="fa fa-users manager_icon_style"
                  style={{
                    color: "#36e873",
                    marginBottom: "4.3%",
                    marginTop: "1.8%",
                  }}
                  aria-hidden="true"
                ></i>{" "}
                {/* Icon for Total Customers */}
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Total Customers:
                </p>
                <p style={{ textAlign: "center" }}>
                  {" "}
                  {valueByDate?.totalCustomers !== undefined
                    ? valueByDate.totalCustomers
                    : "N/A"}
                </p>
              </div>
              <div
                className="manager_manage_report_div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center", // Ensures vertical centering if needed
                }}
              >
                <i
                  className="fa fa-dollar-sign manager_icon_style"
                  style={{
                    color: "#f2d017",
                    marginBottom: "4.3%",
                    marginTop: "1.8%",
                  }}
                  aria-hidden="true"
                ></i>{" "}
                {/* Icon for Total Sales Value */}
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Total Sales Value:{" "}
                </p>
                <p style={{ textAlign: "center" }}>
                  {valueByDate?.totalSales !== undefined
                    ? valueByDate.totalSales
                    : "N/A"}
                </p>
              </div>
              <div
                className="manager_manage_report_div"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center", // Ensures vertical centering if needed
                }}
              >
                <i
                  className="fa fa-chart-line manager_icon_style"
                  style={{
                    color: "#36e873",
                    marginBottom: "4.3%",
                    marginTop: "1.8%",
                  }}
                  aria-hidden="true"
                ></i>{" "}
                {/* Icon for Profit */}
                <p
                  style={{
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  Profit:
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    color: valueByDate?.profit > 0 ? "green" : "red",
                  }}
                >
                  {valueByDate?.profit !== undefined
                    ? valueByDate.profit
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div
            className="manager_manage_report_filter"
            style={{ marginTop: 40 }}
          >
            <i className="fas fa-filter" style={{ paddingTop: 22 }}></i>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="listYear-label">Year</InputLabel>
              <Select
                labelId="listYear-label"
                id="listYear"
                // name="year"
                value={selectedYearForSale}
                onChange={handleYearChange}
                autoWidth
                label="Year"
                required
                size="small"
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
                backgroundColor: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4 style={{ marginBottom: "60px" }}>Sales</h4>
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
                backgroundColor: "white",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4>Category Sold</h4>
              {allCatePercentages.length > 0 ? (
                <Doughnut data={trafficSourceData} />
              ) : (
                <p>Please choose the year to see report</p>
              )}
            </div>
          </div>
          <div
            className="manager_manage_report_filter"
            style={{ marginTop: 50 }}
          >
            <i className="fas fa-filter" style={{ paddingTop: 20 }}></i>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="listYear-label">Year</InputLabel>
              <Select
                labelId="listYear-label"
                id="listYear"
                name="year"
                onChange={profitYear}
                autoWidth
                value={selectedYearForProfit}
                label="Year"
                required
                size="small"
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
              backgroundColor: "white",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
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
          <div
            className="manager_manage_diamond_table_wrapper"
            style={{ marginTop: "70px" }}
          >
            <h4>Top 10 Selling Products</h4>
            <TableContainer
              component={Paper}
              style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Product Code
                    </StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Line Total</StyledTableCell>
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
          <div
            className="manager_manage_diamond_table_wrapper"
            style={{ marginTop: "70px" }}
          >
            Month:
            <input
              className="manager_statis_input_date"
              type="month"
              value={chosenMonth}
              onChange={MonthYearStats}
              style={{ marginBottom: "20px" }}
            ></input>
            <TableContainer
              component={Paper}
              style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
            >
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
                        <TableCell align="center">
                          {new Date(item.date).toLocaleDateString("en-CA")}
                        </TableCell>
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
