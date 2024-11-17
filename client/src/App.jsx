import { motion } from "framer-motion";
import { EnergyConsumptionChart } from "./components/charts/EnergyConsumptionChart";
import { ACRunHoursChart } from "./components/charts/ACRunHoursChart";
import { AccessLogForm } from "./components/forms/AccessLogForm";
import { DateRangeFilter } from "./components/forms/DateRangeFilter";
import { AccessLogsTable } from "./components/tables/AccessLogsTable";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import Login from "./components/forms/Login";
import { apiRequest } from "./api/apiRequest";
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [logoutInProgress, setLogoutInProgress] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleLogin = (authToken) => {
    setToken(authToken);
    localStorage.setItem("token", authToken);
  };

  const handleLogout = () => {
    setLogoutInProgress(true);
    setTimeout(() => {
      setToken(null);
      localStorage.removeItem("token");
      setLogoutInProgress(false);
    }, 1000);
  };

  const loadData = async (filters = {}) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await apiRequest(
        `/chart-data?${new URLSearchParams(filters)}`
      );
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (dateRange) => {
    loadData(dateRange);
  };

  const handleLogSubmit = async (logData) => {
    try {
      await apiRequest("/access-logs", {
        method: "POST",
        body: JSON.stringify(logData),
      });
      loadLogs();
    } catch (error) {
      console.error("Failed to submit log:", error);
    }
  };

  const loadLogs = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await apiRequest("/access-logs");
      setLogs(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    loadLogs();
  }, [token]);

  return (
    <>
      {token && !logoutInProgress ? (
        <DashboardLayout handleLogout={handleLogout}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-gray-900">Overview</h1>

            <DateRangeFilter onFilter={handleDateFilter} loading={loading} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnergyConsumptionChart data={data} loading={loading} />
              <ACRunHoursChart data={data} loading={loading} />
            </div>

            <AccessLogForm onSubmit={handleLogSubmit} loading={loading} />

            <AccessLogsTable logs={logs} />
          </motion.div>
        </DashboardLayout>
      ) : logoutInProgress ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-semibold text-gray-700">Logging out...</p>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
};

export default App;
