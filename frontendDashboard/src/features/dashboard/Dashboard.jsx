import  { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import UserTable from "../../components/UserTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Data from "../../store/data.js";

Chart.register(...registerables);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adminName, setAdminName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const adminData = localStorage.getItem("admin");
      console.log(localStorage.getItem("admin"));
      if (adminData) {
        try {
          const adminName = JSON.parse(adminData);
          setAdminName(adminName.firstName +" " + adminName.lastName);
        } catch (error) {
          console.error("Error parsing admin data:", error);
        }
      }
      setLoading(false);
    }, 1500); // Simulate loading delay
  }, []);

  const stats = {
    totalUsers: 2453,
    activeUsers: 1892,
    newSignups: 124,
    revenue: 45230,
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const userActivityData = {
    labels: ["Admins", "Regular Users"],
    datasets: [
      {
        label: "User Activity",
        data: [12, 19],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      },
    ],
  };

  return (
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-8">
          {/* Admin Header */}
          <div className="text-2xl font-bold text-center mb-6 dark:text-gray-200">
            {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 dark:border-gray-200"></div>
                </div>
            ) : (
                `Welcome, ${adminName ? adminName : "ADMIN"}`
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="bg-white p-4 rounded shadow text-center dark:bg-neutral-600">
                  <h3 className="dark:text-gray-300 font-extrabold capitalize">{key.replace(/([A-Z])/g, " $1")}</h3>
                  <p className="text-2xl font-bold dark:text-gray-300">{key === "revenue" ? `£${value.toLocaleString()}` : value}</p>
                </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 ">
            <select
                className="p-2 border rounded w-full sm:w-auto dark:bg-neutral-600 dark:text-gray-300"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="p-2 border rounded w-full dark:bg-neutral-600 dark:text-gray-300"
              />
              <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="p-2 border rounded w-full dark:bg-neutral-600 dark:text-gray-300 "
              />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Revenue Trends</h3>
              <div className="w-full overflow-x-auto">
                <Line data={revenueData} />
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-4">User Activity</h3>
              <div className="w-full overflow-x-auto">
                <Bar data={userActivityData} />
              </div>
            </div>
          </div>

          {/* User Management Table */}
          <div className="bg-white p-4 font-bold rounded shadow overflow-x-auto dark:bg-neutral-600">
            <h3 className="text-lg font-bold mb-4 dark:text-gray-200">User Management</h3>
            <UserTable users={Data} />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
